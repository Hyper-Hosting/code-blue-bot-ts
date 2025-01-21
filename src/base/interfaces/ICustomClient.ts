import { Collection } from "discord.js";
import Command from "../classes/Command";
import IConfig from "./IConfig";
import SubCommand from "../classes/SubCommand";
import Interaction from "../classes/Interaction";
import Feature from "../classes/Feature";

export default interface ICustomClient {
  config: IConfig;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  interactions: Collection<string, Interaction>;
  cooldowns: Collection<string, Collection<string, number>>;

  Init(): void;
  LoadHandlers(): void;
}
