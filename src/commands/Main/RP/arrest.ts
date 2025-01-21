import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  TextChannel,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "arrest",
      description: "Jails the user for a set amount of time",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to arrest",
          type: ApplicationCommandOptionType.Mentionable,
        },
        {
          name: "minutes",
          required: true,
          description: "Length of time in minutes to arrest the user for",
          type: ApplicationCommandOptionType.Number,
        },
        {
          name: "seconds",
          required: true,
          description: "Length of time in seconds to admit the user for",
          type: ApplicationCommandOptionType.Number,
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getMentionable("user")!;
    const minutes = interaction.options.getNumber("minutes")!;
    const seconds = interaction.options.getNumber("seconds")!;

    const currentTime = new Date();
    let arrestTime = currentTime.setMinutes(currentTime.getMinutes() + minutes);
    arrestTime = currentTime.setSeconds(currentTime.getSeconds() + seconds);

    let embed = new EmbedBuilder()
      .setTitle("Los Santos Jail")
      .setColor("#fd5426")
      .setDescription(`${interaction.user} has put ${user} in Jail.`)
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/5300/5300062.png")
      .addFields({
        name: "You will be released in:",
        value: `<t:${(new Date(arrestTime).getTime() / 1000).toFixed(0)}:R>`,
      });

    interaction
      .reply({
        embeds: [embed],
      })
      .then((msg) => {
        const timer = () => {
          const newTime = new Date();

          if (newTime < new Date(arrestTime)) {
            setTimeout(() => {
              timer();
            }, 1000);
          } else {
            embed = embed.setFields({
              name: "You will be released in:",
              value: `**YOU HAVE BEEN RELEASED**`,
            });

            msg.edit({
              embeds: [embed],
            });

            (interaction.channel as TextChannel).send(
              `${user}: **HAS BEEN RELEASED FROM JAIL**`
            );
          }
        };

        timer();
      });
  }
}
