import { StringSelectMenuInteraction, TextChannel } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { getCharacter } from "../../../db/Character";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "id_card_show",
    });
  }

  async Execute(interaction: StringSelectMenuInteraction) {
    const charId = interaction.values[0];
    const char = await getCharacter(charId);

    if (!char) {
      return interaction.update({
        content: "Character not found!",
        embeds: [],
        components: [],
      });
    }

    interaction.update({
      content: `${char.firstName} ${char.lastName} has been selected!`,
      embeds: [],
      components: [],
    });

    (interaction.channel as TextChannel).send({
      content: `${interaction.member}: *Shows ID card*`,
      files: [{ attachment: char.idCardImage }],
    });
  }
}
