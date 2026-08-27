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

const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 2 }).format(Number(n) || 0);
const moneyShort = n => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(Number(n) || 0);
const pct = n => Math.max(0, Math.min(100, (Number(n) || 0) * 100));
const safe = v => v == null ? "" : String(v);

function projectCode(p) { return safe(p["Project Code"] ?? p.projectCode ?? p["No"] ?? p.no); }
function projectId(p) { return safe(p["Project ID"] ?? p.projectId ?? p.id) || projectCode(p); }
function status(p) { return safe(p["Current Status"] ?? p.Status ?? p.status) || "In Progress"; }
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
  state.lookups.engineers = unique("Responsible Engineer");
}

async function init() {
  initTheme();
  try {
    let res = null;
    try {
      // Step 1: Try fast combined bootstrap fetch
      res = await apiGet("all");
    } catch (e) {
      console.warn("Combined bootstrap fetch notice:", e);
    }

    if (!res || (!res.projects && !res.data)) {
      // Step 2: Fallback to sequential individual fetches (prevents Google single-thread lock dropped connections)
      const projectsRes = await apiGet("projects");
      const wipRes = await apiGet("wip").catch(() => ({ data: [] }));
      const finSumRes = await apiGet("financeSummary").catch(() => ({ data: [] }));
      const financeRes = await apiGet("finance").catch(() => ({ data: [] }));

      res = {
        projects: projectsRes.data || [],
        wip: wipRes.data || [],
        financeSummary: finSumRes.data || [],
        finance: financeRes.data || [],
        lookups: projectsRes.lookups || {},
        reportingMonth: projectsRes.reportingMonth || state.month
      };
    }

    state.projects = Array.isArray(res.projects) ? res.projects : (Array.isArray(res.data) ? res.data : []);
    state.wip = Array.isArray(res.wip) ? res.wip : [];
    state.financeSummary = Array.isArray(res.financeSummary) ? res.financeSummary : [];
    state.finance = Array.isArray(res.finance) ? res.finance : [];
    state.lookups = res.lookups || {};
    state.month = res.reportingMonth || state.month;
    deriveLookups();
    $("reportMonth").value = state.month;
    $("wipMonth").value = state.month;
    fillFilters();
    renderAll();
    setApiStatus("Live database connected", true);
  } catch (err) {
    console.warn("Live API connection failed, attempting local data fallback:", err);
    try {
      const res = await fetch("data/project-data.json");
      if (res.ok) {
        const localData = await res.json();
        state.projects = localData.projects || [];
        state.wip = localData.wip || [];
        state.financeSummary = localData.financeSummary || [];
        state.month = localData.reportingMonth || state.month;
        deriveLookups();
        $("reportMonth").value = state.month;
        $("wipMonth").value = state.month;
        fillFilters();
        renderAll();
        setApiStatus("Offline demo data (Google Sheets disconnected)", false);
        return;
      }
    } catch (fallbackErr) {
      console.error(fallbackErr);
    }
    setApiStatus("API connection failed", false);
    alert("Could not load the live NBRI database.\n\n" + err.message);
  }
}

function setApiStatus(message, good) {
  let el = $("apiStatus");
  if (!el) {
    el = document.createElement("div");
    el.id = "apiStatus";
    el.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9999;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;background:var(--bg-surface);color:var(--text-primary);box-shadow:var(--shadow-lg);border:1px solid var(--border-color);display:flex;align-items:center;gap:6px;";
    document.body.appendChild(el);
  }
  el.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${good ? '#10b981' : '#ef4444'};"></span> ${message}`;
}

