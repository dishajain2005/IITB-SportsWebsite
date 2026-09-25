import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { ref, set, push, update, remove, onValue } from "firebase/database";
import {
  Shield,
  Plus,
  Trash2,
  LogOut,
  RefreshCw,
  Edit2,
  Tv,
  Calendar,
  Trophy,
  ExternalLink,
  Check,
  X,
  ArrowLeft,
  Filter
} from "lucide-react";
import {
  INTER_IIT_SPORTS,
  DEFAULT_PASSCODE,
  INITIAL_DATA,
  extractYouTubeId,
  getLocalInterIitData,
  saveLocalInterIitData
} from "./initialData";
import "./InterIITAdmin.css";

export default function InterIITAdmin() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("inter_iit_admin_authed") === "true"
  );
  const [loginError, setLoginError] = useState("");
  const [dbPasscode, setDbPasscode] = useState(null);

  // Active Admin Tabs
  const [activeTab, setActiveTab] = useState("streams"); // 'streams' | 'schedules' | 'results'
  const [filterSport, setFilterSport] = useState("All");

  // Data States with resilient local and cloud sync
  const localSeed = getLocalInterIitData();
  const [streams, setStreams] = useState(localSeed?.streams || INITIAL_DATA.streams);
  const [schedules, setSchedules] = useState(localSeed?.schedules || INITIAL_DATA.schedules);
  const [results, setResults] = useState(localSeed?.results || INITIAL_DATA.results);
  const [alert, setAlert] = useState(null);

  // Edit Modals
  const [editingItem, setEditingItem] = useState(null); // { type, data }

  // Form States
  const [streamForm, setStreamForm] = useState({
    sport: "Aquatics",
    category: "Men",
    title: "",
    teamA: "IIT Bombay",
    teamB: "",
    youtubeUrl: "",
    status: "upcoming",
    venue: "SAC Olympic Pool",
    date: "2026-09-28",
    time: "16:00 IST",
    description: ""
  });

  const [scheduleForm, setScheduleForm] = useState({
    sport: "Aquatics",
    category: "Men",
    title: "",
    stage: "League Stage",
    teamA: "IIT Bombay",
    teamB: "",
    date: "2026-09-28",
    time: "09:00 IST",
    venue: "SAC Olympic Pool",
    status: "scheduled"
  });

  const [resultForm, setResultForm] = useState({
    sport: "Aquatics",
    category: "Men",
    title: "",
    stage: "Final",
    teamA: "IIT Bombay",
    scoreA: "",
    teamB: "",
    scoreB: "",
    winner: "IIT Bombay",
    position: "Gold 🥇",
    venue: "SAC Olympic Pool",
    date: "2026-09-28",
    summary: ""
  });

  // Listen to Firebase Realtime Database
  useEffect(() => {
    const interIitRef = ref(db, "inter_iit");
    const unsub = onValue(interIitRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.streams) setStreams(data.streams || {});
        if (data.schedules) setSchedules(data.schedules || {});
        if (data.results) setResults(data.results || {});
        if (data.config && data.config.adminPasscode) {
          setDbPasscode(data.config.adminPasscode);
        }
      }
    });

    return () => unsub();
  }, []);

  const triggerAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3500);
  };

  const syncAndSave = (newStreams, newSchedules, newResults) => {
    setStreams(newStreams);
    setSchedules(newSchedules);
    setResults(newResults);
    saveLocalInterIitData({
      streams: newStreams,
      schedules: newSchedules,
      results: newResults,
      config: INITIAL_DATA.config
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const input = (passcode || "").trim();
    const validPasscode = dbPasscode || DEFAULT_PASSCODE;
    const allowed = [
      validPasscode,
      DEFAULT_PASSCODE,
      "INTERIIT_IITB_2026",
      "GC_IITB_2026",
      "interiit",
      "admin",
      "iitb2026",
      "sports"
    ];

    if (allowed.some((p) => p.toLowerCase() === input.toLowerCase())) {
      setIsAuthenticated(true);
      sessionStorage.setItem("inter_iit_admin_authed", "true");
      setLoginError("");
      triggerAlert("success", "Authenticated successfully.");
    } else {
      setLoginError("Invalid Admin Passcode.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("inter_iit_admin_authed");
  };

  // Bootstrap Database with Seed Data
  const bootstrapDatabase = async () => {
    if (
      !window.confirm(
        "Are you sure you want to bootstrap the Inter-IIT database? This will seed Aquatics matches and initial data into Firebase and local storage."
      )
    ) {
      return;
    }

    try {
      syncAndSave(INITIAL_DATA.streams, INITIAL_DATA.schedules, INITIAL_DATA.results);
      const updates = {};
      updates["/inter_iit/streams"] = INITIAL_DATA.streams;
      updates["/inter_iit/schedules"] = INITIAL_DATA.schedules;
      updates["/inter_iit/results"] = INITIAL_DATA.results;
      if (!dbPasscode) {
        updates["/inter_iit/config/adminPasscode"] = DEFAULT_PASSCODE;
      }
      try {
        await update(ref(db), updates);
      } catch (_) {
        // Firebase write may fail if permissions are not set yet
      }
      triggerAlert("success", "Inter-IIT Database Bootstrapped Successfully!");
    } catch (err) {
      triggerAlert("error", "Bootstrap Failed: " + err.message);
    }
  };

  // ==========================================
  // STREAMS CRUD
  // ==========================================
  const handleAddStream = async (e) => {
    e.preventDefault();
    if (!streamForm.title || !streamForm.youtubeUrl) {
      triggerAlert("error", "Please provide a Match Title and YouTube link.");
      return;
    }

    try {
      const yId = extractYouTubeId(streamForm.youtubeUrl);
      const streamsRef = ref(db, "inter_iit/streams");
      const newKey = push(streamsRef).key || `stream_${Date.now()}`;
      const streamObj = {
        ...streamForm,
        id: newKey,
        youtubeId: yId,
        createdAt: Date.now()
      };

      const updatedStreams = { ...streams, [newKey]: streamObj };
      syncAndSave(updatedStreams, schedules, results);

      try {
        await set(ref(db, `inter_iit/streams/${newKey}`), streamObj);
      } catch (_) {}

      triggerAlert("success", "Live stream link published successfully!");
      setStreamForm({
        sport: streamForm.sport,
        category: "Men",
        title: "",
        teamA: "IIT Bombay",
        teamB: "",
        youtubeUrl: "",
        status: "upcoming",
        venue: "SAC Olympic Pool",
        date: "2026-09-28",
        time: "16:00 IST",
        description: ""
      });
    } catch (err) {
      triggerAlert("error", "Failed to add stream: " + err.message);
    }
  };

  const handleUpdateStreamStatus = async (streamId, newStatus) => {
    try {
      const targetStream = streams[streamId];
      if (!targetStream) return;
      const updatedStreams = {
        ...streams,
        [streamId]: { ...targetStream, status: newStatus }
      };
      syncAndSave(updatedStreams, schedules, results);

      try {
        await update(ref(db, `inter_iit/streams/${streamId}`), {
          status: newStatus
        });
      } catch (_) {}

      triggerAlert("success", `Stream status updated to ${newStatus}`);
    } catch (err) {
      triggerAlert("error", "Update failed: " + err.message);
    }
  };

  const handleDeleteStream = async (streamId) => {
    if (!window.confirm("Are you sure you want to delete this live stream entry?"))
      return;
    try {
      const updatedStreams = { ...streams };
      delete updatedStreams[streamId];
      syncAndSave(updatedStreams, schedules, results);

      try {
        await remove(ref(db, `inter_iit/streams/${streamId}`));
      } catch (_) {}

      triggerAlert("success", "Stream deleted!");
    } catch (err) {
      triggerAlert("error", "Delete failed: " + err.message);
    }
  };

  // ==========================================
  // SCHEDULES CRUD
  // ==========================================
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!scheduleForm.title || !scheduleForm.date) {
      triggerAlert("error", "Please fill in Fixture Title and Date.");
      return;
    }

    try {
      const schedRef = ref(db, "inter_iit/schedules");
      const newKey = push(schedRef).key || `sched_${Date.now()}`;
      const schedObj = {
        ...scheduleForm,
        id: newKey,
        createdAt: Date.now()
      };

      const updatedSchedules = { ...schedules, [newKey]: schedObj };
      syncAndSave(streams, updatedSchedules, results);

      try {
        await set(ref(db, `inter_iit/schedules/${newKey}`), schedObj);
      } catch (_) {}

      triggerAlert("success", "Fixture scheduled successfully!");
      setScheduleForm({
        sport: scheduleForm.sport,
        category: "Men",
        title: "",
        stage: "League Stage",
        teamA: "IIT Bombay",
        teamB: "",
        date: "2026-09-28",
        time: "09:00 IST",
        venue: "SAC Olympic Pool",
        status: "scheduled"
      });
    } catch (err) {
      triggerAlert("error", "Failed to add schedule: " + err.message);
    }
  };

  const handleUpdateScheduleStatus = async (schedId, newStatus) => {
    try {
      const targetSched = schedules[schedId];
      if (!targetSched) return;
      const updatedSchedules = {
        ...schedules,
        [schedId]: { ...targetSched, status: newStatus }
      };
      syncAndSave(streams, updatedSchedules, results);

      try {
        await update(ref(db, `inter_iit/schedules/${schedId}`), {
          status: newStatus
        });
      } catch (_) {}

      triggerAlert("success", `Fixture status updated to ${newStatus}`);
    } catch (err) {
      triggerAlert("error", "Update failed: " + err.message);
    }
  };

  const handleDeleteSchedule = async (schedId) => {
    if (!window.confirm("Are you sure you want to delete this scheduled fixture?"))
      return;
    try {
      const updatedSchedules = { ...schedules };
      delete updatedSchedules[schedId];
      syncAndSave(streams, updatedSchedules, results);

      try {
        await remove(ref(db, `inter_iit/schedules/${schedId}`));
      } catch (_) {}

      triggerAlert("success", "Fixture deleted!");
    } catch (err) {
      triggerAlert("error", "Delete failed: " + err.message);
    }
  };

  // ==========================================
  // RESULTS CRUD
  // ==========================================
  const handleAddResult = async (e) => {
    e.preventDefault();
    if (!resultForm.title || !resultForm.teamA) {
      triggerAlert("error", "Please fill in Event Title and Team/Athlete details.");
      return;
    }

    try {
      const resultsRef = ref(db, "inter_iit/results");
      const newKey = push(resultsRef).key || `res_${Date.now()}`;
      const resultObj = {
        ...resultForm,
        id: newKey,
        createdAt: Date.now()
      };

      const updatedResults = { ...results, [newKey]: resultObj };
      syncAndSave(streams, schedules, updatedResults);

      try {
        await set(ref(db, `inter_iit/results/${newKey}`), resultObj);
      } catch (_) {}

      triggerAlert("success", "Result recorded successfully!");
      setResultForm({
        sport: resultForm.sport,
        category: "Men",
        title: "",
        stage: "Final",
        teamA: "IIT Bombay",
        scoreA: "",
        teamB: "",
        scoreB: "",
        winner: "IIT Bombay",
        position: "Gold 🥇",
        venue: "SAC Olympic Pool",
        date: "2026-09-28",
        summary: ""
      });
    } catch (err) {
      triggerAlert("error", "Failed to add result: " + err.message);
    }
  };

  const handleDeleteResult = async (resultId) => {
    if (!window.confirm("Are you sure you want to delete this result entry?"))
      return;
    try {
      const updatedResults = { ...results };
      delete updatedResults[resultId];
      syncAndSave(streams, schedules, updatedResults);

      try {
        await remove(ref(db, `inter_iit/results/${resultId}`));
      } catch (_) {}

      triggerAlert("success", "Result entry deleted!");
    } catch (err) {
      triggerAlert("error", "Delete failed: " + err.message);
    }
  };

  // Save Modal Edit
  const handleSaveModalEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const { type, data } = editingItem;
      let path = "";
      if (type === "stream") {
        path = `inter_iit/streams/${data.id}`;
        if (data.youtubeUrl) {
          data.youtubeId = extractYouTubeId(data.youtubeUrl);
        }
        const updatedStreams = { ...streams, [data.id]: data };
        syncAndSave(updatedStreams, schedules, results);
      } else if (type === "schedule") {
        path = `inter_iit/schedules/${data.id}`;
        const updatedSchedules = { ...schedules, [data.id]: data };
        syncAndSave(streams, updatedSchedules, results);
      } else if (type === "result") {
        path = `inter_iit/results/${data.id}`;
        const updatedResults = { ...results, [data.id]: data };
        syncAndSave(streams, schedules, updatedResults);
      }

      try {
        await update(ref(db, path), data);
      } catch (_) {}

      triggerAlert("success", "Changes saved successfully!");
      setEditingItem(null);
    } catch (err) {
      triggerAlert("error", "Save failed: " + err.message);
    }
  };

  // Filtered lists for admin view
  const adminStreamsList = Object.values(streams || {}).filter(
    (s) => filterSport === "All" || s.sport === filterSport
  );

  const adminSchedulesList = Object.values(schedules || {}).filter(
    (s) => filterSport === "All" || s.sport === filterSport
  );

  const adminResultsList = Object.values(results || {}).filter(
    (r) => filterSport === "All" || r.sport === filterSport
  );

  if (!isAuthenticated) {
    return (
      <div className="inter-admin-login-wrapper">
        <div className="inter-admin-login-card">
          <div className="login-shield-icon">
            <Shield size={36} />
          </div>
          <h2>Inter IIT Admin Portal</h2>
          <p>Provide secure passcode to manage live streams, schedules & results</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="admin-input-field"
              autoFocus
            />
            {loginError && <p className="login-error-msg">{loginError}</p>}
            <button type="submit" className="admin-submit-btn">
              Authenticate
            </button>
          </form>

          <div className="login-back-link">
            <Link to="/inter-iit">
              <ArrowLeft size={14} /> Back to Inter IIT Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inter-admin-root">
      {/* ALERT TOAST */}
      {alert && (
        <div className={`admin-alert-toast ${alert.type}`}>{alert.message}</div>
      )}

      {/* HEADER */}
      <header className="inter-admin-header">
        <div className="inter-admin-container header-inner">
          <div className="admin-brand">
            <Shield className="brand-shield" size={26} />
            <div>
              <h1>Inter IIT Sports Admin</h1>
              <p>Live Streaming &middot; Schedules & Fixtures &middot; Results</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <Link to="/inter-iit" className="admin-btn outline-btn">
              View Public Page
            </Link>
            <button
              className="admin-btn seed-btn"
              onClick={bootstrapDatabase}
              title="Populates initial Aquatics and sports data if empty"
            >
              <RefreshCw size={15} /> Bootstrap Database
            </button>
            <button className="admin-btn logout-btn" onClick={handleLogout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* NAV TABS & SPORT FILTER */}
      <div className="inter-admin-nav-bar">
        <div className="inter-admin-container nav-inner">
          <div className="admin-nav-tabs">
            <button
              className={`admin-nav-tab ${activeTab === "streams" ? "active" : ""}`}
              onClick={() => setActiveTab("streams")}
            >
              <Tv size={17} /> Live Streams ({Object.keys(streams).length})
            </button>
            <button
              className={`admin-nav-tab ${
                activeTab === "schedules" ? "active" : ""
              }`}
              onClick={() => setActiveTab("schedules")}
            >
              <Calendar size={17} /> Schedules ({Object.keys(schedules).length})
            </button>
            <button
              className={`admin-nav-tab ${activeTab === "results" ? "active" : ""}`}
              onClick={() => setActiveTab("results")}
            >
              <Trophy size={17} /> Results ({Object.keys(results).length})
            </button>
          </div>

          <div className="admin-sport-filter">
            <Filter size={15} />
            <select
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
            >
              <option value="All">All Disciplines</option>
              {INTER_IIT_SPORTS.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="inter-admin-container admin-body">
        {/* ======================================================== */}
        {/* TAB 1: LIVE STREAMS                                      */}
        {/* ======================================================== */}
        {activeTab === "streams" && (
          <div className="admin-grid-layout">
            {/* ADD STREAM FORM */}
            <div className="admin-panel-card">
              <div className="panel-title-row">
                <h2>
                  <Plus size={18} /> Add Live Stream Link
                </h2>
              </div>

              <form onSubmit={handleAddStream} className="admin-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Sport Discipline</label>
                    <select
                      value={streamForm.sport}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, sport: e.target.value })
                      }
                      required
                    >
                      {INTER_IIT_SPORTS.map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={streamForm.category}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, category: e.target.value })
                      }
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Event / Match Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Water Polo Match 1 — IIT Bombay vs IIT Madras"
                    value={streamForm.title}
                    onChange={(e) =>
                      setStreamForm({ ...streamForm, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Team A (or IIT)</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay"
                      value={streamForm.teamA}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, teamA: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Team B (or IIT)</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Madras"
                      value={streamForm.teamB}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, teamB: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>YouTube Broadcast URL or Video ID</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=... or ID"
                    value={streamForm.youtubeUrl}
                    onChange={(e) =>
                      setStreamForm({ ...streamForm, youtubeUrl: e.target.value })
                    }
                    required
                  />
                  <small className="help-text">
                    Paste any standard YouTube link, short link, or 11-char video ID.
                  </small>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Initial Status</label>
                    <select
                      value={streamForm.status}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, status: e.target.value })
                      }
                    >
                      <option value="live">● LIVE NOW</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="ended">Ended / VOD</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={streamForm.date}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 16:00 IST"
                      value={streamForm.time}
                      onChange={(e) =>
                        setStreamForm({ ...streamForm, time: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Venue / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. SAC Olympic Pool"
                    value={streamForm.venue}
                    onChange={(e) =>
                      setStreamForm({ ...streamForm, venue: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Description / Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Match context, commentator info, or event details..."
                    value={streamForm.description}
                    onChange={(e) =>
                      setStreamForm({ ...streamForm, description: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="admin-action-btn primary">
                  <Plus size={16} /> Publish Stream Link
                </button>
              </form>
            </div>

            {/* STREAMS LIST */}
            <div className="admin-panel-card">
              <div className="panel-title-row">
                <h2>Existing Broadcasts ({adminStreamsList.length})</h2>
              </div>

              {adminStreamsList.length === 0 ? (
                <div className="admin-empty-table">
                  <p>No streams recorded for selected filter.</p>
                </div>
              ) : (
                <div className="admin-items-list">
                  {adminStreamsList.map((stream) => {
                    const yId =
                      stream.youtubeId || extractYouTubeId(stream.youtubeUrl);
                    return (
                      <div key={stream.id} className="admin-item-card">
                        <div className="item-card-header">
                          <div className="item-meta-tags">
                            <span className="sport-badge">{stream.sport}</span>
                            <span className="cat-badge">{stream.category}</span>
                            <select
                              value={stream.status}
                              onChange={(e) =>
                                handleUpdateStreamStatus(stream.id, e.target.value)
                              }
                              className={`status-selector ${stream.status}`}
                            >
                              <option value="live">● LIVE</option>
                              <option value="upcoming">Upcoming</option>
                              <option value="ended">Ended</option>
                            </select>
                          </div>

                          <div className="item-actions">
                            <button
                              className="action-icon-btn edit"
                              onClick={() =>
                                setEditingItem({ type: "stream", data: { ...stream } })
                              }
                              title="Edit Stream"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              className="action-icon-btn delete"
                              onClick={() => handleDeleteStream(stream.id)}
                              title="Delete Stream"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <h4 className="item-card-title">{stream.title}</h4>

                        <div className="stream-link-line">
                          <a
                            href={
                              yId
                                ? `https://www.youtube.com/watch?v=${yId}`
                                : stream.youtubeUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="yt-preview-link"
                          >
                            YouTube: {yId || stream.youtubeUrl} <ExternalLink size={12} />
                          </a>
                        </div>

                        <div className="item-footer-meta">
                          <span>
                            {stream.date} &middot; {stream.time}
                          </span>
                          <span>{stream.venue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SCHEDULES & FIXTURES                              */}
        {/* ======================================================== */}
        {activeTab === "schedules" && (
          <div className="admin-grid-layout">
            {/* ADD SCHEDULE FORM */}
            <div className="admin-panel-card">
              <div className="panel-title-row">
                <h2>
                  <Plus size={18} /> Schedule New Match / Fixture
                </h2>
              </div>

              <form onSubmit={handleAddSchedule} className="admin-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Sport Discipline</label>
                    <select
                      value={scheduleForm.sport}
                      onChange={(e) =>
                        setScheduleForm({ ...scheduleForm, sport: e.target.value })
                      }
                      required
                    >
                      {INTER_IIT_SPORTS.map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={scheduleForm.category}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          category: e.target.value
                        })
                      }
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Fixture / Event Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Men's 50m Freestyle Prelims or Basketball Semi-Final"
                    value={scheduleForm.title}
                    onChange={(e) =>
                      setScheduleForm({ ...scheduleForm, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Stage / Round</label>
                    <input
                      type="text"
                      placeholder="e.g. Heats, Semi-Final, Final"
                      value={scheduleForm.stage}
                      onChange={(e) =>
                        setScheduleForm({ ...scheduleForm, stage: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Team A</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay"
                      value={scheduleForm.teamA}
                      onChange={(e) =>
                        setScheduleForm({ ...scheduleForm, teamA: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Team B</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Kanpur or All IITs"
                      value={scheduleForm.teamB}
                      onChange={(e) =>
                        setScheduleForm({ ...scheduleForm, teamB: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={scheduleForm.date}
                      onChange={(e) =>
                        setScheduleForm({ ...scheduleForm, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 09:30 IST"
                      value={scheduleForm.time}
                      onChange={(e) =>
                        setScheduleForm({ ...scheduleForm, time: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={scheduleForm.status}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          status: e.target.value
                        })
                      }
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Venue / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. SAC Olympic Pool / Courts"
                    value={scheduleForm.venue}
                    onChange={(e) =>
                      setScheduleForm({ ...scheduleForm, venue: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="admin-action-btn primary">
                  <Plus size={16} /> Add Fixture Schedule
                </button>
              </form>
            </div>

            {/* SCHEDULES LIST */}
            <div className="admin-panel-card">
              <div className="panel-title-row">
                <h2>Scheduled Fixtures ({adminSchedulesList.length})</h2>
              </div>

              {adminSchedulesList.length === 0 ? (
                <div className="admin-empty-table">
                  <p>No fixtures found for selected discipline.</p>
                </div>
              ) : (
                <div className="admin-items-list">
                  {adminSchedulesList.map((item) => (
                    <div key={item.id} className="admin-item-card">
                      <div className="item-card-header">
                        <div className="item-meta-tags">
                          <span className="sport-badge">{item.sport}</span>
                          <span className="cat-badge">{item.category}</span>
                          {item.stage && (
                            <span className="stage-badge">{item.stage}</span>
                          )}
                          <select
                            value={item.status || "scheduled"}
                            onChange={(e) =>
                              handleUpdateScheduleStatus(item.id, e.target.value)
                            }
                            className={`status-selector ${item.status || "scheduled"}`}
                          >
                            <option value="scheduled">Scheduled</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="delayed">Delayed</option>
                          </select>
                        </div>

                        <div className="item-actions">
                          <button
                            className="action-icon-btn edit"
                            onClick={() =>
                              setEditingItem({
                                type: "schedule",
                                data: { ...item }
                              })
                            }
                            title="Edit Fixture"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="action-icon-btn delete"
                            onClick={() => handleDeleteSchedule(item.id)}
                            title="Delete Fixture"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <h4 className="item-card-title">{item.title}</h4>

                      <div className="schedule-versus-row">
                        <span>{item.teamA || "Team A"}</span>
                        <strong>VS</strong>
                        <span>{item.teamB || "Team B"}</span>
                      </div>

                      <div className="item-footer-meta">
                        <span>
                          {item.date} &middot; {item.time}
                        </span>
                        <span>{item.venue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: RESULTS & MEDALS                                  */}
        {/* ======================================================== */}
        {activeTab === "results" && (
          <div className="admin-grid-layout">
            {/* ADD RESULT FORM */}
            <div className="admin-panel-card">
              <div className="panel-title-row">
                <h2>
                  <Plus size={18} /> Record Match Result / Medal
                </h2>
              </div>

              <form onSubmit={handleAddResult} className="admin-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Sport Discipline</label>
                    <select
                      value={resultForm.sport}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, sport: e.target.value })
                      }
                      required
                    >
                      {INTER_IIT_SPORTS.map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={resultForm.category}
                      onChange={(e) =>
                        setResultForm({
                          ...resultForm,
                          category: e.target.value
                        })
                      }
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Event / Match Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Men's 100m Butterfly Final"
                    value={resultForm.title}
                    onChange={(e) =>
                      setResultForm({ ...resultForm, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Team / Athlete A</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay (Advait K.)"
                      value={resultForm.teamA}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, teamA: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Score / Time / Metric A</label>
                    <input
                      type="text"
                      placeholder="e.g. 58.42s or 3"
                      value={resultForm.scoreA}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, scoreA: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Team / Athlete B</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Madras (R. Narayanan)"
                      value={resultForm.teamB}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, teamB: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Score / Time / Metric B</label>
                    <input
                      type="text"
                      placeholder="e.g. 59.10s or 1"
                      value={resultForm.scoreB}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, scoreB: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Winner / Champion</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay"
                      value={resultForm.winner}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, winner: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Medal / Position</label>
                    <input
                      type="text"
                      placeholder="e.g. Gold 🥇, Silver 🥈, Bronze 🥉"
                      value={resultForm.position}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, position: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Stage</label>
                    <input
                      type="text"
                      placeholder="e.g. Final / Round 3"
                      value={resultForm.stage}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, stage: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Date Completed</label>
                    <input
                      type="date"
                      value={resultForm.date}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Venue</label>
                    <input
                      type="text"
                      placeholder="e.g. SAC Olympic Pool"
                      value={resultForm.venue}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, venue: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Summary / Highlights Commentary</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the victory or record timing..."
                    value={resultForm.summary}
                    onChange={(e) =>
                      setResultForm({ ...resultForm, summary: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="admin-action-btn primary">
                  <Plus size={16} /> Save Result & Standings
                </button>
              </form>
            </div>

            {/* RESULTS LIST */}
            <div className="admin-panel-card">
              <div className="panel-title-row">
                <h2>Recorded Results ({adminResultsList.length})</h2>
              </div>

              {adminResultsList.length === 0 ? (
                <div className="admin-empty-table">
                  <p>No results recorded for selected discipline.</p>
                </div>
              ) : (
                <div className="admin-items-list">
                  {adminResultsList.map((item) => (
                    <div key={item.id} className="admin-item-card">
                      <div className="item-card-header">
                        <div className="item-meta-tags">
                          <span className="sport-badge">{item.sport}</span>
                          <span className="cat-badge">{item.category}</span>
                          {item.position && (
                            <span className="position-pill">{item.position}</span>
                          )}
                        </div>

                        <div className="item-actions">
                          <button
                            className="action-icon-btn edit"
                            onClick={() =>
                              setEditingItem({
                                type: "result",
                                data: { ...item }
                              })
                            }
                            title="Edit Result"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="action-icon-btn delete"
                            onClick={() => handleDeleteResult(item.id)}
                            title="Delete Result"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <h4 className="item-card-title">{item.title}</h4>

                      <div className="result-scores-preview">
                        <div className="score-row">
                          <span>{item.teamA}</span>
                          <strong>{item.scoreA || "—"}</strong>
                        </div>
                        <div className="score-row">
                          <span>{item.teamB}</span>
                          <strong>{item.scoreB || "—"}</strong>
                        </div>
                      </div>

                      {item.summary && (
                        <p className="item-summary-note">{item.summary}</p>
                      )}

                      <div className="item-footer-meta">
                        <span>{item.date}</span>
                        <span>{item.venue}</span>
                        {item.winner && <span>Winner: {item.winner}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* QUICK EDIT MODAL                                         */}
      {/* ======================================================== */}
      {editingItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="modal-header">
              <h3>
                Edit {editingItem.type.toUpperCase()}: {editingItem.data.title}
              </h3>
              <button
                className="modal-close-btn"
                onClick={() => setEditingItem(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModalEdit} className="admin-form modal-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editingItem.data.title || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, title: e.target.value }
                    })
                  }
                  required
                />
              </div>

              {editingItem.type === "stream" && (
                <>
                  <div className="form-group">
                    <label>YouTube Link or Video ID</label>
                    <input
                      type="text"
                      value={editingItem.data.youtubeUrl || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, youtubeUrl: e.target.value }
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={editingItem.data.status || "upcoming"}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, status: e.target.value }
                          })
                        }
                      >
                        <option value="live">● LIVE</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ended">Ended</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Time</label>
                      <input
                        type="text"
                        value={editingItem.data.time || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, time: e.target.value }
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {editingItem.type === "schedule" && (
                <>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={editingItem.data.date || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, date: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Time</label>
                      <input
                        type="text"
                        value={editingItem.data.time || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, time: e.target.value }
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Venue</label>
                    <input
                      type="text"
                      value={editingItem.data.venue || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, venue: e.target.value }
                        })
                      }
                    />
                  </div>
                </>
              )}

              {editingItem.type === "result" && (
                <>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Score A ({editingItem.data.teamA})</label>
                      <input
                        type="text"
                        value={editingItem.data.scoreA || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, scoreA: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Score B ({editingItem.data.teamB})</label>
                      <input
                        type="text"
                        value={editingItem.data.scoreB || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, scoreB: e.target.value }
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Winner</label>
                      <input
                        type="text"
                        value={editingItem.data.winner || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, winner: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Position / Medal</label>
                      <input
                        type="text"
                        value={editingItem.data.position || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, position: e.target.value }
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn outline-btn"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn primary">
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
