import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "pbt_modal",
    });
  }

  async Execute(interaction: ModalSubmitInteraction) {
    await interaction.deferUpdate();

    const result = interaction.fields.fields
      .toJSON()[0]
      .value.trim()
      .replace("%", "");

    interaction.message?.edit({
      components: [],
    });

    (interaction.channel as TextChannel).send({
      content: `${interaction.user}: *Alcohol results come back: \`${result}%\`*`,
    });
  }
}
