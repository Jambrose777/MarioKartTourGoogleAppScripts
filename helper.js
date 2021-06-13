// get's current tour sheet. If a specific sheet is specified, use that, or if an override is specified.
function getCurrentTourSheet(sheet) {
  if(sheet) {
    return SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(sheet); // sheet specified
  } else if(CURRENT_TOUR_OVERRIDE) {
    return SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(CURRENT_TOUR_OVERRIDE); // sheet from constant at top
  } else {
    // return most recent tour
    return SpreadsheetApp.getActiveSpreadsheet()
      .getSheets()[NUMBER_OF_STATIC_SHEETS] // sheet for more recent tour should be after static sheets
  }
}

// decodes the sort type to a specified sort order
function getCourseSortOrder() {
  const sortType = getValue(SORT_TYPE_CELL);
  for each (var map in COURSES_SORT_MAP) {
    if(map.sortType === sortType) {
      return map.order;
    }
  }
  return COURSES_SORT_CHRONOLOGICAL_ORDER;
}

// gets the data range for Driver, Kart, or Glider Section
// type should be 'driver' | 'kart' | 'glider'
function getDKGRange(type) {
  if (type == 'driver') {
    startCol = "B";
    endCol = "M";
  } else if (type == 'kart') {
    startCol = "P";
    endCol = "Y";
  } else if (type == 'glider') {
    startCol = "AB";
    endCol = "AK";
  } else {
    throw Error("Bad Type for getDKGRange, ", type)
  }
  const startRow = getValue("AN66");
  const endRow = getValue("AN67");

  return startCol + startRow + ":" + endCol + endRow;
}

// Gets Value from a specific cell
function getValue(cell, sheet) {
  return getCurrentTourSheet(sheet)
    .getRange(cell) // cell
    .getValue() // value
}

// Checks if sorting is turned on for a sheet
function isSortOn() {
  const sortType = getValue(SORT_TYPE_CELL);
  return !(sortType === 'Sort: Off') 
}

// Sets Value of a specific cell
function setValue(cell, value, sheet) {
  getCurrentTourSheet(sheet)
    .getRange(cell) // cell
    .setValue(value) // value
}

// sorts a data range
function sort(data_range, sort_order, sheet) {
  getCurrentTourSheet(sheet)
    .getRange(data_range)
    .sort(sort_order);
}
