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
const sacdServerData = require(`${process.cwd()}/_data/sacdServerData.json`);

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "verification-sacd",
    });
  }

  async Execute(interaction: ButtonInteraction) {
    let errMsg = "";
    const member = interaction.member! as GuildMember;
    const userData = await getUser(member.user.id);

    await interaction.deferReply({
      flags: "Ephemeral",
    });

    if (!userData) {
      return interaction.followUp({
        content: "No data found for your account!",
      });
    }

    if (!userData.interviewApplicationComplete) {
      return interaction.followUp({
        content: `You have not completed your interview application, https://code-blue.hyperhostings.com/interview/application`,
      });
    }

    const lastInitial = userData.lastInitial.toUpperCase();
    const firstName = `${userData.firstName
      .charAt(0)
      .toUpperCase()}${userData.firstName.slice(1).toLowerCase()}`;

    if (userData.mainDepartment === "sacd") {
      const nickname = `OIT | ${firstName} ${lastInitial}. [${
        userData.sacd.callsign || "XXX"
      }]`;

      try {
        await member.setNickname(nickname);
      } catch (error) {
        errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
      }

      try {
        await member.roles.add(sacdServerData.DEPARTMENT_MEMBER_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the Department Members role```\n";
      }

      try {
        await member.roles.add(sacdServerData.SACD_ROLE_ID);
      } catch (error) {
        errMsg +=
          "```Unable to add the San Andreas Communications Department role```\n";
      }

      try {
        await member.roles.add(sacdServerData.OIT_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the Operator In Training role```\n";
      }

      try {
        await member.roles.add(sacdServerData.DEPT_CERT_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the Department Certifications role```\n";
      }
    } else {
      const nickname = `Visitor - ${firstName} ${lastInitial}.`;

      try {
        await member.setNickname(nickname);
      } catch (error) {
        errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
      }

      try {
        await member.roles.add(sacdServerData.VISITOR_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the Department Visitor role```\n";
      }

      if (userData.mainDepartment === "civ") {
        try {
          await member.roles.add(sacdServerData.CIV_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the Civilian Operations role```\n";
        }
      } else if (userData.mainDepartment === "safr") {
        try {
          await member.roles.add(sacdServerData.SAFR_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the San Andreas Fire Rescue role```\n";
        }
      } else if (userData.mainDepartment === "police") {
        try {
          await member.roles.add(sacdServerData.POLICE_ROLE_ID);
        } catch (error) {
          errMsg +=
            "```Unable to add the San Andreas Police Department role```\n";
        }
      }
    }

    try {
      await member.roles.remove(sacdServerData.NEEDS_VERIFICATION_ROLE_ID);
    } catch (error) {
      errMsg += "```Unable to remove the Needs Verification role```\n";
    }

    await interaction.followUp("Your roles and name has been sorted.");

    await UsersModel.findOneAndUpdate(
      {
        _id: userData._id,
      },
      {
        joinedSacdServer: true,
      }
    );

    try {
      if (errMsg) {
        const channel = (await interaction.guild!.channels.fetch(
          sacdServerData.SUPERVISOR_CHANNEL_ID
        )) as TextChannel;

        channel.send(
          `# Verification System\nThere where some issues with ${member} can a staff member please sort it.\n\n${errMsg}`
        );

        member.send(
          "Some of your roles may not have been added or your name may not have been changed, a member of staff is working to fix this."
        );
      }

      const channelLogs = (await interaction.guild!.channels.fetch(
        sacdServerData.MOD_LOGS_CHANNEL_ID
      )) as TextChannel;

      const embed = new EmbedBuilder().setColor("Aqua").setFields(
        {
          name: "Member",
          value: `${member}`,
        },
        {
          name: "Name",
          value: `${member.displayName}`,
        },
        {
          name: "Department",
          value: `${userData.mainDepartment}`,
        }
      );

      channelLogs.send({
        embeds: [embed],
      });
    } catch (error) {
      console.error(`An error occurred sending verification logs: ${error}`);
    }
  }
}
