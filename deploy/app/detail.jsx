// ===== 岗位详情抽屉 + 新增岗位 =====

// 根据标签/阶段生成"面试准备建议"(本地启发式,模拟 AI 整理)
function buildPrep(job) {
  const bank = {
    "数据驱动": ["如何定义一个功能的北极星指标?", "举例你用数据驱动决策的经历"],
    "数据": ["讲一个你做过的数据分析项目,结论与影响?", "指标异常如何排查?"],
    "SQL": ["手写一道窗口函数 / 留存率 SQL", "如何优化一条慢查询?"],
    "A/B 实验": ["A/B 实验如何判断显著性?样本量怎么估?", "遇到结果不显著会怎么做?"],
    "增长": ["拉新成本过高时你会如何拆解优化?", "设计一个提升次留的实验"],
    "0→1": ["一个从 0 到 1 的项目,你的取舍是什么?", "如何在信息不全时做决策?"],
    "电商": ["如何拆解 GMV?哪些杠杆可干预?", "商家侧和用户侧产品的核心差异?"],
    "Golang": ["Go 的 GMP 调度模型?", "channel 与 sync 的取舍?"],
    "高并发": ["如何设计一个秒杀 / 高并发扣减?", "缓存击穿 / 雪崩怎么处理?"],
    "React": ["React 渲染与 diff 机制?", "useEffect 依赖与闭包陷阱?"],
    "TypeScript": ["泛型在你项目里的实际用法?", "any 与 unknown 的区别?"],
    "推荐系统": ["召回与排序的目标差异?", "如何缓解推荐的冷启动?"],
    "深度学习": ["讲一个你熟悉的模型结构与改进点", "过拟合的处理手段?"],
    "CV": ["目标检测一阶段 vs 两阶段的取舍?", "数据增强常用手段?"],
    "定性研究": ["如何设计一场用户访谈?", "定性结论如何说服业务方?"],
    "数值": ["如何搭建一个卡牌的成长数值曲线?", "怎样保证数值平衡?"],
    "供应链": ["如何做库存与需求的平衡?", "异常波动如何预警?"],
    "内容": ["如何做一个爆款选题?", "怎样衡量内容质量?"],
    "商业分析": ["如何对一个新市场做规模测算?", "讲一次你的策略复盘"]
  };
  const qs = [];
  job.tags.forEach((t) => (bank[t] || []).forEach((q) => qs.length < 5 && qs.push(q)));
  if (qs.length < 3) qs.push("做一次 3 分钟自我介绍,突出与该岗位的匹配点", "你为什么选择这家公司 / 这个团队?");
  const tips = [
  "复盘简历里与「" + (job.tags[0] || job.role) + "」相关的 1-2 个项目,准备 STAR 结构讲述",
  job.referrer ? "可向内推人「" + job.referrer + "」打听团队近期重点与面试风格" : "面前在牛客/脉脉搜该岗面经,整理高频考点",
  "准备 2-3 个反问:团队当前最大挑战、实习生主要负责什么、转正机制"];

  return { qs: qs.slice(0, 5), tips };
}

// ===== 详情浮窗:位置 / 尺寸(可拖动 + 可调整,记忆到本地) =====
const WIN_KEY = "toudi_detail_win";
function winDefaults() {
  const w = Math.min(580, window.innerWidth - 32);
  const h = Math.min(760, window.innerHeight - 32);
  return { x: Math.max(16, window.innerWidth - w - 28), y: Math.max(16, Math.round((window.innerHeight - h) / 2)), w, h };
}
function winClamp(s) {
  const w = Math.max(360, Math.min(s.w, window.innerWidth - 16));
  const h = Math.max(340, Math.min(s.h, window.innerHeight - 16));
  const x = Math.min(Math.max(8, s.x), Math.max(8, window.innerWidth - w - 8));
  const y = Math.min(Math.max(8, s.y), Math.max(8, window.innerHeight - h - 8));
  return { x, y, w, h };
}
function winLoad() {
  try {const s = JSON.parse(localStorage.getItem(WIN_KEY));if (s && s.w) return winClamp(s);} catch (e) {}
  return winDefaults();
}

