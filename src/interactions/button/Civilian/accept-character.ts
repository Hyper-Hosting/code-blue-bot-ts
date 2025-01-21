import { ButtonInteraction } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { getUser } from "../../../db/User";
import { CharacterModel } from "../../../base/models/Character";
import { StaffLevels } from "../../../base/types/StaffLevels";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "accept-character",
      staffLevel: StaffLevels.civ_trainee,
    });
  }

  async Execute(interaction: ButtonInteraction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    const staffUser = await getUser(interaction.user.id);

    if (!staffUser || (staffUser.civ.staffLevel || 99) >= 99) {
      return interaction.followUp("You are not civilian staff.");
    }

    const userId = interaction.message.content
      .split("## Member: <@")[1]
      .split(">")[0];

    const charId = interaction.message.content
      .split("Character ID:** [")[1]
      .split("]")[0];

    const character = await CharacterModel.findOne({
      _id: charId,
    });

    if (!character) return interaction.followUp("No character data found.");

    await CharacterModel.findOneAndUpdate(
      {
        _id: charId,
      },
      {
        pendingApproval: false,
        pendingChanges: false,
        changes: null,
      }
    );

    try {
      const members = await interaction.guild!.members.fetch();
      const member = members.get(userId);

      if (member) {
        member.send(`Your character approval has been accepted!`);
      }

      interaction.followUp(`Character approval has been accepted.`);
      interaction.message.delete();
    } catch (error) {
      console.error(`Error accepting character: ${error}`);
    }
  }
}
