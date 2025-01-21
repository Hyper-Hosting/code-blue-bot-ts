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
      name: "dashcam",
      description: "Turn your dashcam on/off",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "power",
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
    const power = interaction.options.getString("power");

    if (power === "on") {
      const embed = new EmbedBuilder()
        .setTitle("Turned On Dashcam")
        .setThumbnail(
          "https://cdn.stockmediaserver.com/smsimg31/PV/IsignstockContributors/ist_21575_56043.jpg?token=oxNZoQxdSlkyxeH2YjU3s4NutbCrxI9RQCdtylvGlnk&class=pv&smss=52&expires=4102358400"
        )
        .setDescription(`${interaction.user}'s dashcam is now recording!`)
        .setColor("Green");

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setTitle("Turned Off Dashcam")
        .setThumbnail(
          "https://cdn.stockmediaserver.com/smsimg31/PV/IsignstockContributors/ist_21575_56043.jpg?token=oxNZoQxdSlkyxeH2YjU3s4NutbCrxI9RQCdtylvGlnk&class=pv&smss=52&expires=4102358400"
        )
        .setDescription(`${interaction.user}'s dashcam is not recording.`)
        .setColor("Red");

      interaction.reply({
        embeds: [embed],
      });
    }
  }
}
