CUP_VERSION_1 = {
  id: "1",
  description: "initial. Used for First few tours where number of courses was 54.",
  COURSES_DATA_RANGE = "A2:AR38",
  DATE_CELLS = [
    {date: "K58", value: "L58"},
    {date: "K59", value: "L59"},
    {date: "K60", value: "L60"},
    {date: "K61", value: "L61"},
    {date: "K62", value: "L62"},
    {date: "K63", value: "L63"},
    {date: "K64", value: "L44"},
    {date: "N58", value: "O58"},
    {date: "N59", value: "O59"},
    {date: "N60", value: "O60"},
    {date: "N61", value: "O61"},
    {date: "N62", value: "O62"},
    {date: "N63", value: "O63"},
    {date: "N64", value: "O64"},
  ],
  SORT_TYPE_CELL = "B64",
  TOTAL_POINTS_CELL = "D58",
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