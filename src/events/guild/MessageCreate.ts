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
import { UiLogModel } from "../../base/models/UiLog";

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

    // CHECK UI CHANNEL
    const channelId = message.channel.id;
    const result = await UiLogModel.findOne({
      channelId,
    });

    if (result) {
      let msg = message;

      if (message.attachments.size > 0) {
        const attachmentChannel = (await message.guild!.channels.fetch(
          "1331307773589327892"
        )) as TextChannel;

        await attachmentChannel
          .send({
            content: `Attachment from ${message.member!.displayName}`,
            files: message.attachments.map((attachment) => attachment.url),
          })
          .then((message2) => {
            msg.attachments.first()!.name = `https://discord.com/channels/${
              message.guild!.id
            }/1331307773589327892/${message2.id}`;
          });
      }

      const formattedMessage = {
        ...msg,
        attachments: msg.attachments.toJSON(),
        author: msg.author.toJSON(),
        member: msg.member!.toJSON(),
      };

      await UiLogModel.findOneAndUpdate(
        {
          channelId,
        },
        {
          $push: {
            messages: formattedMessage,
          },
        }
      );
    }
  }
}
