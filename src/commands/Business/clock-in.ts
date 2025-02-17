import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import { ClockedInModel } from "../../base/models/Clocked-In";
import { BusinessModel } from "../../base/models/Business-old";
import { getUser } from "../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "clock-in",
      description: "Start your shift by clocking in",
      server: "Business",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.channel) {
      return interaction.reply({
        content: "This command can only be used in a server.",
        flags: "Ephemeral",
      });
    }

    const businessData = await BusinessModel.findOne({
      clockInChannelId: interaction.channel.id,
    });

    if (businessData) {
      const userData = await getUser(interaction.user.id);

      if (!userData) {
        return interaction.reply({
          content: "I cannot find your account",
          flags: "Ephemeral",
        });
      }

      const clockInData = await ClockedInModel.findOne({
        accountId: userData._id,
      });

      if (clockInData?.endTime && clockInData.endTime > new Date()) {
        return interaction.reply({
          content: "You are already clocked in!",
          flags: "Ephemeral",
        });
      }

      let endTimestamp = new Date(
        new Date().setMinutes(new Date().getMinutes() + 20)
      );

      const embed = new EmbedBuilder()
        .setTitle(`${businessData.name} | Clocked In`)
        .setColor("Green")
        .setFields(
          {
            name: "Employee",
            value: `${interaction.user} | ${interaction.user.displayName}`,
          },
          {
            name: "Start Time",
            value: `<t:${(new Date().getTime() / 1000).toFixed(0)}:t> | <t:${(
              new Date().getTime() / 1000
            ).toFixed(0)}:R>`,
          },
          {
            name: "End Time",
            value: `<t:${(endTimestamp.getTime() / 1000).toFixed(0)}:t> | <t:${(
              endTimestamp.getTime() / 1000
            ).toFixed(0)}:R>`,
          }
        );

      await ClockedInModel.findOneAndUpdate(
        {
          accountId: userData._id,
        },
        {
          businessId: businessData._id,
          channelId: interaction.channel.id,
          endTime: endTimestamp,
        },
        {
          upsert: true,
        }
      );

      interaction.reply({
        embeds: [embed],
      });
    }
  }
}
