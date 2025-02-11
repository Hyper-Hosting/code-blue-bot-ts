import { GuildMember, PartialGuildMember } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import GuildMemberRemove from "../../base/classes/GuildMemberRemove";
import { getUser } from "../../db/User";
const config = require(process.cwd() + "/_data/config.json");

export default class LeaveEvent extends GuildMemberRemove {
  constructor(client: CustomClient) {
    super(client, {
      server: "Main",
    });
  }

  async Execute(member: GuildMember | PartialGuildMember) {
    const user = await getUser(member.id);
    if (!user) return;

    try {
      const response = await fetch(
        `https://api.clerk.com/v1/users/${user.clerkUserId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${config.clerkSecret}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Clerk API error: ${response.status} - ${errorText}`);
      }

      console.log(
        `Deleted clerk user for ${user.firstName} ${user.lastInitial}`
      );
    } catch (error) {}
  }
}
