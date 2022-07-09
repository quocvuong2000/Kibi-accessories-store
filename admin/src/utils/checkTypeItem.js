export function checkTypeItem(value) {
  if ((typeof value !== "undefined" && value) || value === 0) return value;
  return "N/A";
}
