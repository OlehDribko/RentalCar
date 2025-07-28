// універсальна утиліта
export const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  return new Intl.NumberFormat("en-US").format(value);
};
