export const StaffLevels = {
  bod: {
    department: "civ",
    level: 1,
  },
  hod: {
    department: null,
    level: 2,
  },
  commander: {
    department: null,
    level: 3,
  },
  depStaff: {
    department: null,
    level: 4,
  },
  trainee: {
    department: null,
    level: 5,
  },
  civ_hod: {
    department: "civ",
    level: 2,
  },
  civ_commander: {
    department: "civ",
    level: 3,
  },
  civ_dep: {
    department: "civ",
    level: 4,
  },
  civ_trainee: {
    department: "civ",
    level: 5,
  },
  police_hod: {
    department: "police",
    level: 2,
  },
  police_commander: {
    department: "police",
    level: 3,
  },
  police_dep: {
    department: "police",
    level: 4,
  },
  police_trainee: {
    department: "police",
    level: 5,
  },
  sacd_hod: {
    department: "sacd",
    level: 2,
  },
  sacd_commander: {
    department: "sacd",
    level: 3,
  },
  sacd_dep: {
    department: "sacd",
    level: 4,
  },
  sacd_trainee: {
    department: "sacd",
    level: 5,
  },
  safr_hod: {
    department: "safr",
    level: 2,
  },
  safr_commander: {
    department: "safr",
    level: 3,
  },
  safr_dep: {
    department: "safr",
    level: 4,
  },
  safr_trainee: {
    department: "safr",
    level: 5,
  },
} as const;

export type StaffLevel = (typeof StaffLevels)[keyof typeof StaffLevels];
