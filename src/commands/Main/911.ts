import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "911",
      description: "Calls 911 - Make sure to join the 911 channel",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      options: [],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: `${interaction.user}: ***Is Calling 911***`,
    });
  }
}
