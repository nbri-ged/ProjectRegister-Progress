
const fs = require('fs');

// Mock a lightweight browser DOM
const elements = {};
function createMockElement(id) {
  return {
    id,
    value: id === 'reportMonth' || id === 'wipMonth' ? '2026-06' : (id === 'dashYearSelect' ? '2026' : ''),
    innerHTML: '',
    textContent: '',
    style: {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {}
    },
    addEventListener: () => {},
    appendChild: () => {},
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 100, height: 100 }),
    getContext: () => ({})
  };
}

global.document = {
  getElementById: id => {
    if (!elements[id]) elements[id] = createMockElement(id);
    return elements[id];
  },
  querySelector: sel => createMockElement(sel),
  querySelectorAll: sel => [createMockElement(sel)],
  createElement: tag => createMockElement(tag),
  documentElement: {
    getAttribute: () => 'light',
    setAttribute: () => {}
  }
};
global.window = global;
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.Chart = function() {
  return { destroy: () => {} };
};

// Load app.js code
let appJs = fs.readFileSync('app.js', 'utf8');

// Replace fetch / apiGet with live data fixture
const liveData = JSON.parse(fs.readFileSync('test_live_data.json', 'utf8'));

// Run app.js
try {
  eval(appJs);
  console.log("app.js evaluated successfully without syntax error.");
  
  // Set state from liveData
  state.projects = liveData.projects || [];
  state.wip = liveData.wip || [];
  state.financeSummary = liveData.financeSummary || [];
  state.finance = liveData.finance || [];
  state.lookups = liveData.lookups || {};
  state.month = liveData.reportingMonth || '2026-06';
  
  deriveLookups();
  console.log("deriveLookups OK. Scientists found:", state.lookups.engineers);
  
  fillFilters();
  console.log("fillFilters OK.");
  
  renderAll();
  console.log("renderAll OK!");
  
  console.log("Sample matrixCardList length:", elements['matrixCardList']?.innerHTML?.length || 0);
  console.log("Sample projectTable length:", elements['projectTable']?.innerHTML?.length || 0);
  console.log("ALL FUNCTIONS EXECUTED WITH ZERO ERRORS!");
} catch (err) {
  console.error("CRASH DETECTED IN JAVASCRIPT:", err);
}
