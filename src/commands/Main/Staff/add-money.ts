import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { addBankBalance } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "add-money",
      description: "Adds money to a users balance",
      server: "Main",
      staffLevel: StaffLevels.commander,
      default_member_permission: PermissionsBitField.Flags.ManageRoles,
      cooldown: 3,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to add money to",
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "amount",
          required: true,
          description: "Amount of money to add",
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

    const moneyAdded = await addBankBalance(user.id, amount);

    if (moneyAdded) {
      interaction.reply({
        content: `Added \`$${amount}\` to ${user}'s balance`,
      });
    } else {
      interaction.reply({
        content: `Failed to add money to ${user}'s balance`,
        flags: "Ephemeral",
      });
    }
  }
}
