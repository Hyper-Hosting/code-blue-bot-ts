import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import CustomClient from "../../base/classes/CustomClient";
const policeServerData = require(`${process.cwd()}/_data/policeAcademyServerData.json`);

export default class JoinEvent extends GuildMemberAdd {
  constructor(client: CustomClient) {
    super(client, {
      server: "Police_Academy",
    });
  }

  async Execute(member: GuildMember) {
    try {
      const channel = (await member.guild.channels.fetch(
        policeServerData.WELCOME_CHANNEL_ID
      )) as TextChannel;

      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("#0b73bc")
          .setDescription(
            `# Welcome to the SASP Academy Server!

To get started, please head over to <#1199494627183571064>, From there head over too <#1206316653147848754> and get very familiar with them as these are very important. It would also help to look at the Penal Codes and the 10 codes. Once you feel you are ready you may fill out an application which are found in <#1199513607776505947>. Once your applications are submitted, please be patient the bot alerts staff that you have completed it. You will be pinged in <#1199513667935424633> if you have been accepted. If you have any confusion along the way, please see <#1199494705109536899> and choose the one that best fits your needs. or use <#1197103427994517525> PLEASE FOLLOW <#1199668906109964350> AT ALL TIMES`
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
    await member.roles.add(policeServerData.NEEDS_VERIFICATION_ROLE_ID);
  }
}
