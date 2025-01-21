import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { TextModel } from "../../../base/models/Text";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "text",
      description: "Texts another member",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      options: [
        {
          name: "user",
          description: "User you want to text",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "message",
          description: "Message to send them",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user")!;
    const message = interaction.options.getString("message")!;

    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: `You can't message yourself`,
        flags: "Ephemeral",
      });
    }

    const prevData = await TextModel.findOne({
      userIds: { $all: [interaction.user.id, user.id] },
    });

    let messages: string[] = [];

    if (prevData) messages = prevData.messages;

    messages.push(`${interaction.user.displayName}: ${message}`);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("view-message")
        .setLabel("View Message")
        .setStyle(1)
    );

    await interaction.reply({
      content: `${interaction.user}: *Sends text to ${user}*`,
      components: [row],
    });

    if (!prevData) {
      await new TextModel({
        userIds: [interaction.user.id, user.id],
        messages,
      }).save();
    } else {
      await TextModel.findOneAndUpdate(
        {
          userIds: prevData.userIds,
        },
        {
          messages,
        },
        {
          upsert: true,
        }
      );
    }
  }
}
