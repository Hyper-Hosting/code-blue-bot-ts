import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  StringSelectMenuBuilder,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";
import { getCharacters } from "../../../db/Character";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "id",
      description: "Shows your characters ID card",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      options: [],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = await getUser(interaction.user.id);
    if (!user) {
      return interaction.reply({
        flags: "Ephemeral",
        content: "No user found.",
      });
    }

    const characters = await getCharacters(user._id);

    let options = [];

    for (const char of characters) {
      if (char.idCardImage) {
        options.push({
          label: `${char.firstName} ${char.lastName}`,
          value: `${char._id}`,
        });
      }
    }

    if (!options[0]) {
      return interaction.reply({
        content: "No ID cards found.",
        flags: "Ephemeral",
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#0b73bc")
      .setTitle("ID Card")
      .setDescription("Please choose a character!");

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("id_card_show")
        .setMinValues(0)
        .setMaxValues(1)
        .addOptions(options)
    );

    interaction.reply({
      embeds: [embed],
      components: [row],
      flags: "Ephemeral",
    });
  }
}
