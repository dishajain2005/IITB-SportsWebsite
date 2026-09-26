import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Tv,
  Calendar,
  Trophy,
  Play,
  Clock,
  MapPin,
  ExternalLink,
  Shield,
  Search,
  Filter,
  Flame,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import {
  INTER_IIT_SPORTS,
  INITIAL_DATA,
  extractYouTubeId,
  getLocalInterIitData
} from "./initialData";
import "./InterIIT.css";

export default function InterIIT() {
  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState("live"); // 'live' | 'schedules' | 'results'
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All"); // 'All' | 'Men' | 'Women' | 'Mixed'
  const [searchQuery, setSearchQuery] = useState("");

  // Firebase Realtime Data State (with robust fallbacks)
  const localSeed = getLocalInterIitData();
  const [streams, setStreams] = useState(localSeed?.streams || INITIAL_DATA.streams);
  const [schedules, setSchedules] = useState(localSeed?.schedules || INITIAL_DATA.schedules);
  const [results, setResults] = useState(localSeed?.results || INITIAL_DATA.results);
  const [meetConfig, setMeetConfig] = useState(localSeed?.config || INITIAL_DATA.config);
  const [activeStreamId, setActiveStreamId] = useState(null);

  // Subscribe to Firebase /inter_iit in real-time and storage sync
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = getLocalInterIitData();
      if (updated) {
        if (updated.streams) setStreams(updated.streams);
        if (updated.schedules) setSchedules(updated.schedules);
        if (updated.results) setResults(updated.results);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    try {
      const interIitRef = ref(db, "inter_iit");
      const unsub = onValue(
        interIitRef,
        (snapshot) => {
          const val = snapshot.val();
          if (val) {
            if (val.config) setMeetConfig((prev) => ({ ...prev, ...val.config }));
            if (val.streams && Object.keys(val.streams).length > 0) {
              setStreams(val.streams);
            }
            if (val.schedules && Object.keys(val.schedules).length > 0) {
              setSchedules(val.schedules);
            }
            if (val.results && Object.keys(val.results).length > 0) {
              setResults(val.results);
            }
          }
        },
        (err) => {
          console.warn("Firebase Inter-IIT listener notice:", err.message);
        }
      );
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        unsub();
      };
    } catch (e) {
      console.warn("Firebase not reachable, using static seed data:", e);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  // Filtered Streams
  const filteredStreams = useMemo(() => {
    return Object.values(streams || {}).filter((item) => {
      const matchesSport = selectedSport === "All" || item.sport === selectedSport;
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.sport?.toLowerCase().includes(query) ||
        item.teamA?.toLowerCase().includes(query) ||
        item.teamB?.toLowerCase().includes(query) ||
        item.venue?.toLowerCase().includes(query);
      return matchesSport && matchesCategory && matchesSearch;
    });
  }, [streams, selectedSport, selectedCategory, searchQuery]);

  // Set default active stream to first live stream, or first available stream
  useEffect(() => {
    if (filteredStreams.length > 0) {
      const liveOne = filteredStreams.find((s) => s.status === "live");
      if (liveOne) {
        setActiveStreamId(liveOne.id);
      } else if (!activeStreamId || !filteredStreams.some((s) => s.id === activeStreamId)) {
        setActiveStreamId(filteredStreams[0].id);
      }
    }
  }, [filteredStreams, activeStreamId]);

  // Filtered Schedules
  const filteredSchedules = useMemo(() => {
    return Object.values(schedules || {})
      .filter((item) => {
        const matchesSport = selectedSport === "All" || item.sport === selectedSport;
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.title?.toLowerCase().includes(query) ||
          item.sport?.toLowerCase().includes(query) ||
          item.teamA?.toLowerCase().includes(query) ||
          item.teamB?.toLowerCase().includes(query) ||
          item.stage?.toLowerCase().includes(query) ||
          item.venue?.toLowerCase().includes(query);
        return matchesSport && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by date + time
        const dateA = `${a.date || ""} ${a.time || ""}`;
        const dateB = `${b.date || ""} ${b.time || ""}`;
        return dateA.localeCompare(dateB);
      });
  }, [schedules, selectedSport, selectedCategory, searchQuery]);

  // Filtered Results
  const filteredResults = useMemo(() => {
    return Object.values(results || {})
      .filter((item) => {
        const matchesSport = selectedSport === "All" || item.sport === selectedSport;
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.title?.toLowerCase().includes(query) ||
          item.sport?.toLowerCase().includes(query) ||
          item.teamA?.toLowerCase().includes(query) ||
          item.teamB?.toLowerCase().includes(query) ||
          item.winner?.toLowerCase().includes(query) ||
          item.position?.toLowerCase().includes(query);
        return matchesSport && matchesCategory && matchesSearch;
      })
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [results, selectedSport, selectedCategory, searchQuery]);

  // Current Active Stream Object
  const currentStream = useMemo(() => {
    return (
      filteredStreams.find((s) => s.id === activeStreamId) ||
      filteredStreams[0] ||
      null
    );
  }, [filteredStreams, activeStreamId]);

  // Count active live matches
  const liveCount = useMemo(() => {
    return Object.values(streams || {}).filter((s) => s.status === "live").length;
  }, [streams]);

  const scheduleCount = useMemo(() => {
    return Object.values(schedules || {}).length;
  }, [schedules]);

  const resultCount = useMemo(() => {
    return Object.values(results || {}).length;
  }, [results]);

  return (
    <div className="inter-iit-root">
      {/* HERO SECTION */}
      <section className="inter-iit-hero">
        <div className="inter-iit-container">
          <div className="inter-iit-hero-kicker">
            <span className="vol">{meetConfig.meetTitle || "57TH INTER IIT SPORTS MEET"}</span>
            <span className="sep">§</span>
            <span>Official Contingent Dossier</span>
            <span className="sep">§</span>
            <span>IIT Bombay</span>
          </div>

          <h1 className="inter-iit-title">
            The Arena of Champions
          </h1>

          <p className="inter-iit-subtitle">
            Follow the live action, official fixtures, and latest results of the IIT Bombay sports contingent.
          </p>

          {/* AQUATICS 28TH SEPTEMBER SPECIAL CALLOUT */}
          <div className="inter-iit-aquatics-banner">
            <div className="banner-icon-wrap">
              <Flame className="banner-flame-icon" size={20} />
            </div>
            <div className="banner-content">
              <strong>Aquatics Inter IIT Starting September 28th!</strong>
              <span>
                Swimming & Water Polo championships kick off at the SAC Olympic Pool. Watch live broadcasts and cheer for the home contingent!
              </span>
            </div>
            <button
              className="banner-cta"
              onClick={() => {
                setSelectedSport("Aquatics");
                setActiveTab("live");
              }}
            >
              View Aquatics <ChevronRight size={16} />
            </button>
          </div>

          {/* STATS BAR */}
          <div className="inter-iit-stats-bar">
            <div className="stat-item" onClick={() => setActiveTab("live")}>
              <div className="stat-icon-wrap stream">
                <Tv size={18} />
              </div>
              <div className="stat-text">
                <span className="stat-num">{liveCount}</span>
                <span className="stat-label">Live Broadcasts</span>
              </div>
              {liveCount > 0 && <span className="live-indicator-pill">LIVE NOW</span>}
            </div>

            <div className="stat-item" onClick={() => setActiveTab("schedules")}>
              <div className="stat-icon-wrap schedule">
                <Calendar size={18} />
              </div>
              <div className="stat-text">
                <span className="stat-num">{scheduleCount}</span>
                <span className="stat-label">Upcoming Fixtures</span>
              </div>
            </div>

            <div className="stat-item" onClick={() => setActiveTab("results")}>
              <div className="stat-icon-wrap result">
                <Trophy size={18} />
              </div>
              <div className="stat-text">
                <span className="stat-num">{resultCount}</span>
                <span className="stat-label">Results & Medals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPORT SELECTOR NAVIGATION */}
      <section className="inter-iit-sports-nav-section">
        <div className="inter-iit-container">
          <div className="sports-nav-header">
            <div className="sports-nav-title">
              <Filter size={15} /> Select Sport Discipline:
            </div>
            {selectedSport !== "All" && (
              <button
                className="reset-sport-btn"
                onClick={() => setSelectedSport("All")}
              >
                Clear filter &times;
              </button>
            )}
          </div>

          <div className="sports-pills-carousel">
            <button
              className={`sport-pill ${selectedSport === "All" ? "active" : ""}`}
              onClick={() => setSelectedSport("All")}
            >
              All Disciplines
            </button>
            {INTER_IIT_SPORTS.map((sport) => {
              const isAquatics = sport === "Aquatics";
              return (
                <button
                  key={sport}
                  className={`sport-pill ${selectedSport === sport ? "active" : ""} ${
                    isAquatics ? "is-featured" : ""
                  }`}
                  onClick={() => setSelectedSport(sport)}
                >
                  {isAquatics && <span className="flame-dot">🏊</span>}
                  {sport}
                  {isAquatics && <span className="pill-tag">Sep 28</span>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="inter-iit-main-section">
        <div className="inter-iit-container">
          {/* TABS + SEARCH BAR */}
          <div className="inter-iit-controls-bar">
            {/* 3 CORE TABS */}
            <div className="inter-iit-main-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "live"}
                className={`main-tab ${activeTab === "live" ? "active" : ""}`}
                onClick={() => setActiveTab("live")}
              >
                <Tv size={18} />
                <span>Live Streaming</span>
                {liveCount > 0 && <span className="tab-live-badge">LIVE</span>}
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "schedules"}
                className={`main-tab ${activeTab === "schedules" ? "active" : ""}`}
                onClick={() => setActiveTab("schedules")}
              >
                <Calendar size={18} />
                <span>Schedules & Fixtures</span>
                <span className="tab-count-badge">{filteredSchedules.length}</span>
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "results"}
                className={`main-tab ${activeTab === "results" ? "active" : ""}`}
                onClick={() => setActiveTab("results")}
              >
                <Trophy size={18} />
                <span>Results & Medals</span>
                <span className="tab-count-badge">{filteredResults.length}</span>
              </button>
            </div>

            {/* SEARCH & CATEGORY FILTER */}
            <div className="inter-iit-filter-group">
              <div className="category-chips">
                {["All", "Men", "Women", "Mixed"].map((cat) => (
                  <button
                    key={cat}
                    className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search matches, IITs, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ACTIVE DISCIPLINE NOTICE */}
          <div className="active-discipline-notice">
            <span>
              Showing: <strong>{selectedSport}</strong> &middot; Category:{" "}
              <strong>{selectedCategory}</strong>
            </span>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: LIVE STREAMING                                    */}
          {/* ======================================================== */}
          {activeTab === "live" && (
            <div className="inter-iit-tab-content">
              {filteredStreams.length === 0 ? (
                <div className="inter-iit-empty-state">
                  <div className="empty-icon-wrap">
                    <Tv size={36} />
                  </div>
                  <h3>No Active Broadcasts Found</h3>
                  <p>
                    There are no live or upcoming video streams currently scheduled for{" "}
                    <strong>{selectedSport}</strong> ({selectedCategory}).
                  </p>
                  <div className="empty-actions">
                    <button
                      className="empty-btn primary"
                      onClick={() => setSelectedSport("All")}
                    >
                      Show All Disciplines
                    </button>
                    <button
                      className="empty-btn outline"
                      onClick={() => setActiveTab("schedules")}
                    >
                      Check Match Schedule
                    </button>
                  </div>
                </div>
              ) : (
                <div className="live-streaming-layout">
                  {/* MAIN FEATURED PLAYER */}
                  {currentStream && (
                    <div className="featured-stream-panel">
                      <div className="player-aspect-wrapper">
                        {currentStream.youtubeId || extractYouTubeId(currentStream.youtubeUrl) ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${
                              currentStream.youtubeId ||
                              extractYouTubeId(currentStream.youtubeUrl)
                            }?autoplay=0&rel=0`}
                            title={currentStream.title}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="youtube-iframe"
                          />
                        ) : (
                          <div className="iframe-placeholder">
                            <Play size={48} />
                            <p>Video Stream Pending Setup</p>
                          </div>
                        )}
                      </div>

                      <div className="featured-stream-meta">
                        <div className="meta-header">
                          <div className="meta-badges">
                            <span className={`status-pill ${currentStream.status}`}>
                              {currentStream.status === "live" && (
                                <span className="red-pulse" />
                              )}
                              {currentStream.status?.toUpperCase()}
                            </span>
                            <span className="sport-pill-tag">
                              {currentStream.sport} &middot; {currentStream.category}
                            </span>
                          </div>

                          {currentStream.youtubeUrl && (
                            <a
                              href={currentStream.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="yt-direct-link"
                            >
                              Open in YouTube <ExternalLink size={14} />
                            </a>
                          )}
                        </div>

                        <h2 className="featured-stream-title">{currentStream.title}</h2>

                        <div className="featured-stream-teams">
                          <div className="team-pill-box">
                            <span className="team-badge">
                              {currentStream.teamA?.slice(0, 5) || "IIT"}
                            </span>
                            <span className="team-fullname">{currentStream.teamA}</span>
                          </div>
                          <span className="vs-label">VS</span>
                          <div className="team-pill-box">
                            <span className="team-fullname">{currentStream.teamB}</span>
                            <span className="team-badge">
                              {currentStream.teamB?.slice(0, 5) || "IIT"}
                            </span>
                          </div>
                        </div>

                        <div className="featured-stream-details">
                          {currentStream.venue && (
                            <span className="detail-item">
                              <MapPin size={15} /> {currentStream.venue}
                            </span>
                          )}
                          {currentStream.time && (
                            <span className="detail-item">
                              <Clock size={15} /> {currentStream.time} ({currentStream.date})
                            </span>
                          )}
                        </div>

                        {currentStream.description && (
                          <p className="featured-stream-desc">
                            {currentStream.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STREAM SELECTOR / PLAYLIST */}
                  <div className="streams-sidebar">
                    <div className="sidebar-header">
                      <h3>Available Broadcasts</h3>
                      <span className="badge-counter">{filteredStreams.length}</span>
                    </div>

                    <div className="streams-list">
                      {filteredStreams.map((stream) => {
                        const isCurrent = stream.id === activeStreamId;
                        const yId =
                          stream.youtubeId || extractYouTubeId(stream.youtubeUrl);
                        const thumbUrl = yId
                          ? `https://img.youtube.com/vi/${yId}/mqdefault.jpg`
                          : null;

                        return (
                          <div
                            key={stream.id}
                            className={`stream-card-item ${isCurrent ? "is-active" : ""}`}
                            onClick={() => setActiveStreamId(stream.id)}
                          >
                            <div className="stream-thumb-wrap">
                              {thumbUrl ? (
                                <img
                                  src={thumbUrl}
                                  alt={stream.title}
                                  className="stream-thumb"
                                />
                              ) : (
                                <div className="thumb-fallback">
                                  <Tv size={24} />
                                </div>
                              )}
                              <span className={`thumb-status-badge ${stream.status}`}>
                                {stream.status === "live" && <span className="mini-pulse" />}
                                {stream.status}
                              </span>
                            </div>

                            <div className="stream-info-wrap">
                              <span className="stream-sport-line">
                                {stream.sport} &middot; {stream.category}
                              </span>
                              <h4 className="stream-item-title">{stream.title}</h4>
                              <span className="stream-timing-line">
                                <Clock size={12} /> {stream.time || "Scheduled"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SCHEDULES & FIXTURES                              */}
          {/* ======================================================== */}
          {activeTab === "schedules" && (
            <div className="inter-iit-tab-content">
              {filteredSchedules.length === 0 ? (
                <div className="inter-iit-empty-state">
                  <div className="empty-icon-wrap">
                    <Calendar size={36} />
                  </div>
                  <h3>No Scheduled Fixtures</h3>
                  <p>
                    No fixtures currently registered for <strong>{selectedSport}</strong>{" "}
                    ({selectedCategory}).
                  </p>
                  <button
                    className="empty-btn primary"
                    onClick={() => setSelectedSport("All")}
                  >
                    View All Fixtures
                  </button>
                </div>
              ) : (
                <div className="schedules-grid">
                  {filteredSchedules.map((item) => {
                    const isAquatics = item.sport === "Aquatics";
                    return (
                      <div
                        key={item.id}
                        className={`schedule-card ${isAquatics ? "accent-border" : ""}`}
                      >
                        <div className="schedule-card-top">
                          <div className="schedule-sport-tags">
                            <span className="sport-tag">{item.sport}</span>
                            <span className="category-tag">{item.category}</span>
                            {item.stage && (
                              <span className="stage-tag">{item.stage}</span>
                            )}
                          </div>
                          <span className={`schedule-status-pill ${item.status || "scheduled"}`}>
                            {item.status || "Scheduled"}
                          </span>
                        </div>

                        <h3 className="schedule-card-title">{item.title}</h3>

                        <div className="schedule-teams-row">
                          <div className="team-entry">
                            <span className="team-circle">
                              {item.teamA?.slice(0, 3) || "A"}
                            </span>
                            <span className="team-name-text">{item.teamA}</span>
                          </div>
                          <span className="vs-sign">vs</span>
                          <div className="team-entry">
                            <span className="team-name-text">{item.teamB}</span>
                            <span className="team-circle">
                              {item.teamB?.slice(0, 3) || "B"}
                            </span>
                          </div>
                        </div>

                        <div className="schedule-meta-footer">
                          <div className="meta-col">
                            <Calendar size={14} />
                            <span>{item.date || "TBD"}</span>
                          </div>
                          <div className="meta-col">
                            <Clock size={14} />
                            <span>{item.time || "TBD"}</span>
                          </div>
                          {item.venue && (
                            <div className="meta-col venue-col">
                              <MapPin size={14} />
                              <span title={item.venue}>{item.venue}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: RESULTS & MEDALS                                  */}
          {/* ======================================================== */}
          {activeTab === "results" && (
            <div className="inter-iit-tab-content">
              {filteredResults.length === 0 ? (
                <div className="inter-iit-empty-state">
                  <div className="empty-icon-wrap">
                    <Trophy size={36} />
                  </div>
                  <h3>No Results Available Yet</h3>
                  <p>
                    Final scores and medals for <strong>{selectedSport}</strong> (
                    {selectedCategory}) will be published here right after each match
                    concludes.
                  </p>
                  <button
                    className="empty-btn primary"
                    onClick={() => setSelectedSport("All")}
                  >
                    View All Results
                  </button>
                </div>
              ) : (
                <div className="results-grid">
                  {filteredResults.map((item) => {
                    const isGold =
                      item.position?.toLowerCase().includes("gold") ||
                      item.position?.toLowerCase().includes("1st");
                    const isSilver =
                      item.position?.toLowerCase().includes("silver") ||
                      item.position?.toLowerCase().includes("2nd");
                    const isBronze =
                      item.position?.toLowerCase().includes("bronze") ||
                      item.position?.toLowerCase().includes("3rd");

                    return (
                      <div
                        key={item.id}
                        className={`result-card ${
                          isGold ? "gold-theme" : isSilver ? "silver-theme" : isBronze ? "bronze-theme" : ""
                        }`}
                      >
                        <div className="result-card-header">
                          <div className="result-tags">
                            <span className="sport-tag">{item.sport}</span>
                            <span className="category-tag">{item.category}</span>
                            {item.stage && (
                              <span className="stage-tag">{item.stage}</span>
                            )}
                          </div>
                          {item.position && (
                            <div className="position-medal-badge">
                              <Trophy size={14} />
                              <span>{item.position}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="result-card-title">{item.title}</h3>

                        <div className="result-score-block">
                          <div className="result-team-row">
                            <span
                              className={`team-name ${
                                item.winner === item.teamA ? "is-winner" : ""
                              }`}
                            >
                              {item.teamA}
                              {item.winner === item.teamA && (
                                <CheckCircle2 size={15} className="winner-icon" />
                              )}
                            </span>
                            <span className="team-score">{item.scoreA || "—"}</span>
                          </div>

                          <div className="result-team-row">
                            <span
                              className={`team-name ${
                                item.winner === item.teamB ? "is-winner" : ""
                              }`}
                            >
                              {item.teamB}
                              {item.winner === item.teamB && (
                                <CheckCircle2 size={15} className="winner-icon" />
                              )}
                            </span>
                            <span className="team-score">{item.scoreB || "—"}</span>
                          </div>
                        </div>

                        {item.summary && (
                          <div className="result-summary-box">
                            <p>{item.summary}</p>
                          </div>
                        )}

                        <div className="result-card-footer">
                          {item.date && (
                            <span className="result-footer-item">
                              <Calendar size={13} /> {item.date}
                            </span>
                          )}
                          {item.venue && (
                            <span className="result-footer-item">
                              <MapPin size={13} /> {item.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ADMIN PORTAL QUICK ACCESS (DISCREET) */}
          <div className="admin-shortcut-area">
            <Link to="/inter-iit-admin" className="admin-shortcut-link">
              <Shield size={14} /> Sports Council & Web Team: Access Inter IIT Admin Panel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
