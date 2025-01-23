import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  TextChannel,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { WarningModel } from "../../../base/models/Warning";
import { getUser } from "../../../db/User";
const serverData = require(process.cwd() + "/_data/mainServerData.json");

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "warn",
      description: "This will warn the member",
      server: "Main",
      staffLevel: StaffLevels.depStaff,
      default_member_permission: PermissionsBitField.Flags.ManageRoles,
      cooldown: 5,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to warn",
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "type",
          required: true,
          description: "The type of warning",
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: "Server Warn",
              value: "server",
            },
            {
              name: "Department Warn",
              value: "department",
            },
          ],
        },
        {
          name: "warning",
          required: true,
          description: "What is the warning?",
          type: ApplicationCommandOptionType.String,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user")!;
    const type = interaction.options.getString("type")!;
    const warning = interaction.options.getString("warning")!;

    const userData = await getUser(user.id);
    const staffData = await getUser(interaction.user.id);

    if (!userData || !staffData) {
      return interaction.reply({
        content: "User or staff data not found",
        flags: "Ephemeral",
      });
    }

    const warningData = await new WarningModel({
      accountId: userData._id,
      staffId: staffData._id,
      type,
      description: warning,
    }).save();

    interaction.reply({
      content: `Successfully warned ${user.displayName} (${user}) with the following reason: \`${warning}\``,
    });

    if (serverData.MOD_LOGS_CHANNEL_ID) {
      const embed = new EmbedBuilder()
        .setColor("#ffcc00")
        .setAuthor({
          iconURL: user.displayAvatarURL(),
          name: `${user.username}`,
        })
        .setDescription(
          `Member Warned: **${user.displayName}** ${user}\nWarned By: **${
            interaction.user.displayName
          }** ${
            interaction.user
          }\nReason: **${warning}**\nType: **${type}**\n\n<t:${(
            new Date().getTime() / 1000
          ).toFixed(0)}:F>`
        )
        .setFooter({
          text: `ID: ${warningData._id}`,
        });

      try {
        const modLogsChannel = (await interaction.guild!.channels.fetch(
          serverData.MOD_LOGS_CHANNEL_ID
        )) as TextChannel;

        modLogsChannel.send({
          embeds: [embed],
        });
      } catch (error) {
        console.error(`Error sending warning log: ${error}`);
      }
    }
  }
}
