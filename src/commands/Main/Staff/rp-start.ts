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
import { StaffLevels } from "../../../base/types/StaffLevels";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "rp-start",
      description:
        "Start the RP | Does not need to be ran in #rp-announcements",
      server: "Main",
      staffLevel: StaffLevels.trainee,
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 60,
      options: [
        {
          name: "gamertag",
          description: "What is the gamertag?",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const gamertag = interaction.options.getString("gamertag");

    const embed = new EmbedBuilder()
      .setTitle("RP Session Up")
      .setColor("Aqua")
      .setDescription(
        `Join Briefing then add \`${gamertag}\` as a friend on Xbox. Proceed to send a message and put your name and callsign and rank (e.g \`John D. [CIV-123]\` or \`Trooper - John D. [S-106]\`)
   
Ensure you are appearing offline before you send the message.
   
After you have completed the steps above please remain patient while you are awaiting for the person to add you back. Once they've added you back you may join the game through their profile.

***Please note you can only join RP if you are Prob. Officer+ or Poverty Class+***

Once you are in the game you must click the button below to mark your attendance.`
      );

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("joined-game")
        .setLabel("Joined Game")
        .setStyle(1)
    );

    try {
      const channel = (await interaction.guild!.channels.fetch(
        "1200510621985296415"
      )) as TextChannel;

      channel.send({
        content: "@everyone",
        embeds: [embed],
        components: [row],
      });
    } catch (error) {
      console.error(`An error occurred sending RP announcement: ${error}`);
      interaction.reply({
        content:
          "An error occurred while sending the announcement, `Could not find channel`.",
        flags: "Ephemeral",
      });
    }

    interaction.reply({
      content: "I have sent the announcement.",
      flags: "Ephemeral",
    });
  }
}
