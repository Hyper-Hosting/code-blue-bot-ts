import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import { StaffLevels } from "../../../base/types/StaffLevels";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "briefing-play",
      description: "Plays the briefing script",
      server: "Main",
      staffLevel: StaffLevels.trainee,
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      options: [],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "Playing Briefing",
      flags: "Ephemeral",
    });

    const player = createAudioPlayer();
    const connection = joinVoiceChannel({
      channelId: "1200513090559676467",
      guildId: interaction.guild!.id,
      adapterCreator: interaction.guild!.voiceAdapterCreator,
    });

    connection.subscribe(player);

    let resource = createAudioResource(
      require("path").join(__dirname, `../../../../public/audio/briefing-general.mp3`)
    );
    
    player.play(resource);

    player.once(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  }
}
