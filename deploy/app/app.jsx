// ===== 主应用外壳 =====

const NAV = [
{ id: "dash", name: "工作台", icon: "home" },
{ id: "pipe", name: "投递管线", icon: "board" },
{ id: "sched", name: "日程提醒", icon: "calendar" },
{ id: "resume", name: "简历版本", icon: "doc" }];


const PRIMARIES = ["#D97757", "#2F6FB0", "#2E8B57", "#6B4F9A", "#2A2724"];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "bgTone": "warm",
  "density": "regular",
  "corner": "rounded",
  "fontScale": 100,
  "displayNumbers": true
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = useState("dash");
  const [pipeView, setPipeView] = useState("board"); // board | list | timeline
  const [jobs, setJobs] = useState(() => {
    try {const s = localStorage.getItem("toudi_jobs_v1");if (s) return JSON.parse(s);} catch (e) {}
    return window.APP_DATA.JOBS;
  });
  const [sel, setSel] = useState(null);
  const [adding, setAdding] = useState(false);
  const [q, setQ] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [sortKey, setSortKey] = useState("deadline");

  // 应用 tweak 到 CSS 变量
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--primary", t.primaryColor);
    const tones = {
      warm: { bg: "#F6F2EE", surf2: "#FBF8F5", line: "#ECE5DF", ink: "#2A2724", ink2: "#6B645E" },
      cool: { bg: "#F1F3F6", surf2: "#F8FAFC", line: "#E4E8EE", ink: "#232830", ink2: "#5E646E" },
      neutral: { bg: "#F4F4F3", surf2: "#FAFAF9", line: "#E8E7E4", ink: "#26262490".slice(0, 7), ink2: "#646460" }
    };
    const tn = tones[t.bgTone] || tones.warm;
    r.style.setProperty("--bg", tn.bg);
    r.style.setProperty("--surface-2", tn.surf2);
    r.style.setProperty("--line", tn.line);
    r.style.setProperty("--ink", tn.ink);
    r.style.setProperty("--ink-2", tn.ink2);
    r.style.setProperty("--radius", t.corner === "rounded" ? "14px" : "6px");
    r.style.setProperty("--radius-sm", t.corner === "rounded" ? "9px" : "4px");
    r.style.setProperty("--fscale", t.fontScale / 100);
    r.style.setProperty("--num-font", t.displayNumbers ? "'Space Grotesk', monospace" : "inherit");
  }, [t]);

  // 数据持久化(编辑/备注/阶段变更都会保存,刷新不丢)
  useEffect(() => {
    try {localStorage.setItem("toudi_jobs_v1", JSON.stringify(jobs));} catch (e) {}
  }, [jobs]);

  const filtered = useMemo(() => {
    let arr = jobs;
    if (favOnly) arr = arr.filter((j) => j.favorite);
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      arr = arr.filter((j) => (j.company + j.role + j.team + j.city + j.tags.join("")).toLowerCase().includes(k));
    }
    return arr;
  }, [jobs, q, favOnly]);

  function advance(job) {
    const order = window.APP_DATA.STAGES.map((s) => s.id);
    const idx = order.indexOf(job.stage);
    const nextStage = idx < order.indexOf("offer") ? order[idx + 1] : job.stage;
    setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, stage: nextStage, round: nextStage === "interview" ? (j.round || 0) + 1 : j.round } : j));
    setSel((s) => s && s.id === job.id ? { ...s, stage: nextStage, round: nextStage === "interview" ? (s.round || 0) + 1 : s.round } : s);
  }

  function updateJob(id, patch) {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, ...patch } : j));
    setSel((s) => s && s.id === id ? { ...s, ...patch } : s);
  }

  function deleteJob(id) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setSel(null);
  }

  function saveJob(f) {
    if (!f.company && !f.role) {setAdding(false);return;}
    const id = "n" + Date.now();
    setJobs((prev) => [{
      id, company: f.company || "未命名公司", role: f.role || "实习岗位", team: "",
      city: f.city || "—", salary: f.salary || "面议", channel: f.channel, referrer: "",
      stage: "applied", round: 0, priority: Number(f.priority) || 2, favorite: false,
      deadline: f.deadline || "", applied: new Date().toISOString().slice(0, 10),
      next: { action: "等待简历结果", at: "" }, jd: f.jd || "", tags: f.tags || [], notes: "", shot: f.shot || null,
      events: [{ t: new Date().toISOString().slice(0, 10), label: "投递", up: true }]
    }, ...prev]);
    setNav("pipe");
    setAdding(false);
  }

  const titles = { dash: "工作台", pipe: "投递管线", sched: "日程提醒", resume: "简历版本" };
  const counts = { active: filtered.filter((j) => !["offer", "rejected"].includes(j.stage)).length };

  return (
    <div className={"app dens-" + t.density}>
      {/* 侧边栏 */}
      <nav className="side" style={{ fontFamily: "\"Microsoft YaHei\"" }}>
        <div className="brand">
          <div className="brand-mark" style={{ background: t.primaryColor }}><Icon name="flag" size={17} stroke={2.4} style={{ color: "#fff" }} /></div>
          <div className="brand-tx"><div className="brand-name">藕粉工作台</div><div className="brand-sub">秋招 / 实习</div></div>
        </div>
        <div className="nav">
          {NAV.map((n) =>
          <button key={n.id} className={"navi " + (nav === n.id ? "on" : "")} onClick={() => setNav(n.id)}>
              <Icon name={n.icon} size={19} /><span>{n.name}</span>
              {n.id === "pipe" && <span className="navi-badge mono">{jobs.length}</span>}
            </button>
          )}
        </div>
        <button className="side-add" onClick={() => setAdding(true)}><Icon name="plus" size={17} stroke={2.4} />添加岗位</button>
        <div className="side-foot">
          <div className="userchip"><div className="userav" style={{ fontFamily: "Helvetica" }}>刘</div><div><div className="user-n">刘同学</div><div className="user-s mono">{jobs.length} 个岗位跟进中</div></div></div>
        </div>
      </nav>

      {/* 主区 */}
      <main className="main">
        <header className="topbar" style={{ fontFamily: "\"Microsoft YaHei\"" }}>
          <div className="top-l">
            <h1 className="top-title">{titles[nav]}</h1>
            {nav === "pipe" && <span className="top-count">{counts.active} 个进行中</span>}
          </div>
          <div className="top-r">
            <div className="search"><Icon name="search" size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索公司 / 岗位 / 标签" /></div>
            {nav === "pipe" &&
            <>
                <button className={"chipbtn " + (favOnly ? "on" : "")} onClick={() => setFavOnly(!favOnly)}><Icon name="star" size={15} style={favOnly ? { fill: "currentColor" } : {}} />星标</button>
                <div className="vtoggle">
                  {[["board", "board", "看板"], ["list", "list", "列表"], ["timeline", "timeline", "时间线"]].map(([k, ic, l]) =>
                <button key={k} className={pipeView === k ? "on" : ""} onClick={() => setPipeView(k)} title={l}><Icon name={ic} size={16} /></button>
                )}
                </div>
              </>
            }
            <button className="addbtn" onClick={() => setAdding(true)}><Icon name="plus" size={16} stroke={2.4} /><span>添加</span></button>
          </div>
        </header>

        <section className="content" style={{ fontFamily: "\"Microsoft YaHei\"" }}>
          {nav === "dash" && <Dashboard jobs={jobs} onOpen={setSel} />}
          {nav === "pipe" && pipeView === "board" && <BoardView jobs={filtered} onOpen={setSel} density={t.density} />}
          {nav === "pipe" && pipeView === "list" && <ListView jobs={filtered} onOpen={setSel} sortKey={sortKey} setSortKey={setSortKey} />}
          {nav === "pipe" && pipeView === "timeline" && <TimelineView jobs={filtered} onOpen={setSel} />}
          {nav === "sched" && <ScheduleView jobs={jobs} onOpen={setSel} />}
          {nav === "resume" && <ResumePanel />}
        </section>
      </main>

      {/* 移动端底部导航 */}
      <nav className="botnav">
        {NAV.map((n) =>
        <button key={n.id} className={"boti " + (nav === n.id ? "on" : "")} onClick={() => setNav(n.id)}>
            <Icon name={n.icon} size={20} /><span>{n.name}</span>
          </button>
        )}
      </nav>

      {sel && <JobDetail job={sel} onClose={() => setSel(null)} onAdvance={advance} onUpdate={updateJob} onDelete={deleteJob} />}
      {adding && <AddJob onClose={() => setAdding(false)} onSave={saveJob} />}

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="主题" />
        <TweakColor label="主色调" value={t.primaryColor} options={PRIMARIES} onChange={(v) => setTweak("primaryColor", v)} />
        <TweakRadio label="背景色温" value={t.bgTone} options={["warm", "cool", "neutral"]} onChange={(v) => setTweak("bgTone", v)} />
        <TweakRadio label="圆角" value={t.corner} options={["rounded", "crisp"]} onChange={(v) => setTweak("corner", v)} />
        <TweakSection label="排版与密度" />
        <TweakRadio label="卡片密度" value={t.density} options={["compact", "regular"]} onChange={(v) => setTweak("density", v)} />
        <TweakSlider label="整体字号" value={t.fontScale} min={88} max={116} step={2} unit="%" onChange={(v) => setTweak("fontScale", v)} />
        <TweakToggle label="数字用展示字体" value={t.displayNumbers} onChange={(v) => setTweak("displayNumbers", v)} />
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);