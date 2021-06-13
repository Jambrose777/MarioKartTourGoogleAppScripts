
// Every function that should run on an edit
function onEdit(e) {
  checkProcesses();
  checkDate();
  checkSort();
}

// Checks the current date compared to each of the dates on the current tour
// If the date has surpassed any of them it will fill its value with the total score
function checkDate() {
  today = new Date(new Date().setHours(0,0,0,0));
  // compare today's date with the last time the date was checked
  if(today > new Date(scriptProperties.getProperty('date_last_checked'))) { 
    scriptProperties.setProperty('date_last_checked', today);
    for each (var cell in getDataFromVersion(DATE_CELLS)) {
      date = getValue(cell.date);
      value = getValue(cell.value);
      if(!value && date < today) {
        setValue(cell.value, getValue(getDataFromVersion(TOTAL_POINTS_CELL)));
      }
    }
  }
}

// Checks each Script and runs it if needed
function checkProcesses() {
  for each (var script in SCRIPTS) {
    if(getValue(script.statusCell, "Overview") === "Start") {
      setValue(script.statusCell, "Processing", "Overview");
      try {
        var param1, param2;
        if(script.param1Cell) {
          param1 = getValue(script.param1Cell, "Overview");
        }
        if(script.param2Cell) {
          param2 = getValue(script.param2Cell, "Overview");
        }
        script.functionToRun(param1, param2);
        setValue(script.statusCell, "Done", "Overview");
      } catch (e) {
        setValue(script.statusCell, e, "Overview");
      }
    }
  }
}

// Checks whether to preform any sorting on a page
function checkSort() {
  if(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getSheetName() == ALL_TRACK_POINTS_SHEET_NAME) {
    sort(ALL_TRACK_POINTS_SORT_RANGE, ALL_TRACK_POINTS_SORT_ORDER, ALL_TRACK_POINTS_SHEET_NAME);
  } else if(isSortOn()) {
    sort(COURSES_DATA_RANGE, getCourseSortOrder()); // Sort Courses
    version = getVersion();
    sort(getDKGRange('driver'), version.DRIVERS_SORT_ORDER); // Sort Drivers
    sort(getDKGRange('kart'), version.KARTS_SORT_ORDER); // Sort Karts
    sort(getDKGRange('glider'), version.GLIDERS_SORT_ORDER); // Sort Gliders
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

// Checks if sorting is turned on for a sheet
function isSortOn() {
  const sortType = getValue(SORT_TYPE_CELL);
  return !(sortType === 'Sort: Off') 
}
