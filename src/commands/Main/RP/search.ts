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
      name: "search",
      description: "This will search the users RP Character",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "user",
          description: "User you want to search",
          type: ApplicationCommandOptionType.Mentionable,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getMentionable("user");

    interaction
      .reply({
        content: `${interaction.user}: *Begins searching ${user}.*`,
      })
      .then((msg) => {
        setTimeout(async () => {
          msg.edit(
            `${interaction.user}: *Has finished searching ${user}, What do they find?*`
          );
        }, 1000 * 5);
      });
  }
}
