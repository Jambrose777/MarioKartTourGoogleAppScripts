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
    for each (var cell in DATE_CELLS) {
      date = getValue(cell.date);
      value = getValue(cell.value);
      if(!value && date < today) {
        setValue(cell.value, getValue(TOTAL_POINTS_CELL));
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
    sort(getDKGRange('driver'), DRIVERS_SORT_ORDER); // Sort Drivers
    sort(getDKGRange('kart'), KARTS_SORT_ORDER); // Sort Karts
    sort(getDKGRange('glider'), GLIDERS_SORT_ORDER); // Sort Gliders
  }
}
