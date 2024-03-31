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
  creationHeartFailure: {
    id: "creationHeartFailure",
    text: "creationHeartFailure",
    sendAt: "immediate",
    holidayTime: null,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
  creationHeartFailureAtrialFibrillationNew: {
    id: "creationHeartFailureAtrialFibrillationNew",
    text: "creationHeartFailureAtrialFibrillationNew",
    sendAt: "immediate",
    holidayTime: null,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
  creationHeartFailureAtrialFibrillationOld: {
    id: "creationHeartFailureAtrialFibrillationOld",
    text: "creationHeartFailureAtrialFibrillationOld",
    sendAt: "immediate",
    holidayTime: null,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
  creationAtrialFibrillationNew: {
    id: "creationAtrialFibrillationNew",
    text: "creationAtrialFibrillationNew",
    sendAt: "immediate",
    holidayTime: null,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
  creationAtrialFibrillationOld: {
    id: "creationAtrialFibrillationOld",
    text: "creationAtrialFibrillationOld",
    sendAt: "immediate",
    holidayTime: null,
    onSend: [],
    onAction: {},
    dependencies: [],
  },
  firstReminderHeartFailure: {
    id: "firstReminderHeartFailure",
    text: "firstReminderHeartFailure",
    sendAt: "1 days after creation",
    holidayTime: null,
    onSend: ["secondReminderHeartFailure"],
    onAction: { "watched-video": [] },
    dependencies: [],
  },
  secondReminderHeartFailure: {
    id: "secondReminderHeartFailure",
    text: "secondReminderHeartFailure",
    sendAt: "2 days after creation",
    holidayTime: null,
    onSend: [],
    onAction: { "watched-video": [] },
    dependencies: [],
  },

  firstReminderHeartFailureAtrialFibrillationNew: {
    id: "firstReminderHeartFailureAtrialFibrillationNew",
    text: "firstReminderHeartFailureAtrialFibrillationNew",
    sendAt: "1 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: [],
    onAction: { "watched-video-AtrialFibrillation": [] },
    dependencies: ["creation"],
  },
  secondSendAtrialFibrillation: {
    id: "secondSendAtrialFibrillation",
    text: "secondSendAtrialFibrillation",
    sendAt: "4 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: ["reminderForSecondSend"],
    onAction: {},
    dependencies: ["creation"],
  },
  reminderForSecondSend: {
    id: "reminderForSecondSend",
    text: "reminderForSecondSend",
    sendAt: "1 days after now",
    sendTime: sendTime,
    holidayTime,
    onSend: [],
    onAction: { "watched-video": [] },
    dependencies: ["creation"],
  },

  firstReminderHeartFailureAtrialFibrillationOld: {
    id: "firstReminderHeartFailureAtrialFibrillationOld",
    text: "firstReminderHeartFailureAtrialFibrillationOld",
    sendAt: "1 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: ["secondReminderHeartFailureAtrialFibrillationOld"],
    onAction: { "watched-video-AtrialFibrillation": [] },
    dependencies: ["creation"],
  },
  secondReminderHeartFailureAtrialFibrillationOld: {
    id: "secondReminderHeartFailureAtrialFibrillationOld",
    text: "secondReminderHeartFailureAtrialFibrillationOld",
    sendAt: "2 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: [],
    onAction: { "watched-video-AtrialFibrillation": [] },
    dependencies: ["creation"],
  },
  firstReminderAtrialFibrillationNew: {
    id: "firstReminderAtrialFibrillationNew",
    text: "firstReminderAtrialFibrillationNew",
    sendAt: "1 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: [],
    onAction: { "watched-video-AtrialFibrillation": [] },
    dependencies: ["creation"],
  },
  firstReminderAtrialFibrillationOld: {
    id: "firstReminderAtrialFibrillationOld",
    text: "firstReminderAtrialFibrillationOld",
    sendAt: "1 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: ["secondReminderAtrialFibrillationOld"],
    onAction: { "watched-video": [] },
    dependencies: ["creation"],
  },
  secondReminderAtrialFibrillationOld: {
    id: "secondReminderAtrialFibrillationOld",
    text: "secondReminderAtrialFibrillationOld",
    sendAt: "2 days after creation",
    sendTime: sendTime,
    holidayTime,
    onSend: [],
    onAction: { "watched-video": [] },
    dependencies: ["creation"],
  },
};

const independentAction = {
  creationHeartFailure: ["firstReminderHeartFailure"],
  creationHeartFailureAtrialFibrillationNew: [
    "firstReminderHeartFailureAtrialFibrillationNew",
    "secondSendAtrialFibrillation",
  ],
  creationHeartFailureAtrialFibrillationOld: [
    "firstReminderHeartFailureAtrialFibrillationOld",
  ],
  creationAtrialFibrillationNew: [
    "firstReminderAtrialFibrillationNew",
    "secondSendAtrialFibrillation",
  ],
  creationAtrialFibrillationOld: ["firstReminderAtrialFibrillationOld"],
};

module.exports = { remindersInfo, independentAction };
