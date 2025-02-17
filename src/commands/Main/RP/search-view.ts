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
      name: "search-view",
      description: "This will search for any items in your view.",
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
        content: `${interaction.user}: *Looks through windows of ${user}'s car.*`,
      })
      .then((msg) => {
        setTimeout(async () => {
          msg.edit(
            `${interaction.user}: *Has finished Visibly Inspecting ${user}'s vehicle. Observing all areas able to be seen on visible inspection such as: Drivers seat, Passenger seat, Open Gloveboxes, Cup Holders, Rear Seats, Opposite side door panels, Dashboard, Floorboards etc. Looks/ Smells for any odours emanating from vehicle or any occupants. Can I see/smell anything from person or vehicle?*`
          );
        }, 1000 * 5);
      });
  }
}
