// ===== 共享组件:图标、头像、标签、进度条等 =====
const { useState, useEffect, useRef, useMemo } = React;

// ---- 线性图标集(24x24,stroke 基底)----
function Icon({ name, size = 18, stroke = 2, style, className }) {
  const P = {
    board: "M4 5h5v14H4zM10 5h5v9h-5zM16 5h4v12h-4z",
    list: "M4 6h16M4 12h16M4 18h16",
    timeline: "M5 4v16M5 8h6M5 14h10M11 8a0 0 0 100 .01M15 14a0 0 0 100 .01",
    calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
    chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    doc: "M7 3h7l5 5v13H7zM14 3v5h5",
    plus: "M12 5v14M5 12h14",
    search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4-4",
    bell: "M6 9a6 6 0 1112 0c0 6 2 7 2 7H4s2-1 2-7M10 21a2 2 0 004 0",
    star: "M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z",
    chevR: "M9 6l6 6-6 6",
    chevD: "M6 9l6 6 6-6",
    chevL: "M15 6l-6 6 6 6",
    clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
    pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 10a0 0 0 100 .01",
    link: "M9 15l6-6M8 12l-2 2a3 3 0 004 4l2-2M16 12l2-2a3 3 0 00-4-4l-2 2",
    edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
    close: "M6 6l12 12M18 6L6 18",
    filter: "M3 5h18l-7 8v6l-4-2v-4z",
    dots: "M5 12a0 0 0 100 .01M12 12a0 0 0 100 .01M19 12a0 0 0 100 .01",
    check: "M5 13l4 4L19 7",
    building: "M4 21V5l8-2 8 2v16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h6",
    money: "M12 3v18M16 7a4 2.5 0 00-8 0c0 4 8 2 8 6a4 2.5 0 01-8 0",
    sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.7 2 .3 0M5 17l.6 1.6",
    arrowR: "M5 12h14M13 6l6 6-6 6",
    arrowUp: "M12 19V5M6 11l6-6 6 6",
    grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
    menu: "M4 7h16M4 12h16M4 17h16",
    home: "M4 11l8-7 8 7M6 10v10h12V10",
    flag: "M6 21V4M6 4h11l-2 4 2 4H6",
    user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0",
    copy: "M9 9h11v11H9zM5 15H4V4h11v1",
    download: "M12 4v11M7 11l5 4 5-4M5 20h14",
    target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 12a0 0 0 100 .01",
    trash: "M5 7h14M10 7V5h4v2M6 7l1 13h10l1-13M10 11v5M14 11v5",
    info: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 7.5v.01",
    chevron: "M9 6l6 6-6 6",
    switch: "M4 8h13l-3-3M20 16H7l3 3",
  };
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      <path d={P[name] || ""} />
    </svg>
  );
}

// ---- 公司头像(首字 + 品牌底色)----
function Logo({ company, size = 36, radius = 10 }) {
  const brand = (window.APP_DATA.BRANDS[company]) || "#8A7A6E";
  const ch = company ? company[0] : "?";
  return (
    <div className="logo" style={{
      width: size, height: size, borderRadius: radius,
      background: brand, color: "#fff", fontSize: size * 0.42,
    }}>{ch}</div>
  );
}

// ---- 阶段徽章 ----
function StageChip({ stageId, round, small }) {
  const s = window.APP_DATA.STAGE_MAP[stageId];
  if (!s) return null;
  let label = s.name;
  if (stageId === "interview" && round) label = ["", "一面", "二面", "三面", "四面"][round] || (round + "面");
  return (
    <span className="chip" style={{
      color: s.ink, background: s.bg,
      fontSize: small ? 11.5 : 12.5, padding: small ? "2px 8px" : "3px 10px",
    }}>
      <span className="chip-dot" style={{ background: s.dot }} />
      {label}
    </span>
  );
}

// ---- 优先级旗标 ----
function Priority({ level }) {
  const colors = { 1: "#C25E3E", 2: "#C99A3F", 3: "#9A938C" };
  const labels = { 1: "高", 2: "中", 3: "低" };
  return (
    <span className="prio" style={{ color: colors[level] }} title={"优先级 " + labels[level]}>
      <Icon name="flag" size={13} stroke={2.2} />
    </span>
  );
}

// ---- 日期工具 ----
function fmtDate(iso) {
  if (!iso) return "";
  const x = new Date(iso.slice(0, 10));
  return (x.getMonth() + 1) + "月" + x.getDate() + "日";
}
function daysFromToday(iso) {
  if (!iso) return null;
  const t = window.APP_DATA.TODAY;
  const x = new Date(iso.slice(0, 10));
  return Math.round((x - new Date(t.getFullYear(), t.getMonth(), t.getDate())) / 86400000);
}
function relDay(iso) {
  const n = daysFromToday(iso);
  if (n === null) return "";
  if (n === 0) return "今天";
  if (n === 1) return "明天";
  if (n === 2) return "后天";
  if (n === -1) return "昨天";
  if (n < 0) return Math.abs(n) + "天前";
  return n + "天后";
}

// ---- 截止日期紧迫度 ----
function DeadlinePill({ iso, label = "截止" }) {
  const n = daysFromToday(iso);
  if (n === null) return null;
  let tone = "calm";
  if (n < 0) tone = "past";
  else if (n <= 1) tone = "hot";
  else if (n <= 3) tone = "warm";
  return (
    <span className={"deadline deadline-" + tone}>
      <Icon name="clock" size={12} stroke={2.2} />
      {label} {n < 0 ? "已过" : relDay(iso)}
    </span>
  );
}

// ---- 迷你进度条(阶段推进)----
function StageProgress({ stageId, height = 4 }) {
  const stages = window.APP_DATA.STAGES.filter((s) => s.id !== "rejected");
  const idx = stageId === "rejected" ? -1 : stages.findIndex((s) => s.id === stageId);
  const s = window.APP_DATA.STAGE_MAP[stageId];
  return (
    <div className="track" style={{ height }}>
      {stages.map((st, i) => (
        <div key={st.id} className="track-seg" style={{
          background: stageId === "rejected" ? "#E6DED7"
            : i <= idx ? s.dot : "#ECE6E1",
        }} />
      ))}
    </div>
  );
}

Object.assign(window, { Icon, Logo, StageChip, Priority, DeadlinePill, StageProgress, fmtDate, daysFromToday, relDay });
