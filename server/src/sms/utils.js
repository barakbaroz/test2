const { remindersInfo } = require("./config");
const { SmsQueue, SmsTracking } = require("../models");
const getMessageTemplate = require("./templates");
const axios = require("axios");

function getTimeByUser(timeName, user) {
  switch (timeName) {
    case "today":
    case "now":
      return new Date();
    case "creation":
      return user.getDataValue("createdAt");
    default:
      throw `timeName ${timeName} not found in getTimeByUser`;
  }
}

module.exports.insertSmsQueueRecords = async (list, user) => {
  const toCreate = list.map((type) => ({
    type,
    UserId: user.id,
    sentReminderTime: calculateDate(user, remindersInfo[type]),
  }));
  await SmsQueue.bulkCreate(toCreate);
};

module.exports.send = async (sms) => {
  try {
    const { UserId, type, User } = sms;
    const { phoneNumber } = User;
    const { onSend, text } = remindersInfo[type];
    const message = getMessageTemplate(text, User);
    await this.sendSms({ message, phoneNumber });
    await SmsTracking.create({ UserId, type, phoneNumber, message });
    await this.insertSmsQueueRecords(onSend, User);
    await sms.destroy();
  } catch (error) {
    console.error(error);
  }
};

function getUnitsFormat(units) {
  switch (units) {
    case "days":
    case "day":
      return ["setDate", "getDate"];
    case "hours":
      return ["setHours", "getHours"];
    default:
      throw `${units} not fond in getUnitsFormat`;
  }
}

const checkIfHoliday = (date, holidaySendTime) => {
  const events = HebrewCalendar.getHolidaysOnDate(date, true);
  if (!events) return null;
  for (const event of events) {
    const eventName = event.render("en");
    if (eventName in holidaySendTime) return holidaySendTime[eventName];
  }
  return null;
};

const calculateDate = (user, reminderInfo) => {
  if (reminderInfo.sendAt === "immediate") return new Date();
  const [amount, units, sign, fieldName, at, sendTime] =
    reminderInfo.sendAt.split(" ");
  const time = getTimeByUser(fieldName, user);
  const signformt = { after: +amount, before: -amount };
  const [set, get] = getUnitsFormat(units);
  const result = new Date(new Date(time)[set](time[get]() + signformt[sign]));
  if (!(reminderInfo.sendTime || at)) return result;
  const hour =
    sendTime ||
    checkIfHoliday(result, reminderInfo.holidayTime) ||
    reminderInfo.sendTime[result.getDay()];
  const hourSplited = hour.split(":");
  return new Date(result.setHours(...hourSplited, ...Array(4).fill("0")));
};

const { SMS_ACCOUNT_SID, SMS_AUTH_TOKEN, SMS_SENDER_NAME } = process.env;
const defaultSmsObj = {
  UserName: SMS_ACCOUNT_SID,
  Password: SMS_AUTH_TOKEN,
  senderName: SMS_SENDER_NAME,
};

module.exports.sendSms = async ({ message, phoneNumber }) => {
  if (!phoneNumber) return console.warn("No phone number provided to sendSms");
  if (!message) return console.warn("No message provided to sendSms");
  const smsObj = {
    ...defaultSmsObj,
    BodyMessage: message,
    Recipients: [{ Cellphone: phoneNumber }],
  };
  const res = await axios.post("https://restapi.soprano.co.il/api/sms", smsObj);
  if (res.status != 200 || res.data.StatusCode !== 0)
    throw `Sms API response with ${res.data.StatusCode}`;

  console.info(`successfully sent the sms to ${phoneNumber}`);
};

module.exports.performAction = async (reminder, actionType) => {
  const { type } = reminder;
  const onAction = remindersInfo[type].onAction[actionType];
  if (!onAction) return;
  await this.insertSmsQueueRecords(onAction, reminder.User);
  await reminder.destroy();
};
