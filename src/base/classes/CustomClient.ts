import { Client, Collection, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interfaces/ICustomClient";
import IConfig from "../interfaces/IConfig";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import { connect } from "mongoose";
import Interaction from "./Interaction";

export default class CustomClient extends Client implements ICustomClient {
  handler: Handler;
  config: IConfig;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  interactions: Collection<string, Interaction>;
  cooldowns: Collection<string, Collection<string, number>>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
    });

    this.config = require(`${process.cwd()}/_data/config.json`);
    this.handler = new Handler(this);
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.interactions = new Collection();
    this.cooldowns = new Collection();
  }

  Init(): void {
    this.LoadHandlers();
    this.login(this.config.token).catch((err) => console.error(err));

    connect(this.config.mongoUrl)
      .then(() => console.log("Connected to MongoDB!"))
      .catch((err) => console.error(err));
  }

  LoadHandlers(): void {
    this.handler.LoadEvents();
    this.handler.LoadCommands();
    this.handler.LoadInteractions();
    this.handler.LoadFeatures();
  }
}
