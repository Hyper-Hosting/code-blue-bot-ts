import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";
import { UsersModel } from "../../../base/models/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "withdraw",
      description: "Withdraw money out of your bank account",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "amount",
          description: "The amount to withdraw",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger("amount")!;
    const discordUserId = interaction.user.id;
    const userData = await getUser(discordUserId);

    if (!userData) {
      return interaction.reply({
        content: `No account data found`,
        flags: "Ephemeral",
      });
    }

    let bank = userData.bank;

    if (bank < amount) {
      return interaction.reply({
        content: `Not enough money in your bank account`,
        flags: "Ephemeral",
      });
    } else {
      await UsersModel.findOneAndUpdate(
        {
          discordUserId,
        },
        {
          $inc: {
            cash: amount,
            bank: -amount,
          },
        }
      );

      interaction.reply({
        content: `${interaction.user} has withdrew \`$${amount}\``,
      });
    }
  }
}
