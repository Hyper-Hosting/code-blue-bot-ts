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
      name: "tow",
      description: "Tow's a person's vehicle",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "license-plate",
          description: "The license plate of the vehicle being towed",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const plate = interaction.options.getString("license-plate");

    interaction.reply(`${interaction.user}: *Calls tow*`);
    setTimeout(() => {
      (interaction.channel as TextChannel).send(
        `${interaction.user}: *Tow gets dispatched out to get vehicle*`
      );

      setTimeout(() => {
        (interaction.channel as TextChannel).send(
          `${interaction.user}: *Tow collects vehicle with plate \`${plate}\`*`
        );
      }, 1000 * 4);
    }, 1000 * 3);
  }
}
