import ServerName from "../types/ServerName";

export default interface ICommandOptions {
  name: string;
  description: string;
  options: object;
  default_member_permission: bigint;
  cooldown: number;
  server: ServerName;
}
