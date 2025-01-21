import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { UsersModel } from "../../../base/models/User";
import { getUser } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "pay",
      description: "Pay someone with your money",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "user",
          description: "User you want to pay",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "amount",
          description: "Amount of money to pay",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user")!;
    const amount = interaction.options.getInteger("amount")!;

    const userData = await getUser(interaction.user.id);
    if (!userData) {
      return interaction.reply({
        content: `${interaction.user} you do not have an account!`,
        flags: "Ephemeral",
      });
    }

    if (userData.cash < amount) {
      return interaction.reply({
        content: `${interaction.user} you do not have enough cash!`,
        flags: "Ephemeral",
      });
    }

    await UsersModel.findOneAndUpdate(
      {
        discordUserId: interaction.user.id,
      },
      {
        $inc: {
          cash: -amount,
        },
      }
    );

    await UsersModel.findOneAndUpdate(
      {
        discordUserId: user.id,
      },
      {
        $inc: {
          cash: amount,
        },
      }
    );

    interaction.reply({
      content: `${interaction.user} sent \`$${amount}\` to ${user}`,
    });
  }
}
