import {
  AutocompleteInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import CustomClient from "../classes/CustomClient";
import { StaffLevel } from "../types/StaffLevels";

export default interface IInteraction {
  client: CustomClient;
  name: string;
  staffLevel?: StaffLevel;

  Execute(interaction: ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction): void;
  AutoComplete(interaction: AutocompleteInteraction): void;
}
