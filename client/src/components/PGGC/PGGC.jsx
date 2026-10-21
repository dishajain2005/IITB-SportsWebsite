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
} from "./pggcData";

export default function PGGC() {
  // Category state: 'overall' | 'boys' | 'girls'
  const [activeCategory, setActiveCategory] = useState("overall");

  // Search and Sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("points"); // 'points' | 'alpha'

  // Selected Department for deep-dive dossier
  const [selectedDeptName, setSelectedDeptName] = useState(
    "Computer Science and Engineering"
  );

  // Selected Sport for disciplines matrix
  const [selectedSport, setSelectedSport] = useState("Cricket");

  // Selected Match for HUD spotlight
  const [selectedMatchId, setSelectedMatchId] = useState("pggc_m1");
  const [isCommentaryOpen, setIsCommentaryOpen] = useState(true);

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

  // Filtered & sorted table list
  const displayDepartments = useMemo(() => {
    let list = [...currentStandings];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((dept) =>
        dept.name.toLowerCase().includes(q)
      );
    }
    if (sortBy === "alpha") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => (b.points || 0) - (a.points || 0));
    }
    return list;
  }, [currentStandings, searchQuery, sortBy]);

  // Top 3 Podium
  const podium = useMemo(() => {
    const sorted = [...currentStandings].sort((a, b) => (b.points || 0) - (a.points || 0));
    return sorted.slice(0, 3);
  }, [currentStandings]);

  // Selected Department Dossier details
  const selectedDeptMeta = useMemo(() => {
    return DEPT_BY_NAME[selectedDeptName] || DEPARTMENTS[0];
  }, [selectedDeptName]);

  const selectedDeptStanding = useMemo(() => {
    const idx = currentStandings.findIndex((d) => d.name === selectedDeptName);
    return {
      rank: idx !== -1 ? idx + 1 : "-",
      points: idx !== -1 ? currentStandings[idx].points : 0,
      gold: idx !== -1 ? currentStandings[idx].gold || 0 : 0,
      silver: idx !== -1 ? currentStandings[idx].silver || 0 : 0,
      bronze: idx !== -1 ? currentStandings[idx].bronze || 0 : 0,
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

  // Active spotlight match
  const spotlightMatch = useMemo(() => {
    return (
      matchesList.find((m) => m.id === selectedMatchId) ||
      matchesList[0] ||
      DEFAULT_MATCHES["pggc_m1"]
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
          <span>Active Match: <strong>{spotlightMatch.sport} ({spotlightMatch.stage})</strong></span>
          <span>Departments: <strong>17 Contesting</strong></span>
        </div>
      </div>

      <div className="pggc-container">
        {/* 2. EDITORIAL MASTHEAD */}
        <header className="pggc-masthead">
          <div className="pggc-masthead-mark">
            <span className="crest">PG</span>
            <span>Post-Graduate General Championship · Vol. LXVI</span>
          </div>
          <div className="pggc-masthead-meta">
            <span><strong>IIT Bombay</strong> · Powai</span>
            <span>Est. <strong>1958</strong></span>
            <span>Academic Season <strong>2024–25</strong></span>
          </div>
        </header>

        {/* 3. HERO BANNER */}
        <section className="pggc-hero">
          <div className="pggc-hero-kicker">
            <span>Issue § PG-66</span>
            <span className="sep">·</span>
            <span>The Inter-Departmental Crucible</span>
          </div>

          <div className="pggc-hero-layout">
            <div>
              <h1 className="pggc-hero-title">
                The <span className="italic">Post-Graduate</span>
                <br />
                Departmental <span className="highlight">Championship</span>.
              </h1>
              <p className="pggc-hero-lede">
                Seventeen departments across engineering, sciences, design, and management.
                From lab benches to the floodlit arenas of Gymkhana — one department hovers
                above all to hoist the coveted PGGC rolling trophy.
              </p>
            </div>

            <div className="pggc-hero-stats-grid">
              <div className="pggc-hero-stat-card">
                <span className="label">Departments</span>
                <span className="value">17</span>
                <span className="sub">Engineering, Science & Design</span>
              </div>
              <div className="pggc-hero-stat-card">
                <span className="label">Disciplines</span>
                <span className="value">{sportsKeys.length || 14}</span>
                <span className="sub">Indoor & Outdoor Arenas</span>
              </div>
              <div className="pggc-hero-stat-card">
                <span className="label">Trophy</span>
                <span className="value">PGGC</span>
                <span className="sub">Rolling Championship Shield</span>
              </div>
              <div className="pggc-hero-stat-card">
                <span className="label">Live Fixtures</span>
                <span className="value">
                  {matchesList.filter((m) => m.status === "live").length}
                </span>
                <span className="sub">In Progress Today</span>
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

        {/* 5. CENTERSTAGE: LIVE MATCH SCORECARD HUD (Different from UGGC) */}
        <section className="pggc-live-center">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 01</span>
              <span>·</span>
              <span>Live Match Arena & Play-by-Play Scorecard</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Match <span className="italic">Spotlight</span>.
            </h2>
            <p className="pggc-section-sub">
              Real-time score updates, live sets/overs, and court commentary direct from Powai.
            </p>
          </div>

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
                    <span>Play-by-Play Live Commentary</span>
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
                OTHER PGGC FIXTURES ({matchesList.length})
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
            {podium[1] && (
              <div className="pggc-podium-card rank-2" onClick={() => setSelectedDeptName(podium[1].name)} style={{ cursor: "pointer" }}>
                <div>
                  <div className="pggc-podium-top">
                    <span className="pggc-podium-crown">
                      <Medal size={16} /> 02 Runner-Up
                    </span>
                    <span className="pggc-team-emblem" style={{ width: "36px", height: "36px", fontSize: "11px" }}>
                      {getDeptInitials(podium[1].name)}
                    </span>
                  </div>
                  <h3 className="pggc-podium-dept-name">{podium[1].name}</h3>
                  <div className="pggc-podium-score">
                    {podium[1].points} <span>pts</span>
                  </div>
                </div>
                <div className="pggc-podium-medals-tally">
                  <span>🥇 {podium[1].gold || 0}</span>
                  <span>🥈 {podium[1].silver || 0}</span>
                  <span>🥉 {podium[1].bronze || 0}</span>
                </div>
              </div>
            )}

            {/* Rank 1 (Gold) */}
            {podium[0] && (
              <div className="pggc-podium-card rank-1" onClick={() => setSelectedDeptName(podium[0].name)} style={{ cursor: "pointer" }}>
                <div>
                  <div className="pggc-podium-top">
                    <span className="pggc-podium-crown">
                      <Trophy size={18} /> 01 Champion Leader
                    </span>
                    <span className="pggc-team-emblem" style={{ width: "42px", height: "42px", fontSize: "12px", borderColor: "var(--gold)" }}>
                      {getDeptInitials(podium[0].name)}
                    </span>
                  </div>
                  <h3 className="pggc-podium-dept-name">{podium[0].name}</h3>
                  <div className="pggc-podium-score" style={{ color: "var(--gold)" }}>
                    {podium[0].points} <span>pts</span>
                  </div>
                </div>
                <div className="pggc-podium-medals-tally">
                  <span>🥇 {podium[0].gold || 0}</span>
                  <span>🥈 {podium[0].silver || 0}</span>
                  <span>🥉 {podium[0].bronze || 0}</span>
                </div>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {podium[2] && (
              <div className="pggc-podium-card rank-3" onClick={() => setSelectedDeptName(podium[2].name)} style={{ cursor: "pointer" }}>
                <div>
                  <div className="pggc-podium-top">
                    <span className="pggc-podium-crown">
                      <Award size={16} /> 03 Third Place
                    </span>
                    <span className="pggc-team-emblem" style={{ width: "36px", height: "36px", fontSize: "11px" }}>
                      {getDeptInitials(podium[2].name)}
                    </span>
                  </div>
                  <h3 className="pggc-podium-dept-name">{podium[2].name}</h3>
                  <div className="pggc-podium-score">
                    {podium[2].points} <span>pts</span>
                  </div>
                </div>
                <div className="pggc-podium-medals-tally">
                  <span>🥇 {podium[2].gold || 0}</span>
                  <span>🥈 {podium[2].silver || 0}</span>
                  <span>🥉 {podium[2].bronze || 0}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7. DUAL PANE: 17 DEPARTMENTS LEDGER & DEPARTMENT DOSSIER */}
        <section className="pggc-ledger-section">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 03</span>
              <span>·</span>
              <span>The 17-Department Ledger & Dossier</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Complete <span className="italic">Standings</span>.
            </h2>
            <p className="pggc-section-sub">
              Every department, every contested point. Click any department row to inspect their sporting dossier.
            </p>
          </div>

          <div className="pggc-dual-ledger">
            {/* Table of all 17 departments */}
            <div className="pggc-table-card">
              <div className="pggc-table-header">
                <h3>Department Ledger</h3>
                <span>{displayDepartments.length} of 17 Departments Listed</span>
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
                      const rankClass =
                        origRank === 1
                          ? "rank-gold-text"
                          : origRank === 2
                          ? "rank-silver-text"
                          : origRank === 3
                          ? "rank-bronze-text"
                          : "";

                      return (
                        <tr
                          key={dept.name}
                          className={isSelected ? "is-selected-dept" : ""}
                          onClick={() => setSelectedDeptName(dept.name)}
                        >
                          <td>
                            <span className={`pggc-rank-badge ${rankClass}`}>
                              {String(origRank).padStart(2, "0")}
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
                          <td style={{ textAlign: "center", fontSize: "11px", color: "var(--muted)" }}>
                            🥇{dept.gold || 0} 🥈{dept.silver || 0} 🥉{dept.bronze || 0}
                          </td>
                          <td className="pggc-points-cell">
                            {dept.points}
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
                  <span className="v">#{selectedDeptStanding.rank}</span>
                </div>
                <div className="pggc-dossier-stat-box">
                  <span className="k">Total Points</span>
                  <span className="v">{selectedDeptStanding.points}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around", padding: "10px", background: "var(--panel-2)", borderRadius: "4px", fontSize: "12px", marginBottom: "16px" }}>
                <span>🥇 Gold: <strong>{selectedDeptStanding.gold}</strong></span>
                <span>🥈 Silver: <strong>{selectedDeptStanding.silver}</strong></span>
                <span>🥉 Bronze: <strong>{selectedDeptStanding.bronze}</strong></span>
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
                    Participation recorded across multiple qualifiers. Points table update pending final round.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 8. DISCIPLINES MATRIX (Horizontal Pill Strip & Sport Podiums) */}
        <section className="pggc-disciplines-section">
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
                <h3 style={{ margin: 0, fontFamily: "Fraunces, serif", fontSize: "20px", color: "#fff" }}>
                  {selectedSport} Tournament Results
                </h3>
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--muted)" }}>
                PGGC Official Scorecard
              </span>
            </div>

            <div className="pggc-sport-result-podium">
              {selectedSportRankings.length > 0 && selectedSportRankings[0] && (
                <div className="pggc-sport-medal-box gold">
                  <div className="badge">
                    <Trophy size={14} /> Winner · Gold Medal
                  </div>
                  <div className="dname">{selectedSportRankings[0].name}</div>
                  <div className="dpts">{selectedSportRankings[0].points} Points</div>
                </div>
              )}

              {selectedSportRankings.length > 1 && selectedSportRankings[1] && (
                <div className="pggc-sport-medal-box silver">
                  <div className="badge">
                    <Medal size={14} /> Runner-up · Silver Medal
                  </div>
                  <div className="dname">{selectedSportRankings[1].name}</div>
                  <div className="dpts">{selectedSportRankings[1].points} Points</div>
                </div>
              )}

              {selectedSportRankings.length > 2 && selectedSportRankings[2] && (
                <div className="pggc-sport-medal-box bronze">
                  <div className="badge">
                    <Award size={14} /> Third Place · Bronze Medal
                  </div>
                  <div className="dname">{selectedSportRankings[2].name}</div>
                  <div className="dpts">{selectedSportRankings[2].points} Points</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 9. ALL 17 DEPARTMENTS DIRECTORY (Strict Alphabetical Order) */}
        <section className="pggc-directory-section">
          <div className="pggc-section-header">
            <div className="pggc-eyebrow">
              <span className="num">§ 05</span>
              <span>·</span>
              <span>Roster of 17 Academic Departments</span>
              <span className="bar" />
            </div>
            <h2 className="pggc-section-title">
              Complete <span className="italic">Department Directory</span>.
            </h2>
            <p className="pggc-section-sub">
              All 17 postgraduate departments presented in strict alphabetical order with complete names.
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
                    <span className="rank">Rank #{rank > 0 ? rank : "-"}</span>
                    <span className="points">{standing ? standing.points : 0} pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. FOOTER / COLOPHON */}
        <footer className="pggc-footer">
          <div>
            <em>Indian Institute of Technology Bombay · Post-Graduate General Championship</em>
          </div>
          <div>
            Set in Fraunces, Inter Tight &amp; JetBrains Mono &nbsp;·&nbsp;{" "}
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
