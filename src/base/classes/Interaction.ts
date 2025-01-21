import { AutocompleteInteraction, ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import CustomClient from "./CustomClient";
import IInteractionOptions from "../interfaces/IInteractionOptions";
import IInteraction from "../interfaces/IInteraction";
import { StaffLevel } from "../types/StaffLevels";

export default class Interaction implements IInteraction {
  client: CustomClient;
  name: string;
  staffLevel?: StaffLevel;

  constructor(client: CustomClient, options: IInteractionOptions) {
    this.client = client;
    this.name = options.name;
    this.staffLevel = options.staffLevel;
  }

  Execute(interaction: ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction): void {}
  AutoComplete(interaction: AutocompleteInteraction): void {}
}
