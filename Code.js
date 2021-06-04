CURRENT_TOUR_OVERRIDE = "";
NUMBER_OF_STATIC_SHEETS = 2;
NUMBER_OF_SCRIPTS = 4;

scriptProperties = PropertiesService.getScriptProperties();

// Overview constants
SCRIPTS = [
  {functionToRun: generateNewSheet, statusCell: "E3", param1Cell: "I3"},
  // {functionToRun: addDkgRows, statusCell: "E4"},
  {functionToRun: addAllTrackPointsRows, statusCell: "E5", param1Cell: "I5", param2Cell: "L5"},
  {functionToRun: validateCourseNames, statusCell: "E6", param1Cell: "I6"},
];

// All Track Point Ranges
ALL_TRACK_POINTS_SHEET_NAME = 'All Track Points 2';
ALL_TRACK_POINTS_SORT_RANGE = "P3:R";
ALL_TRACK_POINTS_SORT_ORDER = [
  {column: 18, ascending: false}, // Has Track [2, 1, 0]
  {column: 17, ascending: false}, // Tour Order
];

// Course List Ranges
LIST_OF_COURSES_SHEET_NAME = 'List of Courses';

// Course Ranges
COURSES_DATA_RANGE = "A2:AR38"; // V1 A2:AO38
DATE_CELLS = [
  {date: "K40", value: "L40"}, {date: "K41", value: "L41"}, {date: "K42", value: "L42"}, {date: "K43", value: "L43"},
  {date: "K44", value: "L44"}, {date: "K45", value: "L45"}, {date: "K46", value: "L46"}, {date: "N40", value: "O40"}, {date: "N41", value: "O41"}, {date: "N42", value: "O42"}, {date: "N43", value: "O43"},
  {date: "N44", value: "O44"}, {date: "N45", value: "O45"}, {date: "N46", value: "O46"},
];
SORT_TYPE_CELL = "B46";
TOTAL_POINTS_CELL = "D40";
COURSES_SORT_ATTEMPTS_ORDER = [
  {column: 17, ascending: true}, // atts order
];
COURSES_SORT_CHRONOLOGICAL_ORDER = [
  {column: 38, ascending: true}, // course order
];
COURSES_SORT_DELTA_ORDER = [
  {column: 41, ascending: false}, // delta to most points obtained on a course
  {column: 39, ascending: true}, // calculated value of min points on course
  {column: 9, ascending: true} // points of course
];
COURSES_SORT_DRIVER_LEVEL_ORDER = [
  {column: 25, ascending: true}, // Driver lvl order
  {column: 11, ascending: true}, // Frenzy order
  {column: 14, ascending: true}, // Box order
];
COURSES_SORT_FEELING_ORDER = [
  {column: 18, ascending: true}, // Feeling order
  {column: 11, ascending: true}, // Frenzy order
  {column: 14, ascending: true}, // Box order
];
COURSES_SORT_POINTS_ORDER = [
  {column: 39, ascending: true}, // calculated value of min points on course
  {column: 9, ascending: true} // points of course
];
COURSES_SORT_PPA_ORDER = [
  {column: 37, ascending: false}, // PpA order
];
COURSES_SORT_ACTIONS_PERCENT_ORDER = [
  {column: 44, ascending: true}, // PpA order
];
COURSES_SORT_MAP = [
  {sortType: 'Sort: Points', order: COURSES_SORT_POINTS_ORDER},
  {sortType: 'Sort: Atts', order: COURSES_SORT_ATTEMPTS_ORDER},
  {sortType: 'Sort: Driver Lvl', order: COURSES_SORT_DRIVER_LEVEL_ORDER},
  {sortType: 'Sort: Feeling', order: COURSES_SORT_FEELING_ORDER},
  {sortType: 'Sort: Delta', order: COURSES_SORT_DELTA_ORDER},
  {sortType: 'Sort: Chronological', order: COURSES_SORT_CHRONOLOGICAL_ORDER},
  {sortType: 'Sort: Actions Percent', order: COURSES_SORT_ACTIONS_PERCENT_ORDER }
];
VERSION = [{
  id: "1",
  description: "default",
  DRIVERS_SORT_ORDER: [
    {column: 13, ascending: false}, // CNT
    {column: 12, ascending: false}, // PpA
    {column: 8, ascending: true}, // RAR
    {column: 2, ascending: true} // Name
  ],
  KARTS_SORT_ORDER: [
    {column: 25, ascending: false}, // CNT
    {column: 24, ascending: false}, // PpA
    {column: 20, ascending: true}, // RAR
    {column: 16, ascending: true} // Name
  ],
  GLIDERS_SORT_ORDER: [
    {column: 37, ascending: false}, // CNT
    {column: 36, ascending: false}, // PpA
    {column: 32, ascending: true}, // RAR
    {column: 28, ascending: true} // Name
  ]
},{
  id: "1.1",
  description: "Added notes column to DKG section",
  DRIVERS_SORT_ORDER: [
    {column: 12, ascending: false}, // CNT
    {column: 11, ascending: false}, // PpA
    {column: 8, ascending: true}, // RAR
    {column: 2, ascending: true} // Name
  ],
  KARTS_SORT_ORDER: [
    {column: 24, ascending: false}, // CNT
    {column: 23, ascending: false}, // PpA
    {column: 20, ascending: true}, // RAR
    {column: 16, ascending: true} // Name
  ],
  GLIDERS_SORT_ORDER: [
    {column: 36, ascending: false}, // CNT
    {column: 35, ascending: false}, // PpA
    {column: 32, ascending: true}, // RAR
    {column: 28, ascending: true} // Name
  ]
}];

