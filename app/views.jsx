// ===== 主视图:看板 / 列表 / 时间线 =====

// ---- 看板卡片 ----
function BoardCard({ job, onOpen }) {
  const next = job.next && job.next.action;
  const showNextTime = job.next && job.next.at;
  return (
    <div className="bcard" onClick={() => onOpen(job)}>
      <div className="bcard-top">
        <Logo company={job.company} size={34} />
        <div className="bcard-id">
          <div className="bcard-co">
            {job.company}
            {job.favorite && <Icon name="star" size={12} stroke={0} style={{ fill: "#D9A441", color: "#D9A441", marginLeft: 4 }} />}
          </div>
          <div className="bcard-role">{job.role}</div>
        </div>
        <Priority level={job.priority} />
      </div>

      <div className="bcard-meta">
        <span><Icon name="pin" size={12.5} stroke={2} />{job.city}</span>
        <span className="mono"><Icon name="money" size={12.5} stroke={2} />{job.salary}</span>
      </div>

      {next && (
        <div className="bcard-next">
          <Icon name="arrowR" size={13} stroke={2.2} />
          <span className="bcard-next-act">{job.next.action}</span>
          {showNextTime && <span className="bcard-next-at">{job.next.at.slice(5)}</span>}
        </div>
      )}

      <div className="bcard-foot">
        <div className="bcard-tags">
          {job.tags.slice(0, 2).map((t) => <span key={t} className="tagmini">{t}</span>)}
        </div>
        {job.deadline && job.stage !== "offer" && job.stage !== "rejected" &&
          <DeadlinePill iso={job.deadline} />}
      </div>
    </div>
  );
}

