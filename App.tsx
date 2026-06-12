import { useState, useEffect } from "react";

const GROUP_MATCHES = [
  // Group A
  { id:"A1", group:"A", home:"Mexico",        away:"South Africa",   date:"Jun 11", kickoff:"2026-06-11T19:00:00Z" },
  { id:"A2", group:"A", home:"South Korea",   away:"Czechia",        date:"Jun 11", kickoff:"2026-06-12T02:00:00Z" },
  { id:"A3", group:"A", home:"Czechia",       away:"South Africa",   date:"Jun 18", kickoff:"2026-06-18T16:00:00Z" },
  { id:"A4", group:"A", home:"Mexico",        away:"South Korea",    date:"Jun 18", kickoff:"2026-06-19T01:00:00Z" },
  { id:"A5", group:"A", home:"Czechia",       away:"Mexico",         date:"Jun 24", kickoff:"2026-06-25T01:00:00Z" },
  { id:"A6", group:"A", home:"South Africa",  away:"South Korea",    date:"Jun 24", kickoff:"2026-06-25T01:00:00Z" },
  // Group B
  { id:"B1", group:"B", home:"Canada",        away:"Bosnia & Herz.", date:"Jun 12", kickoff:"2026-06-12T19:00:00Z" },
  { id:"B2", group:"B", home:"Qatar",         away:"Switzerland",    date:"Jun 13", kickoff:"2026-06-13T19:00:00Z" },
  { id:"B3", group:"B", home:"Switzerland",   away:"Bosnia & Herz.", date:"Jun 18", kickoff:"2026-06-18T19:00:00Z" },
  { id:"B4", group:"B", home:"Canada",        away:"Qatar",          date:"Jun 18", kickoff:"2026-06-18T22:00:00Z" },
  { id:"B5", group:"B", home:"Switzerland",   away:"Canada",         date:"Jun 24", kickoff:"2026-06-24T19:00:00Z" },
  { id:"B6", group:"B", home:"Bosnia & Herz.",away:"Qatar",          date:"Jun 24", kickoff:"2026-06-24T19:00:00Z" },
  // Group C
  { id:"C1", group:"C", home:"Brazil",        away:"Morocco",        date:"Jun 13", kickoff:"2026-06-13T22:00:00Z" },
  { id:"C2", group:"C", home:"Haiti",         away:"Scotland",       date:"Jun 13", kickoff:"2026-06-14T01:00:00Z" },
  { id:"C3", group:"C", home:"Scotland",      away:"Morocco",        date:"Jun 19", kickoff:"2026-06-19T22:00:00Z" },
  { id:"C4", group:"C", home:"Brazil",        away:"Haiti",          date:"Jun 19", kickoff:"2026-06-20T00:30:00Z" },
  { id:"C5", group:"C", home:"Scotland",      away:"Brazil",         date:"Jun 24", kickoff:"2026-06-24T22:00:00Z" },
  { id:"C6", group:"C", home:"Morocco",       away:"Haiti",          date:"Jun 24", kickoff:"2026-06-24T22:00:00Z" },
  // Group D
  { id:"D1", group:"D", home:"USA",           away:"Paraguay",       date:"Jun 12", kickoff:"2026-06-13T01:00:00Z" },
  { id:"D2", group:"D", home:"Australia",     away:"Türkiye",        date:"Jun 14", kickoff:"2026-06-14T04:00:00Z" },
  { id:"D3", group:"D", home:"USA",           away:"Australia",      date:"Jun 19", kickoff:"2026-06-19T19:00:00Z" },
  { id:"D4", group:"D", home:"Türkiye",       away:"Paraguay",       date:"Jun 19", kickoff:"2026-06-20T03:00:00Z" },
  { id:"D5", group:"D", home:"Türkiye",       away:"USA",            date:"Jun 25", kickoff:"2026-06-26T02:00:00Z" },
  { id:"D6", group:"D", home:"Paraguay",      away:"Australia",      date:"Jun 25", kickoff:"2026-06-26T02:00:00Z" },
  // Group E
  { id:"E1", group:"E", home:"Germany",       away:"Curaçao",        date:"Jun 14", kickoff:"2026-06-14T17:00:00Z" },
  { id:"E2", group:"E", home:"Ivory Coast",   away:"Ecuador",        date:"Jun 14", kickoff:"2026-06-14T23:00:00Z" },
  { id:"E3", group:"E", home:"Germany",       away:"Ivory Coast",    date:"Jun 20", kickoff:"2026-06-20T20:00:00Z" },
  { id:"E4", group:"E", home:"Ecuador",       away:"Curaçao",        date:"Jun 20", kickoff:"2026-06-21T00:00:00Z" },
  { id:"E5", group:"E", home:"Curaçao",       away:"Ivory Coast",    date:"Jun 25", kickoff:"2026-06-25T20:00:00Z" },
  { id:"E6", group:"E", home:"Ecuador",       away:"Germany",        date:"Jun 25", kickoff:"2026-06-25T20:00:00Z" },
  // Group F
  { id:"F1", group:"F", home:"Netherlands",   away:"Japan",          date:"Jun 14", kickoff:"2026-06-14T20:00:00Z" },
  { id:"F2", group:"F", home:"Sweden",        away:"Tunisia",        date:"Jun 14", kickoff:"2026-06-15T02:00:00Z" },
  { id:"F3", group:"F", home:"Netherlands",   away:"Sweden",         date:"Jun 20", kickoff:"2026-06-20T17:00:00Z" },
  { id:"F4", group:"F", home:"Tunisia",       away:"Japan",          date:"Jun 21", kickoff:"2026-06-21T04:00:00Z" },
  { id:"F5", group:"F", home:"Japan",         away:"Sweden",         date:"Jun 25", kickoff:"2026-06-25T23:00:00Z" },
  { id:"F6", group:"F", home:"Tunisia",       away:"Netherlands",    date:"Jun 25", kickoff:"2026-06-25T23:00:00Z" },
  // Group G
  { id:"G1", group:"G", home:"Belgium",       away:"Egypt",          date:"Jun 15", kickoff:"2026-06-15T19:00:00Z" },
  { id:"G2", group:"G", home:"Iran",          away:"New Zealand",    date:"Jun 15", kickoff:"2026-06-16T01:00:00Z" },
  { id:"G3", group:"G", home:"Belgium",       away:"Iran",           date:"Jun 21", kickoff:"2026-06-21T19:00:00Z" },
  { id:"G4", group:"G", home:"New Zealand",   away:"Egypt",          date:"Jun 21", kickoff:"2026-06-22T01:00:00Z" },
  { id:"G5", group:"G", home:"Egypt",         away:"Iran",           date:"Jun 26", kickoff:"2026-06-27T03:00:00Z" },
  { id:"G6", group:"G", home:"New Zealand",   away:"Belgium",        date:"Jun 26", kickoff:"2026-06-27T03:00:00Z" },
  // Group H
  { id:"H1", group:"H", home:"Spain",         away:"Cape Verde",     date:"Jun 15", kickoff:"2026-06-15T16:00:00Z" },
  { id:"H2", group:"H", home:"Saudi Arabia",  away:"Uruguay",        date:"Jun 15", kickoff:"2026-06-15T22:00:00Z" },
  { id:"H3", group:"H", home:"Spain",         away:"Saudi Arabia",   date:"Jun 21", kickoff:"2026-06-21T16:00:00Z" },
  { id:"H4", group:"H", home:"Uruguay",       away:"Cape Verde",     date:"Jun 21", kickoff:"2026-06-21T22:00:00Z" },
  { id:"H5", group:"H", home:"Cape Verde",    away:"Saudi Arabia",   date:"Jun 26", kickoff:"2026-06-27T00:00:00Z" },
  { id:"H6", group:"H", home:"Uruguay",       away:"Spain",          date:"Jun 26", kickoff:"2026-06-27T00:00:00Z" },
  // Group I
  { id:"I1", group:"I", home:"France",        away:"Senegal",        date:"Jun 16", kickoff:"2026-06-16T19:00:00Z" },
  { id:"I2", group:"I", home:"Iraq",          away:"Norway",         date:"Jun 16", kickoff:"2026-06-16T22:00:00Z" },
  { id:"I3", group:"I", home:"France",        away:"Iraq",           date:"Jun 22", kickoff:"2026-06-22T21:00:00Z" },
  { id:"I4", group:"I", home:"Norway",        away:"Senegal",        date:"Jun 22", kickoff:"2026-06-23T00:00:00Z" },
  { id:"I5", group:"I", home:"Norway",        away:"France",         date:"Jun 26", kickoff:"2026-06-26T19:00:00Z" },
  { id:"I6", group:"I", home:"Senegal",       away:"Iraq",           date:"Jun 26", kickoff:"2026-06-26T19:00:00Z" },
  // Group J
  { id:"J1", group:"J", home:"Argentina",     away:"Algeria",        date:"Jun 16", kickoff:"2026-06-17T01:00:00Z" },
  { id:"J2", group:"J", home:"Austria",       away:"Jordan",         date:"Jun 17", kickoff:"2026-06-17T04:00:00Z" },
  { id:"J3", group:"J", home:"Argentina",     away:"Austria",        date:"Jun 22", kickoff:"2026-06-22T17:00:00Z" },
  { id:"J4", group:"J", home:"Jordan",        away:"Algeria",        date:"Jun 22", kickoff:"2026-06-23T03:00:00Z" },
  { id:"J5", group:"J", home:"Algeria",       away:"Austria",        date:"Jun 27", kickoff:"2026-06-28T02:00:00Z" },
  { id:"J6", group:"J", home:"Jordan",        away:"Argentina",      date:"Jun 27", kickoff:"2026-06-28T02:00:00Z" },
  // Group K
  { id:"K1", group:"K", home:"Portugal",      away:"DR Congo",       date:"Jun 17", kickoff:"2026-06-17T17:00:00Z" },
  { id:"K2", group:"K", home:"Uzbekistan",    away:"Colombia",       date:"Jun 17", kickoff:"2026-06-18T02:00:00Z" },
  { id:"K3", group:"K", home:"Portugal",      away:"Uzbekistan",     date:"Jun 23", kickoff:"2026-06-23T17:00:00Z" },
  { id:"K4", group:"K", home:"Colombia",      away:"DR Congo",       date:"Jun 23", kickoff:"2026-06-24T02:00:00Z" },
  { id:"K5", group:"K", home:"Colombia",      away:"Portugal",       date:"Jun 27", kickoff:"2026-06-27T23:30:00Z" },
  { id:"K6", group:"K", home:"DR Congo",      away:"Uzbekistan",     date:"Jun 27", kickoff:"2026-06-27T23:30:00Z" },
  // Group L
  { id:"L1", group:"L", home:"England",       away:"Croatia",        date:"Jun 17", kickoff:"2026-06-17T20:00:00Z" },
  { id:"L2", group:"L", home:"Ghana",         away:"Panama",         date:"Jun 17", kickoff:"2026-06-17T23:00:00Z" },
  { id:"L3", group:"L", home:"England",       away:"Ghana",          date:"Jun 23", kickoff:"2026-06-23T20:00:00Z" },
  { id:"L4", group:"L", home:"Panama",        away:"Croatia",        date:"Jun 23", kickoff:"2026-06-23T23:00:00Z" },
  { id:"L5", group:"L", home:"Panama",        away:"England",        date:"Jun 27", kickoff:"2026-06-27T21:00:00Z" },
  { id:"L6", group:"L", home:"Croatia",       away:"Ghana",          date:"Jun 27", kickoff:"2026-06-27T21:00:00Z" },
];

