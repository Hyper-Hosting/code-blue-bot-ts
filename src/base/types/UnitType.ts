import { UnitStatus } from "./UnitStatus";

export type UnitType = {
  _id: string;
  accountId: string;
  socketId: string;
  status: UnitStatus;
  name: string;
  department: "civ" | "police" | "sacd" | "safr";
  subdivision: string;
  rank: string;
  callsign: string;
  panicBtn: boolean;
  activeCall?: number;
};