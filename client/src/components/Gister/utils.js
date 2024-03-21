export function checkEmptyObject(object) {
  return Object.values(object).filter(Boolean).length === 0;
}
