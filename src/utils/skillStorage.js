import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase/firebase.config";

/* ---------------- BOOKINGS ---------------- */

export const addBookingForUser = async (email, booking) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      userEmail: email,
      skillId: Number(booking.skillId),
      skillName: booking.skillName,
      providerName: booking.providerName,
      image: booking.image,
      category: booking.category,
      bookedAt: serverTimestamp(),
      status: "pending",
    });

    return { id: docRef.id, ...booking };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getBookingsListForUser = async (email) => {
  const q = query(
    collection(db, "bookings"),
    where("userEmail", "==", email)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    bookingId: d.id,
    ...d.data(),
  }));
};

export const removeBookingForUser = async (bookingId) => {
  await deleteDoc(doc(db, "bookings", bookingId));
};

/* ---------------- SAVED SKILLS ---------------- */

export const toggleSavedSkillForUser = async (email, skill) => {
  const q = query(
    collection(db, "savedSkills"),
    where("userEmail", "==", email),
    where("skillId", "==", Number(skill.skillId))
  );

  const snap = await getDocs(q);

  // if exists → remove
  if (!snap.empty) {
    await deleteDoc(doc(db, "savedSkills", snap.docs[0].id));
    return false;
  }

  // else add
  await addDoc(collection(db, "savedSkills"), {
    userEmail: email,
    skillId: Number(skill.skillId),
    skillName: skill.skillName,
    providerName: skill.providerName,
    image: skill.image,
    category: skill.category,
    savedAt: serverTimestamp(),
  });

  return true;
};

export const getSavedSkillsListForUser = async (email) => {
  const q = query(
    collection(db, "savedSkills"),
    where("userEmail", "==", email)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    skillId: d.data().skillId,
    ...d.data(),
    savedId: d.id,
  }));
};

export const removeSavedSkillForUser = async (savedId) => {
  await deleteDoc(doc(db, "savedSkills", savedId));
};