import { Message, TextChannel } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import MessageCreate from "../../base/classes/MessageCreate";
import { UsersModel } from "../../base/models/User";
import { getUser } from "../../db/User";

export default class JoinEvent extends MessageCreate {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute(message: Message) {
    if (
      message.content.toLowerCase().includes("code") &&
      message.channel.id == "1319438406673240215"
    ) {
      const discordUserId = message.author.id;
      const user = await getUser(discordUserId);

      if (!user) {
        return message.reply(
          "You need to make sure you have signed up first! Head over to <#1181710436220026970>"
        );
      }

      if (user.interviewApplicationCode === 999999) {
        return message.reply("You do not need a OTP");
      }

      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 900000) + 100000;
      } while (randomNumber === 999999);

      await UsersModel.findOneAndUpdate(
        {
          discordUserId,
        },
        {
          interviewApplicationCode: randomNumber,
        }
      );

      (message.channel as TextChannel).send(
        `<@${discordUserId}> your OTP is ||${randomNumber}||`
      );
    }
  }
}