const KNOCKOUT_STAGES = [
  { key:"R32",    label:"Round of 32",  color:"#34495e", icon:"🎯",  slots:32, prefix:"R32" },
  { key:"R16",    label:"Round of 16",  color:"#3498db", icon:"⚔️",  slots:16, prefix:"R16" },
  { key:"QF",     label:"Quarter-Final",color:"#9b59b6", icon:"🏅",  slots:8,  prefix:"QF"  },
  { key:"SF",     label:"Semi-Final",   color:"#e67e22", icon:"🥈",  slots:4,  prefix:"SF"  },
  { key:"FINAL",  label:"Final",        color:"#f1c40f", icon:"🏆",  slots:2,  prefix:"FIN" },
];

const FLAGS = {
  "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Czechia":"🇨🇿",
  "Switzerland":"🇨🇭","Bosnia & Herz.":"🇧🇦","Canada":"🇨🇦","Qatar":"🇶🇦",
  "Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Morocco":"🇲🇦","Brazil":"🇧🇷","Haiti":"🇭🇹",
  "USA":"🇺🇸","Australia":"🇦🇺","Türkiye":"🇹🇷","Paraguay":"🇵🇾",
  "Germany":"🇩🇪","Ivory Coast":"🇨🇮","Ecuador":"🇪🇨","Curaçao":"🇨🇼",
  "Netherlands":"🇳🇱","Sweden":"🇸🇪","Tunisia":"🇹🇳","Japan":"🇯🇵",
  "Belgium":"🇧🇪","Egypt":"🇪🇬","Iran":"🇮🇷","New Zealand":"🇳🇿",
  "Spain":"🇪🇸","Cape Verde":"🇨🇻","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
  "France":"🇫🇷","Senegal":"🇸🇳","Iraq":"🇮🇶","Norway":"🇳🇴",
  "Argentina":"🇦🇷","Algeria":"🇩🇿","Austria":"🇦🇹","Jordan":"🇯🇴",
  "Portugal":"🇵🇹","DR Congo":"🇨🇩","Uzbekistan":"🇺🇿","Colombia":"🇨🇴",
  "England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷","Ghana":"🇬🇭","Panama":"🇵🇦",
};

const GC = {
  A:"#e74c3c",B:"#e67e22",C:"#f1c40f",D:"#2ecc71",E:"#1abc9c",F:"#3498db",
  G:"#9b59b6",H:"#e91e8c",I:"#16a085",J:"#d35400",K:"#27ae60",L:"#8e44ad",
};
const DEFAULT_ADMIN_PW = "wc2026admin";

// ⚠️ PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUVrIW3IAy3C7567cQ1QdmOdnlPyVzJ-MMly51s8fJRemiNeez7KNqmJog0hBAQrtJ/exec";

const normalizePhone = (v) => v.trim().replace(/[\s\-().]/g,"");
const isPhone = (v) => /^\+?[\d]{7,15}$/.test(normalizePhone(v));
const isMatchLocked = (m) => new Date() >= new Date(m.kickoff);
const isMatchToday = (m) => {
  const now = new Date();
  const k = new Date(m.kickoff);
  return now.getFullYear()===k.getFullYear() && now.getMonth()===k.getMonth() && now.getDate()===k.getDate();
};
const formatKickoff = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { weekday:"short", hour:"2-digit", minute:"2-digit" });
};
const getWinner = (h,a) => h>a?"home":a>h?"away":"draw";
const calcScore = (pred, actual) => {
  if (!pred||!actual) return null;
  let pts=0;
  if (pred.winner===actual.winner) pts+=1;
  if (pred.home===actual.home && pred.away===actual.away) pts+=2;
  return pts;
};

