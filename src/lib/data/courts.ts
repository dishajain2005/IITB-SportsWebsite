export type CourtStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';

export type Court = {
  id: string;
  name: string;
  sport: string;
  status: CourtStatus;
  location: string;
  nextAvailable?: string;
  occupancy?: number;
  lastUpdated: string;
};

export const COURTS: Court[] = [
  { id: 'b-1',  name: 'Badminton Court 1',    sport: 'Badminton',    status: 'Occupied',     location: 'New SAC Indoor Hall',    nextAvailable: '18:30', occupancy: 100, lastUpdated: '5 mins ago' },
  { id: 'b-2',  name: 'Badminton Court 2',    sport: 'Badminton',    status: 'Available',    location: 'New SAC Indoor Hall',    occupancy: 0,           lastUpdated: '2 mins ago' },
  { id: 'bb-1', name: 'Basketball Court 1',   sport: 'Basketball',   status: 'Reserved',     location: 'Outdoor Sports Complex', nextAvailable: '20:00', occupancy: 0,   lastUpdated: '15 mins ago' },
  { id: 'bb-2', name: 'Basketball Court 2',   sport: 'Basketball',   status: 'Occupied',     location: 'Outdoor Sports Complex', nextAvailable: '19:15', occupancy: 80,  lastUpdated: '10 mins ago' },
  { id: 'tt-1', name: 'Table Tennis Table 1', sport: 'Table Tennis', status: 'Available',    location: 'Old SAC',                occupancy: 0,           lastUpdated: 'Just now' },
  { id: 'sq-1', name: 'Squash Court 1',       sport: 'Squash',       status: 'Maintenance',  location: 'New SAC',                                        lastUpdated: '1 hour ago' },
  { id: 'vb-1', name: 'Volleyball Court',     sport: 'Volleyball',   status: 'Available',    location: 'Outdoor Complex',        occupancy: 0,           lastUpdated: '8 mins ago' },
  { id: 'tn-1', name: 'Tennis Court 1',       sport: 'Lawn Tennis',  status: 'Occupied',     location: 'Tennis Hub',             nextAvailable: '19:30', occupancy: 100, lastUpdated: '12 mins ago' },
];

export const STATUS_COLORS: Record<CourtStatus, string> = {
  Available:   '#1D9E75',
  Occupied:    '#E24B4A',
  Maintenance: '#888780',
  Reserved:    '#EF9F27',
};

export const CARDS_DATA = [
  { id: 0, image: '/court status/indoor-cricket-practice-4635743.webp', label: 'PRIMARY FACILITY', number: '01', hasBadge: true },
  { id: 1, image: '/court status/2026-04-18_04.57.28.png',              label: 'OUTDOOR COMPLEX',  number: '02', hasBadge: false },
  { id: 2, image: '/court status/2026-04-18_04.58.38.png',              label: 'SAC HALL',         number: '03', hasBadge: false },
];
