// Auto-updating age — computed at runtime in the browser, so it is always
// correct on every visit with zero maintenance. Rolls over on the birthday.
//
// Dinesh's DOB: 21 Aug 2005.

export const DOB = '2005-08-21';

/**
 * Whole-years age from an ISO `YYYY-MM-DD` date of birth.
 * Leap-safe: uses calendar month/day comparison, not millisecond division.
 */
export function age(dobISO: string = DOB, now: Date = new Date()): number {
  const dob = new Date(`${dobISO}T00:00:00`);
  let years = now.getFullYear() - dob.getFullYear();
  const monthDelta = now.getMonth() - dob.getMonth();
  const beforeBirthday =
    monthDelta < 0 || (monthDelta === 0 && now.getDate() < dob.getDate());
  if (beforeBirthday) years -= 1;
  return years;
}

/** Current age as a two-digit string, e.g. "20" → for the "/20" hero mark. */
export function ageLabel(dobISO: string = DOB, now: Date = new Date()): string {
  return String(age(dobISO, now)).padStart(2, '0');
}
