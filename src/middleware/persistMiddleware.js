import { setJSON } from "../utils/storage";

const KEY = "favCarIds";

export const favoritesPersistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  if (state?.favorites?.ids) {
    setJSON(KEY, state.favorites.ids);
  }
  return result;
};
