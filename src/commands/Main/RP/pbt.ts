import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "pbt",
      description: "Portable Breathalyzer Test | LSPD Port Authority Bureau",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "user",
          description: "User you want to test",
          type: ApplicationCommandOptionType.Mentionable,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getMentionable("user");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("pbt_result")
        .setLabel("Breathalyzer Result")
        .setStyle(1)
    );

    interaction.reply({
      content: `${interaction.user}: *Grabs breathalyzer kit and asks ${user} to blow into the tube*`,
      components: [row],
    });
  }
}
