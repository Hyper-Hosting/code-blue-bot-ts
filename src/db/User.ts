import { UsersModel } from "../base/models/User";

export async function getUser(discordUserId: string) {
  const user = await UsersModel.findOne({
    discordUserId,
  });

  return user;
}

export async function addBankBalance(discordUserId: string, amount: number) {
  const user = await getUser(discordUserId);
  if (!user) return false;

  user.bank += amount;
  await user.save();

  return true;
}

export async function removeBankBalance(discordUserId: string, amount: number) {
  const user = await getUser(discordUserId);
  if (!user) return false;

  user.bank -= amount;
  await user.save();

  return true;
}
