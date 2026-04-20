// Mock auth using localStorage. Replace with real backend later.
const USERS_KEY = "messdaily_vendor_users";
const SESSION_KEY = "messdaily_vendor_session";

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const hasAnyVendor = () => getUsers().length > 0;

export const signUp = ({ name, email, password }) => {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("An account with this email already exists.");
  }
  const user = { name, email, password, createdAt: Date.now() };
  users.push(user);
  saveUsers(users);
  setSession({ name, email });
  return user;
};

export const signIn = ({ email, password }) => {
  const user = getUsers().find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password.");
  setSession({ name: user.name, email: user.email });
  return user;
};

export const signOut = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

export const setSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const isAuthenticated = () => !!getSession();

export const updateProfile = (updates) => {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === session.email);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  setSession({ name: users[idx].name, email: users[idx].email });
  return users[idx];
};
