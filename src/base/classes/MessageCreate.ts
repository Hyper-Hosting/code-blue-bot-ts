import IMessageCreate from "../interfaces/IMessageCreate";
import CustomClient from "./CustomClient";
import { Message } from "discord.js";

export default class MessageCreate implements IMessageCreate {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  Execute(message: Message): void {}
  AutoComplete(message: Message): void {}
}
