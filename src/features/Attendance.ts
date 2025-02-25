import CustomClient from "../base/classes/CustomClient";
import Feature from "../base/classes/Feature";
import { UsersModel } from "../base/models/User";
import { TextChannel } from "discord.js";
import { getAttendanceLast14Days } from "../db/attendance";
import { isStaffBod } from "../lib/permissions";
const serverData = require(process.cwd() + "/_data/mainServerData.json");

export default class feature extends Feature {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute() {
    // const server = await this.client.guilds.fetch(serverData.SERVER_ID).catch();
    // if (!server) return;

    // const channel = (await server.channels
    //   .fetch(serverData.IC_CHANNEL_ID)
    //   .catch()) as TextChannel;
    // if (!channel) return;

    // // setInterval(async () => {
    // const users = await UsersModel.find({
    //   joinedMainServer: true,
    // });

    // channel.send(`## Checking attendance for ${users.length} users...`);

    // let amount = 0;
    // let tesxt = "";

    // for (const user of users) {
    //   const isAdmin = await isStaffBod(user.discordUserId);
      
    //   if (!isAdmin) {
    //     const last14Days = await getAttendanceLast14Days(user._id);
    //     if (last14Days < 3) amount++;
    //     if (last14Days >= 3)
    //       tesxt += `${user.firstName} ${user.lastInitial}: ${last14Days}\n`;
    //   } else {
    //     tesxt += `${user.firstName} ${user.lastInitial}: is BOD\n`;
    //   }
    // }

    // console.log(tesxt);

    // channel.send(
    //   `## ${amount} users have not attended at least 3 times in the last 14 days.`
    // );

    // // }, 1000 * 60 * 60 * 24);
  }
}
