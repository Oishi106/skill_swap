import { db } from "../Firebase/firebase.config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// =====================
// GET USER DATA
// =====================
export const getUserData = async (email) => {
  const ref = doc(db, "users", email);
  const snap = await getDoc(ref);

  if (snap.exists()) return snap.data();

  return {
    savedSkills: [],
    bookings: [],
  };
};

// =====================
// SAVE BOOKING
// =====================
export const saveBooking = async (email, booking) => {
  const ref = doc(db, "users", email);
  const data = await getUserData(email);

  const exists = data.bookings.some(
    (b) => b.skillId === booking.skillId
  );

  if (exists) return data.bookings;

  const updated = {
    ...data,
    bookings: [
      ...data.bookings,
      {
        ...booking,
        bookingId: Date.now().toString(),
        createdAt: new Date().toISOString(),
      },
    ],
  };

  await setDoc(ref, updated);
  return updated.bookings;
};

// =====================
// SAVE SKILL
// =====================
export const saveSkill = async (email, skill) => {
  const ref = doc(db, "users", email);
  const data = await getUserData(email);

  const exists = data.savedSkills.some(
    (s) => s.skillId === skill.skillId
  );

  if (exists) return data.savedSkills;

  const updated = {
    ...data,
    savedSkills: [...data.savedSkills, skill],
  };

  await setDoc(ref, updated);
  return updated.savedSkills;
};

// =====================
// REMOVE BOOKING
// =====================
export const removeBooking = async (email, bookingId) => {
  const ref = doc(db, "users", email);
  const data = await getUserData(email);

  const updated = {
    ...data,
    bookings: data.bookings.filter(
      (b) => b.bookingId !== bookingId
    ),
  };

  await setDoc(ref, updated);
  return updated.bookings;
};

// =====================
// REMOVE SAVED
// =====================
export const removeSaved = async (email, skillId) => {
  const ref = doc(db, "users", email);
  const data = await getUserData(email);

  const updated = {
    ...data,
    savedSkills: data.savedSkills.filter(
      (s) => s.skillId !== skillId
    ),
  };

  await setDoc(ref, updated);
  return updated.savedSkills;
};