// Every function that should run on an edit
function onEdit(e) {
  checkProcesses();
  checkDate();
  checkSort();
}

// TODO
// Adds Space in All Track Points Sheet for a new tour and new Course
function addAllTrackPointsRows(tourName, newCourseName) {
  // Default Input Parameters
  if(!tourName) tourName = 'New Tour';
  if(!newCourseName) newCourseName = '';

  allTrackPontsSheet = getCurrentTourSheet(ALL_TRACK_POINTS_SHEET_NAME);
  courseListSheet = getCurrentTourSheet(LIST_OF_COURSES_SHEET_NAME);

  // reset sheet's order
  setValue("C1", "", ALL_TRACK_POINTS_SHEET_NAME);
  sort(ALL_TRACK_POINTS_SORT_RANGE, ALL_TRACK_POINTS_SORT_ORDER, ALL_TRACK_POINTS_SHEET_NAME)

  // Set up new rows for new tour
  for(i = 0; i < 5; i++) {
    allTrackPontsSheet.insertRowAfter(2);
  }
  allTrackPontsSheet.getRange("A8:R12").copyTo(allTrackPontsSheet.getRange("A3:R7"));
  setValue("P3", tourName, ALL_TRACK_POINTS_SHEET_NAME);
  for(i = 0; i < 5; i++) {
    setValue("Q" + (3+i), +getValue("Q" + (3+i), ALL_TRACK_POINTS_SHEET_NAME) + 1, ALL_TRACK_POINTS_SHEET_NAME);
  }

  // Set up new Course Name
  courseListSheet.insertRowBefore(3);
  setValue("A3", newCourseName, courseListSheet);
  allTrackPontsSheet.getRange("A3:Z").sort(1);
}

// Adds Row to Overview Sheet with a new sheet name
function addCourseRowToOverview(sheetName, newSheet) {
  overviewSheet = spreadSheet.getSheetByName("Overview");
  newRowNumber = 8 + NUMBER_OF_SCRIPTS;
  overviewSheet.insertRowBefore(newRowNumber);
  overviewSheet.getRange("B" + newRowNumber + ":D" + newRowNumber).merge(); // Merge Tour Name Cells
  overviewSheet.getRange("B" + newRowNumber) // Set Tour Name with link to new sheet
    .setRichTextValue(SpreadsheetApp.newRichTextValue()
      .setText(sheetName)
      .setLinkUrl('#gid=' + newSheet.getSheetId())
      .build()
    );
  // Copy the rest of the row
  overviewSheet
    .getRange("E" + (newRowNumber + 1) + ":Y" + (newRowNumber + 1))
    .copyTo(overviewSheet.getRange("E" + newRowNumber + ":Y" + newRowNumber));
}

// Adds rows to the bottom of every Tour sheet for new Drivers/Karts/Gliders
// function addDkgRows() {
//   scriptProperties.setProperty('dkg_end_row', 148);
//   currentEndRow = scriptProperties.getProperty('dkg_end_row');
//   console.log(currentEndRow)
//   tourSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
//   for each (var sheet in tourSheets) {
//     if(!sheet.isSheetHidden() && ["Overview", "All Track Points 2"].indexOf(sheet.getName()) === -1) {
//       // Add 10 new rows to end of sheet formatted
//       for(i = 0; i < 10; i++) {
//         newRow = +currentEndRow + i + 1;
//         sheet.insertRowAfter(newRow - 1);
//         sheet.getRange("B" + newRow + ":E" + newRow).merge(); // Merge Driver Name Cells
//         sheet.getRange("F" + newRow + ":G" + newRow).merge(); // Merge Driver Item Cells
//         sheet.getRange("H" + newRow + ":I" + newRow).merge(); // Merge Driver Rarity Cells
//         sheet.getRange("P" + newRow + ":S" + newRow).merge(); // Merge Kart Name Cells
//         sheet.getRange("T" + newRow + ":U" + newRow).merge(); // Merge Kart Rarity Cells
//         sheet.getRange("AB" + newRow + ":AE" + newRow).merge(); // Merge Glider Name Cells
//         sheet.getRange("AF" + newRow + ":AG" + newRow).merge(); // Merge Glider Rarity Cells

