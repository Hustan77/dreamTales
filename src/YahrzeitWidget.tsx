import { useState } from 'react';
import { gregorianToHebrew, hebrewToGregorian, hebrewMonthName, isHebrewLeapYear } from './hebrew';

type Anniversary = {
  gregorian: Date;
  hebrew: string;
};

const YahrzeitWidget = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [lead, setLead] = useState(0);
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);

  const generate = () => {
    if (!name || !date) return;
    const gDate = new Date(date);
    const baseHeb = gregorianToHebrew(gDate);
    const annivs: Anniversary[] = [];
    for (let i = 1; i <= 10; i++) {
      const hy = baseHeb.year + i;
      let hm = baseHeb.month;
      const hd = baseHeb.day;
      if (hm === 13 && !isHebrewLeapYear(hy)) hm = 12; // Adar II -> Adar
      if (hm === 12 && isHebrewLeapYear(hy) && !isHebrewLeapYear(baseHeb.year)) hm = 13; // Adar -> Adar II in leap years
      const g = hebrewToGregorian(hy, hm, hd);
      const leap = isHebrewLeapYear(hy);
      const hName = `${hd} ${hebrewMonthName(hm, leap)} ${hy}`;
      annivs.push({ gregorian: g, hebrew: hName });
    }
    setAnniversaries(annivs);
  };

  const downloadICS = () => {
    if (!anniversaries.length) return;
    let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n';
    anniversaries.forEach((a) => {
      const d = a.gregorian;
      const ds = d.toISOString().slice(0, 10).replace(/-/g, '');
      ics += 'BEGIN:VEVENT\n';
      ics += `DTSTART;VALUE=DATE:${ds}\n`;
      ics += `SUMMARY:${name}'s Yahrzeit\n`;
      if (lead > 0) {
        ics += 'BEGIN:VALARM\n';
        ics += `TRIGGER:-P${lead}D\n`;
        ics += 'ACTION:DISPLAY\n';
        ics += 'DESCRIPTION:Reminder\n';
        ics += 'END:VALARM\n';
      }
      ics += 'END:VEVENT\n';
    });
    ics += 'END:VCALENDAR';
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yahrzeit.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPdf = () => {
    if (!anniversaries.length) return;
    const win = window.open('', '', 'width=800,height=600');
    if (!win) return;
    const rows = anniversaries
      .map((a, i) => `<tr><td>${i + 1}</td><td>${a.gregorian.toDateString()}</td><td>${a.hebrew}</td></tr>`) 
      .join('');
    win.document.write(`<!doctype html><html><head><title>${name}'s Yahrzeit</title><style>@page{size:letter;margin:1in;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #000;padding:8px;text-align:left;}</style></head><body><h1>${name}'s Yahrzeit Calendar</h1><table><thead><tr><th>#</th><th>Gregorian Date</th><th>Hebrew Date</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Yahrzeit Calendar Generator</h1>
      <div className="space-y-2">
        <input className="border p-2 w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2 w-full" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input className="border p-2 w-full" type="number" min="0" placeholder="Reminder days" value={lead} onChange={e => setLead(parseInt(e.target.value) || 0)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={generate}>Generate</button>
      </div>
      {anniversaries.length > 0 && (
        <div className="space-y-4">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Gregorian Date</th>
                <th className="border p-2">Hebrew Date</th>
              </tr>
            </thead>
            <tbody>
              {anniversaries.map((a, i) => (
                <tr key={i}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{a.gregorian.toDateString()}</td>
                  <td className="border p-2">{a.hebrew}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-x-2">
            <button className="bg-green-600 text-white px-4 py-2" onClick={downloadICS}>Download ICS</button>
            <button className="bg-purple-600 text-white px-4 py-2" onClick={printPdf}>Print PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YahrzeitWidget;
