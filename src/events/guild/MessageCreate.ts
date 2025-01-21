import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  Events,
  Message,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
  TextChannel,
} from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import Command from "../../base/classes/Command";
import Interaction from "../../base/classes/Interaction";
import { checkPermission, isStaffBod } from "../../lib/permissions";
import { getUser } from "../../db/User";
import { UsersModel } from "../../base/models/User";

export default class MessageCreateHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.MessageCreate,
      description: "Message Create handler event",
      once: false,
    });
  }

  async Execute(message: Message) {
    if (message.content.toLowerCase().includes("code")) {
      const discordUserId = message.author.id;
      const user = await getUser(discordUserId);

      if (!user) {
        return message.reply("You need to make sure you have signed up first!");
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
