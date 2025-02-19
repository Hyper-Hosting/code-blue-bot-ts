import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "pbt_result",
    });
  }

  Execute(interaction: ButtonInteraction) {
    const userId = interaction.message.content.split("asks <@")[1].split(">")[0];
    
    if (!userId)
      return interaction.reply({
        content: "User not found",
        flags: "Ephemeral",
      });

    if (userId !== interaction.user.id) {
      return interaction.reply({
        content: "You are not the user that is getting breathalized",
        flags: "Ephemeral",
      });
    }

    const modal = new ModalBuilder()
      .setCustomId(`pbt_modal`)
      .setTitle("Alcohol Level");

    const txtInput = new TextInputBuilder()
      .setCustomId("q1")
      .setLabel("Alcohol Level")
      .setStyle(TextInputStyle.Short)
      .setMinLength(3)
      .setMaxLength(4)
      .setPlaceholder("The legal limit is 0.08%")
      .setRequired(true);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(txtInput);

    modal.addComponents(firstActionRow);
    interaction.showModal(modal);
  }
}
