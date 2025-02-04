import { Events, GuildMember, Message, PartialGuildMember } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import ServerName from "../../base/types/ServerName";
import GuildMemberRemove from "../../base/classes/GuildMemberRemove";

export default class MemberLeaveHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.GuildMemberRemove,
      description: "Member Left handler event",
      once: false,
    });
  }

  async Execute(member: GuildMember | PartialGuildMember) {
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
      const memberLeft: GuildMemberRemove =
        this.client.GuildMemberRemove.get(serverName)!;
      if (!memberLeft) return this.client.GuildMemberRemove.delete(serverName);

      memberLeft.Execute(member);
    }
  }
}
