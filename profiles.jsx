// ===== JD 截图/文本 智能识别模块 =====
// OCR 优先级:① 浏览器系统级离线识别 TextDetector(零下载、离线)
//             ② Tesseract.js(按需从 CDN 加载,需联网)
// 字段抽取:① 本环境 AI(window.claude) ② 本地规则解析(离线兜底)

function ocrCapabilities() {
  return { native: typeof window.TextDetector !== "undefined" };
}

// —— 引擎①:系统离线 OCR ——
async function ocrViaNative(file, onProgress) {
  onProgress && onProgress({ status: "native", pct: 25, engine: "native" });
  const det = new window.TextDetector();
  const bmp = await createImageBitmap(file);
  const blocks = await det.detect(bmp);
  onProgress && onProgress({ status: "native", pct: 92, engine: "native" });
  blocks.sort((a, b) => {
    const ay = a.boundingBox.y, by = b.boundingBox.y;
    if (Math.abs(ay - by) > 14) return ay - by;       // 先按行(纵向)
    return a.boundingBox.x - b.boundingBox.x;           // 同行按横向
  });
  return blocks.map((b) => b.rawValue).join("\n").trim();
}

// —— 引擎②:Tesseract(联网按需加载)——
let _tessLoading = null;
function loadTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (_tessLoading) return _tessLoading;
  _tessLoading = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
    s.onload = () => res(window.Tesseract);
    s.onerror = () => rej(new Error("OCR 引擎加载失败(需联网)"));
    document.head.appendChild(s);
  });
  return _tessLoading;
}
async function ocrViaTesseract(file, onProgress) {
  const T = await loadTesseract();
  onProgress && onProgress({ status: "init", pct: 8, engine: "tesseract" });
  const worker = await T.createWorker(["chi_sim", "eng"], 1, {
    logger: (m) => {
      if (m.status === "recognizing text") onProgress && onProgress({ status: "ocr", pct: 20 + Math.round(m.progress * 70), engine: "tesseract" });
      else onProgress && onProgress({ status: m.status, pct: 12, engine: "tesseract" });
    },
  });
  const { data } = await worker.recognize(file);
  await worker.terminate();
  return (data.text || "").replace(/\n{3,}/g, "\n\n").trim();
}

// 统一入口:优先系统离线,退回 Tesseract。返回 { text, engine }
async function ocrImage(file, onProgress, opts) {
  opts = opts || {};
  if (ocrCapabilities().native && !opts.forceTesseract) {
    try {
      const text = await ocrViaNative(file, onProgress);
      if (text && text.replace(/\s/g, "").length >= 3) return { text, engine: "native" };
    } catch (e) {/* 系统引擎失败则退回 */}
  }
  const text = await ocrViaTesseract(file, onProgress);
  return { text, engine: "tesseract" };
}

// 文本清洗:去重、去噪、整理成更干净的表达(离线可用)
function cleanJD(text) {
  const lines = text.split(/\n+/).map((l) => l.replace(/[ \t]+/g, " ").trim()).filter(Boolean);
  const seen = new Set(), out = [];
  for (let l of lines) {
    l = l.replace(/^[•·∙◦●○\-*]+\s*/, "• ");
    if (l.replace(/[^\u4e00-\u9fa5a-z0-9]/gi, "").length < 2) continue;
    const key = l.replace(/[^\u4e00-\u9fa5a-z0-9]/gi, "").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key); out.push(l);
  }
  return out.join("\n");
}

// 用 AI 把文本拆成结构化字段 + 重写为流畅简洁的 JD
async function extractFields(text) {
  if (!window.claude || !window.claude.complete) return heuristicExtract(text);
  const channelKeys = Object.keys(window.APP_DATA.CHANNELS).join(", ");
  const prompt =
    "你是招聘信息整理助手。下面是从招聘 JD(可能来自截图 OCR,含少量噪声)提取的文本。" +
    "请仅返回一个 JSON 对象,不要任何额外文字、不要代码块标记。字段:\n" +
    '{"company":"公司名","role":"岗位名称","city":"工作城市","salary":"薪资(如 300/天 或 面议)",' +
    '"deadline":"截止日期 YYYY-MM-DD,没有则空","channel":"投递渠道,从[' + channelKeys + ']猜一个英文key,默认 official",' +
    '"tags":["3-5个技能/方向关键词"],' +
    '"jd_clean":"把JD去除噪声、重新整理成流畅、简洁、精准的中文,分点呈现职责与要求,180字以内"}\n' +
    "未知字段留空字符串或空数组。JD 文本如下:\n\n" + text.slice(0, 3500);
  try {
    const raw = await window.claude.complete(prompt);
    const m = raw.match(/\{[\s\S]*\}/);
    const obj = JSON.parse(m ? m[0] : raw);
    return {
      company: obj.company || "", role: obj.role || "", city: obj.city || "",
      salary: obj.salary || "", deadline: /^\d{4}-\d{2}-\d{2}$/.test(obj.deadline) ? obj.deadline : "",
      channel: window.APP_DATA.CHANNELS[obj.channel] ? obj.channel : "official",
      tags: Array.isArray(obj.tags) ? obj.tags.slice(0, 5) : [],
      jd_clean: (obj.jd_clean && obj.jd_clean.length > 8) ? obj.jd_clean : cleanJD(text),
    };
  } catch (e) {
    return heuristicExtract(text);
  }
}

// 兜底:无 AI 时的本地规则抽取(离线可用)
function heuristicExtract(text) {
  const out = { company: "", role: "", city: "", salary: "", deadline: "", channel: "official", tags: [], jd_clean: cleanJD(text) };
  const cities = ["北京", "上海", "深圳", "广州", "杭州", "成都", "南京", "武汉", "合肥", "苏州", "西安", "厦门", "天津", "重庆", "珠海"];
  out.city = cities.find((c) => text.includes(c)) || "";
  const sal = text.match(/(\d{2,4})\s*\/\s*天|(\d{1,2})\s*[-~]\s*(\d{1,2})\s*k|(\d{1,2})\s*k/i);
  if (sal) out.salary = sal[1] ? sal[1] + "/天" : sal[0].replace(/\s/g, "");
  const dl = text.match(/(\d{4})[\-\/.年](\d{1,2})[\-\/.月](\d{1,2})/);
  if (dl) out.deadline = dl[1] + "-" + String(dl[2]).padStart(2, "0") + "-" + String(dl[3]).padStart(2, "0");
  const roleRe = /([^\n]{0,8}(实习生?|工程师|经理|分析师|开发|策划|运营|设计师?|研究员?|算法|产品))/;
  const rm = text.match(roleRe);
  if (rm) out.role = rm[0].trim().slice(0, 20);
  const chMap = { 内推: "referral", 校招: "campus", 牛客: "nowcoder", BOSS: "boss", Boss: "boss", 官网: "official" };
  for (const k in chMap) if (text.includes(k)) { out.channel = chMap[k]; break; }
  const tagBank = ["SQL", "Python", "Java", "Go", "Golang", "React", "Vue", "C++", "数据分析", "推荐", "算法", "深度学习", "机器学习", "增长", "电商", "运营", "产品", "用户研究", "供应链", "数值", "内容", "财务", "设计"];
  out.tags = tagBank.filter((t) => text.toLowerCase().includes(t.toLowerCase())).slice(0, 5);
  out.company = (text.split("\n").find((l) => l.trim().length >= 2) || "").trim().slice(0, 16);
  return out;
}

Object.assign(window, { ocrImage, extractFields, ocrCapabilities, cleanJD });
