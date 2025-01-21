import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  TextChannel,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "loa",
      description: "Request an LOA",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 60,
      options: [
        {
          name: "duration",
          description: "How long is your LOA",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "reason",
          description: "The reason for your LOA",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const reason = interaction.options.getString("reason")!;
    const duration = interaction.options.getString("duration")!;

    const user = await getUser(interaction.user.id);

    if (!user) {
      return interaction.reply({
        content: "You must have an account to use this command!",
        flags: "Ephemeral",
      });
    }

    const department = user.mainDepartment;

    const embed = new EmbedBuilder()
      .setTitle("LOA Request")
      .setColor("Aqua")
      .setFields(
        {
          name: "Member",
          value: `${interaction.user}`,
        },
        {
          name: "Department",
          value: department,
        },
        {
          name: "Duration",
          value: duration,
        },
        {
          name: "Reason",
          value: reason,
        }
      );

    let depMention = "";

    if (department == "civ") {
      depMention =
        "<@&1267610687178408047> <@&1267611867988234281> <@&1267611878536773846>";
    } else if (department == "police") {
      depMention =
        "<@&1267610549739327620> <@&1267611695216332892> <@&1320067329664483380> <@&1320066374428786841>";
    } else if (department == "sacd") {
      depMention = "<@&1267611322728841246>";
    } else if (department == "safr") {
      depMention =
        "<@&1267611367301582889> <@&1267612225267306587> <@&1267612227314126999>";
    }

    interaction.reply({
      content: "Your LOA request has been sent!",
      flags: "Ephemeral",
    });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("accept-loa")
        .setLabel("Accept")
        .setStyle(3),

      new ButtonBuilder()
        .setCustomId("deny-loa-modal")
        .setLabel("Deny")
        .setStyle(4)
    );

    try {
      const loaRequestChl = (await interaction.guild!.channels.fetch(
        "1331012381173743647"
      )) as TextChannel;

      if (loaRequestChl) {
        loaRequestChl.send({
          content: depMention,
          embeds: [embed],
          components: [row],
        });
      }
    } catch (error) {
      console.error(`Failed to send LOA request: ${error}`);
    }
  }
}
