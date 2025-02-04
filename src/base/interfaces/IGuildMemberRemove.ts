import { GuildMember } from "discord.js";
import CustomClient from "../classes/CustomClient";
import ServerName from "../types/ServerName";

export default interface IGuildMemberRemove {
  client: CustomClient;
  server: ServerName;

  Execute(member: GuildMember): void;
  AutoComplete(member: GuildMember): void;
}
