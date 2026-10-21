/* ============================================================
   PGGC DATA — Post-Graduate General Championship
   17 Departments of IIT Bombay (Strict Alphabetical Order)
   Blank baseline data awaiting official tournament fixtures & points
============================================================ */

export const DEPARTMENTS = [
  {
    id: "aero",
    fullName: "Aerospace Engineering",
    shortCode: "AERO",
    category: "Engineering & Technology Departments",
    description: "Focuses on aerodynamics, propulsion, aerospace structures, and control systems.",
    accentColor: "#38bdf8",
  },
  {
    id: "bsbe",
    fullName: "Biosciences and Bioengineering",
    shortCode: "BSBE",
    category: "Engineering & Technology Departments",
    description: "Covers biomedical engineering, cellular and molecular biology, and biophysics.",
    accentColor: "#34d399",
  },
  {
    id: "che",
    fullName: "Chemical Engineering",
    shortCode: "CHE",
    category: "Engineering & Technology Departments",
    description: "Specializes in reaction engineering, process systems, and biological systems.",
    accentColor: "#f59e0b",
  },
  {
    id: "chem",
    fullName: "Chemistry",
    shortCode: "CHEM",
    category: "Science Departments",
    description: "Offers advanced organic, inorganic, physical, and analytical chemistry.",
    accentColor: "#a855f7",
  },
  {
    id: "civil",
    fullName: "Civil Engineering",
    shortCode: "CIVIL",
    category: "Engineering & Technology Departments",
    description: "One of the founding departments, offering structural, geotechnical, water resources, and transportation engineering.",
    accentColor: "#fb923c",
  },
  {
    id: "cse",
    fullName: "Computer Science and Engineering",
    shortCode: "CSE",
    category: "Engineering & Technology Departments",
    description: "Focuses on algorithms, artificial intelligence, machine learning, and computer networks.",
    accentColor: "#60a5fa",
  },
  {
    id: "earth",
    fullName: "Earth Sciences",
    shortCode: "EARTH",
    category: "Science Departments",
    description: "Specializes in applied geology, geophysics, and petroleum geoscience.",
    accentColor: "#10b981",
  },
  {
    id: "ee",
    fullName: "Electrical Engineering",
    shortCode: "EE",
    category: "Engineering & Technology Departments",
    description: "Offers specializations like communication engineering, control systems, power electronics, and microelectronics.",
    accentColor: "#eab308",
  },
  {
    id: "ese",
    fullName: "Energy Science and Engineering",
    shortCode: "ESE",
    category: "Humanities, Management & Design Units",
    description: "Focuses on renewable energy systems, energy storage, and sustainability.",
    accentColor: "#22c55e",
  },
  {
    id: "envr",
    fullName: "Environmental Science and Engineering",
    shortCode: "CESE",
    category: "Humanities, Management & Design Units",
    description: "Covers pollution control, environmental impact, and waste management technologies.",
    accentColor: "#14b8a6",
  },
  {
    id: "hss",
    fullName: "Humanities and Social Sciences",
    shortCode: "HSS",
    category: "Humanities, Management & Design Units",
    description: "Offers postgraduate and research degrees in economics, philosophy, psychology, sociology, and English literature.",
    accentColor: "#f472b6",
  },
  {
    id: "math",
    fullName: "Mathematics",
    shortCode: "MATH",
    category: "Science Departments",
    description: "Covers pure and applied mathematics, statistics, and computing.",
    accentColor: "#818cf8",
  },
  {
    id: "mech",
    fullName: "Mechanical Engineering",
    shortCode: "MECH",
    category: "Engineering & Technology Departments",
    description: "Covers thermal, design, manufacturing, and automation engineering.",
    accentColor: "#ef4444",
  },
  {
    id: "mems",
    fullName: "Metallurgical Engineering and Materials Science",
    shortCode: "MEMS",
    category: "Engineering & Technology Departments",
    description: "Focuses on metallic materials, ceramics, polymers, and electronic materials.",
    accentColor: "#94a3b8",
  },
  {
    id: "phys",
    fullName: "Physics",
    shortCode: "PHYS",
    category: "Science Departments",
    description: "Focuses on condensed matter physics, high-energy physics, astrophysics, and laser optics.",
    accentColor: "#06b6d4",
  },
  {
    id: "idc",
    fullName: "School of Design (IDC)",
    shortCode: "IDC",
    category: "Humanities, Management & Design Units",
    description: "Offers design programs in industrial design, visual communication, animation, and interaction design.",
    accentColor: "#ec4899",
  },
  {
    id: "sjsmom",
    fullName: "Shailesh J. Mehta School of Management (SJSMoM)",
    shortCode: "SJSMOM",
    category: "Humanities, Management & Design Units",
    description: "Provides management education, MBA programs, and doctoral research.",
    accentColor: "#c084fc",
  },
];

// Helper lookup
export const DEPT_BY_NAME = DEPARTMENTS.reduce((acc, d) => {
  acc[d.fullName] = d;
  return acc;
}, {});

export function getDeptInitials(name) {
  if (DEPT_BY_NAME[name]) return DEPT_BY_NAME[name].shortCode;
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase();
}

/* ============================================================
   DEFAULT STANDINGS DATA — 17 Departments in Alphabetical Order
   (Points and medals left blank awaiting official scores)
============================================================ */
const createBlankRoster = () =>
  DEPARTMENTS.map((dept) => ({
    name: dept.fullName,
    points: null,
    gold: null,
    silver: null,
    bronze: null,
  }));

export const DEFAULT_STANDINGS = {
  overall: createBlankRoster(),
  boys: createBlankRoster(),
  girls: createBlankRoster(),
};

/* ============================================================
   DEFAULT SPORTS LIST
   Disciplines defined, standings empty awaiting tournament scores
============================================================ */
export const DEFAULT_SPORTS_DATA = {
  Cricket: [],
  Football: [],
  Badminton: [],
  Basketball: [],
  TableTennis: [],
  Volleyball: [],
  Chess: [],
  Athletics: [],
  Squash: [],
  LawnTennis: [],
  Weightlifting: [],
  TugOfWar: [],
  Carrom: [],
  Aquatics: [],
};

/* ============================================================
   DEFAULT MATCHES — Empty awaiting tournament fixtures
============================================================ */
export const DEFAULT_MATCHES = {};
