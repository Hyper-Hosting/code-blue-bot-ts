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
      name: "vehicle-search",
      description: "This will search the users vehicle",
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
        content: `${interaction.user}: *Begins searching ${user}'s vehicle.*`,
      })
      .then((msg) => {
        setTimeout(() => {
          msg.edit(
            `${interaction.user}: *Has finished searching ${user}'s vehicle, checking areas such as the glove box, center console, cup holders, under seats, beside seats, under floor mats, any drink/food containers, sunvisors, baggage/belongings, etc. What do I find in the vehicle?*`
          );
        }, 1000 * 5);
      });
  }
}
