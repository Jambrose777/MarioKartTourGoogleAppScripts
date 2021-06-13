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
