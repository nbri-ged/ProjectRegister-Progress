/* NBRO Project Register - Executive Dashboard & Project Management System */
const API_URL = "https://script.google.com/macros/s/AKfycbxxbM1pNLKYYWdDtdHPBg8ycXfrHCx_Qwr4we1KiogjBt9Wg6ukI9XRG8YJH3TnFMoAJQ/exec";

let DB = null;
const state = {
  projects: [],
  wip: [],
  finance: [],
  financeSummary: [],
  lookups: {},
  month: "2026-06",
  viewMode: "table", // 'table' | 'kanban'
  cmdSelectedIndex: 0,
  cmdFilteredItems: []
};

const $ = id => document.getElementById(id) || {
  value: "",
  innerHTML: "",
  textContent: "",
  style: {},
  classList: { add: () => {}, remove: () => {}, toggle: () => {} },
  addEventListener: () => {},
  appendChild: () => {},
  getContext: () => null,
  showModal: () => {},
  close: () => {}
};

const money = n => {
  const num = Number(n) || 0;
  return "Rs. " + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const moneyShort = n => {
  const num = Number(n) || 0;
  return "Rs. " + num.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const pct = n => Math.max(0, Math.min(100, (Number(n) || 0) * 100));
const safe = v => v == null ? "" : String(v);

function projectCode(p) { return safe(p["Project Code"] ?? p.projectCode ?? p["No"] ?? p.no); }
function projectId(p) { return safe(p["Project ID"] ?? p.projectId ?? p.id) || projectCode(p); }
function status(p) { return safe(p["Current Status"] ?? p.Status ?? p.status) || "In Progress"; }
function scientist(p) { return safe(p["Responsible Scientist"] ?? p["Responsible Engineer"] ?? p.responsibleScientist ?? p.responsibleEngineer ?? p["Scientist"] ?? p.scientist) || ""; }
function reportingMonth(r) { return safe(r["Reporting Month"] ?? r.month ?? r["Month"]) || state.month; }
function norm(c) { return String(c ?? "").trim().toLowerCase().replace(/\s+/g, ""); }

function getWipRow(code, month = state.month) {
  const cNorm = norm(code);
  return state.wip.find(x => norm(x["Project Code"] ?? x.projectCode ?? x["No"] ?? x.no) === cNorm && reportingMonth(x) === month) || {};
}

function physicalValue(r) {
  const v = r["Physical WIP %"] ?? r.physicalWip ?? r.physical ?? r.value;
  const n = Number(v) || 0;
  return n > 1 ? n / 100 : n;
}

function workingProgressValue(r) {
  return Number(r["Monthly Progress"] ?? r["Working Progress"] ?? r["Financial WIP"] ?? r.workingProgress ?? r.financialWip ?? r.financial ?? r.value ?? 0) || 0;
}

function estimateValue(p) {
  return Number(p["Estimate (Without Tax)"] ?? p.estimateWithoutTax ?? p["Estimate"] ?? p["Initial Estimate"] ?? 0) || 0;
}

function advanceValue(p, month = state.month) {
  const r = getWipRow(projectCode(p), month);
  return Number(r["Advance Received"] ?? r.advanceReceived ?? p["Advance Amount"] ?? p.advance ?? 0) || 0;
}

function prevCumulativeValue(p, month = state.month) {
  const r = getWipRow(projectCode(p), month);
  return Number(r["Prev Cumulative"] ?? r["Cumulative Up to 2024"] ?? r.prevCumulative ?? 0) || 0;
}

function totalCumulativeValue(p, month = state.month) {
  const r = getWipRow(projectCode(p), month);
  const explicit = Number(r["Total Cumulative"] ?? r["Total Cumulative up to 2024"] ?? r["Total Cumulative up to 2025"] ?? 0);
  if (explicit > 0) return explicit;
  return prevCumulativeValue(p, month) + workingProgressValue(r);
}

function getDivisionFinance(month = state.month) {
  const found = state.financeSummary.find(f => reportingMonth(f) === month);
  const projectsTotalWp = state.projects.reduce((sum, p) => sum + workingProgressValue(getWipRow(projectCode(p), month)), 0);

  if (found) {
    const exp = Number(found["Expenditure"] ?? found.expenditure ?? 0);
    const mr = Number(found["Money Received"] ?? found.moneyReceived ?? 0);
    const out = Number(found["Outstanding"] ?? found.outstanding ?? 0);
    const inter = Number(found["Interdivisional"] ?? found.interdivisional ?? 0);
    const wp = Number(found["Working Progress"] ?? found.workingProgress ?? projectsTotalWp);
    const income = Number(found["Income"] ?? (wp > 0 ? wp : (mr + out)));
    const profit = Number(found["Profit"] ?? (income - exp - inter));
    const profitPct = income > 0 ? (profit / income) * 100 : (Number(found["Profit %"]) || 0);

    return { expenditure: exp, moneyReceived: mr, outstanding: out, interdivisional: inter, workingProgress: wp, income, profit, profitPct };
  }

  // Baseline from project sums
  const exp = 0, mr = 0, out = 0, inter = 0;
  const income = projectsTotalWp;
  const profit = income;
  const profitPct = income > 0 ? 100 : 0;
  return { expenditure: exp, moneyReceived: mr, outstanding: out, interdivisional: inter, workingProgress: projectsTotalWp, income, profit, profitPct };
}

function currentWip(code, month = state.month) {
  const r = getWipRow(code, month);
  return {
    physical: physicalValue(r),
    financial: workingProgressValue(r),
    advance: Number(r["Advance Received"] ?? 0),
    prevCum: Number(r["Prev Cumulative"] ?? 0),
    totalCum: totalCumulativeValue({ "Project Code": code }, month)
  };
}

function cumulative(code, month = state.month) {
  const cNorm = norm(code);
  const rows = state.wip.filter(x => norm(x["Project Code"] ?? x.projectCode) === cNorm && reportingMonth(x) <= month);
  let physical = 0, financial = 0;
  for (const r of rows) {
    physical += physicalValue(r);
    financial += workingProgressValue(r);
  }
  return { physical, financial };
}

/* NOTIFICATION TOAST */
function showToast(message, isError = false) {
  const t = $("toast");
  if (!t) return;
  t.textContent = (isError ? "⚠️ " : "✓ ") + message;
  t.style.background = isError ? "var(--danger)" : "var(--header-bg)";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

/* THEME ENGINE */
function initTheme() {
  const saved = localStorage.getItem("nbro_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const curr = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = curr === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("nbro_theme", next);
  updateThemeIcon(next);
  renderExecutiveCharts();
}

function updateThemeIcon(theme) {
  const btn = $("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* API CLIENT */
async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v); });
  const response = await fetch(url.toString(), { cache: "no-store", redirect: "follow" });
  if (!response.ok) throw new Error(`API GET failed: ${response.status}`);
  const data = await response.json();
  if (data.success === false || data.ok === false) throw new Error(data.error || data.message || "API request failed");
  return data;
}

async function apiPost(action, payload = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`API POST failed: ${response.status}`);
  const data = await response.json();
  if (data.success === false || data.ok === false) throw new Error(data.error || data.message || "API request failed");
  return data;
}

function deriveLookups() {
  const unique = (...fields) => [...new Set(state.projects.map(p => {
    for (const f of fields) { if (p[f]) return safe(p[f]); }
    return "";
  }).filter(Boolean))].sort((a,b)=>a.localeCompare(b));

  const foundStatuses = unique("Current Status", "Status", "status");
  state.lookups.statuses = foundStatuses.length ? foundStatuses : ["In Progress", "Completed", "Pending", "On Hold"];
  state.lookups.workingGroups = unique("Working Group");
  state.lookups.engineers = unique("Responsible Scientist", "Responsible Engineer", "Scientist", "Engineer");
}

async function init() {
  initTheme();
  setSheetsStatus("connecting", "Connecting…");

  const showStep = (msg) => {
    const lbl = $("sheetsStatusLabel");
    if (lbl) lbl.textContent = msg;
    console.log("[NBRI]", msg);
  };

  try {
    let projects = [], wip = [], financeSummary = [], finance = [], lookups = {}, reportingMonth = state.month;

    // Step 1: Try fast single-fetch bootstrap (new GAS)
    showStep("Loading data…");
    let bootstrapOk = false;
    try {
      const res = await apiGet("all");
      if (Array.isArray(res.projects) && res.projects.length > 0) {
        projects        = res.projects;
        wip             = Array.isArray(res.wip)             ? res.wip             : [];
        financeSummary  = Array.isArray(res.financeSummary)  ? res.financeSummary  : [];
        finance         = Array.isArray(res.finance)         ? res.finance         : [];
        lookups         = res.lookups || {};
        reportingMonth  = res.reportingMonth || state.month;
        bootstrapOk = true;
        showStep("Data loaded");
      }
    } catch (e) {
      console.warn("[NBRI] bootstrap fetch skipped:", e.message);
    }

    // Step 2: Fall back to sequential fetches if bootstrap didn't return real data
    if (!bootstrapOk) {
      showStep("Fetching projects…");
      const pRes = await apiGet("projects");
      projects       = Array.isArray(pRes.data) ? pRes.data : [];
      lookups        = pRes.lookups || {};
      reportingMonth = pRes.reportingMonth || state.month;

      showStep(`${projects.length} projects · loading WIP…`);
      const wRes = await apiGet("wip").catch(() => ({ data: [] }));
      wip = Array.isArray(wRes.data) ? wRes.data : [];

      showStep(`WIP loaded · loading finance…`);
      const fsRes = await apiGet("financeSummary").catch(() => ({ data: [] }));
      financeSummary = Array.isArray(fsRes.data) ? fsRes.data : [];

      const fRes = await apiGet("finance").catch(() => ({ data: [] }));
      finance = Array.isArray(fRes.data) ? fRes.data : [];
    }

    if (projects.length === 0) throw new Error("No project data returned from Google Sheets.");

    state.projects       = projects;
    state.wip            = wip;
    state.financeSummary = financeSummary;
    state.finance        = finance;
    state.lookups        = lookups;
    state.month          = reportingMonth;

    deriveLookups();
    $("reportMonth").value = state.month;
    $("wipMonth").value    = state.month;
    fillFilters();
    renderAll();
    setSheetsStatus("live", `🟢 Sheets Live (${state.projects.length} Projects)`);
    setApiStatus(`Live database connected (${state.projects.length} Projects)`, true);

  } catch (err) {
    console.warn("[NBRI] Live API failed:", err.message);
    setSheetsStatus("offline", "Trying local…");

    try {
      const res = await fetch("data/project-data.json");
      if (res.ok) {
        const localData    = await res.json();
        state.projects     = localData.projects || [];
        state.wip          = localData.wip || [];
        state.financeSummary = localData.financeSummary || [];
        state.month        = localData.reportingMonth || state.month;
        deriveLookups();
        $("reportMonth").value = state.month;
        $("wipMonth").value    = state.month;
        fillFilters();
        renderAll();
        setApiStatus("Offline demo data (Google Sheets disconnected)", false);
        return;
      }
    } catch (fallbackErr) {
      console.error("[NBRI] Local fallback also failed:", fallbackErr);
    }

    setSheetsStatus("error", "Failed");
    setApiStatus("API connection failed", false);
    const errDiv = document.createElement("div");
    errDiv.style.cssText = "position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:99999;background:#fef2f2;border:1px solid #fca5a5;color:#991b1b;padding:14px 24px;border-radius:12px;font-size:13px;font-weight:600;text-align:center;max-width:480px;";
    errDiv.innerHTML = `⚠️ Could not load NBRI data.<br><small style="font-weight:400">${err.message}</small><br><button onclick="location.reload()" style="margin-top:8px;padding:4px 14px;background:#ef4444;color:#fff;border:none;border-radius:6px;cursor:pointer;">Retry</button>`;
    document.body.appendChild(errDiv);
  }
}

function setSheetsStatus(state, label) {
  // state: 'connecting' | 'live' | 'offline' | 'error'
  const pill = $("sheetsStatusPill");
  const dot  = $("sheetsStatusDot");
  const lbl  = $("sheetsStatusLabel");
  if (!pill) return;

  // Remove all state classes
  pill.classList.remove("sheets-status-connecting", "sheets-status-live", "sheets-status-offline", "sheets-status-error");
  pill.classList.add(`sheets-status-${state}`);
  if (lbl) lbl.textContent = label;

  const titles = {
    connecting: "Attempting to connect to Google Sheets…",
    live:       "Live — Google Sheets connected",
    offline:    "Offline — Using cached local data",
    error:      "Error — Cannot reach Google Sheets"
  };
  pill.title = titles[state] || label;
}

function setApiStatus(message, good) {
  // Update the topbar pill
  if (good === true)        setSheetsStatus("live",    "Sheets Live");
  else if (good === false)  setSheetsStatus("offline", "Offline");
  else                      setSheetsStatus("error",   "Error");

  // Keep bottom-right legacy indicator
  let el = $("apiStatus");
  if (!el) {
    el = document.createElement("div");
    el.id = "apiStatus";
    el.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9999;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;background:var(--bg-surface);color:var(--text-primary);box-shadow:var(--shadow-lg);border:1px solid var(--border-color);display:flex;align-items:center;gap:6px;";
    document.body.appendChild(el);
  }
  el.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${good ? '#10b981' : '#ef4444'};"></span> ${message}`;
  setTimeout(() => { if (el) el.style.display = "none"; }, 5000);
}

function fillFilters() {
  for (const [id, arr, label] of [["statusFilter", state.lookups.statuses || [], "All statuses"], ["groupFilter", state.lookups.workingGroups || [], "All working groups"], ["engineerFilter", state.lookups.engineers || [], "All scientists"]]) {
    if ($(id)) $(id).innerHTML = `<option value="">${label}</option>` + arr.map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  }
  if ($("matrixScientistFilter")) {
    $("matrixScientistFilter").innerHTML = `<option value="">All scientists</option>` + (state.lookups.engineers || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  }
  if ($("matrixGroupFilter")) {
    $("matrixGroupFilter").innerHTML = `<option value="">All working groups</option>` + (state.lookups.workingGroups || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  }
  if ($("fGroup")) $("fGroup").innerHTML = (state.lookups.workingGroups || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  if ($("fEngineer")) $("fEngineer").innerHTML = '<option value=""></option>' + (state.lookups.engineers || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  if ($("fStatus")) $("fStatus").innerHTML = (state.lookups.statuses || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
}

function getFilteredProjects() {
  const q = $("search").value.toLowerCase();
  const sf = $("statusFilter").value;
  const gf = $("groupFilter").value;
  const ef = $("engineerFilter").value;
  return state.projects.filter(p => {
    const textMatch = !q || Object.values(p).join(" ").toLowerCase().includes(q);
    const statusMatch = !sf || status(p) === sf;
    const groupMatch = !gf || p["Working Group"] === gf;
    const engineerMatch = !ef || scientist(p) === ef;
    return textMatch && statusMatch && groupMatch && engineerMatch;
  });
}

function renderPortfolioStatus() {
  const statusEl = $("statusChart");
  if (!statusEl) return;
  const statusCounts = {};
  state.projects.forEach(p => {
    const s = status(p);
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });
  const total = state.projects.length || 1;
  statusEl.innerHTML = Object.entries(statusCounts).sort((a, b) => b[1] - a[1]).map(([sName, count]) => {
    const pctVal = ((count / total) * 100).toFixed(0);
    return `
      <div class="metric-row">
        <div><b>${safe(sName)}</b></div>
        <div class="bar"><span style="width:${pctVal}%"></span></div>
        <b style="text-align:right;">${count} <span style="font-size:11px;color:var(--text-muted);">(${pctVal}%)</span></b>
      </div>
    `;
  }).join("");
}

function renderAll() {
  const safe_call = (fn, name) => {
    try { fn(); }
    catch(e) { console.error("[NBRI] render error in", name, ":", e.message, e); }
  };
  safe_call(renderProfitabilitySection, "renderProfitabilitySection");
  safe_call(renderPortfolioStatus,      "renderPortfolioStatus");
  safe_call(renderAlerts,               "renderAlerts");
  safe_call(renderProjects,             "renderProjects");
  safe_call(renderKanban,               "renderKanban");
  safe_call(renderWip,                  "renderWip");
  safe_call(renderFinance,              "renderFinance");
}

/* 6 KEY FINANCIAL INDICATORS & PROFITABILITY DASHBOARD */
function renderProfitabilitySection() {
  const m = state.month || "2026-06";
  const divFin = getDivisionFinance(m);
  const isLowProfit = divFin.profitPct < 5;

  const monthLabel = $("profitMonthLabel");
  if (monthLabel) monthLabel.textContent = m;

  // Render Portfolio Snapshot Banner
  const snapEl = $("portfolioSummaryBar");
  if (snapEl) {
    const totalEst = state.projects.reduce((sum, p) => sum + estimateValue(p), 0);
    const activeCount = state.projects.filter(p => status(p) !== "Completed").length;
    const completedCount = state.projects.filter(p => status(p) === "Completed").length;
    const scientistCount = (state.lookups.engineers || []).length;
    const groupCount = (state.lookups.workingGroups || []).length;

    snapEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">📁</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Registered Projects</div>
          <div style="font-size:16px;font-weight:800;color:var(--text-primary);"><b>${state.projects.length}</b> <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">(${activeCount} Active · ${completedCount} Completed)</span></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">💰</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Total Portfolio Value</div>
          <div style="font-size:16px;font-weight:800;color:var(--primary-color);">${money(totalEst)}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">🔬</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Scientists Assigned</div>
          <div style="font-size:16px;font-weight:800;color:var(--text-primary);"><b>${scientistCount}</b> <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">Scientists</span></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">🏢</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Working Groups</div>
          <div style="font-size:16px;font-weight:800;color:var(--text-primary);"><b>${groupCount}</b> <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">Groups</span></div>
        </div>
      </div>
    `;
  }

  // Render 6 Key Financial Indicator KPI Cards (Exact User Sequence)
  const kpiEl = $("financeIndicatorKpis");
  if (kpiEl) {
    kpiEl.innerHTML = [
      ["1. Money Received", money(divFin.moneyReceived), "#2563eb", ""],
      ["2. Outstanding", money(divFin.outstanding), "#d97706", ""],
      ["3. Interdivisional", money(divFin.interdivisional), "#7c3aed", ""],
      ["4. Working Progress", money(divFin.workingProgress), "#0284c7", ""],
      ["5. Income", money(divFin.income), "#059669", ""],
      [
        "6. Profit & Margin",
        `${money(divFin.profit)} <span style="font-size:14px;padding:2px 8px;border-radius:12px;margin-left:4px;background:${isLowProfit ? '#fee2e2' : '#ecfdf5'};color:${isLowProfit ? '#b91c1c' : '#047857'};font-weight:700;">${divFin.profitPct.toFixed(1)}%</span>`,
        isLowProfit ? "#ef4444" : "#10b981",
        isLowProfit ? "border-color:#ef4444;background:var(--danger-subtle);" : ""
      ]
    ].map(x => `
      <div class="card" style="border-left:4px solid ${x[2]};${x[3]}">
        <div class="label" style="font-size:11px;font-weight:700;">${x[0]}</div>
        <div class="value" style="font-size:19px;color:${x[2]};">${x[1]}</div>
      </div>
    `).join("");
  }

  populateYearSelect();
  renderExecutiveCharts();
}

/* EXECUTIVE CHART.JS VISUALIZATION ENGINE */
const chartInstances = { wip: null, cashflow: null, group: null, profit: null };

function formatRupeeMillions(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return "Rs. " + (value / 1_000_000).toFixed(1) + "M";
  } else if (abs >= 1_000) {
    return "Rs. " + (value / 1_000).toFixed(0) + "K";
  }
  return "Rs. " + value.toLocaleString();
}

function getMonthsForYear(year) {
  const allMonths = [
    { key: `${year}-01`, label: "Jan" },
    { key: `${year}-02`, label: "Feb" },
    { key: `${year}-03`, label: "Mar" },
    { key: `${year}-04`, label: "Apr" },
    { key: `${year}-05`, label: "May" },
    { key: `${year}-06`, label: "Jun" },
    { key: `${year}-07`, label: "Jul" },
    { key: `${year}-08`, label: "Aug" },
    { key: `${year}-09`, label: "Sep" },
    { key: `${year}-10`, label: "Oct" },
    { key: `${year}-11`, label: "Nov" },
    { key: `${year}-12`, label: "Dec" }
  ];

  const currentYear = new Date().getFullYear().toString();
  const currentMonthNum = new Date().getMonth() + 1; // 1-12

  if (year === currentYear) {
    return allMonths.slice(0, currentMonthNum);
  } else if (year < currentYear) {
    return allMonths;
  } else {
    return allMonths.slice(0, 6);
  }
}

function populateYearSelect() {
  const sel = $("dashYearSelect");
  if (!sel) return;

  const yearsInWip = state.wip.map(w => (reportingMonth(w) || "").split("-")[0]).filter(Boolean);
  const yearsInProjects = state.projects.map(p => (safe(p["Date"] || p["Start Date"] || "")).split("-")[0]).filter(y => y.length === 4);
  const availableYears = [...new Set(["2026", "2025", "2024", ...yearsInWip, ...yearsInProjects])].sort().reverse();

  const currVal = sel.value || "2026";
  sel.innerHTML = availableYears.map(y => `<option value="${y}" ${y === currVal ? 'selected' : ''}>${y}</option>`).join("");
}

function renderExecutiveCharts(targetYear) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js is not loaded yet.");
    return;
  }

  const yearSelect = $("dashYearSelect");
  const year = targetYear || (yearSelect ? yearSelect.value : "2026") || "2026";

  const months = getMonthsForYear(year);
  const monthKeys = months.map(m => m.key);
  const monthLabels = months.map(m => m.label);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#e2e8f0" : "#334155";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";

  // Update Period Badge
  const badgeEl = $("dashPeriodBadge");
  if (badgeEl) {
    if (months.length === 12) badgeEl.textContent = `Jan – Dec ${year}`;
    else badgeEl.textContent = `Jan – ${months[months.length - 1].label} ${year}`;
  }

  // Calculate Monthly Metrics
  let runningCumulative = 0;
  const wipData = [];
  const expData = [];
  const cumData = [];
  const mrData = [];
  const outData = [];
  const profitPctData = [];
  const profitPointColors = [];

  monthKeys.forEach(mKey => {
    const fin = getDivisionFinance(mKey);
    let wp = fin.workingProgress || 0;
    if (!wp) {
      // Sum project level WIP if division summary has no override
      wp = state.projects.reduce((sum, p) => {
        const r = getWipRow(projectCode(p), mKey);
        return sum + workingProgressValue(r);
      }, 0);
    }
    const exp = fin.expenditure || 0;
    const mr = fin.moneyReceived || 0;
    const out = fin.outstanding || 0;
    const profitPct = fin.profitPct || 0;

    runningCumulative += wp;

    wipData.push(wp);
    expData.push(exp);
    cumData.push(runningCumulative);
    mrData.push(mr);
    outData.push(out);
    profitPctData.push(profitPct);
    profitPointColors.push(profitPct < 5 ? "#ef4444" : "#10b981");
  });

  /* ----------------------------------------------------
     CHART 1: Monthly Financial WIP & Cumulative Overview (Combo)
     ---------------------------------------------------- */
  const ctxWip = $("chartWipOverview")?.getContext("2d");
  if (ctxWip) {
    if (chartInstances.wip) chartInstances.wip.destroy();
    chartInstances.wip = new Chart(ctxWip, {
      type: "bar",
      data: {
        labels: monthLabels,
        datasets: [
          {
            type: "line",
            label: "Cumulative Financial Progress",
            data: cumData,
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: "#f59e0b",
            tension: 0.3,
            yAxisID: "y"
          },
          {
            type: "bar",
            label: "Monthly Financial WIP",
            data: wipData,
            backgroundColor: "#0284c7",
            borderRadius: 6,
            yAxisID: "y"
          },
          {
            type: "bar",
            label: "Monthly Expenditure",
            data: expData,
            backgroundColor: "#ef4444",
            borderRadius: 6,
            yAxisID: "y"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${money(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => formatRupeeMillions(v)
            },
            grid: { color: gridColor },
            suggestedMin: 0
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 2: Cash Flow & Claims Breakdown (Grouped Bar)
     ---------------------------------------------------- */
  const ctxCashflow = $("chartCashflow")?.getContext("2d");
  if (ctxCashflow) {
    if (chartInstances.cashflow) chartInstances.cashflow.destroy();
    chartInstances.cashflow = new Chart(ctxCashflow, {
      type: "bar",
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: "Money Received",
            data: mrData,
            backgroundColor: "#10b981",
            borderRadius: 5
          },
          {
            label: "Expenditure",
            data: expData,
            backgroundColor: "#ef4444",
            borderRadius: 5
          },
          {
            label: "Outstanding Claims",
            data: outData,
            backgroundColor: "#f97316",
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${money(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => formatRupeeMillions(v)
            },
            grid: { color: gridColor },
            suggestedMin: 0
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 3: Working Group Portfolio Share (Donut)
     ---------------------------------------------------- */
  const ctxGroup = $("chartGroupDistribution")?.getContext("2d");
  if (ctxGroup) {
    const groupTotals = {};
    state.projects.forEach(p => {
      const g = p["Working Group"] || "Unassigned";
      const est = estimateValue(p);
      groupTotals[g] = (groupTotals[g] || 0) + (est > 0 ? est : 1);
    });

    const groupLabels = Object.keys(groupTotals);
    const groupValues = Object.values(groupTotals);
    const donutColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#64748b"];

    if (chartInstances.group) chartInstances.group.destroy();
    chartInstances.group = new Chart(ctxGroup, {
      type: "doughnut",
      data: {
        labels: groupLabels,
        datasets: [
          {
            data: groupValues,
            backgroundColor: donutColors.slice(0, groupLabels.length),
            borderWidth: 2,
            borderColor: isDark ? "#1e293b" : "#ffffff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatRupeeMillions(ctx.parsed)} (${((ctx.parsed / groupValues.reduce((a,b)=>a+b, 0))*100).toFixed(1)}%)`
            }
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 4: Profit Margin % Trend & 5% Alert Threshold
     ---------------------------------------------------- */
  const ctxProfit = $("chartProfitTrend")?.getContext("2d");
  if (ctxProfit) {
    if (chartInstances.profit) chartInstances.profit.destroy();
    chartInstances.profit = new Chart(ctxProfit, {
      type: "line",
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: "5% Safety Threshold",
            data: monthLabels.map(() => 5),
            borderColor: "#ef4444",
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: "Profit Margin %",
            data: profitPctData,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            pointBackgroundColor: profitPointColors,
            pointBorderColor: "#ffffff",
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3,
            tension: 0.25,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.datasetIndex === 0) return "5% Safety Threshold (Red Alert if Below)";
                const v = ctx.parsed.y;
                return `Margin: ${v.toFixed(1)}% ${v < 5 ? '⚠️ (<5% ALERT)' : '✓'}`;
              }
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => `${v}%`
            },
            grid: { color: gridColor },
            suggestedMin: 0,
            suggestedMax: 30
          }
        }
      }
    });
  }
}

