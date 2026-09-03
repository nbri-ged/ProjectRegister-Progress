# NBRO Project Register ? Version History & Changelog

This document tracks all version updates, bug fixes, data schema adjustments, and rollback checkpoints for the NBRO Geotechnical Engineering Division Project Register system.

For full technical architecture and feature documentation, refer to **[SYSTEM_DOCUMENTATION.md](file:///h:/Antigravity/ProjectRegister/SYSTEM_DOCUMENTATION.md)**.

---

## ?? Active Version: `v9.2.0` (SUBCONTRACTOR DIRECT PAYMENTS & OPERATING DEFICIT ENGINE)

---

## ?? Stable Backups Available
- **`NBRO_ProjectRegister_v9.2.0_STABLE.zip`**
- **`NBRO_ProjectRegister_v9.1.0_STABLE.zip`**
- **`NBRO_ProjectRegister_v9.0.0_STABLE.zip`**
- **`NBRO_ProjectRegister_v8.9.0_STABLE.zip`**

---

## ?? Version History & Rollback Checkpoints

### `[v9.2.0]` ? 2026-09-02 (Current Active - Subcontractor Payments & Accounting Polish)
- **Status**: Complete & Verified in Headless Chrome.
- **Subcontractor Payment & Division Financial Summary**:
  - **Subcontractor Direct Payment Input (`#summarySubcontract`)**: Added explicit input field for direct outsourced investigation/drilling costs in the Monthly WIP top panel.
  - **Division Net Operating Expenditure Display (`#summaryDivExpDisplay`)**: Automatically computes and displays `Division Net Exp = Total Expenditure - Subcontractor Payment`.
  - **Professional Accounting Terminology & Deficit Handling**:
    - Replaced raw negative "loss" wording with professional `Net Operating Deficit` / `Net Profit / (Deficit)`.
    - Dynamic color coding: green badge for positive profit margin, soft rose badge e.g. `(XX.X% Operating Deficit)` for negative margins.
  - **A3 Landscape PDF Report Integration**:
    - The official summary box in the A3 PDF displays `Total Expenditure`, `Subcontract Payment`, `Division Expenditure`, `Money Received`, `Outstanding`, `Interdivisional`, `Working Progress`, `Income`, `Project Income`, and `Net Profit / (Deficit)`.
    - Dynamic performance margin badge switches between `% Margin` and `(% Deficit)`.
  - **Database Sync**: Includes `subcontractPayment` and `divisionExpenditure` in both manual and auto-cascading `saveFinanceSummary` background synchronization payloads.
- **Key Modules**:
  - `app.js` (Cache version `v9.2.0`)
  - `index.html` (`styles.css?v=9.2.0`, `app.js?v=9.2.0`)
  - `SYSTEM_DOCUMENTATION.md`
  - `CHANGELOG.md`

---

### `[v9.1.0]` ? 2026-09-02
- System Admin Diagnostic Simulation & Role Impersonation Mode (`?? View As...` and `??? Test As`).

---

### `[v9.0.0]` ? 2026-09-02
- Institutional Month Locking & Approvals Engine (`?? Open` vs `?? Locked`).

---

### `[v8.9.0]` ? 2026-09-01
- Enterprise professional labels and auto-cascading division financial summary sync.

---

### `[v8.8.0]` ? 2026-09-01
- Modernized executive styling and layout for A3 Landscape Progress Report export.

---

## ?? How to Roll Back
To roll back to any historical version:
1. Check the version tag in this document.
2. Ensure `CACHE_VERSION` in `app.js` matches the tag.
3. Update `<link>` and `<script>` cache-busting query strings in `index.html`.
4. Hard reload browser with `Ctrl + Shift + R` (or `Ctrl + F5`).
