import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import CustomClient from "../base/classes/CustomClient";
import Feature from "../base/classes/Feature";
import { BusinessModel } from "../base/models/Business-old";
import { IShifts, ShiftModel } from "../base/models/Shifts";
import { IUser } from "../base/models/User";
const serverData = require(process.cwd() + "/_data/businessServerData.json");

export default class feature extends Feature {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute() {
    const server = await this.client.guilds.fetch(serverData.SERVER_ID).catch();

    setInterval(async () => {
      const results = await BusinessModel.find();

      for (const business of results) {
        const shiftResults = await ShiftModel.find<
          IShifts & {
            accountId: IUser;
          }
        >({
          businessId: business._id,
        })
          .sort({
            amount: -1,
          })
          .populate({
            path: "accountId",
          });

        let text = "";

        for (const shift of shiftResults) {
          text += `<@${shift.accountId.discordUserId}> (${shift.accountId.firstName} ${shift.accountId.lastInitial}) has done \`${shift.amount}\` shifts\n`;
        }

        if (!text) text = "No shifts completed.";

        const embed = new EmbedBuilder()
          .setTitle(`${business.name} Shifts`)
          .setColor("Aqua")
          .setDescription(text);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("business-lb-reset")
            .setLabel("Reset Leaderboard")
            .setStyle(4)
        );

        const channel = (await server.channels
          .fetch(business.leaderboardChannelId)
          .catch()) as TextChannel;

        const oldMsg = await channel.messages
          .fetch(business.leaderboardMessageId)
          .catch();

        try {
          oldMsg.edit({
            embeds: [embed],
            components: [row],
          });
        } catch (error) {
          channel
            .send({
              embeds: [embed],
              components: [row],
            })
            .then(async (msg) => {
              await BusinessModel.findOneAndUpdate(
                {
                  _id: business._id,
                },
                {
                  leaderboardMessageId: msg.id,
                }
              );
            });
        }
      }
    }, 1000 * 60 * 5);
  }
}