function renderAlerts() {
  const missing = state.projects.filter(p => status(p) !== "Completed" && currentWip(projectCode(p)).physical === 0).length;
  const high = state.projects.filter(p => {
    const c = cumulative(projectCode(p));
    return c.physical > 0.8 && (Number(p["Initial Estimate"])||0) > 0 && c.financial < (Number(p["Initial Estimate"])||0) * 0.5;
  }).length;

  $("alerts").innerHTML = `
    <div class="alert ${missing ? '' : 'green'}"><b>${missing}</b> active projects have no physical progress update for ${state.month}.</div>
    <div class="alert ${high ? 'red' : 'green'}"><b>${high}</b> projects have >80% physical completion with <50% financial billing against estimate.</div>
    <div class="alert green">Use <b>Monthly WIP</b> view to submit reporting month entries in bulk.</div>
  `;
}

/* PROJECTS TABLE VIEW WITH IN-LINE EDITING */
function renderProjects() {
  const rows = getFilteredProjects();
  const statuses = state.lookups.statuses || ["In Progress", "Completed", "Pending", "On Hold"];

  $("projectTable").innerHTML = `
    <thead>
      <tr>
        <th>Code</th>
        <th>Client</th>
        <th>Description</th>
        <th>Working Group</th>
        <th>Scientist</th>
        <th>Status</th>
        <th>Estimate (Rs.)</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(p => `
        <tr data-id="${safe(projectId(p))}">
          <td class="code"><b>${safe(projectCode(p))}</b></td>
          <td><b>${safe(p["Client"])}</b></td>
          <td style="font-size:12px;max-width:320px;">${safe(p["Description"])}</td>
          <td><span class="badge">${safe(p["Working Group"])}</span></td>
          <td>${safe(scientist(p)) || 'Unassigned'}</td>
          <td>
            <select class="inline-select" onchange="updateProjectStatusInline('${safe(projectId(p))}', this.value)">
              ${statuses.map(s => `<option value="${safe(s)}" ${s === status(p) ? 'selected' : ''}>${safe(s)}</option>`).join("")}
            </select>
          </td>
          <td><b>${money(p["Initial Estimate"] ?? p["Estimate (Without Tax)"])}</b></td>
          <td>
            <button class="ghost" style="padding:4px 8px;font-size:11px;" onclick="editProject('${safe(projectId(p))}')">Edit</button>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `;
}

async function updateProjectStatusInline(id, newStatus) {
  const p = state.projects.find(x => projectId(x) === id || projectCode(x) === id);
  if (!p) return;
  const old = p["Current Status"] || p["Status"];
  p["Current Status"] = newStatus;
  p["Status"] = newStatus;
  showToast(`Updated ${projectCode(p)} status to ${newStatus}`);

  try {
    await apiPost("updateProject", {
      projectId: projectId(p),
      projectCode: projectCode(p),
      status: newStatus
    });
    // Background GitHub commit
    commitToGitHub(`Update status of ${projectCode(p)} to ${newStatus}`).catch(console.warn);
  } catch (err) {
    p["Current Status"] = old;
    p["Status"] = old;
    renderProjects();
    renderKanban();
    showToast("Failed to save status update to Google Sheets", true);
  }
}

/* KANBAN BOARD VIEW WITH HTML5 DRAG & DROP */
function setViewMode(mode) {
  state.viewMode = mode;
  $("viewModeTable").classList.toggle("active", mode === "table");
  $("viewModeKanban").classList.toggle("active", mode === "kanban");
  $("projectTableWrap").style.display = mode === "table" ? "block" : "none";
  $("kanbanWrap").style.display = mode === "kanban" ? "block" : "none";
  if (mode === "kanban") renderKanban();
  else renderProjects();
}

function renderKanban() {
  const board = $("kanbanBoard");
  if (!board) return;
  const statuses = state.lookups.statuses || ["In Progress", "Completed", "Pending", "On Hold"];
  const filtered = getFilteredProjects();

  board.innerHTML = statuses.map(s => {
    const projs = filtered.filter(p => status(p) === s);
    return `
      <div class="kanban-column" data-status="${safe(s)}" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event, '${safe(s)}')">
        <div class="kanban-column-header">
          <div class="kanban-title">
            <span>${safe(s)}</span>
            <span class="kanban-count">${projs.length}</span>
          </div>
        </div>
        <div class="kanban-cards">
          ${projs.map(p => `
            <div class="kanban-card" draggable="true" ondragstart="handleDragStart(event, '${safe(projectId(p))}')" onclick="editProject('${safe(projectId(p))}')">
              <div class="kanban-card-code">${safe(projectCode(p))}</div>
              <div class="kanban-card-client">${safe(p["Client"])}</div>
              <div class="kanban-card-desc">${safe(p["Description"])}</div>
              <div class="kanban-card-footer">
                <span class="badge" style="font-size:10px;padding:2px 6px;">${safe(p["Working Group"])}</span>
                <span style="font-size:11px;color:var(--text-muted);">🔬 ${safe(scientist(p)) || 'Unassigned'}</span>
                <b style="font-size:11px;color:var(--text-primary);">${money(p["Initial Estimate"] ?? p["Estimate (Without Tax)"])}</b>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

let draggedProjectId = null;
function handleDragStart(e, id) {
  draggedProjectId = id;
  e.dataTransfer.setData("text/plain", id);
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function handleDrop(e, targetStatus) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  if (!draggedProjectId) return;

  const p = state.projects.find(x => projectId(x) === draggedProjectId || projectCode(x) === draggedProjectId);
  if (p && (p["Current Status"] !== targetStatus && p["Status"] !== targetStatus)) {
    updateProjectStatusInline(draggedProjectId, targetStatus);
    renderKanban();
  }
  draggedProjectId = null;
}

/* MONTHLY WIP & PROGRESS MATRIX (CARDS VS TABLE VIEW) */
function recalcFinanceSummary() {
  const m = $("wipMonth").value;
  const exp = Number($("summaryExp").value) || 0;
  const mr = Number($("summaryMr").value) || 0;
  const out = Number($("summaryOut").value) || 0;
  const inter = Number($("summaryInter").value) || 0;

  // Sum all working progress inputs currently displayed
  let totalWp = 0;
  document.querySelectorAll("[data-wip-wp]").forEach(el => {
    totalWp += Number(el.value) || 0;
  });

  const income = totalWp > 0 ? totalWp : (mr + out);
  const profit = income - exp - inter;
  const profitPct = income > 0 ? (profit / income) * 100 : 0;
  const isRed = profitPct < 5;

  $("summaryWpDisplay").textContent = money(totalWp);
  $("summaryIncDisplay").textContent = money(income);
  $("summaryProfitDisplay").textContent = money(profit);
  $("summaryProfitDisplay").style.color = isRed ? "var(--danger)" : "var(--success)";

  const badge = $("summaryProfitBadge");
  if (badge) {
    badge.textContent = profitPct.toFixed(1) + "% Profit Margin";
    badge.style.background = isRed ? "#fee2e2" : "#ecfdf5";
    badge.style.color = isRed ? "#b91c1c" : "#047857";
    badge.style.border = isRed ? "1px solid #fca5a5" : "1px solid transparent";
  }
}

function recalcProjectRow(key) {
  const wp = Number(document.querySelector(`[data-wip-wp="${CSS.escape(key)}"]`)?.value) || 0;
  const prev = Number(document.querySelector(`[data-wip-prev="${CSS.escape(key)}"]`)?.getAttribute("data-val")) || 0;
  const total = prev + wp;

  const totalEl = document.querySelector(`[data-wip-total="${CSS.escape(key)}"]`);
  if (totalEl) totalEl.textContent = money(total);

  // Update estimate % badge
  const estVal = Number(document.querySelector(`[data-wip-est="${CSS.escape(key)}"]`)?.getAttribute("data-val")) || 0;
  const estBadge = $(`estBadge_${key}`);
  if (estBadge && estVal > 0) {
    const p = ((total / estVal) * 100).toFixed(0);
    estBadge.textContent = `${p}% of Est`;
  }

  recalcFinanceSummary();
}

function updateProgressBar(key) {
  const pInput = document.querySelector(`[data-wip-p="${CSS.escape(key)}"]`);
  const bar = $(`pbar_${key}`);
  if (pInput && bar) {
    const val = Math.max(0, Math.min(100, Number(pInput.value) || 0));
    bar.style.width = val + "%";
  }
}

function setMatrixViewMode(mode) {
  state.matrixViewMode = mode;
  $("matrixViewCards")?.classList.toggle("active", mode === "cards");
  $("matrixViewTable")?.classList.toggle("active", mode === "table");

  const cardsContainer = $("matrixCardList");
  const tableWrap = $("matrixTableWrap");

  if (cardsContainer) cardsContainer.style.display = mode === "cards" ? "flex" : "none";
  if (tableWrap) tableWrap.style.display = mode === "table" ? "block" : "none";

  renderWip();
}

function renderWip() {
  const m = $("wipMonth").value;
  if ($("matrixMonthBadge")) $("matrixMonthBadge").textContent = m;

  // Populate Division Summary Inputs
  const divFin = getDivisionFinance(m);
  $("summaryExp").value = divFin.expenditure || "";
  $("summaryMr").value = divFin.moneyReceived || "";
  $("summaryOut").value = divFin.outstanding || "";
  $("summaryInter").value = divFin.interdivisional || "";

  const container = $("matrixCardList");
  const tableWrap = $("matrixTableWrap");
  if (!container) return;

  const mode = state.matrixViewMode || "cards";
  if (container) container.style.display = mode === "cards" ? "flex" : "none";
  if (tableWrap) tableWrap.style.display = mode === "table" ? "block" : "none";

  const query = ($("matrixSearch")?.value || "").toLowerCase().trim();
  const scientistFilter = $("matrixScientistFilter")?.value || "";
  const groupFilter = $("matrixGroupFilter")?.value || "";
  const wipFilter = $("matrixWipFilter")?.value || "";
  const sortMode = $("matrixSortSelect")?.value || "code_asc";

  let active = state.projects.filter(p => status(p) !== "Completed").filter(p => {
    // 1. Text Search Filter (includes code, client, description, and scientist)
    if (query) {
      const txt = `${projectCode(p)} ${p["Client"]} ${p["Description"]} ${scientist(p)}`.toLowerCase();
      if (!txt.includes(query)) return false;
    }
    // 2. Scientist Filter
    if (scientistFilter && scientist(p) !== scientistFilter) return false;

    // 3. Working Group Filter
    if (groupFilter && p["Working Group"] !== groupFilter) return false;

    // 4. WIP Status Filter
    if (wipFilter) {
      const w = currentWip(projectCode(p), m);
      if (wipFilter === "with_wip" && !(w.financial > 0)) return false;
      if (wipFilter === "zero_wip" && w.financial > 0) return false;
    }
    return true;
  });

  // Sort Active Projects
  active.sort((a, b) => {
    if (sortMode === "scientist_asc") {
      const sA = scientist(a) || "zzz", sB = scientist(b) || "zzz";
      return sA.localeCompare(sB) || projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "group_asc") {
      const gA = a["Working Group"] || "zzz", gB = b["Working Group"] || "zzz";
      return gA.localeCompare(gB) || projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "est_desc") {
      return estimateValue(b) - estimateValue(a);
    } else if (sortMode === "wip_desc") {
      const wA = currentWip(projectCode(a), m).financial || 0;
      const wB = currentWip(projectCode(b), m).financial || 0;
      return wB - wA;
    }
    return projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
  });

  // Update Active Count Badge
  if ($("matrixCountBadge")) {
    $("matrixCountBadge").textContent = `${active.length} Active Projects`;
  }

  if (!active.length) {
    container.innerHTML = `<div style="padding:36px;text-align:center;color:var(--text-muted);background:var(--bg-surface-subtle);border-radius:var(--radius-md);font-size:13px;border:1px dashed var(--border-color);">No active projects found matching your filter criteria.</div>`;
    $("wipTable").innerHTML = `<tbody><tr><td colspan="10" style="padding:32px;text-align:center;color:var(--text-muted);">No active projects found matching your filter criteria.</td></tr></tbody>`;
    recalcFinanceSummary();
    return;
  }

  // 1. Render Ultra-Modern Zero-Scroll Cards View
  container.innerHTML = active.map(p => {
    const code = projectCode(p);
    const key = projectId(p) || code;
    const w = currentWip(code, m);
    const estNoTax = estimateValue(p);
    const adv = advanceValue(p, m);
    const prevCum = prevCumulativeValue(p, m);
    const totCum = prevCum + (w.financial || 0);
    const estPct = estNoTax > 0 ? ((totCum / estNoTax) * 100).toFixed(0) : 0;

    return `
      <div class="matrix-card-modern">
        <!-- HEADER ROW: Project ID, Discipline, Scientist, Client & Truncated Scope -->
        <div class="matrix-card-header">
          <div class="matrix-card-meta">
            <span class="matrix-code-chip">📌 ${safe(code)}</span>
            <span class="matrix-group-chip">${safe(p["Working Group"] || "GED")}</span>
            <span class="matrix-eng-chip">🔬 ${safe(scientist(p)) || 'Unassigned'}</span>
            <span class="badge in-progress" style="font-size:10px;padding:2px 7px;">${safe(status(p))}</span>
          </div>
          <div class="matrix-card-title">
            <span class="matrix-client-name">${safe(p["Client"])}</span>
            <span class="matrix-desc-text" title="${safe(p["Description"])}">• ${safe(p["Description"]) || 'Geotechnical scope & engineering assessment'}</span>
          </div>
        </div>

        <!-- 3-COLUMN FLUID GRID: Zero Horizontal Scrolling Required -->
        <div class="matrix-card-grid">
          <!-- Column 1: Financial Baselines -->
          <div class="matrix-sub-panel" data-wip-est="${safe(key)}" data-val="${estNoTax}">
            <div class="matrix-panel-tag">1. Financial Baselines</div>
            <div class="matrix-metric-row">
              <span class="lbl">Estimate (w/o tax):</span>
              <span class="val">${estNoTax ? money(estNoTax) : '-'}</span>
            </div>
            <div class="matrix-metric-row">
              <span class="lbl">Advance (w/o tax):</span>
              <input data-wip-adv="${safe(key)}" type="number" step="0.01" value="${adv || ''}" placeholder="0.00">
            </div>
            <div class="matrix-metric-row">
              <span class="lbl">Prev. Cumulative:</span>
              <span class="val" data-wip-prev="${safe(key)}" data-val="${prevCum}">${prevCum ? money(prevCum) : 'Rs. 0.00'}</span>
            </div>
          </div>

          <!-- Column 2: Selected Month Progress (Highlighted Cyan) -->
          <div class="matrix-sub-panel highlight">
            <div class="matrix-panel-tag cyan">2. Selected Month Progress</div>
            <div class="matrix-input-item">
              <label>Monthly Progress (Rs.)</label>
              <div class="matrix-currency-wrap">
                <span class="prefix">Rs.</span>
                <input data-wip-wp="${safe(key)}" type="number" step="0.01" min="0" value="${w.financial || ''}" placeholder="0.00" oninput="recalcProjectRow('${safe(key)}')">
              </div>
            </div>
            <div class="matrix-input-item">
              <label>
                <span>Physical WIP %</span>
                <span style="font-weight:700;color:var(--text-primary);">${pct(w.physical).toFixed(0)}%</span>
              </label>
              <div class="matrix-p-row">
                <input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${(w.physical * 100) || ''}" placeholder="0%" oninput="updateProgressBar('${safe(key)}')">
                <div class="bar">
                  <span id="pbar_${safe(key)}" style="width:${pct(w.physical)}%;"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: Total Cumulative & Monthly Remarks -->
          <div class="matrix-sub-panel">
            <div class="matrix-panel-tag green">3. Cumulative & Remarks</div>
            <div class="matrix-total-box">
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--text-muted);">Total Cumulative</div>
                <div class="matrix-total-val" data-wip-total="${safe(key)}">${money(totCum)}</div>
              </div>
              <span class="badge completed" id="estBadge_${safe(key)}" style="font-size:11px;font-weight:700;">${estPct}% of Est</span>
            </div>
            <input class="matrix-remarks-input" data-wip-r="${safe(key)}" value="${safe(w.remarks || '')}" placeholder="Monthly progress remarks, claim notes, invoice status...">
          </div>
        </div>
      </div>
    `;
  }).join("");

  // 2. Render Spreadsheet Table View
  $("wipTable").innerHTML = `
    <thead>
      <tr style="background:var(--bg-surface-subtle);">
        <th style="padding:10px 12px;text-align:left;font-size:12px;">No / Code</th>
        <th style="padding:10px 12px;text-align:left;font-size:12px;">Client & Scope</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;">Estimate (w/o tax)</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;">Advance (w/o tax)</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;">Prev. Cumulative</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;color:#0284c7;">Selected Month (Rs.)</th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;">Physical %</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;color:#10b981;">Total Cumulative</th>
        <th style="padding:10px 12px;text-align:left;font-size:12px;">Remarks</th>
      </tr>
    </thead>
    <tbody>
      ${active.map(p => {
        const code = projectCode(p);
        const key = projectId(p) || code;
        const w = currentWip(code, m);
        const estNoTax = estimateValue(p);
        const adv = advanceValue(p, m);
        const prevCum = prevCumulativeValue(p, m);
        const totCum = prevCum + (w.financial || 0);

        return `<tr style="border-bottom:1px solid var(--border-color-subtle);">
          <td class="code" style="padding:8px 12px;"><b>${safe(code)}</b></td>
          <td style="padding:8px 12px;font-size:12px;"><b>${safe(p["Client"])}</b><div style="color:var(--text-muted);font-size:11px;">${safe(p["Description"])}</div></td>
          <td style="padding:8px 12px;text-align:right;">${estNoTax ? money(estNoTax) : '-'}</td>
          <td style="padding:8px 12px;text-align:right;">
            <input data-wip-adv="${safe(key)}" type="number" step="0.01" value="${adv || ''}" style="width:105px;text-align:right;padding:4px 6px;border-radius:4px;border:1px solid var(--border-color);" placeholder="0.00">
          </td>
          <td style="padding:8px 12px;text-align:right;">
            <span data-wip-prev="${safe(key)}" data-val="${prevCum}">${prevCum ? money(prevCum) : '-'}</span>
          </td>
          <td style="padding:8px 12px;text-align:right;">
            <input data-wip-wp="${safe(key)}" type="number" step="0.01" min="0" value="${w.financial || ''}" style="width:120px;text-align:right;font-weight:700;color:#0284c7;padding:4px 6px;border-radius:4px;border:1px solid rgba(2,132,199,0.4);" placeholder="0.00" oninput="recalcProjectRow('${safe(key)}')">
          </td>
          <td style="padding:8px 12px;text-align:center;">
            <input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${(w.physical * 100) || ''}" style="width:65px;text-align:center;padding:4px 6px;border-radius:4px;border:1px solid var(--border-color);" placeholder="0%" oninput="updateProgressBar('${safe(key)}')">
          </td>
          <td style="padding:8px 12px;text-align:right;">
            <b data-wip-total="${safe(key)}" style="color:#10b981;">${money(totCum)}</b>
          </td>
          <td style="padding:8px 12px;">
            <input data-wip-r="${safe(key)}" value="${safe(w.remarks || '')}" placeholder="Notes / claims..." style="width:100%;padding:4px 6px;border-radius:4px;border:1px solid var(--border-color);">
          </td>
        </tr>`;
      }).join("")}
    </tbody>
  `;

  recalcFinanceSummary();
}

/* GITHUB DATABASE REPOSITORY SYNC */
function getGitHubConfig() {
  try {
    return JSON.parse(localStorage.getItem("nbro_gh_config") || "{}");
  } catch {
    return {};
  }
}

function saveGitHubConfig(cfg) {
  localStorage.setItem("nbro_gh_config", JSON.stringify(cfg));
  updateGitHubStatusIndicator();
}

function updateGitHubStatusIndicator() {
  const cfg = getGitHubConfig();
  const dot = $("ghStatusDot");
  if (!dot) return;
  const isConfigured = Boolean(cfg.token && cfg.owner && cfg.repo);
  dot.style.background = isConfigured ? "#10b981" : "#9ca3af";
  dot.title = isConfigured ? `GitHub Connected (${cfg.owner}/${cfg.repo})` : "GitHub sync not configured";
}

function openGitHubDialog() {
  const cfg = getGitHubConfig();
  $("ghToken").value = cfg.token || "";
  $("ghOwner").value = cfg.owner || "";
  $("ghRepo").value = cfg.repo || "ProjectRegister";
  $("ghBranch").value = cfg.branch || "main";
  $("ghPath").value = cfg.path || "data/project-data.json";
  $("ghTestStatus").style.display = "none";
  $("ghDialog").showModal();
}

async function testGitHubConnection() {
  const token = $("ghToken").value.trim();
  const owner = $("ghOwner").value.trim();
  const repo = $("ghRepo").value.trim();
  const statusEl = $("ghTestStatus");

  statusEl.style.display = "block";
  statusEl.style.color = "var(--text-secondary)";
  statusEl.textContent = "Testing connection to GitHub...";

  if (!token || !owner || !repo) {
    statusEl.style.color = "var(--danger)";
    statusEl.textContent = "Please provide Token, Owner, and Repo Name.";
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const repoData = await res.json();
    statusEl.style.color = "var(--success)";
    statusEl.textContent = `✓ Successfully verified: ${repoData.full_name} (${repoData.default_branch})`;
  } catch (err) {
    statusEl.style.color = "var(--danger)";
    statusEl.textContent = `✕ Connection failed: ${err.message}`;
  }
}

async function commitToGitHub(commitMessage = "Auto-update database from NBRO Project Register") {
  const cfg = getGitHubConfig();
  if (!cfg.token || !cfg.owner || !cfg.repo) {
    return { skipped: true, reason: "GitHub settings not configured" };
  }

  const branch = cfg.branch || "main";
  const path = cfg.path || "data/project-data.json";
  const owner = cfg.owner;
  const repo = cfg.repo;
  const token = cfg.token;

  let existingSha = null;
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  try {
    const getRes = await fetch(getUrl, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (getRes.ok) {
      const fileInfo = await getRes.json();
      existingSha = fileInfo.sha;
    }
  } catch (err) {
    console.warn("Could not check existing file SHA on GitHub:", err);
  }

  const databasePayload = {
    reportingMonth: state.month,
    projects: state.projects,
    wip: state.wip,
    financeSummary: state.financeSummary,
    finance: state.finance,
    lastUpdated: new Date().toISOString()
  };

  const jsonString = JSON.stringify(databasePayload, null, 2);
  const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const body = {
    message: commitMessage,
    content: base64Content,
    branch: branch
  };
  if (existingSha) body.sha = existingSha;

  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!putRes.ok) {
    const errData = await putRes.json().catch(() => ({}));
    throw new Error(errData.message || `GitHub commit failed (${putRes.status})`);
  }

  const result = await putRes.json();
  return { success: true, commit: result.commit };
}

async function saveFinanceSummary() {
  const m = $("wipMonth").value;
  const exp = Number($("summaryExp").value) || 0;
  const mr = Number($("summaryMr").value) || 0;
  const out = Number($("summaryOut").value) || 0;
  const inter = Number($("summaryInter").value) || 0;

  let totalWp = 0;
  document.querySelectorAll("[data-wip-wp]").forEach(el => {
    totalWp += Number(el.value) || 0;
  });

  const income = totalWp > 0 ? totalWp : (mr + out);
  const profit = income - exp - inter;
  const profitPct = income > 0 ? (profit / income) * 100 : 0;

  const btn = $("saveFinanceSummaryBtn");
  btn.disabled = true;
  btn.textContent = "Syncing (GitHub & Sheets)...";

  try {
    const payload = {
      reportingMonth: m,
      expenditure: exp,
      moneyReceived: mr,
      outstanding: out,
      interdivisional: inter,
      workingProgress: totalWp,
      income,
      profit,
      profitPct: Number(profitPct.toFixed(2))
    };

    // Update local state first
    const existingIdx = state.financeSummary.findIndex(x => reportingMonth(x) === m);
    if (existingIdx >= 0) state.financeSummary[existingIdx] = payload;
    else state.financeSummary.push(payload);

    // Step 1: Commit directly to GitHub Repository
    let ghNote = "";
    try {
      const ghRes = await commitToGitHub(`Update Division Monthly Financials for ${m}`);
      if (ghRes.success) ghNote = " (Committed to GitHub)";
    } catch (ghErr) {
      console.warn("GitHub commit warning:", ghErr);
      showToast("GitHub commit warning: " + ghErr.message, true);
    }

    // Step 2: Sync to Google Sheets
    await apiPost("saveFinanceSummary", payload);
    const finSumRes = await apiGet("financeSummary");
    state.financeSummary = Array.isArray(finSumRes.data) ? finSumRes.data : state.financeSummary;
    renderProfitabilitySection();
    showToast("Division Monthly Financials saved!" + ghNote);
  } catch (err) {
    console.error(err);
    showToast("Failed to save financials: " + err.message, true);
    alert("Could not save division financials.\n\n" + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "💾 Save Division Financials";
  }
}

async function saveWip() {
  const m = $("wipMonth").value;
  const active = state.projects.filter(p => status(p) !== "Completed");
  const btn = $("saveWipBtn");
  btn.disabled = true;
  btn.textContent = "Syncing (GitHub & Sheets)…";

  try {
    const records = active.map(p => {
      const key = projectId(p) || projectCode(p);
      const ph = Number(document.querySelector(`[data-wip-p="${CSS.escape(key)}"]`)?.value) || 0;
      const wp = Number(document.querySelector(`[data-wip-wp="${CSS.escape(key)}"]`)?.value) || 0;
      const adv = Number(document.querySelector(`[data-wip-adv="${CSS.escape(key)}"]`)?.value) || 0;
      const prev = Number(document.querySelector(`[data-wip-prev="${CSS.escape(key)}"]`)?.getAttribute("data-val")) || 0;
      const remarks = document.querySelector(`[data-wip-r="${CSS.escape(key)}"]`)?.value || "";

      return {
        projectId: projectId(p),
        projectCode: projectCode(p),
        reportingMonth: m,
        physicalWip: ph,
        monthlyProgress: wp,
        workingProgress: wp,
        advanceReceived: adv,
        prevCumulative: prev,
        totalCumulative: prev + wp,
        remarks
      };
    });

    // Step 1: Commit directly to GitHub Repository
    let ghNote = "";
    try {
      const ghRes = await commitToGitHub(`Update Project Progress Matrix for ${m}`);
      if (ghRes.success) ghNote = " (Committed to GitHub)";
    } catch (ghErr) {
      console.warn("GitHub commit warning:", ghErr);
      showToast("GitHub commit warning: " + ghErr.message, true);
    }

    // Step 2: Sync to Google Sheets
    await apiPost("saveMonthlyWIP", { records });
    const wipRes = await apiGet("wip");
    state.wip = Array.isArray(wipRes.data) ? wipRes.data : state.wip;
    state.month = m;
    $("reportMonth").value = m;
    renderAll();
    showToast("Project Progress Matrix saved to Google Sheets!" + ghNote);
  } catch (err) {
    console.error(err);
    showToast("Failed to save progress: " + err.message, true);
    alert("Project progress could not be saved.\n\n" + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "💾 Save Project Progress Matrix";
  }
}

/* FINANCIAL DASHBOARD */
function renderFinance() {
  const estimate = state.projects.reduce((s,p) => s + (Number(p["Initial Estimate"])||0), 0);
  const cumulativeWip = state.projects.reduce((s,p) => s + cumulative(projectCode(p)).financial, 0);

  $("financeKpis").innerHTML = [
    ["Portfolio Estimate", money(estimate)],
    ["Total Cumulative Billed", money(cumulativeWip)],
    ["Billing vs. Estimate", estimate ? ((cumulativeWip / estimate) * 100).toFixed(1) + "%" : "0%"]
  ].map(x => `<div class="card"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join("");

  const rows = state.projects.map(p => {
    const c = cumulative(projectCode(p));
    return [p, c];
  }).filter(x => x[1].financial || Number(x[0]["Initial Estimate"])).sort((a,b) => b[1].financial - a[1].financial).slice(0, 30);

  $("financeTable").innerHTML = `
    <thead>
      <tr>
        <th>Project</th>
        <th>Client</th>
        <th>Estimate (Rs.)</th>
        <th>Cumulative WIP (Rs.)</th>
        <th>% of Estimate</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(x => `<tr>
        <td class="code">
          ${safe(projectCode(x[0]))}
          <div class="mini">${safe(x[0]["Description"])}</div>
        </td>
        <td><b>${safe(x[0]["Client"])}</b></td>
        <td>${money(x[0]["Initial Estimate"])}</td>
        <td><b>${money(x[1].financial)}</b></td>
        <td><div class="bar" style="height:6px;width:100px;display:inline-block;vertical-align:middle;margin-right:8px;"><span style="width:${Math.min(100, (x[1].financial / (Number(x[0]["Initial Estimate"])||1)) * 100)}%"></span></div><b>${(Number(x[0]["Initial Estimate"]) ? ((x[1].financial / Number(x[0]["Initial Estimate"])) * 100).toFixed(0) : 0)}%</b></td>
      </tr>`).join("")}
    </tbody>
  `;
}

