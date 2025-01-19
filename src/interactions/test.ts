import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Interaction from "@/base/classes/Interaction";
import CustomClient from "@/base/classes/CustomClient";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "test",
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    console.log(interaction);
  }
}
