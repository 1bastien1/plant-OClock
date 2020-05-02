import AsyncStorage from '@react-native-community/async-storage';

const values = [
  {
    name: 'saladeEte',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/salade.jpg',
    isSub: false,
  },
  {
    name: 'ciboulette',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/ciboulette.jpg',
    isSub: false,
  },
  {
    name: 'tomate',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/tomate.jpg',
    isSub: false,
  },
  {
    name: 'courgette',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/courgette.jpg',
    isSub: false,
  },
  {
    name: 'aubergine',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/aubergine.jpg',
    isSub: false,
  },
  {
    name: 'poivrons',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    iamge: '../assets/vegetables/poivron.jpg',
    isSub: false,
  },
  {
    name: 'piment',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/piment.jpg',
    isSub: false,
  },
  {
    name: 'melon',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/melon.jpg',
    isSub: false,
  },
  {
    name: 'pasteque',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/pasteque.jpg',
    isSub: false,
  },
  {
    name: 'concombre',
    dateDebSemisJour: 15,
    dateDebSemisMois: 3,
    dateFinSemisJour: 31,
    dateFinSemisMois: 7,
    tempMin: 15,
    tempMax: 30,
    soleil: 0,
    image: '../assets/vegetables/concombre.jpg',
    isSub: false,
  },
];

/**
 *
 * @param {*} data only string so have to JSON.stringify(data)
 */
export async function _storeData(key, data) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log('error storeData: ', error, data.name);
  }
}
/**
 *
 * @param {name} is the key, return the data directly, if no data found return false
 */
export async function _retrieveData(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return JSON.parse(value);
    } else if (value == null) {
      return false;
    }
  } catch (error) {
    console.log('error getData: ', error);
  }
}

export async function initDB() {
  let vegetables = await _retrieveData('vegetables');
  let localisation = await _retrieveData('localisation');
  console.log('vegetables initDB : ', vegetables);
  if (!vegetables) {
    _storeData('vegetables', JSON.stringify(values));
  }
  if (!localisation) {
    _storeData('localisation', JSON.stringify('Paris'));
  }
}

/**
 * @return a promise with all keys stores in storage
 */
export async function getAllKeys() {
  return AsyncStorage.getAllKeys();
}

/**
 *
 * @param {*} key
 * @param {*} valueToMerge JSON.Stringify
 * @param {*} successCB
 * @param {*} errorCB
 * return promise
 */
export function mergeData(key, valueToMerge, successCB, errorCB) {
  return AsyncStorage.mergeItem(key, valueToMerge, successCB, errorCB);
}

export function removeItemApp() {
  console.log('remove asyncStorage all data');
  getAllKeys().then((arrayKey) => {
    arrayKey.forEach((key) => {
      AsyncStorage.removeItem(
        key,
        () => console.log('deleted item key : ', key),
        (error) => console.log('error delete item :', error),
      );
    });
  });
}
