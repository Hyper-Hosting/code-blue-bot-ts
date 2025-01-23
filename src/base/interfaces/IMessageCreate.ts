import { Message } from "discord.js";
import CustomClient from "../classes/CustomClient";

export default interface IMessageCreate {
  client: CustomClient;

  Execute(message: Message): void;
  AutoComplete(message: Message): void;
}
