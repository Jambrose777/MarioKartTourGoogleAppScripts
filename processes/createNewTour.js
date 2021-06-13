// TODO

// generates a new sheet for a tour based on the previous tour
function generateNewSheet(sheetName) {
  // Default Input Parameters
  if(!sheetName) {
    sheetName = 'New Tour';
  }

  // Create New Tour
  newSheet = createNewTour(sheetName);
  
  // Setup new values in new tour
  setUpNewTourValues(newSheet);

  // Run Sort
  onEdit();

  // Add Row to Overview
  addCourseRowToOverview(sheetName, newSheet);
}

// Copys the previous tour and sets up a new sheet
function createNewTour(sheetName) {
  // Get Most Recent Tour
  spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  mostRecentSheet = getMostRecentTourSheet();

  // Copy most Recent tour to a new tour in the front of the spreadsheet
  newSheet = mostRecentSheet.copyTo(spreadSheet);
  spreadSheet.setActiveSheet(newSheet);
  spreadSheet.moveActiveSheet(NUMBER_OF_STATIC_SHEETS + 1);
  newSheet.setName(sheetName);

  return newSheet;
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