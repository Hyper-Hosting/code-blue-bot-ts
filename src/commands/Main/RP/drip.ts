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
      name: "drip",
      description: "This will hang up and drip a medication",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "amount",
          description: "Amount of medication (e.g. 1L)",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "medication",
          description: "Type of medication (e.g. LR)",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getString("amount");
    const medication = interaction.options.getString("medication");

    const embed = new EmbedBuilder()
      .setImage("https://c.tenor.com/M06CZ7WFAtYAAAAC/hospital.gif")
      .setColor("#0b73bc")
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
      })
      .setTitle("Drip:");

    interaction
      .reply({
        content: `${interaction.user}: *Hangs up ${amount} of ${medication}.*`,
        embeds: [embed],
      })
      .then((msg) => {
        setTimeout(async () => {
          msg.edit(
            `${interaction.user}: *Begins ${amount} drip of ${medication}.*`
          );
        }, 1000 * 60);
      });
  }
}
