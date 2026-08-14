# NBRO Project Register & Financial Dashboard

GitHub Pages-ready prototype built from the supplied `Project Register.xlsx`.

## Included data

- 51 project records from **Project Registry**
- Working groups, engineers and status lookups
- Best-effort monthly WIP extraction from the **24-Month WIP Matrix**
- Reporting month initialized to **June 2026**, matching the workbook dashboard

## Run locally

Because the app loads JSON with `fetch()`, use a small local web server rather than opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `nbro-project-register`.
2. Upload all files in this folder.
3. In GitHub: **Settings → Pages → Deploy from branch → main / root**.
4. Open the generated GitHub Pages URL.

No build system is required.

## Current data-entry model

The first version is deliberately simple:

- Existing workbook data is loaded from `data/project-data.json`.
- New/edit project records are saved to browser `localStorage`.
- Monthly WIP entries are also saved locally.
- Export JSON provides a backup of the edited data.

This is useful as a working prototype, but **localStorage is not a multi-user database**.

## Recommended next step: Google Sheets backend

Connect the same screens to a Google Apps Script Web App:

```text
Web UI
  ↓
Google Apps Script Web App
  ↓
Google Sheets
  ├── PROJECTS
  ├── MONTHLY_WIP
  └── FINANCIAL_TRANSACTIONS
```

The supplied public Google Sheet can then remain the management-facing data source while users enter data through the web interface.

## Important

Do not expose sensitive financial information in a public GitHub repository. If this is deployed publicly, move the actual project/financial data behind authentication or keep the repository private.
