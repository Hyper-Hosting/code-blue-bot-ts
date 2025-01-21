import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { UsersModel } from "../../../base/models/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "gamertag",
      description: "Search up a gamertag",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "gamertag",
          description: "What is the gamertag?",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const gamertag = interaction.options.getString("gamertag")!;

    const data = await UsersModel.findOne({
      gamertag: {
        $regex: new RegExp("^" + gamertag.toLowerCase(), "i"),
      },
    });

    if (data) {
      await interaction.reply({
        content: `\`${data.gamertag}\` belongs to <@${data.discordUserId}> | \`${data.firstName} ${data.lastInitial}\` | \`${data.discordUserId}\``,
      });
    } else {
      await interaction.reply({
        content: `Could not find anyone`,
      });
    }
  }
}
