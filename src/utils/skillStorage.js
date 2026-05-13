const SAVED_KEY = "skillswap.savedSkills";
const BOOKINGS_KEY = "skillswap.bookings";

const normalizeKey = (value) =>
  (value || "guest")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_");

const getUserKey = (baseKey, email) =>
  `${baseKey}.${normalizeKey(email)}`;

const readList = (storageKey) => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
};

const writeList = (storageKey, value) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify(value));
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

const getSavedSkillsForUser = (email) =>
  readList(getUserKey(SAVED_KEY, email));

const getBookingsForUser = (email) =>
  readList(getUserKey(BOOKINGS_KEY, email));

export const getSavedSkillsListForUser = getSavedSkillsForUser;
export const getBookingsListForUser = getBookingsForUser;

export const hasSavedSkillForUser = (email, skill) =>
  getSavedSkillsForUser(email).some(
    (item) => Number(item.skillId) === Number(skill?.skillId)
  );

export const toggleSavedSkillForUser = (email, skill) => {
  const key = getUserKey(SAVED_KEY, email);
  const list = getSavedSkillsForUser(email);

  const exists = list.some(
    (item) => Number(item.skillId) === Number(skill.skillId)
  );

  if (exists) {
    const updated = list.filter(
      (item) => Number(item.skillId) !== Number(skill.skillId)
    );
    writeList(key, updated);
    return false;
  }

  writeList(key, [...list, normalizeSkill(skill)]);
  return true;
};

export const addBookingForUser = (email, booking) => {
  const key = getUserKey(BOOKINGS_KEY, email);
  const list = getBookingsForUser(email);

  const exists = list.some(
    (item) => Number(item.skillId) === Number(booking.skillId)
  );

  if (exists) return null;

  const newBooking = {
    ...normalizeSkill(booking),
    bookedByName: booking.name,
    bookedByEmail: booking.email,
    bookedAt: new Date().toISOString(),
    bookingId: `${booking.skillId}-${Date.now()}`,
  };

  writeList(key, [...list, newBooking]);
  return newBooking;
};

export const removeBookingForUser = (email, bookingId) => {
  const key = getUserKey(BOOKINGS_KEY, email);
  const list = getBookingsForUser(email);

  const updated = list.filter((item) => item.bookingId !== bookingId);

  writeList(key, updated);
  return updated;
};

export const removeSavedSkillForUser = (email, skillId) => {
  const key = getUserKey(SAVED_KEY, email);
  const list = getSavedSkillsForUser(email);

  const updated = list.filter(
    (item) => Number(item.skillId) !== Number(skillId)
  );

  writeList(key, updated);
  return updated;
};