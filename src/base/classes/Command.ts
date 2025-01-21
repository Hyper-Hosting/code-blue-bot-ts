import {
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from "discord.js";
import ICommand from "../interfaces/ICommand";
import CustomClient from "./CustomClient";
import ICommandOptions from "../interfaces/ICommandsOptions";
import ServerName from "../types/ServerName";
import { StaffLevel } from "../types/StaffLevels";

export default class Command implements ICommand {
  client: CustomClient;
  name: string;
  description: string;
  options: object;
  staffLevel?: StaffLevel;
  default_member_permission: bigint;
  cooldown: number;
  server: ServerName;

  constructor(client: CustomClient, options: ICommandOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.options = options.options;
    this.staffLevel = options.staffLevel;
    this.default_member_permission = options.default_member_permission;
    this.cooldown = options.cooldown;
    this.server = options.server;
  }

  Execute(interaction: ChatInputCommandInteraction): void {}
  AutoComplete(interaction: AutocompleteInteraction): void {}
}
