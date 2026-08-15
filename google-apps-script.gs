/**
 * NBRO Project Register - Google Apps Script backend starter
 *
 * Create a Google Sheet with these tabs:
 * PROJECTS
 * MONTHLY_WIP
 * FINANCIAL_TRANSACTIONS
 *
 * Deploy: Extensions > Apps Script > Deploy > New deployment >
 * Web app > Execute as Me > Who has access: appropriate organization setting.
 *
 * The frontend should POST JSON to the deployment URL.
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:"NBRO Project Register API"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || "{}");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = body.sheet;
    var row = body.row;

    if (!sheetName || !row) throw new Error("sheet and row are required");
    var sh = ss.getSheetByName(sheetName);
    if (!sh) throw new Error("Sheet not found: " + sheetName);

    // Simple append model for the prototype.
    sh.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
