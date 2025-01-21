import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "twotter",
      description: "Send a tweet",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "account-name",
          description: "The name of your account",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "vpn",
          description: "Are you using a VPN?",
          type: ApplicationCommandOptionType.Boolean,
          required: true,
        },
        {
          name: "message",
          description: "What would you like to say?",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "attachment",
          description: "Would you like to send an image?",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const accountName = interaction.options.getString("account-name");
    const vpn = interaction.options.getBoolean("vpn");
    const message = interaction.options.getString("message");
    const attachment = interaction.options.getAttachment("attachment");

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setAuthor({
        iconURL:
          "https://cdn.discordapp.com/attachments/1178006791217492060/1178024300536672366/512px-Logo_of_Twitter.png?ex=6574a39f&is=65622e9f&hm=81097d404df441f63522cc44a36e9033b789fdf584fec90a0946a05f96d5c325&",
        name: `@${accountName}`,
      })
      .setDescription(`${message}`)
      .setFooter(
        vpn
          ? {
              text: "Sent through VPN",
            }
          : null
      )
      .setImage(attachment?.url || null);

    interaction.reply({
      embeds: [embed],
    });
  }
}
