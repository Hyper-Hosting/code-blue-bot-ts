import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ModalSubmitInteraction,
  TextChannel,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { UiLogModel } from "../../../base/models/UiLog";
import { UiRolesModel } from "../../../base/models/UiRoles";
const mainServerData = require(`${process.cwd()}/_data/mainServerData.json`);

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "close-gulag-submit",
      staffLevel: StaffLevels.depStaff,
    });
  }

  async Execute(interaction: ModalSubmitInteraction) {
    await interaction.deferUpdate();

    const message = interaction.message!;
    (message.channel as TextChannel).send("Closing Gulag");

    const comments = interaction.fields.fields.toJSON()[0]?.value || "None";

    const logResult = await UiLogModel.findOne({
      channelId: message.channel.id,
    });

    if (!logResult) {
      return interaction.followUp({
        content: "Failed to find Gulag log",
        flags: "Ephemeral",
      });
    }

    var member = null;

    try {
      member = await interaction.guild!.members.fetch(logResult.userId);
    } catch (error) {}

    const userRolesResult = await UiRolesModel.findOne({
      userId: logResult.userId,
    });

    if (member && userRolesResult) {
      try {
        await member.roles.remove(mainServerData.GULAG_ROLE);
        for (const role of userRolesResult.roles) {
          await member.roles.add(role);
        }
      } catch (error) {}
    }

    await UiRolesModel.findOneAndDelete({
      userId: logResult.userId,
    });

    await message.channel.delete();

    const uiLogChannel = (await message.guild!.channels.fetch(
      mainServerData.GULAG_LOGS_CHANNEL_ID
    )) as TextChannel;

    const embed = new EmbedBuilder()
      .setTitle("Gulag Log")
      .setColor("#0b73bc")
      .addFields(
        {
          name: "Log ID",
          value: `\`${logResult.logId}\``,
        },
        {
          name: "Member",
          value: `<@${logResult.userId}>`,
        },
        {
          name: "Nickname",
          value: `**@${logResult.userNickname}**`,
        },
        {
          name: "Staff",
          value: `${interaction.member}`,
        },
        {
          name: "Comments",
          value: `${comments}`,
        }
      );

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("View Transcript")
        .setStyle(5)
        .setEmoji("📁")
        .setURL(`https://code-blue.hyperhostings.com/ui-log/${logResult.logId}`)
    );

    uiLogChannel.send({
      embeds: [embed],
      components: [row1],
    });

    interaction.user.send({
      embeds: [embed],
      components: [row1],
    });
  }
}
