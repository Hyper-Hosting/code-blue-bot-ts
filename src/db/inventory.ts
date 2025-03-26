import { IInventory, InventoryModel } from "../base/models/Inventory";
import { IStoreItems } from "../base/models/StoreItems";

export async function getItemByPlate(plate: string) {
  return await InventoryModel.findOne<
    IInventory & {
      itemId: IStoreItems;
    }
  >({
    plate: { $regex: new RegExp(plate, "i") },
  }).populate({
    path: "itemId",
  });
}