function JobDetail({ job, onClose, onAdvance, onUpdate, onDelete }) {
  const [tab, setTab] = useState("jd");
  const [win, setWin] = useState(winLoad);
  useEffect(() => {try {localStorage.setItem(WIN_KEY, JSON.stringify(win));} catch (e) {}}, [win]);
  function startDrag(e) {
    if (e.target.closest("button")) return; // 点按钮时不拖动
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY, ox = win.x, oy = win.y;
    const mv = (ev) => setWin((p) => winClamp({ ...p, x: ox + ev.clientX - sx, y: oy + ev.clientY - sy }));
    const up = () => {window.removeEventListener("pointermove", mv);window.removeEventListener("pointerup", up);};
    window.addEventListener("pointermove", mv);window.addEventListener("pointerup", up);
  }
  function startResize(e) {
    e.preventDefault();e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, ow = win.w, oh = win.h;
    const mv = (ev) => setWin((p) => ({
      ...p,
      w: Math.max(360, Math.min(ow + ev.clientX - sx, window.innerWidth - p.x - 8)),
      h: Math.max(340, Math.min(oh + ev.clientY - sy, window.innerHeight - p.y - 8)) }));
    const up = () => {window.removeEventListener("pointermove", mv);window.removeEventListener("pointerup", up);};
    window.addEventListener("pointermove", mv);window.addEventListener("pointerup", up);
  }
  function resetWin() {setWin(winDefaults());}
  const [editing, setEditing] = useState(false);
  const [ef, setEf] = useState({});
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef(null);
  const notesRef = useRef(null);
  useEffect(() => {setTab("jd");setEditing(false);setNotes(job ? job.notes || "" : "");setPrep(job ? job.prep || buildPrep(job) : { qs: [], tips: [] });}, [job && job.id]);
  const [prep, setPrep] = useState({ qs: [], tips: [] });
  const prepTimer = useRef(null);
  if (!job) return null;
  const S = window.APP_DATA;
  const channel = S.CHANNELS[job.channel] || job.channel;
  const stages = S.STAGES;
  const curIdx = stages.findIndex((s) => s.id === job.stage);
  const today = new Date().toISOString().slice(0, 10);
  const efset = (k) => (e) => setEf((p) => ({ ...p, [k]: e.target.value }));

  function startEdit() {
    setEf({ company: job.company, role: job.role, team: job.team || "", city: job.city, salary: job.salary,
      channel: job.channel, referrer: job.referrer || "", deadline: job.deadline || "", priority: job.priority,
      tags: (job.tags || []).join(", ") });
    setEditing(true);
  }
  function saveEdit() {
    onUpdate && onUpdate(job.id, {
      company: ef.company.trim() || job.company, role: ef.role.trim() || job.role, team: ef.team.trim(),
      city: ef.city.trim(), salary: ef.salary.trim(), channel: ef.channel, referrer: ef.referrer.trim(),
      deadline: ef.deadline, priority: Number(ef.priority) || 2,
      tags: ef.tags.split(/[,,\s]+/).map((s) => s.trim()).filter(Boolean).slice(0, 8)
    });
    setEditing(false);
  }
  function markRejected() {
    onUpdate && onUpdate(job.id, { stage: "rejected", next: { action: "", at: "" },
      events: [...job.events, { t: today, label: "流程结束 · 已挂", down: true }] });
  }
  function reactivate() {
    onUpdate && onUpdate(job.id, { stage: "interview", next: { action: "继续跟进", at: "" },
      events: [...job.events, { t: today, label: "重新激活流程", up: true }] });
  }
  function toggleFav() {onUpdate && onUpdate(job.id, { favorite: !job.favorite });}
  function updateNotes(v) {
    setNotes(v);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {onUpdate && onUpdate(job.id, { notes: v });setSaved(true);setTimeout(() => setSaved(false), 1400);}, 450);
  }
  function insertStamp() {
    const label = { interview: ["", "一面", "二面", "三面", "四面"][job.round] || "面试", hr: "HR 面", written: "笔试" }[job.stage] || "记录";
    const stamp = (notes && !notes.endsWith("\n") ? "\n\n" : "") + "── " + label + " · " + today + " ──\n面试问题:\n1. \n2. \n我的回答 / 复盘:\n\n";
    const v = notes + stamp;
    updateNotes(v);
    setTimeout(() => {if (notesRef.current) {notesRef.current.focus();notesRef.current.selectionStart = notesRef.current.selectionEnd = v.length;}}, 0);
  }
  function flashSaved() {setSaved(true);setTimeout(() => setSaved(false), 1400);}
  function savePrep(next) {
    setPrep(next);
    clearTimeout(prepTimer.current);
    prepTimer.current = setTimeout(() => {onUpdate && onUpdate(job.id, { prep: next });flashSaved();}, 450);
  }
  function regenPrep() {savePrep(buildPrep(job));}
  function autoGrow(e) {e.target.style.height = "auto";e.target.style.height = e.target.scrollHeight + "px";}

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer floating" style={{ left: win.x, top: win.y, width: win.w, height: win.h }}>
        <div className="drawer-head draghandle" onPointerDown={startDrag}>
          <button className="iconbtn" onClick={onClose}><Icon name="close" size={18} /></button>
          <div className="drag-hint"><Icon name="menu" size={13} /><span>拖动移动 · 拖右下角缩放</span></div>
          <div className="drawer-head-actions">
            <button className="iconbtn" onClick={resetWin} title="恢复默认大小"><Icon name="target" size={16} /></button>
            <button className="iconbtn" onClick={toggleFav} title="星标"><Icon name="star" size={17} style={job.favorite ? { fill: "#D9A441", color: "#D9A441" } : {}} /></button>
            <button className={"iconbtn " + (editing ? "on" : "")} onClick={() => editing ? setEditing(false) : startEdit()} title="编辑信息"><Icon name="edit" size={16} /></button>
          </div>
        </div>

        <div className="drawer-scroll">
          <div className="dh">
            <Logo company={job.company} size={52} radius={14} />
            <div className="dh-txt">
              <div className="dh-co">{job.company}</div>
              <div className="dh-role">{job.role}</div>
              <div className="dh-team">{job.team}</div>
            </div>
          </div>

          {editing ?
          <div className="editform">
              <div className="ef-head"><Icon name="edit" size={14} />编辑岗位信息</div>
              <div className="frow">
                <label className="field"><span>公司</span><input value={ef.company} onChange={efset("company")} /></label>
                <label className="field"><span>岗位名</span><input value={ef.role} onChange={efset("role")} /></label>
              </div>
              <label className="field"><span>团队 / 部门</span><input value={ef.team} onChange={efset("team")} placeholder="如:抖音电商 · 商家产品" /></label>
              <div className="frow">
                <label className="field"><span>地点</span><input value={ef.city} onChange={efset("city")} /></label>
                <label className="field"><span>薪资</span><input value={ef.salary} onChange={efset("salary")} /></label>
              </div>
              <div className="frow">
                <label className="field"><span>渠道</span>
                  <select value={ef.channel} onChange={efset("channel")}>{Object.entries(S.CHANNELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
                </label>
                <label className="field"><span>内推人 / 联系人</span><input value={ef.referrer} onChange={efset("referrer")} placeholder="可空" /></label>
              </div>
              <div className="frow">
                <label className="field"><span>截止日期</span><input type="date" value={ef.deadline} onChange={efset("deadline")} /></label>
                <label className="field field-prio"><span>优先级</span>
                  <select value={ef.priority} onChange={efset("priority")}><option value={1}>高</option><option value={2}>中</option><option value={3}>低</option></select>
                </label>
              </div>
              <label className="field"><span>标签(逗号分隔)</span><input value={ef.tags} onChange={efset("tags")} placeholder="如:数据驱动, SQL, 增长" /></label>
              <button className="ef-delete" onClick={() => {if (window.confirm("确定删除「" + job.company + " · " + job.role + "」?此操作不可恢复。")) onDelete && onDelete(job.id);}}><Icon name="close" size={13} />删除此岗位</button>
            </div> :

          <>
          {/* 阶段步进器 */}
          <div className="stepper">
            {stages.filter((s) => s.id !== "rejected").map((s, i) => {
                const done = job.stage !== "rejected" && i < curIdx;
                const active = i === curIdx;
                return (
                  <div key={s.id} className={"step " + (done ? "done " : "") + (active ? "active" : "")}>
                  <div className="step-dot" style={active ? { background: s.dot, borderColor: s.dot } : done ? { background: s.dot, borderColor: s.dot } : {}}>
                    {done && <Icon name="check" size={11} stroke={3} />}
                  </div>
                  <div className="step-label">{s.short}</div>
                </div>);

              })}
          </div>
          {job.stage === "rejected" && <div className="dh-rejected"><Icon name="close" size={13} stroke={2.5} />流程已结束(已挂)</div>}

          {/* 关键事实 */}
          <div className="facts">
            <div className="fact"><span className="fact-k">薪资</span><span className="fact-v mono">{job.salary}</span></div>
            <div className="fact"><span className="fact-k">地点</span><span className="fact-v">{job.city}</span></div>
            <div className="fact"><span className="fact-k">渠道</span><span className="fact-v">{channel}{job.referrer ? " · " + job.referrer : ""}</span></div>
            <div className="fact"><span className="fact-k">投递</span><span className="fact-v">{fmtDate(job.applied)}</span></div>
            <div className="fact"><span className="fact-k">截止</span><span className="fact-v">{job.deadline ? fmtDate(job.deadline) + "(" + relDay(job.deadline) + ")" : "—"}</span></div>
            <div className="fact"><span className="fact-k">优先级</span><span className="fact-v">{{ 1: "高", 2: "中", 3: "低" }[job.priority]}</span></div>
          </div>

          {/* 下一步 */}
          {job.next && job.next.action &&
            <div className="next-banner">
              <div className="next-ic"><Icon name="target" size={18} /></div>
              <div className="next-tx">
                <div className="next-label">下一步</div>
                <div className="next-act">{job.next.action}</div>
              </div>
              {job.next.at && <div className="next-at"><div className="next-at-d">{relDay(job.next.at)}</div><div className="next-at-t mono">{job.next.at.slice(11)}</div></div>}
            </div>
            }

          {/* Tab 切换 */}
          <div className="seg">
            {[["jd", "JD 详情"], ["prep", "面试准备"], ["timeline", "进程"], ["notes", "面试记事"]].map(([k, l]) =>
              <button key={k} className={"seg-btn " + (tab === k ? "on" : "")} onClick={() => setTab(k)}>{l}</button>
              )}
          </div>

          <div className="tabpane">
            {tab === "jd" &&
              <div>
                <div className="jd-tags">{job.tags.map((t) => <span key={t} className="tagmini">{t}</span>)}</div>
                {job.shot && <img className="jd-shot" src={job.shot} alt="JD 截图存档" />}
                <pre className="jd-text">{job.jd}</pre>
                <a className="jd-link" href="#"><Icon name="link" size={14} />查看原始 JD 链接</a>
              </div>
              }
            {tab === "prep" &&
              <div className="prep">
                <div className="prep-head">
                  <span className="prep-head-l"><Icon name="sparkle" size={15} style={{ color: "var(--primary)" }} />面试准备清单 · 可自由编辑</span>
                  <button className="mini-ai" onClick={regenPrep} title="按 JD/标签重新生成(会覆盖)"><Icon name="sparkle" size={12} />重新生成</button>
                </div>
                <div className="prep-sub">高频问题<span className="prep-add" onClick={() => savePrep({ ...prep, qs: [...prep.qs, ""] })}><Icon name="plus" size={12} stroke={2.6} />添加</span></div>
                <div className="prep-edit-list">
                  {prep.qs.map((q, i) =>
                  <div className="prep-edit-row" key={i}>
                      <span className="prep-num mono">{String(i + 1).padStart(2, "0")}</span>
                      <textarea className="prep-input" rows={1} value={q} autoFocus={q === ""}
                    onInput={autoGrow}
                    onChange={(e) => {const qs = [...prep.qs];qs[i] = e.target.value;savePrep({ ...prep, qs });}}
                    placeholder="写下一个可能被问到的问题…" />
                      <button className="prep-del" onClick={() => savePrep({ ...prep, qs: prep.qs.filter((_, x) => x !== i) })} title="删除"><Icon name="close" size={13} /></button>
                    </div>
                  )}
                  {prep.qs.length === 0 && <div className="prep-empty">还没有问题,点「添加」或「重新生成」</div>}
                </div>
                <div className="prep-sub">行动建议<span className="prep-add" onClick={() => savePrep({ ...prep, tips: [...prep.tips, ""] })}><Icon name="plus" size={12} stroke={2.6} />添加</span></div>
                <div className="prep-edit-list">
                  {prep.tips.map((tp, i) =>
                  <div className="prep-edit-row" key={i}>
                      <Icon name="check" size={13} stroke={2.5} style={{ color: "#54AE78", marginTop: 11, flexShrink: 0 }} />
                      <textarea className="prep-input" rows={1} value={tp} autoFocus={tp === ""}
                    onInput={autoGrow}
                    onChange={(e) => {const tips = [...prep.tips];tips[i] = e.target.value;savePrep({ ...prep, tips });}}
                    placeholder="写下一条准备 / 行动建议…" />
                      <button className="prep-del" onClick={() => savePrep({ ...prep, tips: prep.tips.filter((_, x) => x !== i) })} title="删除"><Icon name="close" size={13} /></button>
                    </div>
                  )}
                </div>
                {saved && <div className="prep-saved"><Icon name="check" size={12} stroke={3} />已保存</div>}
              </div>
              }
            {tab === "timeline" &&
              <div className="dtl">
                {job.events.map((e, i) =>
                <div key={i} className={"dtl-row " + (e.up ? "up " : "") + (e.down ? "down" : "")}>
                    <div className="dtl-dot" />
                    <div className="dtl-c">
                      <div className="dtl-label">{e.label}</div>
                      <div className="dtl-date mono">{fmtDate(e.t)} · {relDay(e.t)}</div>
                    </div>
                  </div>
                )}
              </div>
              }
            {tab === "notes" &&
              <div className="notes">
                <div className="notes-bar">
                  <span className="notes-hint"><Icon name="edit" size={13} />面试问题 / 心得记事本 · 自动保存</span>
                  <div className="notes-bar-r">
                    {saved && <span className="saved-flash"><Icon name="check" size={12} stroke={3} />已保存</span>}
                    <button className="mini-ai" onClick={insertStamp}><Icon name="plus" size={12} />插入面试记录</button>
                  </div>
                </div>
                <textarea ref={notesRef} className="notes-editor" value={notes} onChange={(e) => updateNotes(e.target.value)}
                placeholder="记录这次面试被问到的问题、你的回答、面试官风格、复盘要点…&#10;随时编辑,自动保存。点「插入面试记录」可快速生成一条带时间的模板。" />
              </div>
              }
          </div>
          </>
          }
        </div>

        {/* 底部操作 */}
        <div className="drawer-foot">
          {editing ?
          <>
              <button className="btn ghost" onClick={() => setEditing(false)}>取消</button>
              <button className="btn primary grow" onClick={saveEdit}><Icon name="check" size={15} stroke={2.5} />保存修改</button>
            </> :
          job.stage === "rejected" ?
          <button className="btn ghost grow" onClick={reactivate}><Icon name="arrowUp" size={15} />重新激活流程</button> :
          job.stage === "offer" ?
          <div className="offer-foot"><Icon name="star" size={15} style={{ fill: "#2E8B57", color: "#2E8B57" }} />已收获 Offer · 流程完成</div> :

          <>
              <button className="btn danger" onClick={markRejected}><Icon name="flag" size={15} />标记已挂</button>
              <button className="btn primary grow" onClick={() => onAdvance(job)}>推进到下一阶段<Icon name="arrowR" size={15} /></button>
            </>
          }
        </div>
        <div className="resize-grip" onPointerDown={startResize} title="拖动调整大小">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M13 5L5 13M13 9L9 13M13 1L1 13" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>
        </div>
      </aside>
    </>);

}

