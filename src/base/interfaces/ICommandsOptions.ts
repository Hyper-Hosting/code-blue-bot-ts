import ServerName from "../types/ServerName";
import { StaffLevel } from "../types/StaffLevels";

export default interface ICommandOptions {
  name: string;
  description: string;
  options: object;
  staffLevel?: StaffLevel;
  default_member_permission: bigint;
  cooldown: number;
  server: ServerName;
}
