import { EmbedBuilder, TextChannel } from "discord.js";
import CustomClient from "../base/classes/CustomClient";
import Feature from "../base/classes/Feature";
import { MainServerModel } from "../base/models/MainServer";
const serverData = require(process.cwd() + "/_data/mainServerData.json");

export default class feature extends Feature {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute() {
    const server = await this.client.guilds.fetch(serverData.SERVER_ID).catch();
    if (!server) return;

    const channel = (await server.channels
      .fetch(serverData.RP_ANNOUNCEMENTS_CHANNEL_ID)
      .catch()) as TextChannel;
    if (!channel) return;

    setInterval(async () => {
      const MainServer = await MainServerModel.findOne();
      let rpVotePrev = new Date(new Date().setDate(1));

      if (MainServer?.rpVote) {
        rpVotePrev = new Date(MainServer.rpVote);
      }

      const time = new Date();
      if (rpVotePrev.getDate() !== time.getDate()) {
        if (time.getHours() === 14) {
          const rpTime = new Date(new Date().setHours(19)).setMinutes(0);
          const rpTime1 = new Date(new Date().setHours(20)).setMinutes(0);
          const rpTime2 = new Date(new Date().setHours(21)).setMinutes(0);
          const rpTime3 = new Date(new Date().setHours(22)).setMinutes(0);

          const embed = new EmbedBuilder()
            .setTitle("RP Vote")
            .setColor("Aqua")
            .setDescription(
              `*All times are shown in your timezone*
            
✅ - On Time: <t:${(new Date(rpTime).getTime() / 1000).toFixed(0)}:t>
        
1️⃣ - 1 hour delay: <t:${(new Date(rpTime1).getTime() / 1000).toFixed(0)}:t>
        
2️⃣ - 2 hours delay: <t:${(new Date(rpTime2).getTime() / 1000).toFixed(0)}:t>
        
3️⃣ - 3 hours delay: <t:${(new Date(rpTime3).getTime() / 1000).toFixed(0)}:t>`
            )
            .setFooter({
              text: "Only vote if you are Prob. Officer+ / Poverty Class+ / Firefighter 1+",
            });

          channel
            .send({
              content: "@everyone",
              embeds: [embed],
            })
            .then((msg) => {
              msg.react("✅");
              msg.react("1️⃣");
              msg.react("2️⃣");
              msg.react("3️⃣");
            });

          await MainServerModel.findOneAndUpdate(
            {},
            {
              rpVote: time,
            },
            {
              upsert: true,
            }
          );
        }
      }
    }, 1000 * 60 * 5);
  }
}
