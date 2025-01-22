import { ModalSubmitInteraction } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import { CharacterModel } from "../../../base/models/Character";
import { getUser } from "../../../db/User";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "deny-character-submit",
      staffLevel: StaffLevels.hod,
    });
  }

  async Execute(interaction: ModalSubmitInteraction) {
    await interaction.deferReply({
      flags: "Ephemeral",
    });

    const staffUser = await getUser(interaction.user.id);

    if (!staffUser || (staffUser.civ.staffLevel || 99) >= 99) {
      return interaction.followUp("You are not civilian staff.");
    }

    const questions = interaction.fields.fields.toJSON();
    let reason = questions[0].value.toLowerCase().trim();
    const userId = interaction
      .message!.content.split("## Member: <@")[1]
      .split(">")[0];

    const charId = interaction
      .message!.content.split("Character ID:** [")[1]
      .split("]")[0];

    const character = await CharacterModel.findOne({
      _id: charId,
    }).populate("accountId");

    if (!character) return interaction.followUp("No character data found.");

    await CharacterModel.findOneAndUpdate(
      {
        _id: charId,
      },
      {
        pendingApproval: false,
        pendingChanges: true,
        changes: reason,
      }
    );

    const members = await interaction.guild!.members.fetch();
    const member = members.get(userId);

    if (member) {
      member.send(
        `Your character approval has been denied for the following reason:\n\`${reason}\`\nEdit character: https://code-blue.hyperhostings.com/dashboard/cad/civ/character_selection/${charId}`
      );
    }

    interaction.followUp(`Character approval has been denied.`);
    interaction.message!.delete();
  }
}
