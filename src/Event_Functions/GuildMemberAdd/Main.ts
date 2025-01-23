import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
import { StatisticPlusOne } from "../../db/statistics";
const mainServerData = require(`${process.cwd()}/_data/mainServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "Main",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        mainServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("#0b73bc")
          .setDescription(
            `Welcome ${member} to Code Blue!\n\nHead over to <#1269377904760979517> to get your roles and name sorted.`
          )
          .setThumbnail(
            "https://media2.giphy.com/media/Q87YAYsdptMDJR4r68/giphy.gif"
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
    await member.roles.add(mainServerData.NEEDS_VERIFICATION_ROLE_ID);

    await StatisticPlusOne(["serverJoinsMain"]);
  }
}
