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
      name: "verification-business",
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

    const nickname = `${firstName} ${lastInitial}.`;

    try {
      await member.setNickname(nickname);
    } catch (error) {
      errMsg += `\`\`\`Unable to change nickname to ${nickname}\`\`\`\n`;
    }

    try {
      await member.roles.add(businessServerData.VISITOR_ROLE_ID);
    } catch (error) {
      errMsg += "```Unable to add the Visitor role```\n";
    }

    try {
      await member.roles.remove(businessServerData.NEW_MEMBER_ROLE_ID);
    } catch (error) {
      errMsg += "```Unable to remove the New Member role```\n";
    }

    interaction.followUp({
      content: "Your roles and name has been sorted.",
    });

    await UsersModel.findOneAndUpdate(
      {
        _id: userData._id,
      },
      {
        joinedBusinessServer: true,
      }
    );

    try {
      if (errMsg) {
        const channel = (await interaction.guild!.channels.fetch(
          businessServerData.HR_CHAT_CHANNEL_ID
        )) as TextChannel;

        channel.send(
          `# Verification System\nThere where some issues with ${member} can a staff member please sort it.\n\n${errMsg}`
        );

        member.send(
          "Some of your roles may not have been added or your name may not have been changed, a member of staff is working to fix this."
        );
      }

      const channelLogs = (await interaction.guild!.channels.fetch(
        businessServerData.MOD_LOGS_CHANNEL_ID
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
