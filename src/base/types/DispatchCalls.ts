import { IUser } from "../models/User";
import { CallNoteType } from "./CallNoteType";

export type DispatchCalls = {
  id: number;
  callOrigin: string;
  callStatus: string;
  priority: string;
  address: string;
  postal: string;
  code: string;
  callTitle: string;
  callDesc: string;
  units: (IUser & {
    socketId: string;
  })[];
  notes: CallNoteType[];
};
