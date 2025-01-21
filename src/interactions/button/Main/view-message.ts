import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { TextModel } from "../../../base/models/Text";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "view-message",
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const content = interaction.message.content;
    const userId_1 = content.split("<@")[1].split(">: *Sends text to")[0];
    const userId_2 = content.split("<@")[2].split(">*")[0];

    const resultData = await TextModel.findOne({
      userIds: { $all: [userId_1, userId_2] },
    });

    if (
      resultData &&
      (interaction.user.id === userId_1 || interaction.user.id === userId_2)
    ) {
      const messages = resultData.messages;

      const embed = new EmbedBuilder()
        .setTitle("Messages")
        .setColor("#0b73bc")
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/5356/5356190.png")
        .setDescription(
          `\`\`\`${messages
            .slice(messages.length - 10, messages.length)
            .join("\n")}\`\`\``
        )
        .setFooter({ text: "Texts limited to 10" });

      interaction.reply({
        embeds: [embed],
        flags: "Ephemeral",
      });
    } else {
      interaction.reply({
        content: "No access",
        flags: "Ephemeral",
      });
    }
  }
}
