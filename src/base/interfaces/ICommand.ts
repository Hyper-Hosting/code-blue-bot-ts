import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import CustomClient from "../classes/CustomClient";
import ServerName from "../types/ServerName";

export default interface ICommand {
  client: CustomClient;
  name: string;
  description: string;
  options: object;
  default_member_permission: bigint;
  cooldown: number;
  server: ServerName;

  Execute(interaction: ChatInputCommandInteraction): void;
  AutoComplete(interaction: AutocompleteInteraction): void;
}
