import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "close-ui",
      staffLevel: StaffLevels.depStaff,
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const userId = (interaction.channel as TextChannel).topic;

    if (interaction.user.id === userId) {
      return interaction.reply({
        content: `Do not attempt to close your own UI!`,
      });
    }

    const modal = new ModalBuilder()
      .setCustomId(`close-ui-submit`)
      .setTitle("Close UI");

    const txtInput = new TextInputBuilder()
      .setCustomId("comment")
      .setLabel("UI Comments")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(txtInput);

    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);
  }
}
