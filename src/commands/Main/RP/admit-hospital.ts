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
      name: "admit-hospital",
      description: "Admits the member into the hospital",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 1,
      options: [
        {
          name: "user",
          required: true,
          description: "User you want to admit",
          type: ApplicationCommandOptionType.Mentionable,
        },
        {
          name: "minutes",
          required: true,
          description: "Length of time in minutes to admit the user for",
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
    let admitTime = currentTime.setMinutes(currentTime.getMinutes() + minutes);
    admitTime = currentTime.setSeconds(currentTime.getSeconds() + seconds);

    let embed = new EmbedBuilder()
      .setTitle("Medical Centre")
      .setColor("#57a4ff")
      .setDescription(
        `${interaction.user} has admitted ${user} to the medical centre.`
      )
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/2878/2878659.png")
      .addFields({
        name: "You will be discharged in:",
        value: `<t:${(new Date(admitTime).getTime() / 1000).toFixed(0)}:R>`,
      });

    interaction
      .reply({
        embeds: [embed],
      })
      .then((msg) => {
        const timer = () => {
          const newTime = new Date();

          if (newTime < new Date(admitTime)) {
            setTimeout(() => {
              timer();
            }, 1000);
          } else {
            embed = embed.setFields({
              name: "You will be discharged in:",
              value: `**YOU HAVE BEEN RELEASED**`,
            });

            msg.edit({
              embeds: [embed],
            });

            (interaction.channel as TextChannel).send(
              `${user}: **HAS BEEN RELEASED FROM THE MEDICAL CENTRE**`
            );
          }
        };

        timer();
      });
  }
}
