import app from "./config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(app);

export class Event {
  constructor(title, description, date, time, uid) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.uid = uid; // Store the user's UID
  }

  async save() {
    try {
      const docRef = await addDoc(collection(db, "events-xx1"), {
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time,
        uid: this.uid, // Include the UID in the event document
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      return null;
    }
  }
}

const getUserData = async (uid) => {
  try {
    const q = query(collection(db, "user-xx1"), where("uid", "==", uid));
    const data = await getDocs(q);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserEvents = async (uid) => {
  // Get user's event IDs
  const userData = await getUserData(uid);
  if (!userData || userData.length === 0) {
    console.log("User data not found");
    return [];
  }
  const eventsArray = userData.events; // Assuming this is an array of event IDs

  if (!eventsArray || eventsArray.length === 0) {
    console.log("No events found for the user.");
    return [];
  }

  // Query Firestore to get events where eventId is in the eventsArray
  const q = query(
    collection(db, "events-xxl"),
    where("eventId", "in", eventsArray) // Adjust 'eventId' to match your document field name
  );

  try {
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });

    return events;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};
