let DB=null;
const state={projects:[],wip:[],lookups:{},month:"2026-06"};
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("en-LK",{style:"currency",currency:"LKR",maximumFractionDigits:0}).format(Number(n)||0);
const pct=n=>Math.max(0,Math.min(100,(Number(n)||0)*100));
function safe(v){return v==null?"":String(v)}
async function init(){
  DB=await fetch("data/project-data.json").then(r=>r.json());
  state.projects=JSON.parse(localStorage.getItem("npro_projects")||"null")||DB.projects;
  state.wip=JSON.parse(localStorage.getItem("npro_wip")||"null")||DB.wip;
  state.lookups=DB.lookups; state.month=DB.reportingMonth||"2026-06";
  $("reportMonth").value=state.month;$("wipMonth").value=state.month;
  fillFilters();renderAll();
}
function fillFilters(){
  for(const [id,arr] of [["statusFilter",state.lookups.statuses],["groupFilter",state.lookups.workingGroups],["engineerFilter",state.lookups.engineers]]){
    $(id).innerHTML='<option value="">All '+id.replace("Filter","")+'</option>'+arr.map(x=>`<option>${safe(x)}</option>`).join("");
  }
  $("fGroup").innerHTML=state.lookups.workingGroups.map(x=>`<option>${safe(x)}</option>`).join("");
  $("fEngineer").innerHTML='<option value=""></option>'+state.lookups.engineers.map(x=>`<option>${safe(x)}</option>`).join("");
  $("fStatus").innerHTML=state.lookups.statuses.map(x=>`<option>${safe(x)}</option>`).join("");
}
function saveLocal(){localStorage.setItem("npro_projects",JSON.stringify(state.projects));localStorage.setItem("npro_wip",JSON.stringify(state.wip))}
function currentWip(code,month=state.month){
  const rows=state.wip.filter(x=>String(x.projectCode)==String(code)&&x.month==month);
  let physical=0,financial=0;
  for(const r of rows){if(/physical/i.test(r.kind)) physical+=Number(r.value)||0; else if(/financial/i.test(r.kind)) financial+=Number(r.value)||0}
  // Matrix values are assumed percent as decimal where applicable.
  return {physical,financial};
}
function cumulative(code,month=state.month){
  const rows=state.wip.filter(x=>String(x.projectCode)==String(code)&&x.month<=month);
  let physical=0,financial=0;
  for(const r of rows){if(/physical/i.test(r.kind)) physical+=Number(r.value)||0; else if(/financial/i.test(r.kind)) financial+=Number(r.value)||0}
  return {physical,financial};
}
function renderAll(){renderKpis();renderStatus();renderGroups();renderProgress();renderAlerts();renderProjects();renderWip();renderFinance()}
function renderKpis(){
  const total=state.projects.length, active=state.projects.filter(p=>p["Current Status"]!="Completed").length, done=total-active;
  const value=state.projects.reduce((s,p)=>s+(Number(p["Initial Estimate"])||0),0);
  const w=state.projects.reduce((s,p)=>s+currentWip(p["Project Code"]).financial,0);
  const c=state.projects.reduce((s,p)=>s+cumulative(p["Project Code"]).financial,0);
  $("kpis").innerHTML=[["Total projects",total],["Active",active],["Completed",done],["Initial project value",money(value)],["Current month WIP",money(w)],["Cumulative financial WIP",money(c)]].map(x=>`<div class="card"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join("");
}
function counts(field){return state.projects.reduce((o,p)=>(o[p[field]||"Unassigned"]=(o[p[field]||"Unassigned"]||0)+1,o),{})}
function renderStatus(){
 const c=counts("Current Status"), total=state.projects.length;
 $("statusChart").innerHTML=Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="metric-row"><div>${safe(k)}</div><div class="bar"><span style="width:${v/total*100}%"></span></div><b>${v}</b></div>`).join("");
}
function renderGroups(){
 const c=counts("Working Group"), max=Math.max(...Object.values(c),1);
 $("groupChart").innerHTML=Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="metric-row"><div>${safe(k)}</div><div class="bar"><span style="width:${v/max*100}%"></span></div><b>${v}</b></div>`).join("");
}
function renderProgress(){
 const rows=state.projects.map(p=>{let c=cumulative(p["Project Code"]);let e=Number(p["Initial Estimate"])||0;return {p,ph:c.physical,fi:e?c.financial/e:0}}).sort((a,b)=>b.ph-a.ph).slice(0,12);
 $("progressChart").innerHTML=rows.map(x=>`<div style="margin:9px 0"><div class="mini"><b>${safe(x.p["Project Code"])}</b> — ${safe(x.p["Client"])}</div><div class="metric-row"><div>Physical</div><div class="bar"><span style="width:${pct(x.ph)}%"></span></div><b>${pct(x.ph).toFixed(0)}%</b></div><div class="metric-row"><div>Financial</div><div class="bar"><span style="width:${pct(x.fi)}%"></span></div><b>${pct(x.fi).toFixed(0)}%</b></div></div>`).join("")||"<p>No progress data.</p>";
}
function renderAlerts(){
 const missing=state.projects.filter(p=>p["Current Status"]!="Completed" && currentWip(p["Project Code"]).physical===0).length;
 const high=state.projects.filter(p=>{let c=cumulative(p["Project Code"]);return c.physical>.8&&(Number(p["Initial Estimate"])||0)>0&&c.financial<(Number(p["Initial Estimate"])||0)*.5}).length;
 $("alerts").innerHTML=`<div class="alert ${missing?"":"green"}"><b>${missing}</b> active projects have no physical WIP recorded for ${state.month}.</div><div class="alert ${high?"red":"green"}"><b>${high}</b> projects have high physical progress but less than 50% financial WIP against estimate.</div><div class="alert green">Use <b>Monthly WIP</b> to enter the reporting month's updates.</div>`;
}
function renderProjects(){
 const q=$("search").value.toLowerCase(), sf=$("statusFilter").value,gf=$("groupFilter").value,ef=$("engineerFilter").value;
 const rows=state.projects.filter(p=>(!q||Object.values(p).join(" ").toLowerCase().includes(q))&&(!sf||p["Current Status"]==sf)&&(!gf||p["Working Group"]==gf)&&(!ef||p["Responsible Engineer"]==ef));
 $("projectTable").innerHTML="<thead><tr><th>Code</th><th>Client</th><th>Description</th><th>Group</th><th>Engineer</th><th>Status</th><th>Estimate</th><th>Progress</th><th></th></tr></thead><tbody>"+rows.map(p=>{let c=cumulative(p["Project Code"]);return `<tr><td class="code">${safe(p["Project Code"])}</td><td>${safe(p["Client"])}</td><td>${safe(p["Description"])}</td><td>${safe(p["Working Group"])}</td><td>${safe(p["Responsible Engineer"])}</td><td><span class="badge">${safe(p["Current Status"])}</span></td><td>${money(p["Initial Estimate"])}</td><td><div class="bar"><span style="width:${pct(c.physical)}%"></span></div><span class="mini">${pct(c.physical).toFixed(0)}%</span></td><td><button class="ghost" onclick="editProject(${state.projects.indexOf(p)})">Edit</button></td></tr>`}).join("")+"</tbody>";
}
function renderWip(){
 const m=$("wipMonth").value;
 const active=state.projects.filter(p=>p["Current Status"]!="Completed");
 $("wipTable").innerHTML="<thead><tr><th>Project</th><th>Engineer</th><th>Physical WIP %</th><th>Financial WIP (LKR)</th><th>Remarks</th></tr></thead><tbody>"+active.map((p,i)=>{const w=currentWip(p["Project Code"],m);return `<tr><td class="code">${safe(p["Project Code"])}<div class="mini">${safe(p["Client"])}</div></td><td>${safe(p["Responsible Engineer"])}</td><td><input data-wip-p="${i}" type="number" step="0.01" min="0" max="100" value="${(w.physical*100)||""}"></td><td><input data-wip-f="${i}" type="number" step="0.01" min="0" value="${w.financial||""}"></td><td><input data-wip-r="${i}" placeholder="Monthly remark"></td></tr>`}).join("")+"</tbody>";
}
function saveWip(){
 const m=$("wipMonth").value, active=state.projects.filter(p=>p["Current Status"]!="Completed");
 active.forEach((p,i)=>{
   state.wip=state.wip.filter(x=>!(String(x.projectCode)==String(p["Project Code"])&&x.month==m));
   const ph=Number(document.querySelector(`[data-wip-p="${i}"]`).value)||0;
   const fi=Number(document.querySelector(`[data-wip-f="${i}"]`).value)||0;
   if(ph) state.wip.push({projectCode:String(p["Project Code"]),kind:"Physical WIP",month:m,value:ph/100});
   if(fi) state.wip.push({projectCode:String(p["Project Code"]),kind:"Financial WIP",month:m,value:fi});
 });
 saveLocal(); state.month=m;$("reportMonth").value=m;renderAll();alert("Monthly WIP saved locally.");
}
function renderFinance(){
 const estimate=state.projects.reduce((s,p)=>s+(Number(p["Initial Estimate"])||0),0);
 const cumulativeWip=state.projects.reduce((s,p)=>s+cumulative(p["Project Code"]).financial,0);
 $("financeKpis").innerHTML=[["Initial estimate",money(estimate)],["Cumulative WIP",money(cumulativeWip)],["WIP / estimate",estimate?((cumulativeWip/estimate)*100).toFixed(1)+"%":"0%"]].map(x=>`<div class="card"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join("");
 const rows=state.projects.map(p=>{let c=cumulative(p["Project Code"]);return [p,c]}).filter(x=>x[1].financial||Number(x[0]["Initial Estimate"])).sort((a,b)=>b[1].financial-a[1].financial).slice(0,30);
 $("financeTable").innerHTML="<thead><tr><th>Project</th><th>Client</th><th>Estimate</th><th>Cumulative WIP</th><th>WIP % of estimate</th></tr></thead><tbody>"+rows.map(([p,c])=>{let e=Number(p["Initial Estimate"])||0;return `<tr><td class="code">${safe(p["Project Code"])}</td><td>${safe(p["Client"])}</td><td>${money(e)}</td><td>${money(c.financial)}</td><td>${e?((c.financial/e)*100).toFixed(1):"0"}%</td></tr>`}).join("")+"</tbody>";
}
function openNew(){ $("dialogTitle").textContent="New project";$("editIndex").value="";$("projectForm").reset();$("projectDialog").showModal()}
function editProject(i){
 const p=state.projects[i];$("dialogTitle").textContent="Edit project";$("editIndex").value=i;
 $("fCode").value=safe(p["Project Code"]);$("fClient").value=safe(p["Client"]);$("fDesc").value=safe(p["Description"]);$("fGroup").value=safe(p["Working Group"]);$("fEngineer").value=safe(p["Responsible Engineer"]);$("fEstimate").value=Number(p["Initial Estimate"])||"";$("fAdvance").value=Number(p["Advance Amount"])||"";$("fStatus").value=safe(p["Current Status"]);$("fRemarks").value=safe(p["Remarks"]);$("projectDialog").showModal();
}
function saveProject(e){
 e.preventDefault();const i=$("editIndex").value;const p={"Date":null,"Project Code":$("fCode").value.trim(),"Client":$("fClient").value,"Description":$("fDesc").value,"Working Group":$("fGroup").value,"Responsible Engineer":$("fEngineer").value,"Initial Estimate":Number($("fEstimate").value)||null,"Advance Amount":Number($("fAdvance").value)||null,"Advance Received?":null,"Current Status":$("fStatus").value,"Final Bill":null,"Final Payment Received?":null,"Current Month Physical WIP":0,"Cumulative Physical WIP":0,"Current Month Financial WIP":0,"Cumulative Financial WIP":0,"Adjusted WIP Outstanding":0,"Physical Progress Bar":"","Financial Progress Bar":"","Remarks":$("fRemarks").value};
 if(i==="") state.projects.push(p); else state.projects[Number(i)]=p;saveLocal();$("projectDialog").close();renderAll();
}
function exportJSON(){const blob=new Blob([JSON.stringify({projects:state.projects,wip:state.wip,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="npro-project-register-export.json";a.click();URL.revokeObjectURL(a.href)}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));$(b.dataset.view).classList.add("active")});
["search","statusFilter","groupFilter","engineerFilter"].forEach(id=>$(id).addEventListener("input",renderProjects));
$("reportMonth").onchange=e=>{state.month=e.target.value;$("wipMonth").value=e.target.value;renderAll()};
$("wipMonth").onchange=renderWip;$("saveWipBtn").onclick=saveWip;$("newProjectBtn").onclick=openNew;$("projectForm").addEventListener("submit",saveProject);$("exportBtn").onclick=exportJSON;
init();