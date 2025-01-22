import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  HexColorString,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import ms from "ms";
import os from "os";
import { StaffLevels } from "../../../base/types/StaffLevels";
const { version, dependencies } = require(`${process.cwd()}/package.json`);

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "embed",
      description: "Sends an embeded message",
      server: "Global",
      staffLevel: StaffLevels.depStaff,
      default_member_permission: PermissionsBitField.Flags.ManageRoles,
      cooldown: 3,
      options: [
        {
          name: "content",
          description: "The main content of the embed",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "title",
          description: "The title of the embed",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "colour",
          description: "MUST BE A HEX COLOUR (ex. #FF0000)",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "footer",
          description: "The text to display in the footer",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "title-url",
          description: "Add a URL to the embed title",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "image",
          description: "The image to display in the embed",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "thumbnail",
          description: "The image to display as the thumbnail",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const content = interaction.options.getString("content")!;
    const title = interaction.options.getString("title");
    const url = interaction.options.getString("title-url");
    const footerText = interaction.options.getString("footer");
    const embedImage = interaction.options.getAttachment("image");
    const embedThumbnail = interaction.options.getAttachment("thumbnail");
    const colour = interaction.options.getString(
      "colour"
    ) as HexColorString | null;

    try {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(title)
            .setDescription(content)
            .setColor(colour || "Random")
            .setImage(embedImage?.url || null)
            .setThumbnail(embedThumbnail?.url || null)
            .setURL(url)
            .setFooter(
              footerText
                ? {
                    text: footerText,
                  }
                : null
            ),
        ],
      });
    } catch (error) {
      interaction.reply({
        content: "An error occured while trying to send the embed.",
        flags: "Ephemeral",
      });
    }
  }
}
