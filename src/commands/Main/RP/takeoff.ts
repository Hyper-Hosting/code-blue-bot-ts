import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
  TextChannel,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "takeoff",
      description: "For use with planes and helicopters",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply(
      `${interaction.user}: *begins doing the preflight checklist*`
    );

    setTimeout(() => {
      (interaction.channel as TextChannel).send(
        `${interaction.user}: *starts engine*`
      );

      setTimeout(() => {
        (interaction.channel as TextChannel).send(
          `${interaction.user}: *does final checks and prepares for takeoff*`
        );

        setTimeout(() => {
          (interaction.channel as TextChannel).send(
            `${interaction.user}: *Plane/Helicopter is ready for takeoff*`
          );
        }, 1000 * 30);
      }, 1000 * 30);
    }, 1000 * 60);
  }
}
