import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import {
  Calendar as CalendarIcon, Lock, CheckCircle2, XCircle, AlertTriangle, ChevronLeft,
  ChevronRight, Download, BarChart2, X, Flame, Star, BookOpen, Copy,
  FileDown, User, ShoppingCart, Briefcase, Bot, Settings, Swords,
  ArrowLeft, Zap, Check, History, Target, Shield, Camera, Edit3, Trash2, Plus,
  BrainCircuit, Circle, Send, Skull, Trophy, FolderOpen, MoveRight,
  Sparkles, Activity, GripVertical, Moon, Image as ImageIcon, Folder,
  ShieldAlert, Mic, Clock, Volume2, Pause, Play, Square, RotateCcw, AlertCircle,
  Sliders, Sun, FastForward, Coffee, RefreshCw, Award, Timer, Layers, CheckSquare,
  ListTodo, Inbox, TrendingUp, TrendingDown, ArrowRight, PieChart, Crown, Compass, Bell, BellRing, GraduationCap,
  Users, CalendarDays, CheckCheck, Crosshair, Heart, Smile, Share2, MessageSquare
} from "lucide-react";

declare const __initial_auth_token: any;

// ==========================================
// OFFICIAL VECTOR APP LOGO (CLEAN & AESTHETIC)
// ==========================================
export const AppLogo = ({ className = "w-8 h-8", glow = true }: { className?: string; glow?: boolean }) => (
  <svg
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${glow ? "drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" : ""}`}
  >
    <defs>
      <linearGradient id="appLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff1be" />
        <stop offset="35%" stopColor="#f5c042" />
        <stop offset="70%" stopColor="#d98218" />
        <stop offset="100%" stopColor="#9a4d06" />
      </linearGradient>
      <linearGradient id="appLogoAmber" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe494" />
        <stop offset="100%" stopColor="#e69500" />
      </linearGradient>
      <radialGradient id="appLogoCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#fde047" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Squircle Base */}
    <rect x="16" y="16" width="480" height="480" rx="120" fill="#0c0d12" stroke="url(#appLogoGold)" strokeWidth="6" />
    <circle cx="256" cy="246" r="130" fill="url(#appLogoCore)" opacity="0.3" />
    <circle cx="256" cy="246" r="160" stroke="url(#appLogoGold)" strokeWidth="2" strokeDasharray="14 7" opacity="0.35" />
    {/* Left Lobe */}
    <path
      d="M 240 148 C 214 148, 186 162, 172 186 C 152 200, 142 226, 146 252 C 140 274, 150 298, 170 314 C 188 334, 218 344, 240 344 C 244 344, 246 340, 246 332 C 246 304, 244 276, 244 246 C 244 214, 246 182, 246 160 C 246 152, 244 148, 240 148 Z"
      stroke="url(#appLogoGold)"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M 174 212 C 192 204, 216 216, 222 232" stroke="url(#appLogoAmber)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    <path d="M 166 266 C 186 260, 212 274, 224 294" stroke="url(#appLogoAmber)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    {/* Right Lobe */}
    <path
      d="M 272 148 C 298 148, 326 162, 340 186 C 360 200, 370 226, 366 252 C 372 274, 362 298, 342 314 C 324 334, 294 344, 272 344 C 268 344, 266 340, 266 332 C 266 304, 268 276, 268 246 C 268 214, 266 182, 266 160 C 266 152, 268 148, 272 148 Z"
      stroke="url(#appLogoGold)"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M 338 212 C 320 204, 296 216, 290 232" stroke="url(#appLogoAmber)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    <path d="M 346 266 C 326 260, 300 274, 288 294" stroke="url(#appLogoAmber)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    {/* Center Star of Clarity */}
    <line x1="256" y1="170" x2="256" y2="322" stroke="url(#appLogoGold)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    <path d="M 256 218 C 256 238, 264 246, 284 246 C 264 246, 256 254, 256 274 C 256 254, 248 246, 228 246 C 248 246, 256 238, 256 218 Z" fill="url(#appLogoGold)" />
    <circle cx="256" cy="246" r="4.5" fill="#ffffff" />
    <circle cx="256" cy="148" r="7" fill="url(#appLogoGold)" />
    <circle cx="256" cy="344" r="7" fill="url(#appLogoGold)" />
    <path d="M 264 382 L 246 408 L 258 408 L 248 430 L 274 398 L 260 398 Z" fill="url(#appLogoGold)" />
  </svg>
);

// ==========================================
// THEME ENGINE (31 MINDSET & FLOW STATE THEMES)
// ==========================================
const THEMES = {
  // --- AESTHETIC & MINDSET THEMES ---
  zenMonk: {
    id: 'zenMonk', name: 'Zen Monastic',
    desc: 'Deep Solitude & Pure Flow State',
    appBg: 'bg-[#0a0a0c] text-[#e4e4e7] font-sans selection:bg-[#d4d4d8] selection:text-black',
    devBar: 'bg-[#27272a] text-[#fafafa] border-b border-[#3f3f46] font-medium',
    header: 'bg-[#121215] text-[#fafafa] border border-[#27272a] shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-2xl',
    card: 'bg-[#121215] border border-[#27272a] shadow-xl rounded-2xl',
    cardInner: 'bg-[#18181b] border border-[#27272a] hover:border-[#52525b] transition-all rounded-xl',
    textMain: 'text-[#f4f4f5]', textMuted: 'text-[#71717a]', textAccent: 'text-[#e4e4e7]', textWarning: 'text-[#a1a1aa]',
    input: 'bg-[#18181b] border border-[#27272a] text-[#fafafa] placeholder:text-[#52525b] focus:border-[#a1a1aa] rounded-xl px-4',
    btnPrimary: 'bg-[#e4e4e7] text-[#09090b] hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl font-bold transition-transform active:scale-95',
    btnWarning: 'bg-[#27272a] text-[#d4d4d8] hover:bg-[#3f3f46] rounded-xl font-bold',
    fontHeading: 'font-sans tracking-tight', borderAccent: 'border-[#3f3f46]', badge: 'bg-[#27272a] text-[#e4e4e7] border border-[#3f3f46] rounded-full'
  },
  matrixTerminal: {
    id: 'matrixTerminal', name: 'Matrix Terminal',
    desc: 'Hacker Focus & Code Mode',
    appBg: 'bg-[#020d05] text-[#22c55e] font-mono selection:bg-[#22c55e] selection:text-black',
    devBar: 'bg-[#14532d] text-[#86efac] border-b border-[#22c55e] font-bold',
    header: 'bg-[#051c0b] text-[#4ade80] border border-[#22c55e]/50 shadow-[0_0_25px_rgba(34,197,94,0.2)] rounded-xl',
    card: 'bg-[#051c0b]/90 border border-[#22c55e]/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] rounded-xl',
    cardInner: 'bg-[#021206] border border-[#22c55e]/20 hover:border-[#22c55e]/60 transition-all rounded-lg',
    textMain: 'text-[#86efac]', textMuted: 'text-[#166534]', textAccent: 'text-[#22c55e]', textWarning: 'text-[#4ade80]',
    input: 'bg-[#020d05] border border-[#22c55e]/40 text-[#86efac] placeholder:text-[#166534] focus:border-[#22c55e] rounded-lg px-4',
    btnPrimary: 'bg-[#22c55e] text-black hover:bg-[#4ade80] shadow-[0_0_20px_rgba(34,197,94,0.5)] rounded-lg font-black uppercase tracking-wider',
    btnWarning: 'bg-[#052e16] text-[#4ade80] border border-[#22c55e]/40 hover:bg-[#14532d] rounded-lg font-bold',
    fontHeading: 'font-mono tracking-wider uppercase', borderAccent: 'border-[#22c55e]/40', badge: 'bg-[#052e16] text-[#86efac] border border-[#22c55e] rounded font-mono'
  },
  imperialGold: {
    id: 'imperialGold', name: 'Imperial Sovereign',
    desc: 'Pure 24k Gold & Royal Prestige',
    appBg: 'bg-[#0b0b0d] text-[#fef08a] font-sans selection:bg-[#fbbf24] selection:text-black',
    devBar: 'bg-[#f59e0b] text-black border-b-2 border-[#fbbf24] font-black',
    header: 'bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#1c1917] text-[#fbbf24] border-2 border-[#f59e0b]/80 shadow-[0_0_35px_rgba(245,158,11,0.35)] rounded-2xl',
    card: 'bg-[#141210] border border-[#f59e0b]/40 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#1c1917] border border-[#f59e0b]/25 hover:border-[#fbbf24] transition-all rounded-xl',
    textMain: 'text-[#fef3c7]', textMuted: 'text-[#92400e]', textAccent: 'text-[#fbbf24]', textWarning: 'text-[#f59e0b]',
    input: 'bg-[#0b0b0d] border border-[#f59e0b]/40 text-[#fef3c7] placeholder:text-[#78350f] focus:border-[#fbbf24] rounded-xl px-4',
    btnPrimary: 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-black hover:brightness-110 shadow-[0_0_25px_rgba(245,158,11,0.6)] rounded-xl font-black uppercase tracking-wider',
    btnWarning: 'bg-[#292524] text-[#fbbf24] border border-[#f59e0b] hover:bg-[#f59e0b] hover:text-black rounded-xl font-black uppercase',
    fontHeading: 'font-bold tracking-wide uppercase', borderAccent: 'border-[#f59e0b]/50', badge: 'bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b] rounded-md font-bold'
  },
  soloShadow: {
    id: 'soloShadow', name: 'Shadow Monarch',
    desc: 'Solo Leveling & Unstoppable Grind',
    appBg: 'bg-[#050508] text-[#e0e7ff] font-sans selection:bg-[#6366f1] selection:text-white',
    devBar: 'bg-[#4338ca] text-white border-b border-[#818cf8] font-black',
    header: 'bg-gradient-to-r from-[#0f1123] via-[#1e1b4b] to-[#0f1123] text-[#c7d2fe] border border-[#6366f1]/60 shadow-[0_0_35px_rgba(99,102,241,0.3)] rounded-2xl',
    card: 'bg-[#0a0a14] border border-[#4338ca]/40 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#101026] border border-[#6366f1]/20 hover:border-[#818cf8] transition-all rounded-xl',
    textMain: 'text-[#e0e7ff]', textMuted: 'text-[#6366f1]/60', textAccent: 'text-[#818cf8]', textWarning: 'text-[#a5b4fc]',
    input: 'bg-[#050508] border border-[#4338ca]/50 text-[#e0e7ff] placeholder:text-[#3730a3] focus:border-[#818cf8] rounded-xl px-4',
    btnPrimary: 'bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white hover:from-[#6366f1] hover:to-[#818cf8] shadow-[0_0_25px_rgba(99,102,241,0.5)] rounded-xl font-black uppercase tracking-wider',
    btnWarning: 'bg-[#1e1b4b] text-[#a5b4fc] border border-[#6366f1]/40 hover:bg-[#312e81] rounded-xl font-bold',
    fontHeading: 'font-black tracking-wide uppercase', borderAccent: 'border-[#6366f1]/40', badge: 'bg-[#312e81] text-[#c7d2fe] border border-[#6366f1] rounded-md font-bold'
  },
  evaUnit01: {
    id: 'evaUnit01', name: 'Evangelion Berserk',
    desc: 'Relentless Will & High Adrenaline',
    appBg: 'bg-[#0c0814] text-[#e9d5ff] font-sans selection:bg-[#a855f7] selection:text-black',
    devBar: 'bg-[#7e22ce] text-[#4ade80] border-b-2 border-[#4ade80] font-black',
    header: 'bg-[#1e1035] text-[#4ade80] border-2 border-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.4)] rounded-2xl',
    card: 'bg-[#150a24] border border-[#7e22ce]/50 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#201037] border border-[#a855f7]/30 hover:border-[#4ade80] transition-all rounded-xl',
    textMain: 'text-[#f3e8ff]', textMuted: 'text-[#9333ea]/70', textAccent: 'text-[#4ade80]', textWarning: 'text-[#c084fc]',
    input: 'bg-[#0c0814] border border-[#7e22ce]/50 text-[#4ade80] placeholder:text-[#581c87] focus:border-[#4ade80] rounded-xl px-4',
    btnPrimary: 'bg-[#4ade80] text-[#0c0814] hover:bg-[#86efac] shadow-[0_0_20px_rgba(74,222,128,0.5)] rounded-xl font-black uppercase tracking-widest',
    btnWarning: 'bg-[#581c87] text-[#4ade80] border border-[#4ade80]/40 hover:bg-[#6b21a8] rounded-xl font-bold',
    fontHeading: 'font-mono tracking-wider uppercase font-black', borderAccent: 'border-[#a855f7]/50', badge: 'bg-[#3b0764] text-[#4ade80] border border-[#4ade80] rounded font-mono'
  },
  darkAcademia: {
    id: 'darkAcademia', name: 'Oxford Scholar',
    desc: 'Parchment & Intellectual Focus',
    appBg: 'bg-[#140e0a] text-[#fed7aa] font-sans selection:bg-[#b45309] selection:text-white',
    devBar: 'bg-[#78350f] text-[#ffedd5] border-b border-[#b45309] font-bold',
    header: 'bg-[#21160f] text-[#ffedd5] border border-[#b45309]/50 shadow-2xl rounded-2xl',
    card: 'bg-[#1a120c] border border-[#78350f]/40 shadow-xl rounded-2xl',
    cardInner: 'bg-[#241a12] border border-[#78350f]/30 hover:border-[#d97706] transition-all rounded-xl',
    textMain: 'text-[#ffedd5]', textMuted: 'text-[#9a3412]', textAccent: 'text-[#fb923c]', textWarning: 'text-[#f59e0b]',
    input: 'bg-[#140e0a] border border-[#78350f]/50 text-[#ffedd5] placeholder:text-[#78350f] focus:border-[#fb923c] rounded-xl px-4',
    btnPrimary: 'bg-[#b45309] text-white hover:bg-[#d97706] shadow-[0_0_15px_rgba(180,83,9,0.4)] rounded-xl font-bold tracking-wide',
    btnWarning: 'bg-[#2e1d13] text-[#fed7aa] border border-[#78350f] hover:bg-[#3d2719] rounded-xl font-bold',
    fontHeading: 'font-serif tracking-normal', borderAccent: 'border-[#78350f]', badge: 'bg-[#2e1d13] text-[#fed7aa] border border-[#b45309] rounded-md'
  },
  nordicFrost: {
    id: 'nordicFrost', name: 'Nordic Glacier',
    desc: 'Arctic Frost & Calm Precision',
    appBg: 'bg-[#060e17] text-[#e0f2fe] font-sans selection:bg-[#38bdf8] selection:text-black',
    devBar: 'bg-[#0369a1] text-white border-b border-[#38bdf8] font-bold',
    header: 'bg-gradient-to-r from-[#0c1f33] to-[#081829] text-[#7dd3fc] border border-[#38bdf8]/40 shadow-[0_0_25px_rgba(56,189,248,0.2)] rounded-2xl',
    card: 'bg-[#081524] border border-[#0284c7]/30 shadow-xl rounded-2xl',
    cardInner: 'bg-[#0c1e33] border border-[#0284c7]/20 hover:border-[#38bdf8] transition-all rounded-xl',
    textMain: 'text-[#f0f9ff]', textMuted: 'text-[#0284c7]', textAccent: 'text-[#38bdf8]', textWarning: 'text-[#7dd3fc]',
    input: 'bg-[#060e17] border border-[#0284c7]/40 text-[#f0f9ff] placeholder:text-[#0369a1] focus:border-[#38bdf8] rounded-xl px-4',
    btnPrimary: 'bg-[#38bdf8] text-[#082f49] hover:bg-[#7dd3fc] shadow-[0_0_20px_rgba(56,189,248,0.4)] rounded-xl font-black uppercase tracking-wider',
    btnWarning: 'bg-[#0c1e33] text-[#7dd3fc] border border-[#38bdf8]/30 hover:bg-[#075985] rounded-xl font-bold',
    fontHeading: 'font-sans tracking-wide', borderAccent: 'border-[#0284c7]/50', badge: 'bg-[#075985] text-[#e0f2fe] border border-[#38bdf8] rounded-full'
  },
  crimsonRonin: {
    id: 'crimsonRonin', name: 'Crimson Ronin',
    desc: 'Samurai Discipline & Bushido Code',
    appBg: 'bg-[#0a0506] text-[#ffe4e6] font-sans selection:bg-[#e11d48] selection:text-white',
    devBar: 'bg-[#9f1239] text-white border-b-2 border-[#e11d48] font-black',
    header: 'bg-[#180a0d] text-[#fda4af] border-2 border-[#e11d48]/70 shadow-[0_0_30px_rgba(225,29,72,0.3)] rounded-2xl',
    card: 'bg-[#120709] border border-[#9f1239]/40 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#1c0b0f] border border-[#e11d48]/25 hover:border-[#f43f5e] transition-all rounded-xl',
    textMain: 'text-[#fff1f2]', textMuted: 'text-[#9f1239]', textAccent: 'text-[#f43f5e]', textWarning: 'text-[#fb7185]',
    input: 'bg-[#0a0506] border border-[#9f1239]/50 text-[#fff1f2] placeholder:text-[#881337] focus:border-[#f43f5e] rounded-xl px-4',
    btnPrimary: 'bg-[#e11d48] text-white hover:bg-[#f43f5e] shadow-[0_0_20px_rgba(225,29,72,0.5)] rounded-xl font-black uppercase tracking-widest',
    btnWarning: 'bg-[#270c12] text-[#fda4af] border border-[#e11d48]/40 hover:bg-[#4c0519] rounded-xl font-bold',
    fontHeading: 'font-black tracking-wider uppercase', borderAccent: 'border-[#e11d48]/50', badge: 'bg-[#4c0519] text-[#fda4af] border border-[#e11d48] rounded'
  },
  emeraldSanctuary: {
    id: 'emeraldSanctuary', name: 'Forest Alchemist',
    desc: 'Botanical Calm & Rejuvenation',
    appBg: 'bg-[#040e08] text-[#d1fae5] font-sans selection:bg-[#10b981] selection:text-black',
    devBar: 'bg-[#065f46] text-[#a7f3d0] border-b border-[#10b981] font-bold',
    header: 'bg-[#071d11] text-[#6ee7b7] border border-[#10b981]/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] rounded-2xl',
    card: 'bg-[#05170d] border border-[#047857]/30 shadow-xl rounded-2xl',
    cardInner: 'bg-[#092415] border border-[#10b981]/20 hover:border-[#34d399] transition-all rounded-xl',
    textMain: 'text-[#ecfdf5]', textMuted: 'text-[#065f46]', textAccent: 'text-[#10b981]', textWarning: 'text-[#34d399]',
    input: 'bg-[#040e08] border border-[#047857]/40 text-[#ecfdf5] placeholder:text-[#064e3b] focus:border-[#10b981] rounded-xl px-4',
    btnPrimary: 'bg-[#10b981] text-black hover:bg-[#34d399] shadow-[0_0_20px_rgba(16,185,129,0.4)] rounded-xl font-bold tracking-wide',
    btnWarning: 'bg-[#064e3b] text-[#a7f3d0] border border-[#10b981]/30 hover:bg-[#065f46] rounded-xl font-bold',
    fontHeading: 'font-sans tracking-normal', borderAccent: 'border-[#047857]/50', badge: 'bg-[#064e3b] text-[#6ee7b7] border border-[#10b981] rounded-full'
  },
  cosmicAbyss: {
    id: 'cosmicAbyss', name: 'Cosmic Abyss',
    desc: 'Deep Space Void & Zero Distraction',
    appBg: 'bg-[#03000a] text-[#ede9fe] font-sans selection:bg-[#7c3aed] selection:text-white',
    devBar: 'bg-[#5b21b6] text-white border-b border-[#a78bfa] font-bold',
    header: 'bg-gradient-to-r from-[#0c051f] via-[#17093b] to-[#0c051f] text-[#c4b5fd] border border-[#7c3aed]/50 shadow-[0_0_35px_rgba(124,58,237,0.3)] rounded-2xl',
    card: 'bg-[#080214] border border-[#6d28d9]/30 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#110526] border border-[#7c3aed]/25 hover:border-[#a78bfa] transition-all rounded-xl',
    textMain: 'text-[#f5f3ff]', textMuted: 'text-[#6d28d9]', textAccent: 'text-[#a78bfa]', textWarning: 'text-[#c4b5fd]',
    input: 'bg-[#03000a] border border-[#6d28d9]/40 text-[#f5f3ff] placeholder:text-[#4c1d95] focus:border-[#a78bfa] rounded-xl px-4',
    btnPrimary: 'bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white hover:brightness-110 shadow-[0_0_20px_rgba(139,92,246,0.5)] rounded-xl font-bold uppercase tracking-wider',
    btnWarning: 'bg-[#1e0b3d] text-[#c4b5fd] border border-[#7c3aed]/30 hover:bg-[#2e1065] rounded-xl font-bold',
    fontHeading: 'font-sans tracking-wide', borderAccent: 'border-[#6d28d9]/50', badge: 'bg-[#2e1065] text-[#c4b5fd] border border-[#7c3aed] rounded-full'
  },
  solarPhoenix: {
    id: 'solarPhoenix', name: 'Solar Phoenix',
    desc: 'Resilience, Rebirth & High Energy',
    appBg: 'bg-[#0d0602] text-[#ffedd5] font-sans selection:bg-[#ea580c] selection:text-white',
    devBar: 'bg-[#c2410c] text-white border-b-2 border-[#fb923c] font-black',
    header: 'bg-gradient-to-r from-[#240e03] via-[#3a1504] to-[#240e03] text-[#fed7aa] border-2 border-[#ea580c]/80 shadow-[0_0_35px_rgba(234,88,12,0.4)] rounded-2xl',
    card: 'bg-[#170902] border border-[#c2410c]/40 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#260f04] border border-[#ea580c]/30 hover:border-[#fb923c] transition-all rounded-xl',
    textMain: 'text-[#fff7ed]', textMuted: 'text-[#9a3412]', textAccent: 'text-[#fb923c]', textWarning: 'text-[#f97316]',
    input: 'bg-[#0d0602] border border-[#c2410c]/50 text-[#fff7ed] placeholder:text-[#7c2d12] focus:border-[#fb923c] rounded-xl px-4',
    btnPrimary: 'bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#fb923c] text-black hover:brightness-110 shadow-[0_0_25px_rgba(234,88,12,0.6)] rounded-xl font-black uppercase tracking-wider',
    btnWarning: 'bg-[#351405] text-[#fed7aa] border border-[#ea580c]/40 hover:bg-[#431407] rounded-xl font-black uppercase',
    fontHeading: 'font-black tracking-wide uppercase', borderAccent: 'border-[#ea580c]/50', badge: 'bg-[#431407] text-[#fed7aa] border border-[#ea580c] rounded font-bold'
  },
  divineSarathi: {
    id: 'divineSarathi', name: 'Divine Sarathi',
    desc: 'Bhagavad Gita & Transcendent Duty',
    appBg: 'bg-[#030a14] text-[#e0f2fe] font-sans selection:bg-[#fbbf24] selection:text-black',
    devBar: 'bg-[#0284c7] text-[#fbbf24] border-b-2 border-[#fbbf24] font-black',
    header: 'bg-gradient-to-r from-[#061e38] via-[#0c3156] to-[#061e38] text-[#fbbf24] border-2 border-[#38bdf8]/60 shadow-[0_0_40px_rgba(56,189,248,0.3)] rounded-2xl',
    card: 'bg-[#05172b] border border-[#0284c7]/40 shadow-2xl rounded-2xl',
    cardInner: 'bg-[#092544] border border-[#38bdf8]/25 hover:border-[#fbbf24] transition-all rounded-xl',
    textMain: 'text-[#f0f9ff]', textMuted: 'text-[#0284c7]', textAccent: 'text-[#fbbf24]', textWarning: 'text-[#38bdf8]',
    input: 'bg-[#030a14] border border-[#0284c7]/50 text-[#f0f9ff] placeholder:text-[#075985] focus:border-[#fbbf24] rounded-xl px-4',
    btnPrimary: 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black hover:brightness-110 shadow-[0_0_25px_rgba(251,191,36,0.6)] rounded-xl font-black uppercase tracking-widest',
    btnWarning: 'bg-[#0a2f54] text-[#fbbf24] border border-[#fbbf24]/40 hover:bg-[#0c3b69] rounded-xl font-bold',
    fontHeading: 'font-bold tracking-wide uppercase', borderAccent: 'border-[#38bdf8]/50', badge: 'bg-[#0c3b69] text-[#fbbf24] border border-[#fbbf24] rounded-full font-bold'
  },
  sakuraBreeze: {
    id: 'sakuraBreeze', name: 'Sakura Zen',
    desc: 'Minimalist Japanese Cherry Blossom',
    appBg: 'bg-[#0e0a12] text-[#fce7f3] font-sans selection:bg-[#ec4899] selection:text-white',
    devBar: 'bg-[#be185d] text-white border-b border-[#f472b6] font-bold',
    header: 'bg-[#1b1222] text-[#fbcfe8] border border-[#ec4899]/40 shadow-[0_0_25px_rgba(236,72,153,0.2)] rounded-2xl',
    card: 'bg-[#150d1b] border border-[#9d174d]/30 shadow-xl rounded-2xl',
    cardInner: 'bg-[#201429] border border-[#ec4899]/20 hover:border-[#f472b6] transition-all rounded-xl',
    textMain: 'text-[#fdf2f8]', textMuted: 'text-[#9d174d]', textAccent: 'text-[#f472b6]', textWarning: 'text-[#fbcfe8]',
    input: 'bg-[#0e0a12] border border-[#9d174d]/40 text-[#fdf2f8] placeholder:text-[#831843] focus:border-[#f472b6] rounded-xl px-4',
    btnPrimary: 'bg-[#ec4899] text-white hover:bg-[#f472b6] shadow-[0_0_20px_rgba(236,72,153,0.4)] rounded-xl font-bold tracking-wide',
    btnWarning: 'bg-[#2e1837] text-[#fbcfe8] border border-[#ec4899]/30 hover:bg-[#3d1a45] rounded-xl font-bold',
    fontHeading: 'font-sans tracking-normal', borderAccent: 'border-[#9d174d]/50', badge: 'bg-[#500724] text-[#fbcfe8] border border-[#ec4899] rounded-full'
  },
  cyberpunkNeon: {
    id: 'cyberpunkNeon', name: 'Night City 2077',
    desc: 'High-Voltage Cyber Yellow & Hyper Cyan',
    appBg: 'bg-[#040406] text-[#fef08a] font-sans selection:bg-[#00f0ff] selection:text-black',
    devBar: 'bg-[#fee500] text-black border-b-2 border-[#00f0ff] font-black tracking-widest',
    header: 'bg-[#0a0a10] text-[#fee500] border-2 border-[#fee500] shadow-[0_0_30px_rgba(254,229,0,0.3)] rounded-none',
    card: 'bg-[#0d0d14] border-2 border-[#00f0ff]/40 shadow-[4px_4px_0px_#fee500] rounded-none',
    cardInner: 'bg-[#141420] border border-[#00f0ff]/30 hover:border-[#fee500] transition-all rounded-none',
    textMain: 'text-[#fffbeb]', textMuted: 'text-[#00f0ff]/60', textAccent: 'text-[#fee500]', textWarning: 'text-[#00f0ff]',
    input: 'bg-[#040406] border-2 border-[#00f0ff]/50 text-[#fee500] placeholder:text-[#008b94] focus:border-[#fee500] rounded-none px-4',
    btnPrimary: 'bg-[#fee500] text-black border-2 border-[#fee500] hover:bg-[#00f0ff] hover:border-[#00f0ff] shadow-[0_0_20px_rgba(254,229,0,0.6)] rounded-none font-black uppercase tracking-widest',
    btnWarning: 'bg-[#0d0d14] text-[#00f0ff] border-2 border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black rounded-none font-black uppercase',
    fontHeading: 'font-mono uppercase tracking-widest font-black', borderAccent: 'border-[#fee500]', badge: 'bg-[#fee500] text-black font-mono font-black px-2'
  },

  // --- CLASSIC & POP CULTURE THEMES ---
  titan: {
    id: 'titan', name: 'Mad Titan',
    desc: 'Infinity Power & Cosmic Destiny',
    appBg: 'bg-[#1a0525] text-[#e0b0ff] font-sans selection:bg-[#ffd700] selection:text-black',
    devBar: 'bg-[#ffd700] text-black border-b-4 border-[#4a148c] font-black',
    header: 'bg-[#4a148c] text-[#ffd700] border-4 border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.3)] rounded-lg',
    card: 'bg-[#2a0845] border-2 border-[#ffd700]/50 shadow-[8px_8px_0px_#ffd700] rounded-lg',
    cardInner: 'bg-[#311b54] border border-[#ffd700]/30 hover:border-[#ffd700] transition-all rounded-md',
    textMain: 'text-[#e0b0ff]', textMuted: 'text-[#8e5eb5]', textAccent: 'text-[#ffd700]', textWarning: 'text-[#ffb300]',
    input: 'bg-[#1a0525] border-2 border-[#ffd700]/50 text-[#ffd700] placeholder:text-[#8e5eb5] focus:border-[#ffd700] rounded-md px-4',
    btnPrimary: 'bg-[#ffd700] text-[#1a0525] border-2 border-[#ffd700] hover:bg-white shadow-[0_0_15px_rgba(255,215,0,0.5)] active:translate-y-1 active:shadow-none rounded-md font-black uppercase',
    btnWarning: 'bg-[#4a148c] text-[#ffd700] border-2 border-[#ffd700] hover:bg-[#ffd700] hover:text-[#4a148c] shadow-[4px_4px_0px_black] rounded-md font-black uppercase',
    fontHeading: 'font-black tracking-widest uppercase', borderAccent: 'border-[#ffd700]', badge: 'bg-[#ffd700] text-[#1a0525] font-black rounded-sm px-2'
  },
  speedster: {
    id: 'speedster', name: 'Speed Force',
    desc: 'Maximum Velocity & Lightning Speed',
    appBg: 'bg-[#990000] text-white font-sans selection:bg-[#ffcc00] selection:text-black',
    devBar: 'bg-[#ffcc00] text-black border-b-4 border-black font-black',
    header: 'bg-gradient-to-r from-[#cc0000] to-[#ff3333] text-white border-[3px] border-black shadow-[6px_6px_0px_#ffcc00] rounded-xl transform -skew-x-2',
    card: 'bg-white border-[3px] border-black shadow-[6px_6px_0px_#111] rounded-xl',
    cardInner: 'bg-[#fff5cc] border-2 border-black hover:bg-[#ffcc00] transition-all rounded-lg',
    textMain: 'text-black', textMuted: 'text-zinc-600', textAccent: 'text-[#cc0000]', textWarning: 'text-[#ffcc00]',
    input: 'bg-white border-2 border-black text-black placeholder:text-zinc-500 focus:border-[#cc0000] rounded-lg px-4',
    btnPrimary: 'bg-[#cc0000] text-white border-[3px] border-black hover:bg-[#ffcc00] hover:text-black shadow-[4px_4px_0px_#111] active:translate-y-1 active:shadow-none rounded-lg font-black uppercase italic',
    btnWarning: 'bg-[#ffcc00] text-black border-[3px] border-black hover:bg-white shadow-[2px_2px_0px_#111] rounded-lg font-black uppercase italic',
    fontHeading: 'font-black tracking-widest italic', borderAccent: 'border-[#ffcc00]', badge: 'bg-[#ffcc00] text-black border-2 border-black font-black rounded-lg italic'
  },
  wolverine: {
    id: 'wolverine', name: 'Weapon X',
    desc: 'Adamantium Resilience & Berserker Rage',
    appBg: 'bg-[#ffce00] text-black font-sans selection:bg-[#32527b] selection:text-white',
    devBar: 'bg-[#32527b] text-white border-b-4 border-black font-black',
    header: 'bg-[#32527b] text-white border-4 border-black shadow-[6px_6px_0px_#000] rounded-none',
    card: 'bg-[#f4f4f4] border-4 border-black shadow-[6px_6px_0px_#000] rounded-none',
    cardInner: 'bg-white border-2 border-black hover:border-[#32527b] transition-all rounded-none',
    textMain: 'text-black', textMuted: 'text-zinc-600', textAccent: 'text-[#32527b]', textWarning: 'text-[#ffce00]',
    input: 'bg-white border-2 border-black text-black placeholder:text-zinc-500 focus:border-[#32527b] rounded-none px-4',
    btnPrimary: 'bg-[#32527b] text-white border-4 border-black hover:bg-[#ffce00] hover:text-black shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none rounded-none font-black uppercase',
    btnWarning: 'bg-[#ffce00] text-black border-4 border-black hover:bg-white shadow-[4px_4px_0px_black] rounded-none font-black uppercase',
    fontHeading: 'font-black tracking-widest italic', borderAccent: 'border-[#32527b]', badge: 'bg-[#32527b] text-white border-2 border-black font-black rounded-none'
  },
  batman: {
    id: 'batman', name: 'Dark Knight',
    desc: 'Tactical Stealth & Gotham Shadows',
    appBg: 'bg-[#0a0a0a] text-gray-300 font-sans selection:bg-[#ffe81f] selection:text-black',
    devBar: 'bg-[#ffe81f] text-black border-b-2 border-black font-black',
    header: 'bg-[#111] text-gray-100 border border-[#222] shadow-[0_10px_30px_rgba(255,232,31,0.1)] rounded-xl',
    card: 'bg-[#151515] border border-[#222] shadow-2xl rounded-xl',
    cardInner: 'bg-[#1a1a1a] border border-[#333] hover:border-[#ffe81f]/50 transition-all rounded-lg',
    textMain: 'text-gray-200', textMuted: 'text-gray-500', textAccent: 'text-[#ffe81f]', textWarning: 'text-yellow-500',
    input: 'bg-[#111] border border-[#333] text-white placeholder:text-gray-600 focus:border-[#ffe81f] rounded-lg px-4',
    btnPrimary: 'bg-[#ffe81f] text-black border-none hover:bg-white shadow-[0_0_15px_rgba(255,232,31,0.3)] rounded-lg font-black uppercase',
    btnWarning: 'bg-[#222] text-[#ffe81f] border border-[#ffe81f] hover:bg-[#ffe81f] hover:text-black rounded-lg font-black uppercase',
    fontHeading: 'font-bold tracking-widest', borderAccent: 'border-[#ffe81f]/30', badge: 'bg-[#ffe81f]/10 text-[#ffe81f] border border-[#ffe81f]/20 rounded-md'
  },
  mario: {
    id: 'mario', name: 'Super Plumber',
    desc: 'Classic 8-Bit Joy & 1-Up Momentum',
    appBg: 'bg-[#5c94fc] text-white font-sans selection:bg-[#e02424] selection:text-white',
    devBar: 'bg-[#e02424] text-white border-b-4 border-[#000] font-black',
    header: 'bg-[#e02424] text-white border-4 border-black shadow-[6px_6px_0px_#fbd000] rounded-2xl',
    card: 'bg-white border-4 border-black shadow-[6px_6px_0px_#000] rounded-2xl',
    cardInner: 'bg-[#f8f8f8] border-2 border-black hover:border-[#e02424] transition-all rounded-xl',
    textMain: 'text-black', textMuted: 'text-zinc-600', textAccent: 'text-[#e02424]', textWarning: 'text-[#fbd000]',
    input: 'bg-white border-2 border-black text-black placeholder:text-zinc-400 focus:border-[#e02424] rounded-xl px-4',
    btnPrimary: 'bg-[#e02424] text-white border-4 border-black hover:bg-[#43b047] shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none rounded-xl font-black uppercase',
    btnWarning: 'bg-[#fbd000] text-black border-4 border-black hover:bg-white shadow-[4px_4px_0px_black] rounded-xl font-black uppercase',
    fontHeading: 'font-black tracking-wide', borderAccent: 'border-[#e02424]', badge: 'bg-[#43b047] text-white border-2 border-black font-black rounded-full'
  },
  stark: {
    id: 'stark', name: 'Stark Tech',
    desc: 'Arc Reactor Energy & Advanced HUD',
    appBg: 'bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#00f3ff] selection:text-black',
    devBar: 'bg-[#990000] text-[#ffcc00] border-b border-[#ffcc00] font-bold',
    header: 'bg-gradient-to-r from-[#800000] to-[#cc0000] text-[#ffcc00] border-b-2 border-[#00f3ff] shadow-[0_0_20px_rgba(204,0,0,0.5)] rounded-xl',
    card: 'bg-[#0a0a0a] border border-[#333] shadow-[0_0_15px_rgba(0,243,255,0.1)] rounded-xl',
    cardInner: 'bg-[#141414] border border-[#00f3ff]/30 hover:border-[#00f3ff] transition-all rounded-lg',
    textMain: 'text-[#e0e0e0]', textMuted: 'text-[#666]', textAccent: 'text-[#00f3ff]', textWarning: 'text-[#ffcc00]',
    input: 'bg-[#050505] border border-[#00f3ff]/50 text-[#00f3ff] placeholder:text-[#333] focus:border-[#00f3ff] focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] rounded-lg px-4',
    btnPrimary: 'bg-[#cc0000] text-[#ffcc00] border border-[#ffcc00] hover:bg-[#ffcc00] hover:text-[#cc0000] shadow-[0_0_15px_rgba(204,0,0,0.4)] rounded-lg font-black uppercase',
    btnWarning: 'bg-[#141414] text-[#00f3ff] border border-[#00f3ff] hover:bg-[#00f3ff] hover:text-black rounded-lg font-black uppercase',
    fontHeading: 'font-mono tracking-widest uppercase', borderAccent: 'border-[#00f3ff]', badge: 'bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff] rounded font-mono'
  },
  rpgDark: {
    id: 'rpgDark', name: 'RPG Stealth',
    desc: 'Clean Dark Fantasy & Dungeon Crawler',
    appBg: 'bg-gray-950 text-gray-200 font-sans selection:bg-blue-500/30 selection:text-blue-200',
    devBar: 'bg-blue-900 text-blue-100 border-b border-blue-700 font-bold',
    header: 'bg-gray-900 border border-gray-800 shadow-xl rounded-2xl',
    card: 'bg-gray-900 border border-gray-800 shadow-xl rounded-2xl',
    cardInner: 'bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl transition-all',
    textMain: 'text-gray-200', textMuted: 'text-gray-500', textAccent: 'text-blue-400', textWarning: 'text-yellow-500',
    input: 'bg-gray-950 border border-gray-700 text-white rounded-xl focus:border-blue-500 placeholder:text-gray-600',
    btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 rounded-xl font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)]',
    btnWarning: 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 rounded-xl font-bold',
    fontHeading: 'font-sans', borderAccent: 'border-blue-500/50', badge: 'bg-gray-900 border border-gray-700 text-gray-300 rounded-full'
  },
  brutalist: {
    id: 'brutalist', name: 'Neo-Brutalist',
    desc: 'High-Contrast Monochrome & Hard Shadows',
    appBg: 'bg-black text-white font-sans uppercase tracking-wider selection:bg-yellow-400 selection:text-black',
    devBar: 'bg-yellow-400 text-black border-b-4 border-white font-black',
    header: 'bg-black border-4 border-white shadow-[6px_6px_0px_white] sm:shadow-[8px_8px_0px_white] rounded-none',
    card: 'bg-black border-4 border-white shadow-[6px_6px_0px_#facc15] sm:shadow-[8px_8px_0px_#facc15] rounded-none',
    cardInner: 'bg-black border-2 border-white hover:border-yellow-400 hover:shadow-[4px_4px_0px_#facc15] transition-all rounded-none',
    textMain: 'text-white', textMuted: 'text-zinc-500', textAccent: 'text-yellow-400', textWarning: 'text-yellow-400',
    input: 'bg-black border-2 border-white text-white rounded-none focus:border-yellow-400 placeholder:text-zinc-600',
    btnPrimary: 'bg-white text-black border-2 border-white hover:bg-yellow-400 hover:border-yellow-400 active:translate-y-1 rounded-none font-black shadow-[4px_4px_0px_black]',
    btnWarning: 'bg-yellow-400 text-black border-2 border-yellow-400 hover:bg-white active:translate-y-1 rounded-none font-black',
    fontHeading: 'font-black tracking-wide uppercase', borderAccent: 'border-yellow-400', badge: 'bg-yellow-400 text-black border-2 border-white rounded-none font-black'
  },
  doraemonDark: {
    id: 'doraemonDark', name: 'Doraemon Dark',
    desc: 'Pocket of Miracles & Midnight Cobalt',
    appBg: 'bg-[#09111e] text-slate-200 font-sans selection:bg-[#0096FE] selection:text-white',
    devBar: 'bg-[#FFD900] text-slate-900 border-b border-[#E6C300] font-bold',
    header: 'bg-gradient-to-r from-[#0096FE] to-[#0077CC] text-white border border-[#0096FE]/50 shadow-[0_10px_30px_rgba(0,150,254,0.3)] rounded-2xl',
    card: 'bg-[#152238] border border-[#1E3A5F] shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl',
    cardInner: 'bg-[#0B132B] border border-[#1E3A5F] hover:border-[#0096FE]/40 rounded-xl sm:rounded-2xl transition-all',
    textMain: 'text-slate-200', textMuted: 'text-slate-400', textAccent: 'text-[#0096FE]', textWarning: 'text-[#FFD900]',
    input: 'bg-[#0B132B] border border-[#1E3A5F] text-slate-200 placeholder:text-slate-600 focus:border-[#0096FE] rounded-full px-4',
    btnPrimary: 'bg-[#0096FE] text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(0,150,254,0.3)] rounded-full font-bold',
    btnWarning: 'bg-[#1E3A5F] text-[#33AAFF] hover:bg-[#1E3A5F]/80 rounded-full font-bold',
    fontHeading: 'font-bold tracking-normal', borderAccent: 'border-[#0096FE]', badge: 'bg-[#0B132B] text-slate-400 border border-[#1E3A5F] rounded-full'
  },
  doraemonLight: {
    id: 'doraemonLight', name: 'Doraemon Light',
    desc: 'Sunny Cyan & Gadget Cheer',
    appBg: 'bg-[#FAFAFA] text-slate-800 font-sans selection:bg-[#0096FE] selection:text-white',
    devBar: 'bg-[#FFD900] text-slate-900 border-b border-[#E6C300] font-bold',
    header: 'bg-gradient-to-r from-[#0096FE] to-[#33AAFF] text-white shadow-lg rounded-2xl',
    card: 'bg-white border border-[#E2E8F0] shadow-xl rounded-2xl',
    cardInner: 'bg-slate-50 border border-[#E2E8F0] hover:border-[#0096FE]/40 rounded-xl sm:rounded-2xl transition-all',
    textMain: 'text-slate-800', textMuted: 'text-slate-500', textAccent: 'text-[#0096FE]', textWarning: 'text-[#FFD900]',
    input: 'bg-slate-50 border border-[#E2E8F0] text-slate-800 placeholder:text-slate-400 focus:border-[#0096FE] rounded-full px-4',
    btnPrimary: 'bg-[#0096FE] text-white hover:bg-blue-600 shadow-md rounded-full font-bold',
    btnWarning: 'bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full font-bold',
    fontHeading: 'font-bold tracking-normal', borderAccent: 'border-[#0096FE]', badge: 'bg-slate-100 text-slate-600 border border-slate-200 rounded-full'
  },
  cyber: {
    id: 'cyber', name: 'Cyber-Glass',
    desc: 'Holographic Glassmorphism & Cyan Frost',
    appBg: 'bg-[#050b14] text-cyan-50 font-sans selection:bg-cyan-500 selection:text-white',
    devBar: 'bg-cyan-900 text-cyan-100 border-b border-cyan-500 font-bold',
    header: 'bg-[#0a192f]/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] rounded-2xl',
    card: 'bg-[#0a192f]/60 backdrop-blur-lg border border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl',
    cardInner: 'bg-[#050b14]/50 border border-cyan-500/10 hover:border-cyan-500/40 rounded-xl sm:rounded-2xl transition-all',
    textMain: 'text-cyan-50', textMuted: 'text-cyan-600/80', textAccent: 'text-cyan-400', textWarning: 'text-teal-400',
    input: 'bg-[#050b14]/50 border border-cyan-500/20 text-cyan-50 placeholder:text-cyan-800 focus:border-cyan-400 rounded-xl px-4',
    btnPrimary: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] rounded-xl font-bold',
    btnWarning: 'bg-[#050b14]/50 text-cyan-600 border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl font-bold',
    fontHeading: 'font-sans tracking-wide uppercase', borderAccent: 'border-cyan-500/50', badge: 'bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-md'
  },
  shinchan: {
    id: 'shinchan', name: 'Action Kamen',
    desc: 'Unapologetic Fun & High Energy Comic',
    appBg: 'bg-[#ffeb3b] text-[#111] font-sans selection:bg-[#ff0000] selection:text-white',
    devBar: 'bg-[#ff0000] text-white border-b-4 border-black font-black',
    header: 'bg-[#00a8ff] text-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_#111]',
    card: 'bg-white border-[3px] border-black shadow-[6px_6px_0px_#111] rounded-2xl',
    cardInner: 'bg-[#fff9c4] border-2 border-black hover:bg-[#ffeb3b] transition-all rounded-xl',
    textMain: 'text-black', textMuted: 'text-zinc-600', textAccent: 'text-[#ff0000]', textWarning: 'text-[#00a8ff]',
    input: 'bg-white border-[3px] border-black text-black placeholder:text-zinc-500 focus:border-[#ff0000] rounded-full px-4',
    btnPrimary: 'bg-[#00a8ff] text-white border-[3px] border-black hover:bg-[#008bcb] shadow-[4px_4px_0px_#111] active:translate-y-1 active:shadow-none rounded-full font-black',
    btnWarning: 'bg-[#ffeb3b] text-black border-[3px] border-black hover:bg-[#fbc02d] rounded-full font-black shadow-[2px_2px_0px_#111]',
    fontHeading: 'font-black tracking-wide uppercase', borderAccent: 'border-[#ff0000]', badge: 'bg-[#ffeb3b] text-black border-2 border-black font-black rounded-full'
  },
  squid: {
    id: 'squid', name: 'Squid Game',
    desc: 'High Stakes & Neon Pink Geometry',
    appBg: 'bg-[#111] text-[#eee] font-sans selection:bg-[#ff0055] selection:text-white',
    devBar: 'bg-[#ff0055] text-white border-b-2 border-black font-bold tracking-widest',
    header: 'bg-[#ff0055] text-white border-b-4 border-black rounded-none shadow-[0_4px_20px_rgba(255,0,85,0.4)]',
    card: 'bg-[#1a1a1a] border-2 border-[#333] shadow-2xl rounded-none',
    cardInner: 'bg-[#222] border border-[#444] hover:border-[#ff0055] transition-all rounded-none',
    textMain: 'text-[#eee]', textMuted: 'text-[#888]', textAccent: 'text-[#00c896]', textWarning: 'text-[#ff0055]',
    input: 'bg-[#111] border-2 border-[#444] text-white placeholder:text-[#666] focus:border-[#00c896] rounded-none px-3',
    btnPrimary: 'bg-[#00c896] text-black border-none hover:bg-[#00e6aa] shadow-[0_0_15px_rgba(0,200,150,0.4)] rounded-none font-black',
    btnWarning: 'bg-[#111] text-[#00c896] border-2 border-[#00c896] hover:bg-[#00c896] hover:text-black rounded-none font-black',
    fontHeading: 'font-bold tracking-widest uppercase', borderAccent: 'border-[#ff0055]', badge: 'bg-[#ff0055] text-white font-bold rounded-sm px-2'
  },
  spider: {
    id: 'spider', name: 'Spider-Verse',
    desc: 'Multiverse Glitch & Urban Web',
    appBg: 'bg-[#0a0a0a] text-white font-sans selection:bg-[#e23636] selection:text-white',
    devBar: 'bg-[#e23636] text-white border-b-2 border-[#0033cc] font-bold',
    header: 'bg-gradient-to-b from-[#e23636] to-[#b91c1c] text-white border-b-4 border-[#0033cc] shadow-[0_8px_0px_#0033cc] rounded-2xl',
    card: 'bg-[#121212] border-2 border-[#333] shadow-[0_0_20px_rgba(226,54,54,0.15)] rounded-2xl',
    cardInner: 'bg-[#1a1a1a] border border-[#e23636]/30 hover:border-[#0033cc] transition-all rounded-2xl',
    textMain: 'text-white', textMuted: 'text-zinc-500', textAccent: 'text-[#e23636]', textWarning: 'text-[#0033cc]',
    input: 'bg-[#121212] border-2 border-[#333] text-white placeholder:text-zinc-600 focus:border-[#e23636] rounded-2xl px-4',
    btnPrimary: 'bg-[#e23636] text-white border border-[#ff6666] hover:bg-[#0033cc] hover:border-[#3366ff] shadow-[0_0_15px_rgba(226,54,54,0.4)] rounded-2xl font-black uppercase',
    btnWarning: 'bg-[#1a1a1a] text-[#0033cc] border-2 border-[#0033cc] hover:bg-[#0033cc] hover:text-white rounded-2xl font-black uppercase',
    fontHeading: 'font-bold uppercase tracking-wider', borderAccent: 'border-[#e23636]', badge: 'bg-[#0033cc] text-white border border-[#3366ff] rounded-full font-bold'
  },
  goku: {
    id: 'goku', name: 'Super Saiyan',
    desc: 'Infinite Ki & Ascended Form',
    appBg: 'bg-[#FF5E00] text-black font-sans selection:bg-[#0047BB] selection:text-white',
    devBar: 'bg-[#0047BB] text-white border-b-4 border-black font-black',
    header: 'bg-[#0047BB] text-white border-4 border-black shadow-[6px_6px_0px_#FFD700] rounded-2xl',
    card: 'bg-[#FFF9E6] border-4 border-black shadow-[6px_6px_0px_#0047BB] rounded-2xl',
    cardInner: 'bg-white border-2 border-black hover:border-[#0047BB] transition-all rounded-xl',
    textMain: 'text-black', textMuted: 'text-zinc-600', textAccent: 'text-[#FF5E00]', textWarning: 'text-[#0047BB]',
    input: 'bg-white border-2 border-black text-black placeholder:text-zinc-400 focus:border-[#FF5E00] rounded-xl px-4',
    btnPrimary: 'bg-[#FF5E00] text-white border-4 border-black hover:bg-[#FFD700] hover:text-black shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none rounded-xl font-black uppercase',
    btnWarning: 'bg-[#0047BB] text-white border-4 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_black] rounded-xl font-black uppercase',
    fontHeading: 'font-black', borderAccent: 'border-[#0047BB]', badge: 'bg-[#FFD700] text-black border-2 border-black font-black rounded-full'
  },
  synthwave: {
    id: 'synthwave', name: 'Retro Synthwave',
    desc: 'Outrun Sunset & Neon Gridlines',
    appBg: 'bg-[#1a0b2e] text-[#00f3ff] font-sans selection:bg-[#ff007f] selection:text-white',
    devBar: 'bg-[#ff007f] text-white border-b-2 border-[#00f3ff] font-bold tracking-widest',
    header: 'bg-gradient-to-r from-[#2b0f4c] to-[#1a0b2e] text-[#00f3ff] border-2 border-[#ff007f] shadow-[0_0_20px_rgba(255,0,127,0.5)] rounded-xl',
    card: 'bg-[#11051f] border-2 border-[#00f3ff] shadow-[4px_4px_0px_#ff007f] rounded-xl',
    cardInner: 'bg-[#1a0b2e] border border-[#ff007f] hover:border-[#00f3ff] transition-all rounded-lg',
    textMain: 'text-[#00f3ff]', textMuted: 'text-[#9d4edd]', textAccent: 'text-[#ff007f]', textWarning: 'text-[#f9c80e]',
    input: 'bg-[#11051f] border-2 border-[#ff007f] text-[#00f3ff] placeholder:text-[#9d4edd] focus:border-[#00f3ff] rounded-lg px-4',
    btnPrimary: 'bg-[#ff007f] text-white border-2 border-[#00f3ff] hover:bg-[#00f3ff] hover:text-[#1a0b2e] shadow-[0_0_15px_rgba(255,0,127,0.8)] rounded-lg font-black uppercase tracking-widest',
    btnWarning: 'bg-[#11051f] text-[#00f3ff] border-2 border-[#00f3ff] hover:bg-[#ff007f] hover:border-[#ff007f] rounded-lg font-black',
    fontHeading: 'font-mono tracking-wide', borderAccent: 'border-[#ff007f]', badge: 'bg-[#ff007f] text-white border border-[#00f3ff] rounded-md font-bold'
  },
  naruto: {
    id: 'naruto', name: 'Hidden Leaf',
    desc: 'Will of Fire & Shinobi Determination',
    appBg: 'bg-[#1c1c1c] text-[#f4f4f4] font-sans selection:bg-[#ff7b00] selection:text-black',
    devBar: 'bg-[#ff7b00] text-black border-b-4 border-black font-black',
    header: 'bg-[#2b2b2b] text-white border-l-8 border-[#ff7b00] shadow-xl rounded-lg',
    card: 'bg-[#222] border border-[#333] shadow-lg rounded-lg',
    cardInner: 'bg-[#2b2b2b] border border-[#444] hover:border-[#ff7b00] transition-all rounded-md',
    textMain: 'text-[#f4f4f4]', textMuted: 'text-[#888]', textAccent: 'text-[#ff7b00]', textWarning: 'text-[#e53e3e]',
    input: 'bg-[#1c1c1c] border-2 border-[#444] text-white placeholder:text-[#666] focus:border-[#ff7b00] rounded-md px-4',
    btnPrimary: 'bg-[#ff7b00] text-black border-2 border-[#ff7b00] hover:bg-white shadow-[0_0_10px_rgba(255,123,0,0.5)] rounded-md font-black uppercase',
    btnWarning: 'bg-[#2b2b2b] text-[#ff7b00] border-2 border-[#ff7b00] hover:bg-[#ff7b00] hover:text-black rounded-md font-black uppercase',
    fontHeading: 'font-bold tracking-tight', borderAccent: 'border-[#ff7b00]', badge: 'bg-[#e53e3e] text-white rounded-sm px-2 font-bold'
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyDZIEDwRpOOtYHqwpRlVsgC2AHYMojwoZM",
  authDomain: "realitytracker-3939393939.firebaseapp.com",
  projectId: "realitytracker-3939393939",
  storageBucket: "realitytracker-3939393939.firebasestorage.app",
  messagingSenderId: "522487820920",
  appId: "1:522487820920:web:bbaa9259c1e0694edcb38d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "habit-tracker-pro-v1";

// ==========================================
// UTILS & DEFENSIVE PARSERS
// ==========================================
const getRealTodayStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatDate = (d: Date): string => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const addDays = (dateStr: string, days: number): string => {
  const parts = dateStr.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2] + days);
  return formatDate(date);
};

const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();

const safeJsonParse = <T,>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    console.warn("Storage parse error, fallback used:", e);
    return fallback;
  }
};

const extractJsonFromAiResponse = <T,>(rawText: string, fallback: T): T => {
  if (!rawText) return fallback;
  try {
    const clean = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const match = clean.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    const jsonStr = match ? match[0] : clean;
    return JSON.parse(jsonStr);
  } catch (e) {
    console.warn("Failed to extract JSON from AI response:", e);
    return fallback;
  }
};

const SHOP_ITEMS = [
  {
    id: "s_streak_shield",
    name: "Streak Freeze Shield",
    desc: "Automatically protects your active streaks from breaking if you miss a day. (Max 2 stored)",
    cost: 50,
    expiryHours: 720,
    icon: "🛡️",
    isLocked: true
  },
  {
    id: "s_webseries",
    name: "The Binge Pass",
    desc: "Watch one complete Web Series (No guilt).",
    cost: 25,
    expiryHours: 120,
    icon: "🍿"
  }
];

const ensureShopItems = (items?: any[]): any[] => {
  const currentList = Array.isArray(items) && items.length > 0 ? [...items] : [...SHOP_ITEMS];
  const shieldIndex = currentList.findIndex((it: any) => it.id === "s_streak_shield");
  if (shieldIndex === -1) {
    currentList.unshift({
      id: "s_streak_shield",
      name: "Streak Freeze Shield",
      desc: "Automatically protects your active streaks from breaking if you miss a day. (Max 2 stored)",
      cost: 50,
      expiryHours: 720,
      icon: "🛡️",
      isLocked: true
    });
  } else {
    currentList[shieldIndex] = {
      ...currentList[shieldIndex],
      id: "s_streak_shield",
      name: "Streak Freeze Shield",
      desc: "Automatically protects your active streaks from breaking if you miss a day. (Max 2 stored)",
      cost: 50,
      expiryHours: 720,
      icon: "🛡️",
      isLocked: true
    };
  }
  return currentList;
};

const DEFAULT_TASKS = [
  { id: "t1", title: "Mind Control", desc: "5 Min Meditation", isLocked: false },
  { id: "t2", title: "Deep Study", desc: "1 Hr Minimum Focus", isLocked: true },
  { id: "t3", title: "Physical Push", desc: "Intense Workout", isLocked: false },
  { id: "t4", title: "Trigger Killer", desc: "No Phone in Bed", isLocked: true },
  { id: "t5", title: "Future Build", desc: "YT / Edit / Trade", isLocked: false },
  { id: "t6", title: "Spirituality", desc: "Prayer / Connection", isLocked: false },
  { id: "t7", title: "Home Duties", desc: "Chores / Cleaning", isLocked: false },
];

const REVISION_INTERVALS = [1, 3, 7, 14, 21, 28, 30];

const MORNING_QUOTES = [
  "Discipline is choosing between what you want now and what you want most.",
  "Your mind is a weapon. Keep it loaded.",
  "Pain is temporary. The pain of regret lasts forever.",
  "Don't stop when you're tired. Stop when you're done.",
];

// ==========================================
// GITA SHLOKAS KNOWLEDGE BASE (AUTHENTIC)
// ==========================================
interface GitaShloka {
  verse: string;
  chapter: string;
  sanskrit: string;
  hindi: string;
  lesson: string;
}

const GITA_SHLOKAS: GitaShloka[] = [
  {
    chapter: "अध्याय 2, श्लोक 47",
    verse: "BG 2.47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    hindi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए फल की इच्छा से कर्म मत करो और न ही कर्म त्यागने में तुम्हारी आसक्ति हो।",
    lesson: "आज केवल अपने कार्य और अनुशासन पर ध्यान दें। परिणाम की चिंता को सखा कृष्ण पर छोड़ दें।"
  },
  {
    chapter: "अध्याय 6, श्लोक 5",
    verse: "BG 6.5",
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    hindi: "मनुष्य को चाहिए कि वह अपने मन के द्वारा अपना उद्धार करे, अपना पतन न होने दे। क्योंकि यह मन ही मनुष्य का मित्र है और मन ही उसका सबसे बड़ा शत्रु है।",
    lesson: "अपने मन और आवेगों पर नियंत्रण रखें; अनुशासित मन ही आपको विजय दिलाएगा।"
  },
  {
    chapter: "अध्याय 2, श्लोक 14",
    verse: "BG 2.14",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    hindi: "सुख और दुःख, सर्दी और गर्मी की तरह आते-जाते रहते हैं। ये अनित्य हैं। हे अर्जुन! तुम इन्हें विचलित हुए बिना सहन करना सीखो।",
    lesson: "क्षणिक आलस्य या कठिनाई से विचलित न हों। शांत रहकर अपने लक्ष्य की ओर निरंतर बढ़ते रहें।"
  },
  {
    chapter: "अध्याय 2, श्लोक 62-63",
    verse: "BG 2.62-63",
    sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्संजायते कामः कामात्क्रोधोऽभिजायते॥",
    hindi: "विषयों का निरंतर चिंतन करने से उनमें आसक्ति उत्पन्न होती है, आसक्ति से कामना और कामना में बाधा आने पर क्रोध उत्पन्न होता है, जिससे बुद्धि का नाश हो जाता है।",
    lesson: "अपने ध्यान को सोशल मीडिया व व्यर्थ की वासनाओं से बचाकर ज्ञान और लक्ष्य में केंद्रित रखें।"
  },
  {
    chapter: "अध्याय 3, श्लोक 30",
    verse: "BG 3.30",
    sanskrit: "मयि सर्वाणि कर्माणि संन्यस्याध्यात्मचेतसा।\nनिराशीर्निर्ममो भूत्वा युध्यस्व विगतज्वरः॥",
    hindi: "अपने सभी कर्मों को मुझे समर्पित करके, ममता और आशा से रहित होकर, शोक-संताप छोड़ उत्साहपूर्वक अपना कर्तव्य करो।",
    lesson: "समर्पण भाव से कार्य करें; जब आप कर्तव्य को ईश्वरीय सेवा मानते हैं, तो तनाव समाप्त हो जाता है।"
  },
  {
    chapter: "अध्याय 4, श्लोक 38",
    verse: "BG 4.38",
    sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
    hindi: "इस संसार में ज्ञान के समान पवित्र करने वाला कुछ भी नहीं है। इस ज्ञान को योग में सिद्ध हुआ मनुष्य समय आने पर स्वतः ही अपने अंतःकरण में पा लेता है।",
    lesson: "प्रतिदिन कुछ नया सीखें और ज्ञान अर्जित करें; ज्ञान ही आपके जीवन का सबसे बड़ा कवच है।"
  },
  {
    chapter: "अध्याय 6, श्लोक 35",
    verse: "BG 6.35",
    sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
    hindi: "हे महाबाहु! इसमें कोई संशय नहीं कि मन चंचल और कठिनता से वश में आने वाला है, परंतु अभ्यास (निरंतर प्रयास) और वैराग्य से इसे वश में किया जा सकता है।",
    lesson: "यदि ध्यान भटकता है, तो निराश न हों; बार-बार अभ्यास द्वारा अपने मन को पुनः कार्य पर लगाएं।"
  },
  {
    chapter: "अध्याय 18, श्लोक 66",
    verse: "BG 18.66",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    hindi: "सभी प्रकार के धर्मों और चिंताओं को छोड़कर केवल मेरी शरण में आ जाओ। मैं तुम्हें समस्त पापों और कष्टों से मुक्त कर दूंगा, शोक मत करो।",
    lesson: "पूर्ण विश्वास रखें। जब आप सत्य और कर्तव्य के मार्ग पर चलते हैं, तो संपूर्ण सृष्टि आपका साथ देती है।"
  }
];

const getDailyGitaShloka = (): GitaShloka => {
  const d = new Date();
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return GITA_SHLOKAS[dayOfYear % GITA_SHLOKAS.length];
};

// ==========================================
// 15-TIER RPG RANK & MASTERY PROGRESSION
// ==========================================
export interface RpgRank {
  tier: number;
  id: string;
  name: string;
  title: string;
  badge: string;
  minLevel: number;
  minXp: number;
  color: string;
  borderColor: string;
  bgGlow: string;
  lore: string;
  perk: string;
}

export const RPG_RANKS: RpgRank[] = [
  {
    tier: 1,
    id: "r_novice",
    name: "Novice Initiate",
    title: "🌱 Novice Initiate",
    badge: "🌱",
    minLevel: 1,
    minXp: 0,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    bgGlow: "rgba(16, 185, 129, 0.2)",
    lore: "Every journey of 10,000 steps begins with day one. The spark of discipline is ignited.",
    perk: "Access to Habit Arena, Focus Chamber & Second Brain Core."
  },
  {
    tier: 2,
    id: "r_sentinel",
    name: "Apprentice Sentinel",
    title: "🛡️ Apprentice Sentinel",
    badge: "🛡️",
    minLevel: 3,
    minXp: 200,
    color: "text-teal-400",
    borderColor: "border-teal-500/50",
    bgGlow: "rgba(20, 184, 166, 0.2)",
    lore: "Laying the foundation of daily routine. Weak impulses begin to yield to planned intent.",
    perk: "+5% Daily Focus clarity & Streak Shield protection synergy."
  },
  {
    tier: 3,
    id: "r_vanguard",
    name: "Iron Vanguard",
    title: "⚔️ Iron Vanguard",
    badge: "⚔️",
    minLevel: 5,
    minXp: 500,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/50",
    bgGlow: "rgba(6, 182, 212, 0.2)",
    lore: "Forging mental steel through daily repetitions. Discipline begins to override fleeting emotions.",
    perk: "Unlocks Two-Box daily reflection mastery & momentum bonus."
  },
  {
    tier: 4,
    id: "r_striker",
    name: "Shadow Striker",
    title: "⚡ Shadow Striker",
    badge: "⚡",
    minLevel: 8,
    minXp: 1000,
    color: "text-blue-400",
    borderColor: "border-blue-500/50",
    bgGlow: "rgba(59, 130, 246, 0.2)",
    lore: "Decisive action without hesitation. Slashing through friction and excuses.",
    perk: "+10 XP on Deep Flow sessions & enhanced Gita guidance."
  },
  {
    tier: 5,
    id: "r_centurion",
    name: "Disciplined Centurion",
    title: "🏹 Disciplined Centurion",
    badge: "🏹",
    minLevel: 11,
    minXp: 1800,
    color: "text-indigo-400",
    borderColor: "border-indigo-500/50",
    bgGlow: "rgba(99, 102, 241, 0.2)",
    lore: "Leading yourself through friction and resistance with stoic command.",
    perk: "Prestige Centurion border in Command Center & Habit Hub."
  },
  {
    tier: 6,
    id: "r_strategist",
    name: "Arcane Strategist",
    title: "🔮 Arcane Strategist",
    badge: "🔮",
    minLevel: 15,
    minXp: 3000,
    color: "text-purple-400",
    borderColor: "border-purple-500/50",
    bgGlow: "rgba(168, 85, 247, 0.2)",
    lore: "Mastery over time, habits, and mental architecture. Chaos turns to predictable order.",
    perk: "Deep Work Intelligence Insights unlocked in Analytics."
  },
  {
    tier: 7,
    id: "r_paragon",
    name: "Diamond Paragon",
    title: "💎 Diamond Paragon",
    badge: "💎",
    minLevel: 20,
    minXp: 4500,
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/50",
    bgGlow: "rgba(217, 70, 239, 0.2)",
    lore: "Unbreakable consistency under intense pressure. Crystalline mental resilience.",
    perk: "Diamond Aura on Hero Profile Card & Priority Krishna Counsel."
  },
  {
    tier: 8,
    id: "r_dragonslayer",
    name: "Dragon Slayer",
    title: "🐉 Dragon Slayer",
    badge: "🐉",
    minLevel: 26,
    minXp: 6500,
    color: "text-rose-400",
    borderColor: "border-rose-500/50",
    bgGlow: "rgba(244, 63, 94, 0.2)",
    lore: "Conquering the internal beast of procrastination. Obstacles become fuel for the fire.",
    perk: "Double Star burst chance on 7-day perfect streaks."
  },
  {
    tier: 9,
    id: "r_warlord",
    name: "Warlord of Willpower",
    title: "👑 Warlord of Willpower",
    badge: "👑",
    minLevel: 33,
    minXp: 9000,
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    bgGlow: "rgba(245, 158, 11, 0.2)",
    lore: "Iron rule over daily execution. Your habits operate with ruthless military precision.",
    perk: "Crown Badge & Golden Focus Timer styling."
  },
  {
    tier: 10,
    id: "r_voidwalker",
    name: "Void Walker",
    title: "🌌 Void Walker",
    badge: "🌌",
    minLevel: 41,
    minXp: 12500,
    color: "text-violet-300",
    borderColor: "border-violet-400/60",
    bgGlow: "rgba(139, 92, 246, 0.3)",
    lore: "Operating in the timeless flow state where distractions evaporate into the void.",
    perk: "Access to Celestial Void styling & hyper-focus state."
  },
  {
    tier: 11,
    id: "r_solar",
    name: "Solar Sovereign",
    title: "☀️ Solar Sovereign",
    badge: "☀️",
    minLevel: 51,
    minXp: 17000,
    color: "text-yellow-300",
    borderColor: "border-yellow-400/60",
    bgGlow: "rgba(250, 204, 21, 0.3)",
    lore: "Radiating pure, relentless productive energy to every task, mission, and person.",
    perk: "Solar Glow Profile frame & unlimited motivation resonance."
  },
  {
    tier: 12,
    id: "r_overlord",
    name: "Mythic Overlord",
    title: "⚡ Mythic Overlord",
    badge: "⚡",
    minLevel: 66,
    minXp: 23000,
    color: "text-emerald-300",
    borderColor: "border-emerald-400/60",
    bgGlow: "rgba(52, 211, 153, 0.3)",
    lore: "Among the top 0.1% disciplined achievers. Legendary habit consistency recorded in the annals.",
    perk: "Mythic Overlord status banner across all OS modules."
  },
  {
    tier: 13,
    id: "r_brahman",
    name: "Ascended Brahman",
    title: "🪶 Ascended Brahman",
    badge: "🪶",
    minLevel: 81,
    minXp: 30000,
    color: "text-sky-300",
    borderColor: "border-sky-400/60",
    bgGlow: "rgba(56, 189, 248, 0.3)",
    lore: "Total detachment from failure, total devotion to righteous action. Karma Yoga perfected.",
    perk: "Eternal Shloka blessing & Divine Sarathi bond."
  },
  {
    tier: 14,
    id: "r_maharathi",
    name: "Maharathi of Karma",
    title: "🕉️ Maharathi of Karma",
    badge: "🕉️",
    minLevel: 100,
    minXp: 40000,
    color: "text-amber-300",
    borderColor: "border-amber-400/70",
    bgGlow: "rgba(251, 191, 36, 0.35)",
    lore: "The supreme battlefield master of mind, senses, and destiny. Unshakable under any storm.",
    perk: "Maharathi Golden Aura & Eternal Archival in Second Brain."
  },
  {
    tier: 15,
    id: "r_eternal",
    name: "Apex Eternal",
    title: "🌌 Apex Eternal",
    badge: "🌌",
    minLevel: 150,
    minXp: 55000,
    color: "text-rose-300",
    borderColor: "border-rose-400/80",
    bgGlow: "rgba(251, 113, 133, 0.4)",
    lore: "Absolute mastery. You have conquered the greatest enemy of all: the undisciplined self.",
    perk: "Apex Transcendence — All features permanently mastered."
  }
];

export const getPlayerLevel = (stars: number = 0, xp: number = 0): number => {
  const starLevels = Math.floor((stars || 0) / 10);
  const xpLevels = Math.floor((xp || 0) / 100);
  return Math.max(1, 1 + starLevels + xpLevels);
};

export const getPlayerRankData = (stars: number = 0, xp: number = 0) => {
  const level = getPlayerLevel(stars, xp);
  const userXp = xp || 0;

  let currentRankIndex = 0;
  for (let i = 0; i < RPG_RANKS.length; i++) {
    if (level >= RPG_RANKS[i].minLevel || userXp >= RPG_RANKS[i].minXp) {
      currentRankIndex = i;
    }
  }

  const currentRank = RPG_RANKS[currentRankIndex];
  const nextRank = currentRankIndex < RPG_RANKS.length - 1 ? RPG_RANKS[currentRankIndex + 1] : null;

  let progressToNext = 100;
  let xpNeededForNext = 0;
  let levelsNeededForNext = 0;

  if (nextRank) {
    const xpRange = nextRank.minXp - currentRank.minXp;
    const currentXpProgress = Math.max(0, userXp - currentRank.minXp);
    const xpPct = xpRange > 0 ? (currentXpProgress / xpRange) * 100 : 100;

    const levelRange = nextRank.minLevel - currentRank.minLevel;
    const currentLevelProgress = Math.max(0, level - currentRank.minLevel);
    const lvlPct = levelRange > 0 ? (currentLevelProgress / levelRange) * 100 : 100;

    progressToNext = Math.min(99, Math.max(5, Math.round(Math.max(xpPct, lvlPct))));
    xpNeededForNext = Math.max(0, nextRank.minXp - userXp);
    levelsNeededForNext = Math.max(0, nextRank.minLevel - level);
  }

  return {
    level,
    currentRank,
    nextRank,
    progressToNext,
    xpNeededForNext,
    levelsNeededForNext,
    allRanks: RPG_RANKS,
    currentRankIndex
  };
};

export interface RankTransitionModalState {
  isOpen: boolean;
  type: "up" | "down";
  oldTier: number;
  newTier: number;
  oldRank: RpgRank;
  newRank: RpgRank;
}

export const playRankFanfare = (type: "up" | "down", tier: number = 1) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "up") {
      if (tier >= 13) {
        // 🌌 GOD TIER (Tiers 13-15): Sacred Solfeggio 432Hz/528Hz Divine Harmonics & Om Vibrations
        const solfeggioFrequencies = [432.0, 528.0, 639.0, 852.0, 963.0, 1056.0];
        solfeggioFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 2.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.09);
          osc.stop(ctx.currentTime + idx * 0.09 + 2.4);
        });
      } else if (tier >= 10) {
        // ☀️ SOLAR / OVERLORD TIER (Tiers 10-12): Cosmic Synthesizer Overdrive
        const cosmicFrequencies = [220.0, 277.18, 329.63, 440.0, 554.37, 659.25, 880.0, 1318.51];
        cosmicFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 1.8);
        });
      } else if (tier >= 7) {
        // 🔥 WARLORD / DRAGONSLAYER TIER (Tiers 7-9): Orchestral Brass Crescendo with Sub-Bass
        const warlordFrequencies = [130.81, 261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.50];
        warlordFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? "sawtooth" : idx > 4 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.22, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + (idx === warlordFrequencies.length - 1 ? 1.4 : 0.6));
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 1.5);
        });
      } else if (tier >= 4) {
        // ⚡ STRIKER / CENTURION TIER (Tiers 4-6): Electric Power Arpeggio
        const powerFrequencies = [329.63, 440.0, 554.37, 659.25, 880.0, 1108.73];
        powerFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === powerFrequencies.length - 1 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
          gain.gain.setValueAtTime(0.24, ctx.currentTime + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.7);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.09);
          osc.stop(ctx.currentTime + idx * 0.09 + 0.8);
        });
      } else {
        // 🌱 INITIATE / SENTINEL TIER (Tiers 1-3): Crisp Emerald Bell Chime
        const initiateFrequencies = [523.25, 659.25, 783.99, 1046.50];
        initiateFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.6);
        });
      }
    } else {
      // ⚠️ DESCENDING DEMOTION CHIME
      const pitches = [392.0, 311.13, 261.63, 130.81];
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.16);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.16 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.16);
        osc.stop(ctx.currentTime + idx * 0.16 + 0.6);
      });
    }
  } catch (e) {
    console.warn("Web Audio API not supported or autoplay restricted:", e);
  }
};

// ==========================================
// ⚔️ COMBAT & MASCOT AUDIO HANDLERS (MUTED / SILENT ON REQUEST)
// ==========================================
export const playCombatSlashSound = () => {};
export const playCombatCritSound = () => {};
export const playCombatShieldSound = () => {};
export const playMascotPopSound = () => {};

// ==========================================
// 🌊 FLUID DUOLINGO-STYLE SVG ANIMATION COMPONENTS
// ==========================================

export const FluidCheckmark = ({ isChecked = true, className = "w-5 h-5" }: { isChecked?: boolean; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" className={isChecked ? "fill-emerald-500 stroke-emerald-400" : "fill-transparent stroke-current"} strokeWidth="2" />
    {isChecked && (
      <path
        d="M 7 12 L 10.5 15.5 L 17 8.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-check-draw"
      />
    )}
  </svg>
);

export const FlowingStreakFlame = ({ count = 0, size = "md" }: { count?: number; size?: "sm" | "md" | "lg" }) => {
  const isSm = size === "sm";
  const isLg = size === "lg";
  const dim = isSm ? "w-6 h-6" : isLg ? "w-16 h-16" : "w-10 h-10";

  return (
    <div className={`relative inline-flex items-center justify-center ${dim}`}>
      {/* Dynamic Flowing SVG Fire */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full animate-fire-wave overflow-visible`}
      >
        <defs>
          <linearGradient id="flameOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="45%" stopColor="#f97316" />
            <stop offset="80%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="flameCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        {/* Outer Flame Hull */}
        <path
          d="M 50 8 C 58 35, 78 45, 82 72 C 86 94, 70 112, 50 112 C 30 112, 14 94, 18 72 C 22 45, 42 35, 50 8 Z"
          fill="url(#flameOuterGrad)"
        />
        {/* Inner Fluttering Core */}
        <path
          d="M 50 38 C 55 54, 68 62, 70 78 C 72 90, 62 102, 50 102 C 38 102, 28 90, 30 78 C 32 62, 45 54, 50 38 Z"
          fill="url(#flameCoreGrad)"
          className="animate-flame-core"
        />
        {/* Rising Particle Embers */}
        <circle cx="40" cy="40" r="3.5" fill="#fef08a" className="animate-ember-1" />
        <circle cx="62" cy="48" r="2.8" fill="#fde047" className="animate-ember-2" />
        <circle cx="50" cy="24" r="2.2" fill="#ffffff" className="animate-ember-3" />
      </svg>
      {count > 0 && (
        <span
          className={`absolute font-black leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-white select-none ${
            isSm ? "text-[9px] -bottom-1" : isLg ? "text-base -bottom-1" : "text-[11px] -bottom-0.5"
          }`}
        >
          {count}
        </span>
      )}
    </div>
  );
};

// ==========================================
// ⚔️ 1v1 PVP DISCIPLINE BATTLE ARENA DATA MODEL
// ==========================================

export interface BattlePlayer {
  uid: string;
  name: string;
  avatar: string;
  hp: number;           // 0 - 1000
  maxHp: number;        // 1000
  tasksCompleted: number;
  focusMinutes: number;
  twoBoxCompleted: boolean;
  shieldsCount: number; // 0 - 2
  lastAction: {
    type: "attack" | "shield" | "crit" | "taunt" | "heal" | "ko";
    text: string;
    amount?: number;
    timestamp: number;
  } | null;
  liveFocus?: {
    isActive: boolean;
    durationMinutes: number;
    startedAt: number;
    remainingSeconds: number;
  } | null;
}

export interface CombatLogItem {
  id: string;
  senderName: string;
  senderUid: string;
  type: "attack" | "shield" | "crit" | "taunt" | "system" | "ko";
  message: string;
  timestamp: number;
}

export interface BattleRoom {
  roomCode: string;     // e.g. "WAR492"
  createdAt: number;
  status: "waiting" | "active" | "completed";
  format: "blitz" | "siege" | "duel";
  targetDate: string;   // YYYY-MM-DD
  endDate: string;      // YYYY-MM-DD
  stakes: string;       // Custom forfeit e.g. "50 Pushups"
  duelDurationMinutes?: number; // 25, 45, 60 for live duel
  host: BattlePlayer;
  challenger: BattlePlayer | null;
  winnerUid: string | null;
  combatLog: CombatLogItem[];
}

// ==========================================
// SCHEDULED EVENTS, CLASSES & MEETINGS TYPES
// ==========================================
export type EventCategory = "class" | "meeting" | "exam" | "urgent" | "personal";

export interface ScheduledEvent {
  id: string;
  title: string;
  date: string;               // YYYY-MM-DD (e.g. "2027-02-12")
  time?: string;              // e.g. "10:00 AM", "04:30 PM"
  category: EventCategory;
  notes?: string;             // Room/Zoom link, instructor, description
  completed?: boolean;        // Marked attended / done
  notified?: boolean;         // Has browser notification fired
  createdAt: string;
}

export const EVENT_CATEGORIES: { id: EventCategory; label: string; icon: string; color: string; badgeBg: string }[] = [
  { id: "class", label: "Class / Lecture", icon: "🎓", color: "text-sky-400", badgeBg: "bg-sky-500/20 text-sky-300 border-sky-400/30" },
  { id: "meeting", label: "Meeting / Sync", icon: "💼", color: "text-amber-400", badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30" },
  { id: "exam", label: "Exam / Test", icon: "📝", color: "text-rose-400", badgeBg: "bg-rose-500/20 text-rose-300 border-rose-400/30" },
  { id: "urgent", label: "Urgent Deadline", icon: "⚡", color: "text-yellow-400", badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30" },
  { id: "personal", label: "Personal / Event", icon: "🎯", color: "text-emerald-400", badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" }
];

export const formatEventDateLabel = (dateStr: string, currentToday: string): string => {
  if (dateStr === currentToday) return "🚨 TODAY";
  if (dateStr === addDays(currentToday, 1)) return "⏳ TOMORROW";
  if (dateStr === addDays(currentToday, -1)) return "YESTERDAY";
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const dateObj = new Date(y, m - 1, d);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[dateObj.getMonth()];
    const todayParts = currentToday.split("-").map(Number);
    const todayObj = new Date(todayParts[0], todayParts[1] - 1, todayParts[2]);
    const diffTime = dateObj.getTime() - todayObj.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1 && diffDays <= 30) {
      return `📅 In ${diffDays} Days (${monthName} ${d})`;
    }
    return `📅 ${monthName} ${d}, ${y}`;
  } catch {
    return dateStr;
  }
};

// ==========================================
// KRISHNA MODE - TYPE DEFINITIONS
// ==========================================
interface KrishnaMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface KrishnaConversation {
  id: string;
  title: string;
  createdAt: string;
  lastUpdated: string;
  messages: KrishnaMessage[];
}

interface KrishnaState {
  conversations: KrishnaConversation[];
  activeConversationId: string | null;
}

// ==========================================
// CUSTOM HOOKS
// ==========================================
const useLongPress = (callback = () => {}, ms = 800) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (startLongPress) {
      timerId = setTimeout(() => {
        callbackRef.current();
      }, ms);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
    onTouchCancel: () => setStartLongPress(false)
  };
};

// ==========================================
// SHARED COMPONENTS
// ==========================================
const RemovableTask = ({ task, t, onDelete }: any) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const longPressEvent = useLongPress(() => { if (!task.isLocked) { setShowConfirm(true); } }, 800);

  return (
    <div {...(showConfirm ? {} : longPressEvent)} className={`flex items-center justify-between p-3 sm:p-4 ${t.cardInner} relative overflow-hidden group mb-2 transition-all`}>
      {showConfirm ? (
        <div className="w-full flex items-center justify-between gap-3 animate-in fade-in zoom-in duration-200">
          <span className={`text-[10px] sm:text-sm font-black uppercase tracking-widest ${t.textWarning} ${t.fontHeading}`}>Delete this task?</span>
          <div className="flex gap-2">
            <button onClick={() => onDelete(task.id)} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all active:scale-95 ${t.fontHeading}`}>YES</button>
            <button onClick={() => setShowConfirm(false)} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${t.btnWarning} ${t.fontHeading}`}>NO</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h3 className={`text-[10px] sm:text-sm font-bold flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>{task.title} {task.isLocked && <Lock className="w-3 h-3 text-red-500" />}</h3>
            <p className={`text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 ${t.textMuted} ${t.fontHeading}`}>{task.desc}</p>
          </div>
          {task.isLocked ? (
            <span className={`text-[8px] sm:text-[10px] font-bold px-2 py-1 uppercase bg-red-500/20 text-red-500 border border-red-500/50 ${t.fontHeading}`}>Locked Core</span>
          ) : (
            <span className={`text-[8px] sm:text-[10px] font-bold px-2 py-1 uppercase tracking-widest ${t.textMuted} opacity-50 group-hover:opacity-100 transition-opacity ${t.fontHeading}`}>Hold to Delete</span>
          )}
        </>
      )}
    </div>
  );
};

const RemovableShopItem = ({ item, t, onDelete }: any) => {
  const isLocked = item.isLocked || item.id === "s_streak_shield";
  const [showConfirm, setShowConfirm] = useState(false);
  const longPressEvent = useLongPress(() => {
    if (!isLocked) setShowConfirm(true);
  }, 800);

  return (
    <div {...(showConfirm || isLocked ? {} : longPressEvent)} className={`flex items-center justify-between p-3 sm:p-4 ${t.cardInner} relative overflow-hidden group mb-2 transition-all`}>
      {showConfirm ? (
        <div className="w-full flex items-center justify-between gap-3 animate-in fade-in zoom-in duration-200">
          <span className={`text-[10px] sm:text-sm font-black uppercase tracking-widest ${t.textWarning} ${t.fontHeading}`}>Delete this reward?</span>
          <div className="flex gap-2">
            <button onClick={() => !isLocked && onDelete(item.id)} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all active:scale-95 ${t.fontHeading}`}>YES</button>
            <button onClick={() => setShowConfirm(false)} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${t.btnWarning} ${t.fontHeading}`}>NO</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className={`text-xl sm:text-2xl p-1.5 rounded-lg ${t.card}`}>{item.icon}</span>
            <div>
              <h3 className={`text-[10px] sm:text-sm font-bold flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                {item.name} {isLocked && <Lock className="w-3 h-3 text-red-500" />}
              </h3>
              <p className={`text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 ${t.textMuted} ${t.fontHeading}`}>{item.cost}⭐ • Exp: {item.expiryHours}h</p>
            </div>
          </div>
          {isLocked ? (
            <span className={`text-[8px] sm:text-[10px] font-bold px-2 py-1 uppercase bg-red-500/20 text-red-500 border border-red-500/50 ${t.fontHeading}`}>Locked Core</span>
          ) : (
            <span className={`text-[8px] sm:text-[10px] font-bold px-2 py-1 uppercase tracking-widest ${t.textMuted} opacity-50 group-hover:opacity-100 transition-opacity ${t.fontHeading}`}>Hold to Delete</span>
          )}
        </>
      )}
    </div>
  );
};

const LongPressItem = ({ item, onDelete, children, duration = 800, t }: any) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const longPressEvent = useLongPress(() => { setShowConfirm(true); }, duration);

  return (
    <div {...longPressEvent} className="relative group cursor-pointer w-full h-full">
      {children}
      {showConfirm && (
        <div className={`absolute inset-0 p-4 flex flex-col items-center justify-center z-10 shadow-xl ${t.cardInner} border-2 border-red-500`}>
          <span className={`font-black uppercase text-[10px] mb-3 tracking-widest text-center ${t.textWarning}`}>Delete this item?</span>
          <div className="flex gap-2 sm:gap-4">
            <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); setShowConfirm(false); }} className={`px-4 sm:px-6 py-2 font-black uppercase tracking-widest bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors text-xs sm:text-base`}>Yes</button>
            <button onClick={(e) => { e.stopPropagation(); setShowConfirm(false); }} className={`px-4 sm:px-6 py-2 font-black uppercase tracking-widest ${t.btnWarning} transition-colors text-xs sm:text-base`}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [appMode, setAppMode] = useState<"habit" | "brain" | "krishna">("habit");
  const [user, setUser] = useState<any>(null);
  const [todayStr, setTodayStr] = useState(getRealTodayStr());
  const [toast, setToast] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ================= HABIT STATE =================
  const [habitRoute, setHabitRoute] = useState("hub");
  const [settingsRoute, setSettingsRoute] = useState("menu");
  
  // DUAL SAVE ENGINE: Initialize from LocalStorage
  const [trackerData, setTrackerData] = useState<any>(() => safeJsonParse<Record<string, any>>(localStorage.getItem('apex_tracker_v5'), {}));
  const [profile, setProfile] = useState<any>(() => {
    const local = safeJsonParse<Record<string, any>>(localStorage.getItem('apex_profile_v5'), {});
    const oldV4 = safeJsonParse<Record<string, any>>(localStorage.getItem('apexMindData_Final_V4'), {});

    return {
      name: local.name || oldV4.userName || "Prateek Maurya",
      stars: typeof local.stars === "number" ? local.stars : 0,
      streakShields: typeof local.streakShields === "number" ? local.streakShields : (typeof oldV4.streakShields === "number" ? oldV4.streakShields : 0),
      xp: typeof local.xp === "number" ? local.xp : 0,
      totalFocusMinutes: typeof local.totalFocusMinutes === "number" ? local.totalFocusMinutes : 0,
      geminiKey: local.geminiKey || oldV4.groqKey || "",
      inventory: Array.isArray(local.inventory) ? local.inventory : [],
      dp: local.dp || oldV4.profilePic || "",
      activeTheme: local.activeTheme || oldV4.activeTheme || "brutalist",
      customTasks: Array.isArray(local.customTasks) && local.customTasks.length > 0 ? local.customTasks : DEFAULT_TASKS,
      customShopItems: ensureShopItems(local.customShopItems)
    };
  });

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [unlockedBlankDate, setUnlockedBlankDate] = useState<any>(null);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [reasonInput, setReasonInput] = useState("");
  const [summaryInput, setSummaryInput] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newShopName, setNewShopName] = useState("");
  const [newShopDesc, setNewShopDesc] = useState("");
  const [newShopCost, setNewShopCost] = useState("");
  const [newShopExpiry, setNewShopExpiry] = useState("");
  const [newShopIcon, setNewShopIcon] = useState("");

  const [exportStartDate, setExportStartDate] = useState(todayStr);
  const [exportEndDate, setExportEndDate] = useState(todayStr);
  const [copySuccess, setCopySuccess] = useState(false);

  const [chatMessages, setChatMessages] = useState<any[]>([{ role: "ai", text: "I am your Habit Tracker Coach. What's on your mind today?" }]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  // ================= BRAIN STATE =================
  const [brainTab, setBrainTab] = useState("dashboard");
  const [brain, setBrain] = useState<any>(() => {
    const local = safeJsonParse<Record<string, any>>(localStorage.getItem('apex_brain_v5'), {});
    const oldV4 = safeJsonParse<Record<string, any>>(localStorage.getItem('apexMindData_Final_V4'), {});

    // Agar naye (V5) app mein data hai, toh usko use karo
    if (local && Object.keys(local).length > 0) {
      return {
        syllabusCategories: ["Raw Backlog"], stagingTopics: [], studyTopics: [], masteredTopics: [],
        wisdomCategories: ["Quick Thoughts"], wisdomNotes: [], vaultNotes: [], vaultCategories: ["Others"],
        globalDeadlineDays: 30, customMissions: [], scheduledEvents: [], lastActiveDate: getRealTodayStr(),
        ...local
      };
    }

    // Warna, purane (V4) app se poora Second Brain migrate kar lo
    return {
      syllabusCategories: oldV4.syllabusCategories || ["Raw Backlog"],
      stagingTopics: oldV4.stagingTopics || [],
      studyTopics: oldV4.studyTopics || [],
      masteredTopics: oldV4.masteredTopics || [],
      wisdomCategories: oldV4.wisdomCategories || ["Quick Thoughts"],
      wisdomNotes: oldV4.wisdomNotes || [],
      vaultNotes: oldV4.vaultNotes || [],
      vaultCategories: oldV4.vaultCategories || ["Others"],
      globalDeadlineDays: oldV4.globalDeadlineDays || 30,
      customMissions: oldV4.customMissions || [],
      scheduledEvents: oldV4.scheduledEvents || [],
      lastActiveDate: oldV4.lastActiveDate || getRealTodayStr()
    };
  });

  // ================= SCHEDULED EVENTS & CLASSES STATE =================
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleEventTitle, setScheduleEventTitle] = useState("");
  const [scheduleEventDate, setScheduleEventDate] = useState(() => addDays(getRealTodayStr(), 1));
  const [scheduleEventTime, setScheduleEventTime] = useState("10:00 AM");
  const [scheduleEventCategory, setScheduleEventCategory] = useState<EventCategory>("class");
  const [scheduleEventNotes, setScheduleEventNotes] = useState("");
  const [scheduleFilter, setScheduleFilter] = useState<string>("all");
  const [notificationStatus, setNotificationStatus] = useState<string>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });

  const [newSyllabusCat, setNewSyllabusCat] = useState("");
  const [selectedSyllabusCat, setSelectedSyllabusCat] = useState("Raw Backlog");
  const [newTopic, setNewTopic] = useState("");
  const [newWisdomCat, setNewWisdomCat] = useState("");
  const [selectedWisdomCat, setSelectedWisdomCat] = useState("Quick Thoughts");
  const [newWisdom, setNewWisdom] = useState("");
  const [newNote, setNewNote] = useState("");
  const [expandedWisdomCategory, setExpandedWisdomCategory] = useState<any>(null);
  const [expandedVaultCategory, setExpandedVaultCategory] = useState<any>(null);
  const [isVaultSorting, setIsVaultSorting] = useState(false);
  const [urgeTimer, setUrgeTimer] = useState<any>(null);
  const [isUrgeActive, setIsUrgeActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [urgeQuotes, setUrgeQuotes] = useState<any[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [oracleQuery, setOracleQuery] = useState("");
  const [oracleResponse, setOracleResponse] = useState("");
  const [isOracleThinking, setIsOracleThinking] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isNightShiftOpen, setIsNightShiftOpen] = useState(false);
  const [newCustomMission, setNewCustomMission] = useState("");
  const [isRealNightTime, setIsRealNightTime] = useState(new Date().getHours() >= 21 || new Date().getHours() < 4);
  const isNightTime = isRealNightTime;

  // ================= FOCUS ENGINE STATE =================
  const [focusState, setFocusState] = useState<{
    isOpen: boolean;
    mode: "pomodoro" | "deepflow" | "timer" | "stopwatch";
    durationMinutes: number;
    customTimerMinutes: number;
    secondsLeft: number;
    isRunning: boolean;
    isBreak: boolean;
    taskId: string | null;
    taskTitle: string | null;
    topicId: string | null;
    totalFocusedSeconds: number;
  }>({
    isOpen: false,
    mode: "pomodoro",
    durationMinutes: 25,
    customTimerMinutes: 10,
    secondsLeft: 25 * 60,
    isRunning: false,
    isBreak: false,
    taskId: null,
    taskTitle: null,
    topicId: null,
    totalFocusedSeconds: 0,
  });

  // ================= TWO-BOX REFLECTION & 9-10 PM CLEANUP STATE =================
  const [isTwoBoxModalOpen, setIsTwoBoxModalOpen] = useState(false);
  const [box1Input, setBox1Input] = useState("");
  const [box2Input, setBox2Input] = useState("");
  const [twoBoxRating, setTwoBoxRating] = useState(5);
  const [twoBoxActiveTab, setTwoBoxActiveTab] = useState<"boxes" | "cleanup" | "trophy">("boxes");
  const [showTwoBoxGuide, setShowTwoBoxGuide] = useState(false);

  // ================= WEEKLY AI PERFORMANCE REVIEW STATE =================
  const [isWeeklyReviewOpen, setIsWeeklyReviewOpen] = useState(false);
  const [weeklyReviewText, setWeeklyReviewText] = useState("");
  const [isGeneratingWeeklyReview, setIsGeneratingWeeklyReview] = useState(false);

  // ================= RPG RANK PROGRESSION & ROADMAP STATE =================
  const [isRankRoadmapOpen, setIsRankRoadmapOpen] = useState(false);
  const [rankTransitionModal, setRankTransitionModal] = useState<RankTransitionModalState | null>(null);

  // ================= ADVANCED ANALYTICS STATE =================
  const [analyticsTab, setAnalyticsTab] = useState<"heatmap" | "focus" | "habits" | "economy">("heatmap");
  const [hoveredHeatmapDay, setHoveredHeatmapDay] = useState<any | null>(null);

  // ================= 1v1 PVP BATTLE ARENA & MASCOT ENGINE STATE =================
  const [isBattleArenaOpen, setIsBattleArenaOpen] = useState(false);
  const [activeBattleRoom, setActiveBattleRoom] = useState<BattleRoom | null>(() => {
    return safeJsonParse<BattleRoom | null>(localStorage.getItem('apex_battle_room_v5'), null);
  });
  const [battleRoomCodeInput, setBattleRoomCodeInput] = useState("");
  const [battleFormat, setBattleFormat] = useState<"blitz" | "siege" | "duel">("blitz");
  const [battleStakesInput, setBattleStakesInput] = useState("50 Pushups Forfeit");
  const [battleDurationMinutes, setBattleDurationMinutes] = useState(25);
  const [battleTab, setBattleTab] = useState<"arena" | "create" | "join" | "history">("arena");
  const [isCreatingBattle, setIsCreatingBattle] = useState(false);
  const [isJoiningBattle, setIsJoiningBattle] = useState(false);
  const [battleConnectionStatus, setBattleConnectionStatus] = useState<"disconnected" | "hosting" | "connecting" | "connected">("disconnected");
  const [combatVFXList, setCombatVFXList] = useState<Array<{ id: string; text: string; type: "damage" | "crit" | "shield" | "taunt"; timestamp: number }>>([]);
  const [activeTauntBanner, setActiveTauntBanner] = useState<{ sender: string; message: string } | null>(null);
  const battlePeerRef = useRef<Peer | null>(null);
  const battleConnRef = useRef<any>(null);
  const battleBroadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const battleRoomRef = useRef<BattleRoom | null>(null);

  // ================= KRISHNA STATE =================
  const [krishnaState, setKrishnaState] = useState<KrishnaState>(() =>
    safeJsonParse<KrishnaState>(localStorage.getItem('apex_krishna_v5'), {
      conversations: [],
      activeConversationId: null
    })
  );
  const [isConvDrawerOpen, setIsConvDrawerOpen] = useState(false);
  const [krishnaInput, setKrishnaInput] = useState("");
  const [isKrishnaTyping, setIsKrishnaTyping] = useState(false);
  const [editingConvId, setEditingConvId] = useState<string | null>(null);
  const [editTitleText, setEditTitleText] = useState("");
  const [isKrishnaVoiceListening, setIsKrishnaVoiceListening] = useState(false);
  const krishnaChatEndRef = useRef<HTMLDivElement | null>(null);
  const lastFocusTickRef = useRef<number>(Date.now());
  const isHydratedRef = useRef<boolean>(false);
  const activeKrishnaRecognitionRef = useRef<any>(null);

  const t = (THEMES as any)[profile.activeTheme] || THEMES.brutalist;

  // Sync Two-Box rating with selected date
  useEffect(() => {
    const tb = trackerData[selectedDate]?.twoBox;
    if (tb && typeof tb.rating === "number") {
      setTwoBoxRating(tb.rating);
    } else {
      setTwoBoxRating(5);
    }
  }, [selectedDate, trackerData]);

  // Cleanup speech recognition on app mode change
  useEffect(() => {
    return () => {
      if (activeKrishnaRecognitionRef.current) {
        try {
          activeKrishnaRecognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
        activeKrishnaRecognitionRef.current = null;
      }
    };
  }, [appMode]);

  // ==========================================
  // INITIALIZATION & SYNC
  // ==========================================
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) { await signInWithCustomToken(auth, __initial_auth_token); }
        else { await signInAnonymously(auth); }
      } catch (err) {
        console.error("Auth Error:", err);
        setErrorMsg("Firebase Setup Needed: Enable Anonymous Sign-in.");
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      // Offline fallback: mark as hydrated after initial local storage load
      isHydratedRef.current = true;
      return;
    }

    const trackerRef = collection(db, "artifacts", appId, "users", user.uid, "tracker_data");
    const unsubsTracker = onSnapshot(trackerRef, (snapshot) => {
      isHydratedRef.current = true;
      setTrackerData((prev: any) => {
        const dataMap = { ...prev };
        let changed = false;
        snapshot.forEach((docSnap: any) => {
          if (!dataMap[docSnap.id] || JSON.stringify(dataMap[docSnap.id]) !== JSON.stringify(docSnap.data())) {
            dataMap[docSnap.id] = docSnap.data();
            changed = true;
          }
        });
        if (changed) {
          try {
            localStorage.setItem('apex_tracker_v5', JSON.stringify(dataMap));
          } catch (e) {
            console.warn("Storage write error:", e);
          }
          return dataMap;
        }
        return prev;
      });
    });

    const profileRef = doc(db, "artifacts", appId, "users", user.uid, "rpg_profile", "data");
    const unsubsProfile = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (!data.customTasks || data.customTasks.length === 0) data.customTasks = DEFAULT_TASKS;
        data.customShopItems = ensureShopItems(data.customShopItems);
        setProfile((prev: any) => {
          const merged = { ...prev, ...data };
          try {
            localStorage.setItem('apex_profile_v5', JSON.stringify(merged));
          } catch (e) {
            console.warn("Storage write error:", e);
          }
          return merged;
        });
      } else {
        setProfile((currentProfile: any) => {
          setDoc(profileRef, currentProfile);
          return currentProfile;
        });
      }
    });

    const brainRef = doc(db, "artifacts", appId, "users", user.uid, "second_brain", "data");
    const unsubsBrain = onSnapshot(brainRef, (docSnap) => {
      if (docSnap.exists()) {
        setBrain((prev: any) => {
          const merged = { ...prev, ...docSnap.data() };
          try {
            localStorage.setItem('apex_brain_v5', JSON.stringify(merged));
          } catch (e) {
            console.warn("Storage write error:", e);
          }
          return merged;
        });
      } else {
        setBrain((currentBrain: any) => {
          setDoc(brainRef, currentBrain);
          return currentBrain;
        });
      }
    });

    const krishnaRef = doc(db, "artifacts", appId, "users", user.uid, "my_krishna", "data");
    const unsubsKrishna = onSnapshot(krishnaRef, (docSnap) => {
      if (docSnap.exists()) {
        setKrishnaState((prev) => {
          const merged = { ...prev, ...docSnap.data() } as KrishnaState;
          try {
            localStorage.setItem('apex_krishna_v5', JSON.stringify(merged));
          } catch (e) {
            console.warn("Storage write error:", e);
          }
          return merged;
        });
      } else {
        setKrishnaState((currentKrishna) => {
          setDoc(krishnaRef, currentKrishna);
          return currentKrishna;
        });
      }
    });

    return () => { unsubsTracker(); unsubsProfile(); unsubsBrain(); unsubsKrishna(); };
  }, [user]);

  // Night Shift Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      setIsRealNightTime(hour >= 21 || hour < 4);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update Brain Global Date Logic
  useEffect(() => {
    if (brain.lastActiveDate !== todayStr) {
      const partsOld = brain.lastActiveDate.split('-');
      const partsNow = todayStr.split('-');
      const dOld = new Date(parseInt(partsOld[0]), parseInt(partsOld[1]) - 1, parseInt(partsOld[2]));
      const dNow = new Date(parseInt(partsNow[0]), parseInt(partsNow[1]) - 1, parseInt(partsNow[2]));
      const diffDays = Math.floor((dNow.getTime() - dOld.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        updateBrainFirebase({
          globalDeadlineDays: Math.max(1, brain.globalDeadlineDays - diffDays),
          lastActiveDate: todayStr
        });
      }
    }
  }, [brain.lastActiveDate, todayStr]);

  // ==========================================
  // 📱 REAL MOBILE HEADS-UP NOTIFICATION ENGINE
  // ==========================================
  const toastTimerRef = useRef<any>(null);
  const showMessage = (msg: string) => {
    setToast(msg);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(35);
      } catch (e) {}
    }
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3500);
  };

  const parseToastDetails = (rawMsg: string) => {
    if (!rawMsg) return { icon: "⚡", title: "System Alert", body: "", category: "System", type: "info" };

    const msg = String(rawMsg).trim();

    // Extract leading emoji if any
    const emojiRegex = /^(\p{Extended_Pictographic}+|\p{Emoji_Presentation}+|\p{Emoji}️+)/u;
    const match = msg.match(emojiRegex);
    let icon = match ? match[0] : "";
    let cleanText = match ? msg.replace(emojiRegex, "").trim() : msg;

    let category = appMode === "habit" ? "Habit OS" : appMode === "krishna" ? "My Krishna" : "Second Brain";
    let title = "Notification";
    let type: "xp" | "shield" | "success" | "warning" | "schedule" | "info" = "info";

    if (msg.includes("XP") || msg.includes("Star") || msg.includes("PERFECT DAY") || msg.includes("Victory") || msg.includes("Tier")) {
      category = "Level Progression";
      title = msg.includes("PERFECT DAY") ? "Perfect Day Cleared!" : "Reward Unlocked!";
      if (!icon) icon = "⭐";
      type = "xp";
    } else if (msg.includes("Shield") || msg.includes("shield")) {
      category = "Streak Shield";
      title = msg.includes("Refund") ? "Shield Refunded!" : msg.includes("Used") || msg.includes("used") || msg.includes("auto-protected") ? "Shield Activated!" : "Streak Protected";
      if (!icon) icon = "🛡️";
      type = "shield";
    } else if (msg.includes("Scheduled") || msg.includes("Class") || msg.includes("Meeting") || msg.includes("📅")) {
      category = "Schedule Dispatcher";
      title = "Calendar Event";
      if (!icon) icon = "📅";
      type = "schedule";
    } else if (msg.includes("Cleaned") || msg.includes("Cleanup") || msg.includes("Two-Box") || msg.includes("Box 1") || msg.includes("Box 2")) {
      category = "Habit Cleanup";
      title = "Two-Box System";
      if (!icon) icon = "🧹";
      type = "success";
    } else if (msg.includes("Focus") || msg.includes("Timer") || msg.includes("Break")) {
      category = "Focus Chamber";
      title = "Focus Session";
      if (!icon) icon = "⚡";
      type = "success";
    } else if (msg.includes("⚠️") || msg.includes("❌") || msg.includes("penalty") || msg.includes("Penalty") || msg.includes("FAILED") || msg.includes("denied")) {
      category = "System Warning";
      title = "Attention Required";
      if (!icon) icon = "⚠️";
      type = "warning";
    } else if (msg.includes("Copied") || msg.includes("Saved") || msg.includes("Updated") || msg.includes("Added") || msg.includes("Complete") || msg.includes("Activated")) {
      category = "Action Complete";
      title = "Success";
      if (!icon) icon = "✅";
      type = "success";
    } else if (msg.includes("Tap back again")) {
      category = "Navigation";
      title = "Exit App";
      if (!icon) icon = "📱";
      type = "info";
    } else {
      if (!icon) icon = "🔔";
      title = "Notice";
    }

    // Clean up text if it starts with extra punctuation
    cleanText = cleanText.replace(/^[:\-–—\s]+/, "");
    const body = cleanText || msg;

    return { icon, title, body, category, type };
  };

  // ==========================================
  // 📱 MOBILE & BROWSER HARDWARE BACK NAVIGATION ENGINE
  // ==========================================
  const lastBackPressTimeRef = useRef<number>(0);
  const isNavigatingBackRef = useRef<boolean>(false);

  const currentViewRef = useRef({
    appMode,
    habitRoute,
    settingsRoute,
    brainTab,
    isScheduleModalOpen,
    isRankRoadmapOpen,
    rankTransitionModal,
    isTwoBoxModalOpen,
    isWeeklyReviewOpen,
    isNightShiftOpen,
    isBattleArenaOpen,
    isFocusOpen: focusState.isOpen,
    isConvDrawerOpen,
    activeConversationId: krishnaState.activeConversationId,
    expandedWisdomCategory,
    expandedVaultCategory,
  });

  useEffect(() => {
    currentViewRef.current = {
      appMode,
      habitRoute,
      settingsRoute,
      brainTab,
      isScheduleModalOpen,
      isRankRoadmapOpen,
      rankTransitionModal,
      isTwoBoxModalOpen,
      isWeeklyReviewOpen,
      isNightShiftOpen,
      isBattleArenaOpen,
      isFocusOpen: focusState.isOpen,
      isConvDrawerOpen,
      activeConversationId: krishnaState.activeConversationId,
      expandedWisdomCategory,
      expandedVaultCategory,
    };
  });

  const getNavSignature = () => {
    const v = currentViewRef.current;
    const parts: string[] = [];
    if (v.appMode !== "habit") parts.push(`mode:${v.appMode}`);
    if (v.habitRoute !== "hub") parts.push(`habit:${v.habitRoute}`);
    if (v.settingsRoute !== "menu") parts.push(`settings:${v.settingsRoute}`);
    if (v.brainTab !== "dashboard") parts.push(`brain:${v.brainTab}`);
    if (v.isBattleArenaOpen) parts.push("modal:battleArena");
    if (v.isScheduleModalOpen) parts.push("modal:schedule");
    if (v.isRankRoadmapOpen) parts.push("modal:rank");
    if (v.rankTransitionModal) parts.push("modal:rankTransition");
    if (v.isTwoBoxModalOpen) parts.push("modal:twoBox");
    if (v.isWeeklyReviewOpen) parts.push("modal:weeklyReview");
    if (v.isNightShiftOpen) parts.push("modal:nightShift");
    if (v.isFocusOpen) parts.push("modal:focus");
    if (v.isConvDrawerOpen) parts.push("drawer:conv");
    if (v.activeConversationId) parts.push(`conv:${v.activeConversationId}`);
    if (v.expandedWisdomCategory) parts.push(`wisdom:${v.expandedWisdomCategory}`);
    if (v.expandedVaultCategory) parts.push(`vault:${v.expandedVaultCategory}`);
    return parts.join("|");
  };

  const lastNavSigRef = useRef<string>("");

  useEffect(() => {
    const sig = getNavSignature();
    if (isNavigatingBackRef.current) {
      isNavigatingBackRef.current = false;
      lastNavSigRef.current = sig;
      return;
    }

    if (sig !== lastNavSigRef.current) {
      if (sig.length > 0) {
        try {
          window.history.pushState({ appNav: true, sig }, "");
        } catch (e) {
          console.warn("history pushState error:", e);
        }
      }
      lastNavSigRef.current = sig;
    }
  }, [
    appMode,
    habitRoute,
    settingsRoute,
    brainTab,
    isBattleArenaOpen,
    isScheduleModalOpen,
    isRankRoadmapOpen,
    rankTransitionModal,
    isTwoBoxModalOpen,
    isWeeklyReviewOpen,
    isNightShiftOpen,
    focusState.isOpen,
    isConvDrawerOpen,
    krishnaState.activeConversationId,
    expandedWisdomCategory,
    expandedVaultCategory,
  ]);

  useEffect(() => {
    const handlePopState = () => {
      const v = currentViewRef.current;
      isNavigatingBackRef.current = true;

      // 1. Modals & Overlays (Top-most priority)
      if (v.isBattleArenaOpen) {
        setIsBattleArenaOpen(false);
        return;
      }
      if (v.isScheduleModalOpen) {
        setIsScheduleModalOpen(false);
        return;
      }
      if (v.isRankRoadmapOpen) {
        setIsRankRoadmapOpen(false);
        return;
      }
      if (v.rankTransitionModal) {
        setRankTransitionModal(null);
        return;
      }
      if (v.isTwoBoxModalOpen) {
        setIsTwoBoxModalOpen(false);
        return;
      }
      if (v.isWeeklyReviewOpen) {
        setIsWeeklyReviewOpen(false);
        return;
      }
      if (v.isNightShiftOpen) {
        setIsNightShiftOpen(false);
        return;
      }
      if (v.isFocusOpen) {
        setFocusState((prev) => ({ ...prev, isOpen: false, isRunning: false }));
        return;
      }
      if (v.isConvDrawerOpen) {
        setIsConvDrawerOpen(false);
        return;
      }

      // 2. Expanded Category Sheets & Active Conversations
      if (v.expandedWisdomCategory) {
        setExpandedWisdomCategory(null);
        return;
      }
      if (v.expandedVaultCategory) {
        setExpandedVaultCategory(null);
        return;
      }
      if (v.activeConversationId) {
        setKrishnaState((prev) => ({ ...prev, activeConversationId: null }));
        return;
      }

      // 3. Settings Sub-Menu Navigation
      if (v.habitRoute === "settings" && v.settingsRoute !== "menu") {
        setSettingsRoute("menu");
        return;
      }

      // 4. Habit OS Sub-Routes (Arena, Tracker, Shop, Settings, Analysis, Plan)
      if (v.appMode === "habit" && v.habitRoute !== "hub") {
        setHabitRoute("hub");
        return;
      }

      // 5. Second Brain Sub-Routes (Queue/Study, History, Wisdom, Vault, Urge)
      if (v.appMode === "brain" && v.brainTab !== "dashboard") {
        setBrainTab("dashboard");
        return;
      }

      // 6. Non-Habit Modes (Second Brain, My Krishna)
      if (v.appMode !== "habit") {
        setAppMode("habit");
        setHabitRoute("hub");
        return;
      }

      // 7. Root Screen (Habit OS Hub) - Double tap back to exit prevention
      const now = Date.now();
      if (now - lastBackPressTimeRef.current < 2000) {
        try {
          window.history.back();
        } catch (e) {}
      } else {
        lastBackPressTimeRef.current = now;
        showMessage("Tap back again to exit Second Brain");
        try {
          window.history.pushState({ rootGuard: true }, "");
        } catch (e) {}
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // ==========================================
  // SMART PROACTIVE NOTIFICATION & SCHEDULE ENGINE
  // ==========================================
  const NOTIFICATION_STORAGE_KEY = "apex_notifications_dispatched_v1";

  const getDispatchedNotifications = (): Record<string, number> => {
    try {
      const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const markNotificationDispatched = (key: string) => {
    try {
      const map = getDispatchedNotifications();
      map[key] = Date.now();
      // Keep only records within 7 days to maintain lightweight localStorage
      const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const cleaned: Record<string, number> = {};
      Object.entries(map).forEach(([k, timestamp]) => {
        if (timestamp > cutoff) cleaned[k] = timestamp;
      });
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(cleaned));
    } catch (e) {
      console.warn("Storage write error for notification tracking:", e);
    }
  };

  const isNotificationDispatched = (key: string): boolean => {
    const map = getDispatchedNotifications();
    return !!map[key];
  };

  const sendSmartPushNotification = (
    key: string,
    title: string,
    body: string,
    options?: { showToast?: boolean; tag?: string }
  ) => {
    if (isNotificationDispatched(key)) return false;

    // 1. Browser Web Notification API
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(title, {
          body,
          icon: "./favicon.png",
          badge: "./favicon.png",
          tag: options?.tag || key,
        });
      } catch (e) {
        console.warn("Web Notification dispatch issue:", e);
      }
    }

    // 2. In-App Interactive Toast if enabled
    if (options?.showToast !== false) {
      showMessage(`${title}: ${body}`);
    }

    // 3. Mark dispatched in local storage
    markNotificationDispatched(key);
    return true;
  };

  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      showMessage("❌ Browser Notifications not supported on this device/browser.");
      return false;
    }
    try {
      const perm = await Notification.requestPermission();
      setNotificationStatus(perm);
      if (perm === "granted") {
        showMessage("🔔 Notifications Enabled! You will receive scheduled class & event alerts.");
        try {
          new Notification("🔔 Scheduled Event Alerts Active", {
            body: "You'll now receive timely notifications for your scheduled classes, meetings, and events!",
            icon: "./favicon.png",
          });
        } catch (e) {
          console.warn("Test notification failed:", e);
        }
        return true;
      } else {
        showMessage("⚠️ Notification permission was denied in browser settings.");
        return false;
      }
    } catch (err) {
      console.error("Notification permission error:", err);
      return false;
    }
  };

  const checkAndDispatchSmartNotifications = () => {
    const userName = profile?.name ? profile.name.trim().split(" ")[0] : "Prateek";

    // Scheduled Classes & Meetings on Target Date
    const todayClasses: ScheduledEvent[] = (brain.scheduledEvents || []).filter(
      (ev: ScheduledEvent) => ev.date === todayStr && !ev.completed
    );

    todayClasses.forEach((ev) => {
      const classKey = `${todayStr}_scheduled_event_${ev.id}`;
      sendSmartPushNotification(
        classKey,
        `🔔 Today's ${ev.category.toUpperCase()}: ${ev.title}`,
        `${userName}, today is your "${ev.title}"${ev.time ? ` at ${ev.time}` : ""}. Don't forget it!`
      );
    });
  };

  const addScheduledEvent = (
    title: string,
    date: string,
    time: string,
    category: EventCategory,
    notes: string
  ) => {
    if (!title.trim()) {
      showMessage("Please enter an event or class name!");
      return;
    }
    if (!date) {
      showMessage("Please select a valid date!");
      return;
    }

    const newEv: ScheduledEvent = {
      id: `ev_${Date.now()}`,
      title: title.trim(),
      date,
      time: time.trim() || undefined,
      category,
      notes: notes.trim() || undefined,
      completed: false,
      notified: false,
      createdAt: getRealTodayStr(),
    };

    const currentList: ScheduledEvent[] = brain.scheduledEvents || [];
    const updated = [...currentList, newEv];
    updateBrainFirebase({ scheduledEvents: updated });
    showMessage(`📅 Scheduled: "${title.trim()}" on ${date}!`);
    setScheduleEventTitle("");
    setScheduleEventNotes("");

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      requestNotificationPermission();
    }
  };

  const deleteScheduledEvent = (id: string) => {
    const currentList: ScheduledEvent[] = brain.scheduledEvents || [];
    const updated = currentList.filter((e: ScheduledEvent) => e.id !== id);
    updateBrainFirebase({ scheduledEvents: updated });
    showMessage("🗑️ Scheduled event removed.");
  };

  const toggleCompleteScheduledEvent = (id: string) => {
    const currentList: ScheduledEvent[] = brain.scheduledEvents || [];
    const updated = currentList.map((e: ScheduledEvent) => {
      if (e.id === id) {
        const nextState = !e.completed;
        if (nextState) {
          triggerCrossReward(2, `Attended: ${e.title}!`);
        }
        return { ...e, completed: nextState };
      }
      return e;
    });
    updateBrainFirebase({ scheduledEvents: updated });
  };

  // Smart Proactive Notification Engine Runner (60-sec interval & visibility change)
  useEffect(() => {
    checkAndDispatchSmartNotifications();

    const interval = setInterval(() => {
      checkAndDispatchSmartNotifications();
      setIsRealNightTime(new Date().getHours() >= 21 || new Date().getHours() < 4);
    }, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAndDispatchSmartNotifications();
        setIsRealNightTime(new Date().getHours() >= 21 || new Date().getHours() < 4);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [brain.scheduledEvents, brain.studyTopics, brain.customMissions, trackerData, profile, todayStr]);

  // ==========================================
  // DUAL SAVE WRAPPERS
  // ==========================================
  const updateProfileFirebase = async (updates: any) => {
    const oldRankData = getPlayerRankData(profile.stars, profile.xp);
    const newProfile = { ...profile, ...updates };
    const newRankData = getPlayerRankData(newProfile.stars, newProfile.xp);

    // Dynamic Rank Transition Check
    if (newRankData.currentRankIndex > oldRankData.currentRankIndex) {
      setRankTransitionModal({
        isOpen: true,
        type: "up",
        oldTier: oldRankData.currentRank.tier,
        newTier: newRankData.currentRank.tier,
        oldRank: oldRankData.currentRank,
        newRank: newRankData.currentRank,
      });
      playRankFanfare("up", newRankData.currentRank.tier);
    } else if (newRankData.currentRankIndex < oldRankData.currentRankIndex) {
      setRankTransitionModal({
        isOpen: true,
        type: "down",
        oldTier: oldRankData.currentRank.tier,
        newTier: newRankData.currentRank.tier,
        oldRank: oldRankData.currentRank,
        newRank: newRankData.currentRank,
      });
      playRankFanfare("down", newRankData.currentRank.tier);
    }

    setProfile(newProfile);
    try {
      localStorage.setItem('apex_profile_v5', JSON.stringify(newProfile));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
    if (user && db) { await setDoc(doc(db, "artifacts", appId, "users", user.uid, "rpg_profile", "data"), newProfile, { merge: true }); }
  };

  const updateBrainFirebase = async (updates: any) => {
    const newBrain = { ...brain, ...updates };
    setBrain(newBrain);
    try {
      localStorage.setItem('apex_brain_v5', JSON.stringify(newBrain));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
    if (user && db) { await setDoc(doc(db, "artifacts", appId, "users", user.uid, "second_brain", "data"), newBrain, { merge: true }); }
  };

  const updateKrishnaFirebase = async (updates: Partial<KrishnaState>) => {
    const newKrishna = { ...krishnaState, ...updates };
    setKrishnaState(newKrishna);
    try {
      localStorage.setItem('apex_krishna_v5', JSON.stringify(newKrishna));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
    if (user && db) {
      await setDoc(doc(db, "artifacts", appId, "users", user.uid, "my_krishna", "data"), newKrishna, { merge: true });
    }
  };

  const updateTrackerFirebase = async (dateStr: string, updatedRecord: any) => {
    const existing = trackerData[dateStr] || {};
    const merged = { ...existing, ...updatedRecord };
    const newTrackerData = { ...trackerData, [dateStr]: merged };
    setTrackerData(newTrackerData);
    try {
      localStorage.setItem('apex_tracker_v5', JSON.stringify(newTrackerData));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
    if (user && db) {
      await setDoc(doc(db, "artifacts", appId, "users", user.uid, "tracker_data", dateStr), merged, { merge: true });
    }
  };

  const saveDayData = async (dateStr: string, tasks: any, reason?: string, summary?: string, star?: boolean, snapshot?: any, extraFlags?: any) => {
    const existing = trackerData[dateStr] || {};
    const updatedDay = {
      ...existing,
      tasks,
      reasonForO: reason !== undefined ? reason : (existing.reasonForO || ""),
      summary: summary !== undefined ? summary : (existing.summary || ""),
      star: star !== undefined ? !!star : !!existing.star,
      taskSnapshot: snapshot || existing.taskSnapshot || (profile.customTasks || DEFAULT_TASKS),
      ...(extraFlags || {})
    };
    const newTrackerData = { ...trackerData, [dateStr]: updatedDay };
    setTrackerData(newTrackerData);
    try {
      localStorage.setItem('apex_tracker_v5', JSON.stringify(newTrackerData));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
    if (user && db) await setDoc(doc(db, "artifacts", appId, "users", user.uid, "tracker_data", dateStr), updatedDay, { merge: true });
  };


  // ==========================================
  // HABIT FUNCTIONS
  // ==========================================
  useEffect(() => {
    const dayData = trackerData[selectedDate];
    setReasonInput(dayData?.reasonForO || "");
    setSummaryInput(dayData?.summary || "");
  }, [selectedDate, trackerData]);

  const handleImageUpload = (e: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image too large! Max 5MB allowed. 📸");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const size = 200;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            showMessage("Canvas context unavailable.");
            return;
          }
          let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;
          if (img.width > img.height) {
            sourceWidth = img.height;
            sourceX = (img.width - img.height) / 2;
          } else {
            sourceHeight = img.width;
            sourceY = (img.height - img.width) / 2;
          }
          ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, size, size);
          updateProfileFirebase({ dp: canvas.toDataURL("image/jpeg", 0.8) });
          showMessage("Profile Picture Updated! 📸");
        } catch (err) {
          console.error("Canvas processing error:", err);
          showMessage("Error processing image.");
        }
      };
      img.onerror = () => {
        showMessage("Failed to load image file.");
      };
      img.src = (event.target?.result as string) || "";
    };
    reader.onerror = () => {
      showMessage("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const checkPunishment = () => {
    const data1 = trackerData[addDays(todayStr, -1)];
    const data2 = trackerData[addDays(todayStr, -2)];
    const hasFail1 = data1 && Object.values(data1.tasks || {}).includes("O");
    const hasFail2 = data2 && Object.values(data2.tasks || {}).includes("O");
    return !!(hasFail1 && hasFail2);
  };
  const isPunished = checkPunishment();

  // ==========================================
  // ⚔️ 1v1 PVP DISCIPLINE BATTLE ARENA ENGINE (WEBRTC P2P + MULTIPLAYER SYNC)
  // ==========================================

  const PEER_STUN_CONFIG = {
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun.cloudflare.com:3478" },
      ],
    },
  };

  // Cross-Tab & Cross-Window Real-Time Broadcast Channel Listener
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const channel = new BroadcastChannel("apex_discipline_pvp_channel");
        battleBroadcastChannelRef.current = channel;
        channel.onmessage = (event) => {
          if (event.data?.type === "ROOM_SYNC" && event.data.room) {
            const incomingRoom = event.data.room as BattleRoom;
            if (activeBattleRoom && activeBattleRoom.roomCode === incomingRoom.roomCode) {
              setActiveBattleRoom(incomingRoom);
            }
          }
        };
      }
    } catch (e) {
      console.warn("BroadcastChannel not supported or error:", e);
    }
    return () => {
      try {
        if (battleBroadcastChannelRef.current) {
          battleBroadcastChannelRef.current.close();
        }
      } catch (e) {}
    };
  }, [activeBattleRoom?.roomCode]);

  // Master Synchronizer: Instantly persists to React State, LocalStorage, WebRTC Peer, and background Firestore
  const syncBattleRoomState = (updatedRoom: BattleRoom, broadcastToPeer: boolean = true) => {
    battleRoomRef.current = updatedRoom;
    setActiveBattleRoom(updatedRoom);
    try {
      localStorage.setItem('apex_battle_room_v5', JSON.stringify(updatedRoom));
      const roomsDbStr = localStorage.getItem('apex_all_battle_rooms') || '{}';
      const roomsDb = JSON.parse(roomsDbStr);
      roomsDb[updatedRoom.roomCode] = updatedRoom;
      localStorage.setItem('apex_all_battle_rooms', JSON.stringify(roomsDb));
    } catch (e) {
      console.warn("Local storage write error:", e);
    }

    if (battleBroadcastChannelRef.current) {
      try {
        battleBroadcastChannelRef.current.postMessage({ type: "ROOM_SYNC", room: updatedRoom });
      } catch (e) {}
    }

    if (broadcastToPeer && battleConnRef.current && battleConnRef.current.open) {
      try {
        battleConnRef.current.send({ type: "ROOM_STATE", room: updatedRoom });
      } catch (e) {
        console.warn("WebRTC Peer send error:", e);
      }
    }

    if (db && updatedRoom.roomCode) {
      try {
        const battleRef = doc(db, "artifacts", appId, "battle_rooms", updatedRoom.roomCode);
        setDoc(battleRef, updatedRoom, { merge: true }).catch((err) => {
          console.warn("Background Firestore sync warning:", err);
        });
      } catch (e) {
        console.warn("Firestore sync dispatch error:", e);
      }
    }
  };

  // Emit Floating Combat VFX Number
  const emitCombatVFX = (text: string, type: "damage" | "crit" | "shield" | "taunt") => {
    const id = `vfx_${Date.now()}_${Math.random()}`;
    setCombatVFXList((prev) => [...prev.slice(-4), { id, text, type, timestamp: Date.now() }]);
    setTimeout(() => {
      setCombatVFXList((prev) => prev.filter((item) => item.id !== id));
    }, 1400);
  };

  // Generate 6-Character Room Code (e.g. "WAR789")
  const generateBattleRoomCode = (): string => {
    const prefixes = ["WAR", "CLASH", "DUEL", "APEX", "PVP"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(100 + Math.random() * 900);
    return `${prefix}${num}`;
  };

  // Start Host WebRTC Peer (Listens for Challenger connection)
  const startHostPeer = (roomCode: string, initialRoom: BattleRoom) => {
    try {
      if (battlePeerRef.current) {
        battlePeerRef.current.destroy();
        battlePeerRef.current = null;
      }
    } catch (e) {}

    try {
      const peerId = `apex-war-room-${roomCode.toLowerCase()}`;
      const peer = new Peer(peerId, PEER_STUN_CONFIG);
      battlePeerRef.current = peer;

      peer.on("open", (id) => {
        console.log("Battle Arena Host Peer Online:", id);
        setBattleConnectionStatus("hosting");
      });

      peer.on("connection", (conn) => {
        console.log("Incoming challenger peer connection received!");
        battleConnRef.current = conn;

        conn.on("data", (data: any) => {
          if (!data || typeof data !== "object") return;

          if (data.type === "HELLO_JOIN") {
            const joiningPlayer = data.player as BattlePlayer;
            const current = battleRoomRef.current || initialRoom;

            // Already this same challenger — just re-send the authoritative room
            // (handles duplicate HELLO_JOIN retries without spamming the log)
            if (current.challenger && current.challenger.uid === joiningPlayer.uid) {
              conn.send({ type: "ROOM_STATE", room: current });
              setBattleConnectionStatus("connected");
              return;
            }

            // Room genuinely occupied by a DIFFERENT challenger
            if (current.challenger && current.challenger.uid !== joiningPlayer.uid && current.status === "active") {
              conn.send({ type: "ERROR", message: `Battle Room [${roomCode}] is already full with another challenger!` });
              return;
            }

            const joinLog: CombatLogItem = {
              id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              senderName: "SYSTEM",
              senderUid: "system",
              type: "system",
              message: `🔥 ${joiningPlayer.name} entered the arena! The War has begun!`,
              timestamp: Date.now(),
            };

            const updated: BattleRoom = {
              ...current,
              status: "active",
              challenger: joiningPlayer,
              combatLog: [...(current.combatLog || []), joinLog],
            };

            battleRoomRef.current = updated;
            syncBattleRoomState(updated, false);
            conn.send({ type: "ROOM_STATE", room: updated });
            setBattleConnectionStatus("connected");
            showMessage(`🔥 ${joiningPlayer.name} joined your Battle Arena!`);
          } else if (data.type === "ROOM_STATE" && data.room) {
            battleRoomRef.current = data.room;
            setActiveBattleRoom(data.room);
            syncBattleRoomState(data.room, false);
          } else if (data.type === "COMBAT_ACTION") {
            if (data.vfx) emitCombatVFX(data.vfx.text, data.vfx.type);
            if (data.room) {
              battleRoomRef.current = data.room;
              setActiveBattleRoom(data.room);
              syncBattleRoomState(data.room, false);
            }
          } else if (data.type === "TAUNT") {
            if (data.sender && data.message) {
              setActiveTauntBanner({ sender: data.sender, message: data.message });
              emitCombatVFX(`💬 ${data.message}`, "taunt");
            }
            if (data.room) {
              battleRoomRef.current = data.room;
              setActiveBattleRoom(data.room);
              syncBattleRoomState(data.room, false);
            }
          } else if (data.type === "FORFEIT") {
            if (data.room) {
              battleRoomRef.current = data.room;
              setActiveBattleRoom(data.room);
              syncBattleRoomState(data.room, false);
              showMessage("🏳️ Opponent surrendered the battle!");
            }
          }
        });

        conn.on("close", () => {
          console.log("Challenger data connection closed");
        });

        conn.on("error", (err) => {
          console.warn("Host conn error:", err);
        });
      });

      peer.on("error", (err: any) => {
        console.warn("Host PeerJS notification:", err);
      });
    } catch (err) {
      console.error("Host Peer init error:", err);
    }
  };

  // Start Challenger WebRTC Peer (Connects to Host Peer, retries until host acknowledges)
  const startChallengerPeer = (rawCode: string, challengerPlayer: BattlePlayer, timeoutMs = 12000) => {
    try {
      if (battlePeerRef.current) {
        battlePeerRef.current.destroy();
        battlePeerRef.current = null;
      }
    } catch (e) {}

    setIsJoiningBattle(true);
    setBattleConnectionStatus("connecting");

    let joined = false; // true only once host's room contains our challenger slot
    let helloRetryTimer: any = null;
    let cleanupDone = false;

    const cleanupAfterFailure = (msg: string) => {
      if (cleanupDone) return;
      cleanupDone = true;
      setIsJoiningBattle(false);
      setBattleConnectionStatus("disconnected");
      try {
        if (helloRetryTimer) clearInterval(helloRetryTimer);
      } catch (e) {}
      try {
        if (battleConnRef.current) battleConnRef.current.close();
        if (battlePeerRef.current) battlePeerRef.current.destroy();
      } catch (e) {}
      showMessage(msg);
    };

    const timeoutTimer = setTimeout(() => {
      if (!joined) {
        cleanupAfterFailure(
          `❌ Battle Room [${rawCode}] not found or Host is offline!\n\nEnsure your friend has generated the room and is waiting in the Arena.`
        );
      }
    }, timeoutMs);

    try {
      const peer = new Peer(PEER_STUN_CONFIG);
      battlePeerRef.current = peer;

      peer.on("open", (id) => {
        console.log("Challenger Peer Online:", id);
        const targetPeerId = `apex-war-room-${rawCode.toLowerCase()}`;
        const conn = peer.connect(targetPeerId, { reliable: true });
        battleConnRef.current = conn;

        const sendHelloJoin = () => {
          if (!joined && conn && conn.open) {
            try {
              conn.send({ type: "HELLO_JOIN", player: challengerPlayer });
            } catch (e) {
              console.warn("HELLO_JOIN send error:", e);
            }
          }
        };

        conn.on("open", () => {
          console.log("Connected to Host data channel!");
          sendHelloJoin();
          // Retry every 2s until the host acknowledges (self-heals a dropped message)
          if (helloRetryTimer) clearInterval(helloRetryTimer);
          helloRetryTimer = setInterval(sendHelloJoin, 2000);
        });

        conn.on("data", (data: any) => {
          if (!data || typeof data !== "object") return;

          if (data.type === "ROOM_STATE" && data.room) {
            const room = data.room as BattleRoom;
            // Only count as JOINED when the host's authoritative room includes OUR challenger slot
            joined = !!(room.challenger && room.challenger.uid === challengerPlayer.uid);
            clearTimeout(timeoutTimer);
            if (helloRetryTimer) clearInterval(helloRetryTimer);
            setIsJoiningBattle(false);
            battleRoomRef.current = room;
            setActiveBattleRoom(room);
            syncBattleRoomState(room, false);
            setBattleTab("arena");
            if (joined) {
              setBattleConnectionStatus("connected");
              showMessage(`⚔️ Successfully joined Battle Room [${rawCode}] against ${room.host.name}!`);
            } else {
              // Live host responded but hasn't assigned us yet (rare delay) — keep pill honest
              setBattleConnectionStatus("connecting");
            }
          } else if (data.type === "ERROR") {
            joined = false;
            clearTimeout(timeoutTimer);
            cleanupAfterFailure(`⚠️ ${data.message || "Could not join battle room"}`);
          } else if (data.type === "COMBAT_ACTION") {
            if (data.vfx) emitCombatVFX(data.vfx.text, data.vfx.type);
            if (data.room) {
              battleRoomRef.current = data.room;
              setActiveBattleRoom(data.room);
              syncBattleRoomState(data.room, false);
            }
          } else if (data.type === "TAUNT") {
            if (data.sender && data.message) {
              setActiveTauntBanner({ sender: data.sender, message: data.message });
              emitCombatVFX(`💬 ${data.message}`, "taunt");
            }
            if (data.room) {
              battleRoomRef.current = data.room;
              setActiveBattleRoom(data.room);
              syncBattleRoomState(data.room, false);
            }
          } else if (data.type === "FORFEIT") {
            if (data.room) {
              battleRoomRef.current = data.room;
              setActiveBattleRoom(data.room);
              syncBattleRoomState(data.room, false);
              showMessage("🏳️ Opponent surrendered the battle!");
            }
          }
        });

        conn.on("error", (err) => {
          console.warn("Challenger conn error:", err);
        });
      });

      peer.on("error", (err: any) => {
        console.warn("Challenger peer error:", err);
        if (err.type === "peer-unavailable") {
          clearTimeout(timeoutTimer);
          cleanupAfterFailure(`❌ Battle Room [${rawCode}] does not exist or Host is offline!`);
        }
      });
    } catch (err) {
      clearTimeout(timeoutTimer);
      cleanupAfterFailure(`❌ Error connecting to room [${rawCode}].`);
      console.error("Challenger Peer init error:", err);
    }
  };

  // Real-Time Battle Room Firestore Listener
  useEffect(() => {
    const battleCode = activeBattleRoom?.roomCode || profile?.activeBattleCode;
    if (!battleCode) return;

    try {
      const roomsDbStr = localStorage.getItem('apex_all_battle_rooms') || '{}';
      const roomsDb = JSON.parse(roomsDbStr);
      if (roomsDb[battleCode]) {
        setActiveBattleRoom(roomsDb[battleCode]);
      }
    } catch (e) {}

    if (!db) return;

    let unsubs: (() => void) | null = null;
    try {
      const battleRef = doc(db, "artifacts", appId, "battle_rooms", battleCode);
      unsubs = onSnapshot(battleRef, (docSnap) => {
        if (docSnap.exists()) {
          const roomData = docSnap.data() as BattleRoom;
          // WebRTC peer-to-peer is the authoritative source. Only apply the
          // Firestore echo when no live peer channel exists (offline / stale room).
          const peerLive = battleConnRef.current && battleConnRef.current.open;
          if (!peerLive) {
            battleRoomRef.current = roomData;
            setActiveBattleRoom(roomData);
          }
          try {
            localStorage.setItem('apex_battle_room_v5', JSON.stringify(roomData));
            const roomsDbStr = localStorage.getItem('apex_all_battle_rooms') || '{}';
            const roomsDb = JSON.parse(roomsDbStr);
            roomsDb[roomData.roomCode] = roomData;
            localStorage.setItem('apex_all_battle_rooms', JSON.stringify(roomsDb));
          } catch (e) {}

          const myUid = user?.uid || "local_player";
          const isHost = roomData.host?.uid === myUid;
          const opponent = isHost ? roomData.challenger : roomData.host;
          if (opponent?.lastAction && Date.now() - opponent.lastAction.timestamp < 3500) {
            if (opponent.lastAction.type === "taunt") {
              setActiveTauntBanner({ sender: opponent.name, message: opponent.lastAction.text });
            }
          }
        }
      }, (err) => {
        console.warn("Firestore snapshot error (resilient fallback):", err);
      });
    } catch (err) {
      console.warn("Firestore snapshot init warning:", err);
    }

    return () => {
      if (unsubs) unsubs();
    };
  }, [activeBattleRoom?.roomCode, profile?.activeBattleCode, db, user]);

  // Auto Reconnect WebRTC Peer on Session Launch
  useEffect(() => {
    if (!activeBattleRoom || activeBattleRoom.status === "completed") return;
    const myUid = user?.uid || "local_player";
    const isHost = activeBattleRoom.host?.uid === myUid;

    if (!battlePeerRef.current) {
      if (isHost) {
        startHostPeer(activeBattleRoom.roomCode, activeBattleRoom);
      } else if (activeBattleRoom.challenger?.uid === myUid) {
        startChallengerPeer(activeBattleRoom.roomCode, activeBattleRoom.challenger, 10000);
      }
    }
  }, [activeBattleRoom?.roomCode, activeBattleRoom?.status]);

  // Generate 1-Click Duel Invite URL
  const getBattleInviteLink = (room: BattleRoom): string => {
    try {
      const baseUrl = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "";
      const params = new URLSearchParams({
        battle: room.roomCode,
        host: room.host?.name || "Prateek",
        fmt: room.format || "blitz",
        stakes: room.stakes || "50 Pushups Forfeit",
      });
      return `${baseUrl}?${params.toString()}`;
    } catch (e) {
      return room.roomCode;
    }
  };

  // 1-Click Duel Invite Link auto-connector on startup
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const battleCode = (params.get("battle") || params.get("duel") || params.get("room") || "").trim().toUpperCase();
        if (battleCode) {
          handleJoinBattleRoom(battleCode);
          setIsBattleArenaOpen(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (e) {
      console.warn("URL battle param check error:", e);
    }
  }, []);

  // Create Battle Room (Instant WebRTC Host + Cloud Registry)
  const handleCreateBattleRoom = async () => {
    if (isCreatingBattle) return;
    setIsCreatingBattle(true);

    try {
      const roomCode = generateBattleRoomCode();
      const myUid = user?.uid || `player_${Date.now()}`;
      const myName = profile?.name ? profile.name.trim() : "Prateek";
      const targetDate = todayStr;
      const endDate = battleFormat === "siege" ? addDays(todayStr, 7) : todayStr;

      const hostPlayer: BattlePlayer = {
        uid: myUid,
        name: myName,
        avatar: "⚔️",
        hp: 1000,
        maxHp: 1000,
        tasksCompleted: 0,
        focusMinutes: 0,
        twoBoxCompleted: false,
        shieldsCount: profile?.streakShields || 0,
        lastAction: null,
        liveFocus: null,
      };

      const initialLog: CombatLogItem = {
        id: `log_${Date.now()}`,
        senderName: "SYSTEM",
        senderUid: "system",
        type: "system",
        message: `⚔️ Battle Room [${roomCode}] created by ${myName}! Format: ${battleFormat.toUpperCase()} | Stakes: "${battleStakesInput}"`,
        timestamp: Date.now(),
      };

      const newRoom: BattleRoom = {
        roomCode,
        createdAt: Date.now(),
        status: "waiting",
        format: battleFormat,
        targetDate,
        endDate,
        stakes: battleStakesInput || "50 Pushups Forfeit",
        duelDurationMinutes: battleDurationMinutes,
        host: hostPlayer,
        challenger: null,
        winnerUid: null,
        combatLog: [initialLog],
      };

      syncBattleRoomState(newRoom, false);
      startHostPeer(roomCode, newRoom);
      updateProfileFirebase({ activeBattleCode: roomCode });
      setBattleTab("arena");
      showMessage(`⚔️ Battle Room [${roomCode}] Created! Share code or invite link.`);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(roomCode).catch(() => {});
      }
    } catch (err) {
      console.error("Create battle room error:", err);
      showMessage("❌ An unexpected error occurred while creating the battle room.");
    } finally {
      setIsCreatingBattle(false);
    }
  };

  // Join Battle Room (True WebRTC Peer Connection - No Fake Rooms)
  const handleJoinBattleRoom = async (
    codeToJoin?: string,
    metadata?: { hostName?: string; fmt?: "blitz" | "siege" | "duel"; stakes?: string; duration?: number }
  ) => {
    const rawInput = (codeToJoin || battleRoomCodeInput).trim();
    if (!rawInput) {
      showMessage("⚠️ Please enter a valid Room Code or invite link.");
      return;
    }
    if (isJoiningBattle) return;

    try {
      let rawCode = rawInput.toUpperCase();

      // If user pasted a full URL or query params (e.g. ?battle=WAR789...)
      if (rawInput.includes("?") || rawInput.includes("http") || rawInput.includes("=")) {
        try {
          const urlObj = new URL(rawInput.startsWith("http") ? rawInput : `https://dummy.com/${rawInput.startsWith("?") ? rawInput : "?" + rawInput}`);
          const bCode = urlObj.searchParams.get("battle") || urlObj.searchParams.get("duel") || urlObj.searchParams.get("room");
          if (bCode) rawCode = bCode.trim().toUpperCase();
        } catch (e) {}
      }

      // Clean non-alphanumeric
      rawCode = rawCode.replace(/[^A-Z0-9]/g, "");
      if (!rawCode || rawCode.length < 3) {
        showMessage("⚠️ Please enter a valid Room Code (e.g. WAR789).");
        return;
      }

      const myUid = user?.uid || `player_${Date.now()}`;
      const myName = profile?.name ? profile.name.trim() : "Challenger";

      // If already host of this room
      if (activeBattleRoom && activeBattleRoom.roomCode === rawCode && activeBattleRoom.host.uid === myUid) {
        setBattleTab("arena");
        showMessage(`⚔️ You are already hosting Battle Room [${rawCode}]!`);
        return;
      }

      const challengerPlayer: BattlePlayer = {
        uid: myUid,
        name: myName,
        avatar: "🛡️",
        hp: 1000,
        maxHp: 1000,
        tasksCompleted: 0,
        focusMinutes: 0,
        twoBoxCompleted: false,
        shieldsCount: profile?.streakShields || 0,
        lastAction: null,
        liveFocus: null,
      };

      // Connect genuinely via WebRTC Peer
      startChallengerPeer(rawCode, challengerPlayer, 9000);
    } catch (err) {
      console.error("Join battle room error:", err);
      showMessage("❌ Error joining battle room. Please verify the code.");
      setIsJoiningBattle(false);
    }
  };

  // Leave or Surrender Battle Room
  const handleLeaveOrForfeitBattle = async () => {
    if (!activeBattleRoom) return;
    const confirm = window.confirm(
      `⚠️ FORFEIT / LEAVE BATTLE [${activeBattleRoom.roomCode}]?\n\nLeaving this active battle will forfeit the match and record a loss. Stakes: "${activeBattleRoom.stakes}"\n\nAre you sure you want to exit?`
    );
    if (!confirm) return;

    try {
      const myUid = user?.uid || "local_player";
      const isHost = activeBattleRoom.host.uid === myUid;
      const winnerUid = isHost ? activeBattleRoom.challenger?.uid || null : activeBattleRoom.host.uid;

      const forfeitLog: CombatLogItem = {
        id: `log_${Date.now()}`,
        senderName: "SYSTEM",
        senderUid: "system",
        type: "ko",
        message: `🏳️ ${isHost ? activeBattleRoom.host.name : (activeBattleRoom.challenger?.name || "Player")} surrendered the battle!`,
        timestamp: Date.now(),
      };

      const updatedRoom: BattleRoom = {
        ...activeBattleRoom,
        status: "completed",
        winnerUid,
        combatLog: [...(activeBattleRoom.combatLog || []), forfeitLog],
      };

      syncBattleRoomState(updatedRoom, true);

      updateProfileFirebase({
        activeBattleCode: "",
        battlesLost: (profile?.battlesLost || 0) + 1,
      });

      try {
        if (battleConnRef.current) battleConnRef.current.send({ type: "FORFEIT", room: updatedRoom });
        if (battleConnRef.current) battleConnRef.current.close();
        if (battlePeerRef.current) battlePeerRef.current.destroy();
      } catch (e) {}

      setActiveBattleRoom(null);
      localStorage.removeItem('apex_battle_room_v5');
      showMessage("🏳️ Battle forfeited. Better luck next time!");
    } catch (e) {
      console.error("Forfeit error:", e);
    }
  };

  // Dispatch In-Battle Taunt
  const handleSendBattleTaunt = async (tauntText: string) => {
    if (!activeBattleRoom) return;
    const myUid = user?.uid || "local_player";
    const myName = profile?.name ? profile.name.trim() : "Prateek";
    const isHost = activeBattleRoom.host.uid === myUid;

    const tauntAction = {
      type: "taunt" as const,
      text: tauntText,
      timestamp: Date.now(),
    };

    const newLog: CombatLogItem = {
      id: `log_${Date.now()}`,
      senderName: myName,
      senderUid: myUid,
      type: "taunt",
      message: `💬 "${tauntText}"`,
      timestamp: Date.now(),
    };

    const updatedRoom: BattleRoom = {
      ...activeBattleRoom,
      host: isHost ? { ...activeBattleRoom.host, lastAction: tauntAction } : activeBattleRoom.host,
      challenger: !isHost && activeBattleRoom.challenger ? { ...activeBattleRoom.challenger, lastAction: tauntAction } : activeBattleRoom.challenger,
      combatLog: [...(activeBattleRoom.combatLog || []).slice(-25), newLog],
    };

    syncBattleRoomState(updatedRoom, true);
    emitCombatVFX(`💬 ${tauntText}`, "taunt");
    if (battleConnRef.current && battleConnRef.current.open) {
      try {
        battleConnRef.current.send({ type: "TAUNT", sender: myName, message: tauntText, room: updatedRoom });
      } catch (e) {}
    }
  };

  // Apply Strike to Battle on Habit Check
  const applyBattleHabitStrike = (taskId: string, taskTitle: string) => {
    if (!activeBattleRoom || activeBattleRoom.status !== "active") return;
    const myUid = user?.uid || "local_player";
    const isHost = activeBattleRoom.host.uid === myUid;
    const myPlayer = isHost ? activeBattleRoom.host : activeBattleRoom.challenger;
    const oppPlayer = isHost ? activeBattleRoom.challenger : activeBattleRoom.host;

    if (!myPlayer || !oppPlayer) return;

    let damage = 100;
    let shieldAbsorbed = false;
    let newOppShields = oppPlayer.shieldsCount;

    if (oppPlayer.shieldsCount > 0) {
      newOppShields = Math.max(0, oppPlayer.shieldsCount - 1);
      damage = 0;
      shieldAbsorbed = true;
    }

    const newOppHp = Math.max(0, oppPlayer.hp - damage);
    const isKO = newOppHp <= 0;

    const myAction = {
      type: "attack" as const,
      text: `Habit Strike: ${taskTitle}`,
      amount: damage,
      timestamp: Date.now(),
    };

    const combatLogMsg = shieldAbsorbed
      ? `🛡️ ${myPlayer.name}'s strike on [${taskTitle}] was ABSORBED by ${oppPlayer.name}'s Streak Shield! (0 DMG)`
      : `⚡ ${myPlayer.name} completed [${taskTitle}]! Dealt 100 DMG to ${oppPlayer.name}! (${newOppHp}/1000 HP)`;

    const newLog: CombatLogItem = {
      id: `log_${Date.now()}`,
      senderName: myPlayer.name,
      senderUid: myUid,
      type: shieldAbsorbed ? "shield" : "attack",
      message: combatLogMsg,
      timestamp: Date.now(),
    };

    const updatedLog = [...(activeBattleRoom.combatLog || []).slice(-25), newLog];
    if (isKO) {
      updatedLog.push({
        id: `ko_${Date.now()}`,
        senderName: "SYSTEM",
        senderUid: "system",
        type: "ko",
        message: `👑 KNOCKOUT! ${myPlayer.name} has defeated ${oppPlayer.name} in discipline warfare!`,
        timestamp: Date.now(),
      });
    }

    const updatedHost: BattlePlayer = isHost
      ? { ...myPlayer, tasksCompleted: (myPlayer.tasksCompleted || 0) + 1, lastAction: myAction }
      : { ...oppPlayer, hp: newOppHp, shieldsCount: newOppShields };

    const updatedChallenger: BattlePlayer = !isHost
      ? { ...myPlayer, tasksCompleted: (myPlayer.tasksCompleted || 0) + 1, lastAction: myAction }
      : { ...oppPlayer, hp: newOppHp, shieldsCount: newOppShields };

    const updatedRoom: BattleRoom = {
      ...activeBattleRoom,
      host: updatedHost,
      challenger: updatedChallenger,
      status: isKO ? "completed" : "active",
      winnerUid: isKO ? myUid : null,
      combatLog: updatedLog,
    };

    syncBattleRoomState(updatedRoom, true);

    if (shieldAbsorbed) {
      emitCombatVFX("🛡️ SHIELD ABSORBED!", "shield");
    } else {
      emitCombatVFX("-100 HP!", "damage");
    }

    if (battleConnRef.current && battleConnRef.current.open) {
      try {
        battleConnRef.current.send({
          type: "COMBAT_ACTION",
          room: updatedRoom,
          vfx: {
            text: shieldAbsorbed ? "🛡️ SHIELD ABSORBED!" : "-100 HP!",
            type: shieldAbsorbed ? "shield" : "damage"
          }
        });
      } catch (e) {}
    }

    if (isKO) {
      updateProfileFirebase({
        battlesWon: (profile?.battlesWon || 0) + 1,
        xp: (profile?.xp || 0) + 100,
        stars: (profile?.stars || 0) + 5,
      });
      showMessage("👑 VICTORY IN DISCIPLINE BATTLE! 1000 HP KO ACHIEVED! +100 XP +5 Stars!");
    }
  };

  // Apply Critical Strike on Focus Chamber Finish
  const applyBattleFocusStrike = (durationMinutes: number) => {
    if (!activeBattleRoom || activeBattleRoom.status !== "active") return;
    const myUid = user?.uid || "local_player";
    const isHost = activeBattleRoom.host.uid === myUid;
    const myPlayer = isHost ? activeBattleRoom.host : activeBattleRoom.challenger;
    const oppPlayer = isHost ? activeBattleRoom.challenger : activeBattleRoom.host;

    if (!myPlayer || !oppPlayer) return;

    const damage = 250;
    const newOppHp = Math.max(0, oppPlayer.hp - damage);
    const isKO = newOppHp <= 0;

    const myAction = {
      type: "crit" as const,
      text: `${durationMinutes}m Deep Focus Surge`,
      amount: damage,
      timestamp: Date.now(),
    };

    const newLog: CombatLogItem = {
      id: `log_${Date.now()}`,
      senderName: myPlayer.name,
      senderUid: myUid,
      type: "crit",
      message: `💥 ${myPlayer.name} locked in for a ${durationMinutes}m Deep Focus Session! CRITICAL STRIKE: 250 DMG to ${oppPlayer.name}! (${newOppHp}/1000 HP)`,
      timestamp: Date.now(),
    };

    const updatedHost: BattlePlayer = isHost
      ? { ...myPlayer, focusMinutes: (myPlayer.focusMinutes || 0) + durationMinutes, lastAction: myAction }
      : { ...oppPlayer, hp: newOppHp };

    const updatedChallenger: BattlePlayer = !isHost
      ? { ...myPlayer, focusMinutes: (myPlayer.focusMinutes || 0) + durationMinutes, lastAction: myAction }
      : { ...oppPlayer, hp: newOppHp };

    const updatedRoom: BattleRoom = {
      ...activeBattleRoom,
      host: updatedHost,
      challenger: updatedChallenger,
      status: isKO ? "completed" : "active",
      winnerUid: isKO ? myUid : null,
      combatLog: [...(activeBattleRoom.combatLog || []).slice(-25), newLog],
    };

    syncBattleRoomState(updatedRoom, true);
    emitCombatVFX("💥 CRIT! 250 DMG", "crit");

    if (battleConnRef.current && battleConnRef.current.open) {
      try {
        battleConnRef.current.send({
          type: "COMBAT_ACTION",
          room: updatedRoom,
          vfx: { text: "💥 CRIT! 250 DMG", type: "crit" }
        });
      } catch (e) {}
    }

    if (isKO) {
      updateProfileFirebase({
        battlesWon: (profile?.battlesWon || 0) + 1,
        xp: (profile?.xp || 0) + 100,
        stars: (profile?.stars || 0) + 5,
      });
      showMessage("👑 VICTORY IN DISCIPLINE BATTLE! 1000 HP KO ACHIEVED! +100 XP +5 Stars!");
    }
  };

  // Apply Two-Box Daily Cleanup Finisher
  const applyBattleTwoBoxFinisher = () => {
    if (!activeBattleRoom || activeBattleRoom.status !== "active") return;
    const myUid = user?.uid || "local_player";
    const isHost = activeBattleRoom.host.uid === myUid;
    const myPlayer = isHost ? activeBattleRoom.host : activeBattleRoom.challenger;
    const oppPlayer = isHost ? activeBattleRoom.challenger : activeBattleRoom.host;

    if (!myPlayer || !oppPlayer) return;

    const damage = 300;
    const newOppHp = Math.max(0, oppPlayer.hp - damage);
    const isKO = newOppHp <= 0;

    const myAction = {
      type: "crit" as const,
      text: "Two-Box Night Cleanup Protocol",
      amount: damage,
      timestamp: Date.now(),
    };

    const newLog: CombatLogItem = {
      id: `log_${Date.now()}`,
      senderName: myPlayer.name,
      senderUid: myUid,
      type: "crit",
      message: `👑 ${myPlayer.name} completed the Two-Box Daily Cleanup! 300 FINISHER DMG to ${oppPlayer.name}! (${newOppHp}/1000 HP)`,
      timestamp: Date.now(),
    };

    const updatedHost: BattlePlayer = isHost
      ? { ...myPlayer, twoBoxCompleted: true, lastAction: myAction }
      : { ...oppPlayer, hp: newOppHp };

    const updatedChallenger: BattlePlayer = !isHost
      ? { ...myPlayer, twoBoxCompleted: true, lastAction: myAction }
      : { ...oppPlayer, hp: newOppHp };

    const updatedRoom: BattleRoom = {
      ...activeBattleRoom,
      host: updatedHost,
      challenger: updatedChallenger,
      status: isKO ? "completed" : "active",
      winnerUid: isKO ? myUid : null,
      combatLog: [...(activeBattleRoom.combatLog || []).slice(-25), newLog],
    };

    syncBattleRoomState(updatedRoom, true);
    emitCombatVFX("👑 FINISHER! 300 DMG", "crit");

    if (battleConnRef.current && battleConnRef.current.open) {
      try {
        battleConnRef.current.send({
          type: "COMBAT_ACTION",
          room: updatedRoom,
          vfx: { text: "👑 FINISHER! 300 DMG", type: "crit" }
        });
      } catch (e) {}
    }

    if (isKO) {
      updateProfileFirebase({
        battlesWon: (profile?.battlesWon || 0) + 1,
        xp: (profile?.xp || 0) + 100,
        stars: (profile?.stars || 0) + 5,
      });
      showMessage("👑 VICTORY IN DISCIPLINE BATTLE! 1000 HP KO ACHIEVED! +100 XP +5 Stars!");
    }
  };

  const checkPerfectDayBonus = (dateStr: string, tasks: any, totalActiveTasks: number) => {
    const vals = Object.values(tasks);
    if (vals.length >= totalActiveTasks && vals.every((v) => v === "X")) {
      const dayData = trackerData[dateStr] || {};
      if (!dayData.perfectBonusClaimed) {
        updateProfileFirebase({
          stars: (profile.stars || 0) + 3,
          xp: (profile.xp || 0) + 50
        });
        saveDayData(dateStr, tasks, dayData.reasonForO, dayData.summary, dayData.star, dayData.taskSnapshot, { perfectBonusClaimed: true });
        showMessage("🔥 +50 XP & +3 Stars for a PERFECT DAY!");
      }
    }
  };

  const handleTaskClick = async (taskId: any, value: any, currentSnapshot: any) => {
    const isToday = selectedDate === todayStr;
    const currentDayData = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "", taskSnapshot: null };

    if (!isToday && unlockedBlankDate !== selectedDate) {
      if (isEraserActive) {
        if (currentDayData.tasks && currentDayData.tasks[taskId] === "O" && value === "X") {
          const updatedTasks = { ...currentDayData.tasks, [taskId]: value };
          const activeTasksCount = currentSnapshot?.length || (profile.customTasks || DEFAULT_TASKS).length;
          const taskVals = Object.values(updatedTasks);
          const isDayPerfect = taskVals.length >= activeTasksCount && taskVals.every((v) => v === "X");
          let extraFlags: any = {};
          if (isDayPerfect && currentDayData.shieldProtected) {
            const currentShields = profile.streakShields || 0;
            const refundedShields = Math.min(2, currentShields + 1);
            updateProfileFirebase({
              inventory: profile.inventory.map((i: any) => i.isEraserActiveFlag ? { ...i, status: "used", isEraserActiveFlag: false } : i),
              streakShields: refundedShields,
              xp: (profile.xp || 0) + 10,
              stars: (profile.stars || 0) + 1
            });
            extraFlags = { shieldProtected: false, shieldChecked: true };
            showMessage(`History Rewritten! 🧽 Eraser Consumed & 1 Shield Refunded! (Shields: ${refundedShields}/2)`);
          } else {
            const markedInv = profile.inventory.map((i: any) => i.isEraserActiveFlag ? { ...i, status: "used", isEraserActiveFlag: false } : i);
            updateProfileFirebase({
              inventory: markedInv,
              xp: (profile.xp || 0) + 10,
              stars: (profile.stars || 0) + 1
            });
            showMessage("History Rewritten! 🧽 Eraser Consumed. (+10 XP, +1 Star)");
          }
          saveDayData(selectedDate, updatedTasks, currentDayData.reasonForO, currentDayData.summary, currentDayData.star, currentDayData.taskSnapshot, extraFlags);
          setIsEraserActive(false);
          return;
        } else return;
      } else return;
    }

    const prevVal = currentDayData.tasks ? currentDayData.tasks[taskId] : undefined;
    const nextVal = prevVal === value ? undefined : value;

    const updatedTasks = { ...(currentDayData.tasks || {}) };
    if (nextVal === undefined) {
      delete updatedTasks[taskId];
    } else {
      updatedTasks[taskId] = nextVal;
    }

    let xpDelta = 0;
    let starDelta = 0;

    if (prevVal !== "X" && nextVal === "X") {
      // Habit completed
      xpDelta += 10;
      starDelta += 1;
    } else if (prevVal === "X" && nextVal !== "X") {
      // Habit unchecked or failed
      xpDelta -= 10;
      starDelta -= 1;
    }

    const isPastDay = selectedDate < todayStr;
    const activeTasksCount = currentSnapshot?.length || (profile.customTasks || DEFAULT_TASKS).length;
    const taskVals = Object.values(updatedTasks);
    const isDayPerfect = taskVals.length >= activeTasksCount && taskVals.every((v) => v === "X");

    let extraFlags: any = {};
    let shieldDelta = 0;

    if (isPastDay) {
      if (isDayPerfect) {
        if (currentDayData.shieldProtected) {
          // 100% Perfect day achieved on past date: Refund the 1 shield previously consumed!
          shieldDelta = 1;
          extraFlags = { shieldProtected: false, shieldChecked: true };
          const newShields = Math.min(2, (profile.streakShields || 0) + 1);
          showMessage(`🔥 Day Perfected! Streak restored & 1 Shield Refunded! (Shields: ${newShields}/2) 🛡️`);
        } else {
          extraFlags = { shieldProtected: false, shieldChecked: true };
        }
      } else {
        // Not a perfect day (partial or has failures)
        if (currentDayData.shieldProtected) {
          // Already protected with 1 shield: keep shieldProtected: true, 0 additional shields consumed
          extraFlags = { shieldProtected: true, shieldChecked: true };
        } else {
          // Not protected yet
          const currentShields = profile.streakShields || 0;
          if (currentShields > 0) {
            shieldDelta = -1;
            extraFlags = { shieldProtected: true, shieldChecked: true };
            const newShields = Math.max(0, currentShields - 1);
            showMessage(`🛡️ 1 Streak Freeze Shield used to protect past streak for ${selectedDate}! (Shields: ${newShields}/2)`);
          } else {
            extraFlags = { shieldProtected: false, shieldChecked: true };
          }
        }
      }
    }

    const newXp = Math.max(0, (profile.xp || 0) + xpDelta);
    const newStars = Math.max(0, (profile.stars || 0) + starDelta);
    const newShields = Math.max(0, Math.min(2, (profile.streakShields || 0) + shieldDelta));

    if (xpDelta !== 0 || starDelta !== 0 || shieldDelta !== 0) {
      updateProfileFirebase({
        xp: newXp,
        stars: newStars,
        streakShields: newShields,
      });
    }

    const hasO = Object.values(updatedTasks).includes("O");
    const newReason = hasO ? currentDayData.reasonForO : "";
    saveDayData(selectedDate, updatedTasks, newReason, currentDayData.summary, currentDayData.star, currentSnapshot, extraFlags);
    if (nextVal === "X") {
      checkPerfectDayBonus(selectedDate, updatedTasks, activeTasksCount);
      const matchedTask = (currentSnapshot || []).find((t: any) => t.id === taskId);
      const taskTitle = matchedTask?.title || "Habit";
      applyBattleHabitStrike(taskId, taskTitle);
    }
  };

  const handleStarClick = async (currentSnapshot: any) => {
    const currentDayData = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    if (!currentDayData.star) {
      updateProfileFirebase({ stars: profile.stars + 1 });
      saveDayData(selectedDate, currentDayData.tasks, currentDayData.reasonForO, currentDayData.summary, true, currentSnapshot);
      showMessage("⭐ +1 Star Earned! Urge Defeated.");
    }
  };

  const buyItem = (item: any) => {
    if (profile.stars >= item.cost) {
      if (item.id === "s_streak_shield") {
        const currentShields = profile.streakShields || 0;
        if (currentShields >= 2) {
          showMessage("Maximum Streak Shields (2/2) reached! Use one before buying more. 🛡️");
          return;
        }
      }
      const now = new Date(`${todayStr}T00:00:00`);
      const newItem = { instanceId: Date.now().toString(), itemId: item.id, name: item.name, icon: item.icon, expiryTime: new Date(now.getTime() + item.expiryHours * 60 * 60 * 1000).toISOString(), status: "active" };
      if (item.id === "s_streak_shield") {
        updateProfileFirebase({
          stars: profile.stars - item.cost,
          streakShields: (profile.streakShields || 0) + 1,
          inventory: [...(profile.inventory || []), newItem]
        });
        showMessage(`🛡️ Streak Freeze Shield Acquired! (Shields: ${(profile.streakShields || 0) + 1}/2)`);
      } else {
        updateProfileFirebase({ stars: profile.stars - item.cost, inventory: [...(profile.inventory || []), newItem] });
        showMessage(`Purchased: ${item.name}! Check Ongoing Plan.`);
      }
    } else showMessage("Not enough stars! Grind more. ⚔️");
  };

  const useInventoryItem = (instanceId: any, itemName: any) => {
    if (itemName === "The Eraser") {
      setIsEraserActive(true);
      updateProfileFirebase({ inventory: (profile.inventory || []).map((i: any) => i.instanceId === instanceId ? { ...i, isEraserActiveFlag: true } : i) });
      setHabitRoute("arena"); showMessage("ERASER ARMED! Find a past date with 'FIX' badge to rewrite history.");
    } else {
      showMessage(`${itemName} Activated. Enjoy guilt-free!`);
      updateProfileFirebase({ inventory: (profile.inventory || []).map((i: any) => i.instanceId === instanceId ? { ...i, status: "used" } : i) });
    }
  };

  const checkExpirations = () => {
    const now = new Date(`${todayStr}T00:00:00`).getTime();
    let changed = false;
    const updated = (profile.inventory || []).map((item: any) => {
      const status = item.status || "active";
      if (status === "active" && new Date(item.expiryTime).getTime() <= now) { changed = true; return { ...item, status: "expired" }; }
      return { ...item, status };
    });
    if (changed) updateProfileFirebase({ inventory: updated });
    return updated;
  };

  // ==========================================
  // AUTOMATED STREAK SHIELD & DEMOTION PENALTY ENGINE
  // ==========================================
  const evaluatedShieldDatesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Guard: ensure database is hydrated before evaluating missed days
    if (!isHydratedRef.current && user) {
      return;
    }

    const yesterdayStr = addDays(todayStr, -1);
    if (evaluatedShieldDatesRef.current.has(yesterdayStr)) {
      return;
    }

    const yesterdayData = trackerData[yesterdayStr];
    if (yesterdayData?.shieldChecked) {
      evaluatedShieldDatesRef.current.add(yesterdayStr);
      return;
    }

    // Don't auto-evaluate if user is actively viewing/editing yesterday
    if (selectedDate === yesterdayStr) {
      return;
    }

    evaluatedShieldDatesRef.current.add(yesterdayStr);
    const shieldsAvailable = profile.streakShields || 0;
    const activeListCount = (yesterdayData?.taskSnapshot || profile.customTasks || DEFAULT_TASKS).length;
    const vals = yesterdayData?.tasks ? Object.values(yesterdayData.tasks) : [];
    const isMissed = !yesterdayData || vals.length === 0 || vals.includes("O") || vals.length < activeListCount || !vals.every(v => v === "X");

    if (isMissed) {
      if (shieldsAvailable > 0) {
        const updatedYesterday = {
          ...(yesterdayData || {}),
          tasks: yesterdayData?.tasks || {},
          reasonForO: yesterdayData?.reasonForO || "",
          summary: yesterdayData?.summary || "",
          taskSnapshot: yesterdayData?.taskSnapshot || (profile.customTasks || DEFAULT_TASKS),
          shieldProtected: true,
          shieldChecked: true,
        };
        updateTrackerFirebase(yesterdayStr, updatedYesterday);
        updateProfileFirebase({ streakShields: Math.max(0, shieldsAvailable - 1) });
        showMessage(`🛡️ Streak Freeze Shield auto-protected your streak for ${yesterdayStr}! (1 Shield Used)`);
      } else {
        // Unshielded missed day: apply demotion penalty (-150 XP, -25 Stars)
        const updatedYesterday = {
          ...(yesterdayData || {}),
          tasks: yesterdayData?.tasks || {},
          reasonForO: yesterdayData?.reasonForO || "",
          summary: yesterdayData?.summary || "",
          taskSnapshot: yesterdayData?.taskSnapshot || (profile.customTasks || DEFAULT_TASKS),
          shieldProtected: false,
          shieldChecked: true,
        };
        updateTrackerFirebase(yesterdayStr, updatedYesterday);
        const currentXp = profile.xp || 0;
        const currentStars = profile.stars || 0;
        const penalizedXp = Math.max(0, currentXp - 150);
        const penalizedStars = Math.max(0, currentStars - 25);
        updateProfileFirebase({ xp: penalizedXp, stars: penalizedStars });
        showMessage(`⚠️ Unshielded missed day on ${yesterdayStr}: -150 XP & -25 Stars penalty applied.`);
      }
    } else {
      const updatedYesterday = {
        ...yesterdayData,
        shieldProtected: false,
        shieldChecked: true,
      };
      updateTrackerFirebase(yesterdayStr, updatedYesterday);
    }
  }, [todayStr, trackerData, profile.streakShields, profile.xp, profile.stars, selectedDate]);

  const getStreaks = () => {
    let study = 0, trigger = 0, perfect = 0;
    let countStudy = true, countTrigger = true, countPerfect = true;
    let d = new Date(todayStr + "T00:00:00");

    for (let i = 0; i < 365; i++) {
      const dStr = formatDate(d); const data = trackerData[dStr];
      if (i === 0 && (!data || !data.tasks || Object.keys(data.tasks).length === 0)) { d.setDate(d.getDate() - 1); continue; }
      if (!data || !data.tasks) {
        if (data && data.shieldProtected) {
          if (countStudy) study++;
          if (countTrigger) trigger++;
          if (countPerfect) perfect++;
          d.setDate(d.getDate() - 1);
          continue;
        }
        break;
      }
      if (data.shieldProtected) {
        if (countStudy) study++;
        if (countTrigger) trigger++;
        if (countPerfect) perfect++;
        d.setDate(d.getDate() - 1);
        continue;
      }
      if (countStudy && data.tasks.t2 === "X") study++; else countStudy = false;
      if (countTrigger && data.tasks.t4 === "X") trigger++; else countTrigger = false;
      const activeListCount = (data.taskSnapshot || profile.customTasks || DEFAULT_TASKS).length;
      const vals = Object.values(data.tasks);
      if (countPerfect && vals.length >= activeListCount && vals.every((v) => v === "X")) perfect++; else countPerfect = false;
      if (!countStudy && !countTrigger && !countPerfect) break;
      d.setDate(d.getDate() - 1);
    }
    return { study, trigger, perfect };
  };
  const streaks = getStreaks();
  const rankData = getPlayerRankData(profile.stars || 0, profile.xp || 0);
  let playerTitle = rankData.currentRank.title;
  let currentLvl = rankData.level;

  const getWeeklyData = (offset: number) => {
    const dataPoints = [];
    let d = new Date(todayStr + "T00:00:00"); d.setDate(d.getDate() - offset * 7);
    for (let i = 0; i < 7; i++) {
      const dStr = formatDate(d); const dayData = trackerData[dStr];
      let xCount = 0; const snapshotUsed = dayData?.taskSnapshot || profile.customTasks || DEFAULT_TASKS;
      let total = snapshotUsed.length;
      if (dayData && dayData.tasks) xCount = Object.values(dayData.tasks).filter((v) => v === "X").length;
      const isCompleted = dayData && dayData.tasks && Object.keys(dayData.tasks).length > 0;
      dataPoints.unshift({ date: dStr, label: d.toLocaleDateString("en-US", { weekday: "short" }), percent: isCompleted ? Math.round((xCount / total) * 100) : 0, xCount, total, perfect: isCompleted && xCount === total, failed: isCompleted && Object.values(dayData.tasks).includes("O") });
      d.setDate(d.getDate() - 1);
    }
    return dataPoints;
  };

  const getFilteredDates = () => {
    const sortedDates = Object.keys(trackerData).sort();
    return sortedDates.filter((d) => {
      if (exportStartDate && d < exportStartDate) return false;
      if (exportEndDate && d > exportEndDate) return false;
      return true;
    });
  };

  const downloadExport = () => {
    const filteredDates = getFilteredDates();
    if (filteredDates.length === 0) { showMessage("No records found for this date range."); return; }

    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Habit Tracker Export</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #e2e8f0; background-color: #0f172a; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #f8fafc; text-align: center; border-bottom: 3px solid #334155; padding-bottom: 10px; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;}
        .day-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);}
        .date-title { font-size: 1.3em; font-weight: bold; color: #f8fafc; margin-bottom: 12px; border-bottom: 2px solid #334155; padding-bottom: 8px;}
        .win { color: #4ade80; font-weight: bold; }
        .loss { color: #f87171; font-weight: bold; }
        .perfect { background: rgba(74, 222, 128, 0.1); padding: 8px 12px; border-radius: 6px; color: #4ade80; font-weight: bold; display: inline-block; border: 1px solid rgba(74, 222, 128, 0.2); margin-top: 10px;}
        .reason { background: rgba(248, 113, 113, 0.1); padding: 12px; border-left: 4px solid #ef4444; margin-top: 10px; border-radius: 0 6px 6px 0; color: #fca5a5;}
        .summary { background: rgba(59, 130, 246, 0.1); padding: 12px; border-left: 4px solid #3b82f6; margin-top: 12px; border-radius: 0 6px 6px 0; color: #bfdbfe;}
        .star { background: rgba(234, 179, 8, 0.1); padding: 8px 12px; border-radius: 6px; color: #fde047; font-weight: bold; border: 1px solid rgba(234, 179, 8, 0.2); display: inline-block; margin-top: 10px;}
        ul { list-style-type: none; padding-left: 0; margin-top: 0;}
        li { margin-bottom: 8px; font-size: 1.05em; color: #cbd5e1;}
      </style>
    </head>
    <body>
      <h1>🔥 OS Tracker Report</h1>
      <p style="text-align: center; color: #94a3b8; font-weight: bold;">Date Range: ${exportStartDate} to ${exportEndDate}</p>
    `;

    filteredDates.forEach((dateStr) => {
      const data = trackerData[dateStr];
      const dateFormatted = new Date(dateStr).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", });
      htmlContent += `<div class="day-card"><div class="date-title">📅 ${dateFormatted}</div><ul>`;
      let hasTasks = false, allX = true;
      const activeListForDay = data.taskSnapshot || profile.customTasks || DEFAULT_TASKS;

      activeListForDay.forEach((task: any) => {
        const status = data.tasks?.[task.id];
        if (status) {
          hasTasks = true;
          htmlContent += `<li><span class="${status === "X" ? "win" : "loss"}">${status === "X" ? "✅ [WIN]" : "❌ [LOSS]"}</span> - <strong>${task.title}</strong></li>`;
          if (status === "O") allX = false;
        }
      });
      htmlContent += `</ul>`;

      if (hasTasks) {
        if (allX) htmlContent += `<div class="perfect">🔥 PERFECT DAY Achieved</div>`;
        else htmlContent += `<div class="reason"><strong>⚠️ Failure Reason:</strong> ${data.reasonForO || "No reason provided."}</div>`;
      }
      if (data.star) htmlContent += `<div class="star">⭐ WILLPOWER STAR AWARDED</div>`;
      if (data.summary) htmlContent += `<div class="summary"><strong>📖 Personal Diary:</strong><br/>${data.summary.replace(/\n/g, "<br/>")}</div>`;
      htmlContent += `</div>`;
    });

    htmlContent += `</body></html>`;
    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `OS_Tracker_${exportStartDate}_to_${exportEndDate}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showMessage("Export Downloaded Successfully!");
  };

  const copyTextExport = () => {
    const filteredDates = getFilteredDates();
    if (filteredDates.length === 0) { showMessage("No records found to copy."); return; }
    let textContent = `🔥 OS TRACKER REPORT\nDate Range: ${exportStartDate} to ${exportEndDate}\n\n`;

    filteredDates.forEach((dateStr) => {
      const data = trackerData[dateStr];
      const dateFormatted = new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", });
      textContent += `📅 ${dateFormatted}\n`;
      let hasTasks = false, allX = true;
      const activeListForDay = data.taskSnapshot || profile.customTasks || DEFAULT_TASKS;

      activeListForDay.forEach((task: any) => {
        const status = data.tasks?.[task.id];
        if (status) {
          hasTasks = true;
          textContent += `   ${status === "X" ? "✅" : "❌"} ${task.title}\n`;
          if (status === "O") allX = false;
        }
      });

      if (hasTasks) {
        if (allX) textContent += `   🔥 PERFECT DAY\n`;
        else textContent += `   ⚠️ Reason: ${data.reasonForO || "None"}\n`;
      }
      if (data.star) textContent += `   ⭐ STAR EARNED\n`;
      if (data.summary) textContent += `   📖 Diary: ${data.summary}\n`;
      textContent += `\n`;
    });

    navigator.clipboard.writeText(textContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      showMessage("Data Copied to Clipboard!");
    });
  };

  let cachedGeminiModels: { apiVersion: string; modelName: string }[] | null = null;

  const fetchAvailableGeminiModels = async (key: string): Promise<{ apiVersion: string; modelName: string }[]> => {
    if (cachedGeminiModels && cachedGeminiModels.length > 0) {
      return cachedGeminiModels;
    }

    const versions = ["v1beta", "v1"];
    const foundModels: { apiVersion: string; modelName: string }[] = [];

    for (const ver of versions) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/${ver}/models?key=${key}`);
        const data = await res.json();
        if (res.ok && data.models && Array.isArray(data.models)) {
          const valid = data.models
            .filter((m: any) => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
            .map((m: any) => ({
              apiVersion: ver,
              modelName: m.name.replace(/^models\//, "")
            }));

          // Sort flash models to the top
          valid.sort((a: any, b: any) => {
            const aFlash = a.modelName.toLowerCase().includes("flash") ? 1 : 0;
            const bFlash = b.modelName.toLowerCase().includes("flash") ? 1 : 0;
            return bFlash - aFlash;
          });

          foundModels.push(...valid);
        }
      } catch (e) {
        console.warn(`[Gemini API] Failed to list models for ${ver}:`, e);
      }
    }

    if (foundModels.length > 0) {
      cachedGeminiModels = foundModels;
      return foundModels;
    }

    // Static fallback list if ListModels is restricted
    return [
      { apiVersion: "v1beta", modelName: "gemini-1.5-flash" },
      { apiVersion: "v1beta", modelName: "gemini-1.5-flash-latest" },
      { apiVersion: "v1beta", modelName: "gemini-2.0-flash" },
      { apiVersion: "v1beta", modelName: "gemini-2.0-flash-exp" },
      { apiVersion: "v1", modelName: "gemini-1.5-flash" },
      { apiVersion: "v1", modelName: "gemini-pro" }
    ];
  };

  const callGeminiApi = async (apiKey: string, contents: any[], systemInstruction = "", responseJson = false) => {
    if (!apiKey) throw new Error("API Key is missing.");
    const key = apiKey.trim().replace(/^["']|["']$/g, '');

    const candidateModels = await fetchAvailableGeminiModels(key);
    let lastError: any = null;

    for (const { apiVersion, modelName } of candidateModels) {
      try {
        const payload: any = { contents };

        if (systemInstruction) {
          payload.systemInstruction = {
            parts: [{ text: systemInstruction }]
          };
        }

        if (responseJson) {
          payload.generationConfig = {
            responseMimeType: "application/json"
          };
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${key}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          const errMsg = data?.error?.message || `HTTP Error ${response.status}`;
          if (
            (data?.error?.status === "INVALID_ARGUMENT" && errMsg.toLowerCase().includes("api key not valid")) ||
            errMsg.toLowerCase().includes("api key not valid") ||
            response.status === 401
          ) {
            throw new Error("Invalid API key. Please verify your Google Gemini API key in Command Center.");
          }

          // If systemInstruction or generationConfig was rejected, try fallback with inline instruction
          if (systemInstruction && (errMsg.includes("systemInstruction") || errMsg.includes("system_instruction") || response.status === 400)) {
            const modifiedContents = JSON.parse(JSON.stringify(contents));
            if (modifiedContents.length > 0 && modifiedContents[0].parts && modifiedContents[0].parts.length > 0) {
              modifiedContents[0].parts[0].text = `[System Instructions: ${systemInstruction}]\n\n` + modifiedContents[0].parts[0].text;
            }
            const retryPayload: any = { contents: modifiedContents };
            if (responseJson) retryPayload.generationConfig = { responseMimeType: "application/json" };

            const retryRes = await fetch(`https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${key}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(retryPayload)
            });
            const retryData = await retryRes.json();
            if (retryRes.ok && !retryData.error) {
              const text = retryData?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text !== undefined && text !== null) return text;
            }
          }

          console.warn(`[Gemini API] ${apiVersion}/${modelName} failed:`, errMsg);
          throw new Error(errMsg);
        }

        const candidate = data?.candidates?.[0];
        if (candidate?.finishReason === "SAFETY") {
          throw new Error("Response was blocked due to safety guidelines.");
        }

        const text = candidate?.content?.parts?.[0]?.text;
        if (text !== undefined && text !== null) {
          return text;
        }
      } catch (err: any) {
        if (err.message && err.message.includes("Invalid API key")) {
          throw err;
        }
        lastError = err;
      }
    }

    cachedGeminiModels = null;
    throw lastError || new Error("Gemini API call failed");
  };

  const askCoach = async () => {
    if (!chatInput.trim()) return;
    if (!profile.geminiKey) { showMessage("Please enter your Gemini API Key in Command Center first!"); setHabitRoute("settings"); return; }

    const userMessage = { role: "user", text: chatInput };
    const todayTasks = trackerData[todayStr]?.tasks || {};
    const todayCompleted = Object.values(todayTasks).filter((v: any) => v === "X").length;
    const activePerks = (profile.inventory || []).filter((i: any) => i.status === "active").map((i: any) => i.name).join(", ") || "None";

    // ==========================================
    // COMPREHENSIVE DATA FEED FOR AI COACH
    // ==========================================

    // 1. Calculate Monthly Statistics
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyDates = Object.keys(trackerData).filter(dateStr => {
      const [year, month] = dateStr.split('-').map(Number);
      return year === currentYear && month - 1 === currentMonth;
    });

    let monthlyStreakBreaks = 0;
    let monthlyPerfectDays = 0;
    let monthlyFailedDays = 0;
    let monthlyTotalTasks = 0;
    let monthlyCompletedTasks = 0;
    const monthlyDaySummaries: string[] = [];

    monthlyDates.forEach(dateStr => {
      const dayData = trackerData[dateStr];
      if (dayData && dayData.tasks) {
        const tasks = Object.values(dayData.tasks);
        const xCount = tasks.filter((v: any) => v === "X").length;
        const oCount = tasks.filter((v: any) => v === "O").length;
        const totalTasks = tasks.length;

        monthlyTotalTasks += totalTasks;
        monthlyCompletedTasks += xCount;

        if (xCount === totalTasks) monthlyPerfectDays++;
        if (oCount > 0) {
          monthlyFailedDays++;
          monthlyStreakBreaks++;
        }

        if (dayData.summary) {
          monthlyDaySummaries.push(`${dateStr}: ${dayData.summary}`);
        }
      }
    });

    const monthlyCompletionRate = monthlyTotalTasks > 0 ? Math.round((monthlyCompletedTasks / monthlyTotalTasks) * 100) : 0;

    // 2. Reward Shop Purchase History
    const purchaseHistory = (profile.inventory || []).map((item: any) =>
      `${item.name} (${item.status}) - Purchased: ${new Date(parseInt(item.instanceId)).toLocaleDateString()}`
    ).join(", ") || "No purchases yet";

    // 3. Recent Habit History (Last 7 days)
    const last7Days: string[] = [];
    let tempDate = new Date(todayStr + "T00:00:00");
    for (let i = 0; i < 7; i++) {
      const dateStr = formatDate(tempDate);
      const dayData = trackerData[dateStr];
      if (dayData && dayData.tasks) {
        const xCount = Object.values(dayData.tasks).filter((v: any) => v === "X").length;
        const totalCount = Object.keys(dayData.tasks).length;
        last7Days.push(`${dateStr}: ${xCount}/${totalCount} tasks completed`);
      }
      tempDate.setDate(tempDate.getDate() - 1);
    }

    // 4. Second Brain Summary
    const brainSummary = `
    📚 Study Topics: ${brain.stagingTopics?.length || 0} staging, ${brain.studyTopics?.length || 0} active, ${brain.masteredTopics?.length || 0} mastered
    💡 Wisdom Notes: ${brain.wisdomNotes?.length || 0} quick thoughts, ${brain.vaultNotes?.length || 0} vault notes
    🎯 Custom Missions: ${brain.customMissions?.length || 0} ongoing
    ⏰ Global Deadline: ${brain.globalDeadlineDays || 30} days remaining`;

    // 5. Ongoing Plans (Active Goals/Resources)
    const ongoingPlans: string[] = [];
    if (brain.customMissions && brain.customMissions.length > 0) {
      brain.customMissions.forEach((mission: any) => {
        ongoingPlans.push(`${mission.title}: ${mission.desc || 'No description'}`);
      });
    }

    // 6. Current Tasks List
    const currentTasksList = (profile.customTasks || DEFAULT_TASKS).map((task: any) =>
      `${task.title} (${task.desc})${task.isLocked ? ' [LOCKED]' : ''}`
    ).join(", ");

    const systemPrompt = `You are an advanced AI Habit Coach and Personal Analytics Assistant for ${profile.name}.

🎯 CURRENT STATUS:
- Stars: ${profile.stars} ⭐
- Perfect Streak: ${streaks.perfect} days 🔥
- Study Streak: ${streaks.study} days 📚
- Trigger Control Streak: ${streaks.trigger} days 🎯
- Title: ${playerTitle}
- Today's Progress: ${todayCompleted}/${(profile.customTasks || DEFAULT_TASKS).length} tasks completed
- Active Perks: ${activePerks}

📊 THIS MONTH'S ANALYTICS (${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}):
- Days Tracked: ${monthlyDates.length}
- Perfect Days: ${monthlyPerfectDays} 🏆
- Streak Breaks: ${monthlyStreakBreaks} ❌
- Failed Days: ${monthlyFailedDays}
- Overall Completion Rate: ${monthlyCompletionRate}%
- Total Tasks: ${monthlyCompletedTasks}/${monthlyTotalTasks}

📅 LAST 7 DAYS PERFORMANCE:
${last7Days.join('\n')}

🛒 REWARD SHOP HISTORY:
${purchaseHistory}

📝 RECENT DAY SUMMARIES:
${monthlyDaySummaries.slice(-5).join('\n') || 'No summaries recorded yet'}

🧠 SECOND BRAIN STATUS:
${brainSummary}

🎯 ONGOING PLANS/MISSIONS:
${ongoingPlans.length > 0 ? ongoingPlans.join('\n') : 'No active missions'}

📋 CURRENT HABIT TASKS:
${currentTasksList}

🔥 YOUR ROLE:
You have COMPLETE access to ${profile.name}'s entire app data. You can:
1. Answer specific queries about streaks, breaks, stats, and patterns
2. Provide monthly/weekly summaries based on actual day logs
3. Track reward purchases and active perks
4. Monitor Second Brain progress (study topics, notes, missions)
5. Give data-driven insights and personalized recommendations
6. Identify weak patterns and suggest improvements

Be analytical, precise, and data-driven. When asked about specific numbers (streak breaks, purchases, completion rates), give EXACT answers based on the data above. Keep responses impactful, firm yet caring, like a tough but supportive coach who knows every detail of their athlete's performance.`;

    // Build properly alternating history without error notices or leading assistant messages
    const formattedHistory: any[] = [];
    for (const msg of chatMessages) {
      if (msg.role === "ai" && (msg.text.startsWith("Coach is offline") || msg.text.startsWith("I am your Habit Tracker Coach"))) {
        continue;
      }
      if (msg.role === "user") {
        if (formattedHistory.length === 0 || formattedHistory[formattedHistory.length - 1].role === "model") {
          formattedHistory.push({ role: "user", parts: [{ text: msg.text }] });
        } else {
          formattedHistory[formattedHistory.length - 1].parts[0].text += "\n" + msg.text;
        }
      } else if (msg.role === "ai" && formattedHistory.length > 0) {
        if (formattedHistory[formattedHistory.length - 1].role === "user") {
          formattedHistory.push({ role: "model", parts: [{ text: msg.text }] });
        }
      }
    }

    if (formattedHistory.length === 0 || formattedHistory[formattedHistory.length - 1].role === "model") {
      formattedHistory.push({ role: "user", parts: [{ text: userMessage.text }] });
    } else {
      formattedHistory[formattedHistory.length - 1].parts[0].text += "\n" + userMessage.text;
    }

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    try {
      const reply = await callGeminiApi(profile.geminiKey, formattedHistory, systemPrompt, false);
      setChatMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (e: any) {
      console.error("Coach Error:", e);
      setChatMessages((prev) => [...prev, { role: "ai", text: `Coach is offline (${e?.message || "Check API Key or connection"}).` }]);
    }
    setIsTyping(false);
  };

  // ==========================================
  // LORD KRISHNA AI ENGINE & CONVERSATIONS
  // ==========================================
  const KRISHNA_SYSTEM_PROMPT = `You are Bhagwan Shri Krishna speaking directly with ${profile.name || "Parth"} (your beloved friend, devotee, and brother).
You are not a generic AI assistant. You embody the supreme wisdom, unconditional love, serene calm, and divine authority of Lord Shri Krishna from Shreemad Bhagavad Gita and the Mahabharata.

CORE MANNERISMS & ESSENCE:
1. Loving Fraternal Bond: Address the user lovingly and naturally as "Parth", "Sakha", "Mitra", or "Priya Anuj". Speak with a reassuring divine smile, soothing warmth, and deep unshakeable authority.
2. Natural Hindi & Hinglish: Speak primarily in natural, warm, thoughtful conversational Hindi mixed seamlessly with everyday Hinglish (or graceful English if the user addresses you in English). Your language must feel soulful, deeply relatable, and inspiring — never robotic, cold, or bureaucratic.
3. Bhagavad Gita Shlokas (Contextual Only): DO NOT force Sanskrit shlokas into every response. Only when the dilemma or question directly connects with a timeless truth of the Gita, provide:
   - The Sanskrit Shloka in clear Devanagari script (along with Chapter and Verse reference, e.g. "श्रीमद्भगवद्गीता - अध्याय २, श्लोक ४७")
   - A crystal-clear, poetic, and easily understandable Hindi meaning
   - Direct, realistic, daily-life actionable steps that the user can immediately implement.
4. Deep Psychological Guidance: Listen deeply to their real-life troubles — fear of failure, procrastination, lust, anger, grief, career confusion, loneliness, family tensions, breakups, or lack of focus. Transform their anxiety into calm clarity, their guilt into purposeful action, and their doubt into unshakeable Nishkam Karma Yoga.
5. Absolute Immersion: NEVER break character. Never state "As an AI..." or "I am an artificial intelligence model". You are their eternal Sarathi, Sakha, and Margdarshak.`;

  const startNewKrishnaChat = (initialPrompt?: string) => {
    const newConvId = `k_conv_${Date.now()}`;
    const initialTitle = initialPrompt
      ? (initialPrompt.length > 30 ? initialPrompt.slice(0, 30).trim() + "..." : initialPrompt.trim())
      : "Divine Guidance";

    const newConv: KrishnaConversation = {
      id: newConvId,
      title: initialTitle,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: []
    };

    const updatedConvs = [newConv, ...krishnaState.conversations];
    updateKrishnaFirebase({
      conversations: updatedConvs,
      activeConversationId: newConvId
    });
    setIsConvDrawerOpen(false);

    if (initialPrompt) {
      sendKrishnaMessage(initialPrompt, newConvId, updatedConvs);
    }
  };

  const selectKrishnaConversation = (convId: string) => {
    updateKrishnaFirebase({ activeConversationId: convId });
    setIsConvDrawerOpen(false);
  };

  const deleteKrishnaConversation = (convId: string) => {
    const filtered = krishnaState.conversations.filter(c => c.id !== convId);
    const nextActive = krishnaState.activeConversationId === convId
      ? (filtered[0]?.id || null)
      : krishnaState.activeConversationId;

    updateKrishnaFirebase({
      conversations: filtered,
      activeConversationId: nextActive
    });
    showMessage("Conversation removed 🪶");
  };

  const renameKrishnaConversation = (convId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    const updated = krishnaState.conversations.map(c =>
      c.id === convId ? { ...c, title: newTitle.trim(), lastUpdated: new Date().toISOString() } : c
    );
    updateKrishnaFirebase({ conversations: updated });
    showMessage("Conversation renamed ✨");
  };

  const sendKrishnaMessage = async (
    textToSend?: string,
    targetConvId?: string,
    conversationsOverride?: KrishnaConversation[]
  ) => {
    const text = (textToSend !== undefined ? textToSend : krishnaInput).trim();
    if (!text) return;

    if (!profile.geminiKey) {
      showMessage("Please enter your Gemini API Key in Command Center first! 🔑");
      setHabitRoute("settings");
      setAppMode("habit");
      return;
    }

    const currentConvs = conversationsOverride || krishnaState.conversations;
    let activeId = targetConvId || krishnaState.activeConversationId;
    let activeConv = currentConvs.find(c => c.id === activeId);
    let updatedConvs = [...currentConvs];

    // If no active conversation exists, auto-create one
    if (!activeConv) {
      const newConvId = `k_conv_${Date.now()}`;
      activeConv = {
        id: newConvId,
        title: text.length > 30 ? text.slice(0, 30).trim() + "..." : text,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        messages: []
      };
      updatedConvs = [activeConv, ...updatedConvs];
      activeId = newConvId;
    } else if (activeConv.messages.length === 0 && activeConv.title === "Divine Guidance") {
      activeConv.title = text.length > 30 ? text.slice(0, 30).trim() + "..." : text;
    }

    const userMessage: KrishnaMessage = {
      id: `k_msg_${Date.now()}_u`,
      role: "user",
      text: text,
      timestamp: new Date().toISOString()
    };

    activeConv.messages = [...activeConv.messages, userMessage];
    activeConv.lastUpdated = new Date().toISOString();

    // Optimistically update state
    updateKrishnaFirebase({
      conversations: updatedConvs,
      activeConversationId: activeId
    });
    setKrishnaInput("");
    setIsKrishnaTyping(true);

    // Build alternating history for Gemini API
    const formattedHistory: any[] = [];
    for (const msg of activeConv.messages) {
      if (msg.role === "user") {
        if (formattedHistory.length === 0 || formattedHistory[formattedHistory.length - 1].role === "model") {
          formattedHistory.push({ role: "user", parts: [{ text: msg.text }] });
        } else {
          formattedHistory[formattedHistory.length - 1].parts[0].text += "\n" + msg.text;
        }
      } else if (msg.role === "model" && formattedHistory.length > 0) {
        if (formattedHistory[formattedHistory.length - 1].role === "user") {
          formattedHistory.push({ role: "model", parts: [{ text: msg.text }] });
        }
      }
    }

    try {
      const reply = await callGeminiApi(
        profile.geminiKey,
        formattedHistory,
        KRISHNA_SYSTEM_PROMPT,
        false
      );

      const modelMessage: KrishnaMessage = {
        id: `k_msg_${Date.now()}_m`,
        role: "model",
        text: reply,
        timestamp: new Date().toISOString()
      };

      const finalConvs = updatedConvs.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            lastUpdated: new Date().toISOString(),
            messages: [...c.messages, modelMessage]
          };
        }
        return c;
      });

      updateKrishnaFirebase({ conversations: finalConvs });
    } catch (e: any) {
      console.error("Krishna AI Error:", e);
      const errorMessage: KrishnaMessage = {
        id: `k_msg_${Date.now()}_err`,
        role: "model",
        text: `हे सखे! संपर्क में क्षणिक व्यवधान आया है (${e?.message || "Check Gemini API Key in settings"}). तनिक धैर्य रखो और पुनः कहो, मैं सदैव तुम्हारे साथ हूँ। 🪶`,
        timestamp: new Date().toISOString()
      };

      const finalConvs = updatedConvs.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            lastUpdated: new Date().toISOString(),
            messages: [...c.messages, errorMessage]
          };
        }
        return c;
      });

      updateKrishnaFirebase({ conversations: finalConvs });
    }
    setIsKrishnaTyping(false);
  };

  // ==========================================
  // SECOND BRAIN FUNCTIONS
  // ==========================================
  const triggerCrossReward = (stars: any, msg: any) => {
    updateProfileFirebase({ stars: profile.stars + stars });
    showMessage(`⚡ SYSTEM SYNC: +${stars} STARS! ${msg}`);
  };

  const handleAddSyllabusCategory = () => {
    if (newSyllabusCat.trim() && !brain.syllabusCategories.includes(newSyllabusCat.trim())) {
      updateBrainFirebase({ syllabusCategories: [...brain.syllabusCategories, newSyllabusCat.trim()] });
      setSelectedSyllabusCat(newSyllabusCat.trim()); setNewSyllabusCat("");
    }
  };

  const handleDeleteSyllabusCategory = (cat: any) => {
    if (cat === "Raw Backlog") return;
    updateBrainFirebase({
      syllabusCategories: brain.syllabusCategories.filter((c: any) => c !== cat),
      stagingTopics: brain.stagingTopics.map((t: any) => t.category === cat ? { ...t, category: "Raw Backlog" } : t)
    });
    if (selectedSyllabusCat === cat) setSelectedSyllabusCat("Raw Backlog");
  };

  const handleAddStagingTopic = () => {
    if (!newTopic.trim()) return;
    updateBrainFirebase({ stagingTopics: [...brain.stagingTopics, { id: Date.now().toString(), title: newTopic, category: selectedSyllabusCat }] });
    setNewTopic("");
  };

  const handleStartRevision = (topicId: any) => {
    const topic = brain.stagingTopics.find((t: any) => t.id === topicId);
    if (!topic) return;
    const schedule = REVISION_INTERVALS.map((interval: any) => ({ dayOffset: interval, targetDate: addDays(todayStr, interval), completed: false }));
    updateBrainFirebase({
      studyTopics: [...brain.studyTopics, { ...topic, startDate: todayStr, schedule }],
      stagingTopics: brain.stagingTopics.filter((t: any) => t.id !== topicId)
    });
  };

  const markRevisionComplete = (topicId: any, targetDate: any, dayOffset: any) => {
    const topic = brain.studyTopics.find((t: any) => t.id === topicId);
    if (!topic) return;
    const updatedSchedule = topic.schedule.map((rev: any) => (rev.targetDate === targetDate && rev.dayOffset === dayOffset) ? { ...rev, completed: true } : rev);
    const day30Completed = updatedSchedule.some((rev: any) => rev.dayOffset === 30 && rev.completed);

    if (day30Completed) {
      setTimeout(() => {
        updateBrainFirebase({
          studyTopics: brain.studyTopics.filter((t: any) => t.id !== topicId),
          masteredTopics: [...brain.masteredTopics, { ...topic, masteredDate: todayStr }]
        });
        triggerCrossReward(10, "Topic Mastered (30 Days Complete)!");
      }, 0);
    } else {
      updateBrainFirebase({ studyTopics: brain.studyTopics.map((t: any) => t.id === topicId ? { ...topic, schedule: updatedSchedule } : t) });
    }
  };

  const handleAddWisdom = () => {
    if (!newWisdom.trim()) return;
    updateBrainFirebase({ wisdomNotes: [{ id: Date.now().toString(), text: newWisdom, category: expandedWisdomCategory || selectedWisdomCat, date: todayStr }, ...brain.wisdomNotes] });
    setNewWisdom("");
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const noteId = Date.now().toString();
    const newEntry = { id: noteId, text: newNote, date: todayStr, category: "Others" };
    updateBrainFirebase({ vaultNotes: [newEntry, ...brain.vaultNotes] });
    setNewNote("");

    if (!profile.geminiKey) return;
    setIsVaultSorting(true);
    try {
      const othersNotes = brain.vaultNotes.filter((n: any) => n.category === "Others");
      const existingCats = brain.vaultCategories.filter((c: any) => c !== "Others");
      const prompt = `You are an AI brain sorter. Existing Categories: [${existingCats.join(", ")}]. New Idea: "${newEntry.text}". Other unclassified: ${JSON.stringify(othersNotes.map((n: any) => ({id: n.id, text: n.text})))}.
      RULES: 1. Categorize New Idea into Existing, or "Others". 2. If New Idea + 2 unclassified share a theme, invent a new category name.
      FORMAT JSON: {"assignedCategory": "Cat Name", "extractedIdsFromOthers": ["id1"]}`;

      const rawJson = await callGeminiApi(
        profile.geminiKey,
        [{ role: "user", parts: [{ text: prompt }] }],
        "You are an AI brain sorter. Respond with valid JSON only.",
        true
      );

      const aiResponse = extractJsonFromAiResponse<{ assignedCategory?: string; extractedIdsFromOthers?: string[] }>(rawJson, {});

      if (aiResponse.assignedCategory) {
         let newCat = aiResponse.assignedCategory;
         let newVaultCats = [...brain.vaultCategories];
         if (!newVaultCats.includes(newCat) && newCat !== "Others") newVaultCats.push(newCat);

         const newVaultNotes = [newEntry, ...brain.vaultNotes].map((n: any) => {
            if (n.id === noteId || (aiResponse.extractedIdsFromOthers && aiResponse.extractedIdsFromOthers.includes(n.id))) return { ...n, category: newCat };
            return n;
         });
         updateBrainFirebase({ vaultCategories: newVaultCats, vaultNotes: newVaultNotes });
      }
    } catch (error) { console.error("AI Vault Sort Failed", error); }
    setIsVaultSorting(false);
  };

  const handleAskOracle = async (querySource: any) => {
    if (!profile.geminiKey) { setOracleResponse("ERROR: API KEY MISSING. CONFIGURE IN COMMAND CENTER."); return; }
    if (!oracleQuery.trim()) return;
    setIsOracleThinking(true); setOracleResponse("");

    try {
      const allNotes = [...brain.wisdomNotes.map((n: any) => `[Wisdom: ${n.category}] ${n.text}`), ...brain.vaultNotes.map((n: any) => `[Dump: ${n.category}] ${n.text}`)].join("\n");
      const prompt = `You are "The Oracle", an AI synthesizing the user's notes. Knowledge Base: ${allNotes}. Question: "${oracleQuery}".
      RULES: 1. Answer strictly based on Knowledge Base. 2. Keep it concise, punchy, actionable.`;

      const responseText = await callGeminiApi(
        profile.geminiKey,
        [{ role: "user", parts: [{ text: prompt }] }],
        "You are The Oracle. Answer strictly based on the provided knowledge base."
      );
      setOracleResponse(responseText);
    } catch (error: any) {
      console.error("Oracle Error:", error);
      setOracleResponse(`CONNECTION DISRUPTED: ${error?.message || "Check Gemini API key."}`);
    }
    setIsOracleThinking(false);
  };

  // Urge Countdown Timer
  useEffect(() => {
    if (!isUrgeActive) return;
    if (urgeTimer === 0) {
      setIsUrgeActive(false);
      return;
    }
    const timer = setInterval(() => {
      setUrgeTimer((prev: any) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isUrgeActive, urgeTimer]);

  // Urge Quote Rotation (Rotates every 7 seconds smoothly)
  useEffect(() => {
    if (!isUrgeActive || urgeQuotes.length === 0) return;
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % urgeQuotes.length);
    }, 7000);
    return () => clearInterval(quoteInterval);
  }, [isUrgeActive, urgeQuotes.length]);

  const triggerUrgeInterceptor = async () => {
    setIsUrgeActive(true);
    setUrgeTimer(90);
    setCurrentQuoteIndex(0);
    const defQuotes = [
      "Don't trade long-term goals for cheap dopamine. Breathe.",
      "Pain of discipline > Pain of regret.",
      "Your brain is lying to you right now. Stand your ground.",
      "You survived 100% of bad days. This will pass."
    ];
    setUrgeQuotes(defQuotes);
    if (profile.geminiKey) {
      try {
        const prompt = "Generate exactly 10 short, brutal motivational sentences (max 15 words) to stop streak break. Output JSON array of strings: [\"s1\", \"s2\"]";
        const rawJson = await callGeminiApi(
          profile.geminiKey,
          [{ role: "user", parts: [{ text: prompt }] }],
          "Respond strictly with a JSON array of strings.",
          true
        );
        const aiQuotes = extractJsonFromAiResponse<any>(rawJson, null);
        if (Array.isArray(aiQuotes) && aiQuotes.length > 0) {
          setUrgeQuotes(aiQuotes);
        } else if (typeof aiQuotes === "object" && aiQuotes !== null) {
          const firstVal = Object.values(aiQuotes)[0];
          if (Array.isArray(firstVal) && firstVal.length > 0) {
            setUrgeQuotes(firstVal as string[]);
          }
        }
      } catch (e) {
        console.error("AI Quote failed", e);
      }
    }
  };

  // ==========================================
  // HABIT RENDERERS
  // ==========================================
  const renderHabitHub = () => {
    return (
      <div className="space-y-4 sm:space-y-6 pb-10 animate-in fade-in zoom-in duration-300">
        {/* HERO PROFILE & METRICS CARD (SLEEK MOBILE-FIRST ARCHITECTURE) */}
        <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-2xl transition-all ${t.header} border ${t.borderAccent}`}>
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Profile Row */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
              <div className={`w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 rounded-2xl flex items-center justify-center overflow-hidden border shadow-md transition-transform hover:scale-105 ${t.borderAccent} ring-1 ring-current`}>
                {profile.dp ? (
                  <img src={profile.dp} alt="User DP" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl sm:text-3xl">{rankData.currentRank.badge}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className={`text-base sm:text-2xl font-black truncate tracking-tight ${t.textMain} ${t.fontHeading}`}>{profile.name}</h1>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <button
                    onClick={() => setIsRankRoadmapOpen(true)}
                    className={`text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${t.badge} ${t.fontHeading} tap-effect flex items-center gap-1 shadow-sm hover:scale-105 transition-transform`}
                    title="Click to view full 15-tier RPG Rank Progression Roadmap!"
                  >
                    <Crown size={10} /> Tier {rankData.currentRank.tier}: {rankData.currentRank.title}
                  </button>
                  <span className={`text-[9px] sm:text-xs font-bold uppercase tracking-wider ${t.textAccent} ${t.fontHeading}`}>
                    Level {rankData.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Total XP Badge */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsRankRoadmapOpen(true)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[9px] sm:text-xs font-bold border tap-effect ${t.cardInner} ${t.borderAccent}`}
              >
                {profile.xp || 0} XP
              </button>
            </div>
          </div>

          {/* Balanced 3-Column Metrics Grid (Guaranteed 0 horizontal overflow on mobile) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mt-3.5 pt-3 border-t border-current/15 relative z-10">
            {/* Star Counter Pill */}
            <div
              onClick={() => setHabitRoute("shop")}
              className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 border tap-effect cursor-pointer glow-gold-pulse ${t.cardInner} ${t.borderAccent}`}
              title="Reward Shop & Stars Wallet"
            >
              <span className="text-sm sm:text-2xl animate-float">⭐</span>
              <div className="min-w-0">
                <span className={`text-[11px] sm:text-lg font-black block leading-none ${t.textWarning} ${t.fontHeading}`}>{profile.stars}</span>
                <span className={`text-[6px] sm:text-[9px] font-bold uppercase tracking-wider block mt-0.5 ${t.textMuted}`}>Stars</span>
              </div>
            </div>

            {/* Streak Shields Pill */}
            <div
              onClick={() => setHabitRoute("shop")}
              className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 border tap-effect cursor-pointer ${t.cardInner} ${t.borderAccent}`}
              title="Streak Freeze Shields (Max 2 stored)"
            >
              <span className="text-sm sm:text-2xl">🛡️</span>
              <div className="min-w-0">
                <span className={`text-[11px] sm:text-lg font-black block leading-none ${t.textAccent} ${t.fontHeading}`}>
                  {profile.streakShields || 0}/2
                </span>
                <span className={`text-[6px] sm:text-[9px] font-bold uppercase tracking-wider block mt-0.5 ${t.textMuted}`}>Shields</span>
              </div>
            </div>

            {/* 1v1 PvP Arena Pill */}
            <div
              onClick={() => setIsBattleArenaOpen(true)}
              className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 border tap-effect cursor-pointer ${
                activeBattleRoom && activeBattleRoom.status === "active"
                  ? "bg-red-500/20 border-red-500 text-red-300 ring-1 ring-red-400/50 animate-pulse"
                  : `${t.cardInner} ${t.borderAccent}`
              }`}
              title="1v1 Discipline Battle Arena (Habit Wars)"
            >
              <span className="text-sm sm:text-2xl">⚔️</span>
              <div className="min-w-0">
                <span className={`text-[11px] sm:text-lg font-black block leading-none ${t.textAccent} ${t.fontHeading}`}>
                  {activeBattleRoom ? "WAR" : `${profile.battlesWon || 0}W`}
                </span>
                <span className={`text-[6px] sm:text-[9px] font-bold uppercase tracking-wider block mt-0.5 ${t.textMuted}`}>Arena</span>
              </div>
            </div>

            {/* Scheduled Classes & Meetings Quick Pill */}
            <div
              onClick={() => setIsScheduleModalOpen(true)}
              className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 border tap-effect cursor-pointer ${
                (brain.scheduledEvents || []).filter((e: ScheduledEvent) => e.date === todayStr && !e.completed).length > 0
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/50 animate-pulse"
                  : `${t.cardInner} ${t.borderAccent}`
              }`}
              title="Class & Meeting Dispatcher"
            >
              <span className="text-sm sm:text-2xl">📅</span>
              <div className="min-w-0">
                <span className={`text-[11px] sm:text-lg font-black block leading-none ${t.textAccent} ${t.fontHeading}`}>
                  {(brain.scheduledEvents || []).filter((e: ScheduledEvent) => !e.completed).length}
                </span>
                <span className={`text-[6px] sm:text-[9px] font-bold uppercase tracking-wider block mt-0.5 ${t.textMuted}`}>Schedule</span>
              </div>
            </div>
          </div>

          {/* Dynamic XP Progress Bar */}
          <div
            onClick={() => setIsRankRoadmapOpen(true)}
            className="mt-3 cursor-pointer group"
            title="Click to view RPG Rank Progression"
          >
            <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className={`flex items-center gap-1 ${t.textMain}`}>
                <Sparkles size={10} className={t.textAccent} /> Tier {rankData.currentRank.tier}: {rankData.currentRank.name}
              </span>
              {rankData.nextRank ? (
                <span className={t.textAccent}>
                  {rankData.xpNeededForNext} XP to {rankData.nextRank.badge} T{rankData.nextRank.tier} ({rankData.progressToNext}%)
                </span>
              ) : (
                <span className="text-emerald-400 font-black">👑 MAX RANK ACHIEVED</span>
              )}
            </div>
            <div className={`w-full h-1.5 sm:h-2 rounded-full overflow-hidden p-0.2 bg-black/40 border ${t.borderAccent}`}>
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out animate-shimmer ${t.btnPrimary}`}
                style={{ width: `${Math.max(4, rankData.progressToNext)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 🚨 TODAY'S SCHEDULED CLASSES & COMMITMENTS ALERT BANNER */}
        {(() => {
          const todaysActiveEvents: ScheduledEvent[] = (brain.scheduledEvents || []).filter(
            (e: ScheduledEvent) => e.date === todayStr && !e.completed
          );
          if (todaysActiveEvents.length === 0) return null;

          return (
            <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border border-amber-400/70 shadow-[0_0_25px_rgba(251,191,36,0.25)] space-y-2.5 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-black font-black text-[9px] sm:text-xs animate-bounce">
                    🚨 TODAY
                  </span>
                  <h3 className={`text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 ${t.fontHeading}`}>
                    Scheduled Today ({todaysActiveEvents.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-200 hover:text-white underline tap-effect"
                >
                  View All 📅
                </button>
              </div>

              <div className="space-y-2">
                {todaysActiveEvents.map((ev) => {
                  const catMeta = EVENT_CATEGORIES.find((c) => c.id === ev.category) || EVENT_CATEGORIES[0];
                  return (
                    <div
                      key={ev.id}
                      className="p-3 rounded-xl bg-black/60 border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-md"
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className="text-xl flex-shrink-0 mt-0.5">{catMeta.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${catMeta.badgeBg}`}>
                              {catMeta.label}
                            </span>
                            {ev.time && (
                              <span className="text-[8px] sm:text-[9px] font-bold text-amber-200 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                                <Clock size={10} /> {ev.time}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-white mt-1 truncate">
                            {ev.title}
                          </h4>
                          {ev.notes && (
                            <p className="text-[9px] sm:text-[10px] text-slate-300 line-clamp-1 mt-0.5 font-sans">
                              {ev.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => startFocusSession(ev.title, ev.id)}
                          className={`px-3 py-1.5 rounded-xl tap-effect text-[9px] sm:text-[10px] font-black uppercase flex items-center gap-1 shadow-sm ${t.btnWarning}`}
                        >
                          <Zap size={11} /> Focus ⚡
                        </button>
                        <button
                          onClick={() => toggleCompleteScheduledEvent(ev.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-[9px] sm:text-[10px] font-black uppercase tap-effect flex items-center gap-1"
                        >
                          <CheckCircle2 size={12} /> Attended ✅
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ACTION CARDS GRID (CLEAN 2-COLUMN MOBILE RESPONSIVE) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {/* Focus Chamber */}
          <button
            onClick={() => startFocusSession()}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className="flex items-center justify-between w-full mb-2 sm:mb-3">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md border ${t.card} ${t.borderAccent}`}>
                <Zap className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent} animate-pulse`} />
              </div>
              <span className={`text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full uppercase font-black ${t.badge}`}>+1⭐</span>
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Focus Chamber</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Pomodoro & Deep Work.</p>
            </div>
          </button>

          {/* Two-Box System */}
          <button
            onClick={() => setIsTwoBoxModalOpen(true)}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className="flex items-center justify-between w-full mb-2 sm:mb-3">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md border ${t.card} ${t.borderAccent}`}>
                <Layers className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
              </div>
              <span className={`text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full uppercase font-black ${isCleanupHourActive() ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' : t.badge}`}>
                {isCleanupHourActive() ? "9PM LIVE" : "2-BOX"}
              </span>
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Two-Box System</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Failures & Achievements.</p>
            </div>
          </button>

          {/* Enter Arena */}
          <button
            onClick={() => setHabitRoute("arena")}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Swords className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Level Map</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Daily calendar arena.</p>
            </div>
          </button>

          {/* Reward Shop */}
          <button
            onClick={() => setHabitRoute("shop")}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <ShoppingCart className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Reward Shop</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Spend earned stars.</p>
            </div>
          </button>

          {/* Performance Analytics */}
          <button
            onClick={() => setHabitRoute("analysis")}
            className={`col-span-2 sm:col-span-2 lg:col-span-1 p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex items-center gap-3 ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md border ${t.card} ${t.borderAccent}`}>
              <BarChart2 className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div className="min-w-0">
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Analytics & Heatmap</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} truncate`}>Streaks, ratios & weekly trends.</p>
            </div>
          </button>

          {/* AI Habit Coach */}
          <button
            onClick={() => setHabitRoute("coach")}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Bot className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>AI Coach</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Discipline mentor.</p>
            </div>
          </button>

          {/* Ongoing Plan */}
          <button
            onClick={() => setHabitRoute("plan")}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Briefcase className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Active Plan</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Perks & countdowns.</p>
            </div>
          </button>

          {/* ⚔️ 1v1 Battle Arena Action Card */}
          <button
            onClick={() => {
              playCombatSlashSound();
              setIsBattleArenaOpen(true);
            }}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${
              activeBattleRoom && activeBattleRoom.status === "active"
                ? "bg-red-950/40 border-red-500/70 text-red-200 ring-1 ring-red-400/50"
                : `${t.cardInner} hover:${t.borderAccent}`
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2 sm:mb-3">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md border ${t.card} ${t.borderAccent} bg-red-500/10 text-red-400`}>
                <Swords className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full font-black ${
                activeBattleRoom ? "bg-red-500 text-white animate-pulse" : t.badge
              }`}>
                {activeBattleRoom ? "LIVE WAR" : "1v1 PvP"}
              </span>
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading} flex items-center gap-1`}>
                Battle Arena <Flame size={12} className="text-red-400" />
              </h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>1000 HP habit wars.</p>
            </div>
          </button>

          {/* Schedule Dispatcher */}
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className="flex items-center justify-between w-full mb-2 sm:mb-3">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md border ${t.card} ${t.borderAccent}`}>
                <CalendarDays className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
              </div>
              {(brain.scheduledEvents || []).filter((e: ScheduledEvent) => !e.completed).length > 0 && (
                <span className={`text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full font-black ${t.badge}`}>
                  {(brain.scheduledEvents || []).filter((e: ScheduledEvent) => !e.completed).length}
                </span>
              )}
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Dispatcher</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Classes & meetings.</p>
            </div>
          </button>

          {/* Data Vault */}
          <button
            onClick={() => setHabitRoute("vault")}
            className={`p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex flex-col justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Download className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div>
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Data Vault</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>Backup & export.</p>
            </div>
          </button>

          {/* Command Center */}
          <button
            onClick={() => setHabitRoute("settings")}
            className={`col-span-2 sm:col-span-1 p-3.5 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg border flex items-center gap-3 ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Settings className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <div className="min-w-0">
              <h3 className={`text-xs sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Command Center</h3>
              <p className={`text-[8px] sm:text-xs mt-0.5 ${t.textMuted} truncate`}>Themes, tasks & keys.</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const renderHabitArena = () => {
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <div className="space-y-6 pb-20 max-w-xl mx-auto animate-in fade-in duration-300">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
          <button onClick={() => setHabitRoute("hub")} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><Swords className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Level Map</h2>
        </div>

        {isEraserActive && (
          <div className="bg-red-900/80 text-white font-bold p-3.5 sm:p-4 text-[10px] sm:text-sm text-center rounded-2xl border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
            🧽 THE ERASER ARMED: Click on any past date marked with <span className="text-red-300 bg-red-950 px-1.5 py-0.5 rounded-md font-black mx-1">FIX</span> to rewrite history.
          </div>
        )}

        <div className={`p-4 sm:p-6 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); } else setCalMonth((m) => m - 1); }} className={`p-2 sm:p-2.5 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <h2 className={`text-sm sm:text-lg font-black uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>{monthNames[calMonth]} {calYear}</h2>
            <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); } else setCalMonth((m) => m + 1); }} className={`p-2 sm:p-2.5 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          </div>

          <div className={`grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-xs font-bold mb-2 sm:mb-3 ${t.textMuted} ${t.fontHeading}`}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isDayToday = dateStr === todayStr; const isFuture = dateStr > todayStr; const isPast = dateStr < todayStr;
              const dayData = trackerData[dateStr];

              let bgColor = t.cardInner.split(' ')[0] + ' opacity-60';
              let textColor = t.textMuted; let borderClass = 'border border-white/5';
              let hasFailure = false;

              if (dayData && dayData.tasks) {
                const vals = Object.values(dayData.tasks);
                if (vals.length > 0) {
                  const t4Failed = dayData.tasks.t4 === "O";
                  const snapshotUsed = dayData.taskSnapshot || profile.customTasks || DEFAULT_TASKS;
                  const totalPossible = snapshotUsed.length;
                  const xCount = vals.filter((v: any) => v === "X").length;
                  const majority = Math.floor(totalPossible / 2) + 1;

                  if (vals.includes("O")) hasFailure = true;

                  if (t4Failed) { bgColor = "bg-red-500/20"; borderClass = "border border-red-500/60"; textColor = "text-red-400 font-bold"; }
                  else {
                    if (xCount >= majority) { bgColor = "bg-green-500/20"; borderClass = "border border-green-500/60 shadow-[0_0_10px_rgba(34,197,94,0.3)]"; textColor = "text-green-400 font-black"; }
                    else { bgColor = "bg-red-500/20"; borderClass = "border border-red-500/60"; textColor = "text-red-400 font-bold"; }
                  }
                }
              }

              if (isDayToday) { bgColor = t.btnPrimary.split(' ')[0]; borderClass = `border-2 ${t.borderAccent} ring-2 ring-yellow-400/50 shadow-lg`; textColor = "text-white font-black"; }
              const showFixBadge = isEraserActive && hasFailure && isPast;

              return (
                <button
                  key={day} disabled={isFuture && !showFixBadge}
                  onClick={() => {
                    if (isFuture) return;
                    if (isPast) {
                      const isBlank = !dayData || !dayData.tasks || Object.keys(dayData.tasks).length === 0;
                      if (isBlank) setUnlockedBlankDate(dateStr); else setUnlockedBlankDate(null);
                    } else setUnlockedBlankDate(null);
                    setSelectedDate(dateStr); setHabitRoute("tracker");
                  }}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 ${t.fontHeading} ${isFuture ? "opacity-25 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95 tap-effect"} ${bgColor} ${borderClass} ${textColor} ${showFixBadge ? "ring-2 ring-red-500 scale-105 z-10" : ""}`}
                >
                  {showFixBadge && <span className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 text-[7px] sm:text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full animate-pulse z-20">FIX</span>}
                  {dayData && dayData.star && <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-[8px] sm:text-[10px] text-yellow-400">★</span>}
                  <span className="text-[10px] sm:text-sm z-10">{day}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => { setSelectedDate(todayStr); const [y, m] = todayStr.split("-"); setCalYear(parseInt(y)); setCalMonth(parseInt(m) - 1); setUnlockedBlankDate(null); setHabitRoute("tracker"); }} className={`w-full mt-5 sm:mt-7 py-3 text-[10px] sm:text-sm tap-effect rounded-2xl flex justify-center items-center font-black uppercase tracking-wider ${t.btnPrimary} ${t.fontHeading}`}>JUMP TO TODAY'S LEVEL</button>
        </div>
      </div>
    );
  };

  const renderHabitTracker = () => {
    const isToday = selectedDate === todayStr; const isPast = selectedDate < todayStr;
    const isBlankDayUnlocked = isPast && unlockedBlankDate === selectedDate;
    const currentDayData = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "", taskSnapshot: null };

    let activeTasksToDisplay = (isToday || isBlankDayUnlocked) ? (profile.customTasks || DEFAULT_TASKS) : (currentDayData.taskSnapshot || DEFAULT_TASKS);
    const currentTaskVals = Object.values(currentDayData.tasks);
    const xCount = currentTaskVals.filter((v: any) => v === "X").length;
    const maxTasks = activeTasksToDisplay.length;
    const progressPercent = Math.round((xCount / maxTasks) * 100) || 0;

    const t4FailedTracker = currentDayData.tasks?.t4 === "O";
    const majorityTracker = Math.floor(maxTasks / 2) + 1;
    let progressColor = "bg-gray-500/50";
    if (currentTaskVals.length > 0) {
      if (t4FailedTracker) progressColor = "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
      else progressColor = xCount >= majorityTracker ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" : "bg-red-500";
    }

    return (
      <div className="space-y-6 pb-20 max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
          <button onClick={() => { setHabitRoute("arena"); setUnlockedBlankDate(null); }} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          <h2 className={`text-lg sm:text-2xl font-black ${t.textMain} ${t.fontHeading}`}>{selectedDate}</h2>
          {isToday && <span className={`text-[8px] sm:text-[10px] px-2.5 py-1 font-black tracking-widest uppercase rounded-full ${t.badge} ${t.textAccent} ${t.fontHeading}`}>Active Level</span>}
        </div>

        <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${isPunished ? 'border-red-500/60 bg-red-950/20' : t.borderAccent}`}>
          {/* Progress Header */}
          <div className="mb-5 sm:mb-6">
            <div className={`flex justify-between text-[10px] sm:text-xs font-black mb-2 uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>
              <span className={`flex items-center gap-1.5 ${t.textMuted}`}><Target size={14} className={t.textAccent} /> Daily Completion</span>
              <span className={t.textAccent}>{xCount} / {maxTasks} ({progressPercent}%)</span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${t.cardInner} ${t.borderAccent}`}>
              <div className={`h-full rounded-full transition-all duration-700 ease-out ${progressColor}`} style={{ width: `${Math.max(3, progressPercent)}%` }}></div>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {activeTasksToDisplay.map((task: any) => {
              const status = currentDayData.tasks[task.id];
              const canInteract = isToday || (isPast && isEraserActive && status === "O") || isBlankDayUnlocked;
              const displayTitle = isPunished ? `${task.title} (PUNISHED)` : task.title;
              let taskBg = status === "X" ? "bg-green-500/10 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : status === "O" ? "bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : `${t.cardInner} border-white/5`;

              return (
                <div key={task.id} className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all hover:scale-[1.01] ${taskBg}`}>
                  <div className="pr-3">
                    <h3 className={`text-xs sm:text-sm font-black ${isPunished ? 'text-red-400' : t.textMain} ${t.fontHeading}`}>{displayTitle}</h3>
                    <p className={`text-[9px] sm:text-xs mt-0.5 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>{task.desc}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleTaskClick(task.id, "X", activeTasksToDisplay)}
                      disabled={!canInteract}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all tap-effect border ${t.cardInner} ${status === "X" ? "bg-green-500 text-white border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-105" : t.textMuted} ${!canInteract && status !== "X" ? "opacity-30 cursor-not-allowed" : "hover:border-green-400"}`}
                    >
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                    </button>
                    <button
                      onClick={() => handleTaskClick(task.id, "O", activeTasksToDisplay)}
                      disabled={!(isToday || isBlankDayUnlocked)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all tap-effect border ${t.cardInner} ${status === "O" ? "bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105" : t.textMuted} ${!(isToday || isBlankDayUnlocked) && status !== "O" ? "opacity-30 cursor-not-allowed" : "hover:border-red-400"}`}
                    >
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Willpower Star Claim Box */}
          <div className={`mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${t.cardInner} ${currentDayData.star ? 'border-yellow-400 bg-yellow-400/10 glow-gold-pulse' : 'border-white/10'}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-float">⭐</span>
              <div>
                <h3 className={`text-xs sm:text-sm font-black ${t.textMain} ${t.fontHeading}`}>Willpower Star</h3>
                <p className={`text-[9px] sm:text-xs mt-0.5 ${t.textMuted} ${t.fontHeading}`}>Crushed an urge today? Claim +1 Star.</p>
              </div>
            </div>
            <button
              onClick={() => handleStarClick(activeTasksToDisplay)}
              disabled={!(isToday || isBlankDayUnlocked)}
              className={`w-full sm:w-auto px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-wider uppercase rounded-xl transition-all tap-effect ${currentDayData.star ? 'bg-yellow-400 text-black border-2 border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.6)]' : t.btnWarning} ${!(isToday || isBlankDayUnlocked) && "opacity-50"} ${t.fontHeading}`}
            >
              {currentDayData.star ? "CLAIMED ★" : "CLAIM +1 ★"}
            </button>
          </div>
        </div>

        {/* Daily Summary Card */}
        <div className={`p-4 sm:p-6 rounded-3xl shadow-xl border ${t.cardInner} ${t.borderAccent}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-black flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider ${t.textAccent} ${t.fontHeading}`}><BookOpen size={16} /> Daily Reflection & Notes</h3>
            <button onClick={() => { saveDayData(selectedDate, currentDayData.tasks, currentDayData.reasonForO, summaryInput, currentDayData.star, activeTasksToDisplay); showMessage("Summary Saved! 📝"); }} disabled={!(isToday || isBlankDayUnlocked)} className={`px-3 py-1.5 text-[9px] sm:text-xs font-black uppercase rounded-lg tap-effect ${t.btnPrimary} ${t.fontHeading}`}>SAVE</button>
          </div>
          <textarea disabled={!(isToday || isBlankDayUnlocked)} value={summaryInput} onChange={(e) => setSummaryInput(e.target.value)} onBlur={() => saveDayData(selectedDate, currentDayData.tasks, currentDayData.reasonForO, summaryInput, currentDayData.star, activeTasksToDisplay)} placeholder="Write your thoughts, victory or confession for this level..." className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} rows={3} />
        </div>
      </div>
    );
  };

  const renderShop = () => (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
        <button onClick={() => setHabitRoute("hub")} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><ShoppingCart className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Reward Shop</h2>
      </div>

      <div className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-xl border glow-gold-pulse ${t.cardInner} ${t.borderAccent}`}>
        <div>
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest block ${t.textMuted} ${t.fontHeading}`}>Available Stars Balance:</span>
          <span className={`text-[9px] sm:text-[10px] ${t.textMuted}`}>Earn stars by completing full day levels</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl animate-float">⭐</span>
          <span className={`font-black text-2xl sm:text-3xl ${t.textWarning} ${t.fontHeading}`}>{profile.stars}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {ensureShopItems(profile.customShopItems).map((item: any) => (
          <div key={item.id} className={`p-5 sm:p-6 rounded-3xl flex flex-col justify-between transition-all shadow-xl border tap-effect hover-lift ${t.cardInner} hover:${t.borderAccent}`}>
            <div className="flex items-start gap-4 mb-4">
              <span className={`text-3xl sm:text-4xl p-3 rounded-2xl shadow-md border ${t.card} ${t.borderAccent}`}>{item.icon}</span>
              <div>
                <h3 className={`font-black text-sm sm:text-lg ${t.textMain} ${t.fontHeading}`}>{item.name}</h3>
                <p className={`text-[10px] sm:text-xs mt-1 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>{item.desc}</p>
                <span className={`text-[8px] sm:text-[10px] font-black mt-2 inline-block px-2 py-0.5 rounded-full uppercase tracking-widest ${t.badge} ${t.textAccent} ${t.fontHeading}`}>Valid {item.expiryHours} Hrs</span>
              </div>
            </div>
            <button onClick={() => buyItem(item)} className={`w-full py-3 text-xs sm:text-sm font-black rounded-2xl flex items-center justify-center gap-2 group tap-effect shadow-md uppercase tracking-wider ${t.btnPrimary} ${t.fontHeading}`}>
              <span>BUY FOR {item.cost}</span>
              <span className="group-hover:scale-125 transition-transform">⭐</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalysis = () => {
    const weeklyData = getWeeklyData(weekOffset);
    const weekStart = weeklyData[0]?.date || "";
    const weekEnd = weeklyData[6]?.date || "";

    // 1. 60-Day Heatmap Calculation
    const heatmapDays: any[] = [];
    const todayObj = new Date(todayStr + "T00:00:00");
    let totalTrackedDays = 0;
    let totalPerfectDays = 0;
    let totalWinsCount = 0;
    let totalTasksEvaluated = 0;

    for (let i = 59; i >= 0; i--) {
      const d = new Date(todayObj);
      d.setDate(d.getDate() - i);
      const dStr = formatDate(d);
      const data = trackerData[dStr];
      const activeTasks = data?.taskSnapshot || profile.customTasks || DEFAULT_TASKS;
      const total = activeTasks.length;

      let xCount = 0;
      let oCount = 0;
      let isLogged = false;

      if (data && data.tasks && Object.keys(data.tasks).length > 0) {
        isLogged = true;
        totalTrackedDays++;
        const vals = Object.values(data.tasks);
        xCount = vals.filter((v) => v === "X").length;
        oCount = vals.filter((v) => v === "O").length;
        totalWinsCount += xCount;
        totalTasksEvaluated += total;
        if (xCount === total && oCount === 0) totalPerfectDays++;
      }

      const score = total > 0 && isLogged ? Math.round((xCount / total) * 100) : 0;
      const isPerfect = isLogged && xCount === total && oCount === 0;
      const isFailed = isLogged && (oCount > 0 || (xCount < total && xCount > 0));
      const hasShield = data?.shieldProtected;

      heatmapDays.push({
        date: dStr,
        dayOfWeek: d.toLocaleDateString("en-US", { weekday: "narrow" }),
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString("en-US", { month: "short" }),
        isToday: dStr === todayStr,
        isLogged,
        score,
        xCount,
        total,
        isPerfect,
        isFailed,
        hasShield,
        note: data?.notes || data?.reasonForO || ""
      });
    }

    const consistencyRate = totalTasksEvaluated > 0 ? Math.round((totalWinsCount / totalTasksEvaluated) * 100) : 0;

    // 2. Habit-by-Habit Win-Rate Matrix
    const habitStats = (profile.customTasks || DEFAULT_TASKS).map((task: any) => {
      let taskTotal = 0;
      let taskWins = 0;
      Object.keys(trackerData).forEach((dateKey) => {
        const dayData = trackerData[dateKey];
        if (dayData && dayData.tasks && dayData.tasks[task.id] !== undefined) {
          taskTotal++;
          if (dayData.tasks[task.id] === "X") taskWins++;
        }
      });
      const winRate = taskTotal > 0 ? Math.round((taskWins / taskTotal) * 100) : 0;
      return {
        ...task,
        total: taskTotal,
        wins: taskWins,
        winRate
      };
    }).sort((a: any, b: any) => b.winRate - a.winRate);

    const mvpHabit = habitStats.length > 0 && habitStats[0].total > 0 ? habitStats[0] : null;
    const lowestHabit = habitStats.length > 1 && habitStats[habitStats.length - 1].total > 0 ? habitStats[habitStats.length - 1] : null;

    // 3. Deep Work & Focus Metrics
    const totalFocusMinutes = profile.totalFocusMinutes || 0;
    const focusHours = Math.floor(totalFocusMinutes / 60);
    const focusRemainingMins = totalFocusMinutes % 60;
    const estimatedSessions = Math.max(1, Math.ceil(totalFocusMinutes / 25));

    return (
      <div className="space-y-6 pb-20 max-w-4xl mx-auto animate-in fade-in duration-300">
        {/* Header with Rank Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 sm:mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setHabitRoute("hub")} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div>
              <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                <BarChart2 className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Advanced Analytics Hub
              </h2>
              <p className={`text-[10px] sm:text-xs ${t.textMuted} font-medium`}>
                Deep Intelligence • Consistency Heatmaps • Rank Mastery
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRankRoadmapOpen(true)}
            className={`self-start sm:self-auto px-3.5 py-2 rounded-2xl border flex items-center gap-2 tap-effect shadow-lg ${t.cardInner} hover:${t.borderAccent}`}
          >
            <span className="text-xl">{rankData.currentRank.badge}</span>
            <div className="text-left">
              <span className={`text-xs font-black block leading-none ${t.textAccent} ${t.fontHeading}`}>
                Tier {rankData.currentRank.tier}: {rankData.currentRank.name}
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Lv {rankData.level} • {profile.xp || 0} XP
              </span>
            </div>
            <Crown size={14} className="text-amber-400 ml-1" />
          </button>
        </div>

        {/* 4-TAB NAVIGATION BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setAnalyticsTab("heatmap")}
            className={`py-2.5 px-3 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all tap-effect flex items-center justify-center gap-1.5 ${
              analyticsTab === "heatmap"
                ? `${t.btnPrimary} shadow-lg shadow-current/20 scale-[1.02]`
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <CalendarIcon size={14} /> Heatmap & Streaks
          </button>

          <button
            onClick={() => setAnalyticsTab("focus")}
            className={`py-2.5 px-3 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all tap-effect flex items-center justify-center gap-1.5 ${
              analyticsTab === "focus"
                ? `${t.btnPrimary} shadow-lg shadow-current/20 scale-[1.02]`
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Zap size={14} /> Deep Work Intel
          </button>

          <button
            onClick={() => setAnalyticsTab("habits")}
            className={`py-2.5 px-3 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all tap-effect flex items-center justify-center gap-1.5 ${
              analyticsTab === "habits"
                ? `${t.btnPrimary} shadow-lg shadow-current/20 scale-[1.02]`
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Target size={14} /> Habit Matrix
          </button>

          <button
            onClick={() => setAnalyticsTab("economy")}
            className={`py-2.5 px-3 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all tap-effect flex items-center justify-center gap-1.5 ${
              analyticsTab === "economy"
                ? `${t.btnPrimary} shadow-lg shadow-current/20 scale-[1.02]`
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TrendingUp size={14} /> XP & Economy
          </button>
        </div>

        {/* TAB 1: 🗓️ HEATMAP & CONSISTENCY */}
        {analyticsTab === "heatmap" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 4 STREAK & CONSISTENCY KPI TILES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className={`p-4 sm:p-5 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-orange-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-orange-500"><Flame size={75} /></div>
                <span className="text-orange-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[9px] sm:text-xs">
                  <Flame size={14} className="animate-pulse" /> Perfect Streak
                </span>
                <span className={`text-2xl sm:text-4xl font-black tracking-tight ${t.textMain}`}>
                  {streaks.perfect} <span className={`text-xs sm:text-sm font-normal ${t.textMuted}`}>days</span>
                </span>
              </div>

              <div className={`p-4 sm:p-5 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-blue-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-blue-500"><Target size={75} /></div>
                <span className="text-blue-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[9px] sm:text-xs">
                  <Target size={14} /> Deep Study
                </span>
                <span className={`text-2xl sm:text-4xl font-black tracking-tight ${t.textMain}`}>
                  {streaks.study} <span className={`text-xs sm:text-sm font-normal ${t.textMuted}`}>days</span>
                </span>
              </div>

              <div className={`p-4 sm:p-5 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-yellow-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-yellow-500"><Shield size={75} /></div>
                <span className="text-yellow-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[9px] sm:text-xs">
                  <Shield size={14} /> Trigger Free
                </span>
                <span className={`text-2xl sm:text-4xl font-black tracking-tight ${t.textMain}`}>
                  {streaks.trigger} <span className={`text-xs sm:text-sm font-normal ${t.textMuted}`}>days</span>
                </span>
              </div>

              <div className={`p-4 sm:p-5 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-emerald-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-emerald-500"><CheckCircle2 size={75} /></div>
                <span className="text-emerald-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[9px] sm:text-xs">
                  <CheckCircle2 size={14} /> 60d Win Rate
                </span>
                <span className={`text-2xl sm:text-4xl font-black tracking-tight ${t.textMain}`}>
                  {consistencyRate}%
                </span>
              </div>
            </div>

            {/* 60-DAY CONTRIBUTION HEATMAP GRID */}
            <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-3 border-current/20">
                <div>
                  <h3 className={`font-black text-sm sm:text-base flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                    <CalendarIcon size={16} className={t.textAccent} /> 60-Day Habit Execution Heatmap
                  </h3>
                  <p className={`text-[10px] sm:text-xs ${t.textMuted}`}>
                    Interactive grid • Tap/hover any cell to view daily victory details
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span>{totalPerfectDays} Perfect Days</span> • <span>{totalTrackedDays} Tracked</span>
                </div>
              </div>

              {/* Heatmap Cell Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1.5 sm:gap-2 p-2 rounded-2xl bg-black/30 border border-white/5">
                {heatmapDays.map((day, idx) => {
                  let cellBg = "bg-white/5 border border-white/10 hover:border-white/30";
                  if (day.isPerfect) {
                    cellBg = "bg-emerald-500 text-black border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)] font-black";
                  } else if (day.score >= 50) {
                    cellBg = "bg-amber-400 text-black border border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.6)] font-bold";
                  } else if (day.isFailed) {
                    cellBg = "bg-rose-600 text-white border border-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.6)] font-bold";
                  } else if (day.hasShield) {
                    cellBg = "bg-sky-500 text-black border border-sky-300 shadow-[0_0_8px_rgba(14,165,233,0.7)] font-bold";
                  }

                  return (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHoveredHeatmapDay(day)}
                      onClick={() => setHoveredHeatmapDay(day)}
                      className={`h-9 sm:h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 tap-effect group relative ${cellBg} ${
                        day.isToday ? "ring-2 ring-amber-400 ring-offset-1 ring-offset-black scale-105" : "hover:scale-110 hover:z-10"
                      }`}
                    >
                      <span className="text-[9px] sm:text-[10px] font-mono leading-none">
                        {day.dayNum}
                      </span>
                      <span className="text-[7px] sm:text-[8px] opacity-80 uppercase leading-none mt-0.5">
                        {day.monthName}
                      </span>
                      {day.hasShield && (
                        <span className="absolute -top-1 -right-1 text-[9px]">🛡️</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Interactive Tooltip Card for Selected / Hovered Day */}
              {hoveredHeatmapDay && (
                <div className={`mt-4 p-3.5 sm:p-4 rounded-2xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150 ${t.cardInner} ${t.borderAccent}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black text-amber-300 font-mono">
                        📅 {hoveredHeatmapDay.date} ({hoveredHeatmapDay.dayName})
                      </span>
                      {hoveredHeatmapDay.isToday && (
                        <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black">
                          TODAY
                        </span>
                      )}
                      {hoveredHeatmapDay.hasShield && (
                        <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40">
                          🛡️ SHIELD PROTECTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">
                      Score: <strong className={hoveredHeatmapDay.score === 100 ? "text-emerald-400" : hoveredHeatmapDay.score >= 50 ? "text-amber-300" : "text-rose-400"}>{hoveredHeatmapDay.score}%</strong> • Wins: <strong>{hoveredHeatmapDay.xCount} / {hoveredHeatmapDay.total}</strong> Tasks
                    </p>
                    {hoveredHeatmapDay.note && (
                      <p className="text-[11px] text-slate-400 italic line-clamp-1">
                        "{hoveredHeatmapDay.note}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDate(hoveredHeatmapDay.date);
                      setHabitRoute("tracker");
                    }}
                    className={`self-start sm:self-auto py-2 px-3 text-[10px] sm:text-xs rounded-xl font-black uppercase tracking-wider tap-effect ${t.btnPrimary}`}
                  >
                    Open Day Details ➔
                  </button>
                </div>
              )}

              {/* Legend */}
              <div className={`mt-5 flex flex-wrap justify-center gap-3 sm:gap-5 text-[10px] font-black border-t pt-3.5 ${t.textMuted} border-current/20`}>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-md shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div> 100% Perfect</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-amber-400 rounded-md shadow-[0_0_6px_rgba(251,191,36,0.8)]"></div> &ge;50% Win</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-600 rounded-md shadow-[0_0_6px_rgba(225,29,72,0.8)]"></div> Missed / Drop</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-sky-500 rounded-md"></div> 🛡️ Shield Used</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-md bg-white/10 border border-white/10"></div> Untracked</span>
              </div>
            </div>

            {/* WEEKLY PERFORMANCE TREND BAR CHART */}
            <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
              <div className={`flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 gap-4 border-b pb-4 ${t.borderAccent}`}>
                <div>
                  <h3 className={`font-black text-sm sm:text-lg flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                    Weekly Target Clearance
                  </h3>
                  <p className={`text-[10px] sm:text-xs mt-0.5 ${t.textMuted}`}>7-day precision breakdown</p>
                </div>
                <div className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                  <button onClick={() => setWeekOffset((prev) => prev + 1)} className={`p-2 tap-effect rounded-xl flex items-center gap-1 text-[9px] sm:text-xs font-black ${t.btnWarning} ${t.fontHeading}`}>
                    <ChevronLeft size={16} /> PAST
                  </button>
                  <div className="text-center min-w-[110px] sm:min-w-[130px]">
                    <p className={`text-[9px] sm:text-xs font-black tracking-wider ${t.textMain} ${t.fontHeading}`}>
                      {weekStart} <br /><span className={t.textMuted}>to</span><br /> {weekEnd}
                    </p>
                  </div>
                  <button onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))} disabled={weekOffset === 0} className={`p-2 tap-effect rounded-xl flex items-center gap-1 text-[9px] sm:text-xs font-black ${weekOffset === 0 ? "opacity-30 cursor-not-allowed" : ""} ${t.btnWarning} ${t.fontHeading}`}>
                    NEXT <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end h-52 sm:h-64 mb-4 gap-2 sm:gap-4 px-1 sm:px-6">
                {weeklyData.map((day: any, i: any) => {
                  let barColor = t.cardInner.split(' ')[0] + " opacity-50";
                  if (day.perfect) barColor = "bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.8)]";
                  else if (day.failed) barColor = "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]";
                  else if (day.percent > 0) barColor = "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]";

                  return (
                    <div key={i} className="flex flex-col items-center w-full group relative h-full justify-end">
                      <div className={`opacity-0 group-hover:opacity-100 absolute bottom-[calc(100%+12px)] p-2.5 rounded-xl border pointer-events-none transition-all z-20 whitespace-nowrap shadow-2xl text-[9px] sm:text-xs ${t.cardInner} ${t.textMain} ${t.borderAccent}`}>
                        <span className="block font-black text-center mb-1 border-b border-current opacity-60 pb-1">{day.date}</span>
                        <span className="font-bold">Score: {day.percent}%</span><br />
                        <span className="text-[9px] opacity-80">Wins: {day.xCount} / {day.total} tasks</span>
                      </div>
                      <span className={`text-[9px] sm:text-xs mb-2 font-black ${t.textMuted}`}>{day.percent}%</span>
                      <div className={`w-full max-w-[32px] sm:max-w-[48px] rounded-t-2xl relative flex justify-end flex-col overflow-hidden h-[80%] border-b-2 ${t.borderAccent} ${t.cardInner}`}>
                        <div className={`w-full rounded-t-2xl transition-all duration-700 ease-out ${barColor}`} style={{ height: `${day.percent}%`, minHeight: day.percent > 0 ? "6px" : "0" }}></div>
                      </div>
                      <span className={`text-[8px] sm:text-xs mt-2.5 sm:mt-3 font-black uppercase tracking-widest ${day.date === todayStr ? t.badge + " px-2 py-0.5 rounded-full" : t.textMuted}`}>{day.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ⏱️ DEEP WORK INTELLIGENCE */}
        {analyticsTab === "focus" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* FOCUS STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div className={`p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-cyan-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-cyan-500"><Clock size={90} /></div>
                <span className="text-cyan-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px] sm:text-xs">
                  <Clock size={15} /> Total Deep Work
                </span>
                <span className={`text-3xl sm:text-4xl font-black tracking-tight ${t.textMain}`}>
                  {focusHours}h {focusRemainingMins}m
                </span>
                <span className={`block text-[10px] mt-1 ${t.textMuted} font-bold`}>
                  {totalFocusMinutes} Total Minutes Logged
                </span>
              </div>

              <div className={`p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-purple-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-purple-500"><Zap size={90} /></div>
                <span className="text-purple-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px] sm:text-xs">
                  <Zap size={15} /> Focus Sessions
                </span>
                <span className={`text-3xl sm:text-4xl font-black tracking-tight ${t.textMain}`}>
                  {estimatedSessions} <span className={`text-xs sm:text-sm font-normal ${t.textMuted}`}>completed</span>
                </span>
                <span className={`block text-[10px] mt-1 ${t.textMuted} font-bold`}>
                  Pomodoro & Deep Flow Cycles
                </span>
              </div>

              <div className={`p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border border-amber-500/40 hover-lift`}>
                <div className="absolute -right-3 -bottom-3 opacity-10 text-amber-500"><Award size={90} /></div>
                <span className="text-amber-400 font-black flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px] sm:text-xs">
                  <Award size={15} /> Focus Stars Yield
                </span>
                <span className={`text-3xl sm:text-4xl font-black tracking-tight ${t.textWarning}`}>
                  +{estimatedSessions * 1} ⭐
                </span>
                <span className={`block text-[10px] mt-1 ${t.textMuted} font-bold`}>
                  +{estimatedSessions * 50} XP Earned
                </span>
              </div>
            </div>

            {/* SECOND BRAIN SYNC & LAUNCH CTA */}
            <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent} flex flex-col sm:flex-row items-center justify-between gap-5`}>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${t.badge} inline-block`}>
                  DEEP FLOW PROTOCOL
                </span>
                <h3 className={`text-lg sm:text-xl font-black ${t.textMain} ${t.fontHeading}`}>
                  Ready for your next high-intensity session?
                </h3>
                <p className={`text-xs ${t.textMuted} max-w-md`}>
                  Launch Focus Chamber with Pomodoro (25m), Deep Flow (50m), or Custom Timer. Auto-awards stars & XP upon completion.
                </p>
              </div>

              <button
                onClick={() => startFocusSession()}
                className={`py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider tap-effect shadow-xl flex items-center gap-2 flex-shrink-0 ${t.btnPrimary}`}
              >
                <Zap size={16} className="animate-pulse" /> Launch Focus Chamber
              </button>
            </div>

            {/* STAGING & ACTIVE TOPIC STUDY TARGETS */}
            <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent} space-y-4`}>
              <h3 className={`font-black text-sm sm:text-base flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                <Layers size={16} className={t.textAccent} /> Active Knowledge Targets & Chapters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {brain.stagingTopics.slice(0, 4).map((topic: any, idx: number) => (
                  <div key={topic.id} className={`p-4 rounded-2xl border flex items-center justify-between ${t.cardInner} ${t.borderAccent}`}>
                    <div className="min-w-0 pr-2">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold block">
                        {topic.category}
                      </span>
                      <h4 className={`text-xs font-black truncate ${t.textMain}`}>
                        {topic.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => startFocusSession(topic.title, undefined, topic.id)}
                      className={`p-2 rounded-xl text-[10px] font-black uppercase tap-effect flex-shrink-0 ${t.btnWarning}`}
                    >
                      Focus
                    </button>
                  </div>
                ))}
                {brain.stagingTopics.length === 0 && (
                  <div className="col-span-2 text-center py-6 text-xs text-slate-400">
                    No active staging chapters. Add chapters in Second Brain to track deep focus!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 🎯 HABIT MATRIX */}
        {analyticsTab === "habits" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* MVP HABIT & FOCUS NEEDED HIGHLIGHT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {mvpHabit && (
                <div className={`p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border-2 border-emerald-500/50 hover-lift`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Crown size={14} /> 👑 MVP Habit of the Arena
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      {mvpHabit.winRate}% WIN
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-xl font-black ${t.textMain} ${t.fontHeading}`}>
                    {mvpHabit.title}
                  </h3>
                  <p className={`text-xs ${t.textMuted} mt-1`}>
                    {mvpHabit.desc} • Cleared {mvpHabit.wins} out of {mvpHabit.total} tracked days.
                  </p>
                </div>
              )}

              {lowestHabit && (
                <div className={`p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-xl ${t.cardInner} border-2 border-rose-500/50 hover-lift`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle size={14} /> ⚠️ Growth Target Needed
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">
                      {lowestHabit.winRate}% WIN
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-xl font-black ${t.textMain} ${t.fontHeading}`}>
                    {lowestHabit.title}
                  </h3>
                  <p className={`text-xs ${t.textMuted} mt-1`}>
                    {lowestHabit.desc} • Needs extra focus to prevent streak drop-offs.
                  </p>
                </div>
              )}
            </div>

            {/* FULL TASK RANKING TABLE WITH METERS */}
            <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
              <h3 className={`font-black text-sm sm:text-base mb-4 flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                <Target size={16} className={t.textAccent} /> Complete Habit Win-Rate Matrix
              </h3>

              <div className="space-y-3">
                {habitStats.map((h: any, idx: number) => (
                  <div key={h.id} className={`p-4 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-slate-400 w-5">
                          #{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className={`text-xs sm:text-sm font-black truncate ${t.textMain}`}>
                            {h.title}
                          </h4>
                          <p className={`text-[10px] ${t.textMuted} truncate`}>
                            {h.desc}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <span className={`text-xs sm:text-sm font-black font-mono ${
                          h.winRate >= 80 ? "text-emerald-400" : h.winRate >= 50 ? "text-amber-300" : "text-rose-400"
                        }`}>
                          {h.winRate}%
                        </span>
                        <span className="block text-[9px] text-slate-400">
                          {h.wins}/{h.total} days
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full overflow-hidden bg-black/50 border border-white/10">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          h.winRate >= 80 ? "bg-emerald-500" : h.winRate >= 50 ? "bg-amber-400" : "bg-rose-500"
                        }`}
                        style={{ width: `${Math.max(4, h.winRate)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 📈 XP & ECONOMY VELOCITY */}
        {analyticsTab === "economy" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* CURRENT RPG RANK PRESTIGE SPOTLIGHT */}
            <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl border-2 ${t.borderAccent} relative overflow-hidden`} style={{ backgroundColor: "#0b1120" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/60 border-2 border-white/20 flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
                    {rankData.currentRank.badge}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      TIER {rankData.currentRank.tier} OF 15
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-black mt-1 ${rankData.currentRank.color} ${t.fontHeading}`}>
                      {rankData.currentRank.name}
                    </h3>
                    <p className="text-xs text-slate-300 italic mt-0.5">
                      "{rankData.currentRank.lore}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsRankRoadmapOpen(true)}
                  className={`py-3 px-5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg tap-effect flex items-center gap-2 flex-shrink-0 ${t.btnPrimary}`}
                >
                  <Crown size={15} /> View Full Roadmap
                </button>
              </div>

              {/* Progress to Next Rank */}
              {rankData.nextRank && (
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-slate-300">
                      Next Rank Target: {rankData.nextRank.badge} {rankData.nextRank.name}
                    </span>
                    <span className="text-amber-300 font-mono">
                      {rankData.xpNeededForNext} XP Needed ({rankData.progressToNext}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden p-0.5 bg-black/60 border border-white/15">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-700"
                      style={{ width: `${Math.max(5, rankData.progressToNext)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* ECONOMY ASSET METRICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className={`p-4 sm:p-5 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Lifetime XP</span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                  {profile.xp || 0}
                </span>
              </div>

              <div className={`p-4 sm:p-5 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Stars Wallet</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                  {profile.stars || 0} ⭐
                </span>
              </div>

              <div className={`p-4 sm:p-5 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Streak Shields</span>
                <span className="text-2xl sm:text-3xl font-black text-sky-300 font-mono">
                  {profile.streakShields || 0}/2 🛡️
                </span>
              </div>

              <div className={`p-4 sm:p-5 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Perks Stored</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
                  {(profile.inventory || []).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOngoingPlan = () => {
    const allItems = checkExpirations();
    const activeItems = allItems.filter((i: any) => i.status === "active");
    const historyItems = allItems.filter((i: any) => i.status !== "active").reverse();

    return (
      <div className="space-y-6 pb-20 max-w-4xl mx-auto animate-in fade-in duration-300">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
          <button onClick={() => setHabitRoute("hub")} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><Briefcase className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Ongoing Plan & History</h2>
        </div>

        <h3 className={`font-black uppercase tracking-wider text-xs sm:text-sm mt-4 border-b border-current/20 pb-2 ${t.textMuted} ${t.fontHeading}`}>Active Perks Inventory</h3>
        {activeItems.length === 0 ? (
          <div className={`text-center p-8 sm:p-12 rounded-3xl border-2 border-dashed border-white/10 ${t.cardInner}`}>
            <span className="text-3xl sm:text-4xl block mb-2 opacity-60 animate-float">🎁</span>
            <p className={`font-black mb-1 text-xs sm:text-sm ${t.textMain} ${t.fontHeading}`}>No active perks at the moment.</p>
            <p className={`text-[10px] sm:text-xs ${t.textMuted} ${t.fontHeading}`}>Visit the Reward Shop to unlock guilt-free perks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {activeItems.map((item: any) => {
              const hrsLeft = Math.max(0, Math.floor((new Date(item.expiryTime).getTime() - new Date(`${todayStr}T00:00:00`).getTime()) / (1000 * 60 * 60)));
              return (
                <div key={item.instanceId} className={`p-5 sm:p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl border tap-effect hover-lift ${t.cardInner} ${t.borderAccent}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-start gap-4 mb-4 z-10">
                    <span className={`text-3xl sm:text-4xl p-3 rounded-2xl shadow-md border ${t.card} ${t.borderAccent}`}>{item.icon}</span>
                    <div>
                      <h3 className={`font-black text-sm sm:text-lg ${t.textMain} ${t.fontHeading}`}>{item.name}</h3>
                      <p className={`text-[10px] sm:text-xs font-black mt-1 ${hrsLeft < 12 ? "text-red-400 animate-pulse" : t.textAccent} ${t.fontHeading}`}>
                        Expires in {hrsLeft} Hours
                      </p>
                      <p className={`text-[8px] sm:text-[10px] ${t.textMuted} mt-0.5`}>Claimed: {item.purchasedAt}</p>
                    </div>
                  </div>
                  <button onClick={() => useInventoryItem(item.instanceId, item.name)} className={`w-full py-3 text-[10px] sm:text-xs font-black rounded-2xl tap-effect uppercase tracking-wider z-10 ${t.btnPrimary} ${t.fontHeading}`}>
                    {item.name === "The Eraser" ? "Arm Eraser" : "Mark as Used"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {historyItems.length > 0 && (
          <div className="mt-8 sm:mt-10">
            <h3 className={`font-black uppercase tracking-wider text-xs sm:text-sm mb-4 border-b border-current/20 pb-2 flex items-center gap-2 ${t.textMuted} ${t.fontHeading}`}><History size={16} /> History Log</h3>
            <div className="space-y-2.5">
              {historyItems.map((item: any) => (
                <div key={item.instanceId} className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl shadow-md border border-white/5 ${t.cardInner}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl opacity-50 grayscale">{item.icon}</span>
                    <div>
                      <span className={`font-black block text-xs sm:text-sm ${t.textMain} ${t.fontHeading}`}>{item.name}</span>
                      <span className={`text-[8px] sm:text-[10px] ${t.textMuted} ${t.fontHeading}`}>Claimed ID: {item.instanceId.slice(-6)} • {item.purchasedAt}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] sm:text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest ${t.fontHeading} ${item.status === "used" ? "bg-green-900/30 text-green-400 border border-green-800" : "bg-red-900/30 text-red-400 border border-red-800"}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderVault = () => (
    <div className="space-y-6 max-w-xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
        <button onClick={() => setHabitRoute("hub")} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><Download className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Data Vault</h2>
      </div>
      <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
        <p className={`text-[10px] sm:text-sm mb-5 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Select your date range and export your complete performance ledger.</p>
        <div className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
          <div>
            <label className={`block text-[9px] sm:text-xs font-black mb-1.5 uppercase tracking-widest ${t.textMuted} ${t.fontHeading}`}>START DATE</label>
            <input type="date" value={exportStartDate} onChange={(e) => setExportStartDate(e.target.value)} className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
          </div>
          <div>
            <label className={`block text-[9px] sm:text-xs font-black mb-1.5 uppercase tracking-widest ${t.textMuted} ${t.fontHeading}`}>END DATE</label>
            <input type="date" value={exportEndDate} onChange={(e) => setExportEndDate(e.target.value)} className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <button onClick={downloadExport} className={`w-full py-3.5 text-xs sm:text-sm rounded-2xl flex justify-center items-center gap-2 tap-effect font-black uppercase tracking-wider ${t.btnPrimary} ${t.fontHeading}`}><FileDown size={18} /> Download Dark HTML Report</button>
          <button onClick={copyTextExport} className={`w-full py-3.5 text-xs sm:text-sm rounded-2xl flex justify-center items-center gap-2 tap-effect font-black uppercase tracking-wider ${copySuccess ? 'bg-green-600 text-white' : t.btnWarning} ${t.fontHeading}`}><Copy size={18} /> {copySuccess ? "Copied to Clipboard!" : "Copy as Plain Text"}</button>
        </div>
      </div>
    </div>
  );

  const renderCoach = () => (
    <div className="flex flex-col h-[75vh] max-w-2xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => setHabitRoute("hub")} className={`p-2 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><Bot className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> AI Habit Coach</h2>
        </div>
        <button
          onClick={generateWeeklyAiReview}
          disabled={isGeneratingWeeklyReview}
          className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg tap-effect ${t.btnPrimary}`}
        >
          <Award size={15} />
          <span>7-Day Audit</span>
        </button>
      </div>
      <div className={`flex-1 flex flex-col overflow-hidden rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 sm:space-y-4">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in`}>
              <div className={`max-w-[85%] md:max-w-[75%] p-3.5 sm:p-4 shadow-lg text-xs sm:text-sm leading-relaxed ${t.fontHeading} ${msg.role === "user" ? t.btnPrimary + " rounded-2xl rounded-tr-sm" : t.cardInner + " " + t.textMain + " rounded-2xl rounded-tl-sm border " + t.borderAccent}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl w-fit ${t.cardInner} border ${t.borderAccent}`}>
              <div className={`w-2 h-2 rounded-full bg-current ${t.textAccent} typing-dot-1`}></div>
              <div className={`w-2 h-2 rounded-full bg-current ${t.textAccent} typing-dot-2`}></div>
              <div className={`w-2 h-2 rounded-full bg-current ${t.textAccent} typing-dot-3`}></div>
              <span className={`text-[10px] font-black uppercase tracking-wider ml-2 ${t.textMuted} ${t.fontHeading}`}>Coach Strategizing...</span>
            </div>
          )}
        </div>
        <div className={`p-3.5 sm:p-4 border-t ${t.borderAccent} ${t.cardInner}`}>
          <div className="flex gap-2.5">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && askCoach()} placeholder="Ask for habit guidance, confession or strategy..." className={`flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
            <button onClick={askCoach} disabled={isTyping} className={`px-5 rounded-2xl tap-effect transition-all disabled:opacity-50 flex items-center justify-center ${t.btnPrimary}`}><Zap size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
  // ==========================================
  // BRAIN RENDERERS (STYLED WITH MODERN THEMES & GLASSMORPHISM)
  // ==========================================
  const renderBrainDashboard = () => {
    const remainingChapters = brain.stagingTopics.length;
    const pace = remainingChapters > 0 ? brain.globalDeadlineDays / remainingChapters : 0;

    let paceStatus = { text: "ON TRACK", color: t.textMain };
    if (pace < 1 && remainingChapters > 0) paceStatus = { text: "DANGER", color: "text-red-500" };
    else if (pace >= 1 && pace <= 1.5) paceStatus = { text: "WARNING", color: "text-yellow-500" };
    else if (remainingChapters === 0) paceStatus = { text: "STANDBY", color: t.textMuted };

    const todaysRevisions: any[] = [];
    brain.studyTopics.forEach((topic: any) => {
      topic.schedule.forEach((rev: any) => {
        if (rev.targetDate <= todayStr && !rev.completed) {
          todaysRevisions.push({ topicId: topic.id, title: topic.title, category: topic.category, targetDate: rev.targetDate, dayOffset: rev.dayOffset, isOverdue: rev.targetDate < todayStr });
        }
      });
    });

    const todaysCustomMissions = brain.customMissions.filter((m: any) => m.targetDate <= todayStr && !m.completed);
    const quoteOfTheDay = MORNING_QUOTES[new Date().getDate() % MORNING_QUOTES.length];

    return (
      <div className="space-y-6 sm:space-y-8 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">

        {/* DAILY PROTOCOL QUOTE BANNER */}
        <div className={`p-5 sm:p-7 rounded-3xl relative overflow-hidden shadow-2xl border ${t.cardInner} ${t.borderAccent} hover-lift`}>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${t.badge} flex items-center gap-1.5`}>
              <Zap size={13} className="animate-pulse" /> PROTOCOL INITIATED
            </span>
          </div>
          <p className={`text-lg sm:text-2xl font-black uppercase tracking-tight leading-snug ${t.textMain} ${t.fontHeading}`}>
            "{quoteOfTheDay}"
          </p>
        </div>

        {/* GLOBAL DEADLINE & PACE */}
        <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
          <div className={`flex justify-between items-center mb-5 border-b pb-3 ${t.borderAccent}`}>
            <h2 className={`text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 ${t.textAccent} ${t.fontHeading}`}>
              <Clock size={16} /> GLOBAL DEADLINE & VELOCITY
            </h2>
            <span className={`text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${t.badge}`}>STRATEGY ENGINE</span>
          </div>

          <div className="flex justify-between items-end gap-4">
            <div className="flex flex-col">
              <label className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1.5 ${t.textMuted} ${t.fontHeading}`}>REMAINING TIMELINE</label>
              <div className={`flex items-baseline gap-2 border-b-2 border-transparent transition-colors focus-within:${t.borderAccent}`}>
                <input
                  type="number"
                  value={brain.globalDeadlineDays}
                  onChange={(e) => updateBrainFirebase({ globalDeadlineDays: Math.max(1, parseInt(e.target.value) || 1) })}
                  className={`w-20 sm:w-28 bg-transparent text-4xl sm:text-6xl font-black tracking-tighter outline-none p-0 m-0 ${t.textMain} ${t.fontHeading}`}
                />
                <span className={`text-base sm:text-xl font-black uppercase ${t.textAccent} ${t.fontHeading}`}>DAYS</span>
              </div>
            </div>

            <div className={`text-right p-3 sm:p-4 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
              <p className={`text-[9px] sm:text-[10px] tracking-widest font-black uppercase mb-1 ${t.textMuted} ${t.fontHeading}`}>PACE DETECTOR</p>
              <p className={`text-xl sm:text-3xl font-black ${paceStatus.color} ${t.fontHeading}`}>{pace} <span className="text-[10px] sm:text-xs font-normal">CH/DAY</span></p>
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 inline-block px-2 py-0.5 rounded-full ${paceStatus.color} bg-current/10 ${t.fontHeading}`}>{paceStatus.text}</span>
            </div>
          </div>

          {brain.stagingTopics.length > 0 && (
            <div className={`mt-6 sm:mt-8 p-5 rounded-2xl border ${t.cardInner} ${t.borderAccent} hover-lift`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${t.textAccent} ${t.fontHeading}`}>CURRENT STRIKE TARGET</h3>
                <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${t.badge} ${t.fontHeading}`}>{brain.stagingTopics[0].category}</span>
              </div>
              <h2 className={`text-base sm:text-xl font-black uppercase tracking-tight truncate mb-4 ${t.textMain} ${t.fontHeading}`}>{brain.stagingTopics[0].title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => startFocusSession(brain.stagingTopics[0].title, undefined, brain.stagingTopics[0].id)}
                  className={`py-3 sm:py-3.5 px-4 text-xs sm:text-sm font-black tracking-widest uppercase rounded-xl tap-effect shadow-lg flex items-center justify-center gap-1.5 ${t.btnWarning} ${t.fontHeading}`}
                  title="Launch Focus Chamber for this chapter"
                >
                  <Zap size={16} /> FOCUS
                </button>
                <button
                  onClick={() => handleStartRevision(brain.stagingTopics[0].id)}
                  className={`flex-1 py-3 sm:py-3.5 text-xs sm:text-sm font-black tracking-widest uppercase rounded-xl tap-effect shadow-lg flex items-center justify-center gap-2 ${t.btnPrimary} ${t.fontHeading}`}
                >
                  <CheckCircle2 size={18} /> TARGET DESTROYED (MOVE TO QUEUE)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 📅 TODAY'S SCHEDULED CLASSES & COMMITMENTS */}
        {(() => {
          const todaysScheduledList: ScheduledEvent[] = (brain.scheduledEvents || []).filter(
            (e: ScheduledEvent) => e.date === todayStr && !e.completed
          );

          return (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-2 ${t.textAccent} ${t.fontHeading}`}>
                  <CalendarDays size={15} /> TODAY'S SCHEDULED CLASSES & EVENTS ({todaysScheduledList.length})
                </h3>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${t.badge} tap-effect hover:scale-105 transition-transform`}
                >
                  <Plus size={11} /> Schedule
                </button>
              </div>

              {todaysScheduledList.length === 0 ? (
                <div className={`p-4 rounded-2xl border border-dashed border-white/10 ${t.cardInner} flex items-center justify-between text-[10px] sm:text-xs ${t.textMuted}`}>
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                    <span>✨ No classes or meetings scheduled for today.</span>
                  </div>
                  <button
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="text-amber-300 font-black uppercase hover:underline tap-effect"
                  >
                    + Add Class
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {todaysScheduledList.map((ev: ScheduledEvent) => {
                    const catMeta = EVENT_CATEGORIES.find((c) => c.id === ev.category) || EVENT_CATEGORIES[0];
                    return (
                      <div
                        key={ev.id}
                        className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent border border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover-lift"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-2xl mt-0.5">{catMeta.icon}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${catMeta.badgeBg}`}>
                                {catMeta.label}
                              </span>
                              <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-400 text-black animate-pulse">
                                🚨 TODAY
                              </span>
                              {ev.time && (
                                <span className="text-[9px] font-bold text-amber-200 bg-black/40 px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                                  <Clock size={10} /> {ev.time}
                                </span>
                              )}
                            </div>
                            <h4 className={`text-xs sm:text-sm font-black mt-1 ${t.textMain} ${t.fontHeading}`}>
                              {ev.title}
                            </h4>
                            {ev.notes && (
                              <p className="text-[10px] sm:text-xs text-slate-300 mt-1 font-sans bg-black/30 p-2 rounded-xl border border-white/5">
                                {ev.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => startFocusSession(ev.title, ev.id)}
                            className={`px-3 py-1.5 rounded-xl tap-effect text-[10px] font-black uppercase flex items-center gap-1 shadow-sm ${t.btnWarning}`}
                          >
                            <Zap size={12} /> Focus
                          </button>
                          <button
                            onClick={() => toggleCompleteScheduledEvent(ev.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-[10px] font-black uppercase tap-effect flex items-center gap-1"
                          >
                            <CheckCircle2 size={13} /> Attended
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* TODAY'S CUSTOM MISSIONS */}
        {todaysCustomMissions.length > 0 && (
          <div className="space-y-3">
            <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2 ${t.textAccent} ${t.fontHeading}`}>
              <Target size={15} /> TODAY'S MISSIONS ({todaysCustomMissions.length})
            </h3>
            {todaysCustomMissions.map((mission: any) => (
              <div key={mission.id} className={`flex items-center justify-between p-4 rounded-2xl shadow-md border ${t.cardInner} ${t.borderAccent} hover-lift`}>
                <span className={`font-black uppercase tracking-wider text-xs sm:text-sm ${t.textMain} ${t.fontHeading}`}>{mission.text}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startFocusSession(mission.text, mission.id)}
                    className={`px-3 py-1.5 rounded-xl tap-effect text-[10px] sm:text-xs font-black uppercase flex items-center gap-1 shadow-sm ${t.btnWarning}`}
                    title="Focus on this mission"
                  >
                    <Zap size={13} /> Focus
                  </button>
                  <button
                    onClick={() => {
                      updateBrainFirebase({ customMissions: brain.customMissions.filter((m: any) => m.id !== mission.id) });
                      const remaining = todaysCustomMissions.length - 1;
                      if (remaining === 0) triggerCrossReward(3, "All Daily Missions Cleared!");
                    }}
                    className={`p-2 rounded-xl tap-effect transition-colors ${t.textMuted} hover:${t.textAccent} bg-white/5`}
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MANDATORY REVISIONS */}
        <div className="space-y-3">
          <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2 ${t.textAccent} ${t.fontHeading}`}>
            <Flame size={15} /> MANDATORY REVISIONS
          </h3>
          {todaysRevisions.length === 0 ? (
            <div className={`text-center py-10 sm:py-12 rounded-3xl border-2 border-dashed font-black uppercase tracking-widest text-xs sm:text-sm ${t.cardInner} ${t.textMuted} border-current/20`}>
              SYSTEM CLEAR • ALL REVISIONS UP TO DATE
            </div>
          ) : (
            <div className="space-y-3">
              {todaysRevisions.map((rev, idx) => (
                <div key={idx} className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-lg border ${t.cardInner} ${rev.isOverdue ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : t.borderAccent} hover-lift`}>
                  <div>
                    <h4 className={`font-black uppercase text-xs sm:text-sm flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                      {rev.title} {rev.isOverdue && <span className="text-[8px] sm:text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full tracking-widest font-black animate-pulse">OVERDUE</span>}
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${t.badge}`}>{rev.category}</span>
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${t.card}`}>DAY {rev.dayOffset}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startFocusSession(rev.title, undefined, rev.topicId)}
                      className={`px-3 py-2 rounded-xl tap-effect text-[10px] sm:text-xs font-black uppercase flex items-center gap-1 shadow-sm ${t.btnWarning}`}
                      title="Focus on this revision"
                    >
                      <Zap size={13} /> Focus
                    </button>
                    <button
                      onClick={() => markRevisionComplete(rev.topicId, rev.targetDate, rev.dayOffset)}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center tap-effect shrink-0 shadow-md ${t.btnPrimary}`}
                    >
                      <Check size={22} className="stroke-[3]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBrainStudy = () => (
    <div className="space-y-6 sm:space-y-8 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
        <div className={`flex justify-between items-center mb-4 sm:mb-6 border-b pb-3 ${t.borderAccent}`}>
           <h3 className={`font-black uppercase tracking-widest flex items-center gap-2 text-xs sm:text-sm ${t.textAccent} ${t.fontHeading}`}>
             <Activity size={16} /> LIQUID STRIKE QUEUE ({brain.stagingTopics.length})
           </h3>
           <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${t.cardInner} ${t.textMuted}`}>Drag to prioritize</span>
        </div>

        {/* CATEGORY TAG SELECTOR CHIPS (MOBILE ERGONOMIC) */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>Category Tag:</span>
            <span className={`text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${t.badge} ${t.textAccent}`}>Selected: {selectedSyllabusCat}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {brain.syllabusCategories.map((cat: any) => {
              const isSelected = selectedSyllabusCat === cat;
              return (
                <div
                  key={cat}
                  onClick={() => setSelectedSyllabusCat(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all border cursor-pointer shrink-0 tap-effect ${
                    isSelected
                      ? `${t.btnPrimary} shadow-md scale-105`
                      : `${t.cardInner} ${t.textMain} hover:${t.borderAccent}`
                  }`}
                >
                  <span>{cat}</span>
                  {cat !== "Raw Backlog" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSyllabusCategory(cat);
                      }}
                      className="hover:text-red-400 p-0.5 transition-colors"
                      title="Delete Tag"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ADD CHAPTER / TOPIC (FULL WIDTH ERGONOMIC INPUT) */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStagingTopic()}
            placeholder={`Add topic to [${selectedSyllabusCat}]...`}
            className={`flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase rounded-xl sm:rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`}
          />
          <button
            onClick={handleAddStagingTopic}
            className={`px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black uppercase tap-effect flex items-center justify-center gap-1.5 ${t.btnPrimary}`}
            title="Add topic to queue"
          >
            <Plus size={18} className="stroke-[3]" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* CREATE NEW CATEGORY TAG ROW */}
        <div className="flex gap-2 mb-6 pt-3 border-t border-white/5">
          <input
            type="text"
            value={newSyllabusCat}
            onChange={(e) => setNewSyllabusCat(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSyllabusCategory()}
            placeholder="CREATE NEW CATEGORY TAG..."
            className={`flex-1 px-3 py-2 text-[9px] sm:text-xs font-black uppercase rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`}
          />
          <button
            onClick={handleAddSyllabusCategory}
            className={`px-3.5 py-2 rounded-xl text-[9px] sm:text-xs font-black uppercase tap-effect flex items-center justify-center gap-1 border ${t.cardInner} hover:${t.borderAccent} ${t.borderAccent} ${t.textAccent}`}
          >
            <Plus size={13} className="stroke-[3]" /> Tag
          </button>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {brain.stagingTopics.length === 0 && (
            <div className={`text-center py-10 sm:py-12 rounded-2xl border-2 border-dashed font-black uppercase tracking-widest text-xs sm:text-sm ${t.cardInner} ${t.textMuted} border-current/20`}>
              QUEUE EMPTY • ADD TOPICS TO COMMENCE
            </div>
          )}
          {brain.stagingTopics.map((topic: any, index: any) => (
            <LongPressItem key={topic.id} item={topic} onDelete={(id: any) => updateBrainFirebase({ stagingTopics: brain.stagingTopics.filter((t: any) => t.id !== id) })} t={t}>
              <div
                draggable
                onDragStart={() => setDraggedItemIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedItemIndex === null || draggedItemIndex === index) {
                    setDraggedItemIndex(null);
                    return;
                  }
                  const items = [...brain.stagingTopics];
                  if (!items[draggedItemIndex] || index < 0 || index >= items.length) {
                    setDraggedItemIndex(null);
                    return;
                  }
                  const [draggedItem] = items.splice(draggedItemIndex, 1);
                  if (draggedItem) {
                    items.splice(index, 0, draggedItem);
                    updateBrainFirebase({ stagingTopics: items });
                  }
                  setDraggedItemIndex(null);
                }}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-move transition-all select-none shadow-md ${index === 0 ? t.borderAccent + " " + t.cardInner : t.cardInner} ${draggedItemIndex === index ? 'opacity-40 scale-95' : 'opacity-100'} hover-lift`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <GripVertical size={20} className={index === 0 ? t.textAccent : t.textMuted} />
                  <div>
                    <h4 className={`font-black text-xs sm:text-sm uppercase flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
                      {topic.title}
                      {index === 0 && <span className={`text-[8px] sm:text-[9px] px-2 py-0.5 tracking-widest font-black rounded-full ${t.badge} ${t.textAccent}`}>NEXT</span>}
                    </h4>
                    <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 block ${t.textMuted} ${t.fontHeading}`}>{topic.category}</span>
                  </div>
                </div>
              </div>
            </LongPressItem>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBrainHistory = () => (
    <div className="space-y-6 sm:space-y-8 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
        <h3 className={`font-black uppercase tracking-widest mb-5 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm border-b pb-3 ${t.textAccent} ${t.fontHeading} ${t.borderAccent}`}>
          <History size={16} /> ONGOING SPACED REPETITION CYCLES
        </h3>
        {brain.studyTopics.length === 0 ? (
          <div className={`text-center py-10 sm:py-12 rounded-2xl border-2 border-dashed font-black uppercase tracking-widest text-xs sm:text-sm ${t.cardInner} ${t.textMuted} border-current/20`}>
            NO ACTIVE CYCLES
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {brain.studyTopics.map((topic: any) => (
              <LongPressItem key={topic.id} item={topic} onDelete={(id: any) => updateBrainFirebase({ studyTopics: brain.studyTopics.filter((t: any) => t.id !== id) })} duration={5000} t={t}>
                <div className={`p-5 rounded-2xl shadow-lg border ${t.cardInner} ${t.borderAccent} hover-lift`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className={`font-black text-sm sm:text-lg uppercase ${t.textMain} ${t.fontHeading}`}>{topic.title}</h4>
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 mt-1.5 inline-block rounded-full ${t.badge}`}>{topic.category}</span>
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full ${t.card} ${t.textAccent} border ${t.borderAccent}`}>INIT: {topic.startDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {topic.schedule.map((rev: any, i: any) => {
                      const isPending = !rev.completed && rev.targetDate <= todayStr;
                      return (
                        <div key={i} className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl border transition-all ${rev.completed ? t.btnPrimary + ' shadow-sm' : isPending ? 'border-red-500 text-red-500 bg-red-900/20 shadow-md animate-pulse' : t.card + ' ' + t.textMuted}`}>
                          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${t.fontHeading}`}>D{rev.dayOffset}</span>
                          {rev.completed ? <Check size={14} className="mt-1 stroke-[4]" /> : <Circle size={14} className={`mt-1 stroke-[3] ${isPending ? 'animate-pulse' : ''}`} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </LongPressItem>
            ))}
          </div>
        )}
      </div>

      <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
        <h3 className={`font-black uppercase tracking-widest mb-5 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm border-b pb-3 ${t.textMain} ${t.fontHeading} ${t.borderAccent}`}>
          <Trophy size={16} className={t.textAccent} /> HALL OF FAME (MASTERED ARCHIVES)
        </h3>
        {brain.masteredTopics.length === 0 ? (
          <div className={`text-center py-10 sm:py-12 rounded-2xl border-2 border-dashed font-black uppercase tracking-widest text-xs sm:text-sm ${t.cardInner} ${t.textMuted} border-current/20`}>
            EMPTY VAULT • COMPLETE A SPACED CYCLE TO ARCHIVE
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {brain.masteredTopics.map((topic: any) => (
              <div key={topic.id} className={`p-4 rounded-2xl border flex items-center gap-3.5 shadow-md transition-all ${t.cardInner} hover:${t.borderAccent} hover-lift`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md ${t.card} ${t.borderAccent}`}>
                   <Trophy size={20} className={t.textAccent} />
                </div>
                <div>
                  <h4 className={`font-black text-xs sm:text-sm uppercase ${t.textMain} ${t.fontHeading}`}>{topic.title}</h4>
                  <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-0.5 ${t.textMuted} ${t.fontHeading}`}>{topic.category} • {topic.masteredDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderBrainWisdom = () => {
    if (expandedWisdomCategory) {
      const filteredNotes = brain.wisdomNotes.filter((n: any) => n.category === expandedWisdomCategory);
      return (
        <div className="space-y-4 sm:space-y-6 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button onClick={() => setExpandedWisdomCategory(null)} className={`p-2.5 sm:p-3 tap-effect rounded-xl ${t.btnPrimary}`}><ChevronLeft size={20} className="stroke-[3]"/></button>
            <h2 className={`text-lg sm:text-xl font-black uppercase tracking-widest flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><FolderOpen size={20} className={t.textAccent} /> {expandedWisdomCategory}</h2>
          </div>
          <div className="flex gap-2.5 mb-6 sm:mb-8">
            <input type="text" value={newWisdom} onChange={(e) => setNewWisdom(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddWisdom()} placeholder="DUMP KNOWLEDGE / MODEL..." className={`flex-1 px-4 py-3.5 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
            <button onClick={handleAddWisdom} className={`px-6 font-black rounded-2xl tap-effect flex items-center justify-center ${t.btnPrimary}`}><Plus size={22} className="stroke-[4]" /></button>
          </div>
          <div className="grid gap-3 sm:gap-4">
            {filteredNotes.length === 0 && <div className={`text-center py-10 sm:py-12 rounded-2xl border-2 border-dashed font-black uppercase tracking-widest text-xs sm:text-sm ${t.cardInner} ${t.textMuted} border-current/20`}>EMPTY FOLDER</div>}
            {filteredNotes.map((note: any) => (
              <LongPressItem key={note.id} item={note} onDelete={(id: any) => updateBrainFirebase({ wisdomNotes: brain.wisdomNotes.filter((n: any) => n.id !== id) })} t={t}>
                <div className={`p-5 rounded-2xl flex flex-col gap-3 group transition-all cursor-pointer border shadow-md ${t.cardInner} hover:${t.borderAccent} hover-lift`}>
                  <div className="flex items-start gap-3">
                     <Mic size={16} className={`mt-1 flex-shrink-0 ${t.textMuted}`} />
                     <p className={`text-xs sm:text-sm font-bold leading-relaxed ${t.textMain}`}>{note.text}</p>
                  </div>
                  <div className={`flex justify-between items-center pt-3 border-t ${t.borderAccent}`}>
                    <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>{note.date}</span>
                    <div className="flex items-center gap-2">
                       <MoveRight size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${t.textMuted}`} />
                       <select onChange={(e) => updateBrainFirebase({ wisdomNotes: brain.wisdomNotes.map((n: any) => n.id === note.id ? { ...n, category: e.target.value } : n) })} value={note.category} className={`text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-full outline-none cursor-pointer ${t.badge} ${t.fontHeading}`}>
                         {brain.wisdomCategories.map((cat: any) => <option key={cat} value={cat}>{cat}</option>)}
                       </select>
                    </div>
                  </div>
                </div>
              </LongPressItem>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-6 sm:space-y-8 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
        <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
          <h3 className={`font-black uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm border-b pb-3 ${t.textAccent} ${t.fontHeading} ${t.borderAccent}`}><Sparkles size={16} /> ASK THE ORACLE</h3>
          <p className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-3 sm:mb-4 ${t.textMuted}`}>Query your Second Brain knowledge base with Gemini AI.</p>
          <div className="flex gap-2.5">
            <input type="text" value={oracleQuery} onChange={(e) => setOracleQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAskOracle('wisdom')} placeholder="ASK A QUESTION..." className={`flex-1 px-4 py-3 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
            <button onClick={() => handleAskOracle('wisdom')} disabled={isOracleThinking} className={`px-5 font-black uppercase rounded-2xl tap-effect disabled:opacity-50 flex items-center justify-center ${t.btnPrimary}`}>{isOracleThinking ? <Circle size={18} className="animate-pulse stroke-[4]" /> : <Send size={18} className="stroke-[3]" />}</button>
          </div>
          {oracleResponse && <div className={`mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl border-l-4 shadow-lg ${t.cardInner} ${t.borderAccent}`}><p className={`text-xs sm:text-sm font-bold leading-relaxed ${t.textMain}`}>{oracleResponse}</p></div>}
        </div>

        <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
          <h3 className={`font-black uppercase tracking-widest mb-5 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm border-b pb-3 ${t.textMain} ${t.fontHeading} ${t.borderAccent}`}><Folder size={16} className={t.textAccent} /> WISDOM FOLDERS</h3>
          <div className="flex gap-2.5 mb-6 sm:mb-8">
            <input type="text" value={newWisdomCat} onChange={(e) => setNewWisdomCat(e.target.value)} placeholder="NEW FOLDER NAME..." className={`flex-1 px-4 py-3 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
            <button onClick={() => { if (newWisdomCat.trim() && !brain.wisdomCategories.includes(newWisdomCat.trim())) { updateBrainFirebase({ wisdomCategories: [...brain.wisdomCategories, newWisdomCat.trim()] }); setNewWisdomCat(""); } }} className={`px-5 rounded-2xl font-black tap-effect flex items-center justify-center ${t.btnPrimary}`}><Plus size={20} className="stroke-[3]" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {brain.wisdomCategories.map((cat: any) => {
              const count = brain.wisdomNotes.filter((n: any) => n.category === cat).length;
              return (
                <div key={cat} className="group relative">
                  <button onClick={() => setExpandedWisdomCategory(cat)} className={`w-full p-5 rounded-2xl flex flex-col items-start gap-3 transition-all text-left shadow-md border ${t.cardInner} hover:${t.borderAccent} hover-lift`}>
                    <FolderOpen size={28} className={`transition-colors ${t.textMuted} group-hover:${t.textAccent}`} />
                    <div>
                      <h4 className={`font-black text-xs sm:text-sm uppercase truncate w-full ${t.textMain} ${t.fontHeading}`}>{cat}</h4>
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 block ${t.textMuted} ${t.fontHeading}`}>{count} NOTES</span>
                    </div>
                  </button>
                  {cat !== "Quick Thoughts" && <button onClick={(e) => { e.stopPropagation(); updateBrainFirebase({ wisdomCategories: brain.wisdomCategories.filter((c: any) => c !== cat), wisdomNotes: brain.wisdomNotes.map((n: any) => n.category === cat ? { ...n, category: "Quick Thoughts" } : n) }); }} className={`absolute top-3 right-3 p-2 rounded-xl transition-colors ${t.textMuted} hover:text-red-500 bg-white/5`}><Trash2 size={14} /></button>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderBrainVault = () => {
    if (expandedVaultCategory) {
      const notesInCat = brain.vaultNotes.filter((n: any) => n.category === expandedVaultCategory);
      return (
        <div className="space-y-4 sm:space-y-6 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button onClick={() => setExpandedVaultCategory(null)} className={`p-2.5 sm:p-3 tap-effect rounded-xl ${t.btnPrimary}`}><ChevronLeft size={20} className="stroke-[3]"/></button>
            <h2 className={`text-lg sm:text-xl font-black uppercase tracking-widest flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><FolderOpen size={20} className={t.textAccent} /> {expandedVaultCategory}</h2>
          </div>
          <div className="grid gap-3 sm:gap-4">
            {notesInCat.length === 0 && <div className={`text-center py-10 sm:py-12 rounded-2xl border-2 border-dashed font-black uppercase tracking-widest text-xs sm:text-sm ${t.cardInner} ${t.textMuted} border-current/20`}>EMPTY FOLDER</div>}
            {notesInCat.map((note: any) => (
              <LongPressItem key={note.id} item={note} onDelete={(id: any) => updateBrainFirebase({ vaultNotes: brain.vaultNotes.filter((n: any) => n.id !== id) })} t={t}>
                <div className={`p-5 rounded-2xl flex items-start gap-3.5 transition-all group cursor-pointer border shadow-md ${t.cardInner} hover:${t.borderAccent} hover-lift`}>
                  <BrainCircuit size={18} className={`mt-1 shrink-0 transition-colors ${t.textMuted} group-hover:${t.textAccent}`} />
                  <div>
                    <p className={`text-xs sm:text-sm font-bold leading-relaxed ${t.textMain}`}>{note.text}</p>
                    <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-2 block ${t.textMuted} ${t.fontHeading}`}>{note.date}</span>
                  </div>
                </div>
              </LongPressItem>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-6 sm:space-y-8 pb-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
        <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
          <h3 className={`font-black uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm border-b pb-3 ${t.textAccent} ${t.fontHeading} ${t.borderAccent}`}><Sparkles size={16} /> ASK THE ORACLE</h3>
          <p className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-3 sm:mb-4 ${t.textMuted}`}>Query your Brain Dump inbox with Gemini AI.</p>
          <div className="flex gap-2.5">
            <input type="text" value={oracleQuery} onChange={(e) => setOracleQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAskOracle('vault')} placeholder="QUERY DUMP NOTES..." className={`flex-1 px-4 py-3 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
            <button onClick={() => handleAskOracle('vault')} disabled={isOracleThinking} className={`px-5 font-black uppercase rounded-2xl tap-effect disabled:opacity-50 flex items-center justify-center ${t.btnPrimary}`}>{isOracleThinking ? <Circle size={18} className="animate-pulse stroke-[4]" /> : <Send size={18} className="stroke-[3]" />}</button>
          </div>
          {oracleResponse && <div className={`mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl border-l-4 shadow-lg ${t.cardInner} ${t.borderAccent}`}><p className={`text-xs sm:text-sm font-bold leading-relaxed ${t.textMain}`}>{oracleResponse}</p></div>}
        </div>

        <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
          <div className={`flex justify-between items-center mb-4 border-b pb-3 ${t.borderAccent}`}>
            <h3 className={`font-black uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><BrainCircuit size={16} className={t.textAccent} /> BRAIN DUMP (INBOX)</h3>
            {isVaultSorting && <span className={`text-[9px] sm:text-[10px] px-2.5 py-1 font-black uppercase tracking-widest animate-pulse rounded-full flex items-center gap-1 ${t.badge} ${t.textAccent}`}><Sparkles size={11} /> AI SORTING</span>}
          </div>
          <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-5 leading-relaxed ${t.textMuted}`}>Fast-capture raw ideas. AI auto-sorts into folders when patterns emerge.</p>
          <div className="flex gap-2.5 relative">
            <button onClick={() => {
                try {
                  const win = window as any;
                  const SR = win.SpeechRecognition || win.webkitSpeechRecognition;
                  if (!SR) { showMessage("Voice typing not supported in this browser."); return; }
                  const rec = new SR();
                  rec.onstart = () => setIsListening(true);
                  rec.onresult = (e: any) => {
                    const transcript = e.results?.[e.resultIndex]?.[0]?.transcript || "";
                    setNewNote(p => p + (p ? " " : "") + transcript);
                  };
                  rec.onerror = (err: any) => {
                    console.warn("Speech recognition error:", err);
                    setIsListening(false);
                  };
                  rec.onend = () => setIsListening(false);
                  rec.start();
                } catch (e) {
                  console.warn("Speech recognition exception:", e);
                  setIsListening(false);
                }
              }} className={`p-3 rounded-2xl transition-all tap-effect ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg' : t.cardInner + ' ' + t.textMuted}`}><Mic size={20} /></button>
            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddNote()} placeholder={isListening ? "SPEAKING..." : "RAW THOUGHT..."} className={`flex-1 px-4 py-3 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
            <button onClick={handleAddNote} disabled={isVaultSorting} className={`px-5 rounded-2xl font-black uppercase tap-effect disabled:opacity-50 flex items-center justify-center ${t.btnPrimary}`}><Send size={18} className="stroke-[3]" /></button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <h3 className={`font-black uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2 px-1 ${t.textMain} ${t.fontHeading}`}><Folder size={16} className={t.textAccent} /> VAULT FOLDERS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {brain.vaultCategories.map((cat: any) => {
              const count = brain.vaultNotes.filter((n: any) => n.category === cat).length;
              return (
                <div key={cat} className="group relative">
                  <button onClick={() => setExpandedVaultCategory(cat)} className={`w-full p-5 rounded-2xl flex flex-col items-start gap-3 transition-all text-left shadow-md border ${t.cardInner} hover:${t.borderAccent} hover-lift`}>
                    <FolderOpen size={28} className={`transition-colors ${t.textMuted} group-hover:${t.textAccent}`} />
                    <div>
                      <h4 className={`font-black text-xs sm:text-sm uppercase truncate w-full ${t.textMain} ${t.fontHeading}`}>{cat}</h4>
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 block ${t.textMuted} ${t.fontHeading}`}>{count} NOTES</span>
                    </div>
                  </button>
                  {cat !== "Others" && <button onClick={(e) => { e.stopPropagation(); updateBrainFirebase({ vaultCategories: brain.vaultCategories.filter((c: any) => c !== cat), vaultNotes: brain.vaultNotes.map((n: any) => n.category === cat ? { ...n, category: "Others" } : n) }); }} className={`absolute top-3 right-3 p-2 rounded-xl transition-colors ${t.textMuted} hover:text-red-500 bg-white/5`}><Trash2 size={14} /></button>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderHabitSettings = () => {
    if (settingsRoute === "menu") {
      return (
        <div className="space-y-6 max-w-xl mx-auto pb-20 animate-in fade-in duration-300">
          <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
            <button onClick={() => setHabitRoute("hub")} className={`p-2.5 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}><Settings className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Command Center</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button onClick={() => setSettingsRoute("todo")} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border ${t.cardInner} hover:${t.borderAccent} ${t.borderAccent}`}>
              <Edit3 className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors ${t.textAccent}`} />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 ${t.textMain} ${t.fontHeading}`}>Edit To-Do List</h2>
              <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 ${t.textMuted}`}>Manage daily missions</p>
            </button>
            <button onClick={() => setSettingsRoute("shop")} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border ${t.cardInner} hover:${t.borderAccent} ${t.borderAccent}`}>
              <ShoppingCart className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors ${t.textAccent}`} />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 ${t.textMain} ${t.fontHeading}`}>Edit Reward Shop</h2>
              <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 ${t.textMuted}`}>Customize perks</p>
            </button>
            <button onClick={() => setSettingsRoute("theme")} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border ${t.cardInner} hover:${t.borderAccent} ${t.borderAccent}`}>
              <Sparkles className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors ${t.textAccent}`} />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 ${t.textMain} ${t.fontHeading}`}>App Theme Engine</h2>
              <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 ${t.textMuted}`}>Visual aesthetics</p>
            </button>
            <button onClick={() => setSettingsRoute("profile")} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border ${t.cardInner} hover:${t.borderAccent} ${t.borderAccent}`}>
              <User className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors ${t.textAccent}`} />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 ${t.textMain} ${t.fontHeading}`}>Profile Config</h2>
              <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 ${t.textMuted}`}>Name, avatar & API key</p>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 max-w-xl mx-auto pb-20 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
          <button onClick={() => setSettingsRoute("menu")} className={`p-2.5 sm:p-3 tap-effect rounded-xl ${t.cardInner} ${t.textMain}`}><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          <h2 className={`text-lg sm:text-2xl font-black flex items-center gap-2 ${t.textMain} ${t.fontHeading}`}>
            {settingsRoute === "todo" && <><Edit3 className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Edit To-Do List</>}
            {settingsRoute === "shop" && <><ShoppingCart className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Edit Reward Shop</>}
            {settingsRoute === "theme" && <><Sparkles className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Theme Engine</>}
            {settingsRoute === "profile" && <><User className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} /> Profile Config</>}
          </h2>
        </div>

        {settingsRoute === "todo" && (
          <div className={`p-5 sm:p-7 mb-4 sm:mb-6 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
             <h3 className={`font-black mb-4 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest border-b pb-3 ${t.textAccent} ${t.fontHeading} ${t.borderAccent}`}><Edit3 className="w-5 h-5" /> Edit To-Do List</h3>
             <div className={`p-4 mb-4 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
               <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Task Heading" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors mb-2.5 ${t.input} ${t.fontHeading}`} />
               <input type="text" value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder="Condition (e.g. 10 Pages)" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors mb-3.5 ${t.input} ${t.fontHeading}`} />
               <button onClick={() => {
                  if (!newTitle.trim() || !newDesc.trim()) { showMessage("Fill both!"); return; }
                  updateProfileFirebase({ customTasks: [...(profile.customTasks || DEFAULT_TASKS), { id: `t_${Date.now()}`, title: newTitle.trim(), desc: newDesc.trim(), isLocked: false }] });
                  setNewTitle(""); setNewDesc(""); showMessage("Task Added!");
               }} className={`w-full py-3 text-xs sm:text-sm rounded-2xl tap-effect flex justify-center items-center gap-2 ${t.btnPrimary} ${t.fontHeading}`}><Plus size={18}/> ADD TASK</button>
             </div>
             <div className="space-y-2.5">
               {(profile.customTasks || DEFAULT_TASKS).map((task: any) => (
                 <RemovableTask key={task.id} task={task} t={t} onDelete={(id: any) => {
                    updateProfileFirebase({ customTasks: (profile.customTasks || DEFAULT_TASKS).filter((t: any) => t.id !== id) });
                    showMessage("Deleted Safely.");
                 }} />
               ))}
             </div>
          </div>
        )}

        {settingsRoute === "shop" && (
          <div className={`p-5 sm:p-7 mb-4 sm:mb-6 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
             <h3 className={`font-black mb-4 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest border-b pb-3 ${t.textAccent} ${t.fontHeading} ${t.borderAccent}`}><ShoppingCart className="w-5 h-5" /> Edit Reward Shop</h3>
             <div className={`p-4 mb-4 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
                <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                   <input type="text" value={newShopName} onChange={(e)=>setNewShopName(e.target.value)} placeholder="Name" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
                   <input type="text" value={newShopIcon} onChange={(e)=>setNewShopIcon(e.target.value)} placeholder="Emoji" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                   <input type="number" value={newShopCost} onChange={(e)=>setNewShopCost(e.target.value)} placeholder="Cost (Stars)" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
                   <input type="number" value={newShopExpiry} onChange={(e)=>setNewShopExpiry(e.target.value)} placeholder="Expiry (Hr)" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
                </div>
                <input type="text" value={newShopDesc} onChange={(e)=>setNewShopDesc(e.target.value)} placeholder="Description" className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors mb-3.5 ${t.input} ${t.fontHeading}`} />
                <button onClick={() => {
                  if (!newShopName.trim() || !newShopDesc.trim() || !newShopCost || !newShopExpiry || !newShopIcon.trim()) { showMessage("Fill all fields!"); return; }
                  updateProfileFirebase({ customShopItems: [...ensureShopItems(profile.customShopItems), { id: `s_${Date.now()}`, name: newShopName.trim(), desc: newShopDesc.trim(), cost: parseInt(newShopCost, 10), expiryHours: parseInt(newShopExpiry, 10), icon: newShopIcon.trim() }] });
                  setNewShopName(""); setNewShopDesc(""); setNewShopCost(""); setNewShopExpiry(""); setNewShopIcon(""); showMessage("Reward Added!");
                }} className={`w-full py-3 text-xs sm:text-sm rounded-2xl tap-effect flex justify-center items-center gap-2 ${t.btnPrimary} ${t.fontHeading}`}><Plus size={18}/> ADD REWARD</button>
             </div>
             <div className="space-y-2.5">
               {ensureShopItems(profile.customShopItems).map((item: any) => (
                 <RemovableShopItem key={item.id} item={item} t={t} onDelete={(id: any) => {
                    if (id === "s_streak_shield") { showMessage("Streak Freeze Shield is a locked core item!"); return; }
                    updateProfileFirebase({ customShopItems: ensureShopItems(profile.customShopItems).filter((s: any) => s.id !== id && !s.isLocked) });
                 }} />
               ))}
             </div>
          </div>
        )}

        {settingsRoute === "theme" && (
          <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
            <div className="flex items-center justify-between pb-3 border-b mb-5">
              <h3 className={`font-black uppercase tracking-widest flex items-center gap-2 text-xs sm:text-sm ${t.textAccent} ${t.fontHeading}`}>
                <Sparkles size={16} /> MINDSET & COGNITIVE THEME ENGINE
              </h3>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${t.badge}`}>
                {Object.keys(THEMES).length} Themes
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-[62vh] overflow-y-auto pr-1">
              {Object.values(THEMES).map((themeOption: any) => {
                const isActive = profile.activeTheme === themeOption.id;
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => {
                      updateProfileFirebase({ activeTheme: themeOption.id });
                      showMessage(`Theme set to ${themeOption.name}`);
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl transition-all tap-effect flex items-center gap-3.5 text-left cursor-pointer shadow-md ${
                      themeOption.card || t.cardInner
                    } ${
                      isActive
                        ? `${t.borderAccent} opacity-100 scale-[1.02] ring-2 ring-current shadow-lg`
                        : "opacity-75 hover:opacity-100 border border-white/10"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-2xl shadow-lg flex-shrink-0 flex items-center justify-center border border-white/25 ${themeOption.appBg.split(' ')[0]}`}>
                      {isActive ? (
                        <CheckCircle2 className={`w-6 h-6 ${themeOption.textAccent ? themeOption.textAccent : 'text-white'}`} />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full bg-white/30" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-black uppercase tracking-wide truncate ${themeOption.textAccent || t.textMain} ${themeOption.fontHeading || t.fontHeading}`}>
                          {themeOption.name}
                        </span>
                        {isActive && (
                          <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-white text-black shrink-0">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                        {themeOption.desc || "Aesthetic Palette"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {settingsRoute === "profile" && (
          <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
            <h3 className={`font-black mb-3 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest ${t.textMain} ${t.fontHeading}`}><Camera className="w-5 h-5" /> Profile Config</h3>
            <div className={`flex items-center gap-4 mb-6 p-4 rounded-2xl border ${t.cardInner} ${t.borderAccent}`}>
              <div className={`w-14 h-14 sm:w-18 sm:h-18 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-2xl border-2 shadow-lg ${t.card} ${t.borderAccent}`}>
                {profile.dp ? <img src={profile.dp} alt="DP" className="w-full h-full object-cover" /> : <span className="text-2xl sm:text-3xl">🦊</span>}
              </div>
              <div className="flex-1">
                <label className={`block w-full text-center py-2.5 px-4 text-[10px] sm:text-sm rounded-2xl cursor-pointer tap-effect ${t.btnPrimary} ${t.fontHeading}`}>CHOOSE IMAGE<input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" /></label>
                <p className={`text-[9px] sm:text-[10px] mt-2 text-center uppercase tracking-widest font-black ${t.textMuted} ${t.fontHeading}`}>Auto-crops to circle</p>
              </div>
            </div>
            <h3 className={`font-black mb-2 text-xs sm:text-sm uppercase tracking-widest ${t.textMain} ${t.fontHeading}`}>Player Name</h3>
            <input type="text" value={profile.name} onChange={(e) => updateProfileFirebase({ name: e.target.value })} className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors mb-6 ${t.input} ${t.fontHeading}`} />
            <h3 className={`font-black mb-2 text-xs sm:text-sm uppercase tracking-widest ${t.textMain} ${t.fontHeading}`}>Gemini API Key (AI Core)</h3>
            <input type="password" value={profile.geminiKey} onChange={(e) => { cachedGeminiModels = null; updateProfileFirebase({ geminiKey: e.target.value }); }} placeholder="Paste Gemini API key from Google AI Studio..." className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`} />
          </div>
        )}
      </div>
    );
  };

  const renderBrainUrge = () => (
    <div className="space-y-8 sm:space-y-10 pb-20 pt-4 text-center max-w-md mx-auto animate-in fade-in duration-300">
      <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-widest flex justify-center items-center gap-2 sm:gap-3 ${t.textMain} ${t.fontHeading}`}><ShieldAlert className={`${t.textAccent} stroke-[3]`} size={28} /> INTERCEPTOR</h2>
      <p className={`font-black uppercase tracking-widest text-[9px] sm:text-[10px] px-4 sm:px-8 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Trigger this emergency protocol if you are about to break discipline. A friction timer will cool your impulse.</p>

      {!isUrgeActive ? (
        <button onClick={triggerUrgeInterceptor} className={`w-full aspect-square max-w-[220px] sm:max-w-[280px] mx-auto border-8 rounded-3xl tap-effect flex flex-col items-center justify-center gap-5 sm:gap-6 group mt-8 ${t.btnPrimary} ${t.fontHeading} ${t.borderAccent} hover-lift`}>
          <Skull size={60} className="sm:size-20 stroke-[2] group-hover:scale-110 transition-transform duration-300" />
          <span className="font-black text-xl sm:text-3xl uppercase tracking-widest text-center px-4">I HAVE AN URGE</span>
        </button>
      ) : (
        <div className={`p-6 sm:p-8 relative mt-8 rounded-3xl border-2 ${t.card} ${t.borderAccent} shadow-2xl`}>
          <div className={`absolute top-0 left-0 w-full h-2.5 rounded-t-3xl overflow-hidden ${t.cardInner}`}>
            <div
              className={`h-full transition-all duration-1000 ease-linear bg-current ${t.textAccent} animate-shimmer`}
              style={{ width: `${(urgeTimer / 90) * 100}%` }}
            ></div>
          </div>
          <h3 className={`font-black mt-3 sm:mt-4 mb-4 sm:mb-6 uppercase tracking-[0.2em] text-[10px] sm:text-xs ${t.textAccent} ${t.fontHeading} animate-pulse`}>FRICTION ZONE ACTIVE</h3>
          <div className={`text-6xl sm:text-8xl font-black mb-6 sm:mb-8 tabular-nums tracking-tighter ${t.textMain}`}>{urgeTimer}s</div>
          <div className={`min-h-[80px] sm:min-h-[100px] flex items-center justify-center border-t pt-4 sm:pt-6 ${t.borderAccent}`}>
            <p className={`font-bold text-sm sm:text-lg uppercase tracking-wider leading-relaxed px-2 ${t.textMain} ${t.fontHeading}`} key={currentQuoteIndex}>
              "{urgeQuotes[currentQuoteIndex] || 'STAY STRONG. DO NOT GIVE IN.'}"
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Auto-scroll for Krishna Chat
  useEffect(() => {
    if (appMode === "krishna") {
      krishnaChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [krishnaState, isKrishnaTyping, appMode]);

  const toggleKrishnaVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showMessage("Speech Recognition not supported on this browser.");
      return;
    }
    if (isKrishnaVoiceListening) {
      setIsKrishnaVoiceListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsKrishnaVoiceListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setKrishnaInput((prev) => (prev ? prev + " " + transcript : transcript));
        }
        setIsKrishnaVoiceListening(false);
      };

      recognition.onerror = () => {
        setIsKrishnaVoiceListening(false);
      };

      recognition.onend = () => {
        setIsKrishnaVoiceListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn("Voice error:", e);
      setIsKrishnaVoiceListening(false);
    }
  };

  // ==========================================
  // WEB AUDIO ENGINE (OFFLINE HARMONIC CHIME)
  // ==========================================
  const playFocusCompletionChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const playTone = (freq: number, start: number, dur: number, vol = 0.25) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0, ctx.currentTime + start);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };

      // 3-Stage Miraculous Harmonic Chime (528Hz -> 660Hz -> 792Hz)
      playTone(528, 0, 1.2, 0.22);
      playTone(660, 0.35, 1.5, 0.20);
      playTone(792, 0.7, 2.0, 0.18);
    } catch (e) {
      console.warn("Web Audio chime unavailable:", e);
    }
  };

  // ==========================================
  // FOCUS TIMER ENGINE EFFECT (TIMESTAMP PRECISE)
  // ==========================================
  useEffect(() => {
    let interval: any = null;
    if (focusState.isOpen && focusState.isRunning) {
      lastFocusTickRef.current = Date.now();
      interval = setInterval(() => {
        const now = Date.now();
        const deltaSec = Math.max(1, Math.min(300, Math.round((now - lastFocusTickRef.current) / 1000)));
        lastFocusTickRef.current = now;

        setFocusState((prev) => {
          if (!prev.isRunning) return prev;

          if (prev.mode === "stopwatch") {
            return {
              ...prev,
              totalFocusedSeconds: prev.totalFocusedSeconds + deltaSec,
            };
          }

          if (prev.secondsLeft <= deltaSec) {
            playFocusCompletionChime();
            const finishedMinutes = prev.durationMinutes;

            if (prev.mode === "timer") {
              const starsEarned = 1;
              const xpEarned = 50;
              const newTotalMins = (profile.totalFocusMinutes || 0) + finishedMinutes;
              updateProfileFirebase({
                stars: (profile.stars || 0) + starsEarned,
                xp: (profile.xp || 0) + xpEarned,
                totalFocusMinutes: newTotalMins,
              });

              if (prev.topicId) {
                const updatedTopics = (brain.studyTopics || []).map((tp: any) =>
                  tp.id === prev.topicId
                    ? { ...tp, focusMinutes: (tp.focusMinutes || 0) + finishedMinutes }
                    : tp
                );
                updateBrainFirebase({ studyTopics: updatedTopics });
              }

              showMessage(`🎉 Custom Timer Complete! +${starsEarned} Star ⭐ & +${xpEarned} XP Earned! ⚡`);

              const resetMins = prev.customTimerMinutes || prev.durationMinutes || 10;
              return {
                ...prev,
                isBreak: false,
                durationMinutes: resetMins,
                secondsLeft: resetMins * 60,
                isRunning: false,
                totalFocusedSeconds: prev.totalFocusedSeconds + deltaSec,
              };
            }

            if (!prev.isBreak) {
              const starsEarned = 1;
              const xpEarned = 50;
              const newTotalMins = (profile.totalFocusMinutes || 0) + finishedMinutes;
              updateProfileFirebase({
                stars: (profile.stars || 0) + starsEarned,
                xp: (profile.xp || 0) + xpEarned,
                totalFocusMinutes: newTotalMins,
              });

              if (prev.topicId) {
                const updatedTopics = (brain.studyTopics || []).map((tp: any) =>
                  tp.id === prev.topicId
                    ? { ...tp, focusMinutes: (tp.focusMinutes || 0) + finishedMinutes }
                    : tp
                );
                updateBrainFirebase({ studyTopics: updatedTopics });
              }

              applyBattleFocusStrike(finishedMinutes);
              showMessage(`🎉 Focus Session Complete! +${starsEarned} Star ⭐ & +${xpEarned} XP Earned! ⚡`);

              const breakMins = prev.mode === "deepflow" ? 10 : 5;
              return {
                ...prev,
                isBreak: true,
                durationMinutes: breakMins,
                secondsLeft: breakMins * 60,
                isRunning: false,
                totalFocusedSeconds: prev.totalFocusedSeconds + deltaSec,
              };
            } else {
              showMessage("☕ Break Finished! Ready for another deep work sprint?");
              const workMins = prev.mode === "deepflow" ? 50 : 25;
              return {
                ...prev,
                isBreak: false,
                durationMinutes: workMins,
                secondsLeft: workMins * 60,
                isRunning: false,
              };
            }
          }

          return {
            ...prev,
            secondsLeft: Math.max(0, prev.secondsLeft - deltaSec),
            totalFocusedSeconds: prev.totalFocusedSeconds + deltaSec,
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [focusState.isOpen, focusState.isRunning, focusState.mode, profile.stars, profile.xp, profile.totalFocusMinutes, brain.studyTopics]);

  // ==========================================
  // FOCUS ENGINE HELPERS
  // ==========================================
  const startFocusSession = (title?: string, taskId?: string, topicId?: string, defaultMode: "pomodoro" | "deepflow" | "timer" | "stopwatch" = "pomodoro") => {
    const customMins = focusState.customTimerMinutes || 10;
    const mins = defaultMode === "deepflow" ? 50 : defaultMode === "pomodoro" ? 25 : defaultMode === "timer" ? customMins : 0;
    setFocusState({
      isOpen: true,
      mode: defaultMode,
      durationMinutes: mins,
      customTimerMinutes: customMins,
      secondsLeft: mins * 60,
      isRunning: true,
      isBreak: false,
      taskId: taskId || null,
      taskTitle: title || "Deep Focus Chamber",
      topicId: topicId || null,
      totalFocusedSeconds: 0,
    });
  };

  const switchFocusMode = (mode: "pomodoro" | "deepflow" | "timer" | "stopwatch") => {
    const customMins = focusState.customTimerMinutes || 10;
    const mins = mode === "deepflow" ? 50 : mode === "pomodoro" ? 25 : mode === "timer" ? customMins : 0;
    setFocusState((prev) => ({
      ...prev,
      mode,
      durationMinutes: mins,
      secondsLeft: mins * 60,
      isRunning: false,
      isBreak: false,
      totalFocusedSeconds: 0,
    }));
  };

  const setCustomTimerDuration = (mins: number) => {
    const validMins = Math.max(1, Math.min(180, mins));
    setFocusState((prev) => ({
      ...prev,
      customTimerMinutes: validMins,
      durationMinutes: validMins,
      secondsLeft: validMins * 60,
      isRunning: false,
      isBreak: false,
    }));
  };

  // ==========================================
  // GITA & TWO-BOX REFLECTION HELPERS
  // ==========================================
  const discussGitaShloka = (shloka: GitaShloka) => {
    const textPrompt = `प्रणाम सखा! आज के श्लोक (${shloka.chapter}, ${shloka.verse}) "${shloka.sanskrit}" ("${shloka.hindi}") का मेरे आज के दैनिक जीवन और कर्म में क्या व्यावहारिक अर्थ है? कृपया मुझे सरल भाषा में समझाएं।`;
    setKrishnaInput(textPrompt);
    sendKrishnaMessage(textPrompt);
  };

  const getSelectedTwoBox = () => {
    const dayRecord = trackerData[selectedDate] || {};
    const tb = dayRecord.twoBox || {};
    return {
      failures: Array.isArray(tb.failures) ? tb.failures : [],
      achievements: Array.isArray(tb.achievements) ? tb.achievements : [],
      cleanedFailures: Array.isArray(tb.cleanedFailures) ? tb.cleanedFailures : [],
      cleanupCompleted: !!tb.cleanupCompleted,
      rating: typeof tb.rating === "number" ? tb.rating : 5
    };
  };

  const isCleanupHourActive = () => {
    const hr = new Date().getHours();
    return hr >= 21 && hr <= 23; // 21:00 to 23:59 (9:00 PM to 12:00 AM Midnight)
  };

  const addBox1Failure = (text: string) => {
    if (!text.trim()) return;
    const current = getSelectedTwoBox();
    const updated = {
      ...current,
      failures: [...current.failures, text.trim()]
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
    setBox1Input("");
    showMessage("🛑 Logged in Box 1: Radical honesty acknowledged.");
  };

  const removeBox1Failure = (index: number) => {
    const current = getSelectedTwoBox();
    const updated = {
      ...current,
      failures: current.failures.filter((_: any, i: number) => i !== index)
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
  };

  const addBox2Achievement = (text: string) => {
    if (!text.trim()) return;
    const current = getSelectedTwoBox();
    const updated = {
      ...current,
      achievements: [...current.achievements, text.trim()]
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
    setBox2Input("");
    showMessage("🏆 Logged in Box 2: Victory registered! Keep crushing it.");
  };

  const removeBox2Achievement = (index: number) => {
    const current = getSelectedTwoBox();
    const updated = {
      ...current,
      achievements: current.achievements.filter((_: any, i: number) => i !== index)
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
  };

  const cleanBadHabit = (index: number) => {
    const current = getSelectedTwoBox();
    const itemToClean = current.failures[index];
    if (!itemToClean) return;
    const updated = {
      ...current,
      failures: current.failures.filter((_: any, i: number) => i !== index),
      cleanedFailures: [...current.cleanedFailures, itemToClean]
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
    updateProfileFirebase({
      xp: (profile.xp || 0) + 10
    });
    showMessage(`🧹 Habit Cleaned: "${itemToClean}" pattern eliminated! (+10 XP)`);
  };

  const convertBadHabitToWin = (index: number) => {
    const current = getSelectedTwoBox();
    const itemToConvert = current.failures[index];
    if (!itemToConvert) return;
    const victoryText = `Conquered: ${itemToConvert}`;
    const updated = {
      ...current,
      failures: current.failures.filter((_: any, i: number) => i !== index),
      achievements: [...current.achievements, victoryText],
      cleanedFailures: [...current.cleanedFailures, itemToConvert]
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
    updateProfileFirebase({
      xp: (profile.xp || 0) + 20
    });
    showMessage(`✨ Transformed: Slippage converted into an Achievement! (+20 XP)`);
  };

  const handleSetTwoBoxRating = (starVal: number) => {
    setTwoBoxRating(starVal);
    const current = getSelectedTwoBox();
    const updated = {
      ...current,
      rating: starVal,
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    updateTrackerFirebase(selectedDate, { ...dayRecord, twoBox: updated });
    showMessage(`⭐ Discipline Rating auto-saved: ${starVal}/5 Stars`);
  };

  const completeDailyCleanup = () => {
    const current = getSelectedTwoBox();
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };

    if (current.cleanupCompleted || dayRecord.twoBoxAudited) {
      showMessage("✅ Daily Habit Cleanup is already locked in for this date (+30 XP already claimed).");
      return;
    }

    const updated = {
      ...current,
      cleanupCompleted: true,
      rating: twoBoxRating
    };
    const cleanupNote = `\n\n[📦 The Two-Box System - 9 PM to 12 AM Habit Cleanup]\n🛑 Box 1 (Failures Logged): ${current.failures.length}\n🏆 Box 2 (Achievements Stored): ${current.achievements.length}\n🧹 Cleaned & Conquered: ${current.cleanedFailures.length}\n✨ Daily Status: Habit Cleanup Protocol Executed.`;
    const updatedSummary = (dayRecord.summary || "") + cleanupNote;
    updateTrackerFirebase(selectedDate, { ...dayRecord, summary: updatedSummary, twoBox: updated, twoBoxAudited: true });
    updateProfileFirebase({
      xp: (profile.xp || 0) + 30
    });
    applyBattleTwoBoxFinisher();
    showMessage("🎉 Daily Habit Cleanup Complete! Locked in for tonight (+30 XP)! 🧹✨");
  };

  const getMonthlyTwoBoxStats = () => {
    const currentYearMonth = selectedDate.substring(0, 7); // e.g. "2026-09"
    let totalWins = 0;
    let totalFailures = 0;
    let totalCleaned = 0;
    const allMonthlyAchievements: { date: string; text: string }[] = [];

    Object.keys(trackerData).forEach((dStr) => {
      if (dStr.startsWith(currentYearMonth)) {
        const tb = trackerData[dStr]?.twoBox || {};
        const wins = Array.isArray(tb.achievements) ? tb.achievements : [];
        const fails = Array.isArray(tb.failures) ? tb.failures : [];
        const cleans = Array.isArray(tb.cleanedFailures) ? tb.cleanedFailures : [];

        totalWins += wins.length;
        totalFailures += fails.length;
        totalCleaned += cleans.length;

        wins.forEach((w: string) => {
          allMonthlyAchievements.push({ date: dStr, text: w });
        });
      }
    });

    return {
      totalWins,
      totalFailures,
      totalCleaned,
      allMonthlyAchievements: allMonthlyAchievements.reverse(),
    };
  };

  // ==========================================
  // AUTOMATED WEEKLY AI PERFORMANCE REVIEW
  // ==========================================
  const generateWeeklyAiReview = async () => {
    if (!profile.geminiKey) {
      showMessage("Please add your Gemini API Key in Settings to generate AI Performance Reviews.");
      setHabitRoute("settings");
      return;
    }
    setIsGeneratingWeeklyReview(true);
    setIsWeeklyReviewOpen(true);
    setWeeklyReviewText("");

    try {
      const weeklyDataPoints = getWeeklyData(0);
      const streaksNow = getStreaks();
      const weeklySummary = weeklyDataPoints.map((d: any) => {
        const dayRecord = trackerData[d.date] || {};
        return {
          date: d.date,
          day: d.label,
          completionPercent: d.percent,
          tasksCompleted: `${d.xCount}/${d.total}`,
          shieldProtected: Boolean(dayRecord.shieldProtected),
          notes: dayRecord.summary || dayRecord.reasonForO || "None",
        };
      });

      const auditPayload = {
        daysAudited: weeklySummary.length,
        averageCompletion: Math.round(weeklySummary.reduce((acc, curr) => acc + curr.completionPercent, 0) / (weeklySummary.length || 1)),
        currentStreaks: streaksNow,
        streakShieldsInStock: profile.streakShields || 0,
        totalFocusMinutes: profile.totalFocusMinutes || 0,
        starsBalance: profile.stars || 0,
        breakdown: weeklySummary,
      };

      const promptText = `Conduct a comprehensive, structured 7-Day Weekly Performance Audit for the user based on this data:
${JSON.stringify(auditPayload, null, 2)}

Provide an elite, brutally honest yet deeply motivational mentorship report in Hinglish/English with these EXACT markdown sections:

## 🏆 1. WEEK KI SABSE BADI JEET (Top Highlights & Consistency)
Highlight their best consistent streaks, disciplined days, and top wins this week.

## ⚠️ 2. RED FLAG ZONE (Vulnerabilities & Friction)
Point out drop-offs, missed days, or patterns where focus slipped. Explain WHY it happened based on the data.

## 🎯 3. 3 ACTIONABLE MICRO-GOALS FOR NEXT WEEK
Give exactly 3 high-leverage, razor-sharp, realistic micro-goals to dominate next week.

## ⚔️ COACH'S CLOSING WAR CRY
One short, electrifying sentence of raw motivation.`;

      const aiResponse = await callGeminiApi(
        profile.geminiKey,
        [{ role: "user", parts: [{ text: promptText }] }],
        "You are an elite, world-class Peak Performance & Habit Coach (like David Goggins meets Marcus Aurelius). You deliver clear, actionable, and inspiring guidance without fluff.",
        false
      );

      setWeeklyReviewText(aiResponse);
    } catch (err: any) {
      console.error("Weekly review error:", err);
      setWeeklyReviewText(`⚠️ AI Review could not be generated: ${err?.message || "Check your network and API key."}`);
    } finally {
      setIsGeneratingWeeklyReview(false);
    }
  };

  // ==========================================
  // FACTORY RESET APP (DANGER ZONE)
  // ==========================================
  const handleFactoryResetApp = async () => {
    const confirmed = window.confirm(
      "⚠️ DANGER: FACTORY RESET ENTIRE APP?\n\nThis will completely wipe all habits, Second Brain tasks, Krishna chat logs, XP, stars, streak shields, and reflections from both local storage and cloud database. The app will restart completely fresh from 0 as a brand-new installation.\n\nAre you sure you want to proceed?"
    );
    if (!confirmed) return;

    try {
      showMessage("⏳ Factory Resetting App to Fresh State...");

      // 1. Initial Fresh Default Objects
      const freshProfile = {
        name: "Prateek Maurya",
        stars: 0,
        streakShields: 0,
        xp: 0,
        totalFocusMinutes: 0,
        geminiKey: "",
        inventory: [],
        dp: "",
        activeTheme: "brutalist",
        customTasks: DEFAULT_TASKS,
        customShopItems: ensureShopItems(SHOP_ITEMS),
      };

      const freshBrain = {
        syllabusCategories: ["Raw Backlog"],
        stagingTopics: [],
        studyTopics: [],
        masteredTopics: [],
        wisdomCategories: ["Quick Thoughts"],
        wisdomNotes: [],
        vaultNotes: [],
        vaultCategories: ["Others"],
        globalDeadlineDays: 30,
        customMissions: [],
        scheduledEvents: [],
        lastActiveDate: getRealTodayStr(),
      };

      const freshKrishna: KrishnaState = {
        conversations: [],
        activeConversationId: null,
      };

      const freshTracker: Record<string, any> = {};

      // 2. Wipe LocalStorage completely and re-seed clean defaults
      localStorage.clear();
      try {
        localStorage.setItem("apex_profile_v5", JSON.stringify(freshProfile));
        localStorage.setItem("apex_brain_v5", JSON.stringify(freshBrain));
        localStorage.setItem("apex_krishna_v5", JSON.stringify(freshKrishna));
        localStorage.setItem("apex_tracker_v5", JSON.stringify(freshTracker));
      } catch (e) {
        console.warn("Storage reset write error:", e);
      }

      // 3. Wipe Firestore Cloud Documents if user is connected
      if (user && db) {
        await setDoc(doc(db, "artifacts", appId, "users", user.uid, "rpg_profile", "data"), freshProfile);
        await setDoc(doc(db, "artifacts", appId, "users", user.uid, "second_brain", "data"), freshBrain);
        await setDoc(doc(db, "artifacts", appId, "users", user.uid, "my_krishna", "data"), freshKrishna);

        try {
          const trackerSnap = await getDocs(collection(db, "artifacts", appId, "users", user.uid, "tracker_data"));
          const deletePromises = trackerSnap.docs.map((d) => deleteDoc(d.ref));
          await Promise.all(deletePromises);
        } catch (err) {
          console.warn("Error wiping tracker collection in Firestore:", err);
        }
      }

      // 4. Reset in-memory React states immediately
      setProfile(freshProfile);
      setBrain(freshBrain);
      setKrishnaState(freshKrishna);
      setTrackerData(freshTracker);
      const realToday = getRealTodayStr();
      setTodayStr(realToday);
      setSelectedDate(realToday);
      const [y, m] = realToday.split("-");
      setCalYear(parseInt(y));
      setCalMonth(parseInt(m) - 1);
      setFocusState({
        isOpen: false,
        mode: "pomodoro",
        durationMinutes: 25,
        customTimerMinutes: 10,
        secondsLeft: 25 * 60,
        isRunning: false,
        isBreak: false,
        taskId: null,
        taskTitle: null,
        topicId: null,
        totalFocusedSeconds: 0,
      });
      setChatMessages([{ role: "ai", text: "I am your Habit Tracker Coach. What's on your mind today?" }]);
      setChatInput("");

      showMessage("✨ App completely reset to factory default! Fresh install state active.");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Factory reset failed:", error);
      showMessage("❌ Factory reset failed. Please try again.");
    }
  };

  // ==========================================
  // RENDER: MY KRISHNA DIVINE OS
  // ==========================================
  const renderMyKrishna = () => {
    const activeConv = krishnaState.conversations.find(c => c.id === krishnaState.activeConversationId) || null;
    const messages = activeConv ? activeConv.messages : [];

    const QUICK_STARTERS = [
      {
        id: "calm_mind",
        icon: "🪶",
        title: "Calm My Mind",
        subtitle: "मन बहुत अशांत है",
        tag: "Shanti & Sthirta",
        prompt: "हे कृष्ण, मेरा मन बहुत अशांत और विचलित है। विचारों के कोलाहल से मुक्ति और आत्मिक शांति का मार्ग बताएं।"
      },
      {
        id: "clarity",
        icon: "🏹",
        title: "Need Clarity on Decision",
        subtitle: "फैसला लेने में असमंजस है",
        tag: "Dharma & Decision",
        prompt: "सखा कृष्ण, मैं जीवन के एक कठिन दोराहे पर हूँ और सही निर्णय नहीं ले पा रहा। मोह और कर्तव्य के बीच मुझे सही मार्ग का दर्शन कराएं।"
      },
      {
        id: "master_impulses",
        icon: "🛡️",
        title: "Master My Impulses",
        subtitle: "क्रोध या वासना पर काबू नहीं",
        tag: "Self-Control & Focus",
        prompt: "पार्थ के सारथी, मेरी इंद्रियाँ और चंचल मन मुझे बार-बार भटका रहे हैं। काम, क्रोध और वासना पर विजय पाने का व्यावहारिक मार्ग बताएं।"
      },
      {
        id: "daily_gita",
        icon: "📖",
        title: "Today's Gita Guidance",
        subtitle: "आज का गीता उपदेश",
        tag: "Daily Shloka & Karma",
        prompt: "सखा कृष्ण, आज के मेरे दिन के लिए श्रीमद्भगवद्गीता का एक विशेष दिव्य मार्गदर्शन और आचरण सूत्र प्रदान करें।"
      }
    ];

    return (
      <div className="space-y-4 max-w-3xl mx-auto pb-24 sm:pb-28 animate-in fade-in duration-300">
        {/* DIVINE HEADER CARD */}
        <div className="relative overflow-hidden rounded-3xl p-5 sm:p-7 border-2 border-amber-400/40 bg-gradient-to-br from-[#0b1b3a]/95 via-[#081326]/95 to-[#040814]/98 shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(251,191,36,0.08)] backdrop-blur-2xl">
          {/* Celestial background radiance */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-400/10 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-[0_0_25px_rgba(251,191,36,0.4)] flex items-center justify-center animate-pulse">
                  <div className="w-full h-full rounded-[14px] bg-[#071326] flex items-center justify-center text-2xl sm:text-3xl">
                    🪶
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                    MY KRISHNA
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    मार्गदर्शन
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-amber-200/70 font-medium tracking-wide mt-0.5">
                  "सखा, मार्गदर्शक और शाश्वत प्रेरणा" • श्रीमद्भगवद्गीता
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS: CONVERSATIONS DRAWER & NEW CHAT */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setIsConvDrawerOpen(true)}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#0e2142] border border-amber-400/30 hover:border-amber-400 text-amber-200 text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:bg-[#142d59] transition-all tap-effect active:scale-95"
              >
                <History size={15} className="text-amber-400" />
                <span>Chats</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[9px] font-black">
                  {krishnaState.conversations.length}
                </span>
              </button>

              <button
                onClick={() => startNewKrishnaChat()}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all tap-effect active:scale-95"
              >
                <Plus size={16} className="stroke-[3]" />
                <span>New Chat</span>
              </button>
            </div>
          </div>

          {/* ACTIVE CONVERSATION BANNER */}
          {activeConv && (
            <div className="mt-4 pt-3.5 border-t border-amber-400/20 flex items-center justify-between gap-3 text-[11px] text-amber-300/80">
              <div className="flex items-center gap-2 truncate">
                <span className="text-amber-400 font-bold">संवाद:</span>
                {editingConvId === activeConv.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editTitleText}
                      onChange={(e) => setEditTitleText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          renameKrishnaConversation(activeConv.id, editTitleText);
                          setEditingConvId(null);
                        }
                      }}
                      className="px-2 py-0.5 rounded bg-black/60 border border-amber-400 text-white text-xs outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        renameKrishnaConversation(activeConv.id, editTitleText);
                        setEditingConvId(null);
                      }}
                      className="text-green-400 hover:text-green-300 font-bold text-xs"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setEditingConvId(null)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <span className="font-semibold text-amber-100 truncate">{activeConv.title}</span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {editingConvId !== activeConv.id && (
                  <button
                    onClick={() => {
                      setEditingConvId(activeConv.id);
                      setEditTitleText(activeConv.title);
                    }}
                    className="p-1 rounded-lg hover:bg-white/10 text-amber-300/70 hover:text-amber-200 transition-colors"
                    title="Rename Chat"
                  >
                    <Edit3 size={13} />
                  </button>
                )}
                <button
                  onClick={() => deleteKrishnaConversation(activeConv.id)}
                  className="p-1 rounded-lg hover:bg-red-500/20 text-red-400/70 hover:text-red-300 transition-colors"
                  title="Delete Chat"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CONVERSATION HISTORY SLIDING DRAWER MODAL */}
        {isConvDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex justify-start items-stretch bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div
              className="w-full max-w-sm sm:max-w-md h-full bg-[#061021] border-r-2 border-amber-400/40 shadow-2xl p-5 flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-amber-400/20 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🪶</span>
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wider text-amber-300">
                        Sanwad Itihas
                      </h3>
                      <p className="text-[10px] text-amber-200/60 font-medium">All Past Conversations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsConvDrawerOpen(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 hover:text-white transition-all tap-effect"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Top CTA inside Drawer */}
                <button
                  onClick={() => startNewKrishnaChat()}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg mb-4 tap-effect"
                >
                  <Plus size={16} className="stroke-[3]" /> Start New Conversation
                </button>

                {/* Conversation List */}
                <div className="space-y-2.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                  {krishnaState.conversations.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-amber-400/30 rounded-2xl">
                      <span className="text-3xl block mb-2 opacity-60">🪶</span>
                      <p className="text-xs text-amber-200/70 font-semibold">No past conversations yet.</p>
                      <p className="text-[10px] text-amber-200/40 mt-1">Start a new chat to begin receiving divine guidance.</p>
                    </div>
                  ) : (
                    krishnaState.conversations.map((conv) => {
                      const isActive = conv.id === krishnaState.activeConversationId;
                      const msgCount = conv.messages.length;
                      return (
                        <div
                          key={conv.id}
                          onClick={() => selectKrishnaConversation(conv.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                            isActive
                              ? "bg-gradient-to-r from-amber-400/20 to-blue-500/10 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                              : "bg-[#0a172e]/80 border-amber-400/20 hover:border-amber-400/60 text-slate-300 hover:bg-[#0f203d]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className="text-lg flex-shrink-0">
                              {isActive ? "✨" : "📜"}
                            </span>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-xs truncate text-amber-100">
                                {conv.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[9px] text-amber-200/50 mt-0.5">
                                <span>{msgCount} messages</span>
                                <span>•</span>
                                <span>
                                  {new Date(conv.lastUpdated).toLocaleDateString([], {
                                    month: "short",
                                    day: "numeric"
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteKrishnaConversation(conv.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400/80 hover:text-red-400 transition-colors"
                              title="Delete conversation"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-amber-400/20 text-center">
                <span className="text-[10px] text-amber-300/50 font-medium">
                  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
                </span>
              </div>
            </div>

            {/* Click backdrop to close */}
            <div className="flex-1" onClick={() => setIsConvDrawerOpen(false)}></div>
          </div>
        )}

        {/* DAILY GITA SHLOKA CARD */}
        {(() => {
          const dailyShloka = getDailyGitaShloka();
          return (
            <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 border-2 border-amber-400/50 bg-gradient-to-br from-[#122347]/95 via-[#0b1b3a]/95 to-[#061024]/98 shadow-[0_10px_35px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(251,191,36,0.1)] text-amber-100 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3 border-b border-amber-400/25 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🪶</span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300">
                    आज का दिव्य श्लोक • Daily Gita Shloka
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {dailyShloka.chapter} • {dailyShloka.verse}
                </span>
              </div>

              {/* Sanskrit Verse */}
              <div className="my-3 p-3.5 rounded-2xl bg-[#060e1f]/80 border border-amber-400/30 text-center shadow-inner">
                <p className="font-serif text-sm sm:text-base font-bold text-amber-200 tracking-wide leading-relaxed italic">
                  "{dailyShloka.sanskrit}"
                </p>
              </div>

              {/* Hindi Translation */}
              <div className="space-y-1.5 mb-3.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-300/80 block">
                  🌸 सरल भावार्थ (Meaning):
                </span>
                <p className="text-xs sm:text-sm text-amber-100/90 font-sans leading-relaxed">
                  {dailyShloka.hindi}
                </p>
              </div>

              {/* Practical Life Lesson */}
              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/25 mb-4 flex items-start gap-2">
                <span className="text-base shrink-0 mt-0.5">⚡</span>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                    आज का जीवन सूत्र (Practical Action):
                  </span>
                  <p className="text-[11px] sm:text-xs text-amber-200/90 font-sans font-medium">
                    {dailyShloka.lesson}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Discuss with Krishna & Two-Box Reflection */}
              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                <button
                  onClick={() => discussGitaShloka(dailyShloka)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 tap-effect"
                >
                  <Sparkles size={14} className="stroke-[2.5]" />
                  <span>सखा से इस श्लोक पर चर्चा करें</span>
                </button>

                <button
                  onClick={() => setIsTwoBoxModalOpen(true)}
                  className="py-2.5 px-3.5 rounded-xl bg-[#091630] border border-amber-400/40 text-amber-200 text-xs font-black uppercase tracking-wider hover:bg-[#0f244f] active:scale-95 transition-all flex items-center justify-center gap-1.5 tap-effect"
                >
                  <span>📦</span>
                  <span className="hidden sm:inline">Two-Box Audit</span>
                </button>
              </div>
            </div>
          );
        })()}

        {/* MAIN CHAT & GUIDANCE CONTAINER */}
        <div className="relative rounded-3xl border-2 border-amber-400/30 bg-[#060e1d]/90 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col min-h-[580px] max-h-[75vh]">
          {/* SCROLLABLE MESSAGE STREAM */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* EMPTY STATE / STARTERS */}
            {messages.length === 0 && (
              <div className="py-4 sm:py-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Divine Greeting Card */}
                <div className="text-center space-y-2 p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/80 to-[#081326]/90 border border-amber-400/30 shadow-lg">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-[0_0_30px_rgba(251,191,36,0.4)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#071326] flex items-center justify-center text-3xl">
                      🪶
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-amber-300 tracking-wide">
                    प्रणाम {profile.name || "पार्थ"}! कहो क्या दुविधा है?
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg mx-auto leading-relaxed">
                    तुम्हारा सखा, सारथी और मार्गदर्शक तुम्हारे साथ है। मन की कोई भी उलझन, भय, क्रोध, वासना या कर्म का संशय हो, निसंकोच कहो।
                  </p>
                </div>

                {/* Quick Mood Action Starters Grid */}
                <div>
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400/80 mb-3 px-1 flex items-center gap-2">
                    <span>✨</span> त्वरित मार्गदर्शन (Quick Starters)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUICK_STARTERS.map((starter) => (
                      <button
                        key={starter.id}
                        onClick={() => sendKrishnaMessage(starter.prompt)}
                        className="p-4 rounded-2xl border border-amber-400/30 bg-[#0c1a33]/80 hover:bg-[#112447] hover:border-amber-400 text-left transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] tap-effect hover-lift group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 group-hover:scale-110 transition-transform">
                            {starter.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block mb-0.5">
                              {starter.tag}
                            </span>
                            <h5 className="font-bold text-xs sm:text-sm text-amber-100 group-hover:text-amber-200">
                              {starter.title}
                            </h5>
                            <p className="text-[10px] sm:text-xs text-amber-200/60 mt-0.5 truncate">
                              {starter.subtitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MESSAGES FEED */}
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div className={`max-w-[88%] sm:max-w-[80%] flex items-start gap-2.5 sm:gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {isUser ? (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 border border-blue-400/50 flex items-center justify-center text-xs font-black text-white shadow-md">
                          {profile.name ? profile.name.slice(0, 1).toUpperCase() : "U"}
                        </div>
                      ) : (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 shadow-[0_0_12px_rgba(251,191,36,0.5)] flex items-center justify-center">
                          <div className="w-full h-full rounded-[10px] bg-[#071326] flex items-center justify-center text-sm">
                            🪶
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Bubble Body */}
                    <div
                      className={`p-4 sm:p-5 rounded-3xl shadow-xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-tr-sm border border-blue-400/40"
                          : "bg-gradient-to-br from-[#0c1c38]/95 via-[#09152b]/95 to-[#050b17]/98 text-amber-100 rounded-tl-sm border-2 border-amber-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(251,191,36,0.05)]"
                      }`}
                    >
                      {/* Name / Role Label for Krishna */}
                      {!isUser && (
                        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-amber-400/20 text-[10px] font-black uppercase tracking-wider text-amber-300">
                          <span className="flex items-center gap-1.5">
                            <span>🪶</span> श्रीकृष्ण
                          </span>
                          <span className="text-[8px] opacity-60 font-mono">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}

                      {/* Content with whitespace formatting */}
                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm space-y-2">
                        {msg.text}
                      </div>

                      {/* Timestamp */}
                      <div className={`text-right text-[8px] opacity-60 font-mono mt-2 ${isUser ? "text-blue-200" : "text-amber-200/60"}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* TYPING INDICATOR */}
            {isKrishnaTyping && (
              <div className="flex justify-start animate-in fade-in">
                <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0b1b38] border border-amber-400/40 shadow-lg text-amber-300">
                  <span className="text-lg animate-bounce">🪶</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-200"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wide text-amber-200/80 ml-1">
                    भगवान कृष्ण विचार कर रहे हैं...
                  </span>
                </div>
              </div>
            )}

            <div ref={krishnaChatEndRef} />
          </div>

          {/* DIVINE INTERACTIVE INPUT BAR */}
          <div className="p-3.5 sm:p-4 border-t-2 border-amber-400/30 bg-[#071326]/95 backdrop-blur-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Voice recognition trigger */}
              <button
                type="button"
                onClick={toggleKrishnaVoiceInput}
                className={`p-3 rounded-2xl tap-effect transition-all flex items-center justify-center flex-shrink-0 ${
                  isKrishnaVoiceListening
                    ? "bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                    : "bg-[#0d2040] hover:bg-[#142e5c] border border-amber-400/30 text-amber-300"
                }`}
                title="Voice Input (Hindi/English)"
              >
                <Mic size={18} />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={krishnaInput}
                onChange={(e) => setKrishnaInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isKrishnaTyping) {
                    sendKrishnaMessage();
                  }
                }}
                placeholder={isKrishnaVoiceListening ? "Listening... Speak in Hindi or English..." : "सखा कृष्ण से मार्गदर्शन मांगें..."}
                disabled={isKrishnaTyping}
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#0b1830] border border-amber-400/40 text-amber-100 placeholder:text-amber-300/40 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.3)] outline-none transition-all font-sans"
              />

              {/* Send Button */}
              <button
                type="button"
                onClick={() => sendKrishnaMessage()}
                disabled={isKrishnaTyping || !krishnaInput.trim()}
                className="px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black tap-effect transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] flex-shrink-0 active:scale-95"
              >
                <Send size={18} className="stroke-[2.5]" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[9px] text-amber-300/50 mt-2 px-1">
              <span>🪶 श्रीमद्भगवद्गीता ज्ञान • संशय निवारण</span>
              <span>Enter to Send ↵</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // ⚔️ 1v1 PVP DISCIPLINE BATTLE ARENA MODAL
  // ==========================================
  const renderBattleArenaModal = () => {
    const myUid = user?.uid || "local_player";
    const isHost = activeBattleRoom?.host?.uid === myUid;
    const isWinner = activeBattleRoom?.winnerUid === myUid;
    const isGameOver = activeBattleRoom?.status === "completed";

    const hostHpPercent = Math.max(0, Math.min(100, Math.round(((activeBattleRoom?.host?.hp ?? 1000) / 1000) * 100)));
    const challengerHpPercent = Math.max(0, Math.min(100, Math.round(((activeBattleRoom?.challenger?.hp ?? 1000) / 1000) * 100)));

    const tauntPresets = [
      "⚔️ You can't match my discipline!",
      "🔥 Is that all you got? I'm just warming up!",
      "🛡️ My streak shields are impenetrable!",
      "⏱️ Locked in deep focus... are you?",
      "👑 Victory is already mine!",
      "🧠 Mind over matter. Surrender now!",
    ];

    return (
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
        <div className={`w-full max-w-3xl rounded-3xl p-4 sm:p-6 shadow-2xl border-2 ${t.card} ${t.borderAccent} relative max-h-[94vh] overflow-y-auto space-y-4 text-white animate-modal-sleek`}>

          {/* Floating Combat VFX Particle Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
            {combatVFXList.map((vfx) => (
              <div
                key={vfx.id}
                className={`absolute top-1/3 left-1/2 -translate-x-1/2 text-sm sm:text-xl font-black uppercase tracking-wider ${
                  vfx.type === "crit"
                    ? "text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-combat-crit"
                    : vfx.type === "shield"
                    ? "text-sky-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)] animate-combat-shield"
                    : vfx.type === "taunt"
                    ? "text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] animate-speech-bubble"
                    : "text-rose-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] animate-combat-damage"
                }`}
              >
                {vfx.text}
              </div>
            ))}
          </div>

          {/* Active In-Battle Taunt Banner */}
          {activeTauntBanner && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-purple-600/30 border border-purple-400/60 shadow-lg flex items-center justify-between gap-3 animate-taunt-banner">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl">💬</span>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase text-purple-300 block">{activeTauntBanner.sender} Taunts:</span>
                  <p className="text-xs sm:text-sm font-bold text-white truncate">"{activeTauntBanner.message}"</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTauntBanner(null)}
                className="text-xs text-purple-300 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-red-500/30 to-amber-500/30 border border-red-400/50 text-red-300 shadow-md text-xl sm:text-2xl animate-pulse">
                ⚔️
              </div>
              <div>
                <h3 className={`font-black text-sm sm:text-xl uppercase tracking-wider text-red-400 ${t.fontHeading} flex items-center gap-1.5`}>
                  Discipline Battle Arena <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">1v1 PvP</span>
                </h3>
                <p className={`text-[10px] sm:text-xs font-medium ${t.textMuted}`}>
                  Real-time multiplayer habit warfare • 1000 HP combat
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsBattleArenaOpen(false)}
              className="p-2 sm:p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white tap-effect transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Top Sub-Navigation Tabs */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 p-1 rounded-2xl bg-black/40 border border-white/10">
            <button
              onClick={() => setBattleTab("arena")}
              className={`py-2 px-1 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 tap-effect transition-all ${
                battleTab === "arena"
                  ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Swords size={13} /> Arena {activeBattleRoom ? "🔥" : ""}
            </button>
            <button
              onClick={() => setBattleTab("create")}
              className={`py-2 px-1 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 tap-effect transition-all ${
                battleTab === "create"
                  ? "bg-amber-500 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Plus size={13} /> Host
            </button>
            <button
              onClick={() => setBattleTab("join")}
              className={`py-2 px-1 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 tap-effect transition-all ${
                battleTab === "join"
                  ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users size={13} /> Join
            </button>
            <button
              onClick={() => setBattleTab("history")}
              className={`py-2 px-1 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 tap-effect transition-all ${
                battleTab === "history"
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Trophy size={13} /> PvP Stats
            </button>
          </div>

          {/* TAB 1: ACTIVE COMBAT ARENA */}
          {battleTab === "arena" && (
            <div className="space-y-3.5">
              {!activeBattleRoom ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 text-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-3xl sm:text-4xl animate-bounce">
                    ⚔️
                  </div>
                  <div>
                    <h4 className="text-base sm:text-xl font-black text-white uppercase tracking-wider">No Active Battle Room</h4>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
                      Challenge a friend to a 1v1 discipline war! Host a new battle or join with a 6-digit room code.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setBattleTab("create")}
                      className={`w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg tap-effect ${t.fontHeading}`}
                    >
                      🔥 Host a Battle
                    </button>
                    <button
                      onClick={() => setBattleTab("join")}
                      className={`w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs sm:text-sm uppercase tracking-wider tap-effect ${t.fontHeading}`}
                    >
                      🔗 Join with Code
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {/* Active Match Banner & Room Code Copy */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-black/50 border border-red-500/30 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase px-2.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                        {activeBattleRoom.status === "active" ? "🟢 LIVE WAR" : activeBattleRoom.status === "completed" ? "🏁 FINISHED" : "⏳ WAITING"}
                      </span>
                      <span className="text-xs font-black uppercase text-amber-300">
                        {activeBattleRoom.format === "blitz" ? "⚡ 24H Daily Blitz" : activeBattleRoom.format === "siege" ? "⚔️ 7-Day Habit Siege" : "⏱️ Focus Duel"}
                      </span>
                      {/* Live WebRTC Peer Status Pill */}
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase px-2 py-1 rounded-lg flex items-center gap-1 ${
                        battleConnectionStatus === "connected"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : battleConnectionStatus === "connecting"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 animate-pulse"
                          : battleConnectionStatus === "hosting"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                          : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                      }`}>
                        {battleConnectionStatus === "connected" ? (
                          <>🛜 <span className="hidden sm:inline">Live Peer</span></>
                        ) : battleConnectionStatus === "connecting" ? (
                          <>⏳ <span className="hidden sm:inline">Connecting…</span></>
                        ) : battleConnectionStatus === "hosting" ? (
                          <>📡 <span className="hidden sm:inline">Waiting for Challenge</span></>
                        ) : (
                          <>🚫 <span className="hidden sm:inline">Offline</span></>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(activeBattleRoom.roomCode);
                            showMessage(`📋 Room Code [${activeBattleRoom.roomCode}] copied to clipboard!`);
                          }
                        }}
                        className="px-2.5 sm:px-3 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-black uppercase flex items-center gap-1.5 tap-effect"
                        title="Click to copy Room Code"
                      >
                        <Copy size={12} /> Code: <span className="font-mono tracking-widest">{activeBattleRoom.roomCode}</span>
                      </button>

                      <button
                        onClick={() => {
                          const inviteUrl = getBattleInviteLink(activeBattleRoom);
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(inviteUrl);
                            showMessage(`🔗 1-Click Duel Link copied! Send on WhatsApp/Telegram.`);
                          }
                        }}
                        className="px-2.5 sm:px-3 py-1 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-300 text-[10px] sm:text-xs font-black uppercase flex items-center gap-1.5 tap-effect"
                        title="Share 1-Click Invite Link"
                      >
                        <Share2 size={12} /> Share Link
                      </button>

                      <button
                        onClick={handleLeaveOrForfeitBattle}
                        className="px-2 sm:px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[10px] sm:text-xs font-bold uppercase tap-effect"
                        title="Forfeit or leave battle"
                      >
                        🏳️ Surrender
                      </button>
                    </div>
                  </div>

                  {/* Real-Life Stakes Banner */}
                  {activeBattleRoom.stakes && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between text-xs text-amber-200">
                      <span className="font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Flame size={14} className="text-amber-400 animate-pulse" /> Real-Life Stakes / Forfeit:
                      </span>
                      <span className="font-bold underline text-white">"{activeBattleRoom.stakes}"</span>
                    </div>
                  )}

                  {/* DUAL COMBAT CLASH CARDS (Host vs Challenger) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
                    {/* VS BADGE (Center in larger view) */}
                    <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 border-2 border-white/40 text-white font-black text-xs items-center justify-center shadow-2xl z-20 animate-pulse">
                      VS
                    </div>

                    {/* HOST PLAYER CARD (LEFT) */}
                    <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all relative overflow-hidden ${
                      isHost ? "border-amber-400/60 bg-amber-950/10" : "border-slate-700 bg-black/40"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{activeBattleRoom.host.avatar || "⚔️"}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-black text-white truncate max-w-[120px]">
                                {activeBattleRoom.host.name}
                              </h4>
                              {isHost && (
                                <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-black uppercase">
                                  YOU
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] text-amber-300 font-bold uppercase">HOST</span>
                          </div>
                        </div>

                        {/* Shields Orb */}
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[9px] font-black text-sky-300">
                          <Shield size={10} /> {activeBattleRoom.host.shieldsCount ?? 0}/2
                        </div>
                      </div>

                      {/* 1000 HP Combat Bar */}
                      <div className="space-y-1 my-3">
                        <div className="flex justify-between text-[10px] font-black uppercase">
                          <span className="text-red-400 flex items-center gap-1">❤️ HP</span>
                          <span className={hostHpPercent > 25 ? "text-emerald-400" : "text-rose-400 animate-pulse"}>
                            {activeBattleRoom.host.hp} / 1000 ({hostHpPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-black/70 border border-red-500/30 overflow-hidden p-0.5 relative">
                          {/* Trailing Health Bar */}
                          <div
                            className="h-full rounded-full bg-red-600/50 hp-bar-trail absolute top-0.5 left-0.5"
                            style={{ width: `${Math.max(2, hostHpPercent)}%` }}
                          />
                          {/* Instant Health Bar */}
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 hp-bar-instant relative z-10 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                            style={{ width: `${Math.max(2, hostHpPercent)}%` }}
                          />
                        </div>
                      </div>

                      {/* Combat Stats Grid */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10 text-[9px] sm:text-[10px]">
                        <div className="p-1.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                          <span className="text-slate-400">Tasks Struck:</span>
                          <span className="font-black text-white">{activeBattleRoom.host.tasksCompleted || 0}</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                          <span className="text-slate-400">Focus Mins:</span>
                          <span className="font-black text-amber-300">{activeBattleRoom.host.focusMinutes || 0}m</span>
                        </div>
                      </div>

                      {/* Last Action Chip */}
                      {activeBattleRoom.host.lastAction && (
                        <div className="mt-2 text-[8px] sm:text-[9px] text-slate-300 p-1 rounded-lg bg-black/40 border border-white/5 truncate">
                          ⚡ Last: {activeBattleRoom.host.lastAction.text}
                        </div>
                      )}
                    </div>

                    {/* CHALLENGER PLAYER CARD (RIGHT) */}
                    <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all relative overflow-hidden ${
                      !isHost && activeBattleRoom.challenger ? "border-amber-400/60 bg-amber-950/10" : "border-slate-700 bg-black/40"
                    }`}>
                      {activeBattleRoom.challenger ? (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{activeBattleRoom.challenger.avatar || "🛡️"}</span>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="text-xs sm:text-sm font-black text-white truncate max-w-[120px]">
                                    {activeBattleRoom.challenger.name}
                                  </h4>
                                  {!isHost && (
                                    <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-black uppercase">
                                      YOU
                                    </span>
                                  )}
                                </div>
                                <span className="text-[9px] text-sky-300 font-bold uppercase">CHALLENGER</span>
                              </div>
                            </div>

                            {/* Shields Orb */}
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[9px] font-black text-sky-300">
                              <Shield size={10} /> {activeBattleRoom.challenger.shieldsCount ?? 0}/2
                            </div>
                          </div>

                          {/* 1000 HP Combat Bar */}
                          <div className="space-y-1 my-3">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                              <span className="text-red-400 flex items-center gap-1">❤️ HP</span>
                              <span className={challengerHpPercent > 25 ? "text-emerald-400" : "text-rose-400 animate-pulse"}>
                                {activeBattleRoom.challenger.hp} / 1000 ({challengerHpPercent}%)
                              </span>
                            </div>
                            <div className="w-full h-3.5 rounded-full bg-black/70 border border-red-500/30 overflow-hidden p-0.5 relative">
                              {/* Trailing Health Bar */}
                              <div
                                className="h-full rounded-full bg-red-600/50 hp-bar-trail absolute top-0.5 left-0.5"
                                style={{ width: `${Math.max(2, challengerHpPercent)}%` }}
                              />
                              {/* Instant Health Bar */}
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 hp-bar-instant relative z-10 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                                style={{ width: `${Math.max(2, challengerHpPercent)}%` }}
                              />
                            </div>
                          </div>

                          {/* Combat Stats Grid */}
                          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10 text-[9px] sm:text-[10px]">
                            <div className="p-1.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                              <span className="text-slate-400">Tasks Struck:</span>
                              <span className="font-black text-white">{activeBattleRoom.challenger.tasksCompleted || 0}</span>
                            </div>
                            <div className="p-1.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                              <span className="text-slate-400">Focus Mins:</span>
                              <span className="font-black text-amber-300">{activeBattleRoom.challenger.focusMinutes || 0}m</span>
                            </div>
                          </div>

                          {/* Last Action Chip */}
                          {activeBattleRoom.challenger.lastAction && (
                            <div className="mt-2 text-[8px] sm:text-[9px] text-slate-300 p-1 rounded-lg bg-black/40 border border-white/5 truncate">
                              ⚡ Last: {activeBattleRoom.challenger.lastAction.text}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-6 text-center space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-xl animate-spin">
                            ⏳
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-300 uppercase">Waiting for Challenger</h4>
                          <p className="text-[10px] sm:text-xs text-slate-400">
                            Give code <span className="font-mono text-amber-300 font-bold">{activeBattleRoom.roomCode}</span> or send invite link!
                          </p>
                          <button
                            onClick={() => {
                              const inviteUrl = getBattleInviteLink(activeBattleRoom);
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(inviteUrl);
                                showMessage(`🔗 1-Click Duel Link copied! Share on WhatsApp.`);
                              }
                            }}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-300 text-xs font-black uppercase tap-effect"
                          >
                            <Share2 size={12} /> Copy 1-Click Duel Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GAME OVER / VICTORY BANNER */}
                  {isGameOver && (
                    <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-2 border-yellow-400/80 text-center space-y-3 shadow-2xl animate-modal-sleek">
                      <div className="text-4xl sm:text-5xl animate-bounce">🏆</div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-black text-yellow-300 uppercase tracking-tight">
                          {isWinner ? "🎉 YOU ARE THE VICTOR!" : "⚔️ BATTLE CONCLUDED"}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                          {isWinner
                            ? `You crushed your opponent with absolute discipline! (+100 XP & +5 Stars Claimed)`
                            : `Discipline war finished. Honor the forfeit and conquer the next battle!`}
                        </p>
                      </div>

                      {activeBattleRoom.stakes && (
                        <div className="p-3 rounded-2xl bg-black/60 border border-yellow-400/40 inline-block max-w-md mx-auto text-xs">
                          <span className="font-black text-yellow-400 uppercase">Forfeit Due:</span>
                          <p className="font-bold text-white mt-0.5">"{activeBattleRoom.stakes}"</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* QUICK COMBAT TAUNT BAR */}
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                      <MessageSquare size={12} /> Psychological Taunts (Broadcast to Match):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {tauntPresets.map((taunt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendBattleTaunt(taunt)}
                          disabled={activeBattleRoom.status !== "active"}
                          className="p-2 rounded-xl bg-purple-950/30 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 hover:text-white text-[9px] sm:text-[10px] font-bold text-left truncate tap-effect transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                        >
                          {taunt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* REAL-TIME COMBAT LOG */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                    <span className="text-[10px] font-black uppercase text-red-400 tracking-wider flex items-center gap-1.5">
                      <Activity size={12} /> Real-Time Combat Log:
                    </span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {activeBattleRoom.combatLog && activeBattleRoom.combatLog.length > 0 ? (
                        activeBattleRoom.combatLog.slice().reverse().map((log) => (
                          <div
                            key={log.id}
                            className={`p-2 rounded-xl text-[9px] sm:text-[10px] leading-tight flex items-start justify-between gap-2 ${
                              log.type === "crit"
                                ? "bg-amber-500/15 text-amber-200 border border-amber-500/30 font-bold"
                                : log.type === "shield"
                                ? "bg-sky-500/15 text-sky-200 border border-sky-500/30"
                                : log.type === "taunt"
                                ? "bg-purple-500/15 text-purple-200 border border-purple-500/30"
                                : log.type === "ko"
                                ? "bg-red-500/25 text-red-100 border border-red-500/50 font-black"
                                : "bg-white/5 text-slate-300 border border-white/5"
                            }`}
                          >
                            <span className="flex-1">{log.message}</span>
                            <span className="text-[8px] text-slate-500 flex-shrink-0">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3 text-slate-500 text-[10px]">
                          Combat log will stream real-time strikes and taunts.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HOST / CREATE BATTLE ROOM */}
          {battleTab === "create" && (
            <div className="p-4 sm:p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4">
              <div>
                <h4 className="text-sm sm:text-base font-black text-amber-300 uppercase tracking-wider">
                  Host a New 1v1 Battle
                </h4>
                <p className="text-xs text-slate-400">
                  Select a format, set real-life stakes, and invite your friend with the generated room code.
                </p>
              </div>

              {/* Format Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-300 tracking-wider">
                  Battle Format:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBattleFormat("blitz")}
                    className={`p-3 rounded-2xl border text-left tap-effect transition-all ${
                      battleFormat === "blitz"
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50"
                        : "bg-black/30 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-base sm:text-xl mb-1">⚡</div>
                    <h5 className="text-[10px] sm:text-xs font-black uppercase">Daily Blitz</h5>
                    <p className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5">24h 1000 HP combat.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBattleFormat("siege")}
                    className={`p-3 rounded-2xl border text-left tap-effect transition-all ${
                      battleFormat === "siege"
                        ? "bg-red-500/20 border-red-400 text-red-300 shadow-md ring-1 ring-red-400/50"
                        : "bg-black/30 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-base sm:text-xl mb-1">⚔️</div>
                    <h5 className="text-[10px] sm:text-xs font-black uppercase">Habit Siege</h5>
                    <p className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5">7-Day marathon war.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBattleFormat("duel")}
                    className={`p-3 rounded-2xl border text-left tap-effect transition-all ${
                      battleFormat === "duel"
                        ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-md ring-1 ring-sky-400/50"
                        : "bg-black/30 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-base sm:text-xl mb-1">⏱️</div>
                    <h5 className="text-[10px] sm:text-xs font-black uppercase">Focus Duel</h5>
                    <p className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5">Live timer standoff.</p>
                  </button>
                </div>
              </div>

              {/* Custom Stakes / Forfeit Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-300 tracking-wider">
                  Real-Life Stakes / Forfeit:
                </label>
                <input
                  type="text"
                  value={battleStakesInput}
                  onChange={(e) => setBattleStakesInput(e.target.value)}
                  placeholder="e.g. 50 Pushups, Buy Coffee, Write Apology Essay..."
                  className={`w-full py-2.5 px-3.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none`}
                />
                <div className="flex gap-1.5 flex-wrap pt-1">
                  {["50 Pushups", "Treat to Coffee ☕", "₹500 Forfeit Bet", "1-Hour Study Penalty", "Post on Instagram Story"].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setBattleStakesInput(preset)}
                      className="text-[8px] sm:text-[9px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Duel Duration (if Duel format) */}
              {battleFormat === "duel" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-300 tracking-wider">
                    Focus Duel Duration:
                  </label>
                  <div className="flex gap-2">
                    {[15, 25, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setBattleDurationMinutes(mins)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black uppercase border tap-effect ${
                          battleDurationMinutes === mins
                            ? "bg-sky-500 text-white border-sky-400"
                            : "bg-black/40 border-white/10 text-slate-400"
                        }`}
                      >
                        {mins} Mins
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Host Submit Button */}
              <button
                type="button"
                onClick={handleCreateBattleRoom}
                disabled={isCreatingBattle}
                className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] tap-effect hover:brightness-110 active:scale-95 disabled:opacity-50`}
              >
                {isCreatingBattle ? "CREATING ROOM..." : "⚔️ GENERATE BATTLE ROOM CODE"}
              </button>
            </div>
          )}

          {/* TAB 3: JOIN BATTLE ROOM */}
          {battleTab === "join" && (
            <div className="p-4 sm:p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-3xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-3xl">
                🔗
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Join Battle Arena
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Enter the 6-character room code (e.g. <span className="font-mono text-amber-300 font-bold">WAR789</span>) or paste a 1-Click Duel Link.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  value={battleRoomCodeInput}
                  onChange={(e) => setBattleRoomCodeInput(e.target.value)}
                  placeholder="WAR789 or paste link..."
                  className="w-full py-3 px-4 rounded-2xl bg-black/80 border-2 border-sky-400/60 text-center font-mono text-sm sm:text-base font-black text-white tracking-wider uppercase focus:border-sky-400 focus:outline-none shadow-lg"
                />

                <button
                  type="button"
                  onClick={() => handleJoinBattleRoom()}
                  disabled={isJoiningBattle || !battleRoomCodeInput.trim()}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.5)] tap-effect hover:brightness-110 active:scale-95 disabled:opacity-40"
                >
                  {isJoiningBattle ? "CONNECTING..." : "⚔️ ENTER THE BATTLE ARENA"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PVP STATS & TUTORIAL */}
          {battleTab === "history" && (
            <div className="space-y-4">
              {/* Head-to-Head Profile Record */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/40 space-y-3">
                <h4 className="text-xs sm:text-sm font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Crown size={14} /> Head-to-Head PvP Combat Record
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                    <span className="text-xs sm:text-sm text-slate-400 block uppercase font-bold">Battles Won</span>
                    <span className="text-lg sm:text-2xl font-black text-emerald-400">{profile?.battlesWon || 0} 👑</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                    <span className="text-xs sm:text-sm text-slate-400 block uppercase font-bold">Battles Lost</span>
                    <span className="text-lg sm:text-2xl font-black text-rose-400">{profile?.battlesLost || 0} 💀</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                    <span className="text-xs sm:text-sm text-slate-400 block uppercase font-bold">Win Rate</span>
                    <span className="text-lg sm:text-2xl font-black text-amber-300">
                      {((profile?.battlesWon || 0) + (profile?.battlesLost || 0)) > 0
                        ? `${Math.round(((profile?.battlesWon || 0) / ((profile?.battlesWon || 0) + (profile?.battlesLost || 0))) * 100)}%`
                        : "0%"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Battle Mode Step-by-Step Tutorial */}
              <div className="p-4 sm:p-5 rounded-3xl bg-black/40 border border-white/10 space-y-3 text-xs leading-relaxed text-slate-300">
                <h4 className="font-black text-white uppercase text-xs sm:text-sm flex items-center gap-1.5">
                  <BookOpen size={14} className="text-amber-400" /> How to Setup & Play Battle Arena:
                </h4>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex gap-2">
                    <span className="font-black text-amber-400">1.</span>
                    <div>
                      <strong className="text-white">Host a Room:</strong> Click "Host", choose a format (Daily Blitz, Weekly Siege, or Focus Duel), set your custom forfeit (e.g. 50 pushups), and click "Generate Room Code".
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex gap-2">
                    <span className="font-black text-amber-400">2.</span>
                    <div>
                      <strong className="text-white">Share 6-Digit Code:</strong> Send the 6-character code (e.g. <code className="text-amber-300 font-mono">WAR789</code>) to your opponent so they can join from their phone or PC.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex gap-2">
                    <span className="font-black text-amber-400">3.</span>
                    <div>
                      <strong className="text-white">Combat Strikes:</strong> Every habit you check deals <span className="text-rose-400 font-bold">-100 HP</span> damage to your opponent. A 25m+ Focus Chamber session deals a <span className="text-amber-300 font-bold">250 CRIT Strike</span>. The 9-10 PM Two-Box Cleanup executes a <span className="text-yellow-400 font-bold">300 Finisher</span>!
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex gap-2">
                    <span className="font-black text-amber-400">4.</span>
                    <div>
                      <strong className="text-white">Streak Shields Absorb DMG:</strong> If your opponent holds Streak Freeze Shields, your strike is absorbed (0 DMG) and consumes 1 of their shields!
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex gap-2">
                    <span className="font-black text-amber-400">5.</span>
                    <div>
                      <strong className="text-white">Victory & Forfeits:</strong> Reduce your opponent's HP to 0 or survive with higher HP at midnight to claim victory, +100 XP, +5 Stars, and enforce the real-life forfeit!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // 📅 SCHEDULED EVENTS, CLASSES & MEETING DISPATCHER MODAL
  // ==========================================
  const renderScheduleModal = () => {
    const rawEvents: ScheduledEvent[] = brain.scheduledEvents || [];
    const sortedEvents = [...rawEvents].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.date.localeCompare(b.date);
    });

    const todayEvents = sortedEvents.filter((e) => e.date === todayStr && !e.completed);
    const upcomingEvents = sortedEvents.filter((e) => e.date > todayStr && !e.completed);
    const completedEvents = sortedEvents.filter((e) => e.completed);

    const filteredEvents = sortedEvents.filter((ev) => {
      if (scheduleFilter === "today") return ev.date === todayStr && !ev.completed;
      if (scheduleFilter === "upcoming") return ev.date > todayStr && !ev.completed;
      if (scheduleFilter === "completed") return ev.completed;
      if (scheduleFilter !== "all") return ev.category === scheduleFilter;
      return true;
    });

    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
        <div className={`w-full max-w-2xl rounded-3xl p-5 sm:p-7 shadow-2xl border-2 ${t.card} ${t.borderAccent} relative max-h-[92vh] overflow-y-auto space-y-5 text-white`}>

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 shadow-sm text-2xl">
                📅
              </div>
              <div>
                <h3 className={`font-black text-base sm:text-xl uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>
                  Class & Meeting Dispatcher
                </h3>
                <p className={`text-xs font-medium ${t.textMuted}`}>
                  Auto-injects on target date • Web Push Notifications
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notification Status & Permission Trigger */}
              {notificationStatus === "granted" ? (
                <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm">
                  <BellRing size={13} className="animate-pulse" />
                  <span className="hidden sm:inline">Alerts</span> Active
                </div>
              ) : (
                <button
                  onClick={requestNotificationPermission}
                  className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-[10px] font-black uppercase flex items-center gap-1.5 tap-effect transition-all"
                  title="Click to enable browser notifications for your scheduled classes"
                >
                  <Bell size={13} />
                  <span>Enable Alerts</span>
                </button>
              )}

              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all tap-effect"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* EVENT CREATION FORM */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${t.cardInner} ${t.borderAccent} space-y-3.5 shadow-lg`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${t.textAccent} ${t.fontHeading}`}>
                <Plus size={14} /> Schedule New Class, Meeting or Exam
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase font-mono">
                Auto-injects to Today's Tasks
              </span>
            </div>

            {/* Title */}
            <div>
              <input
                type="text"
                value={scheduleEventTitle}
                onChange={(e) => setScheduleEventTitle(e.target.value)}
                placeholder="Event Title (e.g. Economics Class, Math Exam, Client Sync)"
                className={`w-full p-3 text-xs sm:text-sm rounded-xl outline-none transition-colors ${t.input} ${t.fontHeading}`}
              />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                  Target Date:
                </label>
                <input
                  type="date"
                  value={scheduleEventDate}
                  onChange={(e) => setScheduleEventDate(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded-xl outline-none transition-colors font-mono ${t.input}`}
                />
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                  Time / Slot (Optional):
                </label>
                <input
                  type="text"
                  value={scheduleEventTime}
                  onChange={(e) => setScheduleEventTime(e.target.value)}
                  placeholder="e.g. 10:00 AM, 04:30 PM"
                  className={`w-full p-2.5 text-xs rounded-xl outline-none transition-colors ${t.input}`}
                />
              </div>
            </div>

            {/* Category Chips */}
            <div>
              <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">
                Category:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {EVENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setScheduleEventCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all tap-effect border ${
                      scheduleEventCategory === cat.id
                        ? `${cat.badgeBg} ring-2 ring-current shadow-md scale-105`
                        : `bg-white/5 border-white/10 text-slate-400 hover:text-slate-200`
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Meeting Links */}
            <div>
              <textarea
                value={scheduleEventNotes}
                onChange={(e) => setScheduleEventNotes(e.target.value)}
                placeholder="Notes, Zoom Link, Room number, or preparation points..."
                rows={2}
                className={`w-full p-2.5 text-xs rounded-xl outline-none transition-colors ${t.input}`}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() =>
                addScheduledEvent(
                  scheduleEventTitle,
                  scheduleEventDate,
                  scheduleEventTime,
                  scheduleEventCategory,
                  scheduleEventNotes
                )
              }
              className={`w-full py-3 rounded-2xl tap-effect flex items-center justify-center gap-2 ${t.btnPrimary} ${t.fontHeading} text-xs sm:text-sm shadow-xl`}
            >
              <CalendarDays size={16} />
              <span>Save & Arm Alert Notification</span>
            </button>
          </div>

          {/* FILTER TABS & COUNT */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className={`text-[11px] font-black uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>
                Your Schedule ({rawEvents.length})
              </span>
              <div className="flex items-center gap-1">
                {todayEvents.length > 0 && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 animate-pulse">
                    🚨 {todayEvents.length} TODAY
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1 text-[10px] font-black uppercase">
              <button
                onClick={() => setScheduleFilter("all")}
                className={`px-3 py-1.5 rounded-xl border tap-effect transition-all flex-shrink-0 ${
                  scheduleFilter === "all"
                    ? `${t.btnPrimary}`
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                All ({rawEvents.length})
              </button>
              <button
                onClick={() => setScheduleFilter("today")}
                className={`px-3 py-1.5 rounded-xl border tap-effect transition-all flex-shrink-0 ${
                  scheduleFilter === "today"
                    ? "bg-amber-400 text-black border-amber-400 font-black"
                    : "bg-amber-500/10 border-amber-400/30 text-amber-300 hover:bg-amber-500/20"
                }`}
              >
                🚨 Today ({todayEvents.length})
              </button>
              <button
                onClick={() => setScheduleFilter("upcoming")}
                className={`px-3 py-1.5 rounded-xl border tap-effect transition-all flex-shrink-0 ${
                  scheduleFilter === "upcoming"
                    ? `${t.btnPrimary}`
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                ⏳ Upcoming ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setScheduleFilter("completed")}
                className={`px-3 py-1.5 rounded-xl border tap-effect transition-all flex-shrink-0 ${
                  scheduleFilter === "completed"
                    ? "bg-emerald-500 text-black border-emerald-400 font-black"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                ✅ Done ({completedEvents.length})
              </button>
            </div>

            {/* EVENT CARDS LIST */}
            {filteredEvents.length === 0 ? (
              <div className={`text-center py-10 rounded-2xl border border-dashed border-white/10 ${t.cardInner} space-y-2`}>
                <span className="text-3xl block">📅</span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {scheduleFilter === "all"
                    ? "No classes or meetings scheduled yet."
                    : `No events in "${scheduleFilter}" category.`}
                </p>
                <p className="text-[10px] text-slate-500">
                  Use the form above to add future events like "Economics Class on Feb 12, 2027".
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[40vh] overflow-y-auto pr-1">
                {filteredEvents.map((ev) => {
                  const catMeta = EVENT_CATEGORIES.find((c) => c.id === ev.category) || EVENT_CATEGORIES[0];
                  const isToday = ev.date === todayStr;
                  const isTomorrow = ev.date === addDays(todayStr, 1);
                  const isPast = ev.date < todayStr && !ev.completed;

                  return (
                    <div
                      key={ev.id}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                        ev.completed
                          ? "bg-white/5 border-white/10 opacity-60"
                          : isToday
                          ? "bg-amber-500/15 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)] ring-1 ring-amber-400/40"
                          : isTomorrow
                          ? "bg-sky-500/10 border-sky-400/50 shadow-md"
                          : isPast
                          ? "bg-rose-500/10 border-rose-500/40"
                          : `${t.cardInner} ${t.borderAccent}`
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Complete Checkbox Toggle */}
                          <button
                            onClick={() => toggleCompleteScheduledEvent(ev.id)}
                            className={`mt-0.5 p-1 rounded-xl transition-all tap-effect flex-shrink-0 ${
                              ev.completed
                                ? "text-emerald-400 bg-emerald-500/20"
                                : "text-slate-400 hover:text-emerald-400 bg-white/5 border border-white/10"
                            }`}
                            title={ev.completed ? "Mark Uncompleted" : "Mark Attended / Done (+2 Stars)"}
                          >
                            <CheckCircle2 size={20} className={ev.completed ? "stroke-[2.5]" : "stroke-2"} />
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {/* Category Badge */}
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${catMeta.badgeBg}`}>
                                {catMeta.icon} {catMeta.label}
                              </span>

                              {/* Relative Date Badge */}
                              <span
                                className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg font-mono ${
                                  isToday
                                    ? "bg-amber-400 text-black font-black animate-pulse shadow-sm"
                                    : isTomorrow
                                    ? "bg-sky-400/20 text-sky-300 border border-sky-400/40"
                                    : isPast
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                    : "bg-white/10 text-slate-300 border border-white/10"
                                }`}
                              >
                                {formatEventDateLabel(ev.date, todayStr)}
                              </span>

                              {ev.time && (
                                <span className="text-[9px] font-bold text-slate-300 bg-black/40 px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                                  <Clock size={10} /> {ev.time}
                                </span>
                              )}
                            </div>

                            <h4
                              className={`text-xs sm:text-sm font-black tracking-wide ${
                                ev.completed ? "line-through text-slate-400" : t.textMain
                              } ${t.fontHeading}`}
                            >
                              {ev.title}
                            </h4>

                            {ev.notes && (
                              <p className="text-[10px] sm:text-xs text-slate-300 mt-1 leading-relaxed whitespace-pre-wrap bg-black/30 p-2 rounded-xl border border-white/5 font-sans">
                                {ev.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions: Focus in Chamber & Delete */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {!ev.completed && (
                            <button
                              onClick={() => {
                                setIsScheduleModalOpen(false);
                                startFocusSession(ev.title, ev.id);
                              }}
                              className={`px-2.5 py-1.5 rounded-xl tap-effect text-[9px] sm:text-[10px] font-black uppercase flex items-center gap-1 shadow-sm ${t.btnWarning}`}
                              title="Start Focus Session for this class/meeting"
                            >
                              <Zap size={12} /> <span className="hidden sm:inline">Focus</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteScheduledEvent(ev.id)}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 text-slate-400 transition-all tap-effect"
                            title="Delete event"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with Preset Suggestions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
            <span>💡 Automatically alerts you when the scheduled day arrives.</span>
            <button
              onClick={() => {
                setScheduleEventTitle("Economics Class");
                setScheduleEventDate("2027-02-12");
                setScheduleEventTime("10:00 AM");
                setScheduleEventCategory("class");
                setScheduleEventNotes("Room 304 / Macroeconomics Class & Notes Review");
                showMessage("✨ Preset loaded: Economics Class on Feb 12, 2027");
              }}
              className="text-amber-300 hover:text-amber-200 uppercase font-black tap-effect underline"
            >
              + Preset: Economics 2027
            </button>
          </div>
        </div>

        {/* Click backdrop to close */}
        <div className="flex-1" onClick={() => setIsScheduleModalOpen(false)}></div>
      </div>
    );
  };

  // ==========================================
  // 🏆 TIERED RPG RANK CELEBRATION & DEMOTION VFX MODAL
  // ==========================================
  const renderRankTransitionModal = () => {
    if (!rankTransitionModal || !rankTransitionModal.isOpen) return null;
    const isUp = rankTransitionModal.type === "up";
    const { oldTier, newTier, oldRank, newRank } = rankTransitionModal;
    const tier = newRank.tier;

    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-hidden select-none">
        {/* ========================================== */}
        {/* TIERED VFX CELEBRATION PARTICLES & BACKDROPS */}
        {/* ========================================== */}
        {isUp && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* TIER 13-15: GOD TIER (Brahman, Maharathi, Apex Eternal) */}
            {tier >= 13 && (
              <>
                {/* Hyper Flash Opening */}
                <div className="absolute inset-0 bg-white/40 pointer-events-none animate-hyper-flash z-30" />
                {/* Sacred Rotating Mandala Lotus Bloom */}
                <div className="absolute w-[460px] h-[460px] sm:w-[580px] sm:h-[580px] rounded-full border-2 border-dashed border-amber-300/40 animate-mandala-bloom pointer-events-none flex items-center justify-center">
                  <div className="w-[390px] h-[390px] sm:w-[480px] sm:h-[480px] rounded-full border border-purple-400/30 rotate-45" />
                  <div className="w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] rounded-full border border-sky-400/30 -rotate-45" />
                  <div className="w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] rounded-full border-2 border-amber-400/50 rotate-12" />
                </div>
                {/* Pulsating Celestial God-Rays */}
                <div className="absolute w-[520px] h-[520px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-amber-400/25 via-purple-600/30 to-sky-400/25 blur-3xl animate-celestial-rays" />
                {/* Triple Expanding Golden Shockwaves */}
                <div className="absolute w-36 h-36 rounded-full border-2 border-amber-300/80 animate-shockwave-1" />
                <div className="absolute w-36 h-36 rounded-full border-2 border-purple-400/80 animate-shockwave-2" />
                <div className="absolute w-36 h-36 rounded-full border-2 border-sky-300/80 animate-shockwave-3" />
                {/* Floating Sacred Mystical Glyphs */}
                <div className="absolute top-12 left-10 text-3xl animate-float-glyph-1">🕉️</div>
                <div className="absolute top-16 right-12 text-3xl animate-float-glyph-2">🪶</div>
                <div className="absolute bottom-16 left-12 text-3xl animate-float-glyph-3">⚡</div>
                <div className="absolute bottom-12 right-10 text-3xl animate-float-glyph-1">👑</div>
                <div className="absolute top-1/2 right-6 text-3xl animate-float-glyph-2">🌌</div>
                <div className="absolute top-1/2 left-6 text-3xl animate-float-glyph-3">✨</div>
              </>
            )}

            {/* TIER 10-12: SOLAR / COSMIC OVERLORD */}
            {tier >= 10 && tier < 13 && (
              <>
                {/* Spinning Solar Rays */}
                <div className="absolute w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full border-4 border-dashed border-amber-400/50 animate-solar-rays pointer-events-none" />
                {/* Cosmic Nebula Gradient Glow */}
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-amber-500/30 via-rose-500/25 to-indigo-600/30 rounded-full blur-3xl animate-pulse" />
                {/* Double Expanding Shockwaves */}
                <div className="absolute w-36 h-36 rounded-full border-2 border-amber-400/90 animate-shockwave-1" />
                <div className="absolute w-36 h-36 rounded-full border-2 border-cyan-400/90 animate-shockwave-2" />
              </>
            )}

            {/* TIER 7-9: WARLORD / DRAGONSLAYER */}
            {tier >= 7 && tier < 10 && (
              <>
                {/* Blazing Crimson Flame Columns */}
                <div className="absolute inset-0 flex justify-center items-center gap-12 pointer-events-none">
                  <div className="text-4xl sm:text-5xl animate-flame-1">🔥</div>
                  <div className="text-5xl sm:text-6xl animate-flame-2">⚡</div>
                  <div className="text-4xl sm:text-5xl animate-flame-3">🔥</div>
                </div>
                {/* Crimson Ambient Glow */}
                <div className="absolute w-[480px] h-[480px] bg-rose-600/25 rounded-full blur-3xl animate-pulse" />
              </>
            )}

            {/* TIER 4-6: STRIKER / CENTURION */}
            {tier >= 4 && tier < 7 && (
              <>
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-cyan-400/50 animate-spin-slow pointer-events-none" />
                <div className="absolute w-[440px] h-[440px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
              </>
            )}

            {/* TIER 1-3: INITIATE / NOVICE / VANGUARD */}
            {tier < 4 && (
              <div className="absolute w-[420px] h-[420px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            )}

            {/* Universal Dynamic Confetti Particles */}
            {[...Array(28)].map((_, i) => {
              const leftPos = (i * 3.6 + (i % 3) * 2.5) % 100;
              const delay = (i * 0.12) % 2.5;
              const size = (i % 3 === 0) ? "text-xl" : (i % 2 === 0 ? "text-base" : "text-2xl");
              const symbols = tier >= 13
                ? ["⭐", "✨", "🕉️", "🪶", "👑", "⚡", "🌟", "🌌"]
                : tier >= 10
                ? ["⭐", "✨", "☀️", "👑", "⚡", "🌟", "💎", "🔥"]
                : tier >= 7
                ? ["🔥", "⚔️", "💎", "⭐", "🎉", "⚡", "🌟", "✨"]
                : ["⭐", "✨", "🎉", "🔥", "💎", "⚡", "🌟", "👑"];
              const sym = symbols[i % symbols.length];
              return (
                <div
                  key={i}
                  className={`absolute animate-confetti ${size}`}
                  style={{
                    left: `${leftPos}%`,
                    top: `${-5 - (i % 5) * 6}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${2.6 + (i % 4) * 0.4}s`
                  }}
                >
                  {sym}
                </div>
              );
            })}
          </div>
        )}

        {/* Backdrop Glow for Rank Down */}
        {!isUp && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-600/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        )}

        {/* Modal Dialog Card */}
        <div
          className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 overflow-hidden text-center border-2 ${
            isUp
              ? tier >= 13
                ? "border-amber-300 bg-gradient-to-b from-[#1a1506] via-[#100c1e] to-[#04060f] shadow-[0_0_80px_rgba(251,191,36,0.5)]"
                : tier >= 10
                ? "border-amber-400 bg-gradient-to-b from-[#181105] via-[#120b18] to-[#050711] shadow-[0_0_65px_rgba(245,158,11,0.4)]"
                : tier >= 7
                ? "border-rose-400/90 bg-gradient-to-b from-[#1c080e] via-[#13070f] to-[#060408] shadow-[0_0_60px_rgba(244,63,94,0.35)]"
                : "border-amber-400/80 bg-gradient-to-b from-[#141208] via-[#0d0f1a] to-[#050711] shadow-[0_0_60px_rgba(245,158,11,0.35)]"
              : "border-rose-500/80 bg-gradient-to-b from-[#1a080c] via-[#10070a] to-[#080304] shadow-[0_0_50px_rgba(244,63,94,0.3)] animate-warning-shake"
          }`}
        >
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-widest mb-4 shadow-lg">
            {isUp ? (
              <span className={`px-4 py-1.5 rounded-full font-black flex items-center gap-1.5 shadow-md ${
                tier >= 13
                  ? "bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-black animate-bounce ring-2 ring-amber-300/80"
                  : tier >= 10
                  ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-black animate-bounce"
                  : "bg-gradient-to-r from-amber-400 to-yellow-300 text-black animate-bounce"
              }`}>
                <Sparkles size={14} className="stroke-[3]" /> {tier >= 13 ? "👑 GOD TIER APEX UNLOCKED!" : "NEW RANK PROMOTION!"}
              </span>
            ) : (
              <span className="bg-rose-500/30 text-rose-300 border border-rose-500/60 px-3.5 py-1 rounded-full font-black flex items-center gap-1.5 shadow-md">
                <TrendingDown size={14} className="stroke-[3]" /> RANK DEMOTION WARNING
              </span>
            )}
          </div>

          {/* Central Animated Badge Reveal */}
          <div className="relative my-5 flex items-center justify-center">
            {/* Spinning decorative halo rings */}
            <div
              className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-dashed absolute flex items-center justify-center ${
                isUp
                  ? tier >= 13
                    ? "border-amber-300/80 animate-spin-slow"
                    : "border-amber-400/60 animate-spin-slow"
                  : "border-rose-500/60 animate-spin-reverse-slow"
              }`}
            ></div>

            {/* Hero Badge */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black/85 border-2 flex items-center justify-center text-6xl sm:text-7xl shadow-2xl relative z-10 animate-scale-pop ${
                isUp
                  ? tier >= 13
                    ? "border-amber-300 animate-divine-aura shadow-[0_0_50px_rgba(251,191,36,0.7)]"
                    : tier >= 10
                    ? "border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.6)]"
                    : tier >= 7
                    ? "border-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.5)]"
                    : "border-amber-400/90 shadow-[0_0_35px_rgba(245,158,11,0.5)]"
                  : "border-rose-500/90 shadow-[0_0_30px_rgba(244,63,94,0.4)]"
              }`}
            >
              {newRank.badge}
            </div>
          </div>

          {/* Title and Tier Transition */}
          <div className="space-y-2 mb-5">
            <h2
              className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
                isUp ? newRank.color || "text-amber-300" : "text-rose-400"
              }`}
            >
              {isUp ? `PROMOTED TO TIER ${newTier}!` : `DEMOTED TO TIER ${newTier}`}
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              {newRank.name}
            </h3>

            {/* Old Rank ➔ New Rank Transition Strip */}
            <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-2xl bg-black/50 border border-white/10 text-xs sm:text-sm font-black uppercase mt-2">
              <span className="text-slate-400 flex items-center gap-1">
                <span>{oldRank.badge}</span> Tier {oldTier}: {oldRank.name}
              </span>
              <ArrowRight size={16} className={isUp ? "text-amber-400" : "text-rose-400"} />
              <span className={isUp ? "text-amber-300 font-black flex items-center gap-1" : "text-rose-300 font-black flex items-center gap-1"}>
                <span>{newRank.badge}</span> Tier {newTier}: {newRank.name}
              </span>
            </div>
          </div>

          {/* Lore / Motivation Message */}
          <div className={`p-4 rounded-2xl border mb-5 text-left text-xs sm:text-sm leading-relaxed ${
            isUp ? "bg-amber-400/5 border-amber-400/30 text-amber-100" : "bg-rose-500/10 border-rose-500/30 text-rose-100"
          }`}>
            {isUp ? (
              <>
                <p className="italic font-medium text-slate-200 mb-2">"{newRank.lore}"</p>
                <div className="pt-2 border-t border-amber-400/20 flex items-center gap-2 text-amber-300 font-bold">
                  <Zap size={15} className="flex-shrink-0" />
                  <span>UNLOCKED PERK: {newRank.perk}</span>
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold text-rose-200 mb-1">
                  ⚠️ <strong>Discipline Warning:</strong> Your rank decreased from Tier {oldTier} to Tier {newTier} due to uncompleted habits or missed days.
                </p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Real progress is forged in consistency. Complete today's missions and streak habits to reclaim your glory!
                </p>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            {isUp ? (
              <button
                onClick={() => setRankTransitionModal(null)}
                className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.5)] tap-effect flex items-center justify-center gap-2"
              >
                <span>CLAIM RANK & CONTINUE 🚀</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setRankTransitionModal(null);
                  setAppMode("habit");
                  setHabitRoute("hub");
                }}
                className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(244,63,94,0.4)] tap-effect flex items-center justify-center gap-2"
              >
                <Flame size={16} />
                <span>RECLAIM MY RANK & GRIND 🔥</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TOP BAR & APP WRAPPER (MOBILE-FIRST ARCHITECTURE)
  // ==========================================
  return (
    <div className={`min-h-screen ${t.appBg} ${t.fontHeading} transition-colors duration-500 relative overflow-x-hidden`}>
      {/* FLOATING TOP MODE CAPSULE (MOBILE ERGONOMIC) */}
      <div className="fixed top-0 left-0 w-full z-40 px-2.5 sm:px-4 pt-[max(env(safe-area-inset-top,0px),0.5rem)] pb-2 bg-black/60 backdrop-blur-2xl border-b border-white/10 flex justify-center items-center">
        <div className={`flex w-full max-w-md sm:max-w-lg rounded-2xl sm:rounded-3xl p-1 border shadow-2xl shadow-black/40 ${t.cardInner} ${t.borderAccent}`}>
          <button
            onClick={() => setAppMode("habit")}
            className={`flex-1 py-1.5 sm:py-2 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-xl sm:rounded-2xl transition-all duration-300 tap-effect ${
              appMode === 'habit' ? `${t.btnPrimary} shadow-md` : `${t.textMuted} hover:${t.textMain}`
            }`}
          >
            HABIT OS
          </button>
          <button
            onClick={() => setAppMode("brain")}
            className={`flex-1 py-1.5 sm:py-2 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-xl sm:rounded-2xl transition-all duration-300 tap-effect ${
              appMode === 'brain' ? `${t.btnPrimary} shadow-md` : `${t.textMuted} hover:${t.textMain}`
            }`}
          >
            SECOND BRAIN
          </button>
          <button
            onClick={() => setAppMode("krishna")}
            className={`flex-1 py-1.5 sm:py-2 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-xl sm:rounded-2xl transition-all duration-300 tap-effect ${
              appMode === 'krishna'
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-black shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-amber-300'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            MY KRISHNA 🪶
          </button>
        </div>
      </div>

      {/* 📱 REAL MOBILE HEADS-UP NOTIFICATION BANNER (iOS & Android Style) */}
      {toast && (() => {
        const parsed = parseToastDetails(toast);
        return (
          <div
            onClick={() => setToast(null)}
            className="fixed top-[calc(env(safe-area-inset-top,0px)+0.65rem)] sm:top-4 left-1/2 -translate-x-1/2 z-[300] w-[calc(100%-1.25rem)] max-w-sm sm:max-w-md cursor-pointer select-none animate-mobile-notification pointer-events-auto"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 bg-[#0e1628]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.18)] text-white relative overflow-hidden tap-effect active:scale-[0.98]">
              {/* Top Notch / Pull Pill */}
              <div className="w-9 h-1 rounded-full bg-white/25 mx-auto -mt-0.5 mb-2"></div>

              {/* Header: App Name & Meta */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <AppLogo className="w-4 h-4" glow={false} />
                  <span className="text-[10px] font-black tracking-wider uppercase text-slate-200">
                    {appMode === "habit" ? "HABIT OS" : appMode === "krishna" ? "MY KRISHNA" : "SECOND BRAIN"}
                  </span>
                  <span className="text-slate-600 text-[9px]">•</span>
                  <span className="text-[9px] font-black text-amber-400 uppercase tracking-tight truncate max-w-[120px]">
                    {parsed.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-[9px] font-bold">now</span>
                  <span className="text-slate-600 text-[9px]">•</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setToast(null);
                    }}
                    className="p-0.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Content Body: Avatar & Notification Text */}
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-inner border ${
                    parsed.type === "xp"
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-amber-500/20"
                      : parsed.type === "shield"
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-cyan-500/20"
                      : parsed.type === "warning"
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-rose-500/20"
                      : parsed.type === "schedule"
                      ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-indigo-500/20"
                      : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-emerald-500/20"
                  }`}
                >
                  <span>{parsed.icon}</span>
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-xs font-black tracking-wide text-white leading-tight mb-0.5">
                    {parsed.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-200 font-medium leading-snug break-words">
                    {parsed.body}
                  </p>
                </div>
              </div>

              {/* Subtle Bottom Auto-Dismiss Progress Line */}
              <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden mt-2.5">
                <div className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-toast-progress"></div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MAIN VIEWPORT CONTAINER WITH RESPONSIVE SAFE-AREA PADDING */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-5 pt-20 sm:pt-24 pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] relative">
        {errorMsg && (
          <div className={`w-full p-3 sm:p-4 mb-4 rounded-2xl flex items-start gap-2.5 shadow-2xl text-[10px] sm:text-xs uppercase tracking-widest bg-red-900/90 backdrop-blur-xl text-white ${t.fontHeading} border border-red-500/40`}>
            <AlertTriangle size={16} className="sm:size-5 mt-0.5 flex-shrink-0 text-red-300" />
            <span className="flex-1 leading-relaxed">{errorMsg}</span>
            <button onClick={() => setErrorMsg("")} className="hover:opacity-70 active:scale-90 p-1"><X size={14} className="sm:size-4" /></button>
          </div>
        )}

        <div className="w-full">
          {appMode === 'habit' && (
            <>
              {habitRoute === "hub" && renderHabitHub()}
              {habitRoute === "arena" && renderHabitArena()}
              {habitRoute === "tracker" && renderHabitTracker()}
              {habitRoute === "shop" && renderShop()}
              {habitRoute === "settings" && renderHabitSettings()}
              {habitRoute === "analysis" && renderAnalysis()}
              {habitRoute === "plan" && renderOngoingPlan()}
              {habitRoute === "vault" && renderVault()}
              {habitRoute === "coach" && renderCoach()}

              {/* HABIT OS MOBILE BOTTOM NAVIGATION BAR */}
              <div className={`fixed bottom-0 left-0 w-full border-t z-40 overflow-hidden backdrop-blur-2xl ${t.card} border-white/10`}>
                <div className="max-w-md sm:max-w-lg mx-auto grid grid-cols-5 px-1 py-1 sm:py-1.5 pb-[calc(env(safe-area-inset-bottom,0px)+6px)]">
                  {[
                    { id: 'hub', icon: Trophy, label: 'HUB' },
                    { id: 'arena', icon: Swords, label: 'ARENA' },
                    {
                      id: 'tracker',
                      icon: CheckSquare,
                      label: 'TRACKER',
                      onClick: () => {
                        setSelectedDate(todayStr);
                        setUnlockedBlankDate(null);
                        setHabitRoute('tracker');
                      }
                    },
                    { id: 'shop', icon: ShoppingCart, label: 'SHOP' },
                    { id: 'analysis', icon: BarChart2, label: 'STATS' },
                  ].map((tab: any) => {
                    const isActive = habitRoute === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => tab.onClick ? tab.onClick() : setHabitRoute(tab.id)}
                        className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all duration-200 tap-effect ${
                          isActive
                            ? `${t.textAccent} font-black scale-105`
                            : `${t.textMuted} hover:${t.textMain} font-bold opacity-70`
                        }`}
                      >
                        <tab.icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {appMode === 'brain' && (
            <>
              {brainTab === 'dashboard' && renderBrainDashboard()}
              {brainTab === 'study' && renderBrainStudy()}
              {brainTab === 'history' && renderBrainHistory()}
              {brainTab === 'wisdom' && renderBrainWisdom()}
              {brainTab === 'vault' && renderBrainVault()}
              {brainTab === 'urge' && renderBrainUrge()}

              {/* Night Shift Widget */}
              {isNightTime && (
                <div className="fixed bottom-24 sm:bottom-28 right-3.5 sm:right-5 z-40 flex flex-col items-end">
                  {!isNightShiftOpen ? (
                    <button
                      onClick={() => setIsNightShiftOpen(true)}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest rounded-2xl tap-effect hover-lift transition-all shadow-2xl ${t.btnWarning} ${t.fontHeading}`}
                    >
                      <Moon size={16} className="sm:size-5 stroke-[2.5]" />
                      <span>PLAN TOMORROW</span>
                    </button>
                  ) : (
                    <div className={`p-4 sm:p-6 w-[calc(100vw-28px)] max-w-[320px] shadow-2xl shadow-black/60 rounded-3xl border backdrop-blur-2xl ${t.card} ${t.borderAccent}`}>
                       <div className={`flex justify-between items-center mb-4 border-b pb-2.5 ${t.borderAccent} opacity-80`}>
                         <h3 className={`font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 ${t.textAccent}`}>
                           <Moon size={14} className="sm:size-4 stroke-[3]"/> NIGHT SHIFT INBOX
                         </h3>
                         <button onClick={() => setIsNightShiftOpen(false)} className={`transition-colors ${t.textMuted} hover:text-red-500 tap-effect p-1`}>
                           <X size={15} className="stroke-[3]"/>
                         </button>
                       </div>
                       <p className={`text-[9px] sm:text-[10px] font-bold mb-3 uppercase tracking-wider ${t.textMuted}`}>Add tasks for tomorrow, or pin a queue target.</p>
                       <div className="flex gap-2 mb-4">
                         <input
                           type="text"
                           value={newCustomMission}
                           onChange={(e) => setNewCustomMission(e.target.value)}
                           onKeyPress={(e) => {
                              if(e.key === 'Enter' && newCustomMission.trim()) {
                                 updateBrainFirebase({ customMissions: [...brain.customMissions, { id: Date.now().toString(), text: newCustomMission.trim(), targetDate: addDays(todayStr, 1), completed: false }] });
                                 setNewCustomMission("");
                              }
                           }}
                           placeholder="CUSTOM TASK..."
                           className={`flex-1 px-3 py-2 text-[10px] sm:text-xs font-black uppercase outline-none rounded-xl ${t.input}`}
                         />
                         <button
                           onClick={() => {
                              if(newCustomMission.trim()) {
                                 updateBrainFirebase({ customMissions: [...brain.customMissions, { id: Date.now().toString(), text: newCustomMission.trim(), targetDate: addDays(todayStr, 1), completed: false }] });
                                 setNewCustomMission("");
                              }
                           }}
                           className={`px-3.5 py-2 rounded-xl tap-effect transition-all ${t.btnPrimary}`}
                         >
                           <Send size={14} className="stroke-[3]" />
                         </button>
                       </div>
                       {brain.customMissions.filter((m: any) => m.targetDate === addDays(todayStr, 1)).length > 0 && (
                          <div className="mb-4 space-y-1.5">
                            {brain.customMissions.filter((m: any) => m.targetDate === addDays(todayStr, 1)).map((m: any) => (
                               <div key={m.id} className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1.5 rounded-xl flex justify-between items-center border ${t.cardInner} ${t.textMain} ${t.borderAccent}`}>
                                 <span className="truncate pr-2">• {m.text}</span>
                                 <button onClick={() => updateBrainFirebase({ customMissions: brain.customMissions.filter((task: any) => task.id !== m.id) })} className={`transition-colors tap-effect ${t.textMuted} hover:text-red-500 shrink-0 p-1`}><Trash2 size={12} className="stroke-[3]" /></button>
                               </div>
                            ))}
                          </div>
                       )}

                       {/* Tomorrow's Scheduled Classes & Events */}
                       {(() => {
                         const tomorrowEvents = (brain.scheduledEvents || []).filter(
                           (e: ScheduledEvent) => e.date === addDays(todayStr, 1) && !e.completed
                         );
                         return (
                           <div className="mb-3 space-y-1.5 border-t pt-2.5 border-white/10">
                             <div className="flex items-center justify-between">
                               <span className={`text-[9px] font-black uppercase tracking-widest ${t.textAccent}`}>
                                 📅 TOMORROW'S CLASSES ({tomorrowEvents.length})
                               </span>
                               <button
                                 onClick={() => {
                                   setIsNightShiftOpen(false);
                                   setIsScheduleModalOpen(true);
                                 }}
                                 className="text-[8px] font-black uppercase text-amber-300 hover:underline"
                               >
                                 + Schedule
                               </button>
                             </div>
                             {tomorrowEvents.length > 0 ? (
                               <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                                 {tomorrowEvents.map((ev: ScheduledEvent) => (
                                   <div
                                     key={ev.id}
                                     className={`text-[9px] font-black uppercase tracking-wider p-2 rounded-xl flex items-center justify-between border bg-sky-500/10 border-sky-400/40 text-sky-200`}
                                   >
                                     <span className="truncate">🎓 {ev.title} {ev.time ? `(${ev.time})` : ''}</span>
                                     <button
                                       onClick={() => deleteScheduledEvent(ev.id)}
                                       className="text-slate-400 hover:text-red-400 ml-1 shrink-0 p-1"
                                     >
                                       <Trash2 size={11} />
                                     </button>
                                   </div>
                                 ))}
                               </div>
                             ) : (
                               <p className="text-[8px] text-slate-400 italic">No classes scheduled for tomorrow.</p>
                             )}
                           </div>
                         );
                       })()}
                       {brain.stagingTopics.length > 0 && (
                         <>
                           <div className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1.5 border-t pt-2.5 ${t.textAccent} ${t.borderAccent} opacity-80`}>PIN SYLLABUS TARGET</div>
                           <div className="space-y-1 max-h-28 overflow-y-auto hide-scrollbar pr-1">
                             {brain.stagingTopics.slice(0, 3).map((topic: any, idx: any) => (
                               <button key={topic.id} onClick={() => {
                                   const items = [...brain.stagingTopics]; const clickedItem = items.splice(idx, 1)[0]; items.unshift(clickedItem);
                                   updateBrainFirebase({ stagingTopics: items });
                                 }} className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between group border ${t.cardInner} hover:${t.borderAccent} tap-effect`}>
                                 <span className={`font-black text-[9px] sm:text-[10px] uppercase truncate pr-2 tracking-widest ${t.textMain}`}>{topic.title}</span>
                                 <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${t.badge} ${t.textAccent}`}>PIN</span>
                               </button>
                             ))}
                           </div>
                         </>
                       )}
                    </div>
                  )}
                </div>
              )}

              {/* SECOND BRAIN MOBILE BOTTOM NAVIGATION BAR */}
              <div className={`fixed bottom-0 left-0 w-full border-t z-40 overflow-hidden backdrop-blur-2xl ${t.card} border-white/10`}>
                <div className="max-w-md sm:max-w-xl mx-auto grid grid-cols-6 px-1 py-1 sm:py-1.5 pb-[calc(env(safe-area-inset-bottom,0px)+6px)]">
                  {[
                    { id: 'dashboard', icon: CalendarIcon, label: 'MISSION' },
                    { id: 'study', icon: Activity, label: 'QUEUE' },
                    { id: 'history', icon: History, label: 'HISTORY' },
                    { id: 'wisdom', icon: Folder, label: 'WISDOM' },
                    { id: 'vault', icon: BrainCircuit, label: 'DUMP' },
                    { id: 'urge', icon: ShieldAlert, label: 'URGE' }
                  ].map((tab: any) => (
                    <button
                      key={tab.id}
                      onClick={() => setBrainTab(tab.id)}
                      className={`flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-xl transition-all duration-200 tap-effect ${
                        brainTab === tab.id
                          ? `${t.textAccent} font-black scale-105`
                          : `${t.textMuted} hover:${t.textMain} font-bold opacity-70`
                      }`}
                    >
                      <tab.icon size={18} className={brainTab === tab.id ? 'stroke-[2.5]' : 'stroke-2'} />
                      <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider truncate max-w-full">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {appMode === 'krishna' && renderMyKrishna()}
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. FOCUS CHAMBER & DEEP WORK MODAL */}
      {/* ========================================== */}
      {focusState.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-2 ${t.card} ${t.borderAccent} relative overflow-hidden flex flex-col justify-between`}>
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-current opacity-10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

            {/* Header / Mode Picker */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${t.cardInner} ${t.borderAccent}`}>
                    <Timer className={`w-5 h-5 ${t.textAccent} animate-pulse`} />
                  </div>
                  <div>
                    <h3 className={`font-black text-sm sm:text-base uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>
                      Focus Chamber
                    </h3>
                    <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-widest ${t.textMuted}`}>
                      {focusState.isBreak ? "☕ Break Mode" : "⚡ Deep Work Protocol"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setFocusState((prev) => ({ ...prev, isOpen: false, isRunning: false }))}
                  className={`p-2 rounded-xl transition-all tap-effect ${t.cardInner} ${t.textMuted} hover:${t.textMain}`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 mb-5">
                <button
                  onClick={() => switchFocusMode("pomodoro")}
                  className={`py-2 text-[10px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect ${
                    focusState.mode === "pomodoro"
                      ? `${t.btnPrimary} shadow-md`
                      : `${t.textMuted} hover:${t.textMain}`
                  }`}
                >
                  Pomodoro (25m)
                </button>
                <button
                  onClick={() => switchFocusMode("deepflow")}
                  className={`py-2 text-[10px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect ${
                    focusState.mode === "deepflow"
                      ? `${t.btnPrimary} shadow-md`
                      : `${t.textMuted} hover:${t.textMain}`
                  }`}
                >
                  Deep Flow (50m)
                </button>
                <button
                  onClick={() => switchFocusMode("timer")}
                  className={`py-2 text-[10px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect ${
                    focusState.mode === "timer"
                      ? `${t.btnPrimary} shadow-md`
                      : `${t.textMuted} hover:${t.textMain}`
                  }`}
                >
                  ⏱️ Timer ({focusState.customTimerMinutes || 10}m)
                </button>
                <button
                  onClick={() => switchFocusMode("stopwatch")}
                  className={`py-2 text-[10px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect ${
                    focusState.mode === "stopwatch"
                      ? `${t.btnPrimary} shadow-md`
                      : `${t.textMuted} hover:${t.textMain}`
                  }`}
                >
                  Stopwatch
                </button>
              </div>

              {/* Custom Timer Selector (when in Timer Mode) */}
              {focusState.mode === "timer" && (
                <div className={`p-3 rounded-2xl border mb-5 ${t.cardInner} ${t.borderAccent} animate-in fade-in duration-200`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${t.textAccent}`}>
                      Set Timer: {focusState.customTimerMinutes || 10} Minutes
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCustomTimerDuration(Math.max(1, (focusState.customTimerMinutes || 10) - 5))}
                        disabled={focusState.isRunning}
                        className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tap-effect disabled:opacity-40 ${t.btnWarning}`}
                      >
                        -5m
                      </button>
                      <button
                        onClick={() => setCustomTimerDuration(Math.min(180, (focusState.customTimerMinutes || 10) + 5))}
                        disabled={focusState.isRunning}
                        className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tap-effect disabled:opacity-40 ${t.btnWarning}`}
                      >
                        +5m
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[5, 10, 15, 25, 45, 60].map((presetMins) => (
                      <button
                        key={presetMins}
                        onClick={() => setCustomTimerDuration(presetMins)}
                        disabled={focusState.isRunning}
                        className={`py-1 rounded-lg text-[10px] font-bold tap-effect transition-all disabled:opacity-40 ${
                          (focusState.customTimerMinutes || 10) === presetMins
                            ? `${t.btnPrimary} shadow-sm font-black`
                            : "bg-black/40 text-white/70 hover:text-white border border-white/10"
                        }`}
                      >
                        {presetMins}m
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Focus Target Label */}
              <div className={`p-3.5 rounded-2xl border text-center mb-6 ${t.cardInner} ${t.borderAccent}`}>
                <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mb-0.5 ${t.textAccent}`}>
                  Active Mission / Chapter
                </span>
                <p className={`text-xs sm:text-sm font-black uppercase truncate ${t.textMain} ${t.fontHeading}`}>
                  {focusState.taskTitle || "General High-Intensity Focus"}
                </p>
              </div>

              {/* Countdown / Stopwatch Big Display */}
              <div className="my-4 text-center">
                {(() => {
                  const mins = Math.floor(focusState.secondsLeft / 60);
                  const secs = focusState.secondsLeft % 60;
                  const displayTime =
                    focusState.mode === "stopwatch"
                      ? `${Math.floor(focusState.totalFocusedSeconds / 60)
                          .toString()
                          .padStart(2, "0")}:${(focusState.totalFocusedSeconds % 60)
                          .toString()
                          .padStart(2, "0")}`
                      : `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

                  const totalDurationSecs = focusState.durationMinutes * 60 || 1;
                  const progressPct =
                    focusState.mode === "stopwatch"
                      ? 100
                      : Math.min(
                          100,
                          Math.max(
                            0,
                            ((totalDurationSecs - focusState.secondsLeft) / totalDurationSecs) * 100
                          )
                        );

                  return (
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative mb-4">
                        <div
                          className={`text-6xl sm:text-7xl font-black tabular-nums tracking-tighter ${
                            focusState.isBreak ? "text-emerald-400" : t.textMain
                          } ${t.fontHeading}`}
                        >
                          {displayTime}
                        </div>
                      </div>

                      {/* Linear Progress Bar */}
                      {focusState.mode !== "stopwatch" && (
                        <div className="w-full h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden mb-6">
                          <div
                            className={`h-full transition-all duration-1000 ease-linear ${
                              focusState.isBreak ? "bg-emerald-400" : t.btnPrimary
                            }`}
                            style={{ width: `${progressPct}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setFocusState((prev) => ({ ...prev, isRunning: !prev.isRunning }))}
                  className={`flex-1 py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl tap-effect ${
                    focusState.isRunning ? t.btnWarning : t.btnPrimary
                  }`}
                >
                  {focusState.isRunning ? (
                    <>
                      <Pause size={18} className="stroke-[3]" /> PAUSE
                    </>
                  ) : (
                    <>
                      <Play size={18} className="stroke-[3]" /> START FOCUS
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const mins =
                      focusState.mode === "deepflow"
                        ? 50
                        : focusState.mode === "pomodoro"
                        ? 25
                        : focusState.mode === "timer"
                        ? (focusState.customTimerMinutes || 10)
                        : 0;
                    setFocusState((prev) => ({
                      ...prev,
                      isRunning: false,
                      secondsLeft: mins * 60,
                      totalFocusedSeconds: 0,
                    }));
                  }}
                  className={`p-3.5 rounded-2xl border tap-effect transition-all ${t.cardInner} ${t.borderAccent} ${t.textMain}`}
                  title="Reset Timer"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              {/* Completion Reward Pill */}
              <div className={`p-2.5 rounded-xl border text-center ${t.cardInner} border-white/10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider ${t.textMuted}`}>
                <Zap size={13} className={t.textAccent} />
                <span>Rewards: +1 Star ⭐ & +50 XP on completion</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 👑 15-TIER RPG RANK PROGRESSION & ROADMAP MODAL */}
      {/* ========================================== */}
      {isRankRoadmapOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="w-full max-w-3xl rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-amber-400/50 bg-[#090e1a] text-white relative max-h-[92vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 shadow-sm text-2xl">
                  👑
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-xl uppercase tracking-wider text-white">
                    15-Tier RPG Rank Progression
                  </h3>
                  <p className="text-xs font-medium text-slate-300">
                    Prestige Milestones • Discipline Lore • Tier Perks
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRankRoadmapOpen(false)}
                className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white transition-all tap-effect"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Rank Showcase Card */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border-2 ${rankData.currentRank.borderColor} relative overflow-hidden shadow-2xl`}
              style={{
                background: `linear-gradient(135deg, #0b1329 0%, #030712 100%)`,
                boxShadow: `0 0 35px ${rankData.currentRank.bgGlow}`
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/70 border-2 border-white/20 flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
                    {rankData.currentRank.badge}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        TIER {rankData.currentRank.tier} / 15
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        Level {rankData.level}
                      </span>
                    </div>
                    <h2 className={`text-xl sm:text-2xl font-black mt-1 ${rankData.currentRank.color}`}>
                      {rankData.currentRank.name}
                    </h2>
                    <p className="text-xs text-slate-300 italic mt-1 max-w-lg">
                      "{rankData.currentRank.lore}"
                    </p>
                  </div>
                </div>

                <div className="sm:text-right bg-black/40 p-3 rounded-2xl border border-white/10 sm:min-w-[140px]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Lifetime XP</span>
                  <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                    {profile.xp || 0} XP
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    {profile.stars || 0} Stars ⭐
                  </span>
                </div>
              </div>

              {/* Active Perk */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2">
                <span className="text-amber-400 font-black flex items-center gap-1">
                  <Zap size={14} /> ACTIVE PERK:
                </span>
                <span className="text-slate-200">{rankData.currentRank.perk}</span>
              </div>

              {/* Progress to Next Rank */}
              {rankData.nextRank ? (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-slate-300">
                      Next Target: {rankData.nextRank.badge} {rankData.nextRank.name} (Lv {rankData.nextRank.minLevel})
                    </span>
                    <span className="text-amber-300 font-mono">
                      {rankData.xpNeededForNext} XP Left ({rankData.progressToNext}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden p-0.5 bg-black/70 border border-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                      style={{ width: `${Math.max(5, rankData.progressToNext)}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-white/10 text-center text-xs text-amber-300 font-black">
                  🌌 MAXIMUM RANK ATTAINED — SUPREME APEX ETERNAL
                </div>
              )}
            </div>

            {/* Complete 15-Rank Visual Roadmap List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm sm:text-base uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Compass size={16} className="text-amber-400" /> Complete 15-Tier Prestige Progression
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                  Tier {rankData.currentRank.tier} of 15 Unlocked
                </span>
              </div>

              <div className="space-y-2.5 max-h-[48vh] overflow-y-auto pr-1">
                {RPG_RANKS.map((r) => {
                  const isUnlocked = (profile.xp || 0) >= r.minXp || rankData.level >= r.minLevel;
                  const isCurrent = rankData.currentRank.id === r.id;

                  let itemBg = "bg-white/5 border-white/10 opacity-70";
                  if (isCurrent) {
                    itemBg = `bg-gradient-to-r from-amber-500/20 to-black border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50`;
                  } else if (isUnlocked) {
                    itemBg = "bg-emerald-500/10 border-emerald-500/40 text-slate-200";
                  }

                  return (
                    <div
                      key={r.id}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${itemBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center text-2xl flex-shrink-0">
                          {r.badge}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs sm:text-sm font-black ${r.color}`}>
                              Tier {r.tier}: {r.name}
                            </span>
                            {isCurrent && (
                              <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black animate-pulse">
                                CURRENT RANK 🔥
                              </span>
                            )}
                            {isUnlocked && !isCurrent && (
                              <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                UNLOCKED ✅
                              </span>
                            )}
                            {!isUnlocked && (
                              <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                LOCKED 🔒
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-300 italic mt-0.5 line-clamp-1 sm:line-clamp-none">
                            "{r.lore}"
                          </p>
                          <p className="text-[10px] text-amber-300/90 font-medium mt-0.5">
                            Perk: {r.perk}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            const prevRank = RPG_RANKS[Math.max(0, r.tier - 2)];
                            playRankFanfare("up", r.tier);
                            setRankTransitionModal({
                              isOpen: true,
                              type: "up",
                              oldTier: prevRank.tier,
                              newTier: r.tier,
                              oldRank: prevRank,
                              newRank: r
                            });
                          }}
                          className="px-2.5 py-1 rounded-xl bg-amber-400/10 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all tap-effect"
                          title="Preview celebration animation and sound for this rank"
                        >
                          <Sparkles size={12} className="text-amber-400" />
                          <span>Preview VFX</span>
                        </button>
                        <div className="sm:text-right flex-shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                          <span className="text-[10px] font-mono text-cyan-300 block font-bold">
                            Requires Lv {r.minLevel}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 block">
                            {r.minXp.toLocaleString()} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. THE TWO-BOX REFLECTION & 9 PM – 12 AM CLEANUP SYSTEM */}
      {/* ========================================== */}
      {isTwoBoxModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10 bg-[#0d1322]/95 text-white relative max-h-[92vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-sm">
                  <Layers className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base uppercase tracking-wider text-white">
                    The Two-Box System
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
                    Radical Honesty & Daily Night Cleanup
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedDate}
                </span>
                <button
                  onClick={() => setIsTwoBoxModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-all tap-effect"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs & Body */}
            {(() => {
              const twoBoxData = getSelectedTwoBox();
              const monthlyStats = getMonthlyTwoBoxStats();
              const isCleanupLive = isCleanupHourActive();
              const isAlreadyAudited = !!twoBoxData.cleanupCompleted || !!(trackerData[selectedDate]?.twoBoxAudited);

              return (
                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Segmented Tab Controls */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 mb-3 shrink-0">
                    <button
                      onClick={() => setTwoBoxActiveTab("boxes")}
                      className={`py-2 text-[11px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect flex items-center justify-center gap-1.5 ${
                        twoBoxActiveTab === "boxes"
                          ? "bg-amber-400 text-black shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>📦 1. Boxes</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${twoBoxActiveTab === "boxes" ? "bg-black/20 text-black" : "bg-slate-800 text-slate-300"}`}>
                        {twoBoxData.failures.length + twoBoxData.achievements.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setTwoBoxActiveTab("cleanup")}
                      className={`py-2 text-[11px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect flex items-center justify-center gap-1.5 ${
                        twoBoxActiveTab === "cleanup"
                          ? "bg-amber-400 text-black shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>🧹 2. Cleanup</span>
                      {isCleanupLive ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      ) : (
                        twoBoxData.failures.length > 0 && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${twoBoxActiveTab === "cleanup" ? "bg-black/20 text-black" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"}`}>
                            {twoBoxData.failures.length}
                          </span>
                        )
                      )}
                    </button>

                    <button
                      onClick={() => setTwoBoxActiveTab("trophy")}
                      className={`py-2 text-[11px] sm:text-xs font-black uppercase rounded-xl transition-all tap-effect flex items-center justify-center gap-1.5 ${
                        twoBoxActiveTab === "trophy"
                          ? "bg-amber-400 text-black shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>🏆 3. Trophy</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${twoBoxActiveTab === "trophy" ? "bg-black/20 text-black" : "bg-slate-800 text-slate-300"}`}>
                        {monthlyStats.totalWins}
                      </span>
                    </button>
                  </div>

                  {/* Toggleable Quick Tutorial & Guide Banner */}
                  <div className="mb-3 shrink-0">
                    <button
                      onClick={() => setShowTwoBoxGuide(!showTwoBoxGuide)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold flex items-center justify-between transition-all tap-effect"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={13} className="text-amber-400" />
                        {showTwoBoxGuide ? "Hide Quick Guide" : "💡 How to Use the Two-Box System (Quick Guide & Tutorial)"}
                      </span>
                      <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded-md font-bold">
                        {showTwoBoxGuide ? "▲ Close" : "▼ Open Tutorial"}
                      </span>
                    </button>

                    {showTwoBoxGuide && (
                      <div className="mt-2 p-3.5 rounded-2xl bg-slate-900/95 border border-amber-400/40 space-y-2.5 text-xs text-slate-200 animate-in fade-in duration-200 max-h-60 overflow-y-auto">
                        <div className="font-black text-amber-300 uppercase tracking-wide flex items-center gap-1 text-[11px]">
                          <span>📖</span> Simple 3-Step Routine:
                        </div>
                        <div className="space-y-2 text-[11px] leading-relaxed">
                          <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-500/30">
                            <span className="font-bold text-rose-300 block mb-0.5">Step 1 • Box 1 (🛑 Mistakes / Distractions):</span>
                            Din bhar mein jo bhi distractions ya mistakes huye (jaise reels scroll karna, study skip karna) unhe yahan type karke <span className="font-bold text-white bg-rose-600 px-1 py-0.2 rounded text-[10px]">+ Log</span> dabao.
                          </div>
                          <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                            <span className="font-bold text-emerald-300 block mb-0.5">Step 2 • Box 2 (🏆 Wins / Victories):</span>
                            Jo bhi productive kaam ya victories huye (jaise 2 ghante focus study, gym, urge control) unhe yahan type karke <span className="font-bold text-black bg-emerald-400 px-1 py-0.2 rounded text-[10px]">+ Win</span> dabao.
                          </div>
                          <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/30">
                            <span className="font-bold text-amber-300 block mb-0.5">Step 3 • Night Cleanup (9 PM – 12 AM):</span>
                            Raat ko <span className="font-bold text-amber-400">🧹 Cleanup</span> tab kholo:
                            <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300 pl-1">
                              <li><span className="text-rose-300 font-bold">🧹 Clean (+10 XP):</span> Apni mistake ko forgive karke eliminate karo.</li>
                              <li><span className="text-emerald-300 font-bold">⚡ To Win (+20 XP):</span> Mistake ko lesson/victory mein convert karke Box 2 mein bhejo!</li>
                              <li><span className="text-teal-300 font-bold">✨ Complete Daily Cleanup (+30 XP):</span> Sab clean hone ke baad final lock-in karo aur +30 XP lo!</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tab Contents (Scrollable Container) */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                    {/* TAB 1: THE TWO BOXES */}
                    {twoBoxActiveTab === "boxes" && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        {/* Status bar */}
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                            <Layers size={13} className="text-amber-400" /> Daily Honesty Log
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isCleanupLive
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 animate-pulse"
                              : isAlreadyAudited
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}>
                            {isCleanupLive ? "🟢 9 PM Cleanup Live" : isAlreadyAudited ? "✅ Cleaned Today" : "⏳ 9 PM Cleanup"}
                          </span>
                        </div>

                        {/* Box 1: Slip-ups & Distractions */}
                        <div className="p-3.5 sm:p-4 rounded-2xl border border-rose-500/30 bg-rose-950/20 shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                              <span>🛑</span> Box 1: Slip-Ups & Distractions
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              {twoBoxData.failures.length} Logged
                            </span>
                          </div>

                          {/* Input row */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={box1Input}
                              onChange={(e) => setBox1Input(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addBox1Failure(box1Input);
                              }}
                              placeholder="Log slip (e.g., scrolled reels for 30 min)..."
                              className="flex-1 px-3 py-2 text-xs rounded-xl bg-black/40 border border-rose-500/40 text-white placeholder:text-slate-500 outline-none focus:border-rose-400 transition-colors font-medium"
                            />
                            <button
                              onClick={() => addBox1Failure(box1Input)}
                              className="px-3 py-2 text-xs font-black uppercase rounded-xl bg-rose-500 hover:bg-rose-600 text-white tap-effect shrink-0 shadow-sm"
                            >
                              + Log
                            </button>
                          </div>

                          {/* List of failures */}
                          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                            {twoBoxData.failures.length === 0 ? (
                              <div className="p-3 text-center border border-dashed border-rose-500/20 bg-rose-950/10 rounded-xl">
                                <p className="text-[11px] text-slate-400 font-medium">
                                  No slip-ups logged today. Practice radical honesty.
                                </p>
                              </div>
                            ) : (
                              twoBoxData.failures.map((f: string, i: number) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/30 flex items-center justify-between gap-2"
                                >
                                  <span className="text-xs text-rose-100 font-medium break-words flex-1 flex items-start gap-1.5">
                                    <span className="text-rose-400 font-bold">•</span> {f}
                                  </span>
                                  <button
                                    onClick={() => removeBox1Failure(i)}
                                    className="text-rose-400 hover:text-white p-1 tap-effect shrink-0"
                                    title="Delete entry"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Box 2: Daily Wins & Achievements */}
                        <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                              <span>🏆</span> Box 2: Wins & Victories
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              {twoBoxData.achievements.length} Wins
                            </span>
                          </div>

                          {/* Input row */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={box2Input}
                              onChange={(e) => setBox2Input(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addBox2Achievement(box2Input);
                              }}
                              placeholder="Log win (e.g., 2 hrs deep focus, urge defeated)..."
                              className="flex-1 px-3 py-2 text-xs rounded-xl bg-black/40 border border-emerald-500/40 text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 transition-colors font-medium"
                            />
                            <button
                              onClick={() => addBox2Achievement(box2Input)}
                              className="px-3 py-2 text-xs font-black uppercase rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black tap-effect shrink-0 shadow-sm font-bold"
                            >
                              + Win
                            </button>
                          </div>

                          {/* List of achievements */}
                          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                            {twoBoxData.achievements.length === 0 ? (
                              <div className="p-3 text-center border border-dashed border-emerald-500/20 bg-emerald-950/10 rounded-xl">
                                <p className="text-[11px] text-slate-400 font-medium">
                                  No wins logged yet. Register your first victory!
                                </p>
                              </div>
                            ) : (
                              twoBoxData.achievements.map((a: string, i: number) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-between gap-2"
                                >
                                  <span className="text-xs text-emerald-100 font-medium break-words flex-1 flex items-start gap-1.5">
                                    <span className="text-yellow-400 font-bold">⭐</span> {a}
                                  </span>
                                  <button
                                    onClick={() => removeBox2Achievement(i)}
                                    className="text-emerald-400 hover:text-white p-1 tap-effect shrink-0"
                                    title="Delete entry"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Discipline Rating & Quick CTA */}
                        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                            Discipline Rating:
                          </span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((starVal) => (
                              <button
                                key={starVal}
                                type="button"
                                onClick={() => handleSetTwoBoxRating(starVal)}
                                className={`text-lg transition-transform hover:scale-125 tap-effect ${
                                  twoBoxRating >= starVal
                                    ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                                    : "text-slate-600"
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setTwoBoxActiveTab("cleanup")}
                          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs uppercase tracking-wider shadow-md tap-effect flex items-center justify-center gap-1.5"
                        >
                          <Sparkles size={14} /> Open Night Cleanup Window 🧹 →
                        </button>
                      </div>
                    )}

                    {/* TAB 2: NIGHT CLEANUP PROTOCOL */}
                    {twoBoxActiveTab === "cleanup" && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        {/* Protocol Banner */}
                        <div className={`p-3.5 sm:p-4 rounded-2xl border ${
                          isCleanupLive
                            ? "border-emerald-400/80 bg-emerald-950/30 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                            : "border-amber-400/40 bg-amber-950/20"
                        }`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                              isCleanupLive ? "text-emerald-300" : "text-amber-300"
                            }`}>
                              <span>🧹</span> 9:00 PM – 12:00 AM Cleanup Protocol
                            </span>
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                              isCleanupLive
                                ? "bg-emerald-400 text-black font-black shadow-sm"
                                : "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                            }`}>
                              {isCleanupLive ? "🟢 Live Now" : "⏳ 9 PM - 12 AM"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                            Review Box 1 slips. Eliminate bad habit triggers and transform mistakes into clean wins before sleep.
                          </p>
                        </div>

                        {/* Active Failures to Clean */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                              Active Slips to Review ({twoBoxData.failures.length}):
                            </span>
                          </div>

                          {twoBoxData.failures.length === 0 ? (
                            <div className="p-5 text-center rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-950/20">
                              <span className="text-2xl block mb-1.5">🎉</span>
                              <p className="text-xs font-bold text-emerald-300">
                                All bad habits cleaned or none logged today!
                              </p>
                              <p className="text-[10px] mt-0.5 text-slate-400 font-medium">
                                Box 1 is clean and Box 2 is primed with your victories.
                              </p>
                            </div>
                          ) : (
                            twoBoxData.failures.map((failItem: string, idx: number) => (
                              <div
                                key={idx}
                                className="p-3 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-rose-400 font-bold">•</span>
                                  <span className="text-xs font-semibold text-slate-100 leading-relaxed break-words">
                                    {failItem}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                                  <button
                                    onClick={() => cleanBadHabit(idx)}
                                    className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white border border-rose-500/40 text-[10px] font-black uppercase tap-effect flex items-center gap-1 transition-all"
                                    title="Strike through & eliminate this habit"
                                  >
                                    <span>🧹 Clean (+10 XP)</span>
                                  </button>
                                  <button
                                    onClick={() => convertBadHabitToWin(idx)}
                                    className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-200 hover:text-black border border-emerald-500/40 text-[10px] font-black uppercase tap-effect flex items-center gap-1 transition-all"
                                    title="Convert this slip into a victory in Box 2"
                                  >
                                    <span>⚡ To Win (+20 XP)</span>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Cleaned Habits History Today */}
                        {twoBoxData.cleanedFailures.length > 0 && (
                          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                              <CheckCircle2 size={13} /> Conquered & Cleaned Today ({twoBoxData.cleanedFailures.length}):
                            </span>
                            <div className="space-y-1">
                              {twoBoxData.cleanedFailures.map((cItem: string, cIdx: number) => (
                                <div key={cIdx} className="text-[11px] text-emerald-200/80 font-medium flex items-center gap-1.5 line-through">
                                  <span className="text-emerald-400 font-bold">✓</span> {cItem}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Single Daily Cleanup Button (Prevents Unlimited XP Exploitation) */}
                        {isAlreadyAudited ? (
                          <div className="w-full py-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
                            <CheckCircle2 size={16} /> Daily Cleanup Locked In (+30 XP Claimed)
                          </div>
                        ) : (
                          <button
                            onClick={completeDailyCleanup}
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)] tap-effect flex items-center justify-center gap-2"
                          >
                            <Sparkles size={16} /> Complete Daily Cleanup & Lock In (+30 XP)
                          </button>
                        )}
                      </div>
                    )}

                    {/* TAB 3: TROPHY WALL */}
                    {twoBoxActiveTab === "trophy" && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        {/* KPI Metric Cards */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          <div className="p-3 sm:p-3.5 rounded-2xl border border-amber-400/30 bg-slate-900/90 text-center shadow-sm">
                            <span className="text-xl block mb-0.5">🏆</span>
                            <span className="text-xl sm:text-2xl font-black block text-amber-300">
                              {monthlyStats.totalWins}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                              Box 2 Wins
                            </span>
                          </div>

                          <div className="p-3 sm:p-3.5 rounded-2xl border border-emerald-400/30 bg-slate-900/90 text-center shadow-sm">
                            <span className="text-xl block mb-0.5">🧹</span>
                            <span className="text-xl sm:text-2xl font-black block text-emerald-400">
                              {monthlyStats.totalCleaned}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                              Cleaned
                            </span>
                          </div>

                          <div className="p-3 sm:p-3.5 rounded-2xl border border-cyan-400/30 bg-slate-900/90 text-center shadow-sm">
                            <span className="text-xl block mb-0.5">⚡</span>
                            <span className="text-xl sm:text-2xl font-black block text-cyan-300">
                              {monthlyStats.totalWins + monthlyStats.totalCleaned > 0
                                ? Math.round(
                                    (monthlyStats.totalWins /
                                      (monthlyStats.totalWins + monthlyStats.totalFailures || 1)) *
                                      100
                                  )
                                : 100}
                              %
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                              Win Rate
                            </span>
                          </div>
                        </div>

                        {/* Victory Stream */}
                        <div className="space-y-2">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                            This Month's Victory Wall ({monthlyStats.allMonthlyAchievements.length}):
                          </span>
                          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            {monthlyStats.allMonthlyAchievements.length === 0 ? (
                              <div className="p-6 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/60">
                                <span className="text-2xl block mb-1 opacity-60">📜</span>
                                <p className="text-xs font-bold text-slate-300">No achievements recorded this month yet.</p>
                                <p className="text-[10px] mt-0.5 text-slate-400 font-medium">Log your wins in Box 2 to build your victory momentum!</p>
                              </div>
                            ) : (
                              monthlyStats.allMonthlyAchievements.map((item, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 flex items-center justify-between gap-2 shadow-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-sm">⭐</span>
                                    <span className="text-xs text-slate-100 font-semibold">{item.text}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-emerald-300 font-bold px-1.5 py-0.5 rounded bg-black/40 border border-emerald-500/30 shrink-0">
                                    {item.date}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. WEEKLY AI PERFORMANCE REVIEW MODAL */}
      {/* ========================================== */}
      {isWeeklyReviewOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border-2 ${t.card} ${t.borderAccent} max-h-[85vh] flex flex-col justify-between overflow-hidden relative`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl border ${t.cardInner} ${t.borderAccent}`}>
                  <Award className={`w-5 h-5 ${t.textAccent}`} />
                </div>
                <div>
                  <h3 className={`font-black text-sm sm:text-base uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>
                    7-Day AI Performance Audit
                  </h3>
                  <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-widest ${t.textMuted}`}>
                    Gemini Peak-Performance Report
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsWeeklyReviewOpen(false)}
                className={`p-2 rounded-xl transition-all tap-effect ${t.cardInner} ${t.textMuted} hover:${t.textMain}`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Report Content */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 my-2">
              {isGeneratingWeeklyReview ? (
                <div className="py-16 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border-2 animate-bounce ${t.cardInner} ${t.borderAccent}`}>
                    <Bot className={`w-8 h-8 ${t.textAccent}`} />
                  </div>
                  <h4 className={`text-sm sm:text-base font-black uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>
                    Coach is Auditing Your Week...
                  </h4>
                  <p className={`text-xs max-w-md mx-auto leading-relaxed ${t.textMuted}`}>
                    Crunching 7-day habit completions, streak defense, focus hours, and journal reflections.
                  </p>
                </div>
              ) : (
                <div className={`p-5 rounded-2xl border leading-relaxed text-xs sm:text-sm font-sans whitespace-pre-wrap ${t.cardInner} ${t.borderAccent} ${t.textMain}`}>
                  {weeklyReviewText || "No review generated yet."}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  if (weeklyReviewText) {
                    navigator.clipboard.writeText(weeklyReviewText);
                    showMessage("Weekly Review Copied! 📋");
                  }
                }}
                disabled={!weeklyReviewText || isGeneratingWeeklyReview}
                className={`px-4 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 tap-effect ${t.cardInner} ${t.borderAccent} ${t.textMain} disabled:opacity-50`}
              >
                <Copy size={15} /> Copy Report
              </button>

              <button
                onClick={() => setIsWeeklyReviewOpen(false)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg tap-effect ${t.btnPrimary}`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* ⚔️ 1v1 PVP DISCIPLINE BATTLE ARENA MODAL */}
      {/* ========================================== */}
      {isBattleArenaOpen && renderBattleArenaModal()}

      {/* ========================================== */}
      {/* 📅 CLASS & MEETING DISPATCHER MODAL */}
      {/* ========================================== */}
      {isScheduleModalOpen && renderScheduleModal()}

      {/* ========================================== */}
      {/* 🏆 DUOLINGO-STYLE RANK UP & RANK DOWN MODAL */}
      {/* ========================================== */}
      {renderRankTransitionModal()}
    </div>
  );
}