//         sheet.getRange("B" + newRow).setBorder(null, true, null, null, null, null); // Left Border Driver Name Cell
//         sheet.getRange("P" + newRow).setBorder(null, true, null, null, null, null); // Left Border Kart Name Cell
//         sheet.getRange("AB" + newRow).setBorder(null, true, null, null, null, null); // Left Border Glider Name Cell

//         sheet.getRange("M" + newRow).setBorder(null, null, null, true, null, null); // Right Border Driver Name Cell
//         sheet.getRange("Y" + newRow).setBorder(null, null, null, true, null, null); // Right Border Kart Name Cell
//         sheet.getRange("AK" + newRow).setBorder(null, null, null, true, null, null); // Right Border Glider Name Cell

//         sheet.getRange("L" + newRow).setValue("=K" + newRow + "*(J" + newRow + "-1)/100"); // Driver PPA Formula
//         sheet.getRange("X" + newRow).setValue("=W" + newRow + "*(V" + newRow + "-1)/100"); // Kart PPA Formula
//         sheet.getRange("AJ" + newRow).setValue("=AI" + newRow + "*(AH" + newRow + "-1)/100"); // Glider PPA Formula

//         sheet.getRange("M" + newRow).setValue("=IF(B" + newRow + " <> \"\", COUNTIF($V$2:$V$37, \"=\"&B" + newRow + "&\"\"), 0)"); // Driver Count Formula
//         sheet.getRange("Y" + newRow).setValue("=IF(P" + newRow + " <> \"\", COUNTIF($AA$2:$AA$37, \"=\"&P" + newRow + "&\"\"), 0)"); // Kart Count Formula
//         sheet.getRange("AK" + newRow).setValue("=IF(AB" + newRow + " <> \"\", COUNTIF($AF$2:$AF$37, \"=\"&AB" + newRow + "&\"\"), 0)"); // Glider Count Formula
//       }
//     }
//   }
//   scriptProperties.setProperty('dkg_end_row', +currentEndRow + 10);
// }

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
    version = getVersion();
    sort(getDKGRange('driver'), version.DRIVERS_SORT_ORDER); // Sort Drivers
    sort(getDKGRange('kart'), version.KARTS_SORT_ORDER); // Sort Karts
    sort(getDKGRange('glider'), version.GLIDERS_SORT_ORDER); // Sort Gliders
  }
}

// Copys the previous tour and sets up a new sheet
function createNewTour(sheetName) {
  // Get Most Recent Tour
  spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  mostRecentSheet = spreadSheet.getSheets()[NUMBER_OF_STATIC_SHEETS];

  // Copy most Recent tour to a new tour in the front of the spreadsheet
  newSheet = mostRecentSheet.copyTo(spreadSheet);
  spreadSheet.setActiveSheet(newSheet);
  spreadSheet.moveActiveSheet(NUMBER_OF_STATIC_SHEETS + 1);
  newSheet.setName(sheetName);

  return newSheet;
}

// generates a new sheet for a tour based on the previous tour
function generateNewSheet(sheetName) {
  // Default Input Parameters
  if(!sheetName) {
    sheetName = 'New Tour';
  }
  
  // Ensure Constants are not set
  if(CURRENT_TOUR_OVERRIDE) {
    throw new Error("CURRENT_TOUR_OVERRIDE needs to be set to blank. Current: " + CURRENT_TOUR_OVERRIDE);
  }

  // Create New Tour
  newSheet = createNewTour(sheetName);
  
  // Setup new values in new tour
  setUpNewTourValues(newSheet);

  // Run Sort
  onEdit();

  // Add Row to Overview
  addCourseRowToOverview(sheetName, newSheet)
}

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

// Gets version of the tour sheet
function getVersion() {
  versionNumber = getValue("AN68");
  if (!versionNumber) return VERSION[0];
  var version = null;
  for each (var v in VERSION) {
    if(v.id == versionNumber) version = v;
  }
  return version || VERSION[0];
}

// Checks if sorting is turned on for a sheet
function isSortOn() {
  const sortType = getValue(SORT_TYPE_CELL);
  return !(sortType === 'Sort: Off') 
}

// sets up values in a new tour sheet
function setUpNewTourValues(newSheet) {
  // Stats
  setValue("D42", "?");
  setValue("B46", "Sort: Chronological");

  setUpNewTourCoursesSection(newSheet);
  setUpNewTourDailyTotalsSection();
  setUpNewTourRankedSection();
  setUpNewTourPipePullsAndRewards(newSheet);
}

