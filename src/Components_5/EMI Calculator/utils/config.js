export function numberWithCommas(x) {
  if (!x || isNaN(x)) return "₹ 0";
  return `₹ ${Number(x).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
