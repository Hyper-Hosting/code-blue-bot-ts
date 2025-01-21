import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { AttendanceRecordModel } from "../../../base/models/AttendanceRecord";
import { AttendanceSessionModel } from "../../../base/models/AttendanceSession";
import { getUser } from "../../../db/User";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "joined-game",
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const attendanceChannel = (await interaction.guild!.channels.fetch(
      "1200510700670427258"
    )) as TextChannel;

    const user = await getUser(interaction.user.id);
    if (!user) {
      return interaction.reply({
        content:
          "No account found make sure you are signed up at https://code-blue.hyperhostings.com/.",
        flags: "Ephemeral",
      });
    }

    const activeSes = await AttendanceSessionModel.findOne().sort({ date: -1 });
    const existingRecord = await AttendanceRecordModel.findOne({
      accountId: user._id,
      session: activeSes!._id,
    });

    if (existingRecord) {
      if (existingRecord.status == "present") {
        return interaction.reply({
          content: "Your attendance has been marked.",
          flags: "Ephemeral",
        });
      } else if (existingRecord.status == "pending") {
        return interaction.reply({
          content: "Your attendance is pending approval.",
          flags: "Ephemeral",
        });
      } else if (existingRecord.status == "absent") {
        await AttendanceRecordModel.findOneAndUpdate(
          {
            accountId: user._id,
            session: activeSes!._id,
          },
          {
            status: "pending",
          },
          {
            upsert: true,
          }
        );
      }
    } else {
      await AttendanceRecordModel.findOneAndUpdate(
        {
          accountId: user._id,
          session: activeSes!._id,
        },
        {
          status: "pending",
        },
        {
          upsert: true,
        }
      );
    }

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Is this gamertag in game?")
      .setFields(
        {
          name: "Member",
          value: `${interaction.member}`,
        },
        {
          name: "Gamertag",
          value: `${user.gamertag}`,
        }
      );

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("accept-attendance")
        .setLabel("Accept")
        .setStyle(3),

      new ButtonBuilder()
        .setCustomId("deny-attendance")
        .setLabel("Deny")
        .setStyle(4)
    );

    attendanceChannel.send({
      embeds: [embed],
      components: [row],
    });

    interaction.reply({
      content: "Your attendance has been sent for reviewal",
      flags: "Ephemeral",
    });
  }
}
