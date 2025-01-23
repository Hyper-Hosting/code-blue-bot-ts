import { Events, Message } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import { glob } from "glob";
import path from "path";
import MessageCreate from "../../base/classes/MessageCreate";

export default class MessageCreateHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.MessageCreate,
      description: "Message Create handler event",
      once: false,
    });
  }

  async Execute(message: Message) {
    const files = (
      await glob(`build/Event_Functions/MessageCreate/**/*.js`)
    ).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const result: MessageCreate = new (await import(file)).default(
        this.client
      );
      result.Execute(message);

      return delete require.cache[require.resolve(file)];
    });
  }
}
