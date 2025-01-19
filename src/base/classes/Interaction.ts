import {
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from "discord.js";
import CustomClient from "./CustomClient";
import IInteractionOptions from "../interfaces/IInteractionOptions";
import IInteraction from "../interfaces/IInteraction";

export default class Interaction implements IInteraction {
  client: CustomClient;
  name: string;

  constructor(client: CustomClient, options: IInteractionOptions) {
    this.client = client;
    this.name = options.name;
  }

  Execute(interaction: ChatInputCommandInteraction): void {}
  AutoComplete(interaction: AutocompleteInteraction): void {}
}
