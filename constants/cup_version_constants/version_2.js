CUP_VERSION_2 = {
  id: "2",
  description: "Number of Courses changed from 54 to 36.",
  COURSES_DATA_RANGE = "A2:AN38",
  DATE_CELLS = [
    {date: "K40", value: "L40"},
    {date: "K41", value: "L41"},
    {date: "K42", value: "L42"},
    {date: "K43", value: "L43"},
    {date: "K44", value: "L44"},
    {date: "K45", value: "L45"},
    {date: "K46", value: "L46"},
    {date: "N40", value: "O40"},
    {date: "N41", value: "O41"},
    {date: "N42", value: "O42"},
    {date: "N43", value: "O43"},
    {date: "N44", value: "O44"},
    {date: "N45", value: "O45"},
    {date: "N46", value: "O46"},
  ],
  SORT_TYPE_CELL = "B46",
  TOTAL_POINTS_CELL = "D40",
  COURSES_SORT_ATTEMPTS_ORDER = [
    {column: 17, ascending: true}, // atts order
  ],
  COURSES_SORT_CHRONOLOGICAL_ORDER = [
    {column: 38, ascending: true}, // course order
  ],
  COURSES_SORT_DELTA_ORDER = [
    {column: 41, ascending: false}, // delta to most points obtained on a course
    {column: 39, ascending: true}, // calculated value of min points on course
    {column: 9, ascending: true} // points of course
  ],
  COURSES_SORT_DRIVER_LEVEL_ORDER = [
    {column: 25, ascending: true}, // Driver lvl order
    {column: 11, ascending: true}, // Frenzy order
    {column: 14, ascending: true}, // Box order
  ],
  COURSES_SORT_FEELING_ORDER = [
    {column: 18, ascending: true}, // Feeling order
    {column: 11, ascending: true}, // Frenzy order
    {column: 14, ascending: true}, // Box order
  ],
  COURSES_SORT_POINTS_ORDER = [
    {column: 39, ascending: true}, // calculated value of min points on course
    {column: 9, ascending: true} // points of course
  ],
  COURSES_SORT_MAP = [
    {sortType: 'Sort: Points', order: COURSES_SORT_POINTS_ORDER},
    {sortType: 'Sort: Atts', order: COURSES_SORT_ATTEMPTS_ORDER},
    {sortType: 'Sort: Driver Lvl', order: COURSES_SORT_DRIVER_LEVEL_ORDER},
    {sortType: 'Sort: Feeling', order: COURSES_SORT_FEELING_ORDER},
    {sortType: 'Sort: Delta', order: COURSES_SORT_DELTA_ORDER},
    {sortType: 'Sort: Chronological', order: COURSES_SORT_CHRONOLOGICAL_ORDER},
  ],
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
}