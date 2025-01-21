import { ButtonInteraction } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { LogsModel } from "../../../base/models/Logs";
import { getUser } from "../../../db/User";
import { AttendanceSessionModel } from "../../../base/models/AttendanceSession";
import { AttendanceRecordModel } from "../../../base/models/AttendanceRecord";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "deny-attendance",
      staffLevel: StaffLevels.trainee,
    });
  }

  async Execute(interaction: ButtonInteraction) {
    const userId = interaction.message.embeds[0].fields[0].value
      .replace("<@", "")
      .replace(">", "");

    var member = null;

    try {
      member = await interaction.guild!.members.fetch(userId);
    } catch (error) {
      console.error(`Failed to fetch member: ${error}`);
    }

    const userData = await getUser(userId);

    if (!userData) {
      return interaction.reply({
        content: `Failed to find user data`,
        flags: "Ephemeral",
      });
    }

    const activeSes = await AttendanceSessionModel.findOne().sort({ date: -1 });
    await AttendanceRecordModel.findOneAndUpdate(
      {
        accountId: userData._id,
        session: activeSes!._id,
      },
      {
        status: "absent",
      },
      {
        upsert: true,
      }
    );

    if (member) {
      member.send({
        content: "Your attendance has been denied",
      });
    }

    interaction.message.delete();
    interaction.reply({
      content: `Attendance Denied`,
      flags: "Ephemeral",
    });

    const staffUser = await getUser(interaction.user.id);
    if (staffUser) {
      await new LogsModel({
        accountId: staffUser._id,
        timestamp: new Date(),
        logType: "Main",
        filterName: "Attendance Deny",
        logTitle: `${staffUser.firstName} ${staffUser.lastInitial} denied ${userData.firstName} ${userData.lastInitial}'s attendance`,
        iconName: "close",
        info: [
          `<b class="coloured">Member ID -</b> ${userId}`,
          `<b class="coloured">Member Name -</b> ${userData.firstName} ${userData.lastInitial}`,
          `<b class="coloured">Member Gamertag -</b> ${userData.gamertag}`,
        ],
      }).save();
    }
  }
}
