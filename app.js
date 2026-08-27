/* NBRO Project Register - live Google Apps Script API client */
const API_URL = "https://script.google.com/macros/s/AKfycbxxbM1pNLKYYWdDtdHPBg8ycXfrHCx_Qwr4we1KiogjBt9Wg6ukI9XRG8YJH3TnFMoAJQ/exec";

let DB = null;
const state = { projects: [], wip: [], finance: [], lookups: {}, month: "2026-06" };
const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(Number(n) || 0);
const pct = n => Math.max(0, Math.min(100, (Number(n) || 0) * 100));
const safe = v => v == null ? "" : String(v);

function projectCode(p) { return safe(p["Project Code"] ?? p.projectCode); }
function projectId(p) { return safe(p["Project ID"] ?? p.projectId ?? p.id); }
function status(p) { return safe(p["Current Status"] ?? p.Status ?? p.status); }
function reportingMonth(r) { return safe(r["Reporting Month"] ?? r.month ?? r["Month"]); }
function physicalValue(r) {
  const v = r["Physical WIP %"] ?? r.physicalWip ?? r.physical ?? r.value;
  const n = Number(v) || 0;
  return n > 1 ? n / 100 : n;
}
function financialValue(r) {
  return Number(r["Financial WIP"] ?? r.financialWip ?? r.financial ?? 0) || 0;
}

async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v); });
  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) throw new Error(`API GET failed: ${response.status}`);
  const data = await response.json();
  if (data.success === false || data.ok === false) throw new Error(data.error || data.message || "API request failed");
  return data;
}

async function apiPost(action, payload = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload })
  });
  if (!response.ok) throw new Error(`API POST failed: ${response.status}`);
  const data = await response.json();
  if (data.success === false || data.ok === false) throw new Error(data.error || data.message || "API request failed");
  return data;
}

