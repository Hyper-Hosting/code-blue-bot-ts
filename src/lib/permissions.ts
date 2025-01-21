import { getUser } from "../db/User";

export async function isStaff(discordUserId: string) {
  const user = await getUser(discordUserId);
  if (!user) return false;

  if ((user.civ.staffLevel || 99) < 99) return true;
  if ((user.police.staffLevel || 99) < 99) return true;
  if ((user.sacd.staffLevel || 99) < 99) return true;
  if ((user.safr.staffLevel || 99) < 99) return true;

  return false;
}

export async function isStaffBod(discordUserId: string) {
  const user = await getUser(discordUserId);

  if (!user) return false;
  let staff = false;

  if ((user.civ.staffLevel || 99) == 1) staff = true;
  if ((user.police.staffLevel || 99) == 1) staff = true;
  if ((user.sacd.staffLevel || 99) == 1) staff = true;
  if ((user.safr.staffLevel || 99) == 1) staff = true;

  return staff;
}

export async function isStaffHod(
  discordUserId: string,
  department: "civ" | "police" | "sacd" | "safr" | null
) {
  const user = await getUser(discordUserId);
  if (!user) return false;
  let staff = false;

  if (!department) {
    if ((user.civ.staffLevel || 99) <= 2) staff = true;
    if ((user.police.staffLevel || 99) <= 2) staff = true;
    if ((user.sacd.staffLevel || 99) <= 2) staff = true;
    if ((user.safr.staffLevel || 99) <= 2) staff = true;
  } else {
    if ((user[department].staffLevel || 99) <= 2) staff = true;
  }

  return staff;
}

export async function isCommandStaff(
  discordUserId: string,
  department: "civ" | "police" | "sacd" | "safr" | null
) {
  const user = await getUser(discordUserId);
  if (!user) return false;
  let staff = false;

  if (!department) {
    if ((user.civ.staffLevel || 99) <= 3) staff = true;
    if ((user.police.staffLevel || 99) <= 3) staff = true;
    if ((user.sacd.staffLevel || 99) <= 3) staff = true;
    if ((user.safr.staffLevel || 99) <= 3) staff = true;
  } else {
    if ((user[department].staffLevel || 99) <= 3) staff = true;
  }

  return staff;
}

export async function isStaffDepartment(
  discordUserId: string,
  department: "civ" | "police" | "sacd" | "safr" | null
) {
  const user = await getUser(discordUserId);
  if (!user) return false;
  let staff = false;

  if (!department) {
    if ((user.civ.staffLevel || 99) <= 4) staff = true;
    if ((user.police.staffLevel || 99) <= 4) staff = true;
    if ((user.sacd.staffLevel || 99) <= 4) staff = true;
    if ((user.safr.staffLevel || 99) <= 4) staff = true;
  } else {
    if ((user[department].staffLevel || 99) <= 4) staff = true;
  }

  return staff;
}

export async function isStaffTrainee(
  discordUserId: string,
  department: "civ" | "police" | "sacd" | "safr" | null
) {
  const user = await getUser(discordUserId);
  if (!user) return false;
  let staff = false;

  if (!department) {
    if ((user.civ.staffLevel || 99) <= 4) staff = true;
    if ((user.police.staffLevel || 99) <= 4) staff = true;
    if ((user.sacd.staffLevel || 99) <= 4) staff = true;
    if ((user.safr.staffLevel || 99) <= 4) staff = true;
  } else {
    if ((user[department].staffLevel || 99) <= 5) staff = true;
  }

  return staff;
}

export async function checkPermission(
  discordUserId: string,
  department: "civ" | "police" | "sacd" | "safr" | null,
  level: number
) {
  if (level == 1 && (await isStaffBod(discordUserId))) return true;
  if (level == 2 && (await isStaffHod(discordUserId, department))) return true;
  if (level == 3 && (await isCommandStaff(discordUserId, department)))
    return true;
  if (level == 4 && (await isStaffDepartment(discordUserId, department)))
    return true;
  if (level == 5 && (await isStaffTrainee(discordUserId, department)))
    return true;

  return false;
}
