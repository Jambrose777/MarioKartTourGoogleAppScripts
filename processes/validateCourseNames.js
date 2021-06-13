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
