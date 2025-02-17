import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { CharacterModel } from "../../../base/models/Character";
import { getUser } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "characters",
      description: "List of the users characters",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "user",
          description: "User you want to check",
          type: ApplicationCommandOptionType.Mentionable,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user");
    if (!user) {
      return interaction.reply({
        content: "User not found.",
        flags: "Ephemeral",
      });
    }

    const userData = await getUser(user.id);
    if (!userData) {
      return interaction.reply({
        content: "User data not found.",
        flags: "Ephemeral",
      });
    }

    const characters = await CharacterModel.find({
      accountId: userData._id,
    });

    const embeds = characters.map((char) =>
      new EmbedBuilder()
        .setTitle(char.firstName + " " + char.lastName)
        .setImage(char.idCardImage)
    );

    interaction.reply({
      embeds,
    });
  }
}
