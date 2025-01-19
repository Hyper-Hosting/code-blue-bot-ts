import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import CustomClient from "../classes/CustomClient";

export default interface IInteraction {
  client: CustomClient;
  name: string;

  Execute(interaction: ChatInputCommandInteraction): void;
  AutoComplete(interaction: AutocompleteInteraction): void;
}
