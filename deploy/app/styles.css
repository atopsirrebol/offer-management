:root{
  --bg:#F6F2EE; --surface:#FFFFFF; --surface-2:#FBF8F5;
  --ink:#2A2724; --ink-2:#6B645E; --ink-3:#9C948C; --line:#ECE5DF;
  --primary:#D97757; --radius:14px; --radius-sm:9px; --fscale:1;
  --num-font:'Space Grotesk', monospace;
  --shadow-sm:0 1px 2px rgba(40,30,20,.05), 0 1px 3px rgba(40,30,20,.04);
  --shadow-md:0 4px 14px rgba(40,30,20,.07), 0 1px 3px rgba(40,30,20,.05);
  --shadow-lg:0 18px 50px rgba(30,22,14,.16), 0 4px 14px rgba(30,22,14,.08);
  --tint:color-mix(in srgb, var(--primary) 11%, #fff);
  --tint-line:color-mix(in srgb, var(--primary) 26%, #fff);
  --primary-deep:color-mix(in srgb, var(--primary) 82%, #000);
}
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%}
body{
  font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei","Manrope","Segoe UI",sans-serif;
  font-size:calc(15px * var(--fscale)); color:var(--ink); background:var(--bg);
  -webkit-font-smoothing:antialiased; line-height:1.5;
}
.mono{font-family:var(--num-font);font-feature-settings:"tnum";letter-spacing:-.01em}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
input,select,textarea{font-family:inherit;font-size:inherit;color:inherit}
::-webkit-scrollbar{width:9px;height:9px}
::-webkit-scrollbar-thumb{background:#D9CFC6;border-radius:9px;border:2px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-thumb:hover{background:#C4B8AD;background-clip:padding-box}

/* ===== App layout ===== */
.app{display:grid;grid-template-columns:228px 1fr;height:100%;overflow:hidden}

/* ===== Sidebar ===== */
.side{background:var(--surface-2);border-right:1px solid var(--line);display:flex;flex-direction:column;padding:18px 14px;gap:6px}
.brand{display:flex;align-items:center;gap:11px;padding:6px 8px 16px}
.brand-mark{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;box-shadow:var(--shadow-sm)}
.brand-name{font-weight:700;font-size:15.5px;letter-spacing:.02em}
.brand-sub{font-size:11.5px;color:var(--ink-3);margin-top:1px}
.nav{display:flex;flex-direction:column;gap:3px;margin-top:4px}
.navi{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:10px;color:var(--ink-2);font-size:14px;font-weight:500;transition:.15s;position:relative}
.navi:hover{background:rgba(0,0,0,.035);color:var(--ink)}
.navi.on{background:var(--surface);color:var(--ink);font-weight:600;box-shadow:var(--shadow-sm)}
.navi.on svg{color:var(--primary)}
.navi-badge{margin-left:auto;font-size:11px;background:rgba(0,0,0,.05);color:var(--ink-3);padding:1px 7px;border-radius:20px}
.side-add{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:auto;margin-bottom:10px;padding:11px;border-radius:11px;background:var(--ink);color:#fff;font-weight:600;font-size:13.5px;transition:.15s}
.side-add:hover{background:var(--primary);transform:translateY(-1px)}
.side-foot{border-top:1px solid var(--line);padding-top:12px}
.userchip{display:flex;align-items:center;gap:10px;padding:4px}
.userav{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#E8A87C,#D97757);color:#fff;display:grid;place-items:center;font-weight:600;font-size:14px}
.user-n{font-size:13px;font-weight:600}
.user-s{font-size:11px;color:var(--ink-3)}

/* ===== Topbar ===== */
.main{display:flex;flex-direction:column;min-width:0;overflow:hidden}
.topbar{display:flex;align-items:center;gap:16px;padding:16px 26px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--bg) 60%,#fff);flex-shrink:0}
.top-l{display:flex;align-items:baseline;gap:12px;min-width:0}
.top-title{font-size:20px;font-weight:700;letter-spacing:.01em}
.top-count{font-size:12.5px;color:var(--ink-3);background:var(--surface);padding:3px 10px;border-radius:20px;border:1px solid var(--line)}
.top-r{display:flex;align-items:center;gap:10px;margin-left:auto}
.search{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:7px 12px;width:248px;color:var(--ink-3);transition:.15s}
.search:focus-within{border-color:var(--tint-line);box-shadow:0 0 0 3px var(--tint)}
.search input{border:none;outline:none;background:none;width:100%;color:var(--ink)}
.chipbtn{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:10px;border:1px solid var(--line);background:var(--surface);font-size:13px;color:var(--ink-2);transition:.15s}
.chipbtn:hover{border-color:var(--tint-line)}
.chipbtn.on{color:var(--primary);border-color:var(--tint-line);background:var(--tint)}
.vtoggle{display:flex;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:3px;gap:2px}
.vtoggle button{padding:6px 10px;border-radius:7px;color:var(--ink-3);display:grid;place-items:center;transition:.15s}
.vtoggle button:hover{color:var(--ink-2)}
.vtoggle button.on{background:var(--ink);color:#fff}
.addbtn{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;background:var(--primary);color:#fff;font-weight:600;font-size:13.5px;box-shadow:var(--shadow-sm);transition:.15s}
.addbtn:hover{background:var(--primary-deep);transform:translateY(-1px)}
.content{flex:1;overflow:auto;padding:24px 26px;min-height:0}

/* ===== Shared atoms ===== */
.logo{display:grid;place-items:center;font-weight:700;flex-shrink:0;letter-spacing:.02em}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:20px;font-weight:600;white-space:nowrap}
.chip-dot{width:6px;height:6px;border-radius:50%}
.tagmini{font-size:11.5px;color:var(--ink-2);background:rgba(0,0,0,.04);padding:2px 8px;border-radius:6px;white-space:nowrap}
.prio{display:inline-flex}
.deadline{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:600;padding:2px 8px;border-radius:7px;white-space:nowrap}
.deadline-calm{color:#6B7A6B;background:#EDF1ED}
.deadline-warm{color:#9A6B1F;background:#F7EFDD}
.deadline-hot{color:#C25036;background:#FBE7DF}
.deadline-past{color:#9C948C;background:#F0EBE6}
.track{display:flex;gap:2px;width:100%}
.track-seg{flex:1;border-radius:2px}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 16px;border-radius:11px;font-weight:600;font-size:13.5px;transition:.15s}
.btn.sm{padding:7px 12px;font-size:13px;border-radius:9px}
.btn.primary{background:var(--primary);color:#fff;box-shadow:var(--shadow-sm)}
.btn.primary:hover{background:var(--primary-deep)}
.btn.ghost{background:var(--surface);border:1px solid var(--line);color:var(--ink-2)}
.btn.ghost:hover{border-color:var(--tint-line);color:var(--ink)}
.iconbtn{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;color:var(--ink-2);transition:.15s}
.iconbtn:hover{background:rgba(0,0,0,.05);color:var(--ink)}

/* ===== Board ===== */
.board{display:flex;gap:14px;height:100%;padding-bottom:6px;align-items:flex-start;min-width:max-content}
.bcol{width:266px;flex-shrink:0;display:flex;flex-direction:column;max-height:100%}
.bcol-head{display:flex;align-items:center;gap:8px;padding:4px 6px 10px}
.bcol-dot{width:8px;height:8px;border-radius:50%}
.bcol-name{font-weight:600;font-size:13.5px}
.bcol-count{font-size:11.5px;color:var(--ink-3);background:rgba(0,0,0,.05);padding:1px 7px;border-radius:20px}
.bcol-body{display:flex;flex-direction:column;gap:10px;overflow-y:auto;padding:2px 2px 8px;flex:1}
.bcol-empty{text-align:center;color:var(--ink-3);font-size:18px;padding:14px 0;opacity:.5}
.bcard{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:13px;display:flex;flex-direction:column;gap:10px;cursor:pointer;box-shadow:var(--shadow-sm);transition:.16s}
.bcard:hover{box-shadow:var(--shadow-md);transform:translateY(-2px);border-color:var(--tint-line)}
.bcard-top{display:flex;align-items:center;gap:10px}
.bcard-id{min-width:0;flex:1}
.bcard-co{font-weight:600;font-size:13.5px;display:flex;align-items:center}
.bcard-role{font-size:12px;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.bcard-meta{display:flex;gap:14px;font-size:12px;color:var(--ink-2)}
.bcard-meta span{display:flex;align-items:center;gap:4px}
.bcard-meta svg{color:var(--ink-3)}
.bcard-next{display:flex;align-items:center;gap:6px;background:var(--surface-2);border:1px solid var(--line);border-radius:9px;padding:7px 9px;font-size:12px}
.bcard-next svg{color:var(--primary);flex-shrink:0}
.bcard-next-act{font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bcard-next-at{margin-left:auto;color:var(--ink-3);font-size:11px;white-space:nowrap}
.bcard-foot{display:flex;align-items:center;justify-content:space-between;gap:8px}
.bcard-tags{display:flex;gap:5px;overflow:hidden}
.dens-compact .bcard{padding:10px;gap:7px}
.dens-compact .bcard-meta,.dens-compact .bcard-next{font-size:11.5px}
.dens-compact .bcol{width:240px}

/* ===== List ===== */
.listwrap{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-sm)}
.lhead{display:grid;gap:14px;padding:11px 18px;border-bottom:1px solid var(--line);background:var(--surface-2);font-size:11.5px;color:var(--ink-3);font-weight:600;letter-spacing:.02em;position:sticky;top:0;z-index:2}
.lh{display:flex;align-items:center}
.lh.sortable{cursor:pointer}
.lh.sortable:hover{color:var(--ink-2)}
.lbody{display:flex;flex-direction:column}
.lrow{display:grid;gap:14px;padding:13px 18px;border-bottom:1px solid var(--line);align-items:center;cursor:pointer;transition:.12s}
.lrow:last-child{border-bottom:none}
.lrow:hover{background:var(--surface-2)}
.lcell{min-width:0;font-size:13px}
.lcell-co{display:flex;align-items:center;gap:11px}
.lco{font-weight:600;font-size:13.5px;display:flex;align-items:center}
.lrole{font-size:12px;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.lsalary{font-weight:600}
.lmut{color:var(--ink-3)}
.lnext{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink-2)}
.lcenter{display:flex;justify-content:center}
.dens-compact .lrow{padding:9px 18px}

/* ===== Timeline ===== */
.timeline{max-width:760px}
.tl-rail{display:flex;flex-direction:column;gap:4px}
.tl-day{display:grid;grid-template-columns:88px 1fr;gap:16px;padding:10px 0}
.tl-daymark{text-align:right;padding-top:4px}
.tl-date{display:inline-flex;flex-direction:column;align-items:center;padding:6px 10px;border-radius:11px;background:var(--surface);border:1px solid var(--line);min-width:54px}
.tl-date.is-today{background:var(--primary);border-color:var(--primary);color:#fff}
.tl-date.is-past{opacity:.55}
.tl-dnum{font-size:19px;font-weight:700;font-family:var(--num-font)}
.tl-dmon{font-size:10.5px;color:inherit;opacity:.7}
.tl-rel{font-size:11.5px;color:var(--ink-3);margin-top:6px}
.tl-items{display:flex;flex-direction:column;gap:8px}
.tl-item{display:flex;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--line);border-left:3px solid;border-radius:var(--radius-sm);padding:12px 14px;cursor:pointer;box-shadow:var(--shadow-sm);transition:.15s}
.tl-item:hover{box-shadow:var(--shadow-md);transform:translateX(2px)}
.tl-time{font-size:12.5px;color:var(--ink-2);width:46px;flex-shrink:0;font-weight:600}
.tl-body{flex:1;min-width:0}
.tl-label{font-weight:600;font-size:13.5px;display:flex;align-items:center;gap:7px}
.tl-badge{font-size:10.5px;background:#FBE7DF;color:#C25036;padding:1px 7px;border-radius:5px;font-weight:700}
.tl-sub{font-size:12px;color:var(--ink-2);display:flex;align-items:center;gap:6px;margin-top:3px}

/* ===== Dashboard ===== */
.dash{display:flex;flex-direction:column;gap:18px;max-width:1080px}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.kpi{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:18px;box-shadow:var(--shadow-sm)}
.kpi-ic{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;margin-bottom:12px}
.kpi-v{font-size:32px;font-weight:700;line-height:1}
.kpi-l{font-size:13.5px;font-weight:600;margin-top:6px}
.kpi-s{font-size:11.5px;color:var(--ink-3);margin-top:2px}
.dash-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:14px}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm)}
.panel-wide{grid-column:1/-1}
.panel-h{display:flex;align-items:baseline;gap:10px;margin-bottom:18px}
.panel-h>span:first-child{font-weight:700;font-size:15px}
.panel-sub{font-size:11.5px;color:var(--ink-3)}
.funnel{display:flex;flex-direction:column;gap:11px}
.fn-row{display:grid;grid-template-columns:72px 1fr 44px;align-items:center;gap:12px}
.fn-label{font-size:12.5px;color:var(--ink-2);text-align:right}
.fn-bar-wrap{background:var(--surface-2);border-radius:7px;overflow:hidden;height:30px;display:flex}
.fn-bar{height:100%;border-radius:7px;display:flex;align-items:center;justify-content:flex-end;padding:0 10px;min-width:30px;transition:width .5s cubic-bezier(.2,.8,.2,1)}
.fn-n{color:#fff;font-size:13px;font-weight:700}
.fn-rate{font-size:12px;color:var(--ink-3);text-align:right;font-weight:600}
.donut-wrap{display:flex;align-items:center;gap:20px}
.donut-num{font-size:26px;font-weight:700;fill:var(--ink);font-family:var(--num-font)}
.donut-lab{font-size:10px;fill:var(--ink-3)}
.legend{display:flex;flex-direction:column;gap:9px;flex:1}
.leg-row{display:flex;align-items:center;gap:9px;font-size:13px}
.leg-dot{width:9px;height:9px;border-radius:3px;flex-shrink:0}
.leg-name{color:var(--ink-2)}
.leg-v{margin-left:auto;font-weight:700}
.attn{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.attn-row{display:flex;align-items:center;gap:11px;background:var(--surface-2);border:1px solid var(--line);border-radius:11px;padding:11px 13px;cursor:pointer;transition:.15s}
.attn-row:hover{border-color:var(--tint-line);transform:translateY(-1px)}
.attn-mid{flex:1;min-width:0}
.attn-act{font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.attn-co{font-size:11.5px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}

/* ===== Schedule ===== */
.sched{max-width:720px;display:flex;flex-direction:column;gap:22px}
.sched-head .sched-title{font-size:18px;font-weight:700}
.sched-head .sched-sub{font-size:13px;color:var(--ink-3);margin-top:3px}
.sched-bucket{display:flex;flex-direction:column;gap:9px}
.sched-bname{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700}
.sched-bdot{width:7px;height:7px;border-radius:50%}
.sched-bcount{font-size:11px;color:var(--ink-3);background:rgba(0,0,0,.05);padding:1px 7px;border-radius:20px;font-weight:600}
.sched-list{display:flex;flex-direction:column;gap:8px}
.sched-item{display:flex;align-items:center;gap:13px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-sm);padding:12px 14px;box-shadow:var(--shadow-sm);transition:.15s}
.sched-item.is-done{opacity:.5}
.sched-item.is-done .sched-act{text-decoration:line-through}
.sched-check{width:22px;height:22px;border-radius:7px;border:2px solid var(--line);display:grid;place-items:center;color:#fff;flex-shrink:0;transition:.15s}
.sched-check:hover{border-color:var(--primary)}
.sched-check.on{background:var(--primary);border-color:var(--primary)}
.sched-when{text-align:center;width:50px;flex-shrink:0}
.sched-rel{font-size:12px;font-weight:600}
.sched-time{font-size:11px;color:var(--ink-3)}
.sched-main{flex:1;min-width:0;cursor:pointer}
.sched-act{font-weight:600;font-size:13.5px;display:flex;align-items:center;gap:7px}
.sched-tag{font-size:10.5px;background:#FBE7DF;color:#C25036;padding:1px 7px;border-radius:5px;font-weight:700}
.sched-co{font-size:12px;color:var(--ink-2);display:flex;align-items:center;gap:6px;margin-top:3px}
.bellbtn{width:32px;height:32px;border-radius:8px;display:grid;place-items:center;color:var(--ink-3);flex-shrink:0;transition:.15s}
.bellbtn:hover{background:rgba(0,0,0,.05)}
.bellbtn.on{color:var(--primary)}

/* ===== Resume ===== */
.resumes{max-width:900px}
.res-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px}
.res-title{font-size:18px;font-weight:700}
.res-sub{font-size:13px;color:var(--ink-3);margin-top:3px}
.res-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.res-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:18px;box-shadow:var(--shadow-sm);transition:.15s}
.res-card:hover{box-shadow:var(--shadow-md)}
.res-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px}
.res-ic{width:42px;height:42px;border-radius:11px;display:grid;place-items:center}
.res-ver{font-size:12px;font-weight:700;padding:3px 9px;border-radius:7px}
.res-name{font-weight:700;font-size:15px}
.res-note{font-size:12.5px;color:var(--ink-2);margin-top:6px;line-height:1.5}
.res-foot{display:flex;justify-content:space-between;font-size:11.5px;color:var(--ink-3);margin-top:14px;padding-top:13px;border-top:1px solid var(--line)}
.res-actions{display:flex;gap:8px;margin-top:12px}
.res-act{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--ink-2);padding:6px 11px;border-radius:8px;border:1px solid var(--line);transition:.15s}
.res-act:hover{border-color:var(--tint-line);color:var(--primary)}

/* ===== Drawer (detail) ===== */
.drawer-scrim{position:fixed;inset:0;background:rgba(30,22,14,.32);backdrop-filter:blur(2px);z-index:40;animation:fade .2s}
@keyframes fade{from{opacity:0}}
.drawer{position:fixed;top:0;right:0;bottom:0;width:480px;max-width:94vw;background:var(--surface);z-index:41;display:flex;flex-direction:column;box-shadow:var(--shadow-lg);animation:slideIn .26s cubic-bezier(.22,1,.36,1)}
.drawer.floating{top:auto;right:auto;bottom:auto;border:1px solid var(--line);border-radius:16px;overflow:hidden;max-width:none;animation:popIn .2s cubic-bezier(.22,1,.36,1)}
@keyframes popIn{from{transform:scale(.97);opacity:.5}}
.draghandle{cursor:grab;touch-action:none;user-select:none}
.draghandle:active{cursor:grabbing}
.drag-hint{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink-3);pointer-events:none}
.drag-hint span{font-weight:500}
.resize-grip{position:absolute;right:2px;bottom:2px;width:22px;height:22px;display:grid;place-items:center;color:var(--ink-3);cursor:nwse-resize;touch-action:none;border-radius:0 0 14px 0;transition:.15s}
.resize-grip:hover{color:var(--primary)}
@keyframes slideIn{from{transform:translateX(30px);opacity:.6}}
.drawer-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--line);flex-shrink:0}
.drawer-head-actions{display:flex;gap:4px}
.drawer-scroll{flex:1;overflow-y:auto;padding:22px}
.dh{display:flex;gap:14px;align-items:flex-start}
.dh-co{font-size:13px;color:var(--ink-2);font-weight:600}
.dh-role{font-size:19px;font-weight:700;margin-top:2px;line-height:1.25}
.dh-team{font-size:12.5px;color:var(--ink-3);margin-top:4px}
.stepper{display:flex;justify-content:space-between;margin:22px 4px 6px;position:relative}
.stepper::before{content:"";position:absolute;top:8px;left:14px;right:14px;height:2px;background:var(--line)}
.step{display:flex;flex-direction:column;align-items:center;gap:7px;position:relative;z-index:1;flex:1}
.step-dot{width:18px;height:18px;border-radius:50%;background:var(--surface);border:2px solid var(--line);display:grid;place-items:center;color:#fff;transition:.2s}
.step-label{font-size:11px;color:var(--ink-3)}
.step.active .step-label{color:var(--ink);font-weight:700}
.step.done .step-label{color:var(--ink-2)}
.dh-rejected{display:flex;align-items:center;gap:6px;justify-content:center;color:#A8584F;background:#F6E9E7;border-radius:9px;padding:8px;font-size:12.5px;font-weight:600;margin-top:12px}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:11px;overflow:hidden;margin-top:20px}
.fact{background:var(--surface);padding:11px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.fact-k{font-size:12px;color:var(--ink-3)}
.fact-v{font-size:13px;font-weight:600;text-align:right}
.next-banner{display:flex;align-items:center;gap:13px;background:var(--tint);border:1px solid var(--tint-line);border-radius:12px;padding:14px;margin-top:16px}
.next-ic{width:38px;height:38px;border-radius:10px;background:var(--primary);color:#fff;display:grid;place-items:center;flex-shrink:0}
.next-tx{flex:1}
.next-label{font-size:11px;color:var(--primary-deep);font-weight:700;letter-spacing:.04em}
.next-act{font-size:14.5px;font-weight:700;margin-top:2px}
.next-at{text-align:right}
.next-at-d{font-size:12.5px;font-weight:700;color:var(--primary-deep)}
.next-at-t{font-size:11.5px;color:var(--ink-2)}
.seg{display:flex;gap:3px;background:var(--surface-2);border:1px solid var(--line);border-radius:11px;padding:3px;margin-top:22px}
.seg-btn{flex:1;padding:8px;border-radius:8px;font-size:13px;font-weight:600;color:var(--ink-2);transition:.15s}
.seg-btn:hover{color:var(--ink)}
.seg-btn.on{background:var(--surface);color:var(--ink);box-shadow:var(--shadow-sm)}
.tabpane{padding:18px 2px}
.jd-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.jd-text{font-family:inherit;white-space:pre-wrap;font-size:13.5px;line-height:1.7;color:var(--ink);background:var(--surface-2);border:1px solid var(--line);border-radius:11px;padding:16px}
.jd-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--primary);margin-top:14px;text-decoration:none;font-weight:600}
.jd-link:hover{text-decoration:underline}
.prep-head{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;font-weight:600;color:var(--ink-2);background:var(--tint);border-radius:10px;padding:11px 13px}
.prep-head-l{display:flex;align-items:center;gap:8px}
.prep-sub{display:flex;align-items:center;font-size:12px;font-weight:700;color:var(--ink-3);letter-spacing:.04em;margin:18px 0 10px}
.prep-add{margin-left:auto;display:inline-flex;align-items:center;gap:3px;font-weight:600;color:var(--primary);cursor:pointer;font-size:12px;letter-spacing:0}
.prep-add:hover{text-decoration:underline}
.prep-edit-list{display:flex;flex-direction:column;gap:8px}
.prep-edit-row{display:flex;gap:9px;align-items:flex-start}
.prep-input{flex:1;border:1px solid var(--line);border-radius:9px;padding:8px 11px;font-family:inherit;font-size:13.5px;line-height:1.5;background:var(--surface-2);outline:none;resize:none;color:var(--ink);min-height:36px;overflow:hidden;transition:border-color .15s,box-shadow .15s}
.prep-input:focus{border-color:var(--tint-line);box-shadow:0 0 0 3px var(--tint);background:var(--surface)}
.prep-input::placeholder{color:var(--ink-3)}
.prep-del{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;color:var(--ink-3);flex-shrink:0;margin-top:5px;transition:.15s}
.prep-del:hover{background:#FBEAE7;color:#B0584F}
.prep-edit-row .prep-num{padding-top:11px}
.prep-empty{font-size:12.5px;color:var(--ink-3);padding:6px 2px}
.prep-saved{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:600;color:#2E8B57;margin-top:14px}
.prep-saved svg{color:#54AE78}
.prep-list{list-style:none;display:flex;flex-direction:column;gap:9px}
.prep-list li{display:flex;gap:11px;font-size:13.5px;line-height:1.5;align-items:flex-start}
.prep-num{color:var(--primary);font-weight:700;font-size:12px;flex-shrink:0;padding-top:2px}
.prep-tips{list-style:none;display:flex;flex-direction:column;gap:9px}
.prep-tips li{display:flex;gap:9px;font-size:13px;line-height:1.5;color:var(--ink-2);align-items:flex-start}
.prep-tips svg{color:#54AE78;flex-shrink:0;margin-top:2px}
.dtl{display:flex;flex-direction:column;gap:2px;padding-left:4px}
.dtl-row{display:flex;gap:14px;padding-bottom:18px;position:relative}
.dtl-row::before{content:"";position:absolute;left:5px;top:14px;bottom:-4px;width:2px;background:var(--line)}
.dtl-row:last-child::before{display:none}
.dtl-dot{width:12px;height:12px;border-radius:50%;background:var(--surface);border:2px solid var(--ink-3);margin-top:2px;flex-shrink:0;z-index:1}
.dtl-row.up .dtl-dot{border-color:var(--primary);background:var(--primary)}
.dtl-row.down .dtl-dot{border-color:#A8584F;background:#A8584F}
.dtl-label{font-size:13.5px;font-weight:600}
.dtl-date{font-size:11.5px;color:var(--ink-3);margin-top:2px}
.notes-card{font-size:13.5px;line-height:1.7;color:var(--ink);background:var(--surface-2);border:1px solid var(--line);border-radius:11px;padding:16px;min-height:90px}
.drawer-foot{display:flex;gap:10px;padding:14px 18px;border-top:1px solid var(--line);flex-shrink:0}
.drawer-foot .btn.grow{flex:1}
.btn.danger{background:#FBEAE7;color:#B0584F;border:1px solid #F0D4CF}
.btn.danger:hover{background:#F6DDD8}
.offer-foot{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13.5px;font-weight:700;color:#2E8B57;background:#E5F2E9;border-radius:11px;padding:10px}
.editform{margin-top:18px;display:flex;flex-direction:column;gap:14px}
.ef-head{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:var(--primary-deep);background:var(--tint);border-radius:9px;padding:9px 12px}
.ef-delete{display:inline-flex;align-items:center;gap:5px;align-self:flex-start;margin-top:4px;font-size:12.5px;font-weight:600;color:#B0584F;padding:7px 12px;border-radius:9px;border:1px solid #F0D4CF;background:#FCF1EF;transition:.15s}
.ef-delete:hover{background:#F6DDD8}
.notes-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.notes-hint{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ink-3)}
.notes-bar-r{display:flex;align-items:center;gap:8px}
.saved-flash{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:600;color:#2E8B57;animation:fade .25s}
.saved-flash svg{color:#54AE78}
.notes-editor{width:100%;min-height:280px;border:1px solid var(--line);border-radius:11px;padding:15px;font-family:inherit;font-size:13.5px;line-height:1.75;color:var(--ink);background:var(--surface-2);outline:none;resize:vertical;transition:.15s}
.notes-editor:focus{border-color:var(--tint-line);box-shadow:0 0 0 3px var(--tint);background:var(--surface)}
.notes-editor::placeholder{color:var(--ink-3);line-height:1.7}
.iconbtn.on{background:var(--tint);color:var(--primary)}

/* ===== Modal (add) ===== */
.modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:580px;max-width:94vw;max-height:90vh;background:var(--surface);border-radius:18px;z-index:41;display:flex;flex-direction:column;box-shadow:var(--shadow-lg);animation:pop .24s cubic-bezier(.2,.8,.2,1);overflow:hidden}
@keyframes pop{from{transform:translate(-50%,-46%) scale(.97);opacity:.5}}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--line)}
.modal-title{font-size:17px;font-weight:700}
.modal-body{padding:20px 22px;overflow-y:auto;display:flex;flex-direction:column;gap:14px}
.paste-hint{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-2);background:var(--tint);border-radius:9px;padding:10px 12px}
.frow{display:flex;gap:14px}
.field{display:flex;flex-direction:column;gap:6px;flex:1}
.field>span{font-size:12px;font-weight:600;color:var(--ink-2)}
.field-prio{max-width:96px}
.field input,.field select,.field textarea{border:1px solid var(--line);border-radius:9px;padding:10px 12px;outline:none;background:var(--surface-2);transition:.15s;resize:vertical}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--tint-line);box-shadow:0 0 0 3px var(--tint);background:var(--surface)}
.field input::placeholder,.field textarea::placeholder{color:var(--ink-3)}
.modal-foot{display:flex;justify-content:flex-end;gap:10px;padding:16px 22px;border-top:1px solid var(--line)}

/* ===== JD 截图识别 / 智能填表 ===== */
.dropzone{border:1.5px dashed var(--tint-line);background:var(--tint);border-radius:12px;padding:22px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:5px;cursor:pointer;transition:.16s}
.dropzone:hover,.dropzone.drag{background:color-mix(in srgb,var(--primary) 16%,#fff);border-color:var(--primary)}
.dz-ic{width:42px;height:42px;border-radius:12px;background:var(--primary);color:#fff;display:grid;place-items:center;margin-bottom:4px}
.dz-title{font-weight:700;font-size:14px}
.dz-sub{font-size:12px;color:var(--ink-2);max-width:380px;line-height:1.5}
.dz-cap{font-size:11px;color:var(--primary-deep);background:rgba(255,255,255,.55);padding:3px 10px;border-radius:20px;margin-top:6px;font-weight:600}
.shot-row{display:flex;gap:14px;align-items:center;background:var(--surface-2);border:1px solid var(--line);border-radius:12px;padding:12px}
.shot-prev{width:84px;height:84px;object-fit:cover;border-radius:9px;border:1px solid var(--line);flex-shrink:0}
.shot-meta{flex:1}
.shot-name{display:flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600}
.shot-actions{display:flex;gap:8px;margin-top:10px}
.ingest-state{display:flex;flex-direction:column;gap:8px}
.prog-bar{height:6px;background:var(--surface-2);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.prog-fill{height:100%;background:var(--primary);border-radius:20px;transition:width .35s ease}
.ingest-msg{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-2)}
.ingest-msg.busy{color:var(--primary-deep)}
.ingest-msg.done{color:#2E8B57;font-weight:600}
.ingest-msg svg{color:#54AE78}
.spin{width:13px;height:13px;border:2px solid var(--tint-line);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
.tags-edit{display:flex;flex-wrap:wrap;gap:6px}
.field-jd-label{display:flex;align-items:center;justify-content:space-between}
.mini-ai{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:var(--primary);background:var(--tint);padding:4px 9px;border-radius:7px;transition:.15s}
.mini-ai:hover:not(:disabled){background:color-mix(in srgb,var(--primary) 18%,#fff)}
.mini-ai:disabled{opacity:.45;cursor:not-allowed}
.jd-shot{width:100%;border-radius:11px;border:1px solid var(--line);margin-bottom:14px;display:block}

/* ===== Mobile bottom nav ===== */
.botnav{display:none}

/* ===== Responsive ===== */
@media(max-width:1100px){.dash-grid{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(2,1fr)}.attn{grid-template-columns:1fr}}
@media(max-width:860px){
  .app{grid-template-columns:1fr}
  .side{display:none}
  .botnav{display:flex;position:fixed;bottom:0;left:0;right:0;background:color-mix(in srgb,var(--surface) 92%,transparent);backdrop-filter:blur(12px);border-top:1px solid var(--line);padding:8px 6px calc(8px + env(safe-area-inset-bottom));z-index:30;justify-content:space-around}
  .boti{display:flex;flex-direction:column;align-items:center;gap:3px;color:var(--ink-3);font-size:10.5px;padding:4px 14px;border-radius:10px;flex:1}
  .boti.on{color:var(--primary)}
  .content{padding:16px 14px 80px}
  .topbar{padding:12px 14px;gap:10px;flex-wrap:wrap}
  .top-title{font-size:18px}
  .search{width:100%;order:5}
  .res-grid,.facts{grid-template-columns:1fr}
  .botnav{display:flex}
  .frow{flex-direction:column;gap:14px}
  .field-prio{max-width:none}
}
@media(max-width:560px){
  .kpis{grid-template-columns:repeat(2,1fr)}
  .tl-day{grid-template-columns:64px 1fr;gap:10px}
}

/* ===== 档案系统 ===== */
.userchip{display:flex;align-items:center;gap:10px;padding:4px}
.userchip-tx{min-width:0;flex:1}
.user-n{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.switch-btn{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;color:var(--ink-3);border:1px solid var(--line);background:var(--surface);flex-shrink:0;transition:.15s}
.switch-btn:hover{color:var(--primary);border-color:var(--tint-line);background:var(--tint)}

.pg-wrap{position:fixed;inset:0;background:var(--bg);display:grid;place-items:center;padding:24px;overflow:auto;z-index:50}
.pg-card{width:100%;max-width:440px;background:var(--surface);border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow-lg);padding:26px}
.pg-head{display:flex;align-items:center;gap:13px;margin-bottom:22px}
.pg-mark{width:42px;height:42px;border-radius:12px;background:var(--primary);display:grid;place-items:center;box-shadow:var(--shadow-sm);flex-shrink:0}
.pg-title{font-size:19px;font-weight:700;letter-spacing:.01em}
.pg-sub{font-size:12.5px;color:var(--ink-3);margin-top:2px}
.pg-list{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.pg-item{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:var(--surface-2);border:1px solid var(--line);border-radius:12px;padding:11px 13px;transition:.15s}
.pg-item:hover{border-color:var(--tint-line);background:var(--tint);transform:translateY(-1px)}
.pg-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#E8A87C,#D97757);color:#fff;display:grid;place-items:center;font-weight:600;font-size:15px;flex-shrink:0}
.pg-meta{flex:1;min-width:0}
.pg-name{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pg-date{font-size:11.5px;color:var(--ink-3);margin-top:1px}
.pg-del{width:28px;height:28px;border-radius:7px;display:grid;place-items:center;color:var(--ink-3);transition:.15s}
.pg-del:hover{color:#C0392B;background:rgba(192,57,43,.08)}
.pg-divider{display:flex;align-items:center;text-align:center;color:var(--ink-3);font-size:12px;margin:6px 0 16px}
.pg-divider::before,.pg-divider::after{content:"";flex:1;height:1px;background:var(--line)}
.pg-divider span{padding:0 12px}
.pg-form{display:flex;flex-direction:column;gap:12px}
.pg-input{width:100%;border:1px solid var(--line);border-radius:11px;padding:12px 14px;font-size:14px;background:var(--surface-2);color:var(--ink);outline:none;transition:.15s;font-family:inherit}
.pg-input:focus{border-color:var(--tint-line);box-shadow:0 0 0 3px var(--tint);background:var(--surface)}
.pg-check{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-2);cursor:pointer}
.pg-check input{width:15px;height:15px;accent-color:var(--primary)}
.pg-actions{display:flex;gap:10px}
.pg-btn{flex:1;display:inline-flex;align-items:center;justify-content:center;padding:11px 14px;border-radius:11px;font-weight:600;font-size:13.5px;transition:.15s}
.pg-btn.primary{background:var(--primary);color:#fff;box-shadow:var(--shadow-sm)}
.pg-btn.primary:hover{background:var(--primary-deep)}
.pg-btn.primary:disabled{opacity:.45;cursor:not-allowed;box-shadow:none}
.pg-btn.ghost{background:var(--surface);border:1px solid var(--line);color:var(--ink-2)}
.pg-btn.ghost:hover{border-color:var(--tint-line);color:var(--ink)}
.pg-foot{display:flex;align-items:flex-start;gap:7px;margin-top:20px;padding-top:16px;border-top:1px solid var(--line);font-size:11.5px;color:var(--ink-3);line-height:1.5}
.pg-foot svg{flex-shrink:0;margin-top:1px}
.pg-foot b{color:var(--ink-2);font-weight:600}
