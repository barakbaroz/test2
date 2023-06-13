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
  "11:00",
  "11:00",
  "11:00",
  "11:00",
  "11:00",
  "10:00",
  "20:00",
];

const remindersInfo = {
  firstReminders: {
    id: "firstReminders",
    text: "reminders",
    sendAt: "1 days after creation",
    sendTime: sendTime,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
};

const independentAction = {
  creationInsulinInjection: ["insulinFirstRemind"],
  creationSugarTest: ["sugarTestFirstRemind"],
  creationInsulinInjectionSugarTest: ["insulinSugarTestFirstRemind"],
};

module.exports = { remindersInfo, independentAction };
