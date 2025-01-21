import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";
import { CharacterModel } from "../../../base/models/Character";
import { StaffLevels } from "../../../base/types/StaffLevels";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "deny-character",
      staffLevel: StaffLevels.civ_trainee,
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId(`deny-character-submit`)
      .setTitle("Deny Character Approval");

    const txtInput = new TextInputBuilder()
      .setCustomId("reason")
      .setLabel("Reason:")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(txtInput);

    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);
  }
}
