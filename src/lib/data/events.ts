export type EventItem = {
  name: string;
  sport: string;
  color: string;
  time: string;
  venue: string;
};

export type DayEntry = {
  day: string;
  dayShort: string;
  date: number;
  month: string;
  isToday?: boolean;
  events: EventItem[];
};

export const BASE_EVENTS: Omit<DayEntry, 'isToday'>[] = [
  { day: 'Sunday',    dayShort: 'SUN', date: 12, month: 'APR', events: [] },
  { day: 'Monday',    dayShort: 'MON', date: 13, month: 'APR', events: [
    { name: 'District Competition', sport: 'Common Council', color: '#D85A30', time: '08:00', venue: 'SAC Ground' },
    { name: 'Freshmen Open',        sport: 'Badminton',      color: '#1D9E75', time: '17:00', venue: 'Badminton Hall' },
    { name: 'NSO End Session',      sport: 'Hockey',         color: '#7F77DD', time: '19:30', venue: 'Hockey Field' },
  ]},
  { day: 'Tuesday',   dayShort: 'TUE', date: 14, month: 'APR', events: [
    { name: 'BOTB Qualifiers',      sport: 'Football',       color: '#C4622D', time: '17:00', venue: 'Football Ground' },
    { name: 'Freshie La Vista',     sport: 'Common Council', color: '#D85A30', time: '20:00', venue: 'Gymkhana' },
  ]},
  { day: 'Wednesday', dayShort: 'WED', date: 15, month: 'APR', events: [
    { name: 'BOTB Quarter Finals',  sport: 'Football',       color: '#C4622D', time: '17:00', venue: 'Football Ground' },
    { name: 'Spoofit Round 1',      sport: 'Common Council', color: '#D85A30', time: '20:00', venue: 'Gymkhana' },
  ]},
  { day: 'Thursday',  dayShort: 'THU', date: 16, month: 'APR', events: [
    { name: 'BOTB Semi Finals',     sport: 'Football',       color: '#C4622D', time: '17:00', venue: 'Football Ground' },
    { name: 'Spoofit Round 2',      sport: 'Common Council', color: '#D85A30', time: '20:00', venue: 'Gymkhana' },
  ]},
  { day: 'Friday',    dayShort: 'FRI', date: 17, month: 'APR', events: [
    { name: 'BOTB Final',           sport: 'Football',       color: '#C4622D', time: '17:00', venue: 'Football Ground' },
    { name: 'Spoofit Grand Finale', sport: 'Common Council', color: '#D85A30', time: '20:00', venue: 'Gymkhana' },
  ]},
  { day: 'Saturday',  dayShort: 'SAT', date: 18, month: 'APR', events: [
    { name: 'Closing Ceremony',     sport: 'Common Council', color: '#D85A30', time: '19:00', venue: 'OAT' },
  ]},
];

export const SPORT_CATEGORIES = [
  { name: 'Aquatics',       color: '#378ADD' },
  { name: 'Athletics',      color: '#639922' },
  { name: 'Badminton',      color: '#1D9E75' },
  { name: 'Board Games',    color: '#888780' },
  { name: 'Common Council', color: '#D85A30' },
  { name: 'Cricket',        color: '#639922' },
  { name: 'Football',       color: '#C4622D' },
  { name: 'Hockey',         color: '#7F77DD' },
  { name: 'Indian Games',   color: '#D4537E' },
  { name: 'Lawn Tennis',    color: '#EF9F27' },
  { name: 'Squash',         color: '#378ADD' },
  { name: 'Table Tennis',   color: '#D85A30' },
  { name: 'Volleyball',     color: '#EF9F27' },
  { name: 'Weightlifting',  color: '#E24B4A' },
];

export const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const DAY_NAMES   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
