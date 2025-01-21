import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";

export default class Cmd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "fuel",
      description: "Fuels your vehicle up",
      server: "Main",
      default_member_permission:
        PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 10,
      options: [
        {
          name: "vehicle",
          description: "The type of vehicle",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Motorbike",
              value: "motorbike",
            },
            {
              name: "Car",
              value: "car",
            },
            {
              name: "Van",
              value: "van",
            },
            {
              name: "Truck",
              value: "truck",
            },
            {
              name: "Helicopter",
              value: "helicopter",
            },
            {
              name: "Plane",
              value: "plane",
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    const vehicle = interaction.options.getString("vehicle");

    let timeLength = 1000 * 20;

    if (vehicle === "car") {
      timeLength = 1000 * 30;
    } else if (vehicle === "van") {
      timeLength = 1000 * 35;
    } else if (vehicle === "truck") {
      timeLength = 1000 * 50;
    } else if (vehicle === "helicopter") {
      timeLength = 1000 * 60;
    } else if (vehicle === "plane") {
      timeLength = 1000 * 60;
    }

    const timestamp = new Date(
      new Date().setMilliseconds(new Date().getMilliseconds() + timeLength)
    );

    interaction
      .reply(
        `${interaction.user}: *Begins fueling ${vehicle}. (Please wait <t:${(
          timestamp.getTime() / 1000
        ).toFixed(0)}:R>)*`
      )
      .then((msg) => {
        setTimeout(async () => {
          msg.edit(`${interaction.user}: *Finishes fueling ${vehicle}.*`);
        }, timeLength);
      });
  }
}
