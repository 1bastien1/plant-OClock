/* eslint-disable no-fallthrough */
import * as idb from 'idb';

const db = idb.default;

/**
 * Initialize the IndexedDB.
 * see https://developers.google.com/web/ilt/pwa/lab-indexeddb
 * for information as to why we use switch w/o breaks for migrations.
 * add do the database version and add a switch case each time you need to
 * change migrations
 */
const dbPromise = db.open('appDB', 2, function (upgradeDb) {
  /* tslint:disable */
  switch (upgradeDb.oldVersion) {
    case 0:
      //version 0 -> create StoreObject
      upgradeDb.createObjectStore('Vegetables', {keyPath: 'name'});
      const tx = upgradeDb.transaction.objectStore('Vegetables', 'readwrite');
      tx.createIndex('Name', 'name');
      tx.createIndex('dateDebSemisMois', 'datedebsemismois');
      tx.createIndex('dateDebSemisjour', 'datedebsemisjour');
      tx.createIndex('dateFinSemisMois', 'datefinsemismois');
      tx.createIndex('dateFinSemisJour', 'datefinsemisjour');
      tx.createIndex('tempMini', 'tempmini');
      tx.createIndex('tempMaxi', 'tempmaxi');
      tx.createIndex('soleil', 'soleil');
      tx.createIndex('imageURI', 'imageuri');
      tx.createIndex('isSub', 'issub');
    case 1:
      //version 1 -> fill the DB
      values.forEach((elt) => {
        tx.put({...elt});
      });
  }
});

class DBService {
  get(tablespace, key) {
    return dbPromise
      .then((db) => {
        return db.transaction(tablespace).objectStore(tablespace).get(key);
      })
      .catch((error) => {
        // Do something?
      });
  }

  getAll(tablespace, indexName, index = []) {
    return dbPromise
      .then((db) => {
        return db
          .transaction(tablespace)
          .objectStore(tablespace)
          .index(indexName)
          .getAll(index);
      })
      .catch((error) => {
        // Do something?
      });
  }

  put(tablespace, object, key = null) {
    return dbPromise
      .then((db) => {
        if (key) {
          return db
            .transaction(tablespace, 'readwrite')
            .objectStore(tablespace)
            .put(object, key);
        }
        return db
          .transaction(tablespace, 'readwrite')
          .objectStore(tablespace)
          .put(object);
      })
      .catch((error) => {
        // Do something?
      });
  }

  delete(tablespace, key) {
    return dbPromise
      .then((db) => {
        return db
          .transaction(tablespace, 'readwrite')
          .objectStore(tablespace)
          .delete(key);
      })
      .catch((error) => {
        // Do something?
      });
  }

  deleteAll(tablespace) {
    return dbPromise
      .then((db) => {
        return db
          .transaction(tablespace, 'readwrite')
          .objectStore(tablespace)
          .clear();
      })
      .catch((error) => {
        // Do something?
      });
  }
}

export const Service = new DBService();
