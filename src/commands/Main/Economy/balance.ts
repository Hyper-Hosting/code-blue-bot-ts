import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "balance",
      description: "Check a members balance",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      options: [
        {
          name: "user",
          required: false,
          description: "User you want to check",
          type: ApplicationCommandOptionType.User,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user");
    const userData = await getUser(user?.id || interaction.user.id);

    if (!userData) {
      return interaction.reply({
        content: "Failed to find user's balance!",
        flags: "Ephemeral"
      });
    }

    let name = user?.displayName || interaction.user.displayName;
    let iconURL = (user?.avatarURL() || interaction.user.avatarURL())!;
    let cash = userData.cash;
    let bank = userData.bank;

    const embed = new EmbedBuilder()
      .setTitle("Balance Checker")
      .setThumbnail(
        "https://cdn-icons-png.freepik.com/256/8176/8176383.png?semt=ais_hybrid"
      )
      .setAuthor({
        name,
        iconURL,
      })
      .setFields(
        {
          name: "Cash Balance",
          value: `\`$${cash}\``,
        },
        {
          name: "Bank Balance",
          value: `\`$${bank}\``,
        }
      )
      .setColor("#b1beeb");

    await interaction.reply({
      embeds: [embed],
    });
  }
}
