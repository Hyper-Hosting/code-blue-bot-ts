import { GuildMember, PartialGuildMember } from "discord.js";
import CustomClient from "./CustomClient";
import ServerName from "../types/ServerName";
import IGuildMemberRemove from "../interfaces/IGuildMemberRemove";
import IGuildMemberRemoveOptions from "../interfaces/IGuildMemberRemoveOptions";

export default class GuildMemberRemove implements IGuildMemberRemove {
  client: CustomClient;
  server: ServerName;

  constructor(client: CustomClient, options: IGuildMemberRemoveOptions) {
    this.client = client;
    this.server = options.server;
  }

  Execute(member: GuildMember | PartialGuildMember): void {}
  AutoComplete(member: GuildMember | PartialGuildMember): void {}
}