function fillFilters() {
  for (const [id, arr, label] of [["statusFilter", state.lookups.statuses || [], "All statuses"], ["groupFilter", state.lookups.workingGroups || [], "All working groups"], ["engineerFilter", state.lookups.engineers || [], "All engineers"]]) {
    $(id).innerHTML = `<option value="">${label}</option>` + arr.map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  }
  $("fGroup").innerHTML = (state.lookups.workingGroups || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  $("fEngineer").innerHTML = '<option value=""></option>' + (state.lookups.engineers || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  $("fStatus").innerHTML = (state.lookups.statuses || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
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
    const engineerMatch = !ef || p["Responsible Engineer"] === ef;
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
  renderProfitabilitySection();
  renderPortfolioStatus();
  renderAlerts();
  renderProjects();
  renderKanban();
  renderWip();
  renderFinance();
}

/* 6 KEY FINANCIAL INDICATORS & PROFITABILITY DASHBOARD */
function renderProfitabilitySection() {
  const m = state.month || "2026-06";
  const divFin = getDivisionFinance(m);
  const isLowProfit = divFin.profitPct < 5;

  const monthLabel = $("profitMonthLabel");
  if (monthLabel) monthLabel.textContent = m;

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
    return (value / 1_000_000).toFixed(1) + "M";
  } else if (abs >= 1_000) {
    return (value / 1_000).toFixed(0) + "K";
  }
  return String(value);
}

function getAvailableYears() {
  const years = new Set();
  const currentY = (state.month || "2026-06").slice(0, 4);
  years.add(currentY);
  years.add("2025");
  years.add("2024");

  state.financeSummary.forEach(x => {
    const ym = reportingMonth(x);
    if (ym && ym.length >= 4) years.add(ym.slice(0, 4));
  });
  state.wip.forEach(x => {
    const ym = reportingMonth(x);
    if (ym && ym.length >= 4) years.add(ym.slice(0, 4));
  });

  return Array.from(years).sort().reverse();
}

function populateYearSelect() {
  const sel = $("dashYearSelect");
  if (!sel) return;
  const currentVal = sel.value || (state.month || "2026-06").slice(0, 4);
  const years = getAvailableYears();

  sel.innerHTML = years.map(y => `<option value="${y}" ${y === currentVal ? 'selected' : ''}>${y}</option>`).join("");
}

function getMonthsForYear(year) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentReportingMonth = state.month || "2026-06";
  const currentReportingYear = currentReportingMonth.slice(0, 4);
  const activeMonthNum = Number(currentReportingMonth.slice(5, 7)) || 6;

  let maxMonth = 12;
  // If current reporting year is selected, show up to the active reporting month
  if (year === currentReportingYear) {
    maxMonth = activeMonthNum;
  }

  const result = [];
  for (let i = 1; i <= maxMonth; i++) {
    const mStr = i < 10 ? `0${i}` : `${i}`;
    result.push({
      key: `${year}-${mStr}`,
      label: monthNames[i - 1]
    });
  }
  return result;
}

function renderExecutiveCharts(targetYear) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js is not loaded yet.");
    return;
  }

  const year = targetYear || $("dashYearSelect")?.value || (state.month || "2026-06").slice(0, 4);
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
        const row = getWipRow(projectCode(p), mKey);
        return sum + (Number(row["Monthly Progress"]) || Number(row["Working Progress"]) || Number(row["Monthly Financial WIP"]) || 0);
      }, 0);
    }

    const exp = fin.expenditure || 0;
    const mr = fin.moneyReceived || 0;
    const out = fin.outstanding || 0;
    const inc = wp > 0 ? wp : (mr + out);
    const prof = inc - exp - (fin.interdivisional || 0);
    const profPct = inc > 0 ? (prof / inc) * 100 : (fin.profitPct || 0);

    runningCumulative += wp;

    wipData.push(wp);
    expData.push(exp);
    cumData.push(runningCumulative);
    mrData.push(mr);
    outData.push(out);
    profitPctData.push(Number(profPct.toFixed(1)));
    profitPointColors.push(profPct < 5 ? "#ef4444" : "#10b981");
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
            label: "Cumulative Progress (Rs.)",
            data: cumData,
            borderColor: "#f59e0b",
            backgroundColor: "#f59e0b",
            borderWidth: 3,
            tension: 0.3,
            fill: false,
            yAxisID: "y"
          },
          {
            type: "bar",
            label: "Monthly WIP (Rs.)",
            data: wipData,
            backgroundColor: "#0284c7",
            borderRadius: 4,
            yAxisID: "y"
          },
          {
            type: "bar",
            label: "Monthly Expenditure (Rs.)",
            data: expData,
            backgroundColor: "#ef4444",
            borderRadius: 4,
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
              label: (ctx) => `${ctx.dataset.label}: Rs. ${ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => "Rs. " + formatRupeeMillions(v)
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 2: Monthly Cash Flow & Claims Breakdown
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
            borderRadius: 4
          },
          {
            label: "Expenditure",
            data: expData,
            backgroundColor: "#f43f5e",
            borderRadius: 4
          },
          {
            label: "Outstanding Claims",
            data: outData,
            backgroundColor: "#f97316",
            borderRadius: 4
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
              label: (ctx) => `${ctx.dataset.label}: Rs. ${ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => "Rs. " + formatRupeeMillions(v)
            },
            grid: { color: gridColor }
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
    if (chartInstances.group) chartInstances.group.destroy();

    const groupMap = {};
    state.projects.forEach(p => {
      const g = p["Working Group"] || "General / Other";
      const est = estimateValue(p) || (Number(p["Initial Estimate"]) || 0);
      groupMap[g] = (groupMap[g] || 0) + (est || 1);
    });

    const gLabels = Object.keys(groupMap);
    const gValues = Object.values(groupMap);
    const colors = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#64748b"];

    chartInstances.group = new Chart(ctxGroup, {
      type: "doughnut",
      data: {
        labels: gLabels,
        datasets: [
          {
            data: gValues,
            backgroundColor: colors.slice(0, gLabels.length),
            borderWidth: isDark ? 2 : 1,
            borderColor: isDark ? "#1e293b" : "#ffffff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: textColor, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: Rs. ${formatRupeeMillions(ctx.parsed)} (${((ctx.parsed / (gValues.reduce((a, b) => a + b, 0) || 1)) * 100).toFixed(0)}%)`
            }
          }
        },
        cutout: "65%"
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
        <th>Engineer</th>
        <th>Status</th>
        <th>Estimate (LKR)</th>
        <th>Progress</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(p => {
        const c = cumulative(projectCode(p));
        const st = status(p);
        const pId = projectId(p);
        const badgeClass = st === "Completed" ? "completed" : (st === "In Progress" ? "in-progress" : "pending");

        return `<tr>
          <td class="code">${safe(projectCode(p))}</td>
          <td><b>${safe(p["Client"])}</b></td>
          <td style="max-width:280px;font-size:12px;color:var(--text-secondary);">${safe(p["Description"])}</td>
          <td><span class="badge">${safe(p["Working Group"])}</span></td>
          <td><span class="engineer-tag">👤 ${safe(p["Responsible Engineer"])}</span></td>
          <td>
            <select class="inline-select badge ${badgeClass}" onchange="updateProjectStatusInline('${pId.replace(/'/g, "\\'")}', this.value)">
              ${statuses.map(s => `<option value="${safe(s)}" ${s === st ? 'selected' : ''}>${safe(s)}</option>`).join("")}
            </select>
          </td>
          <td><b>${money(p["Initial Estimate"])}</b></td>
          <td>
            <div class="bar"><span style="width:${pct(c.physical)}%"></span></div>
            <span class="mini">${pct(c.physical).toFixed(0)}%</span>
          </td>
          <td>
            <button class="ghost" style="padding:4px 10px;font-size:12px;" onclick="editProject('${pId.replace(/'/g, "\\'")}')">Edit</button>
          </td>
        </tr>`;
      }).join("")}
    </tbody>
  `;
}

/* INLINE STATUS UPDATE */
async function updateProjectStatusInline(id, newStatus) {
  const p = state.projects.find(x => projectId(x) === String(id) || projectCode(x) === String(id));
  if (!p) return;
  p["Current Status"] = newStatus;
  p["Status"] = newStatus;
  renderAll();
  showToast(`Updated ${projectCode(p)} status to ${newStatus}`);

  try {
    await apiPost("updateProject", { project: p });
  } catch (err) {
    console.error("Status update error:", err);
    showToast("Failed to sync status with Google Sheets: " + err.message, true);
  }
}

/* KANBAN BOARD VIEW */
function renderKanban() {
  const board = $("kanbanBoard");
  if (!board) return;

  const columns = ["In Progress", "Pending", "On Hold", "Completed"];
  const filtered = getFilteredProjects();

  board.innerHTML = columns.map(colName => {
    const colProjects = filtered.filter(p => {
      const s = status(p);
      if (colName === "In Progress") return s === "In Progress" || s === "Ongoing";
      if (colName === "Pending") return s === "Pending" || s === "Initiation" || s === "Not Started";
      if (colName === "On Hold") return s === "On Hold" || s === "Delayed";
      if (colName === "Completed") return s === "Completed" || s === "Done";
      return s === colName;
    });

    return `
      <div class="kanban-col" data-status="${colName}" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event, '${colName}')">
        <div class="kanban-header">
          <div class="kanban-title">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${colName === 'Completed' ? 'var(--success)' : (colName === 'In Progress' ? 'var(--primary)' : 'var(--warning)')};"></span>
            ${colName}
          </div>
          <span class="kanban-count">${colProjects.length}</span>
        </div>
        <div class="kanban-cards">
          ${colProjects.map(p => {
            const c = cumulative(projectCode(p));
            const pId = projectId(p);
            return `
              <div class="kanban-card" draggable="true" ondragstart="handleDragStart(event, '${pId.replace(/'/g, "\\'")}')" onclick="editProject('${pId.replace(/'/g, "\\'")}')">
                <div class="kanban-card-head">
                  <span class="code">${safe(projectCode(p))}</span>
                  <span class="badge" style="font-size:10px;">${safe(p["Working Group"])}</span>
                </div>
                <div class="kanban-card-title">${safe(p["Description"]) || safe(p["Client"])}</div>
                <div class="mini" style="margin-bottom:6px;">Client: <b>${safe(p["Client"])}</b></div>
                <div class="bar" style="height:6px;margin:6px 0;"><span style="width:${pct(c.physical)}%"></span></div>
                <div class="kanban-card-meta">
                  <span class="engineer-tag">👤 ${safe(p["Responsible Engineer"])}</span>
                  <b>${money(p["Initial Estimate"])}</b>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }).join("");
}

/* DRAG AND DROP HANDLERS */
let draggedProjectId = null;

function handleDragStart(e, id) {
  draggedProjectId = id;
  e.dataTransfer.setData("text/plain", id);
  e.target.classList.add("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
  const col = e.currentTarget;
  col.style.borderColor = "var(--primary)";
}

function handleDragLeave(e) {
  const col = e.currentTarget;
  col.style.borderColor = "var(--border-color)";
}

async function handleDrop(e, targetStatus) {
  e.preventDefault();
  const col = e.currentTarget;
  col.style.borderColor = "var(--border-color)";
  if (!draggedProjectId) return;
  await updateProjectStatusInline(draggedProjectId, targetStatus);
  draggedProjectId = null;
}

/* VIEW SWITCHER */
function setViewMode(mode) {
  state.viewMode = mode;
  $("viewModeTable").classList.toggle("active", mode === "table");
  $("viewModeKanban").classList.toggle("active", mode === "kanban");
  $("projectTableWrap").style.display = mode === "table" ? "block" : "none";
  $("kanbanWrap").style.display = mode === "kanban" ? "block" : "none";
  if (mode === "kanban") renderKanban();
  else renderProjects();
}

/* MONTHLY DIVISION FINANCIAL SUMMARY & PROJECT MATRIX */
function recalcFinanceSummary() {
  const exp = Number($("summaryExp").value) || 0;
  const mr = Number($("summaryMr").value) || 0;
  const out = Number($("summaryOut").value) || 0;
  const inter = Number($("summaryInter").value) || 0;

  // Sum all project monthly progress inputs currently in the matrix
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
  const matrixLabel = $("matrixMonthLabel");
  if (matrixLabel) matrixLabel.textContent = m;

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
  const active = state.projects.filter(p => status(p) !== "Completed").filter(p => {
    if (!query) return true;
    const txt = `${projectCode(p)} ${p["Client"]} ${p["Description"]} ${p["Responsible Engineer"]}`.toLowerCase();
    return txt.includes(query);
  });

  if (!active.length) {
    container.innerHTML = `<div style="padding:32px;text-align:center;color:var(--text-muted);background:var(--bg-surface-subtle);border-radius:var(--radius-md);">No active projects found matching your search.</div>`;
    $("wipTable").innerHTML = `<tbody><tr><td colspan="10" style="padding:32px;text-align:center;color:var(--text-muted);">No active projects found matching your search.</td></tr></tbody>`;
    recalcFinanceSummary();
    return;
  }

  // 1. Render Cards View
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
      <div class="matrix-row-card">
        <!-- 1. PROJECT IDENTIFICATION -->
        <div class="matrix-info-block">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
            <span class="code-badge">📌 ${safe(code)}</span>
            <span class="badge" style="font-size:10px;padding:2px 7px;">${safe(p["Working Group"] || "NBRO")}</span>
          </div>
          <div class="client-name">${safe(p["Client"])}</div>
          <div class="desc-text" title="${safe(p["Description"])}">${safe(p["Description"]) || 'Geotechnical / Engineering Scope'}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">👤 Eng. <b>${safe(p["Responsible Engineer"]) || 'Unassigned'}</b></div>
        </div>

        <!-- 2. BASELINE FINANCIALS (COMPACT GRID) -->
        <div class="matrix-metric-box">
          <div class="matrix-metric-item" data-wip-est="${safe(key)}" data-val="${estNoTax}">
            <span class="lbl">Estimate (w/o tax):</span>
            <span class="val">${estNoTax ? money(estNoTax) : '-'}</span>
          </div>
          <div class="matrix-metric-item">
            <span class="lbl">Advance (w/o tax):</span>
            <input data-wip-adv="${safe(key)}" type="number" step="0.01" value="${adv || ''}" style="width:105px;padding:3px 7px;font-size:12px;font-weight:600;border:1px solid var(--border-color);border-radius:4px;background:var(--bg-surface);color:var(--text-primary);text-align:right;" placeholder="0.00">
          </div>
          <div class="matrix-metric-item">
            <span class="lbl">Prev. Cumulative:</span>
            <span class="val" data-wip-prev="${safe(key)}" data-val="${prevCum}">${prevCum ? money(prevCum) : 'Rs. 0.00'}</span>
          </div>
        </div>

        <!-- 3. MONTHLY PROGRESS INPUTS -->
        <div class="matrix-input-group">
          <label>
            <span style="color:#0284c7;font-weight:700;">Selected Month Progress (Rs.)</span>
            <input data-wip-wp="${safe(key)}" type="number" step="0.01" min="0" value="${w.financial || ''}" style="font-weight:700;color:#0284c7;font-size:14px;background:var(--primary-subtle);border-color:rgba(37,99,235,0.3);" placeholder="0.00" oninput="recalcProjectRow('${safe(key)}')">
          </label>
          <div style="display:flex;gap:8px;align-items:center;">
            <label style="flex:1;">
              <span>Physical WIP %</span>
              <input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${(w.physical * 100) || ''}" placeholder="0%" oninput="updateProgressBar('${safe(key)}')">
            </label>
            <div class="bar" style="height:8px;flex:1.2;margin-top:16px;">
              <span id="pbar_${safe(key)}" style="width:${pct(w.physical)}%;"></span>
            </div>
          </div>
        </div>

        <!-- 4. TOTAL CUMULATIVE & REMARKS -->
        <div class="matrix-total-block">
          <div class="matrix-total-badge">
            <div>
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--text-muted);">Total Cumulative</div>
              <div class="total-val" data-wip-total="${safe(key)}">${money(totCum)}</div>
            </div>
            <span class="badge in-progress" id="estBadge_${safe(key)}" style="font-size:11px;">${estPct}% of Est</span>
          </div>
          <input data-wip-r="${safe(key)}" value="${safe(w.remarks || '')}" placeholder="Monthly remarks, notes, claim status..." style="padding:6px 10px;font-size:12px;border:1px solid var(--border-color);border-radius:var(--radius-sm);background:var(--bg-surface);color:var(--text-primary);width:100%;">
        </div>
      </div>
    `;
  }).join("");

  // 2. Render Spreadsheet Table View
  $("wipTable").innerHTML = `
    <thead>
      <tr>
        <th style="min-width:110px;">No</th>
        <th style="min-width:220px;">Description</th>
        <th style="min-width:140px;">Client</th>
        <th>Estimate (Without Tax)</th>
        <th>Advance (Without Tax)</th>
        <th>Total Cumulative Up to Prev Year</th>
        <th style="color:#0284c7;min-width:140px;">Selected Month Progress (Rs.)</th>
        <th style="min-width:85px;">Physical WIP %</th>
        <th style="color:#10b981;min-width:140px;">Total Cumulative</th>
        <th style="min-width:140px;">Remarks</th>
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

        return `<tr>
          <td class="code"><b>${safe(code)}</b></td>
          <td style="font-size:12px;">${safe(p["Description"]) || safe(p["Client"])}</td>
          <td><b>${safe(p["Client"])}</b></td>
          <td>${estNoTax ? money(estNoTax) : '-'}</td>
          <td>
            <input data-wip-adv="${safe(key)}" type="number" step="0.01" value="${adv || ''}" style="width:115px;" placeholder="0.00">
          </td>
          <td>
            <span data-wip-prev="${safe(key)}" data-val="${prevCum}">${prevCum ? money(prevCum) : '-'}</span>
          </td>
          <td>
            <input data-wip-wp="${safe(key)}" type="number" step="0.01" min="0" value="${w.financial || ''}" style="width:130px;font-weight:700;color:#0284c7;" placeholder="0.00" oninput="recalcProjectRow('${safe(key)}')">
          </td>
          <td>
            <input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${(w.physical * 100) || ''}" style="width:75px;" placeholder="0%">
          </td>
          <td>
            <b data-wip-total="${safe(key)}" style="color:#10b981;display:inline-block;min-width:100px;">${money(totCum)}</b>
          </td>
          <td>
            <input data-wip-r="${safe(key)}" value="${safe(w.remarks || '')}" placeholder="Notes / claims..." style="width:100%;">
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
        <th>Estimate (LKR)</th>
        <th>Cumulative WIP (LKR)</th>
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
$("projectDialog").addEventListener("click", e => {
  const rect = $("projectDialog").getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) $("projectDialog").close();
});

$("ghDialog").addEventListener("click", e => {
  const rect = $("ghDialog").getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) $("ghDialog").close();
});

// GitHub Dialog Event Listeners
$("ghSettingsBtn").onclick = openGitHubDialog;
$("ghTestBtn").onclick = testGitHubConnection;
$("ghForm").addEventListener("submit", e => {
  e.preventDefault();
  const cfg = {
    token: $("ghToken").value.trim(),
    owner: $("ghOwner").value.trim(),
    repo: $("ghRepo").value.trim(),
    branch: $("ghBranch").value.trim() || "main",
    path: $("ghPath").value.trim() || "data/project-data.json"
  };
  saveGitHubConfig(cfg);
  $("ghDialog").close();
  showToast("GitHub sync settings saved successfully!");
});

$("matrixSearch")?.addEventListener("input", renderWip);
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
