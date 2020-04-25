import RNCalendarEvents from 'react-native-calendar-events';
import {_retrieveData, _storeData} from './dataAcess';

/**
 * create a new calendar or return existing one
 */
export async function saveNewCalendar() {
  let newCalendar = {
    title: "Plant'Oclock calendar",
    color: '#5CB85C',
    entityType: 'event',
    name: "Plant'Oclock calendar",
    allowsModifications: true,
    ownerAccount: 'moi',
    accessLevel: 'owner',
    source: {name: "plant OClock's feed", isLocalAccount: true},
  };
  //si un calendrier avec les infos du calendrier de l'appli existe alors on retourne true sinon on créer le nouveau calendrier de l'appli
  let calendar = await _retrieveData('calendar');
  if (!calendar) {
    console.log('created new calendar and save it');
    let GeneratedcalendarId = await RNCalendarEvents.saveCalendar(newCalendar);
    newCalendar.id = GeneratedcalendarId;
    _storeData('calendar', JSON.stringify(newCalendar));
    return newCalendar;
  } else {
    console.log('existing calendar: ', calendar);
    return calendar;
  }
}

/**
 *
 * @param {string} titre
 * @param {object} dateDeb {jour: str, mois: str}
 * @param {object} dateFin {jour: str, mois: str}
 * @param {string} description
 * TODO vérifier de faire aucun doublons dans les events
 */
export async function createEventVegetable(
  titre,
  dateDeb,
  dateFin,
  descriptionDeb,
  descriptionFin,
) {
  let actualDate = new Date();
  //si le calendar existe pas on le créer ou on le retourne
  let calendar = await saveNewCalendar();
  console.log('calendar??: ', calendar); // ok
  let dateDebSemis1 = new Date(
    actualDate.getFullYear(),
    dateDeb.mois - 1,
    dateDeb.jour,
    16,
    0,
  ).toISOString();
  let dateDebSemis2 = new Date(
    actualDate.getFullYear(),
    dateDeb.mois - 1,
    dateDeb.jour,
    18,
    0,
  ).toISOString();
  let dateFinSemis1 = new Date(
    actualDate.getFullYear(),
    dateFin.mois - 1,
    dateFin.jour,
    16,
    0,
  ).toISOString();
  let dateFinSemis2 = new Date(
    actualDate.getFullYear(),
    dateFin.mois - 1,
    dateFin.jour,
    18,
    0,
  ).toISOString();
  //calendar.id
  let exists = await eventAlreadyExists(
    actualDate.getFullYear(),
    calendar.id,
    titre,
  );
  let autorisation = await getAutorisations();
  console.log('event already exist? : ', exists);
  console.log('autorisation before trigger : ', autorisation);
  console.log('event creator triggered? : ', autorisation && !exists);
  if (autorisation === 'authorized' && !exists) {
    RNCalendarEvents.saveEvent(titre, {
      calendarId: calendar.id,
      startDate: dateDebSemis1,
      alarms: [
        {
          date: 15,
        },
      ],
      endDate: dateDebSemis2,
      notes: descriptionDeb,
    }).then(
      (event) => console.log('event deb ok: ', event.id),
      (error) => console.log('erorr create event deb : ', error),
    );
    RNCalendarEvents.saveEvent(titre, {
      calendarId: calendar.id,
      startDate: dateFinSemis1,
      endDate: dateFinSemis2,
      notes: descriptionFin,
      alarms: [
        {
          date: 15,
        },
      ],
    }).then(
      (event) => console.log('event fin ok: ', event.id),
      (error) => console.log('erorr create event fin : ', error),
    );
  }
}

/**
 *  return 'denied', 'restricted', 'authorized' or 'undetermined'
 */
export async function getAutorisations() {
  let autorisation = await RNCalendarEvents.authorizationStatus();
  if (autorisation != 'authorized') {
    await RNCalendarEvents.authorizeEventStore();
    autorisation = await RNCalendarEvents.authorizationStatus();
  }
  return autorisation;
}

/**
 * ok
 */
export async function findAppCalendar() {
  return await _retrieveData('calendar');
}

/**function de test appeler au await test configPagesq */
export async function getTest() {
  return console.log('TEST TEST TEST TEST : ', await getAutorisations());
}

export async function removeAllCalendar() {
  console.log('remove all calendar');
  let calendars = await RNCalendarEvents.findCalendars();
  calendars.forEach((c) => {
    if ((c.source = "plant OClock's feed")) {
      console.log('remove a calendar : ', c);
      RNCalendarEvents.removeCalendar(c.id);
    }
  });
}

/**
 *
 * @param {*} year -> l'année en cours, est là uniquement pour éviter d'initialiser une nouvelle date alors que là où la fonction va être appeler il y aura déj) une date courante
 * @param {*} calendarId 6> l'id du calendrier où chercher (normalement celui stocké en asyncStorage)
 * @param {*} title -> la comparaison des event. c'est une des seules chose que deux event (ex: 2 event semis melon) ont en commun
 */
export async function eventAlreadyExists(year, calendarId, title) {
  let exists = false;
  let eventsCalendar = await RNCalendarEvents.fetchAllEvents(
    year + '-01-01T19:21:00.000Z',
    year + '-12-31T19:21:00.000Z',
    ['' + calendarId],
  );
  console.log('event calendar : ', eventsCalendar);
  eventsCalendar.forEach((event) => {
    console.log(
      'event exists? : titlenew / event.title:',
      title,
      '/',
      event.title,
    );
    console.log('same title? : ', event.title == title);
    if (event.title == title) {
      exists = exists || true;
    }
  });
  return exists;
}

export async function removeAllEventCurrentCalendar() {
  let calendar = await _retrieveData('calendar');
  let year = new Date().getFullYear();
  let bool = true;
  let eventsCalendar = await RNCalendarEvents.fetchAllEvents(
    year + '-01-01T19:21:00.000Z',
    year + '-12-31T19:21:00.000Z',
    ['' + calendar.id],
  );
  console.log('all event calendar before remove : ', eventsCalendar);
  eventsCalendar.forEach(async function (event) {
    console.log('will remove event : ', event.id);
    bool = bool && (await RNCalendarEvents.removeEvent(event.id));
  });
  //test to delete after test
  eventsCalendar = await RNCalendarEvents.fetchAllEvents(
    year + '-01-01T19:21:00.000Z',
    year + '-12-31T19:21:00.000Z',
    ['' + calendar.id],
  );
  //i see again event because google agenda have to wait around 30s to see event deleted ??
  console.log('all event calendar after remove : deleted? : ', eventsCalendar, ' ',bool);
}
