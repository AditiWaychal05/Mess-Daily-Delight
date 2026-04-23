// Local persistence for vendor meals + customer skip days.
// Replace with Lovable Cloud later.
import mess1 from "@/assets/mess1.jpg";
import mess2 from "@/assets/mess2.jpg";

const MEALS_KEY = "messdaily_vendor_meals";
const SKIPS_KEY = "messdaily_skips"; // { 'YYYY-MM-DD': [{ user, meal, at }] }

const seedMeals = [
  {
    id: "seed-1",
    name: "Veg Thali",
    price: 80,
    desc: "Rice, Dal, Sabzi, Roti, Salad",
    image: mess1,
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "seed-2",
    name: "Special Thali",
    price: 120,
    desc: "Rice, Paneer, Dal, 3 Roti, Sweet",
    image: mess2,
    createdAt: Date.now() - 86400000 * 3,
  },
];

export const getMeals = () => {
  try {
    const raw = localStorage.getItem(MEALS_KEY);
    if (!raw) {
      localStorage.setItem(MEALS_KEY, JSON.stringify(seedMeals));
      return seedMeals;
    }
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
};

export const saveMeals = (meals) => {
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
};

export const addMeal = (meal) => {
  const meals = getMeals();
  const next = [{ ...meal, id: `m-${Date.now()}`, createdAt: Date.now() }, ...meals];
  saveMeals(next);
  return next;
};

export const updateMeal = (id, updates) => {
  const meals = getMeals().map((m) => (m.id === id ? { ...m, ...updates } : m));
  saveMeals(meals);
  return meals;
};

export const deleteMeal = (id) => {
  const meals = getMeals().filter((m) => m.id !== id);
  saveMeals(meals);
  return meals;
};

// ---------- Skips ----------
export const todayKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const seedSkipsIfEmpty = (all) => {
  const k = todayKey();
  if (!all[k]) {
    all[k] = [
      { user: "Rahul Sharma", meal: "Lunch", at: Date.now() - 3600_000 },
      { user: "Priya Patel", meal: "Dinner", at: Date.now() - 7200_000 },
      { user: "Amit Kumar", meal: "Lunch", at: Date.now() - 1800_000 },
    ];
    localStorage.setItem(SKIPS_KEY, JSON.stringify(all));
  }
  return all;
};

export const getAllSkips = () => {
  try {
    const raw = localStorage.getItem(SKIPS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return seedSkipsIfEmpty(all);
  } catch {
    return {};
  }
};

export const getSkipsForDate = (dateKey = todayKey()) => {
  const all = getAllSkips();
  return all[dateKey] || [];
};

export const addSkip = (entry, dateKey = todayKey()) => {
  const all = getAllSkips();
  const list = all[dateKey] || [];
  all[dateKey] = [{ ...entry, at: Date.now() }, ...list];
  localStorage.setItem(SKIPS_KEY, JSON.stringify(all));
  return all[dateKey];
};

export const removeSkip = (index, dateKey = todayKey()) => {
  const all = getAllSkips();
  const list = all[dateKey] || [];
  list.splice(index, 1);
  all[dateKey] = list;
  localStorage.setItem(SKIPS_KEY, JSON.stringify(all));
  return list;
};

export const totalSkippedThisMonth = () => {
  const all = getAllSkips();
  const now = new Date();
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return Object.entries(all)
    .filter(([k]) => k.startsWith(prefix))
    .reduce((sum, [, v]) => sum + v.length, 0);
};