// sets up courses section (rows 3-38) of a new tour
function setUpNewTourCoursesSection(newSheet) {
  for (var row = 2; row <= 37; row++) {
    setValue("B" + row, ""); // Course Name
    setValue("F" + row, ""); // Cup Name
    setValue("I" + row, "0"); // Points
    setValue("K" + row, "0"); // Frenzies
    setValue("N" + row, "=IF(VLOOKUP(V" + row + ",B$48:F$126,5,false) = \"Coin Box\", 0, \"-\")"); // Boxes
    setValue("O" + row, "1"); // Position
    setValue("P" + row, ""); // Actions
    setValue("Q" + row, "0"); // Attempts
    setValue("R" + row, "1st Try"); // Feeling
    setValue("T" + row, row === 2 || row === 3 || row === 4 ? "Ranked 1" : (row === 8 || row === 9 || row === 10 ? "Ranked 2" : "")); // Notes
    setValue("V" + row, ""); // Driver
    setValue("Y" + row, "=VLOOKUP(V" + row + ",B$49:K$127,8,false)"); // Driver Lvl
    setValue("AA" + row, ""); // Kart
    setValue("AD" + row, "=VLOOKUP(AA" + row + ",P$49:W$127,6,false)"); // Kart Lvl
    setValue("AF" + row, ""); // Glider
    setValue("AI" + row, "=VLOOKUP(AF" + row + ",AB$49:AI$127,6,false)"); // Glider Lvl
  }
  // Background Colors
  newSheet.getRange("B2:U37").setBackground("white");
  newSheet.getRange("V2:AJ37").setBackground("#b6d7a8"); // green
}

// sets up Daily Totals section (K39:P46) of a new tour
function setUpNewTourDailyTotalsSection() {
  lastDate = new Date(getValue("N46"));
  newDate = new Date(lastDate);
  newDate.setDate(lastDate.getDate()+1);
  setValue("K40", newDate);
  for (var row = 40; row <= 46; row++) {
    setValue("L" + row, "");
    setValue("O" + row, "");
  }
}

// sets up Daily Totals section (I41:L47) of a new tour
function setUpNewTourRankedSection() {
  // Week 1
  setValue("R41", ""); // Cup
  setValue("S42", ""); // Tier
  setValue("S43", ""); // Points
  setValue("S44", ""); // Place
  setValue("R46", ""); // Change
  // Week 2
  setValue("T41", ""); // Cup
  setValue("U42", ""); // Tier
  setValue("U43", ""); // Points
  setValue("U44", ""); // Place
  setValue("T46", ""); // Change
}

// sets up Pipe Pulls and Rewards Section (N40:AC47) of a new tour
function setUpNewTourPipePullsAndRewards(newSheet) {
  setValue("AE39", "0"); // # of Pipe Pulls
  
  for (var row = 40; row <= 46; row++) {
    setValue("W" + row, "");
    setValue("Z" + row, "");
    setValue("AB" + row, "");
    setValue("AE" + row, "");
    setValue("AG" + row, "");
    setValue("AJ" + row, "");
    newSheet.getRange("W" + row + ":AJ" + row).setBackground("white");
  }
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

// Checks each course name on a tour and verifies it is correctly written as a valid course name
function validateCourseNames(tourName) {
  if(!tourName) throw Error("Tour Name Required")

  // Fetch All Course Names
  courseListSheet = getCurrentTourSheet(LIST_OF_COURSES_SHEET_NAME);
  allCoursesArr = courseListSheet.getRange("A3:A").getValues().join().split(',').filter(Boolean);
  
  // Check Each Course Name and ensure it is in the array
  tourSheet = getCurrentTourSheet(tourName);
  for(i = 2; i <= 37; i++) {
    courseName = getValue("B" + i, tourSheet.getSheetName());
    // strip variation from course name
    if([" T", " R"].indexOf(courseName.substring(courseName.length - 2, courseName.length)) + 1) {
      courseName = courseName.substring(0, courseName.length - 2);
    } else if(" R/T" == (courseName.substring(courseName.length - 4, courseName.length))) {
      courseName = courseName.substring(0, courseName.length - 4);
    } else if("R/T" == (courseName.substring(courseName.length - 3, courseName.length))) {
      courseName = courseName.substring(0, courseName.length - 3);
    } else if(["T", "R"].indexOf(courseName.substring(courseName.length - 1, courseName.length)) + 1) {
      courseName = courseName.substring(0, courseName.length - 1);
    }
    // check if course name is in list of all course names
    if(!(allCoursesArr.indexOf(courseName) + 1)) {
      throw Error("Could not find Course Name: " + courseName)
    }
  }
}
