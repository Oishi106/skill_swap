const SAVED_KEY = "skillswap.savedSkills";
const BOOKINGS_KEY = "skillswap.bookings";

const normalizeKey = (value) =>
  (value || "guest").toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");

const getUserKey = (baseKey, email) => `${baseKey}.${normalizeKey(email)}`;

const readList = (storageKey) => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
};

const writeList = (storageKey, value) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value));
};

const normalizeSkill = (skill) => ({
  skillId: Number(skill.skillId),
  skillName: skill.skillName,
  providerName: skill.providerName,
  providerEmail: skill.providerEmail,
  price: skill.price,
  rating: skill.rating,
  slotsAvailable: skill.slotsAvailable,
  description: skill.description,
  image: skill.image,
  category: skill.category,
});

const getSavedSkillsForUser = (email) => readList(getUserKey(SAVED_KEY, email));
const getBookingsForUser = (email) => readList(getUserKey(BOOKINGS_KEY, email));

export const hasSavedSkillForUser = (email, skill) =>
  getSavedSkillsForUser(email).some((item) => Number(item.skillId) === Number(skill?.skillId));

export const toggleSavedSkillForUser = (email, skill) => {
  const storageKey = getUserKey(SAVED_KEY, email);
  const savedSkills = getSavedSkillsForUser(email);
  const exists = savedSkills.some((item) => Number(item.skillId) === Number(skill.skillId));

  if (exists) {
    writeList(
      storageKey,
      savedSkills.filter((item) => Number(item.skillId) !== Number(skill.skillId))
    );
    return false;
  }

  writeList(storageKey, [...savedSkills, normalizeSkill(skill)]);
  return true;
};

export const addBookingForUser = (email, booking) => {
  const storageKey = getUserKey(BOOKINGS_KEY, email);
  const bookings = getBookingsForUser(email);
  const bookingExists = bookings.some((item) => Number(item.skillId) === Number(booking.skillId));

  if (bookingExists) {
    return null;
  }

  const nextBooking = {
    ...normalizeSkill(booking),
    bookedByName: booking.name,
    bookedByEmail: booking.email,
    bookedAt: new Date().toISOString(),
    bookingId: `${booking.skillId}-${Date.now()}`,
  };

  writeList(storageKey, [...bookings, nextBooking]);
  return nextBooking;
};

export const removeBookingForUser = (email, bookingId) => {
  const storageKey = getUserKey(BOOKINGS_KEY, email);
  const bookings = getBookingsForUser(email);
  const nextBookings = bookings.filter((item) => item.bookingId !== bookingId);

  writeList(storageKey, nextBookings);
  return nextBookings;
};

export const removeSavedSkillForUser = (email, skillId) => {
  const storageKey = getUserKey(SAVED_KEY, email);
  const savedSkills = getSavedSkillsForUser(email);
  const nextSavedSkills = savedSkills.filter((item) => Number(item.skillId) !== Number(skillId));

  writeList(storageKey, nextSavedSkills);
  return nextSavedSkills;
};

export const getSavedSkillsListForUser = (email) => getSavedSkillsForUser(email);
export const getBookingsListForUser = (email) => getBookingsForUser(email);