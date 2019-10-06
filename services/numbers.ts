export const formatPrice = (amount: number) => {
  const formattedAmount = (Math.round(amount * 100) / 100).toLocaleString().replace(/ /g, ' '); // replace spaces by unbreakable spaces
  return `${formattedAmount}€`;
};
