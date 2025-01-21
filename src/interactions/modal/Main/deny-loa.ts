import { ModalSubmitInteraction } from "discord.js";
import Interaction from "../../../base/classes/Interaction";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";

export default class Inter extends Interaction {
  constructor(client: CustomClient) {
    super(client, {
      name: "deny-loa",
      staffLevel: StaffLevels.hod,
    });
  }

  async Execute(interaction: ModalSubmitInteraction) {
    await interaction.deferUpdate();

    const reason = interaction.fields.fields.toJSON()[0].value.trim();
    const memberId = interaction
      .message!.embeds[0].data.fields![0].value.replace("<@", "")
      .replace(">", "");

    try {
      const member = interaction.guild!.members.cache.get(memberId);

      if (member) {
        member.send(
          `Your LOA has been rejected for the following reason: \`${reason}\``
        );
      }
    } catch (error) {
      console.error(`Failed to send LOA rejection message: ${error}`);
    }

    interaction.message!.delete();
    interaction.followUp({
      content: "The LOA has been denied.",
      flags: "Ephemeral",
    });
  }
}
