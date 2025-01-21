import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "dot-report",
      description: "This will send out a DOT notifiction",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 10,
      options: [
        {
          name: "location",
          description: "Location of the incident",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "direction",
          description: "Direction of travel",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "incident",
          description: "Description of the incident",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "condition",
          description: "Condition of the incident",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const location = interaction.options.getString("location");
    const direction = interaction.options.getString("direction");
    const incident = interaction.options.getString("incident");
    const condition = interaction.options.getString("condition");

    interaction.reply({
      content: `## DOT ANNOUNCEMENT\n@here \`${direction}\` Lanes of \`${location}\` are \`${condition}\` due to a \`${incident}\``,
    });
  }
}
