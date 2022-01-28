function restoreLastViewDate() {
  try {
    const promoLastViewDate = localStorage.getItem('promoLastViewDate');
    if (promoLastViewDate) return JSON.parse(promoLastViewDate);
  } catch (e) {}
}

export function updateLastViewDate(lastViewDate: number) {
  try {
    const serializedViewDate = JSON.stringify(lastViewDate);
    localStorage.setItem('promoLastViewDate', serializedViewDate);
  } catch (e) {}
}

export function isPromoTime() {
  const currViewDate = new Date().getDate();
  const localLastViewDate = restoreLastViewDate();

  const lastViewDate = localLastViewDate
    ? new Date(localLastViewDate).getDate()
    : undefined;

  return currViewDate !== lastViewDate;
}
