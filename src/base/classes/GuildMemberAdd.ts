import { GuildMember } from "discord.js";
import CustomClient from "./CustomClient";
import ServerName from "../types/ServerName";
import IGuildMemberAdd from "../interfaces/IGuildMemberAdd";
import IGuildMemberAddOptions from "../interfaces/IGuildMemberAddOptions";

export default class GuildMemberAdd implements IGuildMemberAdd {
  client: CustomClient;
  server: ServerName;

  constructor(client: CustomClient, options: IGuildMemberAddOptions) {
    this.client = client;
    this.server = options.server;
  }

  Execute(member: GuildMember): void {}
  AutoComplete(member: GuildMember): void {}
}
