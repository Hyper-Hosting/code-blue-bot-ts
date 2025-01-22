import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  Events,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import Command from "../../base/classes/Command";
import Interaction from "../../base/classes/Interaction";
import { checkPermission } from "../../lib/permissions";

export default class CommandHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Command handler event",
      once: false,
    });
  }

  async Execute(
    interaction:
      | ChatInputCommandInteraction
      | ButtonInteraction
      | ModalSubmitInteraction
      | StringSelectMenuInteraction
  ) {
    if (interaction.replied || interaction.deferred) return;
    if (!interaction.isChatInputCommand()) {
      const inter: Interaction | undefined = this.client.interactions.get(
        interaction.customId
      );

      if (!inter) return;

      if (inter.staffLevel) {
        const { department, level } = inter.staffLevel;
        const allowed = await checkPermission(
          interaction.user.id,
          department,
          level
        );

        if (!allowed) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription(
                  `❌ You do not have permission to run this action!`
                ),
            ],
            flags: "Ephemeral",
          });
        }
      }

      try {
        return inter.Execute(interaction);
      } catch (ex) {
        console.error(`Failed to execute interaction: ${ex}`);
      }

      return;
    }

    const command: Command = this.client.commands.get(interaction.commandName)!;

    if (!command)
      //@ts-ignore
      return (
        //@ts-ignore
        interaction.reply({
          content: "This command does not exist!",
          flags: "Ephemeral",
        }) && this.client.commands.delete(interaction.commandName)
      );

    const { cooldowns } = this.client;
    if (!cooldowns.has(command.name))
      cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name)!;
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (
      timestamps.has(interaction.user.id) &&
      now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `❌ Please wait another \`${(
                ((timestamps.get(interaction.user.id) || 0) +
                  cooldownAmount -
                  now) /
                1000
              ).toFixed(1)}\` seconds to run this command!`
            ),
        ],
        flags: "Ephemeral",
      });
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    if (command.staffLevel) {
      const { department, level } = command.staffLevel;
      const allowed = await checkPermission(
        interaction.user.id,
        department,
        level
      );

      if (!allowed) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(
                `❌ You do not have permission to run this command!`
              ),
          ],
          flags: "Ephemeral",
        });
      }
    }

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${
        subCommandGroup ? `.${subCommandGroup}` : ""
      }.${interaction.options.getSubcommand(false) || ""}`;

      return (
        this.client.subCommands.get(subCommand)?.Execute(interaction) ||
        command.Execute(interaction)
      );
    } catch (ex) {
      console.error(`Failed to execute command: ${ex}`);
    }
  }
}
