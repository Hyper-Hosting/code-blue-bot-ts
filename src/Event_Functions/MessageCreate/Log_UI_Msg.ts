import { Message, TextChannel } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import MessageCreate from "../../base/classes/MessageCreate";
import { UiLogModel } from "../../base/models/UiLog";

export default class JoinEvent extends MessageCreate {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute(message: Message) {
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
