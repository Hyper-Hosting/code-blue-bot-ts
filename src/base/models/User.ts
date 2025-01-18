import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  clerkUserId: string;
  discordUserId: string;
  bank: number;
  cash: number;
  gamertag: string;
  firstName: string;
  lastInitial: string;
  interviewApplicationComplete: boolean;
  interviewApplicationCode: number;
  applicationBanEnd: Date | null;
  applicationBanReason: string | null;
  joinedMainServer: boolean;
  joinedCivServer: boolean;
  doneCivExam: boolean;
  joinedBusinessServer: boolean;
  joinedPoliceAcademyServer: boolean;
  academyEntryExamDone: boolean;
  joinedSacdServer: boolean;
  joinedSafrServer: boolean;
  joinedSafrAcademyServer: boolean;
  mainDepartment: "civ" | "police" | "sacd" | "safr";
  activeDepartment: "civ" | "sahp" | "lscso" | "police" | "sacd" | "safr";
  civ: {
    joined?: boolean;
    reserve?: boolean;
    characterLimit?: number;
    callsign?: string;
    rank?: string;
    staffLevel?: number;
  };
  sacd: {
    joined?: boolean;
    reserve?: boolean;
    callsign?: string;
    rank?: string;
    staffLevel?: number;
  };
  safr: {
    joined?: boolean;
    reserve?: boolean;
    callsign?: string;
    rank?: string;
    staffLevel?: number;
  };
  police: {
    joined?: boolean;
    reserve?: boolean;
    callsign?: string;
    rank?: string;
    staffLevel?: number;
    policeType?: "sahp" | "lscso";
  };
}

const schema = new Schema<IUser>({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  discordUserId: {
    type: String,
    required: true,
    unique: true,
  },
  bank: {
    type: Number,
    default: 10000,
    required: true,
  },
  cash: {
    type: Number,
    default: 0,
    required: true,
  },
  gamertag: {
    type: String,
    default: "Not Set",
  },
  firstName: {
    type: String,
  },
  lastInitial: {
    type: String,
  },
  interviewApplicationComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  interviewApplicationCode: {
    type: Number,
  },
  applicationBanEnd: {
    type: Date,
  },
  applicationBanReason: {
    type: String,
  },
  joinedMainServer: {
    type: Boolean,
    default: false,
  },
  joinedCivServer: {
    type: Boolean,
    default: false,
  },
  doneCivExam: {
    type: Boolean,
    default: false,
  },
  joinedBusinessServer: {
    type: Boolean,
    default: false,
  },
  joinedPoliceAcademyServer: {
    type: Boolean,
    default: false,
  },
  academyEntryExamDone: {
    type: Boolean,
    default: false,
  },
  joinedSacdServer: {
    type: Boolean,
    default: false,
  },
  joinedSafrServer: {
    type: Boolean,
    default: false,
  },
  joinedSafrAcademyServer: {
    type: Boolean,
    default: false,
  },
  mainDepartment: {
    type: String,
    enum: ["civ", "police", "sacd", "safr"],
  },
  activeDepartment: {
    type: String,
    enum: ["civ", "sahp", "lscso", "police", "sacd", "safr"],
  },
  civ: {
    joined: {
      type: Boolean,
      default: false,
      required: true,
    },
    reserve: {
      type: Boolean,
      default: false,
      required: true,
    },
    characterLimit: {
      type: Number,
      default: 2,
      required: true,
    },
    callsign: String,
    rank: String,
    staffLevel: {
      type: Number,
      default: 99, // 99 = Regular | Level 1 = Network Management | 2 = HOD | 3 = Command | 4 = Staff | 5 = Trainee
      required: true,
    },
  },
  sacd: {
    joined: {
      type: Boolean,
      default: false,
      required: true,
    },
    reserve: {
      type: Boolean,
      default: false,
      required: true,
    },
    callsign: String,
    rank: String,
    staffLevel: {
      type: Number,
      default: 99, // 99 = Regular | Level 1 = Network Management | 2 = HOD | 3 = Command | 4 = Staff | 5 = Trainee
      required: true,
    },
  },
  safr: {
    joined: {
      type: Boolean,
      default: false,
      required: true,
    },
    reserve: {
      type: Boolean,
      default: false,
      required: true,
    },
    callsign: String,
    rank: String,
    staffLevel: {
      type: Number,
      default: 99, // 99 = Regular | Level 1 = Network Management | 2 = HOD | 3 = Command | 4 = Staff | 5 = Trainee
      required: true,
    },
  },
  police: {
    joined: {
      type: Boolean,
      default: false,
      required: true,
    },
    reserve: {
      type: Boolean,
      default: false,
      required: true,
    },
    callsign: String,
    rank: String,
    staffLevel: {
      type: Number,
      default: 99, // 99 = Regular | Level 1 = Network Management | 2 = HOD | 3 = Command | 4 = Staff | 5 = Trainee
      required: true,
    },
    policeType: {
      type: String,
      enum: ["sahp", "lscso"],
    },
  },
});

export const UsersModel: Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", schema);