/* PROJECT MODAL CRUD WITH DUAL SYNC */
function openNew() {
  $("dialogTitle").textContent = "New project";
  $("editIndex").value = "";
  $("projectForm").reset();
  $("projectDialog").showModal();
}

function editProject(id) {
  const p = state.projects.find(x => projectId(x) === String(id) || projectCode(x) === String(id));
  if (!p) return;
  $("dialogTitle").textContent = "Edit Project: " + projectCode(p);
  $("editIndex").value = projectId(p);
  $("fCode").value = projectCode(p);
  $("fClient").value = safe(p["Client"]);
  $("fDesc").value = safe(p["Description"]);
  $("fGroup").value = safe(p["Working Group"]);
  $("fEngineer").value = safe(p["Responsible Engineer"]);
  $("fEstimate").value = Number(p["Initial Estimate"]) || "";
  $("fAdvance").value = Number(p["Advance Amount"]) || "";
  $("fStatus").value = status(p);
  $("fRemarks").value = safe(p["Remarks"]);
  $("projectDialog").showModal();
}

async function saveProject(e) {
  e.preventDefault();
  const id = $("editIndex").value;
  const stVal = $("fStatus").value;
  const project = {
    "Project ID": id || $("fCode").value.trim(),
    "Project Code": $("fCode").value.trim(),
    "Client": $("fClient").value,
    "Description": $("fDesc").value,
    "Working Group": $("fGroup").value,
    "Responsible Engineer": $("fEngineer").value,
    "Initial Estimate": Number($("fEstimate").value) || 0,
    "Advance Amount": Number($("fAdvance").value) || 0,
    "Current Status": stVal,
    "Status": stVal,
    "Remarks": $("fRemarks").value
  };

  const btn = $("saveProjectBtn");
  btn.disabled = true;
  btn.textContent = "Syncing (GitHub & Sheets)…";

  try {
    // Step 1: Commit directly to GitHub
    let ghNote = "";
    try {
      const ghRes = await commitToGitHub(`${id ? 'Update' : 'Create'} project ${project["Project Code"]}`);
      if (ghRes.success) ghNote = " (Committed to GitHub)";
    } catch (ghErr) {
      console.warn("GitHub commit warning:", ghErr);
    }

    // Step 2: Sync to Google Sheets
    await apiPost(id ? "updateProject" : "createProject", { project });
    const res = await apiGet("projects");
    state.projects = Array.isArray(res.data) ? res.data : state.projects;
    state.lookups = res.lookups || state.lookups;
    deriveLookups();
    fillFilters();
    $("projectDialog").close();
    renderAll();
    showToast((id ? "Project updated!" : "New project created!") + ghNote);
  } catch (err) {
    console.error(err);
    showToast("Save failed: " + err.message, true);
    alert("Project could not be saved.\n\n" + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Save project";
  }
}

/* EXPORT JSON */
async function exportJSON() {
  const blob = new Blob([JSON.stringify({
    projects: state.projects,
    wip: state.wip,
    finance: state.finance,
    exportedAt: new Date().toISOString()
  }, null, 2)], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `nbro-project-register-${state.month}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("JSON export generated successfully.");
}

/* COMMAND PALETTE */
function openCmdPalette() {
  const modal = $("cmdPaletteBackdrop");
  const input = $("cmdSearchInput");
  modal.classList.add("active");
  input.value = "";
  renderCmdResults("");
  input.focus();
}

function closeCmdPalette() {
  $("cmdPaletteBackdrop").classList.remove("active");
}

function renderCmdResults(query) {
  const container = $("cmdResults");
  const q = query.toLowerCase().trim();

  const actions = [
    { title: "➕ Add New Project", meta: "Action", action: () => { closeCmdPalette(); openNew(); } },
    { title: "📊 Switch to Dashboard", meta: "Navigation", action: () => { switchTab("dashboard"); closeCmdPalette(); } },
    { title: "📁 Switch to Projects Table", meta: "Navigation", action: () => { switchTab("projects"); setViewMode("table"); closeCmdPalette(); } },
    { title: "📌 Switch to Kanban Board", meta: "Navigation", action: () => { switchTab("projects"); setViewMode("kanban"); closeCmdPalette(); } },
    { title: "📈 Switch to Monthly WIP", meta: "Navigation", action: () => { switchTab("wip"); closeCmdPalette(); } },
    { title: "💰 Switch to Financial Overview", meta: "Navigation", action: () => { switchTab("finance"); closeCmdPalette(); } },
    { title: "🌓 Toggle Dark / Light Theme", meta: "Preference", action: () => { toggleTheme(); closeCmdPalette(); } },
    { title: "📥 Export Complete Data Backup (JSON)", meta: "Data", action: () => { exportJSON(); closeCmdPalette(); } }
  ];

  let projectResults = state.projects.map(p => ({
    title: `${projectCode(p)} • ${safe(p["Client"])}`,
    meta: `${safe(p["Working Group"])} | Eng. ${safe(p["Responsible Engineer"])} | ${status(p)}`,
    action: () => {
      closeCmdPalette();
      switchTab("projects");
      editProject(projectId(p));
    }
  }));

  if (q) {
    projectResults = projectResults.filter(x => x.title.toLowerCase().includes(q) || x.meta.toLowerCase().includes(q));
    state.cmdFilteredItems = [...actions.filter(a => a.title.toLowerCase().includes(q)), ...projectResults];
  } else {
    state.cmdFilteredItems = [...actions, ...projectResults.slice(0, 10)];
  }

  state.cmdSelectedIndex = 0;
  if (!state.cmdFilteredItems.length) {
    container.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);">No matching projects or actions found.</div>`;
    return;
  }

  container.innerHTML = state.cmdFilteredItems.map((item, idx) => `
    <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}" onclick="executeCmdIndex(${idx})">
      <div>
        <div class="cmd-item-title">${item.title}</div>
        <div class="cmd-item-meta">${item.meta}</div>
      </div>
      <span style="font-size:11px;color:var(--text-muted);">↵ Select</span>
    </div>
  `).join("");
}

function executeCmdIndex(idx) {
  if (state.cmdFilteredItems[idx]) {
    state.cmdFilteredItems[idx].action();
  }
}

function switchTab(viewId) {
  document.querySelectorAll(".tab").forEach(x => {
    x.classList.toggle("active", x.dataset.view === viewId);
  });
  document.querySelectorAll(".view").forEach(x => {
    x.classList.toggle("active", x.id === viewId);
  });
  try {
    if (viewId === "dashboard") renderExecutiveCharts();
    else if (viewId === "projects") { if (state.viewMode === "kanban") renderKanban(); else renderProjects(); }
    else if (viewId === "wip") renderWip();
    else if (viewId === "finance") renderFinance();
  } catch (e) {
    console.error("[NBRI] switchTab render error:", e);
  }
}

/* EVENT LISTENERS */
document.querySelectorAll(".tab").forEach(b => {
  b.onclick = () => switchTab(b.dataset.view);
});

$("themeToggle").onclick = toggleTheme;
$("cmdPaletteTrigger").onclick = openCmdPalette;
$("cmdPaletteBackdrop").onclick = e => { if (e.target === $("cmdPaletteBackdrop")) closeCmdPalette(); };

$("cmdSearchInput").oninput = e => renderCmdResults(e.target.value);
$("cmdSearchInput").onkeydown = e => {
  if (e.key === "Escape") closeCmdPalette();
  else if (e.key === "Enter") {
    executeCmdIndex(state.cmdSelectedIndex);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    state.cmdSelectedIndex = Math.min(state.cmdFilteredItems.length - 1, state.cmdSelectedIndex + 1);
    updateCmdHighlight();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    state.cmdSelectedIndex = Math.max(0, state.cmdSelectedIndex - 1);
    updateCmdHighlight();
  }
};

function updateCmdHighlight() {
  document.querySelectorAll(".cmd-item").forEach((el, idx) => {
    el.classList.toggle("selected", idx === state.cmdSelectedIndex);
    if (idx === state.cmdSelectedIndex) el.scrollIntoView({ block: "nearest" });
  });
}

window.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openCmdPalette();
  }
});

