import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
import { StatisticPlusOne } from "../../db/statistics";
const interviewServerData = require(`${process.cwd()}/_data/interviewServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "Interview",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        interviewServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setDescription(
            `Welcome ${member} to Code Blue's Headquarters. On behalf of the Code Blue Staff Team, we are excited to meet you!
To apply to be apart of our Community, go to <#1181710436220026970> complete the form to begin your application.`
          )
          .setThumbnail(
            "https://media2.giphy.com/media/Q87YAYsdptMDJR4r68/giphy.gif"
          )
          .setImage(
            "https://www.picgifs.com/games-gifs/games-gifs/grand-theft-auto-v/picgifs-grand-theft-auto-v-627917.gif"
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
    await member.roles.add(interviewServerData.APPLICANT_ROLE_ID);

    await StatisticPlusOne(["serverJoinsInterview"]);
  }
}