// ---- 新增岗位(支持 JD 截图识别 / 文本智能填表)----
function AddJob({ onClose, onSave }) {
  const [f, setF] = useState({ company: "", role: "", city: "", salary: "", channel: "official", deadline: "", priority: 2, jd: "" });
  const [tags, setTags] = useState([]);
  const [shot, setShot] = useState(null);
  const [busy, setBusy] = useState(false);
  const [prog, setProg] = useState(0);
  const [msg, setMsg] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef(null);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const S = window.APP_DATA;

  function mergeFields(ex, ocrText) {
    setF((p) => ({
      ...p,
      company: ex.company || p.company,
      role: ex.role || p.role,
      city: ex.city || p.city,
      salary: ex.salary || p.salary,
      deadline: ex.deadline || p.deadline,
      channel: ex.channel || p.channel,
      jd: ex.jd_clean || ocrText || p.jd
    }));
    if (ex.tags && ex.tags.length) setTags(ex.tags);
  }

  async function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setShot(e.target.result);
    reader.readAsDataURL(file);
    const cap = window.ocrCapabilities ? window.ocrCapabilities() : { native: false };
    setBusy(true);setProg(6);setMsg(cap.native ? "系统离线识别中…" : "加载识别引擎并取字…");
    try {
      const { text, engine } = await window.ocrImage(file, ({ pct }) => setProg(pct));
      if (!text || text.replace(/\s/g, "").length < 3) {setMsg("没识别到文字,换张更清晰的截图,或直接粘贴文本");setBusy(false);return;}
      setProg(95);setMsg((engine === "native" ? "系统离线识别完成," : "") + "正在整理岗位信息…");
      const ex = await window.extractFields(text);
      mergeFields(ex, text);
      setProg(100);setMsg("已自动填好,检查无误即可保存");
    } catch (err) {
      setMsg("识别失败:" + (err.message || "") + " — 可改用粘贴文本");
    }
    setBusy(false);
  }

  async function recognizeText() {
    if (!f.jd.trim()) return;
    setBusy(true);setProg(55);setMsg("正在整理岗位信息…");
    try {const ex = await window.extractFields(f.jd);mergeFields(ex, f.jd);setProg(100);setMsg("已自动填好,检查无误即可保存");}
    catch (e) {setMsg("整理失败,请手动填写");}
    setBusy(false);
  }

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <div className="modal">
        <div className="modal-head">
          <div className="modal-title">添加岗位</div>
          <button className="iconbtn" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>
        <div className="modal-body">
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />

          {!shot ?
          <div className={"dropzone " + (drag ? "drag" : "")}
          onClick={() => fileRef.current && fileRef.current.click()}
          onDragOver={(e) => {e.preventDefault();setDrag(true);}}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}>
              <div className="dz-ic"><Icon name="sparkle" size={20} /></div>
              <div className="dz-title">上传 / 拖入 JD 截图,自动识别填表</div>
              <div className="dz-sub">微信 · Boss · 官网 等岗位截图都行 — OCR 取字,自动拆出公司 / 岗位 / 薪资 / 地点</div>
              <div className="dz-cap">{window.ocrCapabilities && window.ocrCapabilities().native ?
              "✓ 当前设备支持系统离线识别(无需联网)" :
              "截图识别将联网加载引擎;也可直接粘贴文本(离线可用)"}</div>
            </div> :

          <div className="shot-row">
              <img className="shot-prev" src={shot} alt="JD 截图" />
              <div className="shot-meta">
                <div className="shot-name"><Icon name="check" size={14} stroke={2.6} style={{ color: "#54AE78" }} />已附带 JD 截图(随岗位存档)</div>
                <div className="shot-actions">
                  <button className="res-act" onClick={() => fileRef.current && fileRef.current.click()}><Icon name="copy" size={13} />换一张</button>
                  <button className="res-act" onClick={() => setShot(null)}><Icon name="close" size={13} />移除</button>
                </div>
              </div>
            </div>
          }

          {(busy || msg) &&
          <div className="ingest-state">
              {(busy || prog === 100) && <div className="prog-bar"><div className="prog-fill" style={{ width: prog + "%" }} /></div>}
              <div className={"ingest-msg " + (busy ? "busy" : prog === 100 ? "done" : "")}>
                {busy && <span className="spin" />}
                {!busy && prog === 100 && <Icon name="check" size={13} stroke={2.6} />}
                {msg}
              </div>
            </div>
          }

          <div className="frow">
            <label className="field"><span>公司</span><input value={f.company} onChange={set("company")} placeholder="如:字节跳动" /></label>
            <label className="field"><span>岗位名</span><input value={f.role} onChange={set("role")} placeholder="如:产品经理实习生" /></label>
          </div>
          <div className="frow">
            <label className="field"><span>地点</span><input value={f.city} onChange={set("city")} placeholder="城市" /></label>
            <label className="field"><span>薪资</span><input value={f.salary} onChange={set("salary")} placeholder="如:300/天" /></label>
          </div>
          <div className="frow">
            <label className="field"><span>投递渠道</span>
              <select value={f.channel} onChange={set("channel")}>
                {Object.entries(S.CHANNELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label className="field"><span>截止日期</span><input type="date" value={f.deadline} onChange={set("deadline")} /></label>
            <label className="field field-prio"><span>优先级</span>
              <select value={f.priority} onChange={set("priority")}>
                <option value={1}>高</option><option value={2}>中</option><option value={3}>低</option>
              </select>
            </label>
          </div>
          {tags.length > 0 &&
          <label className="field"><span>识别到的标签</span>
              <div className="tags-edit">{tags.map((t) => <span key={t} className="tagmini">{t}</span>)}</div>
            </label>
          }
          <label className="field">
            <span className="field-jd-label">JD 全文
              <button className="mini-ai" disabled={busy || !f.jd.trim()} onClick={recognizeText}>
                <Icon name="sparkle" size={12} />智能识别填表
              </button>
            </span>
            <textarea value={f.jd} onChange={set("jd")} rows={5} placeholder="也可直接粘贴 JD 文本,点右上「智能识别填表」自动拆解…" />
          </label>
        </div>
        <div className="modal-foot">
          <button className="btn ghost" onClick={onClose}>取消</button>
          <button className="btn primary" onClick={() => onSave({ ...f, tags, shot })}><Icon name="check" size={15} stroke={2.5} />保存岗位</button>
        </div>
      </div>
    </>);

}

Object.assign(window, { JobDetail, AddJob, buildPrep });