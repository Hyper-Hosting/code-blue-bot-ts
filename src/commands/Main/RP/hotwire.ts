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
      name: "hotwire",
      description: "This will begin hotwiring the vehicle",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "colour",
          description: "The colour of the vehicle your trying to hotwire",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "license-plate",
          description:
            "The license plate of the vehicle your trying to hotwire",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "model",
          description: "The model of the vehicle your trying to hotwire",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const colour = interaction.options.getString("colour");
    const model = interaction.options.getString("model");
    const plate = interaction.options.getString("license-plate");

    const hotwire = [
      `${interaction.user}: *Has hotwired a \`${colour} ${model}\` with the License Plate of: \`${plate}\`.*`,
      `${interaction.user}: *Has hotwired a \`${colour} ${model}\` with the License Plate of: \`${plate}\`.*`,
      `${interaction.user}: *Has hotwired a \`${colour} ${model}\` with the License Plate of: \`${plate}\`.*`,
      `${interaction.user}: *Has failed hotwiring a \`${colour} ${model}\` with the License Plate of: \`${plate}\`.*`,
    ];
    const random = hotwire[Math.floor(Math.random() * hotwire.length)];

    interaction
      .reply(`${interaction.user}: *Begins hotwiring a vehicle.*`)
      .then((msg) => {
        setTimeout(async () => {
          msg.edit(random);
        }, 1000 * 30);
      });
  }
}
