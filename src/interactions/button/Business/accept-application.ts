import {
  ButtonInteraction,
  EmbedBuilder,
  GuildMember,
  TextChannel,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";
import { UsersModel } from "../../../base/models/User";
import { BusinessModel } from "../../../base/models/Business";
const businessServerData = require(`${process.cwd()}/_data/businessServerData.json`);

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "accept-application",
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const userId = interaction.message.embeds[0].footer!.text;
    const member = await interaction.guild?.members
      .fetch(userId)
      .catch((err) => {});

    if (!member) {
      return interaction.reply({
        content: "Member not found in server list.",
        flags: "Ephemeral",
      });
    }

    const business = await BusinessModel.findOne({
      applicationChannel: interaction.channelId,
    });

    if (!business) {
      return interaction.reply({
        content: "Business not found.",
        flags: "Ephemeral",
      });
    }

    try {
      business.acceptedRoles.forEach((role) => {
        member.roles.add(role);
      });
    } catch (error) {}

    try {
      member.send({
        content: `Your application has been accepted. Welcome to ${business.name}.`,
      });
    } catch (error) {
      return interaction.reply({
        content: `Failed to send message to the user.`,
        flags: "Ephemeral",
      });
    }

    interaction.message.delete();
  }
}
