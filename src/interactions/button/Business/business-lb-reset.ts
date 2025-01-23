import { ButtonInteraction } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { BusinessModel } from "../../../base/models/Business";
import { ShiftModel } from "../../../base/models/Shifts";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "business-lb-reset",
    });
  }

  async Execute(interaction: ButtonInteraction) {
    if (!interaction.channel) {
      return interaction.reply({
        content: "This command can only be used in a server.",
        flags: "Ephemeral",
      });
    }

    await interaction.deferReply({
      flags: "Ephemeral",
    });

    const businessData = await BusinessModel.findOne({
      leaderboardChannelId: interaction.channel.id,
    });

    const userId = interaction.user.id;

    if (!businessData) {
      return interaction.followUp(
        "Unable to reset channel, business not found."
      );
    }

    if (
      userId !== businessData.ceoId &&
      userId !== businessData.cfoId &&
      userId !== businessData.cooId
    )
      return interaction.followUp(
        "You are not authorized to complete this reset."
      );

    await ShiftModel.deleteMany({
      businessId: businessData._id,
    });

    interaction.followUp(
      "Leaderboard has been reset, changes can take up to 5 minutes to take effect."
    );
  }
}
