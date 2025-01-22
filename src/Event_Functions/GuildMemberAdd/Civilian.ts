import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
const civilianServerData = require(`${process.cwd()}/_data/civilianServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "Civilian",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        civilianServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("#0b73bc")
          .setDescription(
            `## Welcome ${member} to the Civilian Server!\n\nHead over to <#1291525786326667355> to get verified`
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
    await member.roles.add(civilianServerData.NEW_MEMBER_ROLE_ID);
  }
}