$("viewModeTable").onclick = () => setViewMode("table");
$("viewModeKanban").onclick = () => setViewMode("kanban");

["search", "statusFilter", "groupFilter", "engineerFilter"].forEach(id => {
  $(id).addEventListener("input", () => {
    if (state.viewMode === "kanban") renderKanban();
    else renderProjects();
  });
});

$("reportMonth").onchange = e => {
  state.month = e.target.value;
  $("wipMonth").value = e.target.value;
  renderAll();
};

$("wipMonth").onchange = renderWip;
$("saveWipBtn").onclick = saveWip;
$("saveFinanceSummaryBtn").onclick = saveFinanceSummary;
$("newProjectBtn").onclick = openNew;
$("projectForm").addEventListener("submit", saveProject);
$("exportBtn").onclick = exportJSON;

// Dialog Backdrop Dismissal Listeners
$("projectDialog")?.addEventListener("click", e => {
  const rect = $("projectDialog").getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) $("projectDialog").close();
});

$("ghDialog")?.addEventListener("click", e => {
  const rect = $("ghDialog").getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) $("ghDialog").close();
});

// GitHub Dialog Event Listeners
if ($("ghSettingsBtn")) $("ghSettingsBtn").onclick = openGitHubDialog;
if ($("ghTestBtn")) $("ghTestBtn").onclick = testGitHubConnection;
$("ghForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const cfg = {
    token: $("ghToken").value.trim(),
    owner: $("ghOwner").value.trim(),
    repo: $("ghRepo").value.trim(),
    branch: $("ghBranch").value.trim() || "main",
    path: $("ghPath").value.trim() || "data/project-data.json"
  };
  saveGitHubConfig(cfg);
  $("ghDialog")?.close();
  showToast("GitHub sync settings saved successfully!");
});

$("matrixSearch")?.addEventListener("input", renderWip);
$("matrixScientistFilter")?.addEventListener("change", renderWip);
$("matrixGroupFilter")?.addEventListener("change", renderWip);
$("matrixWipFilter")?.addEventListener("change", renderWip);
$("matrixSortSelect")?.addEventListener("change", renderWip);
$("matrixViewCards")?.addEventListener("click", () => setMatrixViewMode("cards"));
$("matrixViewTable")?.addEventListener("click", () => setMatrixViewMode("table"));
$("dashYearSelect")?.addEventListener("change", e => renderExecutiveCharts(e.target.value));

// Global event handlers & calculations
window.handleDragStart = handleDragStart;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
window.updateProjectStatusInline = updateProjectStatusInline;
window.editProject = editProject;
window.executeCmdIndex = executeCmdIndex;
window.recalcFinanceSummary = recalcFinanceSummary;
window.recalcProjectRow = recalcProjectRow;
window.updateProgressBar = updateProgressBar;
window.setMatrixViewMode = setMatrixViewMode;
window.renderExecutiveCharts = renderExecutiveCharts;
window.openGitHubDialog = openGitHubDialog;

// Boot application
init();
updateGitHubStatusIndicator();
