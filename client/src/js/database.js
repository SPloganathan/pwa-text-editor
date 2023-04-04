import { openDB } from "idb";

const initdb = async () =>
  openDB("pwa_text_editor", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("pwa_text_editor")) {
        console.log("pwa_text_editor database already exists");
        return;
      }
      db.createObjectStore("pwa_text_editor", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("pwa_text_editor database created");
    },
  });

export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
  const pwaTextEditorDb = await openDB("pwa_text_editor", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = pwaTextEditorDb.transaction("pwa_text_editor", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("pwa_text_editor");

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, text: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const pwaTextEditorDb = await openDB("pwa_text_editor", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = pwaTextEditorDb.transaction("pwa_text_editor", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("pwa_text_editor");

  // Use the .get() method to get data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result.text);
  return result.text;
};
initdb();
