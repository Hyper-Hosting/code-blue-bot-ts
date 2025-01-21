import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "deny-loa-modal",
      staffLevel: StaffLevels.hod,
    });
  }

  Execute(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId(`deny-loa`)
      .setTitle("LOA Deny");

    const txtInput = new TextInputBuilder()
      .setCustomId("reason")
      .setLabel("Reason for denial")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(txtInput);

    modal.addComponents(firstActionRow);
    interaction.showModal(modal);
  }
}
