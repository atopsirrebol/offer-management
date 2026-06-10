// ===== 岗位投递管理 · 数据模型与种子数据 =====
(function () {
  // 流程阶段定义(有序)
  const STAGES = [
    { id: "applied",   name: "已投递",   short: "投递",   ink: "#5B6B7A", bg: "#ECF1F5", dot: "#7C8C9C" },
    { id: "screening", name: "简历筛选", short: "筛选",   ink: "#9A6B1F", bg: "#F7EFDD", dot: "#C99A3F" },
    { id: "written",   name: "笔试",     short: "笔试",   ink: "#6B4F9A", bg: "#EFEAF7", dot: "#9579C9" },
    { id: "interview", name: "面试中",   short: "面试",   ink: "#2F6FB0", bg: "#E6F0F9", dot: "#5B95D0" },
    { id: "hr",        name: "HR 面",    short: "HR",     ink: "#1F8A7A", bg: "#E1F2EE", dot: "#46AE9D" },
    { id: "offer",     name: "Offer",    short: "Offer",  ink: "#2E8B57", bg: "#E5F2E9", dot: "#54AE78" },
    { id: "rejected",  name: "已拒/挂",  short: "结束",   ink: "#A8584F", bg: "#F6E9E7", dot: "#C47C73" },
  ];
  const STAGE_MAP = Object.fromEntries(STAGES.map((s) => [s.id, s]));

  // 投递渠道
  const CHANNELS = {
    official: "官网",
    boss: "BOSS直聘",
    referral: "内推",
    campus: "校招官网",
    nowcoder: "牛客",
    other: "其他",
  };

  // 一个小工具:相对今天的日期
  const TODAY = new Date(2026, 5, 9); // 2026-06-09
  function d(offsetDays) {
    const x = new Date(TODAY);
    x.setDate(x.getDate() + offsetDays);
    return x.toISOString().slice(0, 10);
  }

  // 公司主题色(用于头像底色,低饱和)
  const BRANDS = {
    "字节跳动": "#3B5BDB", "腾讯": "#2F7ED8", "阿里巴巴": "#E8800E",
    "美团": "#E0A21C", "小红书": "#D6453D", "米哈游": "#4B86C6",
    "网易": "#C5392F", "拼多多": "#D6453D", "蔚来": "#3FA0A6",
    "商汤科技": "#7A5BD8", "快手": "#E8800E", "B站": "#D86A9B",
    "理想汽车": "#3FA06B", "携程": "#2F7ED8", "京东": "#C5392F",
  };

  const JOBS = [
    {
      id: "j01", company: "字节跳动", role: "产品经理实习生", team: "抖音电商 · 商家产品",
      city: "北京", salary: "300/天", channel: "referral", referrer: "学姐 Lisa",
      stage: "interview", round: 2, priority: 2, favorite: true,
      deadline: d(4), applied: d(-12),
      next: { action: "二面(交叉面)", at: d(2) + " 14:00" },
      jd: "负责抖音电商商家侧产品方向,参与商家工具的需求调研、方案设计与数据分析。\n\n岗位要求:\n• 本科及以上,2026 届,产品/计算机/经管相关专业\n• 有 0→1 产品实习经历,熟悉电商业务者优先\n• 数据敏感,会用 SQL / Tableau 做基础分析\n• 逻辑清晰、抗压、能快速学习",
      tags: ["电商", "0→1", "数据驱动"],
      notes: "学姐说团队 leader 很看重业务 sense,二面会让现场分析一个商家增长 case。要准备 GMV 拆解框架。",
      events: [
        { t: d(-12), label: "投递 · 内推码 BD8821" },
        { t: d(-8), label: "简历通过" },
        { t: d(-3), label: "一面(60min)· 通过" },
        { t: d(2), label: "二面 · 待进行", up: true },
      ],
    },
    {
      id: "j02", company: "腾讯", role: "后端开发实习", team: "WXG · 微信支付",
      city: "深圳", salary: "350/天", channel: "official", referrer: "",
      stage: "written", round: 0, priority: 1, favorite: true,
      deadline: d(1), applied: d(-6),
      next: { action: "笔试(2.5h)", at: d(1) + " 19:00" },
      jd: "参与微信支付核心交易链路的服务端研发,涉及高并发、分布式事务与稳定性建设。\n\n岗位要求:\n• 扎实的 Go / C++ / Java 基础,熟悉至少一门\n• 了解 MySQL、Redis、消息队列\n• 有 ACM / 项目经验优先\n• 对高并发系统有热情",
      tags: ["Golang", "高并发", "支付"],
      notes: "笔试是 3 道算法 + 1 道系统设计。重点刷:动态规划、并发安全。",
      events: [
        { t: d(-6), label: "投递 · 官网" },
        { t: d(-2), label: "测评通过" },
        { t: d(1), label: "笔试 · 待进行", up: true },
      ],
    },
    {
      id: "j03", company: "小红书", role: "数据分析实习", team: "社区 · 增长分析",
      city: "上海", salary: "260/天", channel: "boss", referrer: "",
      stage: "offer", round: 0, priority: 1, favorite: true,
      deadline: d(-2), applied: d(-25),
      next: { action: "确认 Offer(2 天内回复)", at: d(2) + " 18:00" },
      jd: "支持社区增长团队的数据需求,搭建指标体系、做 A/B 实验分析与用户行为洞察。\n\n岗位要求:\n• 统计 / 数学 / 计算机相关\n• 熟练 SQL,会 Python(pandas)\n• 了解 A/B 实验与因果推断基础\n• 沟通能力强,能讲清数据故事",
      tags: ["SQL", "A/B 实验", "增长"],
      notes: "已发 Offer!日薪 260,可转正。纠结和字节二面的结果对比,先把这个稳住。",
      events: [
        { t: d(-25), label: "投递 · BOSS" },
        { t: d(-20), label: "笔试通过" },
        { t: d(-15), label: "一面 / 二面 通过" },
        { t: d(-4), label: "HR 面 通过" },
        { t: d(-1), label: "口头 Offer", up: true },
      ],
    },
    {
      id: "j04", company: "美团", role: "用户研究实习", team: "到店 · 体验设计",
      city: "北京", salary: "220/天", channel: "campus", referrer: "",
      stage: "screening", round: 0, priority: 2, favorite: false,
      deadline: d(6), applied: d(-3),
      next: { action: "等待简历结果", at: "" },
      jd: "参与到店业务的用户研究项目,设计访谈/问卷,输出体验洞察报告。\n\n岗位要求:\n• 心理学 / 社会学 / 设计 / HCI 相关\n• 有定性 + 定量研究方法基础\n• 表达与共情能力强",
      tags: ["定性研究", "访谈", "报告"],
      notes: "JD 比较看重研究方法论,简历里要突出之前的访谈项目。",
      events: [
        { t: d(-3), label: "投递 · 校招官网" },
        { t: d(-3), label: "简历筛选中", up: true },
      ],
    },
    {
      id: "j05", company: "米哈游", role: "游戏策划实习", team: "数值策划",
      city: "上海", salary: "240/天", channel: "official", referrer: "",
      stage: "applied", round: 0, priority: 3, favorite: false,
      deadline: d(9), applied: d(-1),
      next: { action: "等待简历结果", at: "" },
      jd: "参与游戏数值体系搭建与平衡性调优,产出数值文档与模型。\n\n岗位要求:\n• 热爱游戏,有自己的数值理解\n• Excel / 数学建模能力强\n• 有同人/Mod/独立游戏经验优先",
      tags: ["数值", "Excel", "建模"],
      notes: "投了数值岗,作品集放了之前做的卡牌数值 demo。",
      events: [{ t: d(-1), label: "投递 · 官网", up: true }],
    },
    {
      id: "j06", company: "阿里巴巴", role: "算法实习(推荐)", team: "淘天 · 搜索推荐",
      city: "杭州", salary: "400/天", channel: "referral", referrer: "实验室师兄",
      stage: "hr", round: 0, priority: 1, favorite: true,
      deadline: d(-5), applied: d(-30),
      next: { action: "HR 面薪资沟通", at: d(0) + " 16:00" },
      jd: "参与淘宝搜索推荐算法的研发,涉及召回、排序、重排等环节。\n\n岗位要求:\n• 机器学习 / 深度学习扎实\n• 熟悉推荐系统经典模型\n• 有顶会论文 / 竞赛 / 大厂实习优先\n• Python + 至少一个深度学习框架",
      tags: ["推荐系统", "深度学习", "排序"],
      notes: "今天下午 HR 面!基本是走流程谈薪资和到岗时间。问清楚转正名额。",
      events: [
        { t: d(-30), label: "投递 · 内推" },
        { t: d(-22), label: "笔试通过" },
        { t: d(-16), label: "一面 · 通过" },
        { t: d(-10), label: "二面 · 通过" },
        { t: d(-6), label: "三面(主管)· 通过" },
        { t: d(0), label: "HR 面 · 今天", up: true },
      ],
    },
    {
      id: "j07", company: "网易", role: "前端开发实习", team: "云音乐 · 创新业务",
      city: "杭州", salary: "280/天", channel: "boss", referrer: "",
      stage: "interview", round: 1, priority: 2, favorite: false,
      deadline: d(3), applied: d(-9),
      next: { action: "一面(技术面)", at: d(3) + " 10:30" },
      jd: "参与云音乐创新业务的前端开发,React / Vue 技术栈,做组件库与性能优化。\n\n岗位要求:\n• 熟悉 JS / TS,掌握至少一个主流框架\n• 了解工程化、性能优化\n• 有个人项目 / 开源经验优先",
      tags: ["React", "TypeScript", "性能"],
      notes: "一面约在后天上午。复习:闭包、事件循环、React 渲染机制、手写题。",
      events: [
        { t: d(-9), label: "投递 · BOSS" },
        { t: d(-4), label: "简历通过" },
        { t: d(3), label: "一面 · 待进行", up: true },
      ],
    },
    {
      id: "j08", company: "拼多多", role: "商业分析实习", team: "Temu · 海外运营",
      city: "上海", salary: "320/天", channel: "referral", referrer: "学长",
      stage: "rejected", round: 0, priority: 3, favorite: false,
      deadline: d(-10), applied: d(-20),
      next: { action: "", at: "" },
      jd: "支持 Temu 海外运营的商业分析,做市场测算与运营策略复盘。",
      tags: ["商业分析", "海外", "运营"],
      notes: "二面挂了,面试官说更想要有海外经历的。复盘:对当地市场了解不够深。",
      events: [
        { t: d(-20), label: "投递 · 内推" },
        { t: d(-14), label: "一面 通过" },
        { t: d(-10), label: "二面 · 未通过", down: true },
      ],
    },
    {
      id: "j09", company: "商汤科技", role: "CV 算法实习", team: "智能驾驶感知",
      city: "上海", salary: "350/天", channel: "official", referrer: "",
      stage: "applied", round: 0, priority: 2, favorite: false,
      deadline: d(7), applied: d(0),
      next: { action: "等待简历结果", at: "" },
      jd: "参与自动驾驶感知算法研发,目标检测 / 分割 / 多传感器融合。\n\n岗位要求:\n• 计算机视觉基础扎实\n• PyTorch 熟练\n• 了解检测/分割经典模型",
      tags: ["CV", "PyTorch", "自动驾驶"],
      notes: "今天刚投。",
      events: [{ t: d(0), label: "投递 · 官网", up: true }],
    },
    {
      id: "j10", company: "B站", role: "内容运营实习", team: "知识区",
      city: "上海", salary: "200/天", channel: "boss", referrer: "",
      stage: "screening", round: 0, priority: 3, favorite: false,
      deadline: d(5), applied: d(-4),
      next: { action: "等待简历结果", at: "" },
      jd: "负责知识区内容策划与 UP 主运营,做选题与活动。",
      tags: ["内容", "UP主", "活动"],
      notes: "比较佛系投的,看重兴趣匹配。",
      events: [
        { t: d(-4), label: "投递 · BOSS" },
        { t: d(-4), label: "简历筛选中", up: true },
      ],
    },
    {
      id: "j11", company: "蔚来", role: "供应链管理实习", team: "整车供应链",
      city: "合肥", salary: "180/天", channel: "campus", referrer: "",
      stage: "written", round: 0, priority: 3, favorite: false,
      deadline: d(2), applied: d(-7),
      next: { action: "在线测评", at: d(2) + " 23:59" },
      jd: "参与整车供应链计划与库存管理,做数据跟踪与异常分析。",
      tags: ["供应链", "计划", "数据"],
      notes: "测评包含行测 + 性格测试,截止后天。",
      events: [
        { t: d(-7), label: "投递 · 校招官网" },
        { t: d(-2), label: "测评邀请", up: true },
      ],
    },
    {
      id: "j12", company: "快手", role: "增长产品实习", team: "本地生活",
      city: "北京", salary: "300/天", channel: "referral", referrer: "朋友",
      stage: "interview", round: 1, priority: 2, favorite: true,
      deadline: d(8), applied: d(-11),
      next: { action: "一面改约时间", at: "" },
      jd: "负责本地生活增长产品,做拉新/留存策略与实验。\n\n岗位要求:\n• 增长黑客思维\n• 数据驱动\n• 了解本地生活业务优先",
      tags: ["增长", "本地生活", "实验"],
      notes: "一面时间和字节二面撞了,需要改约。先邮件协调。",
      events: [
        { t: d(-11), label: "投递 · 内推" },
        { t: d(-5), label: "简历通过" },
        { t: d(-1), label: "一面邀约 · 待改约", up: true },
      ],
    },
  ];

  // 简历版本
  const RESUMES = [
    { id: "r1", name: "通用版 · 产品方向", ver: "v3.2", updated: d(-2), uses: 5, color: "#D97757", note: "突出 0→1 与数据分析,适合互联网大厂产品岗" },
    { id: "r2", name: "技术版 · 研发方向", ver: "v2.1", updated: d(-8), uses: 4, color: "#3B5BDB", note: "强调项目与算法竞赛,放了 GitHub" },
    { id: "r3", name: "数据/分析版", ver: "v1.5", updated: d(-15), uses: 3, color: "#2E8B57", note: "SQL/Python + A/B 实验案例" },
    { id: "r4", name: "英文版 · 海外岗", ver: "v1.0", updated: d(-30), uses: 1, color: "#6B4F9A", note: "Temu / 海外岗位用,待完善" },
  ];

  window.APP_DATA = { STAGES, STAGE_MAP, CHANNELS, BRANDS, JOBS, RESUMES, TODAY, d };
})();
