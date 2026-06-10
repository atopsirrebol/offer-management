// ===== 数据统计 + 简历版本管理 =====

function stageReachIndex(job) {
  const order = window.APP_DATA.STAGES.map((s) => s.id);
  if (job.stage !== "rejected") return order.indexOf(job.stage);
  // 已拒:从事件里推断最远到达阶段
  const txt = job.events.map((e) => e.label).join(" ");
  if (/HR/.test(txt)) return order.indexOf("hr");
  if (/三面|二面|一面/.test(txt)) return order.indexOf("interview");
  if (/笔试|测评/.test(txt)) return order.indexOf("written");
  if (/简历|筛选/.test(txt)) return order.indexOf("screening");
  return 0;
}

function Dashboard({ jobs, onOpen }) {
  const S = window.APP_DATA;
  const total = jobs.length;
  const offers = jobs.filter((j) => j.stage === "offer").length;
  const active = jobs.filter((j) => j.stage !== "offer" && j.stage !== "rejected").length;
  const ended = jobs.filter((j) => j.stage === "rejected").length;
  const interviewing = jobs.filter((j) => ["interview", "hr"].includes(j.stage)).length;

  // 漏斗
  const funnelStages = [
    { id: "applied", name: "已投递" },
    { id: "screening", name: "简历通过" },
    { id: "written", name: "笔试/测评" },
    { id: "interview", name: "进入面试" },
    { id: "hr", name: "HR 面" },
    { id: "offer", name: "Offer" },
  ];
  const order = S.STAGES.map((s) => s.id);
  const reach = jobs.map(stageReachIndex);
  const funnel = funnelStages.map((fs) => {
    const idx = order.indexOf(fs.id);
    const n = reach.filter((r) => r >= idx).length;
    return { ...fs, n };
  });
  const maxN = funnel[0].n || 1;

  // 渠道分布
  const byCh = {};
  jobs.forEach((j) => { byCh[j.channel] = (byCh[j.channel] || 0) + 1; });
  const chans = Object.entries(byCh).sort((a, b) => b[1] - a[1]);
  const chColors = { official: "#7C8C9C", boss: "#5B95D0", referral: "#D97757", campus: "#54AE78", nowcoder: "#9579C9", other: "#C9A23F" };

  const kpis = [
    { label: "总投递", v: total, sub: "个岗位", ic: "building", tint: "#EFEAF7", ink: "#6B4F9A" },
    { label: "进行中", v: active, sub: "流程未结束", ic: "target", tint: "#E6F0F9", ink: "#2F6FB0" },
    { label: "面试阶段", v: interviewing, sub: "含 HR 面", ic: "user", tint: "#E1F2EE", ink: "#1F8A7A" },
    { label: "Offer", v: offers, sub: "已收获", ic: "star", tint: "#E5F2E9", ink: "#2E8B57" },
  ];

  return (
    <div className="dash">
      <div className="kpis">
        {kpis.map((k) => (
          <div key={k.label} className="kpi">
            <div className="kpi-ic" style={{ background: k.tint, color: k.ink }}><Icon name={k.ic} size={18} /></div>
            <div className="kpi-v mono">{k.v}</div>
            <div className="kpi-l">{k.label}</div>
            <div className="kpi-s">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-h"><span>投递漏斗</span><span className="panel-sub">各阶段到达人数 & 转化率</span></div>
          <div className="funnel">
            {funnel.map((f, i) => {
              const prev = i === 0 ? f.n : funnel[i - 1].n;
              const rate = prev ? Math.round((f.n / prev) * 100) : 0;
              const s = S.STAGE_MAP[f.id];
              return (
                <div key={f.id} className="fn-row">
                  <div className="fn-label">{f.name}</div>
                  <div className="fn-bar-wrap">
                    <div className="fn-bar" style={{ width: (f.n / maxN * 100) + "%", background: s.dot }}>
                      <span className="fn-n mono">{f.n}</span>
                    </div>
                  </div>
                  <div className="fn-rate mono">{i === 0 ? "—" : rate + "%"}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-h"><span>渠道分布</span><span className="panel-sub">哪个渠道更高效</span></div>
          <div className="donut-wrap">
            <Donut data={chans.map(([k, v]) => ({ v, color: chColors[k] || "#bbb" }))} total={total} />
            <div className="legend">
              {chans.map(([k, v]) => (
                <div key={k} className="leg-row">
                  <span className="leg-dot" style={{ background: chColors[k] || "#bbb" }} />
                  <span className="leg-name">{S.CHANNELS[k]}</span>
                  <span className="leg-v mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel panel-wide">
          <div className="panel-h"><span>需要关注</span><span className="panel-sub">临近或逾期的关键节点</span></div>
          <div className="attn">
            {jobs.filter((j) => j.next && j.next.at).sort((a, b) => a.next.at < b.next.at ? -1 : 1).slice(0, 4).map((j) => (
              <div key={j.id} className="attn-row" onClick={() => onOpen(j)}>
                <Logo company={j.company} size={30} radius={8} />
                <div className="attn-mid">
                  <div className="attn-act">{j.next.action}</div>
                  <div className="attn-co">{j.company} · {j.role}</div>
                </div>
                <DeadlinePill iso={j.next.at.slice(0, 10)} label="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Donut({ data, total }) {
  const R = 52, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="donut">
      <circle cx="70" cy="70" r={R} fill="none" stroke="#F0EAE5" strokeWidth="18" />
      {data.map((d, i) => {
        const frac = d.v / total;
        const seg = (
          <circle key={i} cx="70" cy="70" r={R} fill="none" stroke={d.color} strokeWidth="18"
            strokeDasharray={`${frac * C} ${C}`} strokeDashoffset={-acc * C}
            transform="rotate(-90 70 70)" strokeLinecap="butt" />
        );
        acc += frac;
        return seg;
      })}
      <text x="70" y="66" textAnchor="middle" className="donut-num">{total}</text>
      <text x="70" y="84" textAnchor="middle" className="donut-lab">总投递</text>
    </svg>
  );
}

// ---- 简历版本管理 ----
function ResumePanel() {
  const R = window.APP_DATA.RESUMES;
  return (
    <div className="resumes">
      <div className="res-head">
        <div><div className="res-title">简历 / 材料版本</div><div className="res-sub">针对不同方向维护多份,投递时选对版本</div></div>
        <button className="btn primary sm"><Icon name="plus" size={15} stroke={2.5} />新建版本</button>
      </div>
      <div className="res-grid">
        {R.map((r) => (
          <div key={r.id} className="res-card">
            <div className="res-top">
              <div className="res-ic" style={{ background: r.color + "1A", color: r.color }}><Icon name="doc" size={20} /></div>
              <span className="res-ver mono" style={{ color: r.color, background: r.color + "14" }}>{r.ver}</span>
            </div>
            <div className="res-name">{r.name}</div>
            <div className="res-note">{r.note}</div>
            <div className="res-foot">
              <span>更新于 {relDay(r.updated)}</span>
              <span className="res-uses">已用于 {r.uses} 个岗位</span>
            </div>
            <div className="res-actions">
              <button className="res-act"><Icon name="download" size={14} />导出</button>
              <button className="res-act"><Icon name="copy" size={14} />复制</button>
              <button className="res-act"><Icon name="edit" size={14} />编辑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, ResumePanel, Donut, stageReachIndex });
