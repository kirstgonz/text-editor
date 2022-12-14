import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (textEditorContent) => {
  console.error('PUT to db');
  const jateDb = await openDB('jate_db', 1);

  const tx = jateDb.transaction('jate_db', 'readwrite');

  const store = tx.objectStore('text');
  
  const request = store.put({ textEditorContent });
  const result = await request;
  console.log('Saved to the database', result);
};

// logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.error('GET from db');

  // connects db and version
  const jateDb = await openDB('jate_db', 1);

  const tx = jateDb.transaction('jate_db', 'readonly');

  // open object store
  const store = tx.objectStore('text');

  // get all info in db
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
