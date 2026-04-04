export const safeSet = (obj, path, value) => {
  const keys = Array.isArray(path) ? path : path.split('.');
  const lastKey = keys.pop();

  const target = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);

  target[lastKey] = value;
  return obj;
};
