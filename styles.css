// ===== 本地档案系统:让每个用户的数据各自独立 =====
// 原理:数据存在浏览器 localStorage,按"档案名"分开命名空间存储。
//   - toudi_profiles        档案列表
//   - toudi_profile_current 当前档案
//   - toudi_jobs_v1__<档案> 该档案的岗位数据(各自独立,互不影响)

const PROFILES_KEY = "toudi_profiles";
const CURRENT_KEY = "toudi_profile_current";
const LEGACY_JOBS_KEY = "toudi_jobs_v1"; // 旧版本未分档案时的数据

function jobsKey(profile) {
  return LEGACY_JOBS_KEY + "__" + profile;
}
function loadProfiles() {
  try {
    const s = localStorage.getItem(PROFILES_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return [];
}
function saveProfiles(list) {
  try {localStorage.setItem(PROFILES_KEY, JSON.stringify(list));} catch (e) {}
}
function getCurrentProfile() {
  try {return localStorage.getItem(CURRENT_KEY) || "";} catch (e) {return "";}
}
function setCurrentProfile(name) {
  try {
    if (name) localStorage.setItem(CURRENT_KEY, name);else
    localStorage.removeItem(CURRENT_KEY);
  } catch (e) {}
}
function hasLegacyData() {
  try {return !!localStorage.getItem(LEGACY_JOBS_KEY);} catch (e) {return false;}
}
function createProfile(name, opts) {
  name = (name || "").trim();
  if (!name) return null;
  const list = loadProfiles();
  if (list.some((p) => p.name === name)) return name; // 已存在,直接用
  list.push({ name, createdAt: new Date().toISOString().slice(0, 10) });
  saveProfiles(list);
  // 初始数据:导入旧数据 / 示例 / 空白
  let seed = [];
  if (opts && opts.importLegacy && hasLegacyData()) {
    try {seed = JSON.parse(localStorage.getItem(LEGACY_JOBS_KEY)) || [];} catch (e) {}
  } else if (opts && opts.demo) {
    seed = (window.APP_DATA && window.APP_DATA.JOBS) || [];
  }
  try {localStorage.setItem(jobsKey(name), JSON.stringify(seed));} catch (e) {}
  return name;
}
function deleteProfile(name) {
  const list = loadProfiles().filter((p) => p.name !== name);
  saveProfiles(list);
  try {localStorage.removeItem(jobsKey(name));} catch (e) {}
  if (getCurrentProfile() === name) setCurrentProfile("");
}

// ===== 档案选择 / 创建界面 =====
function ProfileGate({ onPick }) {
  const [list, setList] = useState(() => loadProfiles());
  const [name, setName] = useState("");
  const [importLegacy, setImportLegacy] = useState(hasLegacyData());
  const legacy = hasLegacyData();

  function refresh() {setList(loadProfiles());}

  function handleCreate(demo) {
    const allowImport = list.length === 0 && legacy && importLegacy;
    const n = createProfile(name, { importLegacy: allowImport, demo });
    if (!n) return;
    setCurrentProfile(n);
    onPick(n);
  }
  function handleCreateDemo() {
    const n = createProfile(name || "示例档案", { demo: true });
    if (!n) return;
    setCurrentProfile(n);
    onPick(n);
  }
  function pick(n) {
    setCurrentProfile(n);
    onPick(n);
  }
  function remove(e, n) {
    e.stopPropagation();
    if (!window.confirm('删除档案「' + n + '」?该档案下的所有岗位数据将一并清除,且无法恢复。')) return;
    deleteProfile(n);
    refresh();
  }

  return (
    <div className="pg-wrap">
      <div className="pg-card">
        <div className="pg-head">
          <div className="pg-mark"><Icon name="flag" size={20} stroke={2.4} style={{ color: "#fff" }} /></div>
          <div>
            <div className="pg-title">选择你的档案</div>
            <div className="pg-sub">每个档案的岗位数据各自独立,互不影响</div>
          </div>
        </div>

        {list.length > 0 &&
        <div className="pg-list">
            {list.map((p) =>
          <button key={p.name} className="pg-item" onClick={() => pick(p.name)}>
                <div className="pg-av">{p.name.slice(0, 1)}</div>
                <div className="pg-meta">
                  <div className="pg-name">{p.name}</div>
                  <div className="pg-date">创建于 {p.createdAt}</div>
                </div>
                <span className="pg-del" onClick={(e) => remove(e, p.name)} title="删除档案"><Icon name="trash" size={15} /></span>
                <Icon name="chevron" size={16} style={{ color: "var(--ink-2)" }} />
              </button>
          )}
          </div>
        }

        <div className="pg-divider"><span>{list.length > 0 ? "或 新建档案" : "新建一个档案开始"}</span></div>

        <div className="pg-form">
          <input
            className="pg-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的名字 / 档案名,如:张三"
            onKeyDown={(e) => {if (e.key === "Enter") handleCreate(false);}}
            autoFocus />

          {legacy && list.length === 0 &&
          <label className="pg-check">
              <input type="checkbox" checked={importLegacy} onChange={(e) => setImportLegacy(e.target.checked)} />
              <span>把当前已有的数据导入这个档案</span>
            </label>
          }
          <div className="pg-actions">
            <button className="pg-btn primary" onClick={() => handleCreate(false)} disabled={!name.trim()}>创建空白档案</button>
            <button className="pg-btn ghost" onClick={handleCreateDemo}>试用示例数据</button>
          </div>
        </div>

        <div className="pg-foot">
          <Icon name="info" size={13} />
          <span>数据保存在<b>本机浏览器</b>中,清除浏览器数据会丢失。换设备不会自动同步。</span>
        </div>
      </div>
    </div>);

}

window.Profiles = {
  jobsKey, loadProfiles, getCurrentProfile, setCurrentProfile,
  createProfile, deleteProfile, hasLegacyData, ProfileGate };
