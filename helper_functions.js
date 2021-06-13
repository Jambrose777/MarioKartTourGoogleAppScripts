// get's sheet by name or returns the active spreadsheet
function getSheet(sheet) {
  if (sheet) {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
  } else {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSpreadsheet();
  }
}

function getMostRecentTourSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[NUMBER_OF_STATIC_SHEETS];
}

// Gets Value from a specific cell
function getValue(cell, sheet) {
  return getSheet(sheet).getRange(cell).getValue();
}

// returns whether or not the sheet is a tour sheet or not
function isTourSheet(sheet) {
  return getValue("A1", sheet).toString().substring(0, 14) === "Tour Sheet - V";
}

// Sets Value of a specific cell
function setValue(cell, value, sheet) {
  getSheet(sheet).getRange(cell).setValue(value);
}

// sorts a data range
function sort(data_range, sort_order, sheet) {
  getSheet(sheet).getRange(data_range).sort(sort_order);
}