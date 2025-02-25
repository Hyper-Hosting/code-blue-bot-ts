import { ButtonInteraction } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { ShiftModel } from "../../../base/models/Shifts";
import { BusinessModel } from "../../../base/models/Business";
import { getUser } from "../../../db/User";

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
      leaderboardChannel: interaction.channel.id,
    });

    const user = await getUser(interaction.user.id);

    if (!user) {
      return interaction.followUp("Unable to reset channel, user not found.");
    }

    const userId = user._id.toString();

    if (!businessData) {
      return interaction.followUp(
        "Unable to reset channel, business not found."
      );
    }
    
    if (
      userId !== businessData.ceoId.toString() &&
      userId !== businessData.cfoId?.toString() &&
      userId !== businessData.cooId?.toString()
    ) {
      return interaction.followUp(
        "You are not authorized to complete this reset."
      );
    }

    await ShiftModel.deleteMany({
      businessId: businessData._id,
    });

    interaction.followUp(
      "Leaderboard has been reset, changes can take up to 5 minutes to take effect."
    );
  }
}
