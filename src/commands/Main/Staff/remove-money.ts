import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { removeBankBalance } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "remove-money",
      description: "Removes money from a users balance",
      server: "Main",
      staffLevel: StaffLevels.commander,
      default_member_permission: PermissionsBitField.Flags.ManageRoles,
      cooldown: 3,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to remove money from",
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "amount",
          required: true,
          description: "Amount of money to remove",
          type: ApplicationCommandOptionType.Integer,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (!user || !amount) {
      return interaction.reply({
        content: "Invalid user or amount",
        flags: "Ephemeral",
      });
    }

    const moneyRemoved = await removeBankBalance(user.id, amount);

    if (moneyRemoved) {
      interaction.reply({
        content: `Removed \`$${amount}\` from ${user}'s balance`,
      });
    } else {
      interaction.reply({
        content: `Failed to remove money from ${user}'s balance`,
        flags: "Ephemeral",
      });
    }
  }
}
