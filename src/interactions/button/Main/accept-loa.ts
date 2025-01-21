import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "accept-loa",
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const userId = interaction
      .message!.embeds[0].data.fields![0].value.replace("<@", "")
      .replace(">", "");

    try {
      const member = await interaction.guild!.members.fetch(userId);
      member.send("Your LOA has been accepted");
    } catch (error) {
      console.error(`Failed to send message to user: ${error}`);
    }

    interaction.message.delete();

    const prevEmbed = interaction.message!.embeds[0];
    const embed = new EmbedBuilder(prevEmbed.toJSON()).setTitle(
      "Leave of Absence"
    );

    try {
      const logsChannel = (await interaction.guild!.channels.fetch(
        "1331018365682319410"
      )) as TextChannel;

      logsChannel.send({
        embeds: [embed],
      });
    } catch (error) {
      console.error(`Failed to send message to LOA Logs Channel: ${error}`);
    }
  }
}
