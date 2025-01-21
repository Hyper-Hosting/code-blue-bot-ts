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
      name: "vitals",
      description: "This will provide EMS with your vitals",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "level",
          description: "The level of vitals",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Low",
              value: "low",
            },
            {
              name: "Normal",
              value: "normal",
            },
            {
              name: "High",
              value: "high",
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const level = interaction.options.getString("level");

    let text = `**HR:** 40bpm 
    **BP:** 90/60 mm Hg 
    **SpO2:** 80%`;

    if (level === "normal") {
      text = `**HR:** 80bpm 
      **BP:** 120/80 mm Hg
      **SpO2:** 99%`;
    } else if (level === "high") {
      text = `**HR:** 150bpm 
      **BP:** 160/100 mm Hg 
      **SpO2:** 94%`;
    }

    const embed = new EmbedBuilder()
      .setTitle("Vitals Level")
      .setDescription(text)
      .setColor("Aqua");

    interaction.reply({
      content: `${interaction.user}:`,
      embeds: [embed],
    });
  }
}
