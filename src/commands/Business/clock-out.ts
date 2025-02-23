import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";
import { ClockedInModel } from "../../base/models/Clocked-In";
import { getUser } from "../../db/User";
import { ShiftModel } from "../../base/models/Shifts";
import { BusinessModel } from "../../base/models/Business";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "clock-out",
      description: "End your shift by clocking out",
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
      clockInChannel: interaction.channel.id,
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

      if (!clockInData) {
        return interaction.reply({
          content: "You are not clocked in!",
          flags: "Ephemeral",
        });
      }

      if (clockInData.businessId.toString() !== businessData._id.toString()) {
        return interaction.reply({
          content: "You are not clocked in at this business!",
          flags: "Ephemeral",
        });
      }

      if (clockInData.endTime > new Date()) {
        return interaction.reply({
          content: "You have not completed the full 20 minute shift!",
          flags: "Ephemeral",
        });
      }

      await ShiftModel.findOneAndUpdate(
        {
          accountId: userData._id,
          businessId: businessData._id,
        },
        {
          $inc: {
            amount: 1,
          },
        },
        {
          upsert: true,
        }
      );

      await ClockedInModel.findOneAndDelete({
        accountId: userData._id,
      });

      interaction.reply({
        content: `${interaction.user} You have now clocked out.`,
      });
    }
  }
}
