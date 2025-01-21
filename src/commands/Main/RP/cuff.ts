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
      name: "cuff",
      description: "Cuffs the person you mention",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "user",
          description: "User you want to cuff",
          type: ApplicationCommandOptionType.Mentionable,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user");

    interaction.reply({
      content: `${interaction.user}: *Places ${user} into handcuffs.*`,
    });
  }
}
