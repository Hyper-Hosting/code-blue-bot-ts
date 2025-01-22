import { Events, GuildMember, Message } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import GuildMemberAdd from "../../base/classes/GuildMemberAdd";
import ServerName from "../../base/types/ServerName";

export default class MessageCreateHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.GuildMemberAdd,
      description: "Member Joined handler event",
      once: false,
    });
  }

  async Execute(member: GuildMember) {
    let serverName: ServerName | null = null;

    if (member.guild.id == "1200499403757195274") {
      serverName = "Main";
    }

    if (member.guild.id == "478353332386398218") {
      serverName = "Interview";
    }

    if (member.guild.id == "1291500721455235132") {
      serverName = "Civilian";
    }

    if (member.guild.id == "1193816709908398220") {
      serverName = "Business";
    }

    if (member.guild.id == "1197101201599254648") {
      serverName = "Police_Academy";
    }

    if (member.guild.id == "1165050321622540289") {
      serverName = "SAFR";
    }

    if (member.guild.id == "1167216830922891344") {
      serverName = "SAFR_Academy";
    }

    if (member.guild.id == "1188176442379477115") {
      serverName = "SACD";
    }

    if (serverName) {
      const memberJoin: GuildMemberAdd =
        this.client.GuildMemberAdd.get(serverName)!;
      if (!memberJoin) return this.client.GuildMemberAdd.delete(serverName);

      memberJoin.Execute(member);
    }
  }
}
