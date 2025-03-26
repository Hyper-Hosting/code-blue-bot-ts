import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { IInventory, InventoryModel } from "../../../base/models/Inventory";
import { IStoreItems } from "../../../base/models/StoreItems";
import { getCharacter } from "../../../db/Character";
import { getItemByPlate } from "../../../db/inventory";
import { getUser } from "../../../db/User";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "plate-check",
      description: "Check a plate on the CAD/MDT",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 5,
      options: [
        {
          name: "plate",
          description: "The plate to check",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ flags: "Ephemeral" });

    const user = await getUser(interaction.user.id);

    if (!user?.police.joined && !user?.sacd.joined && !user?.safr.joined) {
      return interaction.editReply({
        content: "You must be a government official to use this command!",
      });
    }

    const plate = interaction.options.getString("plate")!;
    const result = await getItemByPlate(plate);

    if (!result) {
      return interaction.editReply({
        content: `No results found for plate: ${plate}`,
      });
    }

    const character = await getCharacter(result.characterId);

    if (!character) {
      return interaction.editReply({
        content: `No character found for plate: ${plate}`,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`Information on the Plate - ${result.plate}`)
      .setDescription(
        `**Name:** ${result.itemId.itemName}\n**Colour:** ${
          result.color
        }\n**Reg Status:** ${result.regStatus}\n**Expiration:** ${new Date(
          result.expiration
        ).toDateString()}`
      )
      .setImage(character.idCardImage)
      .setThumbnail(result.itemId.itemImages[0]);

    await interaction.editReply({ embeds: [embed] });
  }
}
