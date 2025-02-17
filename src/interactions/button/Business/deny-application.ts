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
const businessServerData = require(`${process.cwd()}/_data/businessServerData.json`);

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "deny-application",
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

    try {
      member.send({
        content: `Your application has been denied. Please contact ${interaction.member} if you want more information.`,
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
