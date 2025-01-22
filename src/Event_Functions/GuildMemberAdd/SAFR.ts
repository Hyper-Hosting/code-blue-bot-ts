import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
const safrServerData = require(`${process.cwd()}/_data/safrServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "SAFR",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        safrServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("#0b73bc")
          .setDescription(
            `## Welcome to the San Andreas Fire Rescue server ${member}!

Head over to <#1165064529978331186> and follow the instructions there to get roles sorted.

Thank you for joining & Enjoy your stay!
- SAFR Department Administration`
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
    await member.roles.add(safrServerData.NEEDS_VERIFICATION_ROLE_ID);
  }
}