// ---- 看板视图 ----
function BoardView({ jobs, onOpen, density }) {
  const STAGES = window.APP_DATA.STAGES;
  return (
    <div className={"board " + (density === "compact" ? "is-compact" : "")}>
      {STAGES.map((s) => {
        const col = jobs.filter((j) => j.stage === s.id);
        return (
          <div key={s.id} className="bcol">
            <div className="bcol-head">
              <span className="bcol-dot" style={{ background: s.dot }} />
              <span className="bcol-name">{s.name}</span>
              <span className="bcol-count">{col.length}</span>
            </div>
            <div className="bcol-body">
              {col.map((j) => <BoardCard key={j.id} job={j} onOpen={onOpen} />)}
              {col.length === 0 && <div className="bcol-empty">—</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- 列表视图 ----
function ListView({ jobs, onOpen, sortKey, setSortKey }) {
  const sorted = useMemo(() => {
    const arr = [...jobs];
    if (sortKey === "deadline") arr.sort((a, b) => (a.deadline || "9") < (b.deadline || "9") ? -1 : 1);
    else if (sortKey === "stage") {
      const order = window.APP_DATA.STAGES.map((s) => s.id);
      arr.sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage));
    } else if (sortKey === "priority") arr.sort((a, b) => a.priority - b.priority);
    else arr.sort((a, b) => (a.applied < b.applied ? 1 : -1));
    return arr;
  }, [jobs, sortKey]);

  const cols = [
    { k: "co", label: "公司 / 岗位", w: "minmax(220px,1.6fr)" },
    { k: "stage", label: "阶段", w: "120px" },
    { k: "progress", label: "进度", w: "120px" },
    { k: "salary", label: "薪资", w: "90px" },
    { k: "city", label: "地点", w: "80px" },
    { k: "next", label: "下一步", w: "minmax(160px,1.2fr)" },
    { k: "deadline", label: "截止", w: "110px" },
    { k: "priority", label: "优先", w: "60px" },
  ];
  const grid = cols.map((c) => c.w).join(" ");

  return (
    <div className="listwrap">
      <div className="lhead" style={{ gridTemplateColumns: grid }}>
        {cols.map((c) => (
          <div key={c.k} className={"lh " + (["stage", "next", "deadline", "priority"].includes(c.k) ? "sortable" : "")}
            onClick={() => ["deadline", "stage", "priority"].includes(c.k) && setSortKey(c.k)}>
            {c.label}
            {sortKey === c.k && <Icon name="chevD" size={12} stroke={2.5} style={{ marginLeft: 3 }} />}
          </div>
        ))}
      </div>
      <div className="lbody">
        {sorted.map((j) => (
          <div key={j.id} className="lrow" style={{ gridTemplateColumns: grid }} onClick={() => onOpen(j)}>
            <div className="lcell lcell-co">
              <Logo company={j.company} size={30} radius={8} />
              <div>
                <div className="lco">{j.company}
                  {j.favorite && <Icon name="star" size={11} stroke={0} style={{ fill: "#D9A441", color: "#D9A441", marginLeft: 4 }} />}
                </div>
                <div className="lrole">{j.role}</div>
              </div>
            </div>
            <div className="lcell"><StageChip stageId={j.stage} round={j.round} small /></div>
            <div className="lcell"><StageProgress stageId={j.stage} /></div>
            <div className="lcell mono lsalary">{j.salary}</div>
            <div className="lcell lmut">{j.city}</div>
            <div className="lcell lnext">{j.next && j.next.action ? j.next.action : <span className="lmut">—</span>}</div>
            <div className="lcell">
              {j.stage !== "offer" && j.stage !== "rejected"
                ? <DeadlinePill iso={j.deadline} />
                : <span className="lmut">—</span>}
            </div>
            <div className="lcell lcenter"><Priority level={j.priority} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- 时间线视图(按即将发生的事件排序)----
function TimelineView({ jobs, onOpen }) {
  // 收集所有"未来/今天的下一步"作为日程项
  const items = [];
  jobs.forEach((j) => {
    if (j.next && j.next.at) {
      items.push({ job: j, at: j.next.at, label: j.next.action, type: "action" });
    } else if (j.deadline && j.stage !== "offer" && j.stage !== "rejected") {
      items.push({ job: j, at: j.deadline + " 23:59", label: "投递/材料截止", type: "deadline" });
    }
  });
  items.sort((a, b) => (a.at < b.at ? -1 : 1));

  // 按天分组
  const groups = {};
  items.forEach((it) => {
    const day = it.at.slice(0, 10);
    (groups[day] = groups[day] || []).push(it);
  });
  const days = Object.keys(groups).sort();

  return (
    <div className="timeline">
      <div className="tl-rail">
        {days.map((day) => {
          const n = daysFromToday(day);
          const isPast = n < 0;
          return (
            <div key={day} className="tl-day">
              <div className="tl-daymark">
                <div className={"tl-date " + (n === 0 ? "is-today" : isPast ? "is-past" : "")}>
                  <span className="tl-dnum">{new Date(day).getDate()}</span>
                  <span className="tl-dmon">{new Date(day).getMonth() + 1}月</span>
                </div>
                <div className="tl-rel">{relDay(day)}</div>
              </div>
              <div className="tl-items">
                {groups[day].map((it, i) => {
                  const s = window.APP_DATA.STAGE_MAP[it.job.stage];
                  return (
                    <div key={i} className="tl-item" onClick={() => onOpen(it.job)}
                      style={{ borderLeftColor: it.type === "deadline" ? "#C25E3E" : s.dot }}>
                      <div className="tl-time mono">{it.at.slice(11) || "全天"}</div>
                      <div className="tl-body">
                        <div className="tl-label">
                          {it.type === "deadline" && <span className="tl-badge">截止</span>}
                          {it.label}
                        </div>
                        <div className="tl-sub">
                          <Logo company={it.job.company} size={18} radius={5} />
                          {it.job.company} · {it.job.role}
                        </div>
                      </div>
                      <StageChip stageId={it.job.stage} round={it.job.round} small />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { BoardView, ListView, TimelineView, BoardCard });
