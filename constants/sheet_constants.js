NUMBER_OF_STATIC_SHEETS = 2;
NUMBER_OF_SCRIPTS = 4; // On Overview tab

// Overview page constants
SCRIPTS = [
  {functionToRun: generateNewSheet, statusCell: "E3", param1Cell: "I3"},
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
