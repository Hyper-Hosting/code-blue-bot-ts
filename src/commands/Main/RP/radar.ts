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
      name: "radar",
      description: "Turn on your radar",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "calibrate",
          description: "Speed to set radar at",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
        {
          name: "units",
          description: "What units to use",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "MPH",
              value: "mph",
            },
            {
              name: "KPH",
              value: "kph",
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const units = interaction.options.getString("units");
    const calibrate = interaction.options.getInteger("calibrate");

    const embed = new EmbedBuilder()
      .setTitle("Radar Has Been Turned On")
      .setThumbnail(
        "https://static.vecteezy.com/system/resources/previews/035/511/067/non_2x/handle-speed-radar-icon-simple-flash-limit-gun-vector.jpg"
      )
      .setDescription(
        `The radar has been calibrated to \`${calibrate}${units}\``
      )
      .setColor("Green");

    interaction.reply({
      embeds: [embed],
    });
  }
}
