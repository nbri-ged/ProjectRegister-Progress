# NBRI • Geotechnical Engineering Division (GED)
## Project Registry & Progress Dashboard

An executive-grade, real-time Project Registry and Monthly Financial Management system for the **National Building Research Institute (NBRI) — Geotechnical Engineering Division**.

---

## 🚀 Key Features

1. **Executive Dashboard**:
   - Live 6-indicator financial performance cards:
     1. Money Received (Rs.)
     2. Outstanding (Rs.)
     3. Interdivisional (Rs.)
     4. Working Progress (Rs.)
     5. Income (Rs.)
     6. Profit & Margin (Rs. & %) — **< 5% highlighted in bold RED**
   - Multi-month progress vs. expenditure and profit trend comparison bars.
2. **Zero-Horizontal-Scroll Project Progress Matrix**:
   - Modern, responsive card layout matching NBRI's exact spreadsheet register:
     - No | Description | Client | Estimate (w/o tax) | Advance received | Prev. Cumulative | Monthly Progress (Rs.) | Physical WIP % | Total Cumulative
   - Instant fuzzy search across projects.
   - Live cascading totals to the Division Financial Summary.
3. **Dual-Sync Database Pipeline (GitHub + Google Sheets)**:
   - **Step 1**: Directly commits updated database JSON to data/project-data.json on your GitHub repository.
   - **Step 2**: Simultaneously synchronizes records with live Google Sheets via Google Apps Script.
4. **Interactive Kanban & Table Views**:
   - Drag-and-drop project lifecycle columns (In Progress, Pending, On Hold, Completed).
   - In-line status dropdown editing.
5. **Command Palette (Ctrl + K) & Dark / Light Theme Engine**.

---

## 💻 How to Run Locally

`ash
python -m http.server 8000
`
Open http://localhost:8000 in your web browser.

---

## 🌐 Deploy to GitHub Pages

1. Upload all repository files to GitHub (e.g. https://github.com/<your-user>/ProjectRegister).
2. In GitHub repository settings: **Settings → Pages → Source: Deploy from a branch (main / root)**.
3. Your live application will be instantly accessible at https://<your-user>.github.io/ProjectRegister/.

---

## ⚙️ Direct GitHub Database Setup

1. In the topbar, click **⚙️ GitHub Sync**.
2. Enter:
   - **GitHub Personal Access Token (PAT)** (Fine-Grained or Classic with 
epo:write permission).
   - **Repository Owner** & **Repository Name** (ProjectRegister).
   - **Branch** (main).
3. Click **🧪 Test Connection**, then **Save GitHub Settings**.
4. All future edits will automatically commit to GitHub first, then sync with Google Sheets!
