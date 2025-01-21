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
      name: "engine",
      description: "Turn your engine on/off",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "ignition",
          description: "Turn it off or on",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "On",
              value: "on",
            },
            {
              name: "Off",
              value: "off",
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const ignition = interaction.options.getString("ignition");

    if (ignition === "on") {
      const embed = new EmbedBuilder()
        .setTitle("Turned On Ignition")
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/3825/3825781.png")
        .setDescription(`${interaction.user} has turned on their engine.`)
        .setColor("Green");

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setTitle("Turned Off Ignition")
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/3825/3825781.png")
        .setDescription(`${interaction.user} has turned off their engine.`)
        .setColor("Red");

      interaction.reply({
        embeds: [embed],
      });
    }
  }
}
