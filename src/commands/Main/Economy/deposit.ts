import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";
import { UsersModel } from "../../../base/models/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "deposit",
      description: "Deposit cash into your bank account",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "amount",
          required: true,
          description: "The amount to deposit",
          type: ApplicationCommandOptionType.Integer,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger("amount");
    const discordUserId = interaction.user.id;
    const userData = await getUser(discordUserId);

    if (!userData) {
      return interaction.reply({
        content: `Failed to find your account!`,
        flags: "Ephemeral",
      });
    }

    if (!amount) {
      return interaction.reply({
        content: `You did not provide an amount!`,
        flags: "Ephemeral",
      });
    }

    let cash = userData.cash;

    if (cash < amount) {
      return interaction.reply({
        content: `You do not have enough cash to deposit $${amount}`,
        flags: "Ephemeral",
      });
    } else {
      await UsersModel.findOneAndUpdate(
        {
          discordUserId,
        },
        {
          $inc: {
            cash: -amount,
            bank: amount,
          },
        },
        {
          upsert: true,
        }
      );

      interaction.reply({
        content: `${interaction.user} has deposited $${amount}`,
      });
    }
  }
}
