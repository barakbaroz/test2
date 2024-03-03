module.exports = (type, user) => {
  const { BASIC_URL } = process.env;
  const FirstSend = `${BASIC_URL}/api/user/entry/${user.id}/first`;
  const SecondSend = `${BASIC_URL}/api/user/entry/${user.id}/second`;

  const template = {
    key: "type",
    creationHeartFailure: `היי, מצורף סרטון הדרכה מותאם אישית שיעזור לך להבין טוב יותר מה זה אי ספיקת לב וכיצד להתמודד עמה בשגרת חייך. הצפייה בסרטון תעזור לך להגביר את המעורבות שלך בטיפול. לצפייה:\n${FirstSend}`,
    creationHeartFailureAtrialFibrillationNew: `היי, קיבלת מרשם לתרופה חדשה. מצורף מערך הדרכה ובו שני סרטונים מותאמים אישית שיעזרו לך להבין טוב יותר את מצבך הבריאותי ולמה חשוב להתמיד בנטילת התרופה.\n${FirstSend}`,
    creationHeartFailureAtrialFibrillationOld: `היי, קיבלת מרשם לתרופה חדשה. מצורף מערך הדרכה ובו שני סרטונים מותאמים אישית שיעזרו לך להבין טוב יותר את מצבך הבריאותי. חשוב לנו לוודא שיש לך את כל המידע כדי להגביר את מעורבותך בטיפול במצבך.\n${FirstSend}`,
    creationAtrialFibrillationNew: `היי, קיבלת מרשם לתרופה חדשה. מצורף מערך הדרכה ובו סרטון מותאם אישית שיעזור לך להבין טוב יותר את מצבך הבריאותי ולמה חשוב להתמיד בנטילת התרופה.\n${FirstSend}`,
    creationAtrialFibrillationOld: `היי, מצורף מערך הדרכה ובו סרטון מותאם אישית שיעזור לך להבין טוב יותר את מצבך הבריאותי. חשוב לנו לוודא שיש לך את כל המידע כדי להגביר את מעורבותך בטיפול במצבך.\n${FirstSend}`,
    firstReminderHeartFailure: `היי, כבר צפית בסרטון ההדרכה שהותאם במיוחד עבורך? כדי לא להפסיד מידע חשוב וכלים שימושיים להתמודדות עם אי ספיקת לב, כל שעליך לעשות הוא לצפות בסרטון בלינק הבא:\n${FirstSend}`,
    firstReminderAtrialFibrillationNew: `היי, זוהי תזכורת לצפות בסרטון ההדרכה שנשלח לך, לאחר שנרשמה לך תרופה חדשה. הסרטון יעזור לך להבין למה נטילה עקבית של התרופה חשובה לבריאותך\n${FirstSend}`,
    firstReminderHeartFailureAtrialFibrillationNew: `היי, זוהי תזכורת לצפות בסרטוני הדרכה שנשלחו לך, לאחר שנרשמה לך תרופה חדשה. הסרטון יעזור לך להבין למה נטילה עקבית של התרופה חשובה לבריאותך.\n${FirstSend}`,
    firstReminderHeartFailureAtrialFibrillationOld: `היי, זוהי תזכורת לצפות בסרטוני הדרכה שנשלחו לך. חשוב לנו לוודא שיש לך את כל המידע כדי להגביר את מעורבותך בטיפול במצבך.\n${FirstSend}`,
    firstReminderAtrialFibrillationOld: `היי, זוהי תזכורת לצפות בסרטון ההדרכה שנשלח לך. חשוב לנו לוודא שיש לך את כל המידע כדי להגביר את מעורבותך בטיפול במצבך.\n${FirstSend}`,
    secondReminderHeartFailureAtrialFibrillationOld: ` היי, זוהי תזכורת אחרונה לצפות בסרטוני ההדרכה שנשלחו לך, שיעזרו לך להבין טוב יותר את מצבך הבריאותי.\n${SecondSend}`,
    secondReminderAtrialFibrillationOld: `היי, זוהי תזכורת אחרונה לצפות בסרטון ההדרכה שנשלח לך, שיעזור לך להבין טוב יותר את מצבך הבריאותי.\n${SecondSend}`,
    secondSendAtrialFibrillation: ` היי, בימים הראשונים של ההסתגלות לתרופה חדשה עשויות לעלות לך שאלות רבות. מצורף מערך הדרכה נוסף ובו מידע חשוב שיעזור לך להתמיד בנטילתה באופן קבוע\n${SecondSend}`,
    secondReminderHeartFailure: `היי, זוהי תזכורת אחרונה לצפות בסרטון ההדרכה שהותאם במיוחד עבורך. מטופלים רבים כבר צפו בסרטון כדי להיות מעורבים יותר בטיפול שלהם. לצפייה:\n${SecondSend}`,
    reminderForSecondSend: `היי, זוהי תזכורת שעדיין מחכה לך מידע חשוב שיעזור לך להסתגל לתרופה ולשלב את נטילתה העקבית בשגרת היום היום שלך.\n${SecondSend}`,
  };

  return findMessageByParams(template, {
    type,
    ...user.Case.dataValues,
    ...user.dataValues,
  });
};

const defaultValues = {
  gender: "male",
};

const formatOptions = {
  date: { year: "numeric", month: "numeric", day: "numeric" },
  time: { hour: "2-digit", minute: "2-digit" },
};

const formatDate = (dateObj, type, locales = "he-IL") => {
  const options = formatOptions[type];
  return dateObj.toLocaleString(locales, options);
};

const findMessageByParams = (template, userData) => {
  if (template instanceof Object && "key" in template)
    return findMessageByParams(
      template[userData[template.key]] || template[defaultValues[template.key]],
      userData
    );
  return template;
};
