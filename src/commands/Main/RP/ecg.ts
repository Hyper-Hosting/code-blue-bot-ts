import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ecg",
      description: "This will show the proper ECG display",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "type",
          description: "The type of ECG",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "A",
              value: "a",
            },
            {
              name: "B",
              value: "b",
            },
            {
              name: "N",
              value: "n",
            },
            {
              name: "T",
              value: "t",
            },
            {
              name: "VF",
              value: "vf",
            },
            {
              name: "VT",
              value: "vt",
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const type = interaction.options.getString("type");

    let picture =
      "https://cdn.discordapp.com/attachments/819828612495835137/918369809547280404/IMG_8907.gif";

    if (type === "b") {
      picture =
        "https://cdn.discordapp.com/attachments/819828612495835137/918369916887916574/IMG_8904.gif";
    } else if (type === "n") {
      picture =
        "https://cdn.discordapp.com/attachments/819828612495835137/918370002497835038/IMG_8902.gif";
    } else if (type === "t") {
      picture =
        "https://cdn.discordapp.com/attachments/819828612495835137/918369942171172904/IMG_8903.gif";
    } else if (type === "vf") {
      picture =
        "https://cdn.discordapp.com/attachments/819828612495835137/918369879638302740/IMG_8908.gif";
    } else if (type === "vt") {
      picture =
        "https://cdn.discordapp.com/attachments/819828612495835137/918369852538904636/IMG_8905.gif";
    }

    const embed = new EmbedBuilder()
      .setTitle("ECG:")
      .setImage(picture)
      .setColor("#0b73bc")
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
      });

    interaction.reply({
      embeds: [embed],
    });
  }
}
