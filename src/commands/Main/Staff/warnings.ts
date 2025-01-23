import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { IWarnings, WarningModel } from "../../../base/models/Warning";
import { IUser } from "../../../base/models/User";
import { getUser } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "warnings",
      description: "View a users warnings",
      server: "Main",
      staffLevel: StaffLevels.trainee,
      default_member_permission: PermissionsBitField.Flags.ManageRoles,
      cooldown: 5,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to warn",
          type: ApplicationCommandOptionType.User,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user")!;
    const userData = await getUser(user.id);

    if (!userData) {
      return interaction.reply({
        content: "User not found",
        flags: "Ephemeral",
      });
    }

    const data = await WarningModel.find<
      IWarnings & {
        accountId: IUser;
        staffId: IUser;
      }
    >({
      accountId: userData._id,
    }).populate({
      path: "staffId accountId",
    });

    let textServer = "";
    let textDepartment = "";

    for (const warning of data) {
      const date = new Date(warning.createdAt);

      if (warning.type === "server")
        textServer += `\`\`\`ID: ${warning._id}
Staff: ${warning.staffId.firstName} ${warning.staffId.lastInitial}
Warning: ${warning.description}
Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}\`\`\`\n`;

      if (warning.type === "department")
        textDepartment += `\`\`\`ID: ${warning._id}
Staff: ${warning.staffId.firstName} ${warning.staffId.lastInitial}
Warning: ${warning.description}
Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}\`\`\`\n`;
    }

    if (textServer === "") textServer = "No results found";
    if (textDepartment === "") textDepartment = "No results found";

    const embedServer = new EmbedBuilder()
      .setTitle(`${user.username}'s Server Warnings`)
      .setDescription(textServer)
      .setColor("#0b73bc");

    const embedDepartment = new EmbedBuilder()
      .setTitle(`${user.username}'s Department Warnings`)
      .setDescription(textDepartment)
      .setColor("#0b73bc");

    interaction.reply({
      embeds: [embedServer, embedDepartment],
    });
  }
}
