import { Collection, Events, REST, Routes } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import Command from "../../base/classes/Command";
import ServerName from "../../base/types/ServerName";
import { InventoryModel } from "../../base/models/Inventory";
import { StoreItemsModel } from "../../base/models/StoreItems";

export default class Ready extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready Event",
      once: true,
    });
  }

  async Execute() {
    console.log(`${this.client.user?.tag} is now ready!`);
    const rest = new REST().setToken(this.client.config.token);

    const setCommands = async (serverName: ServerName, serverId: string) => {
      const res: any = await rest.put(
        Routes.applicationGuildCommands(
          this.client.config.discordClientId,
          serverId
        ),
        {
          body: this.GetJson(
            this.client.commands.filter(
              (command) => command.server == serverName
            )
          ),
        }
      );

      console.log(
        `Successfully set ${res.length} application (/) commands in the ${serverName} server!`
      );
    };

    setCommands("Interview", this.client.config.interviewGuildId);
    setCommands("Main", this.client.config.mainGuildId);
    setCommands("Business", this.client.config.businessGuildId);

    const globalCommands: any = await rest.put(
      Routes.applicationCommands(this.client.config.discordClientId),
      {
        body: this.GetJson(
          this.client.commands.filter((command) => command.server == "Global")
        ),
      }
    );

    console.log(
      `Successfully set ${globalCommands.length} global application (/) commands!`
    );

    await InventoryModel;
    await StoreItemsModel;
  }

  private GetJson(commands: Collection<string, Command>) {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permission: command.default_member_permission.toString(),
      });
    });

    return data;
  }
}
