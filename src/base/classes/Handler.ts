import IHandler from "../interfaces/IHandler";
import path from "path";
import { glob } from "glob";
import CustomClient from "./CustomClient";
import Event from "./Event";
import Command from "./Command";
import SubCommand from "./SubCommand";
import Interaction from "./Interaction";
import Feature from "./Feature";
import GuildMemberAdd from "./GuildMemberAdd";
import GuildMemberRemove from "./GuildMemberRemove";

export default class Handler implements IHandler {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  async LoadEvents() {
    const files = (await glob(`build/events/**/*.js`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name.`)
        );

      const execute = (...args: any) => event.Execute(...args);

      // @ts-ignore
      if (event.once) this.client.once(event.name, execute);
      // @ts-ignore
      else this.client.on(event.name, execute);

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadCommands() {
    const files = (await glob(`build/commands/**/*.js`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const command: Command | SubCommand = new (await import(file)).default(
        this.client
      );

      if (!command.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name.`)
        );

      if (file.split("/").pop()?.split(".")[2])
        return this.client.subCommands.set(command.name, command);

      this.client.commands.set(command.name, command as Command);

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadInteractions() {
    const files = (await glob(`build/interactions/**/*.js`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const interaction: Interaction = new (await import(file)).default(
        this.client
      );

      if (!interaction.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name.`)
        );

      this.client.interactions.set(
        interaction.name,
        interaction as Interaction
      );

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadFeatures() {
    const files = (await glob(`build/features/**/*.js`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const feature: Feature = new (await import(file)).default(this.client);
      feature.Execute();

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadGuildMemberAdd() {
    const files = (
      await glob(`build/Event_Functions/GuildMemberAdd/**/*.js`)
    ).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const memberJoin: GuildMemberAdd = new (await import(file)).default(
        this.client
      );

      if (!memberJoin.server)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a server name.`)
        );

      this.client.GuildMemberAdd.set(
        memberJoin.server,
        memberJoin as GuildMemberAdd
      );

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadGuildMemberRemove() {
    const files = (
      await glob(`build/Event_Functions/GuildMemberRemove/**/*.js`)
    ).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const member: GuildMemberRemove = new (await import(file)).default(
        this.client
      );

      if (!member.server)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a server name.`)
        );

      this.client.GuildMemberRemove.set(
        member.server,
        member as GuildMemberRemove
      );

      return delete require.cache[require.resolve(file)];
    });
  }
}