const getFlag = (team) => FLAGS[team] || "🏳️";

const RULES = [
  { icon:"📋", title:"How to enter", body:"Log in with your email or phone number. Set a display name on your first visit — this is your permanent identity on the leaderboard." },
  { icon:"⏰", title:"Prediction deadline", body:"You must predict before the match kicks off. Once a match starts it is locked — no entries or edits allowed." },
  { icon:"🎯", title:"Exact score — 3 points", body:"Predict the exact final score (e.g. 2–1) and earn 3 points. The hardest and most rewarding outcome." },
  { icon:"✅", title:"Correct outcome — 1 point", body:"Predict the right result (Home win, Away win, or Draw) but wrong scoreline — you earn 1 point." },
  { icon:"❌", title:"Wrong prediction — 0 points", body:"If your predicted outcome doesn't match the result, you earn 0 points for that match." },
  { icon:"🔒", title:"One prediction per match", body:"Each person gets one prediction per match. Once submitted it is locked and cannot be changed, so choose wisely!" },
  { icon:"⚔️", title:"Knockout rounds", body:"After each stage the admin will add the next round's fixtures (Round of 16 → Quarter-Finals → Semi-Finals → Final). These appear automatically for you to predict." },
  { icon:"🏆", title:"Winning", body:"Points accumulate across ALL matches — group stage and knockout. Most points at the end wins. Tiebreaker: most exact scores, then most correct outcomes." },
];

