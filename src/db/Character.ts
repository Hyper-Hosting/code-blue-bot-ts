import { ObjectId } from "mongoose";
import { CharacterModel } from "../base/models/Character";

export async function getCharacters(accountId: string | ObjectId) {
  return await CharacterModel.find({
    accountId,
  });
}

export async function getCharacter(characterId: string | ObjectId) {
  return await CharacterModel.findById(characterId);
}
