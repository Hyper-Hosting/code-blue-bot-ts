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
      name: "bodycam",
      description: "Turn your bodycam on/off",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "status",
          description: "Turn it off or on",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Activate",
              value: "on",
            },
            {
              name: "Deactivate",
              value: "off",
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const status = interaction.options.getString("status");

    if (status === "on") {
      const embed = new EmbedBuilder()
        .setTitle("Turned On Bodycam")
        .setThumbnail(
          "https://c424b5e2.delivery.rocketcdn.me/wp-content/uploads/2021/03/Professional-BodyCam-T2-ZEPCAM.png"
        )
        .setDescription(`${interaction.user}'s body camera is now recording!`)
        .setColor("Green");

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setTitle("Turned Off Bodycam")
        .setThumbnail(
          "https://c424b5e2.delivery.rocketcdn.me/wp-content/uploads/2021/03/Professional-BodyCam-T2-ZEPCAM.png"
        )
        .setDescription(`${interaction.user}'s body camera is not recording.`)
        .setColor("Red");

      interaction.reply({
        embeds: [embed],
      });
    }
  }
}
