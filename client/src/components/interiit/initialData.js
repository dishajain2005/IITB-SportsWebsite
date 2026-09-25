// Initial seed and fallback data for Inter IIT
export const INTER_IIT_SPORTS = [
  "Aquatics",
  "Athletics",
  "Badminton",
  "Basketball",
  "Cricket",
  "Football",
  "Hockey",
  "Lawn Tennis",
  "Squash",
  "Table Tennis",
  "Volleyball",
  "Weightlifting",
  "Chess"
];

export const DEFAULT_PASSCODE = "INTERIIT_IITB_2026";

export const INITIAL_DATA = {
  config: {
    adminPasscode: DEFAULT_PASSCODE,
    meetTitle: "57th Inter IIT Sports Meet",
    host: "IIT Bombay",
    dates: "Sept 28 - Oct 04, 2026",
    statusNote: "Aquatics Championship commencing September 28th at SAC Swimming Pool Complex"
  },
  streams: {
    "stream_aq_01": {
      id: "stream_aq_01",
      sport: "Aquatics",
      title: "Water Polo League Match — IIT Bombay vs IIT Madras",
      category: "Men",
      teamA: "IIT Bombay",
      teamB: "IIT Madras",
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      youtubeId: "ScMzIvxBSi4",
      status: "live",
      venue: "Olympic Swimming Pool, SAC",
      date: "2026-09-28",
      time: "16:00 IST",
      description: "High-stakes Water Polo encounter between host IIT Bombay and IIT Madras.",
      createdAt: 1727280000000
    },
    "stream_aq_02": {
      id: "stream_aq_02",
      sport: "Aquatics",
      title: "Swimming Finals Day 1 — 50m Freestyle & 4x100m Medley Relay",
      category: "Mixed",
      teamA: "All IITs",
      teamB: "Finals",
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      youtubeId: "ScMzIvxBSi4",
      status: "upcoming",
      venue: "Olympic Pool Complex",
      date: "2026-09-29",
      time: "17:30 IST",
      description: "Live broadcast of Men's & Women's Sprint Finals and Relay Events.",
      createdAt: 1727280001000
    },
    "stream_fb_01": {
      id: "stream_fb_01",
      sport: "Football",
      title: "Football Inaugural Clash — IIT Bombay vs IIT Delhi",
      category: "Men",
      teamA: "IIT Bombay",
      teamB: "IIT Delhi",
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      youtubeId: "ScMzIvxBSi4",
      status: "upcoming",
      venue: "Main Gymkhana Ground",
      date: "2026-10-01",
      time: "18:00 IST",
      description: "Group A high-voltage opening football fixture.",
      createdAt: 1727280002000
    }
  },
  schedules: {
    "sched_aq_01": {
      id: "sched_aq_01",
      sport: "Aquatics",
      title: "Men's 50m Freestyle Heats",
      category: "Men",
      stage: "Heats & Prelims",
      teamA: "IIT Bombay",
      teamB: "All IITs",
      date: "2026-09-28",
      time: "08:30 IST",
      venue: "SAC Olympic Pool (Lanes 1-8)",
      status: "scheduled",
      createdAt: 1727280000000
    },
    "sched_aq_02": {
      id: "sched_aq_02",
      sport: "Aquatics",
      title: "Women's 100m Breaststroke Heats",
      category: "Women",
      stage: "Heats",
      teamA: "IIT Bombay",
      teamB: "All IITs",
      date: "2026-09-28",
      time: "10:15 IST",
      venue: "SAC Olympic Pool",
      status: "scheduled",
      createdAt: 1727280001000
    },
    "sched_aq_03": {
      id: "sched_aq_03",
      sport: "Aquatics",
      title: "Men's Water Polo — IIT Bombay vs IIT Madras",
      category: "Men",
      stage: "League Stage (Group A)",
      teamA: "IIT Bombay",
      teamB: "IIT Madras",
      date: "2026-09-28",
      time: "16:00 IST",
      venue: "SAC Deep Pool",
      status: "scheduled",
      createdAt: 1727280002000
    },
    "sched_aq_04": {
      id: "sched_aq_04",
      sport: "Aquatics",
      title: "Men's Water Polo — IIT Kharagpur vs IIT Roorkee",
      category: "Men",
      stage: "League Stage (Group B)",
      teamA: "IIT Kharagpur",
      teamB: "IIT Roorkee",
      date: "2026-09-28",
      time: "17:30 IST",
      venue: "SAC Deep Pool",
      status: "scheduled",
      createdAt: 1727280003000
    },
    "sched_aq_05": {
      id: "sched_aq_05",
      sport: "Aquatics",
      title: "Men's 4x100m Freestyle Relay Final",
      category: "Men",
      stage: "Final",
      teamA: "Top 8 IITs",
      teamB: "Finalists",
      date: "2026-09-29",
      time: "18:00 IST",
      venue: "SAC Olympic Pool",
      status: "scheduled",
      createdAt: 1727280004000
    },
    "sched_bb_01": {
      id: "sched_bb_01",
      sport: "Basketball",
      title: "Basketball Quarter-Final 1 — IIT Bombay vs IIT Kanpur",
      category: "Men",
      stage: "Quarter-Final",
      teamA: "IIT Bombay",
      teamB: "IIT Kanpur",
      date: "2026-10-02",
      time: "17:00 IST",
      venue: "Indoor Basketball Court 1",
      status: "scheduled",
      createdAt: 1727280005000
    },
    "sched_bm_01": {
      id: "sched_bm_01",
      sport: "Badminton",
      title: "Women's Badminton Team Event — IIT Bombay vs IIT Guwahati",
      category: "Women",
      stage: "League Match 2",
      teamA: "IIT Bombay",
      teamB: "IIT Guwahati",
      date: "2026-10-02",
      time: "10:00 IST",
      venue: "SAC Badminton Hall Court 2",
      status: "scheduled",
      createdAt: 1727280006000
    }
  },
  results: {
    "res_aq_prev_01": {
      id: "res_aq_prev_01",
      sport: "Aquatics",
      title: "Men's 100m Butterfly Final",
      category: "Men",
      stage: "Final",
      teamA: "IIT Bombay (Advait K.)",
      scoreA: "58.42s (Gold 🥇)",
      teamB: "IIT Madras (R. Narayanan)",
      scoreB: "59.10s (Silver 🥈)",
      winner: "IIT Bombay",
      position: "1st Place (Gold)",
      venue: "SAC Olympic Pool",
      date: "2025-10-04",
      summary: "Advait K. secured Gold for IIT Bombay setting a meet-record timing of 58.42 seconds.",
      createdAt: 1727280000000
    },
    "res_aq_prev_02": {
      id: "res_aq_prev_02",
      sport: "Aquatics",
      title: "Men's Water Polo Championship Final",
      category: "Men",
      stage: "Gold Medal Match",
      teamA: "IIT Bombay",
      scoreA: "11",
      teamB: "IIT Kharagpur",
      scoreB: "7",
      winner: "IIT Bombay",
      position: "Champions (Gold 🥇)",
      venue: "SAC Deep Pool",
      date: "2025-10-05",
      summary: "Dominant display by IIT Bombay water polo squad to defend their Inter-IIT championship title.",
      createdAt: 1727280001000
    },
    "res_sq_01": {
      id: "res_sq_01",
      sport: "Squash",
      title: "Women's Squash Bronze Medal Match",
      category: "Women",
      stage: "3rd Place Playoff",
      teamA: "IIT Bombay",
      scoreA: "2",
      teamB: "IIT Roorkee",
      scoreB: "1",
      winner: "IIT Bombay",
      position: "Bronze 🥉",
      venue: "SAC Squash Courts",
      date: "2025-12-18",
      summary: "IIT Bombay Women's Squash team clinched the Bronze medal in a thrilling 3-setter thriller.",
      createdAt: 1727280002000
    },
    "res_at_01": {
      id: "res_at_01",
      sport: "Athletics",
      title: "Men's 4x400m Relay Final",
      category: "Men",
      stage: "Final",
      teamA: "IIT Bombay",
      scoreA: "3:21.84 (Gold 🥇)",
      teamB: "IIT Delhi",
      scoreB: "3:23.10 (Silver 🥈)",
      winner: "IIT Bombay",
      position: "Gold 🥇",
      venue: "Athletics Track",
      date: "2025-12-20",
      summary: "Anchor leg sprint brings home the Gold for IIT Bombay in the track & field showcase.",
      createdAt: 1727280003000
    }
  }
};

// Helper function to extract a clean 11-char YouTube ID from any YouTube URL
export function extractYouTubeId(url) {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  const liveMatch = trimmed.match(/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch) return liveMatch[1];

  return "";
}

export const LOCAL_STORAGE_KEY = "iitb_inter_iit_data";

export function getLocalInterIitData() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // Ignore error
  }
  return null;
}

export function saveLocalInterIitData(data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // Ignore error
  }
}
