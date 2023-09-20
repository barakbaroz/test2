/** function who gets reminderId and give all the info on that reminder.
 * @param {String} sendAt: string who calculate timeStamp depends on the structure of the sentence
 * (amount : number, units : [days], sign : [after | before], fieldName : field from DB, at, hour : `HH:MM`).
 * @param {Array<String>} onSend: which reminder should to add after the current reminder has send.
 * @param {Object} onAction: which reminder should to add after userAction.
 */

//in order to insert new reminder we just need to make sure that were sending the right parameters.
//the name of the reminder, the table the column and the timer that we want the reminder to be depend on,
//and which reminder should we trigger next after userAction or after cronJob handle (if we need to trigger at all).

const sendTime = [
  "15:00",
  "15:00",
  "15:00",
  "15:00",
  "15:00",
  "10:00",
  "20:50",
];

const holidayTime = {
  "Erev Yom Kippur": "10:00",
  "Yom Kippur": "21:10",
};

const remindersInfo = {
  caseCreation: {
    id: "caseCreation",
    text: "CaseCreation",
    sendAt: "immediate",
    holidayTime: null,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
  firstVideoReminder: {
    id: "firstVideoReminder",
    text: "FirstVideoReminder",
    sendAt: "1 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: ["secondVideoReminder"],
    onAction: { "watched-video": [] },
    dependencies: ["creation"],
  },
  secondVideoReminder: {
    id: "secondVideoReminder",
    text: "SecondVideoReminder",
    sendAt: "2 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: [],
    onAction: { "watched-video": [] },
    dependencies: ["creation"],
  },
};

const independentAction = {
  "create-case": ["firstVideoReminder"],
};

module.exports = { remindersInfo, independentAction };
