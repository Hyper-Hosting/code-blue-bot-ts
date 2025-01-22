import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import ms from "ms";
import os from "os";
const { version, dependencies } = require(`${process.cwd()}/package.json`);

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "botinfo",
      description: "Get the bots information",
      server: "Global",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      options: [],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(this.client.user?.displayAvatarURL()!)
          .setColor("Random").setDescription(`
__**Bot Information**__
> **User:** \`${this.client.user?.tag}\` - \`${this.client.user?.id}\`
> **Account Created:** <t:${(this.client.user!.createdTimestamp / 1000).toFixed(
          0
        )}:R>
> **Commands:** \`${this.client.commands.size}\`
> **Version:** \`${version}\`
> **NodeJS Version:** \`${process.version}\`
> **Dependencies (${Object.keys(dependencies).length}):** \`${Object.keys(
          dependencies
        )
          .map((p) => `${p}-V${dependencies[p]}`.replace(/\^/g, ""))
          .join(", ")}\`
> **Uptime:** \`${ms(this.client.uptime!, { long: false })}\`

__**System Information**__
> **Operating System:** \`${process.platform}\`
> **CPU:** \`${os.cpus()[0].model.trim()}\`
> **Ram Usage:** \`${this.formatBytes(
          process.memoryUsage().heapUsed
        )}\`/\`${this.formatBytes(os.totalmem())}\`

__**Developer Information**__
> **Name:** \`Dylan D.\`
> **Username:** \`@.dylan.d\`
> **GitHub Personal:** [Click Here](https://github.com/DylanD4567/)
> **GitHub Hyper Hosting:** [Click Here](https://github.com/Hyper-Hosting/)
> **Hyper Hosting:** [Click Here](https://hyperhostings.com/)
          `),
      ],
    });
  }

  private formatBytes(bytes: number) {
    if (bytes == 0) return "0";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
}
