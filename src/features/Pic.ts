import { TextChannel } from "discord.js";
import CustomClient from "../base/classes/CustomClient";
import Feature from "../base/classes/Feature";
import fs from "fs";
import path from "path";

const fetch = require("node-fetch");

export default class feature extends Feature {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute() {
    const server = await this.client.guilds.fetch("478353332386398218").catch();
    if (!server) return;

    const channel = (await server.channels
      .fetch("1194037684444876903")
      .catch()) as TextChannel;
    if (!channel) return;

    setInterval(async () => {
      try {
        const req = await fetch(
          "http://localhost:3000/api/generate-chart?timerange=1",
          {
            method: "POST",
          }
        );

        if (!req.ok) {
          throw new Error("Failed to generate chart");
        }

        const imageBuffer = await req.buffer();

        const prevMsg = await channel.messages
          .fetch(channel.topic || "")
          .catch(() => {});

        if (prevMsg) {
          prevMsg.edit({
            content: "https://code-blue.hyperhostings.com/dashboard/statistics",
            files: [
              {
                attachment: imageBuffer,
              },
            ],
          });
        } else {
          channel
            .send({
              content:
                "https://code-blue.hyperhostings.com/dashboard/statistics",
              files: [
                {
                  attachment: imageBuffer,
                },
              ],
            })
            .then((msg) => {
              channel.setTopic(msg.id);
            });
        }
      } catch (error) {
        console.error("Error executing feature:", error);
      }
    }, 1000 * 60 * 15);
  }
}