function deriveLookups() {
  const unique = field => [...new Set(state.projects.map(p => safe(p[field])).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  state.lookups.statuses = state.lookups.statuses?.length ? state.lookups.statuses : unique("Current Status");
  state.lookups.workingGroups = state.lookups.workingGroups?.length ? state.lookups.workingGroups : unique("Working Group");
  state.lookups.engineers = state.lookups.engineers?.length ? state.lookups.engineers : unique("Responsible Engineer");
}

async function init() {
  try {
    const [projectsRes, wipRes, financeRes] = await Promise.all([
      apiGet("projects"),
      apiGet("wip"),
      apiGet("finance").catch(() => ({ data: [] }))
    ]);
    state.projects = Array.isArray(projectsRes.data) ? projectsRes.data : [];
    state.wip = Array.isArray(wipRes.data) ? wipRes.data : [];
    state.finance = Array.isArray(financeRes.data) ? financeRes.data : [];
    state.lookups = projectsRes.lookups || {};
    state.month = projectsRes.reportingMonth || state.month;
    deriveLookups();
    $("reportMonth").value = state.month;
    $("wipMonth").value = state.month;
    fillFilters();
    renderAll();
    setApiStatus("Live database connected", true);
  } catch (err) {
    console.error(err);
    setApiStatus("API connection failed", false);
    alert("Could not load the live NBRO database.\n\n" + err.message);
  }
}

function setApiStatus(message, good) {
  let el = $("apiStatus");
  if (!el) {
    el = document.createElement("div");
    el.id = "apiStatus";
    el.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9999;padding:8px 12px;border-radius:8px;font-size:12px;background:var(--panel,#fff);box-shadow:0 4px 18px rgba(0,0,0,.15);";
    document.body.appendChild(el);
  }
  el.textContent = "● " + message;
  el.style.color = good ? "#16803c" : "#b42318";
}

function fillFilters() {
  for (const [id, arr, label] of [["statusFilter", state.lookups.statuses || [], "All statuses"], ["groupFilter", state.lookups.workingGroups || [], "All working groups"], ["engineerFilter", state.lookups.engineers || [], "All engineers"]]) {
    $(id).innerHTML = `<option value="">${label}</option>` + arr.map(x => `<option>${safe(x)}</option>`).join("");
  }
  $("fGroup").innerHTML = (state.lookups.workingGroups || []).map(x => `<option>${safe(x)}</option>`).join("");
  $("fEngineer").innerHTML = '<option value=""></option>' + (state.lookups.engineers || []).map(x => `<option>${safe(x)}</option>`).join("");
  $("fStatus").innerHTML = (state.lookups.statuses || []).map(x => `<option>${safe(x)}</option>`).join("");
}

function currentWip(code, month = state.month) {
  const rows = state.wip.filter(x => String(x["Project Code"] ?? x.projectCode) === String(code) && reportingMonth(x) === month);
  let physical = 0, financial = 0;
  for (const r of rows) { physical += physicalValue(r); financial += financialValue(r); }
  return { physical, financial };
}

function cumulative(code, month = state.month) {
  const rows = state.wip.filter(x => String(x["Project Code"] ?? x.projectCode) === String(code) && reportingMonth(x) <= month);
  let physical = 0, financial = 0;
  for (const r of rows) { physical += physicalValue(r); financial += financialValue(r); }
  return { physical, financial };
}

function renderAll() { renderKpis(); renderStatus(); renderGroups(); renderProgress(); renderAlerts(); renderProjects(); renderWip(); renderFinance(); }

function renderKpis() {
  const total = state.projects.length;
  const active = state.projects.filter(p => status(p) !== "Completed").length;
  const done = total - active;
  const value = state.projects.reduce((s,p) => s + (Number(p["Initial Estimate"]) || 0), 0);
  const w = state.projects.reduce((s,p) => s + currentWip(projectCode(p)).financial, 0);
  const c = state.projects.reduce((s,p) => s + cumulative(projectCode(p)).financial, 0);
  $("kpis").innerHTML = [["Total projects",total],["Active",active],["Completed",done],["Initial project value",money(value)],["Current month WIP",money(w)],["Cumulative financial WIP",money(c)]].map(x => `<div class="card"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join("");
}

function counts(field) { return state.projects.reduce((o,p) => (o[p[field] || "Unassigned"] = (o[p[field] || "Unassigned"] || 0) + 1, o), {}); }
function renderStatus() {
  const c = counts("Current Status"), total = state.projects.length || 1;
  $("statusChart").innerHTML = Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `<div class="metric-row"><div>${safe(k)}</div><div class="bar"><span style="width:${v/total*100}%"></span></div><b>${v}</b></div>`).join("");
}
function renderGroups() {
  const c = counts("Working Group"), max = Math.max(...Object.values(c),1);
  $("groupChart").innerHTML = Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `<div class="metric-row"><div>${safe(k)}</div><div class="bar"><span style="width:${v/max*100}%"></span></div><b>${v}</b></div>`).join("");
}
function renderProgress() {
  const rows = state.projects.map(p => { const c = cumulative(projectCode(p)); const e = Number(p["Initial Estimate"])||0; return {p, ph:c.physical, fi:e?c.financial/e:0}; }).sort((a,b)=>b.ph-a.ph).slice(0,12);
  $("progressChart").innerHTML = rows.map(x => `<div style="margin:9px 0"><div class="mini"><b>${safe(projectCode(x.p))}</b> — ${safe(x.p["Client"])}</div><div class="metric-row"><div>Physical</div><div class="bar"><span style="width:${pct(x.ph)}%"></span></div><b>${pct(x.ph).toFixed(0)}%</b></div><div class="metric-row"><div>Financial</div><div class="bar"><span style="width:${pct(x.fi)}%"></span></div><b>${pct(x.fi).toFixed(0)}%</b></div></div>`).join("") || "<p>No progress data.</p>";
}
function renderAlerts() {
  const missing = state.projects.filter(p => status(p)!=="Completed" && currentWip(projectCode(p)).physical===0).length;
  const high = state.projects.filter(p => { const c=cumulative(projectCode(p)); return c.physical>.8 && (Number(p["Initial Estimate"])||0)>0 && c.financial<(Number(p["Initial Estimate"])||0)*.5; }).length;
  $("alerts").innerHTML = `<div class="alert ${missing?"":"green"}"><b>${missing}</b> active projects have no physical WIP recorded for ${state.month}.</div><div class="alert ${high?"red":"green"}"><b>${high}</b> projects have high physical progress but less than 50% financial WIP against estimate.</div><div class="alert green">Use <b>Monthly WIP</b> to enter the reporting month's updates.</div>`;
}
function renderProjects() {
  const q=$("search").value.toLowerCase(), sf=$("statusFilter").value, gf=$("groupFilter").value, ef=$("engineerFilter").value;
  const rows=state.projects.filter(p=>(!q||Object.values(p).join(" ").toLowerCase().includes(q))&&(!sf||status(p)===sf)&&(!gf||p["Working Group"]===gf)&&(!ef||p["Responsible Engineer"]===ef));
  $("projectTable").innerHTML="<thead><tr><th>Code</th><th>Client</th><th>Description</th><th>Group</th><th>Engineer</th><th>Status</th><th>Estimate</th><th>Progress</th><th></th></tr></thead><tbody>"+rows.map(p=>{let c=cumulative(projectCode(p));return `<tr><td class="code">${safe(projectCode(p))}</td><td>${safe(p["Client"])}</td><td>${safe(p["Description"])}</td><td>${safe(p["Working Group"])}</td><td>${safe(p["Responsible Engineer"])}</td><td><span class="badge">${safe(status(p))}</span></td><td>${money(p["Initial Estimate"])}</td><td><div class="bar"><span style="width:${pct(c.physical)}%"></span></div><span class="mini">${pct(c.physical).toFixed(0)}%</span></td><td><button class="ghost" onclick="editProject('${projectId(p).replace(/'/g,"\\'")}')">Edit</button></td></tr>`}).join("")+"</tbody>";
}

function renderWip() {
  const m=$("wipMonth").value;
  const active=state.projects.filter(p=>status(p)!=="Completed");
  $("wipTable").innerHTML="<thead><tr><th>Project</th><th>Engineer</th><th>Physical WIP %</th><th>Financial WIP (LKR)</th><th>Remarks</th></tr></thead><tbody>"+active.map(p=>{const w=currentWip(projectCode(p),m);const key=projectId(p)||projectCode(p);return `<tr><td class="code">${safe(projectCode(p))}<div class="mini">${safe(p["Client"])}</div></td><td>${safe(p["Responsible Engineer"])}</td><td><input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${(w.physical*100)||""}"></td><td><input data-wip-f="${safe(key)}" type="number" step="0.01" min="0" value="${w.financial||""}"></td><td><input data-wip-r="${safe(key)}" placeholder="Monthly remark"></td></tr>`}).join("")+"</tbody>";
}

async function saveWip() {
  const m=$("wipMonth").value, active=state.projects.filter(p=>status(p)!=="Completed"), btn=$("saveWipBtn");
  btn.disabled=true; btn.textContent="Saving…";
  try {
    for (const p of active) {
      const key=projectId(p)||projectCode(p);
      const ph=Number(document.querySelector(`[data-wip-p="${CSS.escape(key)}"]`)?.value)||0;
      const fi=Number(document.querySelector(`[data-wip-f="${CSS.escape(key)}"]`)?.value)||0;
      const remarks=document.querySelector(`[data-wip-r="${CSS.escape(key)}"]`)?.value||"";
      await apiPost("saveMonthlyWIP", { projectId: projectId(p), projectCode: projectCode(p), reportingMonth: m, physicalWip: ph, financialWip: fi, remarks });
    }
    const wipRes=await apiGet("wip"); state.wip=Array.isArray(wipRes.data)?wipRes.data:state.wip;
    state.month=m; $("reportMonth").value=m; renderAll(); alert("Monthly WIP saved to Google Sheets.");
  } catch(err) { console.error(err); alert("Monthly WIP could not be saved.\n\n"+err.message); }
  finally { btn.disabled=false; btn.textContent="Save update"; }
}

function renderFinance() {
  const estimate=state.projects.reduce((s,p)=>s+(Number(p["Initial Estimate"])||0),0);
  const cumulativeWip=state.projects.reduce((s,p)=>s+cumulative(projectCode(p)).financial,0);
  $("financeKpis").innerHTML=[["Initial estimate",money(estimate)],["Cumulative WIP",money(cumulativeWip)],["WIP / estimate",estimate?((cumulativeWip/estimate)*100).toFixed(1)+"%":"0%"]].map(x=>`<div class="card"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join("");
  const rows=state.projects.map(p=>{let c=cumulative(projectCode(p));return [p,c]}).filter(x=>x[1].financial||Number(x[0]["Initial Estimate"])).sort((a,b)=>b[1].financial-a[1].financial).slice(0,30);
  $("financeTable").innerHTML="<thead><tr><th>Project</th><th>Client</th><th>Estimate</th><th>Cumulative WIP</th><th>WIP % of estimate</th></tr></thead><tbody>"+rows.map(([p,c])=>{let e=Number(p["Initial Estimate"])||0;return `<tr><td class="code">${safe(projectCode(p))}</td><td>${safe(p["Client"])}</td><td>${money(e)}</td><td>${money(c.financial)}</td><td>${e?((c.financial/e)*100).toFixed(1):"0"}%</td></tr>`}).join("")+"</tbody>";
}

function openNew() { $("dialogTitle").textContent="New project"; $("editIndex").value=""; $("projectForm").reset(); $("projectDialog").showModal(); }
function editProject(id) {
  const p=state.projects.find(x=>projectId(x)===String(id)); if(!p) return;
  $("dialogTitle").textContent="Edit project"; $("editIndex").value=projectId(p);
  $("fCode").value=projectCode(p); $("fClient").value=safe(p["Client"]); $("fDesc").value=safe(p["Description"]); $("fGroup").value=safe(p["Working Group"]); $("fEngineer").value=safe(p["Responsible Engineer"]); $("fEstimate").value=Number(p["Initial Estimate"])||""; $("fAdvance").value=Number(p["Advance Amount"])||""; $("fStatus").value=status(p); $("fRemarks").value=safe(p["Remarks"]); $("projectDialog").showModal();
}

async function saveProject(e) {
  e.preventDefault();
  const id=$("editIndex").value;
  const project={
    "Project ID": id || "",
    "Project Code": $("fCode").value.trim(), "Client": $("fClient").value, "Description": $("fDesc").value,
    "Working Group": $("fGroup").value, "Responsible Engineer": $("fEngineer").value,
    "Initial Estimate": Number($("fEstimate").value)||0, "Advance Amount": Number($("fAdvance").value)||0,
    "Current Status": $("fStatus").value, "Remarks": $("fRemarks").value
  };
  const btn=$("saveProjectBtn"); btn.disabled=true; btn.textContent="Saving…";
  try {
    await apiPost(id ? "updateProject" : "createProject", { project });
    const res=await apiGet("projects"); state.projects=Array.isArray(res.data)?res.data:state.projects; state.lookups=res.lookups||state.lookups; deriveLookups(); fillFilters();
    $("projectDialog").close(); renderAll(); alert(id?"Project updated in Google Sheets.":"Project added to Google Sheets.");
  } catch(err) { console.error(err); alert("Project could not be saved.\n\n"+err.message); }
  finally { btn.disabled=false; btn.textContent="Save project"; }
}

async function exportJSON() {
  const blob=new Blob([JSON.stringify({projects:state.projects,wip:state.wip,finance:state.finance,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="npro-project-register-export.json"; a.click(); URL.revokeObjectURL(a.href);
}

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));$(b.dataset.view).classList.add("active")});
["search","statusFilter","groupFilter","engineerFilter"].forEach(id=>$(id).addEventListener("input",renderProjects));
$("reportMonth").onchange=e=>{state.month=e.target.value;$("wipMonth").value=e.target.value;renderAll()};
$("wipMonth").onchange=renderWip; $("saveWipBtn").onclick=saveWip; $("newProjectBtn").onclick=openNew; $("projectForm").addEventListener("submit",saveProject); $("exportBtn").onclick=exportJSON;
init();