export default function App() {
  const [screen, setScreen]               = useState("home");
  const [contactInput, setContactInput]   = useState("");
  const [contactKey, setContactKey]       = useState("");
  const [displayContact, setDisplayContact] = useState("");
  const [nameInput, setNameInput]         = useState("");
  const [predictions, setPredictions]     = useState({});
  const [actuals, setActuals]             = useState({});
  const [users, setUsers]                 = useState({});
  const [knockoutMatches, setKnockoutMatches] = useState([]); // admin-added knockout fixtures
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [selectedKOStage, setSelectedKOStage] = useState("R16");
  const [predictTab, setPredictTab]       = useState("today"); // "today" | "group" | "knockout"
  const [currentMatch, setCurrentMatch]   = useState(null);
  const [homeScore, setHomeScore]         = useState("");
  const [awayScore, setAwayScore]         = useState("");
  const [adminPw, setAdminPw]             = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminTab, setAdminTab]           = useState("results");
  const [adminKOStage, setAdminKOStage]   = useState("R16");
  const [adminPassword, setAdminPassword] = useState(DEFAULT_ADMIN_PW);
  const [newPw, setNewPw]                 = useState("");
  const [newPwConfirm, setNewPwConfirm]   = useState("");
  const [actualHome, setActualHome]       = useState("");
  const [actualAway, setActualAway]       = useState("");
  // New knockout fixture form
  const [koHome, setKoHome]               = useState("");
  const [koAway, setKoAway]               = useState("");
  const [koDate, setKoDate]               = useState("");
  const [koKickoff, setKoKickoff]         = useState("");
  const [toast, setToast]                 = useState(null);
  const [loading, setLoading]             = useState(true);
  const [, setNow]                        = useState(new Date());

  useEffect(() => {
    // Poll the shared backend every 15s so everyone sees live updates
    const t = setInterval(()=>{ setNow(new Date()); loadAll(false); }, 15000);
    return ()=>clearInterval(t);
  },[]);

  useEffect(()=>{ loadAll(true); },[]);

  const showToast = (msg, type="success") => {
    setToast({msg,type}); setTimeout(()=>setToast(null),3000);
  };

  // Fetch all data from the shared Google Sheet backend
  const loadAll = async (showLoading) => {
    if (APP_SCRIPT_URL.includes("PASTE_YOUR")) {
      if (showLoading) { setLoading(false); showToast("⚠️ Backend URL not configured yet","error"); }
      return;
    }
    if (showLoading) setLoading(true);
    try {
      const res = await fetch(APP_SCRIPT_URL);
      const data = await res.json();
      setUsers(data.users||{});
      setPredictions(data.predictions||{});
      setActuals(data.actuals||{});
      setKnockoutMatches(data.knockout||[]);
      setAdminPassword(data.adminPassword||DEFAULT_ADMIN_PW);
    } catch (e) {
      if (showLoading) showToast("Couldn't connect to server","error");
    }
    if (showLoading) setLoading(false);
  };

  // Send an action to the backend
  const callApi = async (action, payload={}) => {
    try {
      const res = await fetch(APP_SCRIPT_URL, {
        method:"POST",
        headers:{"Content-Type":"text/plain"}, // avoids CORS preflight on Apps Script
        body: JSON.stringify({ action, ...payload })
      });
      return await res.json();
    } catch (e) {
      showToast("Connection error — try again","error");
      return { success:false };
    }
  };

  const handleReset = async () => {
    await callApi("reset");
    setPredictions({}); setActuals({}); setUsers({}); setKnockoutMatches([]);
    showToast("All data reset successfully!");
  };

  // LOGIN — phone number only
  const handleLogin = async () => {
    const raw = contactInput.trim();
    if (!raw) return;
    if (!isPhone(raw)) { showToast("Enter a valid phone number","error"); return; }
    const key = normalizePhone(raw);
    setContactKey(key); setDisplayContact(key);
    if (users[key]) { setScreen("predict"); return; }
    setScreen("register");
  };

  const handleRegister = async () => {
    const n = nameInput.trim(); if(!n) return;
    setLoading(true);
    await callApi("register", { phone:contactKey, name:n });
    await loadAll(false);
    setLoading(false);
    setScreen("predict");
  };

  // PREDICT
  const getUserPred = (matchId) => predictions[contactKey]?.[matchId]??null;

  const openModal = (match) => {
    if (isMatchLocked(match)) { showToast("This match has already started!","info"); return; }
    if (getUserPred(match.id)) { showToast("Already submitted — locked in!","info"); return; }
    setCurrentMatch(match); setHomeScore(""); setAwayScore("");
  };

  const submitPrediction = async () => {
    const h=parseInt(homeScore), a=parseInt(awayScore);
    if (isNaN(h)||isNaN(a)||h<0||a<0) return;
    const winner = getWinner(h,a);
    setCurrentMatch(null);
    // Optimistic update
    const updated = {...predictions,[contactKey]:{...(predictions[contactKey]||{}),[currentMatch.id]:{home:h,away:a,winner}}};
    setPredictions(updated);
    const res = await callApi("predict", { phone:contactKey, matchId:currentMatch.id, home:h, away:a, winner });
    if (res.success===false) {
      showToast("Already submitted on another device!","error");
      await loadAll(false);
    } else {
      showToast("Prediction locked in! ⚽");
    }
  };

  // ADMIN: save actual result
  const submitActual = async (matchId) => {
    const h=parseInt(actualHome),a=parseInt(actualAway); if(isNaN(h)||isNaN(a)) return;
    const winner=getWinner(h,a);
    const updated={...actuals,[matchId]:{home:h,away:a,winner}};
    setActuals(updated);
    await callApi("setActual", { matchId, home:h, away:a, winner });
    setActualHome(""); setActualAway(""); showToast("Result saved!");
  };

  // ADMIN: add knockout fixture
  const addKnockoutMatch = async (stage) => {
    if (!koHome.trim()||!koAway.trim()||!koDate.trim()||!koKickoff.trim()) {
      showToast("Fill in all fields","error"); return;
    }
    const stageInfo = KNOCKOUT_STAGES.find(s=>s.key===stage);
    const existing  = knockoutMatches.filter(m=>m.stage===stage);
    if (existing.length >= stageInfo.slots/2) { showToast(`Max fixtures for ${stageInfo.label} reached`,"error"); return; }
    const id = `${stageInfo.prefix}${existing.length+1}`;
    const newMatch = { id, stage, home:koHome.trim(), away:koAway.trim(), date:koDate.trim(), kickoff:koKickoff };
    setKnockoutMatches([...knockoutMatches, newMatch]);
    await callApi("addKnockout", newMatch);
    setKoHome(""); setKoAway(""); setKoDate(""); setKoKickoff("");
    showToast(`${stageInfo.label} fixture added! ✅`);
  };

  // ADMIN: remove knockout fixture
  const removeKnockoutMatch = async (id) => {
    setKnockoutMatches(knockoutMatches.filter(m=>m.id!==id));
    await callApi("removeKnockout", { id });
    showToast("Fixture removed");
  };

  // LEADERBOARD
  const getAllMatches = () => [...GROUP_MATCHES, ...knockoutMatches];

  const getLeaderboard = () =>
    Object.entries(predictions).map(([key,matchPreds])=>{
      let total=0,exact=0,correct=0,played=0;
      Object.entries(matchPreds).forEach(([mid,pred])=>{
        const actual=actuals[mid];
        if(actual){ played++; const pts=calcScore(pred,actual); total+=pts; if(pts===3)exact++; if(pts>=1)correct++; }
      });
      return {key,name:users[key]?.displayName||key,total,exact,correct,played,predicted:Object.keys(matchPreds).length};
    }).sort((a,b)=>b.total-a.total||(b.exact-a.exact)||(b.correct-a.correct));

  // MATCH WINNERS
  const getMatchWinners = (matchId) => {
    const actual=actuals[matchId]; if(!actual) return null;
    const match=getAllMatches().find(m=>m.id===matchId);
    const exact=[],winners=[],losers=[];
    Object.entries(predictions).forEach(([key,preds])=>{
      const pred=preds[matchId]; if(!pred) return;
      const name=users[key]?.displayName||key;
      const pts=calcScore(pred,actual);
      if(pts===3) exact.push({name,pred});
      else if(pts===1) winners.push({name,pred});
      else losers.push({name,pred});
    });
    return {match,actual,exact,winners,losers};
  };

  const groups       = [...new Set(GROUP_MATCHES.map(m=>m.group))];
  const groupMatches = GROUP_MATCHES.filter(m=>m.group===selectedGroup);
  const koStageMatches = (stage) => knockoutMatches.filter(m=>m.stage===stage);
  const userName     = users[contactKey]?.displayName||"";

  if (loading) return (
    <div style={{minHeight:"100vh",background:"#0a0e1a",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{color:"#fff",fontSize:18}}>Loading...</div>
    </div>
  );

  const card  = {background:"#141824",borderRadius:16,border:"1px solid #ffffff0a"};
  const btn   = (bg,color="#fff",extra={}) => ({padding:"13px",background:bg,border:"none",borderRadius:12,color,fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",...extra});
  const inp   = {width:"100%",padding:"13px 16px",background:"#141824",border:"2px solid #ffffff15",borderRadius:12,color:"#fff",fontSize:15,outline:"none",boxSizing:"border-box"};
  const smInp = {flex:1,padding:"10px 12px",background:"#0a0e1a",border:"1px solid #ffffff15",borderRadius:10,color:"#fff",fontSize:13,outline:"none"};

  // ── SHARED MATCH CARD ──
  const MatchCard = ({match, stageColor}) => {
    const pred   = getUserPred(match.id);
    const actual = actuals[match.id];
    const locked = isMatchLocked(match);
    const pts    = pred&&actual ? calcScore(pred,actual) : null;
    const color  = stageColor || GC[match.group] || "#3498db";
    return (
      <div onClick={()=>openModal(match)} style={{
        ...card, padding:"14px 16px", cursor:locked||pred?"default":"pointer",
        border: pred
          ? pts===null?"1px solid #3498db44":pts===3?"1px solid #2ecc7144":pts>=1?"1px solid #f1c40f44":"1px solid #e74c3c44"
          : locked?"1px solid #ffffff06":"1px solid #ffffff12",
        opacity:locked&&!pred?0.55:1,
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:10,color,fontWeight:700,letterSpacing:1}}>
            {match.group ? `GROUP ${match.group}` : KNOCKOUT_STAGES.find(s=>s.key===match.stage)?.label||""} · {match.date} · 🕐 {formatKickoff(match.kickoff)}
          </span>
          {locked&&!pred   && <span style={{fontSize:10,color:"#e74c3c",fontWeight:700}}>🔒 LOCKED</span>}
          {!locked&&!pred  && <span style={{fontSize:10,color:"#ffffff40"}}>Tap to predict</span>}
          {pred&&pts===null && <span style={{fontSize:10,color:"#3498db",fontWeight:700}}>✓ Locked in</span>}
          {pred&&pts===3   && <span style={{fontSize:10,color:"#2ecc71",fontWeight:700}}>🎯 +3 pts</span>}
          {pred&&pts===1   && <span style={{fontSize:10,color:"#f1c40f",fontWeight:700}}>✓ +1 pt</span>}
          {pred&&pts===0   && <span style={{fontSize:10,color:"#e74c3c",fontWeight:700}}>✗ 0 pts</span>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1}}>
            <div style={{fontSize:22}}>{getFlag(match.home)}</div>
            <div style={{fontSize:12,fontWeight:600,marginTop:3}}>{match.home}</div>
          </div>
          <div style={{textAlign:"center",minWidth:80}}>
            {pred ? (
              <div>
                <div style={{fontSize:22,fontWeight:800}}>{pred.home} – {pred.away}</div>
                <div style={{fontSize:10,color:"#8b95a8"}}>your pick</div>
                {actual&&<div style={{fontSize:12,color:"#f1c40f",marginTop:3,fontWeight:700}}>
                  {actual.home}–{actual.away} <span style={{color:"#8b95a8",fontWeight:400}}>final</span>
                </div>}
              </div>
            ):(
              <div style={{fontSize:18,color:"#ffffff20",fontWeight:700}}>vs</div>
            )}
          </div>
          <div style={{flex:1,textAlign:"right"}}>
            <div style={{fontSize:22}}>{getFlag(match.away)}</div>
            <div style={{fontSize:12,fontWeight:600,marginTop:3}}>{match.away}</div>
          </div>
        </div>
      </div>
    );
  };

  // ── ADMIN MATCH ROW (results) ──
  const AdminMatchRow = ({match, stageColor}) => {
    const actual=actuals[match.id], locked=isMatchLocked(match);
    const color = stageColor||GC[match.group]||"#3498db";
    return (
      <div style={{...card,padding:"13px",border:actual?"1px solid #2ecc7144":"1px solid #ffffff0a"}}>
        <div style={{fontSize:10,color,fontWeight:700,marginBottom:6}}>
          {match.date} · {getFlag(match.home)} {match.home} vs {match.away} {getFlag(match.away)}
          {!locked&&<span style={{color:"#f1c40f44",marginLeft:8}}>· not started</span>}
        </div>
        {actual ? (
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:"#2ecc71",fontWeight:700,fontSize:16}}>{actual.home} – {actual.away} ✓</span>
            <button onClick={async()=>{
              const u={...actuals}; delete u[match.id]; setActuals(u);
              await callApi("clearActual", { matchId: match.id });
            }} style={{padding:"4px 10px",background:"#e74c3c22",border:"1px solid #e74c3c44",borderRadius:8,color:"#e74c3c",fontSize:11,cursor:"pointer"}}>Clear</button>
          </div>
        ):(
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <input type="number" min="0" max="20" value={actualHome} onChange={e=>setActualHome(e.target.value)} placeholder="H"
              style={{width:48,padding:"7px",textAlign:"center",background:"#0a0e1a",border:"1px solid #ffffff15",borderRadius:8,color:"#fff",fontSize:15,outline:"none"}}/>
            <span style={{color:"#ffffff44"}}>–</span>
            <input type="number" min="0" max="20" value={actualAway} onChange={e=>setActualAway(e.target.value)} placeholder="A"
              style={{width:48,padding:"7px",textAlign:"center",background:"#0a0e1a",border:"1px solid #ffffff15",borderRadius:8,color:"#fff",fontSize:15,outline:"none"}}/>
            <button onClick={()=>submitActual(match.id)} style={{padding:"7px 14px",background:"#2ecc71",border:"none",borderRadius:8,color:"#000",fontSize:12,fontWeight:700,cursor:"pointer"}}>Save</button>
          </div>
        )}
      </div>
    );
  };

  // ── WINNERS CARD ──
  const WinnersCard = ({matchId, stageColor}) => {
    const result=getMatchWinners(matchId); if(!result) return null;
    const {match,actual,exact,winners,losers}=result;
    const color=stageColor||GC[match?.group]||"#3498db";
    const winLabel=actual.winner==="home"?`${match.home} wins`:actual.winner==="away"?`${match.away} wins`:"Draw";
    return (
      <div style={{...card,padding:"14px",border:"1px solid #2ecc7133"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontSize:10,color,fontWeight:700,letterSpacing:1}}>{match.date}</div>
            <div style={{fontSize:13,fontWeight:700,marginTop:2}}>{getFlag(match.home)} {match.home} vs {match.away} {getFlag(match.away)}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:22,fontWeight:800,color:"#2ecc71"}}>{actual.home}–{actual.away}</div>
            <div style={{fontSize:10,color:"#8b95a8"}}>{winLabel}</div>
          </div>
        </div>
        {exact.length>0&&<div style={{marginBottom:8,background:"#f1c40f0a",borderRadius:10,padding:"10px 12px"}}>
          <div style={{fontSize:10,color:"#f1c40f",fontWeight:700,marginBottom:6}}>🎯 EXACT SCORE — +3 pts</div>
          {exact.map((p,i)=><div key={i} style={{fontSize:13,color:"#f1c40f",padding:"2px 0"}}>🏆 {p.name} <span style={{color:"#ffffff40",fontSize:11}}>({p.pred.home}–{p.pred.away})</span></div>)}
        </div>}
        {winners.length>0&&<div style={{marginBottom:8,background:"#2ecc710a",borderRadius:10,padding:"10px 12px"}}>
          <div style={{fontSize:10,color:"#2ecc71",fontWeight:700,marginBottom:6}}>✅ CORRECT OUTCOME — +1 pt</div>
          {winners.map((p,i)=><div key={i} style={{fontSize:13,color:"#2ecc71",padding:"2px 0"}}>✓ {p.name} <span style={{color:"#ffffff40",fontSize:11}}>({p.pred.home}–{p.pred.away})</span></div>)}
        </div>}
        {losers.length>0&&<div style={{background:"#e74c3c0a",borderRadius:10,padding:"10px 12px"}}>
          <div style={{fontSize:10,color:"#e74c3c",fontWeight:700,marginBottom:6}}>❌ WRONG — 0 pts</div>
          {losers.map((p,i)=><div key={i} style={{fontSize:13,color:"#e74c3c",padding:"2px 0"}}>✗ {p.name} <span style={{color:"#ffffff40",fontSize:11}}>({p.pred.home}–{p.pred.away})</span></div>)}
        </div>}
        {exact.length===0&&winners.length===0&&losers.length===0&&<div style={{fontSize:12,color:"#8b95a8"}}>No predictions submitted.</div>}
      </div>
    );
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0e1a",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#fff"}}>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",
        background:toast.type==="info"?"#3498db":toast.type==="error"?"#e74c3c":"#2ecc71",
        color:"#fff",padding:"10px 24px",borderRadius:30,fontSize:14,fontWeight:600,
        zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.5)",whiteSpace:"nowrap",pointerEvents:"none"}}>
        {toast.msg}
      </div>}

      {/* Prediction Modal */}
      {currentMatch&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",
        alignItems:"center",justifyContent:"center",zIndex:100,padding:16}}>
        <div style={{background:"#141824",borderRadius:20,padding:28,width:"100%",maxWidth:360,border:"1px solid #ffffff18"}}>
          <div style={{fontSize:10,color:GC[currentMatch.group]||KNOCKOUT_STAGES.find(s=>s.key===currentMatch.stage)?.color||"#3498db",fontWeight:700,letterSpacing:2,marginBottom:4}}>
            {currentMatch.group?`GROUP ${currentMatch.group}`:KNOCKOUT_STAGES.find(s=>s.key===currentMatch.stage)?.label} · {currentMatch.date}
          </div>
          <div style={{fontSize:11,color:"#8b95a8",marginBottom:14}}>🔒 Locks at {formatKickoff(currentMatch.kickoff)} · cannot be changed after</div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:20}}>{getFlag(currentMatch.home)} {currentMatch.home} vs {currentMatch.away} {getFlag(currentMatch.away)}</div>
          <div style={{fontSize:12,color:"#8b95a8",marginBottom:10}}>Your predicted score:</div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
            {[{label:currentMatch.home,val:homeScore,set:setHomeScore},{label:currentMatch.away,val:awayScore,set:setAwayScore}].map((side,i)=>(
              <div key={i} style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:11,color:"#8b95a8",marginBottom:6}}>{side.label}</div>
                <input type="number" min="0" max="20" value={side.val} onChange={e=>side.set(e.target.value)}
                  style={{width:"100%",padding:"12px 8px",textAlign:"center",background:"#0a0e1a",
                    border:"2px solid #ffffff22",borderRadius:12,color:"#fff",fontSize:28,fontWeight:700,
                    outline:"none",boxSizing:"border-box"}} placeholder="0"/>
              </div>
            ))}
          </div>
          {homeScore!==""&&awayScore!==""&&<div style={{textAlign:"center",marginBottom:14,fontSize:13,color:"#f1c40f",fontWeight:600}}>
            {parseInt(homeScore)>parseInt(awayScore)?`${currentMatch.home} wins`:parseInt(awayScore)>parseInt(homeScore)?`${currentMatch.away} wins`:"Draw"}
          </div>}
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setCurrentMatch(null)} style={{flex:1,padding:"12px",background:"#ffffff0f",border:"none",borderRadius:12,color:"#8b95a8",fontSize:14,fontWeight:600,cursor:"pointer"}}>Cancel</button>
            <button onClick={submitPrediction} disabled={homeScore===""||awayScore===""} style={{flex:2,padding:"12px",background:homeScore!==""&&awayScore!==""?"#3498db":"#3498db44",border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>🔒 Lock Prediction</button>
          </div>
        </div>
      </div>}

      {/* Header */}
      <div style={{background:"#0d1220",borderBottom:"1px solid #ffffff10",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:10,color:"#3498db",fontWeight:700,letterSpacing:2}}>FIFA WORLD CUP 2026</div>
          <div style={{fontSize:17,fontWeight:800}}>⚽ Predictor</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {userName&&<div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"#3498db",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{userName[0].toUpperCase()}</div>
            <span style={{fontSize:12,color:"#8b95a8"}}>{userName}</span>
          </div>}
          {(screen==="predict"||screen==="leaderboard")&&<button onClick={()=>setScreen("rules")} style={{padding:"6px 12px",background:"#ffffff0a",border:"1px solid #ffffff15",borderRadius:20,color:"#8b95a8",fontSize:11,fontWeight:600,cursor:"pointer"}}>📖 Rules</button>}
        </div>
      </div>

      {/* ── HOME ── */}
      {screen==="home"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"85vh",padding:24}}>
        <div style={{fontSize:56,marginBottom:12}}>🏆</div>
        <h1 style={{fontSize:24,fontWeight:800,marginBottom:6,textAlign:"center"}}>WC 2026 Predictor</h1>
        <p style={{color:"#8b95a8",marginBottom:8,textAlign:"center",fontSize:13,lineHeight:1.6}}>
          Predict scores for all matches — group stage to the Final.<br/>One entry per match · Locks at kickoff.
        </p>
        <button onClick={()=>setScreen("rules")} style={{marginBottom:28,padding:"6px 16px",background:"#ffffff0a",border:"1px solid #3498db44",borderRadius:20,color:"#3498db",fontSize:12,fontWeight:600,cursor:"pointer"}}>📖 View Rules</button>
        <div style={{width:"100%",maxWidth:320}}>
          <input value={contactInput} onChange={e=>setContactInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Phone number (e.g. 9876543210)" type="tel" style={{...inp,marginBottom:12}}/>
          <button onClick={handleLogin} style={{...btn("#3498db"),marginBottom:12}}>Enter →</button>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setScreen("leaderboard")} style={{...btn("#ffffff0a","#8b95a8"),border:"1px solid #ffffff15",flex:1}}>🏆 Leaderboard</button>
            <button onClick={()=>setScreen("admin")} style={{...btn("#ffffff0a","#8b95a8"),border:"1px solid #ffffff15",flex:1}}>🔑 Admin</button>
          </div>
        </div>
      </div>}

      {/* ── REGISTER ── */}
      {screen==="register"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
        <div style={{fontSize:44,marginBottom:12}}>👋</div>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:6}}>Welcome!</h2>
        <p style={{color:"#8b95a8",marginBottom:8,textAlign:"center",fontSize:13}}>Set your display name — this is what others<br/>will see on the leaderboard.</p>
        <div style={{fontSize:12,color:"#3498db",marginBottom:24,background:"#3498db11",padding:"6px 14px",borderRadius:20}}>{displayContact}</div>
        <div style={{width:"100%",maxWidth:320}}>
          <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleRegister()} placeholder="Your display name" style={{...inp,marginBottom:12}}/>
          <button onClick={handleRegister} style={btn("#3498db")}>Start Predicting →</button>
        </div>
      </div>}

      {/* ── RULES ── */}
      {screen==="rules"&&<div style={{padding:"16px",maxWidth:600,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40,marginBottom:8}}>📖</div>
          <h2 style={{fontSize:22,fontWeight:800,marginBottom:4}}>How to Play</h2>
          <p style={{color:"#8b95a8",fontSize:13}}>FIFA World Cup 2026 · Full Tournament Predictor</p>
        </div>
        <div style={{background:"linear-gradient(135deg,#1a1f35,#141824)",border:"1px solid #3498db33",borderRadius:16,padding:20,marginBottom:20,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          {[["🎯","Exact Score","3 pts","#f1c40f"],["✅","Correct Outcome","1 pt","#2ecc71"],["❌","Wrong","0 pts","#e74c3c"]].map(([icon,label,pts,color])=>(
            <div key={label} style={{textAlign:"center",minWidth:80}}>
              <div style={{fontSize:24,marginBottom:4}}>{icon}</div>
              <div style={{fontSize:11,color:"#8b95a8",marginBottom:2}}>{label}</div>
              <div style={{fontSize:18,fontWeight:800,color}}>{pts}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
          {RULES.map((rule,i)=>(
            <div key={i} style={{...card,padding:"16px"}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:22,flexShrink:0}}>{rule.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{rule.title}</div>
                  <div style={{fontSize:13,color:"#8b95a8",lineHeight:1.6}}>{rule.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#f1c40f0d",border:"1px solid #f1c40f22",borderRadius:14,padding:16,marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:"#f1c40f",marginBottom:4}}>⚖️ Tiebreaker</div>
          <div style={{fontSize:12,color:"#8b95a8",lineHeight:1.6}}>Same total points? Most exact scores wins. Still tied? Most correct outcomes. Still tied? Joint winners declared.</div>
        </div>
        <button onClick={()=>setScreen(contactKey?"predict":"home")} style={btn("#3498db")}>{contactKey?"← Back to Predictions":"← Back"}</button>
      </div>}

      {/* ── PREDICT ── */}
      {screen==="predict"&&<div style={{padding:"16px",maxWidth:600,margin:"0 auto"}}>

        {/* Today / Group / Knockout toggle */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <button onClick={()=>setPredictTab("today")} style={{flex:1,padding:"10px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:predictTab==="today"?"#2ecc71":"#ffffff10",color:predictTab==="today"?"#fff":"#8b95a8",position:"relative"}}>
            🔥 Today
          </button>
          <button onClick={()=>setPredictTab("group")} style={{flex:1,padding:"10px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:predictTab==="group"?"#3498db":"#ffffff10",color:predictTab==="group"?"#fff":"#8b95a8"}}>
            📋 Group Stage
          </button>
          <button onClick={()=>setPredictTab("knockout")} style={{flex:1,padding:"10px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:predictTab==="knockout"?"#e67e22":"#ffffff10",color:predictTab==="knockout"?"#fff":"#8b95a8",position:"relative"}}>
            ⚔️ Knockout
            {knockoutMatches.length>0&&<span style={{position:"absolute",top:6,right:8,width:8,height:8,borderRadius:"50%",background:"#e74c3c"}}/>}
          </button>
        </div>

        {/* TODAY TAB — only upcoming, predictable matches */}
        {predictTab==="today"&&(()=>{
          const allM = getAllMatches();
          const upcoming = allM.filter(m=>!isMatchLocked(m)).sort((a,b)=>new Date(a.kickoff)-new Date(b.kickoff));
          const todaysUpcoming = upcoming.filter(m=>isMatchToday(m));
          const showList = todaysUpcoming.length>0 ? todaysUpcoming : upcoming.slice(0,2);
          const fallback = todaysUpcoming.length===0;

          if (showList.length===0) return (
            <div style={{...card,padding:32,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:12}}>🏁</div>
              <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>No upcoming matches</div>
              <div style={{color:"#8b95a8",fontSize:13}}>All fixtures so far have kicked off. Check the Knockout tab once new rounds are added.</div>
            </div>
          );
          return (
            <div>
              {fallback&&<div style={{fontSize:12,color:"#8b95a8",marginBottom:12}}>No more matches today — here's what's coming up next:</div>}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {showList.map(m=>{
                  const stage = KNOCKOUT_STAGES.find(s=>s.key===m.stage);
                  return <MatchCard key={m.id} match={m} stageColor={stage?.color}/>;
                })}
              </div>
            </div>
          );
        })()}

        {/* GROUP TAB */}
        {predictTab==="group"&&<>
          <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
            {groups.map(g=>(
              <button key={g} onClick={()=>setSelectedGroup(g)} style={{padding:"7px 14px",borderRadius:30,border:"none",cursor:"pointer",flexShrink:0,fontWeight:700,fontSize:12,background:selectedGroup===g?GC[g]:"#ffffff10",color:selectedGroup===g?"#fff":"#8b95a8"}}>Group {g}</button>
            ))}
          </div>
          {(()=>{
            const done=groupMatches.filter(m=>getUserPred(m.id)).length;
            const missed=groupMatches.filter(m=>isMatchLocked(m)&&!getUserPred(m.id)).length;
            return <div style={{fontSize:12,color:"#8b95a8",marginBottom:12}}>{done}/{groupMatches.length} predicted in Group {selectedGroup}{missed>0&&<span style={{color:"#e74c3c",marginLeft:8}}>· {missed} missed</span>}</div>;
          })()}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {groupMatches.map(m=><MatchCard key={m.id} match={m}/>)}
          </div>
        </>}

        {/* KNOCKOUT TAB */}
        {predictTab==="knockout"&&<>
          {/* Stage selector */}
          <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
            {KNOCKOUT_STAGES.map(s=>{
              const count=koStageMatches(s.key).length;
              return (
                <button key={s.key} onClick={()=>setSelectedKOStage(s.key)} style={{padding:"7px 14px",borderRadius:30,border:"none",cursor:"pointer",flexShrink:0,fontWeight:700,fontSize:12,background:selectedKOStage===s.key?s.color:"#ffffff10",color:selectedKOStage===s.key?"#fff":"#8b95a8",position:"relative"}}>
                  {s.icon} {s.label}
                  {count>0&&<span style={{marginLeft:4,fontSize:10,opacity:0.8}}>({count})</span>}
                </button>
              );
            })}
          </div>

          {(()=>{
            const stage = KNOCKOUT_STAGES.find(s=>s.key===selectedKOStage);
            const matches = koStageMatches(selectedKOStage);
            if (matches.length===0) return (
              <div style={{...card,padding:32,textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:12}}>{stage.icon}</div>
                <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>{stage.label}</div>
                <div style={{color:"#8b95a8",fontSize:13,lineHeight:1.6}}>
                  Fixtures haven't been added yet.<br/>The admin will add them once the previous round is complete.
                </div>
              </div>
            );
            return (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {matches.map(m=><MatchCard key={m.id} match={m} stageColor={stage.color}/>)}
              </div>
            );
          })()}
        </>}

        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button onClick={()=>setScreen("leaderboard")} style={{...btn("#ffffff0a","#8b95a8"),border:"1px solid #ffffff15",flex:1}}>🏆 Leaderboard</button>
          <button onClick={()=>{setContactKey("");setContactInput("");setScreen("home");}} style={{padding:"13px 14px",background:"#ffffff0a",border:"1px solid #ffffff15",borderRadius:12,color:"#8b95a8",fontSize:14,cursor:"pointer"}}>← Out</button>
        </div>
      </div>}

      {/* ── LEADERBOARD ── */}
      {screen==="leaderboard"&&<div style={{padding:"16px",maxWidth:600,margin:"0 auto"}}>
        <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>🏆 Leaderboard</h2>
        <p style={{color:"#8b95a8",fontSize:12,marginBottom:20}}>🎯 Exact = 3 pts · ✅ Correct outcome = 1 pt · All matches count</p>
        {getLeaderboard().length===0
          ?<div style={{textAlign:"center",color:"#8b95a8",padding:40,...card}}>No predictions yet. Be the first!</div>
          :<div style={{display:"flex",flexDirection:"column",gap:8}}>
            {getLeaderboard().map((e,i)=>(
              <div key={e.key} style={{background:i===0?"#1a1400":"#141824",border:e.key===contactKey?"1px solid #3498db55":i===0?"1px solid #f1c40f44":"1px solid #ffffff0a",borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0,background:i===0?"#f1c40f":i===1?"#adb5bd":i===2?"#cd7f32":"#ffffff15",color:i<3?"#000":"#fff"}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:e.key===contactKey?"#3498db":"#fff"}}>{e.name}{e.key===contactKey&&<span style={{fontSize:10,color:"#3498db",marginLeft:4}}>(you)</span>}</div>
                  <div style={{fontSize:11,color:"#8b95a8",marginTop:2}}>{e.predicted} picks · {e.played} played · {e.exact}🎯 · {e.correct}✅</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:22,fontWeight:800,color:i===0?"#f1c40f":"#fff"}}>{e.total}</div>
                  <div style={{fontSize:10,color:"#8b95a8"}}>pts</div>
                </div>
              </div>
            ))}
          </div>
        }
        <button onClick={()=>setScreen(contactKey?"predict":"home")} style={{...btn("#ffffff0a","#8b95a8"),border:"1px solid #ffffff15",marginTop:16}}>← Back</button>
      </div>}

      {/* ── ADMIN ── */}
      {screen==="admin"&&<div style={{padding:"16px",maxWidth:600,margin:"0 auto"}}>
        <h2 style={{fontSize:20,fontWeight:800,marginBottom:16}}>🔑 Admin Panel</h2>
        {!adminUnlocked
          ?<div>
            <input type="password" value={adminPw} onChange={e=>setAdminPw(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&(adminPw===adminPassword?setAdminUnlocked(true):showToast("Wrong password","error"))}
              placeholder="Admin password" style={{...inp,marginBottom:12}}/>
            <button onClick={()=>adminPw===adminPassword?setAdminUnlocked(true):showToast("Wrong password","error")} style={btn("#3498db")}>Unlock</button>
          </div>
          :<>
            {/* Admin tabs */}
            <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
              {[
                {key:"results",  label:"📋 Results",   color:"#3498db"},
                {key:"knockout", label:"⚔️ Add Fixtures",color:"#e67e22"},
                {key:"winners",  label:"🏅 Winners",   color:"#2ecc71"},
                {key:"password", label:"🔑 Password",  color:"#9b59b6"},
                {key:"reset",    label:"🗑️ Reset",      color:"#e74c3c"},
              ].map(t=>(
                <button key={t.key} onClick={()=>setAdminTab(t.key)} style={{padding:"8px 14px",borderRadius:30,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,flexShrink:0,background:adminTab===t.key?t.color:"#ffffff10",color:adminTab===t.key?"#fff":"#8b95a8"}}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Group filter for results/winners */}
            {(adminTab==="results"||adminTab==="winners")&&<>
              <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
                {["GROUP",...groups,"R16","QF","SF","FINAL"].map(tab=>(
                  <button key={tab} onClick={()=>{
                    if(tab==="GROUP") { setSelectedGroup("A"); setAdminKOStage("group"); }
                    else if(groups.includes(tab)) { setSelectedGroup(tab); setAdminKOStage("group"); }
                    else setAdminKOStage(tab);
                  }} style={{padding:"6px 12px",borderRadius:30,border:"none",cursor:"pointer",flexShrink:0,fontWeight:700,fontSize:11,
                    background: adminKOStage==="group"&&groups.includes(tab)&&selectedGroup===tab ? GC[tab]
                      : adminKOStage===tab ? KNOCKOUT_STAGES.find(s=>s.key===tab)?.color||"#3498db"
                      : "#ffffff10",
                    color:(adminKOStage==="group"&&selectedGroup===tab)||adminKOStage===tab?"#fff":"#8b95a8"}}>
                    {tab==="GROUP"?"Groups":tab}
                  </button>
                ))}
              </div>

              {/* RESULTS: Group matches */}
              {adminTab==="results"&&adminKOStage==="group"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
                {groupMatches.map(m=><AdminMatchRow key={m.id} match={m}/>)}
              </div>}
              {/* RESULTS: Knockout matches */}
              {adminTab==="results"&&adminKOStage!=="group"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
                {koStageMatches(adminKOStage).length===0
                  ?<div style={{...card,padding:20,textAlign:"center",color:"#8b95a8",fontSize:13}}>No fixtures added for this stage yet.</div>
                  :koStageMatches(adminKOStage).map(m=>{
                    const stage=KNOCKOUT_STAGES.find(s=>s.key===m.stage);
                    return <AdminMatchRow key={m.id} match={m} stageColor={stage?.color}/>;
                  })
                }
              </div>}
              {/* WINNERS: Group matches */}
              {adminTab==="winners"&&adminKOStage==="group"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
                {groupMatches.map(m=>actuals[m.id]?<WinnersCard key={m.id} matchId={m.id}/>:<div key={m.id} style={{...card,padding:"12px",opacity:0.4}}>
                  <div style={{fontSize:11,color:"#8b95a8"}}>{FLAGS[m.home]||"🏳️"} {m.home} vs {m.away} {FLAGS[m.away]||"🏳️"} · {m.date} · No result yet</div>
                </div>)}
              </div>}
              {/* WINNERS: Knockout matches */}
              {adminTab==="winners"&&adminKOStage!=="group"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
                {koStageMatches(adminKOStage).length===0
                  ?<div style={{...card,padding:20,textAlign:"center",color:"#8b95a8",fontSize:13}}>No fixtures for this stage yet.</div>
                  :koStageMatches(adminKOStage).map(m=>{
                    const stage=KNOCKOUT_STAGES.find(s=>s.key===m.stage);
                    return actuals[m.id]
                      ?<WinnersCard key={m.id} matchId={m.id} stageColor={stage?.color}/>
                      :<div key={m.id} style={{...card,padding:"12px",opacity:0.4}}><div style={{fontSize:11,color:"#8b95a8"}}>{getFlag(m.home)} {m.home} vs {m.away} {getFlag(m.away)} · No result yet</div></div>;
                  })
                }
              </div>}
            </>}

            {/* ── ADD KNOCKOUT FIXTURES TAB ── */}
            {adminTab==="knockout"&&<div>
              <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
                {KNOCKOUT_STAGES.map(s=>(
                  <button key={s.key} onClick={()=>setSelectedKOStage(s.key)} style={{padding:"7px 14px",borderRadius:30,border:"none",cursor:"pointer",flexShrink:0,fontWeight:700,fontSize:12,background:selectedKOStage===s.key?s.color:"#ffffff10",color:selectedKOStage===s.key?"#fff":"#8b95a8"}}>
                    {s.icon} {s.label} <span style={{opacity:0.6}}>({koStageMatches(s.key).length})</span>
                  </button>
                ))}
              </div>

              {(()=>{
                const stage=KNOCKOUT_STAGES.find(s=>s.key===selectedKOStage);
                const existing=koStageMatches(selectedKOStage);
                const maxFixtures=stage.slots/2;
                return (
                  <div>
                    <div style={{...card,padding:20,marginBottom:14,border:`1px solid ${stage.color}33`}}>
                      <div style={{fontSize:13,fontWeight:700,color:stage.color,marginBottom:12}}>{stage.icon} Add {stage.label} Fixture ({existing.length}/{maxFixtures})</div>
                      <div style={{display:"flex",gap:8,marginBottom:10}}>
                        <input value={koHome} onChange={e=>setKoHome(e.target.value)} placeholder="Home team" style={{...smInp}}/>
                        <span style={{color:"#ffffff44",lineHeight:"40px"}}>vs</span>
                        <input value={koAway} onChange={e=>setKoAway(e.target.value)} placeholder="Away team" style={{...smInp}}/>
                      </div>
                      <div style={{display:"flex",gap:8,marginBottom:12}}>
                        <input value={koDate} onChange={e=>setKoDate(e.target.value)} placeholder="Date (e.g. Jul 4)" style={{...smInp}}/>
                        <input type="datetime-local" value={koKickoff} onChange={e=>setKoKickoff(e.target.value?new Date(e.target.value).toISOString():"")}
                          style={{...smInp}} title="Kickoff time (used to lock predictions)"/>
                      </div>
                      <button onClick={()=>addKnockoutMatch(selectedKOStage)} disabled={existing.length>=maxFixtures}
                        style={{...btn(existing.length>=maxFixtures?"#ffffff15":stage.color,existing.length>=maxFixtures?"#8b95a8":"#fff")}}>
                        + Add Fixture
                      </button>
                    </div>

                    {existing.length>0&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
                      <div style={{fontSize:11,color:"#8b95a8",marginBottom:4}}>Added fixtures:</div>
                      {existing.map(m=>(
                        <div key={m.id} style={{...card,padding:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",border:`1px solid ${stage.color}22`}}>
                          <div>
                            <div style={{fontSize:13,fontWeight:600}}>{getFlag(m.home)} {m.home} vs {m.away} {getFlag(m.away)}</div>
                            <div style={{fontSize:11,color:"#8b95a8",marginTop:2}}>{m.date} · {new Date(m.kickoff).toLocaleString()}</div>
                          </div>
                          <button onClick={()=>removeKnockoutMatch(m.id)} style={{padding:"5px 12px",background:"#e74c3c22",border:"1px solid #e74c3c44",borderRadius:8,color:"#e74c3c",fontSize:11,cursor:"pointer",flexShrink:0}}>Remove</button>
                        </div>
                      ))}
                    </div>}
                  </div>
                );
              })()}
            </div>}

            {/* ── CHANGE PASSWORD ── */}
            {adminTab==="password"&&<div style={{...card,padding:24}}>
              <div style={{fontSize:36,marginBottom:12,textAlign:"center"}}>🔑</div>
              <h3 style={{fontSize:18,fontWeight:800,marginBottom:16,textAlign:"center"}}>Change Admin Password</h3>
              <input type="password" value={newPw} onChange={e=>setNewPw(e.target.value)} placeholder="New password" style={{...inp,marginBottom:10}}/>
              <input type="password" value={newPwConfirm} onChange={e=>setNewPwConfirm(e.target.value)} placeholder="Confirm new password" style={{...inp,marginBottom:16}}/>
              {newPw&&newPwConfirm&&newPw!==newPwConfirm&&<div style={{fontSize:12,color:"#e74c3c",marginBottom:12,textAlign:"center"}}>⚠️ Passwords don't match</div>}
              {newPw&&newPw.length<4&&<div style={{fontSize:12,color:"#e74c3c",marginBottom:12,textAlign:"center"}}>⚠️ Minimum 4 characters</div>}
              <button disabled={!newPw||newPw.length<4||newPw!==newPwConfirm}
                onClick={async()=>{
                  try{ await callApi("setPassword", { password:newPw }); }catch(e){}
                  setAdminPassword(newPw); setNewPw(""); setNewPwConfirm("");
                  showToast("Password updated!");
                }}
                style={btn(!newPw||newPw.length<4||newPw!==newPwConfirm?"#9b59b644":"#9b59b6")}>
                Update Password
              </button>
              <div style={{fontSize:11,color:"#8b95a8",marginTop:12,textAlign:"center",lineHeight:1.6}}>Write it down — if forgotten you'll need to reset the whole app.</div>
            </div>}

            {/* ── RESET ── */}
            {adminTab==="reset"&&<div style={{...card,padding:24,textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:12}}>🗑️</div>
              <h3 style={{fontSize:18,fontWeight:800,marginBottom:8}}>Reset All Data</h3>
              <p style={{color:"#8b95a8",fontSize:13,lineHeight:1.6,marginBottom:24}}>Permanently deletes all users, predictions, results, and knockout fixtures. Cannot be undone.</p>
              <button onClick={handleReset} style={{...btn("#e74c3c"),marginBottom:10}}>⚠️ Yes, Reset Everything</button>
              <button onClick={()=>setAdminTab("results")} style={{...btn("#ffffff0a","#8b95a8"),border:"1px solid #ffffff15"}}>Cancel</button>
            </div>}
          </>
        }
        <button onClick={()=>setScreen("home")} style={{...btn("#ffffff0a","#8b95a8"),border:"1px solid #ffffff15",marginTop:20}}>← Back</button>
      </div>}
    </div>
  );
}
