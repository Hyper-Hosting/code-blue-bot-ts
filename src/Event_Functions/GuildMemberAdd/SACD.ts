import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
const sacdServerData = require(`${process.cwd()}/_data/sacdServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "SACD",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        sacdServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("#0b73bc")
          .setDescription(
            `## Welcome to the SACD Server!
Welcome to the offical Code Blue Roleplay San Andreas Communications Department! Please direct yourself to <#1188188216201859153> and verify yourself.

Ensure you have:
- Read over the <#1188188374666858607>
- Read over the <#1188188333793366159>

Then, after your roles are sorted, head over to <#1188198541299027998> to get your training scheduled.

Welcome & Enjoy your stay!
- Department Administration`
          )
          .setAuthor({
            name: member.user.username,
            iconURL: member.user.displayAvatarURL(),
          });

        channel.send({
          content: `${member}`,
          embeds: [embed],
        });
      }
    } catch (error) {
      console.error(`Error sending welcome message: ${error}`);
    }

    // Add the needs verification role to the member
    await member.roles.add(sacdServerData.NEEDS_VERIFICATION_ROLE_ID);
  }
}
