import CustomClient from "../base/classes/CustomClient";
import Feature from "../base/classes/Feature";
import { AttendanceRecordModel } from "../base/models/AttendanceRecord";
import { AttendanceSessionModel } from "../base/models/AttendanceSession";
import { UsersModel } from "../base/models/User";
import cron from "node-cron";

export default class feature extends Feature {
  constructor(client: CustomClient) {
    super(client);
  }

  async Execute() {
    cron.schedule("0 8 * * *", async () => {
      try {
        const newSession = new AttendanceSessionModel();
        const ses = await newSession.save();

        const accounts = await UsersModel.find();

        for (const account of accounts) {
          try {
            await new AttendanceRecordModel({
              accountId: account._id,
              session: ses._id,
              status: "absent",
            }).save();
          } catch (error) {}
        }
      } catch (error) {
        console.error("Error creating attendance session:", error);
      }
    });
  }
}
