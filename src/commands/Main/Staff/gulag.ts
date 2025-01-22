import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  OverwriteType,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { getUser } from "../../../db/User";
import { UiLogModel } from "../../../base/models/UiLog";
import { IWarnings, WarningModel } from "../../../base/models/Warning";
import { IUser } from "../../../base/models/User";
import { UiRolesModel } from "../../../base/models/UiRoles";
const mainServerData = require(`${process.cwd()}/_data/mainServerData.json`);

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "gulag",
      description: "This will create a Gulag channel for the member",
      server: "Main",
      staffLevel: StaffLevels.bod,
      default_member_permission: PermissionsBitField.Flags.Administrator,
      cooldown: 3,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to Gulag",
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "reason",
          required: false,
          description: "Reason for the Gulag",
          type: ApplicationCommandOptionType.String,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user")!;
    const reason = interaction.options.getString("reason");

    await interaction.deferReply({
      flags: "Ephemeral",
    });

    const userId = user.id;
    var member: GuildMember | null = null;

    try {
      member = await interaction.guild!.members.fetch(userId);
    } catch (error) {
      return interaction.followUp({
        content: "User not found",
      });
    }

    const userData = await getUser(userId);
    if (!userData || !member) {
      return interaction.followUp({
        content: "User data not found",
      });
    }

    let reasonText = "";

    if (reason) reasonText = ` for the following reason: \`${reason}\``;
    let logId = 0;

    const prevResult = await UiLogModel.find()
      .sort({
        logId: -1,
      })
      .limit(1);

    if (prevResult[0]) {
      logId = prevResult[0].logId + 1;
    } else logId = 1;

    let permissionOverwrites = [
      {
        id: interaction.guild!.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: `${userId}`,
        type: OverwriteType.Member,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      },
    ];

    interaction
      .guild!.channels.create({
        name: `ui-${member.displayName}`,
        parent: mainServerData.GULAG_CATEGORY_ID,
        permissionOverwrites,
      })
      .then(async (chl) => {
        await new UiLogModel({
          logId,
          userId,
          userNickname: member!.displayName,
          channelId: chl.id,
        }).save();

        chl.setTopic(userId);

        await interaction.followUp({
          content: `New UI channel created: ${chl}`,
        });

        const embed = new EmbedBuilder()
          .setTitle("Under Investigation")
          .setColor("#0b73bc")
          .setThumbnail(interaction.guild!.iconURL())
          .setDescription(
            `${member} You have been placed in under investigation${reasonText}. Staff will be with you soon, please wait patiently.`
          )
          .setFooter({
            text: "- Code Blue Staff Team",
          });

        const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("close-gulag")
            .setLabel("Close Gulag")
            .setStyle(4)
        );

        let warningEmbed = new EmbedBuilder()
          .setColor("#0dff00")
          .setDescription("No previous warnings");

        const warnings = await WarningModel.find<
          IWarnings & {
            staffId: IUser;
          }
        >({
          accountId: userData._id,
        }).populate({
          path: "staffId",
        });

        if (warnings[0]) {
          let text = [];

          for (const warning of warnings) {
            text.push({
              name: `ID: ${warning._id} | Staff: ${warning.staffId.firstName} ${warning.staffId.lastInitial}`,
              value: `${warning.description}`,
            });
          }

          warningEmbed
            .setDescription(null)
            .setColor("#ffcc00")
            .setFields(text)
            .setAuthor({
              name: `${member!.displayName} has ${
                warnings.length
              } Previous Warnings`,
              iconURL: member!.user.displayAvatarURL(),
            });
        }

        chl.send({
          embeds: [embed, warningEmbed],
          components: [row1],
        });

        const roles = member!.roles.cache;
        let listRoleIDs = [];

        for (const role of roles) {
          if (role[0] !== interaction.guild!.id) {
            listRoleIDs.push(role[0]);
            await member!.roles.remove(role[0]);
          }
        }

        try {
          await member!.roles.add(mainServerData.GULAG_ROLE);
        } catch (error) {
          chl.send("# ERROR\nNo Gulag role set.");
        }

        await UiRolesModel.findOneAndUpdate(
          {
            userId: member!.id,
          },
          {
            roles: listRoleIDs,
          },
          {
            upsert: true,
          }
        );
      });
  }
}
