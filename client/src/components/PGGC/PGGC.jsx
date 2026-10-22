import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Medal,
  Award,
  Flame,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowUpDown,
  ChevronRight,
} from "lucide-react";
import "./PGGC.css";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import {
  DEPARTMENTS,
  DEPT_BY_NAME,
  getDeptInitials,
  DEFAULT_STANDINGS,
  DEFAULT_SPORTS_DATA,
  DEFAULT_MATCHES,
  CONCLUDED_GCS,
} from "./pggcData";

export default function PGGC() {
  // Category state: 'overall' | 'boys' | 'girls'
  const [activeCategory, setActiveCategory] = useState("overall");

  // Search and Sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("points"); // default to points ranking

  // Selected Department for deep-dive dossier
  const [selectedDeptName, setSelectedDeptName] = useState("Civil");

  // Selected Sport for disciplines matrix
  const [selectedSport, setSelectedSport] = useState("Table Tennis (Boys)");

  // Selected Match for HUD spotlight
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [isCommentaryOpen, setIsCommentaryOpen] = useState(true);

  // Live Section View Tab: 'concluded' | 'spotlight' | 'upcoming'
  const [liveTab, setLiveTab] = useState("concluded");

  // Live Data State (Synced with Firebase if node exists)
  const [standingsState, setStandingsState] = useState(DEFAULT_STANDINGS);
  const [sportsDataState, setSportsDataState] = useState(DEFAULT_SPORTS_DATA);
  const [matchesState, setMatchesState] = useState(DEFAULT_MATCHES);

  useEffect(() => {
    try {
      const pggcRef = ref(db, "pggc");
      const unsub = onValue(pggcRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          if (val.standings) {
            setStandingsState({
              overall: val.standings.overall || DEFAULT_STANDINGS.overall,
              boys: val.standings.boys || DEFAULT_STANDINGS.boys,
              girls: val.standings.girls || DEFAULT_STANDINGS.girls,
            });
          }
          if (val.sportsData) {
            setSportsDataState(val.sportsData);
          }
          if (val.matches) {
            setMatchesState(val.matches);
          }
        }
      });
      return () => unsub();
    } catch (e) {
      console.warn("Firebase pggc hook running in offline fallback mode", e);
    }
  }, []);

  // Standings for current active category
  const currentStandings = useMemo(() => {
    return standingsState[activeCategory] || DEFAULT_STANDINGS[activeCategory] || [];
  }, [standingsState, activeCategory]);

  // Check if any points have been awarded yet
  const hasAnyPoints = useMemo(() => {
    return currentStandings.some(
      (d) => d && d.points !== null && d.points !== undefined && d.points > 0
    );
  }, [currentStandings]);

  // Filtered & sorted table list
  const displayDepartments = useMemo(() => {
    let list = [...currentStandings];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((dept) =>
        dept.name.toLowerCase().includes(q)
      );
    }
    if (sortBy === "points") {
      if (hasAnyPoints) {
        list.sort((a, b) => (b.points || 0) - (a.points || 0));
      } else {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [currentStandings, searchQuery, sortBy, hasAnyPoints]);

  // Top 3 Podium
  const podium = useMemo(() => {
    if (!hasAnyPoints) {
      return [
        { name: "To Be Determined", points: null, gold: null, silver: null, bronze: null },
        { name: "To Be Determined", points: null, gold: null, silver: null, bronze: null },
        { name: "To Be Determined", points: null, gold: null, silver: null, bronze: null },
      ];
    }
    const sorted = [...currentStandings].sort((a, b) => (b.points || 0) - (a.points || 0));
    return sorted.slice(0, 3);
  }, [currentStandings, hasAnyPoints]);

  // Selected Department Dossier details
  const selectedDeptMeta = useMemo(() => {
    return DEPT_BY_NAME[selectedDeptName] || DEPARTMENTS[0];
  }, [selectedDeptName]);

  const selectedDeptStanding = useMemo(() => {
    const idx = currentStandings.findIndex((d) => d.name === selectedDeptName);
    const item = idx !== -1 ? currentStandings[idx] : null;
    return {
      rank: item && item.points !== null && item.points !== undefined ? idx + 1 : "—",
      points: item && item.points !== null && item.points !== undefined ? item.points : "—",
      gold: item && item.gold !== null && item.gold !== undefined ? item.gold : "—",
      silver: item && item.silver !== null && item.silver !== undefined ? item.silver : "—",
      bronze: item && item.bronze !== null && item.bronze !== undefined ? item.bronze : "—",
    };
  }, [currentStandings, selectedDeptName]);

  // Department's points across sports
  const selectedDeptSportPoints = useMemo(() => {
    const results = [];
    Object.entries(sportsDataState).forEach(([sportName, items]) => {
      if (Array.isArray(items)) {
        const match = items.find((item) => item.name === selectedDeptName);
        if (match && match.points > 0) {
          results.push({ sport: sportName, points: match.points });
        }
      }
    });
    return results;
  }, [sportsDataState, selectedDeptName]);

  // Matches list
  const matchesList = useMemo(() => {
    return Object.values(matchesState).filter(Boolean);
  }, [matchesState]);

  // Active spotlight match (null if no matches exist)
  const spotlightMatch = useMemo(() => {
    if (matchesList.length === 0) return null;
    return (
      matchesList.find((m) => m.id === selectedMatchId) ||
      matchesList[0] ||
      null
    );
  }, [matchesList, selectedMatchId]);

  // Sport results for chosen sport
  const selectedSportRankings = useMemo(() => {
    return sportsDataState[selectedSport] || [];
  }, [sportsDataState, selectedSport]);

  const sportsKeys = Object.keys(sportsDataState);

  return (
    <div className="pggc-root">
      {/* 1. TOP LIVE DISPATCH STRIP */}
      <div className="pggc-live-dispatch">
        <div className="pggc-dispatch-badge">
          <span className="pggc-live-dot" />
          <span className="pggc-dispatch-text">PGGC Live Arena</span>
          <span>· Inter-Departmental Championship</span>
        </div>
        <div className="pggc-dispatch-meta">
          <span>
            GCs Concluded: <strong>{CONCLUDED_GCS.length} Completed</strong>
          </span>
          <span>Departments: <strong>{DEPARTMENTS.length} Contesting</strong></span>
        </div>
      </div>

      <div className="pggc-container">
        {/* 2. EDITORIAL MASTHEAD */}
        <header className="pggc-masthead">
          <div className="pggc-masthead-mark">
            <span className="crest">PG</span>
            <span>PGGC · Vol. LXVI</span>
          </div>
          <div className="pggc-masthead-meta">
            <span><strong>IIT Bombay</strong> · Powai</span>
            <span>Est. <strong>1958</strong></span>
            <span>Academic Season <strong>2026–27</strong></span>
          </div>
        </header>

        {/* 3. HERO BANNER */}
        <section className="pggc-hero">
          <div className="pggc-hero-kicker">
            <span>Issue § PG-66</span>
            <span className="sep">·</span>
            <span>The Inter-Departmental Arena</span>
          </div>

          <div className="pggc-hero-layout">
            <div>
              <h1 className="pggc-hero-title">PGGC</h1>
              <p className="pggc-hero-lede">
                Twenty-nine departments and centres across engineering, sciences, design, and management.
                From lab benches to the floodlit arenas of Gymkhana — one department hovers
                above all to hoist the coveted PGGC rolling trophy.
              </p>
            </div>

            <div className="pggc-hero-stats-grid">
              <div className="pggc-hero-stat-card">
                <span className="label">Departments</span>
                <span className="value">{DEPARTMENTS.length}</span>
                <span className="sub">Engineering, Science & Design</span>
              </div>
              <div className="pggc-hero-stat-card">
                <span className="label">Disciplines</span>
                <span className="value">{sportsKeys.length}</span>
                <span className="sub">Indoor & Outdoor Arenas</span>
              </div>
              <div className="pggc-hero-stat-card">
                <span className="label">GCs Completed</span>
                <span className="value">{CONCLUDED_GCS.length}</span>
                <span className="sub">6 of {sportsKeys.length} Concluded</span>
              </div>
              <div className="pggc-hero-stat-card">
                <span className="label">Championship Leader</span>
                <span className="value">{currentStandings[0]?.name || "Civil"}</span>
                <span className="sub">{currentStandings[0]?.points || 30} Total Points</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONTROL BAR: CATEGORY TABS & FILTER */}
        <div className="pggc-control-bar">
          <div className="pggc-category-tabs">
            <button
              className={`pggc-cat-btn ${activeCategory === "overall" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("overall")}
            >
              <Trophy size={14} /> Overall Trophy
            </button>
            <button
              className={`pggc-cat-btn ${activeCategory === "boys" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("boys")}
            >
              Men&rsquo;s PGGC
            </button>
            <button
              className={`pggc-cat-btn ${activeCategory === "girls" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("girls")}
            >
              Women&rsquo;s PGGC
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <div className="pggc-search-wrap">
              <Search size={14} color="var(--muted-2)" />
              <input
                type="text"
                placeholder="Search department (e.g. Computer Science, Aerospace)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              className="pggc-sort-btn"
              onClick={() => setSortBy(sortBy === "points" ? "alpha" : "points")}
              title="Toggle sorting"
            >
              <ArrowUpDown size={13} />
              {sortBy === "points" ? "Sort: Points (Rank)" : "Sort: Alphabetical"}
            </button>
          </div>
        </div>

        {/* 5. CENTERSTAGE: LIVE MATCH SCORECARD HUD & CONCLUDED GCS */}
        <section className="pggc-live-center" id="live-arena">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 01</span>
              <span>·</span>
              <span>Live Match Arena &amp; GC Tournament Tracker</span>
              <span className="bar" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 className="pggc-section-title">
                  Match <span className="italic">Spotlight &amp; Tracker</span>.
                </h2>
                <p className="pggc-section-sub">
                  Real-time score updates, completed tournament GCs, and upcoming department fixtures direct from Powai.
                </p>
              </div>

              {/* Options in the live section */}
              <div className="pggc-live-options-bar">
                <button
                  className={`pggc-live-opt-btn ${liveTab === "concluded" ? "is-active" : ""}`}
                  onClick={() => setLiveTab("concluded")}
                >
                  <Trophy size={14} />
                  <span>Completed GCs ({CONCLUDED_GCS.length})</span>
                </button>
                <button
                  className={`pggc-live-opt-btn ${liveTab === "spotlight" ? "is-active" : ""}`}
                  onClick={() => setLiveTab("spotlight")}
                >
                  <Flame size={14} />
                  <span>Match Spotlight</span>
                </button>
                <button
                  className={`pggc-live-opt-btn ${liveTab === "upcoming" ? "is-active" : ""}`}
                  onClick={() => setLiveTab("upcoming")}
                >
                  <Clock size={14} />
                  <span>Upcoming Schedule</span>
                </button>
              </div>
            </div>
          </div>

          {/* Season Progress Ribbon */}
          <div className="pggc-season-progress-ribbon">
            <div className="pggc-season-progress-info">
              <span className="pggc-progress-tag">
                <span className="pggc-live-dot" /> {CONCLUDED_GCS.length} of {sportsKeys.length} PGGC Disciplines Concluded
              </span>
              <span className="pggc-progress-meta">
                Concluded: Table Tennis (Boys &amp; Girls), Chess (Mixed), Carrom (Boys &amp; Girls), Squash (Boys)
              </span>
            </div>
            <div className="pggc-progress-track">
              <div
                className="pggc-progress-fill"
                style={{ width: `${Math.round((CONCLUDED_GCS.length / sportsKeys.length) * 100)}%` }}
              />
            </div>
          </div>

          {/* Option 1: Concluded GCs */}
          {liveTab === "concluded" && (
            <div className="pggc-concluded-gcs-grid">
              {CONCLUDED_GCS.map((gc) => (
                <div key={gc.id} className="pggc-concluded-card">
                  <div>
                    <div className="pggc-concluded-card-top">
                      <div>
                        <h4 className="pggc-concluded-sport-title">{gc.sport}</h4>
                        <span className="pggc-concluded-category-pill">{gc.category}</span>
                      </div>
                      <span className="pggc-status-pill finished" style={{ fontSize: "9px" }}>
                        Concluded
                      </span>
                    </div>

                    <div className="pggc-concluded-podium-stack">
                      <div className="pggc-concluded-podium-row gold">
                        <div className="pggc-concluded-dept-info">
                          <span className="pggc-podium-place-badge gold">1st</span>
                          <span className="pggc-dept-name">{gc.gold}</span>
                        </div>
                        <span className="pggc-pts-chip gold">+{gc.goldPoints} pts</span>
                      </div>
                      <div className="pggc-concluded-podium-row silver">
                        <div className="pggc-concluded-dept-info">
                          <span className="pggc-podium-place-badge silver">2nd</span>
                          <span className="pggc-dept-name">{gc.silver}</span>
                        </div>
                        <span className="pggc-pts-chip silver">+{gc.silverPoints} pts</span>
                      </div>
                      <div className="pggc-concluded-podium-row bronze">
                        <div className="pggc-concluded-dept-info">
                          <span className="pggc-podium-place-badge bronze">3rd</span>
                          <span className="pggc-dept-name">{gc.bronze}</span>
                        </div>
                        <span className="pggc-pts-chip bronze">+{gc.bronzePoints} pts</span>
                      </div>
                    </div>

                    <p className="pggc-concluded-desc">{gc.description}</p>
                  </div>

                  <button
                    className="pggc-concluded-action-btn"
                    onClick={() => {
                      setSelectedSport(gc.sport);
                      const el = document.getElementById("disciplines-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>View Discipline Standings</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Option 2: Live / Spotlight Match HUD */}
          {liveTab === "spotlight" && (
            spotlightMatch ? (
              <div className="pggc-arena-grid">
                {/* Left: Spotlight Match HUD */}
                <div className="pggc-featured-hud">
                  <div className="pggc-hud-badge-bar">
                    <span className={`pggc-status-pill ${spotlightMatch.status}`}>
                      {spotlightMatch.status === "live" && <span className="pggc-live-dot" />}
                      {spotlightMatch.status}
                    </span>

                    <div className="pggc-hud-sport-title">
                      <Flame size={15} color="var(--primary-light)" />
                      <span>{spotlightMatch.sport}</span>
                      <span className="pggc-hud-stage">· {spotlightMatch.stage}</span>
                    </div>
                  </div>

                  {/* Faceoff */}
                  <div className="pggc-faceoff">
                    <div className="pggc-team-pane">
                      <span className="pggc-team-emblem">
                        {getDeptInitials(spotlightMatch.teamA)}
                      </span>
                      <div className="pggc-team-name-lg">{spotlightMatch.teamA}</div>
                      <div className="pggc-team-score-num">{spotlightMatch.scoreA}</div>
                    </div>

                    <div className="pggc-score-vs-divider">
                      <span className="pggc-vs-badge">VS</span>
                    </div>

                    <div className="pggc-team-pane align-right">
                      <span className="pggc-team-emblem">
                        {getDeptInitials(spotlightMatch.teamB)}
                      </span>
                      <div className="pggc-team-name-lg">{spotlightMatch.teamB}</div>
                      <div className="pggc-team-score-num">{spotlightMatch.scoreB}</div>
                    </div>
                  </div>

                  {/* Venue & Clock */}
                  <div className="pggc-hud-meta-bar">
                    <span>
                      <MapPin size={13} color="var(--primary-light)" />
                      {spotlightMatch.venue || "Gymkhana Sports Complex"}
                    </span>
                    <span>
                      <Clock size={13} color="var(--primary-light)" />
                      {spotlightMatch.time || "Scheduled"}
                    </span>
                  </div>

                  {/* Commentary Drawer */}
                  {spotlightMatch.liveUpdates && (
                    <div className="pggc-commentary-drawer">
                      <button
                        className="pggc-comm-toggle-btn"
                        onClick={() => setIsCommentaryOpen(!isCommentaryOpen)}
                      >
                        <span>Play-by-Play Commentary &amp; Highlights</span>
                        {isCommentaryOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isCommentaryOpen && (
                        <div className="pggc-commentary-feed-list">
                          {Object.values(spotlightMatch.liveUpdates)
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map((item, idx) => (
                              <div key={idx} className="pggc-comm-item">
                                <span className="time">
                                  {new Date(item.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                <span className="text">{item.message}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: Fixture Selector Strip */}
                <div>
                  <div style={{ marginBottom: "10px", fontSize: "12px", color: "var(--muted-2)", fontFamily: "JetBrains Mono, monospace" }}>
                    HIGHLIGHTED PGGC MATCHES ({matchesList.length})
                  </div>
                  <div className="pggc-fixtures-scroll">
                    {matchesList.map((m) => {
                      const isSelected = m.id === spotlightMatch.id;
                      return (
                        <button
                          key={m.id}
                          className={`pggc-fixture-card ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedMatchId(m.id)}
                        >
                          <div className="pggc-fix-top">
                            <span>{m.sport} · {m.stage}</span>
                            <span className={`pggc-status-pill ${m.status}`} style={{ fontSize: "9px", padding: "2px 6px" }}>
                              {m.status}
                            </span>
                          </div>
                          <div className="pggc-fix-teams">
                            <span>{getDeptInitials(m.teamA)} ({m.scoreA})</span>
                            <span style={{ color: "var(--muted-2)", fontSize: "10px" }}>vs</span>
                            <span>{getDeptInitials(m.teamB)} ({m.scoreB})</span>
                          </div>
                          <div className="pggc-fix-meta">
                            <span>{m.venue}</span>
                            <span>{m.time}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pggc-featured-hud pggc-hud-blank">
                <div className="pggc-hud-badge-bar">
                  <span className="pggc-status-pill upcoming">
                    FIXTURES SCHEDULED
                  </span>
                  <div className="pggc-hud-sport-title">
                    <Flame size={15} color="var(--primary-light)" />
                    <span>PGGC Season</span>
                  </div>
                </div>

                <div className="pggc-blank-state-content">
                  <div className="pggc-blank-state-icon">
                    <Clock size={24} />
                  </div>
                  <h3 className="pggc-blank-title">Live Scorecard Awaiting Active Match Broadcast</h3>
                  <p className="pggc-blank-desc">
                    Upcoming department matches, live set scores, and play-by-play commentary will stream here in real-time as matches get underway.
                  </p>
                  <div className="pggc-blank-tags">
                    <span>{DEPARTMENTS.length} Departments Registered</span>
                    <span>·</span>
                    <span>{sportsKeys.length} Disciplines</span>
                    <span>·</span>
                    <span>{CONCLUDED_GCS.length} GCs Concluded</span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Option 3: Upcoming Disciplines */}
          {liveTab === "upcoming" && (
            <div className="pggc-upcoming-disciplines-grid">
              {[
                { sport: "Cricket", venue: "Gymkhana Cricket Grounds", dates: "Upcoming Round 1" },
                { sport: "Football", venue: "Gymkhana Football Field", dates: "Upcoming Knockouts" },
                { sport: "Badminton", venue: "SAC Indoor Badminton Courts", dates: "Fixtures Announced" },
                { sport: "Basketball", venue: "Gymkhana Basketball Courts", dates: "Group Stages" },
                { sport: "Volleyball", venue: "Gymkhana Volleyball Courts", dates: "Fixtures Scheduled" },
                { sport: "Athletics", venue: "IITB Sports Complex Track", dates: "Track & Field Meets" },
                { sport: "Squash (Girls)", venue: "Gymkhana Squash Courts", dates: "Awaiting Schedule" },
                { sport: "Lawn Tennis", venue: "SAC Tennis Courts", dates: "Inter-Department Ties" },
                { sport: "Weightlifting", venue: "SAC Powerlifting Arena", dates: "Category Weigh-ins" },
                { sport: "Tug of War", venue: "Gymkhana Ground", dates: "Heavyweight Battles" },
                { sport: "Aquatics", venue: "IITB Swimming Pool", dates: "Sprint & Relay Heats" },
              ].map((up) => (
                <div key={up.sport} className="pggc-upcoming-card">
                  <div>
                    <h5 className="pggc-upcoming-card-title">{up.sport}</h5>
                    <span style={{ fontSize: "11px", color: "var(--muted-2)", fontFamily: "JetBrains Mono, monospace" }}>
                      {up.venue}
                    </span>
                  </div>
                  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="pggc-status-pill upcoming" style={{ fontSize: "9px" }}>
                      {up.dates}
                    </span>
                    <button
                      className="pggc-sort-btn"
                      style={{ fontSize: "10px", padding: "4px 8px" }}
                      onClick={() => {
                        setSelectedSport(up.sport);
                        const el = document.getElementById("disciplines-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Standings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. THE PODIUM: TOP 3 DEPARTMENTS */}
        <section className="pggc-podium-section">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 02</span>
              <span>·</span>
              <span>Championship Podium</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Top <span className="italic">Contenders</span>.
            </h2>
            <p className="pggc-section-sub">
              Leading the medal chase for the {activeCategory === "overall" ? "Overall" : activeCategory === "boys" ? "Men's" : "Women's"} PGGC Trophy.
            </p>
          </div>

          <div className="pggc-podium-grid">
            {/* Rank 2 (Silver) */}
            <div className="pggc-podium-card rank-2">
              <div>
                <div className="pggc-podium-top">
                  <span className="pggc-podium-crown">
                    <Medal size={16} /> 02 Runner-Up
                  </span>
                  <span className="pggc-team-emblem" style={{ width: "36px", height: "36px", fontSize: "11px" }}>
                    {podium[1]?.name !== "To Be Determined" ? getDeptInitials(podium[1]?.name || "") : "—"}
                  </span>
                </div>
                <h3 className="pggc-podium-dept-name">{podium[1]?.name || "To Be Determined"}</h3>
                <div className="pggc-podium-score">
                  {podium[1]?.points !== null && podium[1]?.points !== undefined ? podium[1].points : "—"} <span>pts</span>
                </div>
              </div>
              <div className="pggc-podium-medals-tally">
                <span className="pggc-tally-chip gold has-medal">
                  <span className="chip-tag">G</span>
                  <span className="chip-val">{podium[1]?.gold ?? 0}</span>
                </span>
                <span className="pggc-tally-chip silver has-medal">
                  <span className="chip-tag">S</span>
                  <span className="chip-val">{podium[1]?.silver ?? 0}</span>
                </span>
                <span className="pggc-tally-chip bronze has-medal">
                  <span className="chip-tag">B</span>
                  <span className="chip-val">{podium[1]?.bronze ?? 0}</span>
                </span>
              </div>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="pggc-podium-card rank-1">
              <div>
                <div className="pggc-podium-top">
                  <span className="pggc-podium-crown">
                    <Trophy size={18} /> 01 Champion Leader
                  </span>
                  <span className="pggc-team-emblem" style={{ width: "42px", height: "42px", fontSize: "12px", borderColor: "var(--gold)" }}>
                    {podium[0]?.name !== "To Be Determined" ? getDeptInitials(podium[0]?.name || "") : "—"}
                  </span>
                </div>
                <h3 className="pggc-podium-dept-name">{podium[0]?.name || "To Be Determined"}</h3>
                <div className="pggc-podium-score" style={{ color: "var(--gold)" }}>
                  {podium[0]?.points !== null && podium[0]?.points !== undefined ? podium[0].points : "—"} <span>pts</span>
                </div>
              </div>
              <div className="pggc-podium-medals-tally">
                <span className="pggc-tally-chip gold has-medal">
                  <span className="chip-tag">G</span>
                  <span className="chip-val">{podium[0]?.gold ?? 0}</span>
                </span>
                <span className="pggc-tally-chip silver has-medal">
                  <span className="chip-tag">S</span>
                  <span className="chip-val">{podium[0]?.silver ?? 0}</span>
                </span>
                <span className="pggc-tally-chip bronze has-medal">
                  <span className="chip-tag">B</span>
                  <span className="chip-val">{podium[0]?.bronze ?? 0}</span>
                </span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="pggc-podium-card rank-3">
              <div>
                <div className="pggc-podium-top">
                  <span className="pggc-podium-crown">
                    <Award size={16} /> 03 Third Place
                  </span>
                  <span className="pggc-team-emblem" style={{ width: "36px", height: "36px", fontSize: "11px" }}>
                    {podium[2]?.name !== "To Be Determined" ? getDeptInitials(podium[2]?.name || "") : "—"}
                  </span>
                </div>
                <h3 className="pggc-podium-dept-name">{podium[2]?.name || "To Be Determined"}</h3>
                <div className="pggc-podium-score">
                  {podium[2]?.points !== null && podium[2]?.points !== undefined ? podium[2].points : "—"} <span>pts</span>
                </div>
              </div>
              <div className="pggc-podium-medals-tally">
                <span className="pggc-tally-chip gold has-medal">
                  <span className="chip-tag">G</span>
                  <span className="chip-val">{podium[2]?.gold ?? 0}</span>
                </span>
                <span className="pggc-tally-chip silver has-medal">
                  <span className="chip-tag">S</span>
                  <span className="chip-val">{podium[2]?.silver ?? 0}</span>
                </span>
                <span className="pggc-tally-chip bronze has-medal">
                  <span className="chip-tag">B</span>
                  <span className="chip-val">{podium[2]?.bronze ?? 0}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DUAL PANE: DEPARTMENTS LEDGER & DEPARTMENT DOSSIER */}
        <section className="pggc-ledger-section">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 03</span>
              <span>·</span>
              <span>The {DEPARTMENTS.length}-Department Ledger &amp; Dossier</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Complete <span className="italic">Standings</span>.
            </h2>
            <p className="pggc-section-sub">
              Every department and centre in official ranking order. Click any department row to inspect their sporting dossier.
            </p>
          </div>

          <div className="pggc-dual-ledger">
            {/* Table of all departments */}
            <div className="pggc-table-card">
              <div className="pggc-table-header">
                <h3>Department Ledger</h3>
                <span>{displayDepartments.length} of {DEPARTMENTS.length} Departments Listed</span>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table className="pggc-table">
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }}>Rank</th>
                      <th>Department Name</th>
                      <th style={{ textAlign: "center", width: "90px" }}>Medals</th>
                      <th style={{ textAlign: "right", width: "90px" }}>Points</th>
                      <th style={{ width: "40px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDepartments.map((dept, idx) => {
                      const isSelected = dept.name === selectedDeptName;
                      const origRank = currentStandings.findIndex((d) => d.name === dept.name) + 1;
                      const rankClass = hasAnyPoints
                        ? origRank === 1
                          ? "rank-gold-text"
                          : origRank === 2
                          ? "rank-silver-text"
                          : origRank === 3
                          ? "rank-bronze-text"
                          : ""
                        : "";

                      return (
                        <tr
                          key={dept.name}
                          className={isSelected ? "is-selected-dept" : ""}
                          onClick={() => setSelectedDeptName(dept.name)}
                        >
                          <td>
                            <span className={`pggc-rank-badge ${rankClass}`}>
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </td>
                          <td>
                            <div className="pggc-dept-cell">
                              <span className="pggc-dept-badge">
                                {getDeptInitials(dept.name)}
                              </span>
                              <span className="pggc-dept-fullname">
                                {dept.name}
                              </span>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {dept.points !== null && dept.points !== undefined ? (
                              <div className="pggc-table-medals-group">
                                <span className={`pggc-tally-chip gold ${dept.gold > 0 ? "has-medal" : ""}`} title="Gold">
                                  <span className="chip-tag">G</span>
                                  <span className="chip-val">{dept.gold || 0}</span>
                                </span>
                                <span className={`pggc-tally-chip silver ${dept.silver > 0 ? "has-medal" : ""}`} title="Silver">
                                  <span className="chip-tag">S</span>
                                  <span className="chip-val">{dept.silver || 0}</span>
                                </span>
                                <span className={`pggc-tally-chip bronze ${dept.bronze > 0 ? "has-medal" : ""}`} title="Bronze">
                                  <span className="chip-tag">B</span>
                                  <span className="chip-val">{dept.bronze || 0}</span>
                                </span>
                              </div>
                            ) : (
                              <span style={{ color: "var(--muted-2)" }}>—</span>
                            )}
                          </td>
                          <td className="pggc-points-cell">
                            {dept.points !== null && dept.points !== undefined ? dept.points : "—"}
                          </td>
                          <td>
                            <ChevronRight size={14} color="var(--muted-2)" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Department Dossier Card */}
            <div className="pggc-dossier-card">
              <span className="pggc-dossier-badge">
                DEPARTMENT DOSSIER · {selectedDeptMeta.shortCode}
              </span>
              <h3 className="pggc-dossier-title">{selectedDeptName}</h3>
              <p className="pggc-dossier-desc">{selectedDeptMeta.description}</p>

              <div className="pggc-dossier-stats-row">
                <div className="pggc-dossier-stat-box">
                  <span className="k">Current Rank</span>
                  <span className="v">{selectedDeptStanding.rank}</span>
                </div>
                <div className="pggc-dossier-stat-box">
                  <span className="k">Total Points</span>
                  <span className="v">{selectedDeptStanding.points}</span>
                </div>
              </div>

              <div className="pggc-dossier-medals-bar">
                <div className="pggc-dossier-medal-col gold">
                  <span className="label">Gold</span>
                  <span className="num">{selectedDeptStanding.gold !== "—" ? selectedDeptStanding.gold : 0}</span>
                </div>
                <div className="pggc-dossier-medal-col silver">
                  <span className="label">Silver</span>
                  <span className="num">{selectedDeptStanding.silver !== "—" ? selectedDeptStanding.silver : 0}</span>
                </div>
                <div className="pggc-dossier-medal-col bronze">
                  <span className="label">Bronze</span>
                  <span className="num">{selectedDeptStanding.bronze !== "—" ? selectedDeptStanding.bronze : 0}</span>
                </div>
              </div>

              <div style={{ fontSize: "11px", fontFamily: "JetBrains Mono, monospace", color: "var(--muted-2)", textTransform: "uppercase", marginBottom: "8px" }}>
                Sport-wise Scoring Contributions
              </div>

              <div className="pggc-dossier-sports-list">
                {selectedDeptSportPoints.length > 0 ? (
                  selectedDeptSportPoints.map((sp) => (
                    <div key={sp.sport} className="pggc-dossier-sport-item">
                      <span className="sname">{sp.sport}</span>
                      <span className="spts">+{sp.points} pts</span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: "12px", color: "var(--muted-2)", padding: "12px", textAlign: "center" }}>
                    Participation recorded across multiple qualifiers. Official point tallies will be recorded once fixtures conclude.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 8. DISCIPLINES MATRIX (Horizontal Pill Strip & Sport Podiums) */}
        <section className="pggc-disciplines-section" id="disciplines-section">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 04</span>
              <span>·</span>
              <span>Sport-Wise Results Matrix</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Discipline <span className="italic">Battlegrounds</span>.
            </h2>
            <p className="pggc-section-sub">
              Select any sport discipline to see which department secured gold, silver, and bronze.
            </p>
          </div>

          <div className="pggc-sports-scroll-bar">
            {sportsKeys.map((sport) => (
              <button
                key={sport}
                className={`pggc-sport-tab-btn ${selectedSport === sport ? "is-active" : ""}`}
                onClick={() => setSelectedSport(sport)}
              >
                <Flame size={12} />
                {sport}
              </button>
            ))}
          </div>

          {/* Sport Results Board */}
          <div className="pggc-sport-results-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--rule)", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Flame size={20} color="var(--primary-light)" />
                <h3 style={{ margin: 0, fontFamily: "'Inter Tight', 'Inter', -apple-system, sans-serif", fontSize: "18px", fontWeight: "700", color: "#fff" }}>
                  {selectedSport} Tournament Results
                </h3>
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--muted)" }}>
                PGGC Official Scorecard
              </span>
            </div>

            {selectedSportRankings.length > 0 ? (
              <div>
                <div className="pggc-sport-result-podium">
                  {selectedSportRankings[0] && (
                    <div className="pggc-sport-medal-box gold">
                      <div className="badge">
                        <Trophy size={14} /> Winner · Gold Medal
                      </div>
                      <div className="dname">{selectedSportRankings[0].name}</div>
                      <div className="dpts">{selectedSportRankings[0].points} Points</div>
                    </div>
                  )}

                  {selectedSportRankings[1] && (
                    <div className="pggc-sport-medal-box silver">
                      <div className="badge">
                        <Medal size={14} /> Runner-up · Silver Medal
                      </div>
                      <div className="dname">{selectedSportRankings[1].name}</div>
                      <div className="dpts">{selectedSportRankings[1].points} Points</div>
                    </div>
                  )}

                  {selectedSportRankings[2] && (
                    <div className="pggc-sport-medal-box bronze">
                      <div className="badge">
                        <Award size={14} /> Third Place · Bronze Medal
                      </div>
                      <div className="dname">{selectedSportRankings[2].name}</div>
                      <div className="dpts">{selectedSportRankings[2].points} Points</div>
                    </div>
                  )}
                </div>

                {/* Full Sport Standings Table */}
                {selectedSportRankings.length > 3 && (
                  <div className="pggc-sport-rest-section">
                    <div className="pggc-sport-rest-title">All Scoring Departments in {selectedSport}</div>
                    <div style={{ overflowX: "auto" }}>
                      <table className="pggc-sport-rest-table">
                        <thead>
                          <tr>
                            <th style={{ width: "60px" }}>Rank</th>
                            <th>Department</th>
                            <th style={{ textAlign: "right", width: "100px" }}>Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSportRankings.map((team, idx) => (
                            <tr key={team.name}>
                              <td>
                                <span className={`pggc-rank-badge ${idx === 0 ? "rank-gold-text" : idx === 1 ? "rank-silver-text" : idx === 2 ? "rank-bronze-text" : ""}`}>
                                  #{idx + 1}
                                </span>
                              </td>
                              <td>
                                <div className="pggc-dept-cell">
                                  <span className="pggc-dept-badge">{getDeptInitials(team.name)}</span>
                                  <span className="pggc-dept-fullname">{team.name}</span>
                                </div>
                              </td>
                              <td style={{ textAlign: "right", fontWeight: "600", color: idx < 3 ? "var(--cream)" : "var(--muted)" }}>
                                +{team.points} pts
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="pggc-sport-empty-box">
                <p>
                  Official fixtures &amp; medal standings for <strong>{selectedSport}</strong> are currently awaiting tournament results. Scores will appear here once verified by match officials.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 9. ALL DEPARTMENTS DIRECTORY (Strict Alphabetical Order) */}
        <section className="pggc-directory-section">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 05</span>
              <span>·</span>
              <span>Roster of {DEPARTMENTS.length} Academic Departments &amp; Centres</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Complete <span className="italic">Department Directory</span>.
            </h2>
            <p className="pggc-section-sub">
              All {DEPARTMENTS.length} postgraduate departments and centres presented in strict alphabetical order with complete official names.
            </p>
          </div>

          <div className="pggc-departments-grid">
            {DEPARTMENTS.map((dept, index) => {
              const standing = currentStandings.find((d) => d.name === dept.fullName);
              const rank = currentStandings.findIndex((d) => d.name === dept.fullName) + 1;

              return (
                <div
                  key={dept.id}
                  className="pggc-dept-card"
                  onClick={() => {
                    setSelectedDeptName(dept.fullName);
                    window.scrollTo({ top: 900, behavior: "smooth" });
                  }}
                >
                  <div>
                    <div className="pggc-dept-card-top">
                      <span className="pggc-dept-card-emblem">{dept.shortCode}</span>
                      <span className="pggc-dept-card-cat">{dept.category}</span>
                    </div>

                    <h4 className="pggc-dept-card-name" style={{ marginTop: "10px" }}>
                      {dept.fullName}
                    </h4>
                    <p className="pggc-dept-card-desc">{dept.description}</p>
                  </div>

                  <div className="pggc-dept-card-footer">
                    <span className="rank">
                      {standing && standing.points !== null && standing.points !== undefined
                        ? `Rank #${rank}`
                        : `No. ${String(index + 1).padStart(2, "0")}`}
                    </span>
                    <span className="points">
                      {standing && standing.points !== null && standing.points !== undefined
                        ? `${standing.points} pts`
                        : "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. FOOTER / COLOPHON */}
        <footer className="pggc-footer">
          <div>
            <em>Indian Institute of Technology Bombay · PGGC</em>
          </div>
          <div>
            <em>Set in HighSchoolUsaSans, Inter Tight &amp; JetBrains Mono.</em> &nbsp;·&nbsp;{" "}
            <Link to="/gc-admin">GC Admin Scorekeeper Portal</Link>
          </div>
          <div style={{ color: "var(--muted-2)", fontSize: "10px" }}>
            Designed strictly for IITB Sports · Branch Chirag_26/11 · {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </div>
  );
}
