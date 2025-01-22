import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
const safrAcademyServerData = require(`${process.cwd()}/_data/safrAcademyServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "SAFR_Academy",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        safrAcademyServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("#0b73bc")
          .setDescription(
            `## SAFR Fire Academy
Welcome ${member} to the SAFR Fire Academy! Please follow the instructions listed below to ensure you get your roles sorted.

Head over to <#1212121355068121108> and fill out the required information.

Thank you for joining, enjoy your stay!
- SAFR Chief Officers`
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
    await member.roles.add(safrAcademyServerData.NEEDS_VERIFICATION_ROLE_ID);
  }
}
