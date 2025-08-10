const HEBREW_EPOCH = 347995;

function mod(a: number, b: number): number {
  return a - b * Math.floor(a / b);
}

export function isHebrewLeapYear(year: number): boolean {
  return mod(year * 7 + 1, 19) < 7;
}

function monthsElapsed(year: number): number {
  return Math.floor((235 * year - 234) / 19);
}

function hebrewCalendarElapsedDays(year: number): number {
  const months = monthsElapsed(year);
  const parts = 204 + 793 * (months % 1080);
  const hours = 5 + 12 * months + Math.floor(793 * months / 1080);
  let day = 1 + 29 * months + Math.floor(hours / 24);
  const part = (hours % 24) * 1080 + (parts % 1080);

  // postponement rules (dehiyyot)
  if (part >= 19440 ||
     (!isHebrewLeapYear(year) && day % 7 === 3 && part >= 9924) ||
     (isHebrewLeapYear(year - 1) && day % 7 === 2 && part >= 16789)) {
    day += 1;
  }

  // additional postponement: Rosh Hashanah cannot be Sunday, Wednesday, Friday
  if ([0, 3, 5].includes(day % 7)) {
    day += 1;
  }

  return day;
}

function roshHashanah(year: number): number {
  return HEBREW_EPOCH + hebrewCalendarElapsedDays(year);
}

function hebrewYearMonths(year: number): number {
  return isHebrewLeapYear(year) ? 13 : 12;
}

function hebrewYearLength(year: number): number {
  return roshHashanah(year + 1) - roshHashanah(year);
}

function hebrewYearType(year: number): 'deficient' | 'regular' | 'abundant' {
  const length = hebrewYearLength(year);
  if (length % 10 === 5) return 'abundant';
  if (length % 10 === 3) return 'deficient';
  return 'regular';
}

function hebrewMonthDays(year: number, month: number): number {
  // months are numbered from Nisan=1 to Adar II=13
  switch (month) {
    case 1: return 30; // Nisan
    case 2: return 29; // Iyar
    case 3: return 30; // Sivan
    case 4: return 29; // Tammuz
    case 5: return 30; // Av
    case 6: return 29; // Elul
    case 7: return 30; // Tishrei
    case 8: // Cheshvan
      return hebrewYearType(year) === 'abundant' ? 30 : 29;
    case 9: // Kislev
      return hebrewYearType(year) === 'deficient' ? 29 : 30;
    case 10: return 29; // Tevet
    case 11: return 30; // Shevat
    case 12:
      if (isHebrewLeapYear(year)) return 30; // Adar I
      return 29; // Adar (non-leap)
    case 13: return 29; // Adar II
    default: return 29;
  }
}

function hebrewToJd(year: number, month: number, day: number): number {
  let jd = roshHashanah(year) + day - 1;
  if (month < 7) {
    for (let m = 7; m <= hebrewYearMonths(year); m++) jd += hebrewMonthDays(year, m);
    for (let m = 1; m < month; m++) jd += hebrewMonthDays(year, m);
  } else {
    for (let m = 7; m < month; m++) jd += hebrewMonthDays(year, m);
  }
  return jd;
}

function gregorianToJd(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function jdToGregorian(jd: number): { year: number; month: number; day: number } {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor(146097 * b / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor(1461 * d / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

export function gregorianToHebrew(date: Date): { year: number; month: number; day: number } {
  const jd = gregorianToJd(date.getFullYear(), date.getMonth() + 1, date.getDate());
  let year = Math.floor((jd - HEBREW_EPOCH) / 366) + 1;
  while (jd >= hebrewToJd(year + 1, 7, 1)) year += 1;
  let month = 7;
  while (jd > hebrewToJd(year, month, hebrewMonthDays(year, month))) {
    month += 1;
    if (month > hebrewYearMonths(year)) month = 1;
  }
  const day = jd - hebrewToJd(year, month, 1) + 1;
  return { year, month, day };
}

export function hebrewToGregorian(year: number, month: number, day: number): Date {
  const jd = hebrewToJd(year, month, day);
  const g = jdToGregorian(jd);
  return new Date(g.year, g.month - 1, g.day);
}

export function hebrewMonthName(month: number, leap: boolean): string {
  const monthsLeap = ["Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shevat", "Adar I", "Adar II"];
  const months = ["Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shevat", "Adar"];
  return leap ? monthsLeap[month - 1] : months[month - 1];
}
