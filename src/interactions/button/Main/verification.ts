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
const mainServerData = require(`${process.cwd()}/_data/mainServerData.json`);

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "verification-main",
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

    if (userData.mainDepartment === "civ") {
      let nickname = "";

      if (userData.civ.rank == "CIV Trainee") {
        nickname = `(T) ${firstName} ${lastInitial}. [${
          userData.civ.callsign || "XXX"
        }]`;

        try {
          await member.roles.add(mainServerData.NEW_MEMBER_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the New Member role```\n";
        }
      } else {
        nickname = `${firstName} ${lastInitial}. [${userData.civ.callsign}]`;

        try {
          await member.roles.add(mainServerData.SERVER_MEMBER_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the Server Member role```\n";
        }
      }

      let rankRoleId = mainServerData.CIVILIAN_TRAINEE_ROLE_ID;

      switch (userData.civ.rank) {
        case "Poverty Class":
          rankRoleId = mainServerData.POVERTY_CLASS_ROLE_ID;
          break;

        case "Lower Middle Class":
          rankRoleId = mainServerData.LOWER_MIDDLE_CLASS_ROLE_ID;
          break;

        case "Middle Class":
          rankRoleId = mainServerData.MIDDLE_CLASS_ROLE_ID;
          break;

        case "Upper Middle Class":
          rankRoleId = mainServerData.UPPER_MIDDLE_CLASS_ROLE_ID;
          break;

        case "Executive Class":
          rankRoleId = mainServerData.EXECUTIVE_CLASS_ROLE_ID;
          break;

        case "First Class":
          rankRoleId = mainServerData.FIRST_CLASS_ROLE_ID;
          break;

        default:
          break;
      }

      try {
        await member.roles.add(rankRoleId);
      } catch (error) {
        errMsg += "```Unable to add the Users CIV Rank role```\n";
      }

      try {
        await member.roles.add(mainServerData.CIVILIAN_OPERATIONS_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the Civilian Operations role```\n";
      }

      try {
        await member.setNickname(nickname);
      } catch (error) {
        errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
      }
    } else if (userData.mainDepartment === "sacd") {
      if (userData.sacd.rank == "Operator In Training") {
        try {
          await member.roles.add(mainServerData.NEW_MEMBER_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the New Member role```\n";
        }
      } else {
        try {
          await member.roles.add(mainServerData.SERVER_MEMBER_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the Server Member role```\n";
        }
      }

      const nickname = `OIT - ${firstName} ${lastInitial}. [${
        userData.sacd.callsign || "XXX"
      }]`;

      try {
        await member.roles.add(mainServerData.SACD_OIT_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the SACD OIT role```\n";
      }

      try {
        await member.roles.add(mainServerData.SACD_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the SACD role```\n";
      }

      try {
        await member.setNickname(nickname);
      } catch (error) {
        errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
      }
    } else if (userData.mainDepartment === "safr") {
      if (userData.safr.rank == "Fire Recruit") {
        try {
          await member.roles.add(mainServerData.NEW_MEMBER_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the New Member role```\n";
        }
      } else {
        try {
          await member.roles.add(mainServerData.SERVER_MEMBER_ROLE_ID);
        } catch (error) {
          errMsg += "```Unable to add the Server Member role```\n";
        }
      }

      const nickname = `Fire Recruit - ${firstName} ${lastInitial}. [${
        userData.safr.callsign || "XXX"
      }]`;

      try {
        await member.roles.add(mainServerData.SAFR_RECRUIT_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the SAFR Recruit role```\n";
      }

      try {
        await member.roles.add(mainServerData.SAFR_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the SAFR role```\n";
      }

      try {
        await member.setNickname(nickname);
      } catch (error) {
        errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
      }
    } else if (userData.mainDepartment === "police") {
      const nickname = `LEO Cadet - ${firstName} ${lastInitial}.`;

      try {
        await member.roles.add(mainServerData.NEW_MEMBER_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the New Member role```\n";
      }

      try {
        await member.roles.add(mainServerData.CADET_ROLE_ID);
      } catch (error) {
        errMsg += "```Unable to add the Cadet Role role```\n";
      }

      try {
        await member.setNickname(nickname);
      } catch (error) {
        errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
      }
    }

    try {
      await member.roles.add(mainServerData.DEPARTMENT_ROLES_ROLE_ID);
    } catch (error) {
      errMsg += "```Unable to add the Department Roles role```\n";
    }

    try {
      await member.roles.remove(mainServerData.NEEDS_VERIFICATION_ROLE_ID);
    } catch (error) {
      errMsg += "```Unable to remove the Needs Verification role```\n";
    }

    interaction.followUp({
      content: "Your roles and name has been sorted.",
    });

    await UsersModel.findOneAndUpdate(
      {
        _id: userData._id,
      },
      {
        joinedMainServer: true,
      }
    );

    try {
      if (errMsg) {
        const channel = (await interaction.guild!.channels.fetch(
          mainServerData.SUPERVISOR_CHANNEL_ID
        )) as TextChannel;

        channel.send(
          `# Verification System\nThere where some issues with ${member} can a staff member please sort it.\n\n${errMsg}`
        );

        member.send(
          "Some of your roles may not have been added or your name may not have been changed, a member of staff is working to fix this."
        );
      }

      const channelLogs = (await interaction.guild!.channels.fetch(
        mainServerData.MOD_LOGS_CHANNEL_ID
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
