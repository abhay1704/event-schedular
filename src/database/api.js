import app from "./config";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";

const db = getFirestore(app);

const createUserDocument = async ({ uid, email, name }) => {
  try {
    if (!uid) return;

    const userRef = doc(db, "user-xx1", uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: email || "",
        name: name || email.split("@")[0] || "",
        events: [],
      });
      console.log("User document created with ID: ", uid);
    } else {
      console.log("User document already exists.");
    }

    return uid;
  } catch (error) {
    console.error("Error creating user document: ", error);
  }
};

export class Event {
  constructor({
    title,
    description,
    start_time,
    end_time,
    uid,
    recurrence,
    tag,
  }) {
    this.docDetail = {
      title: title,
      description: description,
      start_time: Timestamp.fromDate(start_time),
      end_time: Timestamp.fromDate(end_time),
      uid: uid,
      recurrence: recurrence,
      tag: tag,
    };
    console.log(this.docDetail);
  }

  async save() {
    try {
      console.log("Adding document...");
      const docRef = await addDoc(collection(db, "events-xx1"), this.docDetail);
      console.log("Document written with ID: ", docRef.id);
      const userRef = doc(db, "user-xx1", this.docDetail.uid);
      console.log(userRef);
      await updateDoc(userRef, {
        events: arrayUnion(docRef),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      return null;
    }
  }
}

export const getEvent = async (id) => {
  try {
    const docRef = doc(db, "events-xx1", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const event = docSnap.data();
      event.ref = docSnap.id;
      event.start_time = event.start_time.toDate();
      event.end_time = event.end_time.toDate();
      return event;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};

export const deleteEvent = async (docsRef) => {
  try {
    const querySnapshot = await getDoc(docsRef);
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      deleted: true,
    });
    const userRef = doc(db, "user-xx1", this.docDetail.uid);
    await updateDoc(userRef, {
      events: arrayRemove(docRef),
    });
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

export const updateEvent = async (docsRef, newEvent) => {
  try {
    await updateDoc(docsRef, {
      title: newEvent.title,
      description: newEvent.description,
      start_time: Timestamp.fromDate(newEvent.start_time),
      end_time: Timestamp.fromDate(newEvent.end_time),
      uid: newEvent.uid,
      recurrence: newEvent.recurrence,
    });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

export const getUserEvents = async (user, ensure = true) => {
  const userRef = doc(db, "user-xx1", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    if (ensure) await createUserDocument(user);
    return [];
  }

  const eventsArray = userSnap.data().events || [];
  const events = [];

  try {
    for (const eventRef of eventsArray) {
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        const event = eventSnap.data();
        event.ref = eventSnap.id;
        event.start_time = event.start_time.toDate();
        event.end_time = event.end_time.toDate();
        events.push(event);
      } else {
        await updateDoc(userRef, {
          events: arrayRemove(eventRef),
        });
      }
    }
    return events;
  } catch (error) {
    console.error("Error retrieving user events: ", error);
    return [];
  }
};
