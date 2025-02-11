import { ObjectId } from "mongoose";
import { IAttendanceSession } from "../base/models/AttendanceSession";
import { AttendanceRecordModel } from "../base/models/AttendanceRecord";

export async function getAttendanceLast7Days(accountId: ObjectId) {
  const attendance = await AttendanceRecordModel.find({
    accountId,
    status: "present",
  }).populate<{ session: IAttendanceSession }>({
    path: "session",
  });

  const transformedAttendance = attendance.map((record) => ({
    _id: record._id.toString(),
    accountId: record.accountId.toString(),
    date: record.session.date,
  }));

  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - 7);

  // Filter attendance data for the last 7 days
  const last7DaysData = transformedAttendance.filter(
    (record) => new Date(record.date) > daysAgo
  );

  // Calculate the number of RPs joined in the last 7 days
  const RPsJoinedLast7DaysNum = last7DaysData.length;

  return RPsJoinedLast7DaysNum;
}

export async function getAttendanceLast14Days(accountId: ObjectId) {
  const attendance = await AttendanceRecordModel.find({
    accountId,
    status: "present",
  }).populate<{ session: IAttendanceSession }>({
    path: "session",
  });

  const transformedAttendance = attendance.map((record) => ({
    _id: record._id.toString(),
    accountId: record.accountId.toString(),
    date: record.session.date,
  }));

  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - 14);

  // Filter attendance data for the last 14 days
  const last14DaysData = transformedAttendance.filter(
    (record) => new Date(record.date) > daysAgo
  );

  // Calculate the number of RPs joined in the last 14 days
  const RPsJoinedLast14DaysNum = last14DaysData.length;

  return RPsJoinedLast14DaysNum;
}
