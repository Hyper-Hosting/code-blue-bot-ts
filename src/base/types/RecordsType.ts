import { IBolos } from "../models/Bolos";
import { ICharacter } from "../models/Character";
import { ICitations } from "../models/Citations";
import { IInventory } from "../models/Inventory";
import { IStoreItems } from "../models/StoreItems";
import { ITrespassNotice } from "../models/TrespassNotice";

export type RecordsType = {
  bolos: (IBolos & {
    characterId: ICharacter;
  })[];
  ccpLicense: (IInventory & {
    itemId: IStoreItems;
    characterId: ICharacter;
  })[];
  citation: (ICitations & {
    characterId: ICharacter;
  })[];
  driverLicense: (IInventory & {
    itemId: IStoreItems;
    characterId: ICharacter;
  })[];
  autopsyReport: [];
  trespassNotice: (ITrespassNotice & {
    characterId: ICharacter;
  })[];
  vehicleRegistration: (IInventory & {
    itemId: IStoreItems;
    characterId: ICharacter;
  })[];
  warrant: [];
  weaponRegistry: (IInventory & {
    itemId: IStoreItems;
    characterId: ICharacter;
  })[];
};
