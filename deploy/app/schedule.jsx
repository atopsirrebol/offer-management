// ===== 日程 / 提醒视图(以"待办节点"为中心)=====
function ScheduleView({ jobs, onOpen }) {
  const [done, setDone] = useState({});
  const [remind, setRemind] = useState(() => {
    const m = {}; jobs.forEach((j) => { if (j.priority <= 2) m[j.id] = true; }); return m;
  });

  // 收集待办节点
  const items = [];
  jobs.forEach((j) => {
    if (j.next && j.next.at) items.push({ job: j, at: j.next.at, label: j.next.action, kind: "action" });
    else if (j.deadline && j.stage !== "offer" && j.stage !== "rejected") items.push({ job: j, at: j.deadline + " 23:59", label: "投递 / 材料截止", kind: "deadline" });
  });
  items.sort((a, b) => (a.at < b.at ? -1 : 1));

  const buckets = { 逾期: [], 今天: [], 本周: [], 以后: [] };
  items.forEach((it) => {
    const n = daysFromToday(it.at.slice(0, 10));
    if (n < 0) buckets["逾期"].push(it);
    else if (n === 0) buckets["今天"].push(it);
    else if (n <= 7) buckets["本周"].push(it);
    else buckets["以后"].push(it);
  });

  const bucketTone = { 逾期: "#A8584F", 今天: "#C25E3E", 本周: "#9A6B1F", 以后: "#6B645E" };

  return (
    <div className="sched">
      <div className="sched-head">
        <div className="sched-title">日程与提醒</div>
        <div className="sched-sub">{items.filter((it) => !done[it.job.id + it.at]).length} 个待办节点 · 别让任何一个截止或面试溜走</div>
      </div>
      {Object.entries(buckets).map(([name, list]) => (
        list.length > 0 && (
          <div key={name} className="sched-bucket">
            <div className="sched-bname" style={{ color: bucketTone[name] }}>
              <span className="sched-bdot" style={{ background: bucketTone[name] }} />{name}
              <span className="sched-bcount">{list.length}</span>
            </div>
            <div className="sched-list">
              {list.map((it, i) => {
                const key = it.job.id + it.at;
                const isDone = done[key];
                return (
                  <div key={i} className={"sched-item " + (isDone ? "is-done" : "")}>
                    <button className={"sched-check " + (isDone ? "on" : "")} onClick={() => setDone({ ...done, [key]: !isDone })}>
                      {isDone && <Icon name="check" size={13} stroke={3} />}
                    </button>
                    <div className="sched-when">
                      <div className="sched-rel">{relDay(it.at.slice(0, 10))}</div>
                      <div className="sched-time mono">{it.at.slice(11) || "全天"}</div>
                    </div>
                    <div className="sched-main" onClick={() => onOpen(it.job)}>
                      <div className="sched-act">
                        {it.kind === "deadline" && <span className="sched-tag">截止</span>}
                        {it.label}
                      </div>
                      <div className="sched-co"><Logo company={it.job.company} size={18} radius={5} />{it.job.company} · {it.job.role}</div>
                    </div>
                    <StageChip stageId={it.job.stage} round={it.job.round} small />
                    <button className={"bellbtn " + (remind[it.job.id] ? "on" : "")} title="提醒"
                      onClick={() => setRemind({ ...remind, [it.job.id]: !remind[it.job.id] })}>
                      <Icon name="bell" size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
Object.assign(window, { ScheduleView });
