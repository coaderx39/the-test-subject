import React, { useState, useEffect, useRef } from "react";
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
  ListTodo, Inbox, TrendingUp, PieChart, Crown, Compass, Bell, BellRing, GraduationCap,
  Users, CalendarDays, CheckCheck
} from "lucide-react";

declare const __initial_auth_token: any;

// ==========================================
// THEME ENGINE
// ==========================================
const THEMES = {
   titan: {
    id: 'titan', name: 'Mad Titan',
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

  // ================= WEEKLY AI PERFORMANCE REVIEW STATE =================
  const [isWeeklyReviewOpen, setIsWeeklyReviewOpen] = useState(false);
  const [weeklyReviewText, setWeeklyReviewText] = useState("");
  const [isGeneratingWeeklyReview, setIsGeneratingWeeklyReview] = useState(false);

  // ================= RPG RANK PROGRESSION & ROADMAP STATE =================
  const [isRankRoadmapOpen, setIsRankRoadmapOpen] = useState(false);

  // ================= ADVANCED ANALYTICS STATE =================
  const [analyticsTab, setAnalyticsTab] = useState<"heatmap" | "focus" | "habits" | "economy">("heatmap");
  const [hoveredHeatmapDay, setHoveredHeatmapDay] = useState<any | null>(null);

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

  const t = (THEMES as any)[profile.activeTheme] || THEMES.brutalist;

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
    if (!user) return;

    const trackerRef = collection(db, "artifacts", appId, "users", user.uid, "tracker_data");
    const unsubsTracker = onSnapshot(trackerRef, (snapshot) => {
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

  const toastTimerRef = useRef<any>(null);
  const showMessage = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000);
  };

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
        showMessage("🔔 Notifications Enabled! You will receive daily progress & class alerts.");
        try {
          new Notification("🔔 Daily Smart Notifications Active", {
            body: "You'll now receive timely habit reminders, class alerts, and midnight danger warnings!",
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

  const testAllSmartNotifications = async () => {
    const permGranted = await requestNotificationPermission();
    if (!permGranted && notificationStatus !== "granted") {
      showMessage("Please enable notification permissions to receive alerts.");
      return;
    }

    const userName = profile?.name ? profile.name.trim().split(" ")[0] : "Prateek";
    const taskList = profile?.customTasks || DEFAULT_TASKS;
    const todayRecord = trackerData[todayStr]?.tasks || {};
    const completedTasksCount = Object.values(todayRecord).filter((v: any) => v === "X").length;
    const totalTasksCount = taskList.length;

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("🚨 11:30 PM Incomplete Task Warning", {
          body: `It's 11:30 PM, ${userName}, and you still haven't completed all your tasks (${completedTasksCount}/${totalTasksCount} done)! Lock in before midnight.`,
          icon: "./favicon.png",
        });

        setTimeout(() => {
          new Notification("🧠 Spaced Repetition Revision Reminder", {
            body: `${userName}, you still haven't completed your scheduled revision today! Don't let your retention drop.`,
            icon: "./favicon.png",
          });
        }, 1500);

        setTimeout(() => {
          new Notification("⚡ Daily Habit Accountability Check", {
            body: `${userName}, your task list is at ${completedTasksCount}/${totalTasksCount}. Keep pushing for 100%!`,
            icon: "./favicon.png",
          });
        }, 3000);
      } catch (err) {
        console.warn("Test notifications failed:", err);
      }
    }
    showMessage("🔔 Dispatched test notification suite (11:30 PM danger, Revision alert, Task check)!");
  };

  const checkAndDispatchSmartNotifications = () => {
    const userName = profile?.name ? profile.name.trim().split(" ")[0] : "Prateek";
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // 1. Habit Progress Metrics
    const taskList = profile?.customTasks || DEFAULT_TASKS;
    const todayRecord = trackerData[todayStr]?.tasks || {};
    const completedTasksCount = Object.values(todayRecord).filter((v: any) => v === "X").length;
    const totalTasksCount = taskList.length;
    const remainingTasksCount = Math.max(0, totalTasksCount - completedTasksCount);
    const isHabitsComplete = completedTasksCount >= totalTasksCount && totalTasksCount > 0;

    // 2. Second Brain Pending Revisions
    const pendingRevisions: { title: string; category: string }[] = [];
    (brain.studyTopics || []).forEach((topic: any) => {
      (topic.schedule || []).forEach((rev: any) => {
        if (rev.targetDate <= todayStr && !rev.completed) {
          pendingRevisions.push({ title: topic.title, category: topic.category });
        }
      });
    });

    // 3. Pending Custom Missions
    const pendingMissions = (brain.customMissions || []).filter(
      (m: any) => m.targetDate <= todayStr && !m.completed
    );

    // 4. Scheduled Classes & Events Today
    const todayClasses: ScheduledEvent[] = (brain.scheduledEvents || []).filter(
      (ev: ScheduledEvent) => ev.date === todayStr && !ev.completed
    );

    // RULE 1: Scheduled Classes & Meetings on Target Date
    todayClasses.forEach((ev) => {
      const classKey = `${todayStr}_scheduled_event_${ev.id}`;
      sendSmartPushNotification(
        classKey,
        `🔔 Today's ${ev.category.toUpperCase()}: ${ev.title}`,
        `${userName}, today is your "${ev.title}"${ev.time ? ` at ${ev.time}` : ""}. Don't forget it!`
      );
    });

    // RULE 2: Morning Protocol Kickoff (8:00 AM – 11:59 AM)
    if (currentHour >= 8 && currentHour < 12) {
      const morningKey = `${todayStr}_morning_kickoff`;
      const missionCount = totalTasksCount + pendingRevisions.length + todayClasses.length;
      sendSmartPushNotification(
        morningKey,
        "☀️ Morning Protocol Ready",
        `Good morning ${userName}! You have ${missionCount} goals locked for today (${totalTasksCount} habits, ${pendingRevisions.length} revisions). Start strong!`
      );
    }

    // RULE 3: Afternoon Habit Progress Check (2:00 PM – 5:59 PM)
    if (currentHour >= 14 && currentHour < 18 && !isHabitsComplete) {
      const afternoonKey = `${todayStr}_afternoon_progress_check`;
      sendSmartPushNotification(
        afternoonKey,
        "⚡ Daily Task Progress Check",
        `${userName}, you have completed ${completedTasksCount}/${totalTasksCount} daily tasks so far. ${remainingTasksCount} left — keep your momentum alive!`
      );
    }

    // RULE 4: Evening Revision Reminder (6:00 PM – 8:59 PM)
    if (currentHour >= 18 && currentHour < 21 && pendingRevisions.length > 0) {
      const revisionKey = `${todayStr}_evening_revision_check`;
      const firstTopic = pendingRevisions[0]?.title || "your study topic";
      sendSmartPushNotification(
        revisionKey,
        "🧠 Pending Revision Reminder",
        `${userName}, you still haven't completed your "${firstTopic}" revision (${pendingRevisions.length} total pending)! Review it now to lock in retention.`
      );
    }

    // RULE 5: 9 PM – 12 AM Two-Box Cleanup Window Active
    if (currentHour >= 21 && currentHour <= 23) {
      const cleanupKey = `${todayStr}_two_box_cleanup_window`;
      sendSmartPushNotification(
        cleanupKey,
        "🧹 9 PM Cleanup Hour Active",
        `${userName}, the Two-Box Reflection window is active! Review your Box 1 distractions and Box 2 achievements before sleep.`
      );
    }

    // RULE 6: Late Night 11:30 PM Incomplete Tasks Alert
    const isLateNight = (currentHour === 23 && currentMinutes >= 30) || (currentHour === 23 && currentMinutes >= 15);
    if (isLateNight && (!isHabitsComplete || pendingMissions.length > 0 || pendingRevisions.length > 0)) {
      const lateNightKey = `${todayStr}_late_night_1130_danger`;
      sendSmartPushNotification(
        lateNightKey,
        "🚨 It's 11:30 PM & Tasks are Incomplete!",
        `It's 11:30 PM, ${userName}, and you still haven't completed all your tasks (${remainingTasksCount} habits & ${pendingRevisions.length} revisions left)! Lock in before midnight to protect your streak!`
      );
    }
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
    const newProfile = { ...profile, ...updates };
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

  const saveDayData = async (dateStr: string, tasks: any, reason?: string, summary?: string, star?: boolean, snapshot?: any) => {
    const updatedDay = { tasks, reasonForO: reason || "", summary: summary || "", star: !!star, taskSnapshot: snapshot || (profile.customTasks || DEFAULT_TASKS) };
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

  const checkPerfectDayBonus = (dateStr: string, tasks: any, totalActiveTasks: number) => {
    const vals = Object.values(tasks);
    if (vals.length >= totalActiveTasks && vals.every((v) => v === "X")) {
      const dayData = trackerData[dateStr] || {};
      if (!dayData.perfectBonusClaimed) {
        updateProfileFirebase({ stars: profile.stars + 3 });
        saveDayData(dateStr, tasks, dayData.reasonForO, dayData.summary, dayData.star, dayData.taskSnapshot);
        if (user && db) setDoc(doc(db, "artifacts", appId, "users", user.uid, "tracker_data", dateStr), { perfectBonusClaimed: true }, { merge: true });
        showMessage("🔥 +3 Stars for a PERFECT DAY!");
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
          saveDayData(selectedDate, updatedTasks, currentDayData.reasonForO, currentDayData.summary, currentDayData.star, currentDayData.taskSnapshot);
          const markedInv = profile.inventory.map((i: any) => i.isEraserActiveFlag ? { ...i, status: "used", isEraserActiveFlag: false } : i);
          updateProfileFirebase({ inventory: markedInv });
          setIsEraserActive(false);
          showMessage("History Rewritten! 🧽 Eraser Consumed.");
          return;
        } else return;
      } else return;
    }

    const updatedTasks = { ...currentDayData.tasks, [taskId]: value };
    const hasO = Object.values(updatedTasks).includes("O");
    const newReason = hasO ? currentDayData.reasonForO : "";
    saveDayData(selectedDate, updatedTasks, newReason, currentDayData.summary, currentDayData.star, currentSnapshot);
    checkPerfectDayBonus(selectedDate, updatedTasks, currentSnapshot.length);
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
  // AUTOMATED STREAK SHIELD PROTECTION
  // ==========================================
  useEffect(() => {
    const yesterdayStr = addDays(todayStr, -1);
    const yesterdayData = trackerData[yesterdayStr];
    const shieldsAvailable = profile.streakShields || 0;

    if (shieldsAvailable > 0 && yesterdayData && !yesterdayData.shieldProtected && !yesterdayData.shieldChecked) {
      const activeListCount = (yesterdayData.taskSnapshot || profile.customTasks || DEFAULT_TASKS).length;
      const vals = yesterdayData.tasks ? Object.values(yesterdayData.tasks) : [];
      const isMissed = vals.length === 0 || vals.includes("O") || vals.length < activeListCount || !vals.every(v => v === "X");

      if (isMissed) {
        const updatedYesterday = {
          ...yesterdayData,
          shieldProtected: true,
          shieldChecked: true,
        };
        updateTrackerFirebase(yesterdayStr, updatedYesterday);
        updateProfileFirebase({ streakShields: Math.max(0, shieldsAvailable - 1) });
        showMessage(`🛡️ Streak Freeze Shield auto-protected your streak for ${yesterdayStr}! (1 Shield Used)`);
      }
    }
  }, [todayStr, trackerData, profile.streakShields]);

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
      <div className="space-y-6 sm:space-y-8 pb-10 animate-in fade-in zoom-in duration-300">
        {/* HERO PROFILE & XP PROGRESS CARD */}
        <div className={`p-5 sm:p-7 relative overflow-hidden shadow-2xl transition-all ${t.header} border-2 ${t.borderAccent}`}>
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-5 flex-shrink min-w-0">
              <div className={`w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden border-2 shadow-lg transition-transform duration-300 hover:scale-105 ${t.borderAccent} ring-2 ring-current ring-offset-2 ring-offset-black/40`}>
                {profile.dp ? (
                  <img src={profile.dp} alt="User DP" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl sm:text-4xl animate-bounce-subtle">{rankData.currentRank.badge}</span>
                )}
              </div>
              <div className="min-w-0 overflow-hidden">
                <h1 className={`text-lg sm:text-3xl font-black truncate tracking-tight ${t.textMain} ${t.fontHeading}`}>{profile.name}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <button
                    onClick={() => setIsRankRoadmapOpen(true)}
                    className={`text-[9px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${t.badge} ${t.fontHeading} tap-effect flex items-center gap-1 hover:scale-105 transition-transform shadow-md`}
                    title="Click to view full 15-tier RPG Rank Progression Roadmap!"
                  >
                    <Crown size={12} /> {rankData.currentRank.title}
                  </button>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${t.textAccent} ${t.fontHeading}`}>
                    Level {rankData.level}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 font-bold">
                    ({profile.xp || 0} XP)
                  </span>
                </div>
              </div>
            </div>

            {/* Star Counter, Streak Shield & Schedule Dispatcher Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              {/* Scheduled Classes & Meetings Quick Pill */}
              <div
                onClick={() => setIsScheduleModalOpen(true)}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2 flex-shrink-0 shadow-lg border tap-effect cursor-pointer ${
                  (brain.scheduledEvents || []).filter((e: ScheduledEvent) => e.date === todayStr && !e.completed).length > 0
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/50 animate-pulse"
                    : `${t.cardInner} ${t.borderAccent}`
                }`}
                title="Class & Meeting Dispatcher: Schedule future dates & get alerts"
              >
                <span className="text-lg sm:text-2xl">📅</span>
                <div className="text-right">
                  <span className={`text-base sm:text-2xl font-black block leading-none ${t.textAccent} ${t.fontHeading}`}>
                    {(brain.scheduledEvents || []).filter((e: ScheduledEvent) => !e.completed).length}
                  </span>
                  <span className={`text-[7px] sm:text-[9px] font-bold uppercase tracking-widest ${t.textMuted}`}>Schedule</span>
                </div>
              </div>

              {/* Streak Shield Status Pill */}
              <div
                onClick={() => setHabitRoute("shop")}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2 flex-shrink-0 shadow-lg border tap-effect cursor-pointer ${t.cardInner} ${t.borderAccent}`}
                title="Streak Freeze Shields protect your streak when you miss a day! (Max 2 stored)"
              >
                <span className="text-lg sm:text-2xl">🛡️</span>
                <div className="text-right">
                  <span className={`text-base sm:text-2xl font-black block leading-none ${t.textAccent} ${t.fontHeading}`}>
                    {profile.streakShields || 0}/2
                  </span>
                  <span className={`text-[7px] sm:text-[9px] font-bold uppercase tracking-widest ${t.textMuted}`}>Shields</span>
                </div>
              </div>

              {/* Star Counter Pill with Glow */}
              <div
                onClick={() => setHabitRoute("shop")}
                className={`px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl flex items-center gap-2 sm:gap-3 flex-shrink-0 shadow-lg border glow-gold-pulse tap-effect cursor-pointer ${t.cardInner} ${t.borderAccent}`}
              >
                <span className="text-xl sm:text-3xl animate-float">⭐</span>
                <div className="text-right">
                  <span className={`text-xl sm:text-3xl font-black block leading-none ${t.textWarning} ${t.fontHeading}`}>{profile.stars}</span>
                  <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}>Stars Wallet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic XP Progress Bar */}
          <div
            onClick={() => setIsRankRoadmapOpen(true)}
            className="mt-5 sm:mt-6 pt-4 border-t border-current/20 cursor-pointer group"
            title="Click to view RPG Rank Progression"
          >
            <div className="flex justify-between items-center text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <span className={`flex items-center gap-1.5 ${t.textMain} group-hover:${t.textAccent} transition-colors`}>
                <Sparkles size={13} className={t.textAccent} /> Tier {rankData.currentRank.tier}: {rankData.currentRank.name} Mastery
              </span>
              {rankData.nextRank ? (
                <span className={t.textAccent}>
                  {rankData.xpNeededForNext} XP to {rankData.nextRank.badge} Tier {rankData.nextRank.tier} ({rankData.progressToNext}%)
                </span>
              ) : (
                <span className="text-emerald-400 font-black">👑 MAX RANK ACHIEVED</span>
              )}
            </div>
            <div className={`w-full h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5 border ${t.cardInner} ${t.borderAccent}`}>
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
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border-2 border-amber-400/70 shadow-[0_0_30px_rgba(251,191,36,0.3)] space-y-3 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-amber-400 text-black font-black text-xs animate-bounce">
                    🚨 TODAY
                  </span>
                  <h3 className={`text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 ${t.fontHeading}`}>
                    Scheduled Classes & Meetings Today ({todaysActiveEvents.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="text-[10px] font-black uppercase tracking-wider text-amber-200 hover:text-white underline tap-effect"
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
                      className="p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className="text-xl flex-shrink-0 mt-0.5">{catMeta.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${catMeta.badgeBg}`}>
                              {catMeta.label}
                            </span>
                            {ev.time && (
                              <span className="text-[9px] font-bold text-amber-200 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                                <Clock size={10} /> {ev.time}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-white mt-1 truncate">
                            {ev.title}
                          </h4>
                          {ev.notes && (
                            <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5 font-sans">
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
                          <Zap size={12} /> Focus ⚡
                        </button>
                        <button
                          onClick={() => toggleCompleteScheduledEvent(ev.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-[10px] font-black uppercase tap-effect flex items-center gap-1"
                        >
                          <CheckCircle2 size={13} /> Attended ✅
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* HIGH-VELOCITY ACTION ROW: FOCUS CHAMBER & TWO-BOX REFLECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          <button
            onClick={() => startFocusSession()}
            className={`p-4 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border flex items-center justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md border ${t.card} ${t.borderAccent}`}>
                <Zap className={`w-6 h-6 ${t.textAccent} animate-pulse`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Focus Chamber</h3>
                  <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase font-black ${t.badge}`}>+1⭐</span>
                </div>
                <p className={`text-[9px] sm:text-xs mt-0.5 ${t.textMuted}`}>Pomodoro, Deep Flow, Timer & Stopwatch.</p>
              </div>
            </div>
            <MoveRight size={18} className={`text-current opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${t.textAccent}`} />
          </button>

          <button
            onClick={() => setIsTwoBoxModalOpen(true)}
            className={`p-4 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border flex items-center justify-between ${t.cardInner} hover:${t.borderAccent}`}
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md border ${t.card} ${t.borderAccent}`}>
                <Layers className={`w-6 h-6 ${t.textAccent}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm sm:text-base font-black ${t.textMain} ${t.fontHeading}`}>Two-Box System</h3>
                  <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase font-black ${isCleanupHourActive() ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' : t.badge}`}>
                    {isCleanupHourActive() ? "🧹 9PM-12AM LIVE" : "DISCIPLINE"}
                  </span>
                </div>
                <p className={`text-[9px] sm:text-xs mt-0.5 ${t.textMuted}`}>Box 1 Failures • Box 2 Achievements • 9 PM - 12 AM Cleanup.</p>
              </div>
            </div>
            <MoveRight size={18} className={`text-current opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${t.textAccent}`} />
          </button>
        </div>

        {/* 8 FEATURE ACTION TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          <button onClick={() => setHabitRoute("arena")} className={`p-5 sm:p-6 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border ${t.cardInner} hover:${t.borderAccent}`}>
            <Swords className={`absolute -right-4 -bottom-4 w-28 h-28 sm:w-36 sm:h-36 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500 ${t.textAccent}`} />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Swords className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${t.textAccent} group-hover:${t.textMain}`} />
            </div>
            <h2 className={`text-lg sm:text-2xl font-black relative z-10 tracking-tight ${t.textMain} ${t.fontHeading}`}>Enter Arena</h2>
            <p className={`text-[10px] sm:text-sm mt-1 relative z-10 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Execute daily tasks & conquer calendar levels.</p>
          </button>

          <button onClick={() => setHabitRoute("shop")} className={`p-5 sm:p-6 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border ${t.cardInner} hover:${t.borderAccent}`}>
            <ShoppingCart className={`absolute -right-4 -bottom-4 w-28 h-28 sm:w-36 sm:h-36 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500 ${t.textAccent}`} />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md border ${t.card} ${t.borderAccent}`}>
              <ShoppingCart className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${t.textAccent} group-hover:${t.textMain}`} />
            </div>
            <h2 className={`text-lg sm:text-2xl font-black relative z-10 tracking-tight ${t.textMain} ${t.fontHeading}`}>Reward Shop</h2>
            <p className={`text-[10px] sm:text-sm mt-1 relative z-10 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Spend earned stars on guilt-free perks.</p>
          </button>

          <button onClick={() => setHabitRoute("analysis")} className={`col-span-1 sm:col-span-2 p-5 sm:p-6 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border ${t.cardInner} hover:${t.borderAccent}`}>
            <BarChart2 className={`absolute -right-4 -bottom-4 w-32 h-32 sm:w-44 sm:h-44 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 ${t.textAccent}`} />
            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg border transition-transform group-hover:scale-105 ${t.card} ${t.borderAccent}`}>
                <BarChart2 className={`w-7 h-7 sm:w-9 sm:h-9 ${t.textAccent}`} />
              </div>
              <div>
                <h2 className={`text-base sm:text-2xl font-black tracking-tight ${t.textMain} ${t.fontHeading}`}>Performance Analytics</h2>
                <p className={`text-[10px] sm:text-sm mt-0.5 sm:mt-1 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Track perfect day streaks, completion ratios & weekly trends.</p>
              </div>
            </div>
          </button>

          <button onClick={() => setHabitRoute("plan")} className={`p-5 sm:p-6 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border ${t.cardInner} hover:${t.borderAccent}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Briefcase className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <h2 className={`text-sm sm:text-lg font-black relative z-10 tracking-tight ${t.textMain} ${t.fontHeading}`}>Ongoing Plan</h2>
            <p className={`text-[9px] sm:text-xs mt-1 relative z-10 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Active perks, countdown timers & history log.</p>
          </button>

          <button onClick={() => setHabitRoute("coach")} className={`p-5 sm:p-6 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-xl border ${t.cardInner} hover:${t.borderAccent}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-md border ${t.card} ${t.borderAccent}`}>
              <Bot className={`w-5 h-5 sm:w-6 sm:h-6 ${t.textAccent}`} />
            </div>
            <h2 className={`text-sm sm:text-lg font-black relative z-10 tracking-tight ${t.textMain} ${t.fontHeading}`}>AI Habit Coach</h2>
            <p className={`text-[9px] sm:text-xs mt-1 relative z-10 leading-relaxed ${t.textMuted} ${t.fontHeading}`}>Your personal AI discipline strategist & mentor.</p>
          </button>

          <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
            <button onClick={() => setIsScheduleModalOpen(true)} className={`p-4 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg flex items-center justify-center sm:justify-start gap-3.5 border ${t.cardInner} hover:${t.borderAccent}`}>
              <div className={`p-2.5 rounded-xl border ${t.card} ${t.borderAccent}`}>
                <CalendarDays className={`w-5 h-5 ${t.textAccent}`} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs sm:text-sm font-black block ${t.textMain} ${t.fontHeading}`}>Dispatcher</span>
                  {(brain.scheduledEvents || []).filter((e: ScheduledEvent) => !e.completed).length > 0 && (
                    <span className={`text-[7px] px-1.5 py-0.2 rounded-full font-black ${t.badge}`}>
                      {(brain.scheduledEvents || []).filter((e: ScheduledEvent) => !e.completed).length}
                    </span>
                  )}
                </div>
                <span className={`text-[8px] sm:text-[10px] ${t.textMuted}`}>Classes & meetings</span>
              </div>
            </button>

            <button onClick={() => setHabitRoute("vault")} className={`p-4 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg flex items-center justify-center sm:justify-start gap-3.5 border ${t.cardInner} hover:${t.borderAccent}`}>
              <div className={`p-2.5 rounded-xl border ${t.card} ${t.borderAccent}`}>
                <Download className={`w-5 h-5 ${t.textAccent}`} />
              </div>
              <div>
                <span className={`text-xs sm:text-sm font-black block ${t.textMain} ${t.fontHeading}`}>Data Vault</span>
                <span className={`text-[8px] sm:text-[10px] ${t.textMuted}`}>Export dark HTML & backup</span>
              </div>
            </button>

            <button onClick={() => setHabitRoute("settings")} className={`p-4 sm:p-5 text-left group relative overflow-hidden tap-effect hover-lift rounded-2xl shadow-lg flex items-center justify-center sm:justify-start gap-3.5 border ${t.cardInner} hover:${t.borderAccent}`}>
              <div className={`p-2.5 rounded-xl border ${t.card} ${t.borderAccent}`}>
                <Settings className={`w-5 h-5 ${t.textAccent}`} />
              </div>
              <div>
                <span className={`text-xs sm:text-sm font-black block ${t.textMain} ${t.fontHeading}`}>Command Center</span>
                <span className={`text-[8px] sm:text-[10px] ${t.textMuted}`}>Custom tasks, themes & keys</span>
              </div>
            </button>
          </div>
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
      <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl border ${t.card} ${t.borderAccent}`}>
        <div className={`flex justify-between items-center mb-5 sm:mb-6 border-b pb-3 ${t.borderAccent}`}>
           <h3 className={`font-black uppercase tracking-widest flex items-center gap-2 text-xs sm:text-sm ${t.textAccent} ${t.fontHeading}`}>
             <Activity size={16} /> LIQUID STRIKE QUEUE
           </h3>
           <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${t.cardInner} ${t.textMuted}`}>Drag to prioritize</span>
        </div>

        {/* NEW TAG INPUT */}
        <div className="flex gap-2.5 mb-4 sm:mb-5">
          <input
            type="text"
            value={newSyllabusCat}
            onChange={(e) => setNewSyllabusCat(e.target.value)}
            placeholder="NEW CATEGORY TAG..."
            className={`flex-1 px-4 py-3 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`}
          />
          <button
            onClick={handleAddSyllabusCategory}
            className={`px-5 rounded-2xl font-black uppercase tap-effect flex items-center justify-center ${t.btnPrimary}`}
          >
            <Plus size={20} className="stroke-[3]" />
          </button>
        </div>

        {brain.syllabusCategories.length > 1 && (
           <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
             {brain.syllabusCategories.map((cat: any) => (
               <div key={cat} className={`group flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl transition-all border ${t.cardInner} ${t.textMain} hover:${t.borderAccent}`}>
                 {cat}
                 {cat !== "Raw Backlog" && (
                   <button
                     onClick={() => handleDeleteSyllabusCategory(cat)}
                     className={`transition-colors ${t.textMuted} hover:text-red-500`}
                   >
                     <Trash2 size={13} />
                   </button>
                 )}
               </div>
             ))}
           </div>
        )}

        {/* ADD CHAPTER / TOPIC */}
        <div className="flex gap-2.5 mb-6 sm:mb-8">
          <select
            value={selectedSyllabusCat}
            onChange={(e) => setSelectedSyllabusCat(e.target.value)}
            className={`w-1/3 px-3 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl outline-none cursor-pointer ${t.input} ${t.textAccent} ${t.fontHeading}`}
          >
            {brain.syllabusCategories.map((cat: any) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStagingTopic()}
            placeholder="CHAPTER / TOPIC NAME..."
            className={`flex-1 px-4 py-3 text-xs sm:text-sm font-black uppercase rounded-2xl outline-none transition-colors ${t.input} ${t.fontHeading}`}
          />
          <button
            onClick={handleAddStagingTopic}
            className={`px-5 rounded-2xl font-black tap-effect flex items-center justify-center ${t.btnPrimary}`}
          >
            <Plus size={20} className="stroke-[3]" />
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
            <button onClick={() => setIsScheduleModalOpen(true)} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border bg-sky-500/10 hover:bg-sky-500/20 border-sky-400/40 hover:border-sky-400`}>
              <CalendarDays className="w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors text-sky-400" />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 text-sky-300 ${t.fontHeading}`}>Class & Meeting Dispatcher</h2>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 text-sky-200/70">Future dates, auto-tasks & notifications</p>
            </button>
            <button onClick={testAllSmartNotifications} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border bg-amber-500/10 hover:bg-amber-500/20 border-amber-400/40 hover:border-amber-400`}>
              <Bell className="w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors text-amber-400" />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 text-amber-300 ${t.fontHeading}`}>Test Smart Notifications</h2>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 text-amber-200/70">11:30 PM alert & daily check suite</p>
            </button>
            <button onClick={handleFactoryResetApp} className={`p-6 sm:p-7 text-left group relative overflow-hidden rounded-3xl tap-effect border bg-rose-950/40 hover:bg-rose-900/50 border-rose-500/50 hover:border-rose-400`}>
              <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8 mb-3 relative z-10 transition-colors text-rose-400" />
              <h2 className={`text-sm sm:text-lg font-black relative z-10 text-rose-300 ${t.fontHeading}`}>Factory Reset (0)</h2>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 relative z-10 text-rose-200/70">Wipe all data & restart fresh</p>
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
            <h3 className={`font-black uppercase tracking-widest mb-5 flex items-center gap-2 text-xs sm:text-sm border-b pb-3 ${t.textAccent} ${t.fontHeading} ${t.borderAccent}`}>APP THEME ENGINE</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {Object.values(THEMES).map((themeOption: any) => (
                <button key={themeOption.id} onClick={() => updateProfileFirebase({ activeTheme: themeOption.id })} className={`p-4 rounded-2xl transition-all tap-effect flex flex-col items-center gap-2.5 cursor-pointer shadow-md ${t.cardInner} ${profile.activeTheme === themeOption.id ? t.borderAccent + ' opacity-100 scale-[1.03] ring-2 ring-current shadow-lg' : 'opacity-70 hover:opacity-100 border-transparent'}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center border border-white/20 ${themeOption.appBg.split(' ')[0]}`}>
                     {profile.activeTheme === themeOption.id && <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 ${themeOption.textAccent ? themeOption.textAccent : 'text-white'}`} />}
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-black text-center uppercase tracking-wider ${t.textMain} ${t.fontHeading}`}>{themeOption.name}</span>
                </button>
              ))}
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
  // FOCUS TIMER ENGINE EFFECT
  // ==========================================
  useEffect(() => {
    let interval: any = null;
    if (focusState.isOpen && focusState.isRunning) {
      interval = setInterval(() => {
        setFocusState((prev) => {
          if (prev.mode === "stopwatch") {
            return {
              ...prev,
              totalFocusedSeconds: prev.totalFocusedSeconds + 1,
            };
          }

          if (prev.secondsLeft <= 1) {
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
                totalFocusedSeconds: prev.totalFocusedSeconds + 1,
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

              showMessage(`🎉 Focus Session Complete! +${starsEarned} Star ⭐ & +${xpEarned} XP Earned! ⚡`);

              const breakMins = prev.mode === "deepflow" ? 10 : 5;
              return {
                ...prev,
                isBreak: true,
                durationMinutes: breakMins,
                secondsLeft: breakMins * 60,
                isRunning: false,
                totalFocusedSeconds: prev.totalFocusedSeconds + 1,
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
            secondsLeft: prev.secondsLeft - 1,
            totalFocusedSeconds: prev.totalFocusedSeconds + 1,
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

  const fastForwardFocusTimer = () => {
    setFocusState((prev) => ({
      ...prev,
      secondsLeft: 3,
    }));
    showMessage("⏩ Fast-Forwarded Focus Timer (3 seconds left)");
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

  const completeDailyCleanup = () => {
    const current = getSelectedTwoBox();
    const updated = {
      ...current,
      cleanupCompleted: true,
      rating: twoBoxRating
    };
    const dayRecord = trackerData[selectedDate] || { tasks: {}, reasonForO: "", summary: "" };
    const cleanupNote = `\n\n[📦 The Two-Box System - 9 PM to 12 AM Habit Cleanup]\n🛑 Box 1 (Failures Logged): ${current.failures.length}\n🏆 Box 2 (Achievements Stored): ${current.achievements.length}\n🧹 Cleaned & Conquered: ${current.cleanedFailures.length}\n✨ Daily Status: Habit Cleanup Protocol Executed.`;
    const updatedSummary = (dayRecord.summary || "") + cleanupNote;
    updateTrackerFirebase(selectedDate, { ...dayRecord, summary: updatedSummary, twoBox: updated, twoBoxAudited: true });
    updateProfileFirebase({
      xp: (profile.xp || 0) + 30
    });
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
              <button
                onClick={testAllSmartNotifications}
                className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase flex items-center gap-1.5 tap-effect transition-all"
                title="Test 11:30 PM & daily notification alerts"
              >
                <Bell size={13} />
                <span className="hidden sm:inline">Test</span> Alerts
              </button>

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
  // TOP BAR & APP WRAPPER
  // ==========================================
  return (
    <div className={`min-h-screen ${t.appBg} ${t.fontHeading} transition-colors duration-500 relative`}>
      {/* TOP BAR SWITCH */}
      <div className={`fixed top-0 left-0 w-full z-40 p-3 sm:p-4 bg-inherit/80 backdrop-blur-xl border-b ${t.borderAccent} opacity-95 flex justify-center items-center`}>
        <div className={`flex w-full max-w-md sm:max-w-lg rounded-3xl p-1.5 border-2 shadow-2xl shadow-black/20 ${t.cardInner} ${t.borderAccent}`}>
          <button onClick={() => setAppMode("habit")} className={`flex-1 py-2 sm:py-2.5 text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl transition-all duration-300 tap-effect ${appMode === 'habit' ? t.btnPrimary : t.textMuted + ' hover:' + t.textMain}`}>HABIT OS</button>
          <button onClick={() => setAppMode("brain")} className={`flex-1 py-2 sm:py-2.5 text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl transition-all duration-300 tap-effect ${appMode === 'brain' ? t.btnPrimary : t.textMuted + ' hover:' + t.textMain}`}>SECOND BRAIN</button>
          <button onClick={() => setAppMode("krishna")} className={`flex-1 py-2 sm:py-2.5 text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl transition-all duration-300 tap-effect ${appMode === 'krishna' ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-black shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-amber-300' : 'text-amber-400/70 hover:text-amber-300'}`}>MY KRISHNA 🪶</button>
        </div>
      </div>

      <div className="p-4 md:p-8 relative pt-24 sm:pt-28 pb-28 sm:pb-24">
        {toast && (
          <div className={`fixed top-28 sm:top-32 left-1/2 transform -translate-x-1/2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl shadow-black/40 z-[100] animate-bounce flex items-center gap-3 text-[10px] sm:text-sm uppercase tracking-widest ${t.badge} ${t.fontHeading} ${t.cardBorder}`}>
            <Check size={18} className={`sm:size-5 ${t.textAccent ? t.textAccent : 'text-current'}`} /> {toast}
          </div>
        )}
        {errorMsg && (
          <div className={`max-w-5xl mx-auto p-3 sm:p-4 mb-4 sm:mb-6 rounded-2xl flex items-start gap-3 shadow-2xl text-[10px] sm:text-sm uppercase tracking-widest bg-red-900/90 backdrop-blur-xl text-white ${t.fontHeading}`}>
            <AlertTriangle size={18} className="sm:size-5 mt-0.5 flex-shrink-0" />
            <span className="flex-1 leading-relaxed">{errorMsg}</span>
            <button onClick={() => setErrorMsg("")} className="hover:opacity-70 active:scale-90"><X size={16} className="sm:size-5" /></button>
          </div>
        )}

        <div className="max-w-5xl mx-auto">
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
                <div className="fixed bottom-28 sm:bottom-32 right-4 z-40 flex flex-col items-end">
                  {!isNightShiftOpen ? (
                    <button onClick={() => setIsNightShiftOpen(true)} className={`px-5 sm:px-7 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-widest rounded-2xl tap-effect hover-lift transition-all shadow-2xl ${t.btnWarning} ${t.fontHeading}`}><Moon size={18} className="sm:size-5 stroke-[3]" /> PLAN TOMORROW</button>
                  ) : (
                    <div className={`p-5 sm:p-7 w-[calc(100vw-32px)] max-w-[320px] shadow-2xl shadow-black/40 rounded-3xl border-2 backdrop-blur-xl ${t.card} ${t.borderAccent}`}>
                       <div className={`flex justify-between items-center mb-5 sm:mb-6 border-b pb-3 sm:pb-4 ${t.borderAccent} opacity-80`}>
                         <h3 className={`font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 ${t.textAccent}`}><Moon size={14} className="sm:size-4 stroke-[3]"/> NIGHT SHIFT INBOX</h3>
                         <button onClick={() => setIsNightShiftOpen(false)} className={`transition-colors ${t.textMuted} hover:text-red-500 tap-effect`}><X size={16} className="sm:size-5 stroke-[3]"/></button>
                       </div>
                       <p className={`text-[9px] sm:text-[10px] font-bold mb-4 sm:mb-5 uppercase tracking-wider ${t.textMuted}`}>Add tasks for tomorrow, or pin a queue target.</p>
                       <div className="flex gap-2 mb-5 sm:mb-6">
                         <input type="text" value={newCustomMission} onChange={(e) => setNewCustomMission(e.target.value)} onKeyPress={(e) => {
                              if(e.key === 'Enter' && newCustomMission.trim()) {
                                 updateBrainFirebase({ customMissions: [...brain.customMissions, { id: Date.now().toString(), text: newCustomMission.trim(), targetDate: addDays(todayStr, 1), completed: false }] });
                                 setNewCustomMission("");
                              }
                           }} placeholder="CUSTOM TASK..." className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black uppercase outline-none rounded-xl ${t.input}`} />
                         <button onClick={() => {
                              if(newCustomMission.trim()) {
                                 updateBrainFirebase({ customMissions: [...brain.customMissions, { id: Date.now().toString(), text: newCustomMission.trim(), targetDate: addDays(todayStr, 1), completed: false }] });
                                 setNewCustomMission("");
                              }
                           }} className={`px-4 sm:px-5 py-2.5 rounded-xl tap-effect transition-all ${t.btnPrimary}`}><Send size={14} className="sm:size-4 stroke-[3]" /></button>
                       </div>
                       {brain.customMissions.filter((m: any) => m.targetDate === addDays(todayStr, 1)).length > 0 && (
                          <div className="mb-5 sm:mb-6 space-y-2">
                            {brain.customMissions.filter((m: any) => m.targetDate === addDays(todayStr, 1)).map((m: any) => (
                               <div key={m.id} className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-2 rounded-xl flex justify-between items-center border ${t.cardInner} ${t.textMain} ${t.borderAccent}`}>
                                 <span className="truncate pr-2">• {m.text}</span>
                                 <button onClick={() => updateBrainFirebase({ customMissions: brain.customMissions.filter((task: any) => task.id !== m.id) })} className={`transition-colors tap-effect ${t.textMuted} hover:text-red-500 shrink-0`}><Trash2 size={12} className="sm:size-3 stroke-[3]" /></button>
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
                           <div className="mb-4 space-y-1.5 border-t pt-3 border-white/10">
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
                                       className="text-slate-400 hover:text-red-400 ml-1 shrink-0"
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
                           <div className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-3 border-t pt-3 sm:pt-4 ${t.textAccent} ${t.borderAccent} opacity-80`}>PIN SYLLABUS TARGET</div>
                           <div className="space-y-1.5 sm:space-y-2 max-h-32 overflow-y-auto hide-scrollbar pr-1">
                             {brain.stagingTopics.slice(0, 3).map((topic: any, idx: any) => (
                               <button key={topic.id} onClick={() => {
                                   const items = [...brain.stagingTopics]; const clickedItem = items.splice(idx, 1)[0]; items.unshift(clickedItem);
                                   updateBrainFirebase({ stagingTopics: items });
                                 }} className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between group border ${t.cardInner} hover:${t.borderAccent} tap-effect`}>
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

              {/* Second Brain Bottom Nav */}
              <div className={`fixed bottom-0 left-0 w-full border-t-2 z-50 overflow-hidden backdrop-blur-xl ${t.header} ${t.borderAccent}`}>
                <div className="max-w-2xl mx-auto grid grid-cols-6 px-1 py-1.5 sm:py-2.5 pb-[calc(env(safe-area-inset-bottom,0px)+6px)]">
                  {[{ id: 'dashboard', icon: CalendarIcon, label: 'MISSION' }, { id: 'study', icon: Activity, label: 'QUEUE' }, { id: 'history', icon: History, label: 'HISTORY' }, { id: 'wisdom', icon: Folder, label: 'WISDOM' }, { id: 'vault', icon: BrainCircuit, label: 'DUMP' }, { id: 'urge', icon: ShieldAlert, label: 'URGE' }].map((tab: any) => (
                    <button key={tab.id} onClick={() => setBrainTab(tab.id)} className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-1 px-0.5 rounded-xl transition-all duration-300 tap-effect ${brainTab === tab.id ? t.textAccent + ' bg-current/10 shadow-lg shadow-current/10' : t.textMuted + ' hover:' + t.textMain + ' hover:bg-current/5'}`}>
                      <tab.icon size={18} className={`sm:size-[22px] ${brainTab === tab.id ? 'stroke-[2.5]' : 'stroke-2'}`} />
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

                {/* Fast-Forward Button for Instant Testing */}
                <button
                  onClick={fastForwardFocusTimer}
                  className={`px-3.5 py-3.5 rounded-2xl border tap-effect transition-all text-xs font-black uppercase flex items-center gap-1 ${t.cardInner} ${t.borderAccent} text-amber-300`}
                  title="Fast-forward to last 3 seconds (QA testing)"
                >
                  <FastForward size={16} />
                  <span className="hidden sm:inline">3s</span>
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

                      <div className="sm:text-right flex-shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-cyan-300 block font-bold">
                          Requires Lv {r.minLevel}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block">
                          {r.minXp.toLocaleString()} XP
                        </span>
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="w-full max-w-2xl rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-amber-400/40 bg-[#0a0f1d] text-white relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 shadow-sm">
                  <Layers className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg uppercase tracking-wider text-white">
                    The Two-Box System
                  </h3>
                  <p className="text-xs font-medium text-slate-300">
                    Radical Honesty & Daily 9:00 PM – 12:00 AM Habit Cleanup
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTwoBoxModalOpen(false)}
                className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white transition-all tap-effect"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 mb-5">
              <button
                onClick={() => setTwoBoxActiveTab("boxes")}
                className={`py-2.5 text-xs sm:text-sm font-black uppercase rounded-xl transition-all tap-effect ${
                  twoBoxActiveTab === "boxes"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                📦 Two Boxes
              </button>
              <button
                onClick={() => setTwoBoxActiveTab("cleanup")}
                className={`py-2.5 text-xs sm:text-sm font-black uppercase rounded-xl transition-all tap-effect flex items-center justify-center gap-1.5 ${
                  twoBoxActiveTab === "cleanup"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span>🧹 9 PM – 12 AM Cleanup</span>
                {isCleanupHourActive() && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                )}
              </button>
              <button
                onClick={() => setTwoBoxActiveTab("trophy")}
                className={`py-2.5 text-xs sm:text-sm font-black uppercase rounded-xl transition-all tap-effect ${
                  twoBoxActiveTab === "trophy"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                🏆 Trophy Wall
              </button>
            </div>

            {(() => {
              const twoBoxData = getSelectedTwoBox();

              if (twoBoxActiveTab === "boxes") {
                return (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Top Info Tile */}
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                        Active Date: {selectedDate}
                      </span>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${isCleanupHourActive() ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 animate-pulse' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                        {isCleanupHourActive() ? "🟢 9 PM – 12 AM Cleanup is LIVE" : "⏳ Next Cleanup: 9:00 PM"}
                      </span>
                    </div>

                    {/* The 2 Boxes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Box 1: Failure Box */}
                      <div className="p-4 sm:p-5 rounded-2xl border-2 border-rose-500/50 bg-gradient-to-b from-[#220a0f] to-[#140508] shadow-lg flex flex-col justify-between space-y-3.5">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                              <span>🛑</span> Box 1: Failure Box
                            </span>
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/50">
                              {twoBoxData.failures.length} Logged
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 font-medium mb-3.5">
                            Document mistakes, distractions, missed habits & triggers.
                          </p>

                          {/* Add Failure Input */}
                          <div className="flex gap-2 mb-3.5">
                            <input
                              type="text"
                              value={box1Input}
                              onChange={(e) => setBox1Input(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addBox1Failure(box1Input);
                              }}
                              placeholder="e.g. Scrolled reels for 45m..."
                              className="flex-1 p-3 text-xs sm:text-sm rounded-xl bg-[#0d0406] border-2 border-rose-500/50 text-white placeholder:text-slate-400 font-semibold focus:border-rose-400 outline-none transition-all shadow-inner"
                            />
                            <button
                              onClick={() => addBox1Failure(box1Input)}
                              className="px-4 py-3 text-xs font-black uppercase rounded-xl bg-rose-500 hover:bg-rose-600 text-white shadow-md tap-effect"
                            >
                              + Add
                            </button>
                          </div>

                          {/* Failures List */}
                          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                            {twoBoxData.failures.length === 0 ? (
                              <div className="p-4 text-center border-2 border-dashed border-rose-500/30 bg-rose-950/20 rounded-xl">
                                <p className="text-xs text-slate-300 font-medium italic">
                                  No failures logged today. Practice radical honesty.
                                </p>
                              </div>
                            ) : (
                              twoBoxData.failures.map((f: string, i: number) => (
                                <div
                                  key={i}
                                  className="p-3 rounded-xl border border-rose-500/40 bg-[#2c0e14] flex items-center justify-between gap-2.5 shadow-sm"
                                >
                                  <span className="text-slate-100 font-semibold text-xs leading-relaxed break-words flex-1 flex items-start gap-2">
                                    <span className="text-rose-400 font-black text-sm">•</span> {f}
                                  </span>
                                  <button
                                    onClick={() => removeBox1Failure(i)}
                                    className="text-rose-300 hover:text-white p-1 tap-effect"
                                    title="Delete entry"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-rose-500/30 text-[11px] text-rose-200 font-bold flex items-center gap-1.5">
                          <span>💡 Clean these bad habits during 9 PM – 12 AM cleanup!</span>
                        </div>
                      </div>

                      {/* Box 2: Achievement Box */}
                      <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-[#082216] to-[#04140c] shadow-lg flex flex-col justify-between space-y-3.5">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                              <span>🏆</span> Box 2: Achievement Box
                            </span>
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/50">
                              {twoBoxData.achievements.length} Wins
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 font-medium mb-3.5">
                            Document victories, completed habits, personal bests & focus wins.
                          </p>

                          {/* Add Achievement Input */}
                          <div className="flex gap-2 mb-3.5">
                            <input
                              type="text"
                              value={box2Input}
                              onChange={(e) => setBox2Input(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addBox2Achievement(box2Input);
                              }}
                              placeholder="e.g. Completed 2 hours focus..."
                              className="flex-1 p-3 text-xs sm:text-sm rounded-xl bg-[#041009] border-2 border-emerald-500/50 text-white placeholder:text-slate-400 font-semibold focus:border-emerald-400 outline-none transition-all shadow-inner"
                            />
                            <button
                              onClick={() => addBox2Achievement(box2Input)}
                              className="px-4 py-3 text-xs font-black uppercase rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black shadow-md tap-effect"
                            >
                              + Win
                            </button>
                          </div>

                          {/* Achievements List */}
                          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                            {twoBoxData.achievements.length === 0 ? (
                              <div className="p-4 text-center border-2 border-dashed border-emerald-500/30 bg-emerald-950/20 rounded-xl">
                                <p className="text-xs text-slate-300 font-medium italic">
                                  No wins logged yet today. Register your first victory!
                                </p>
                              </div>
                            ) : (
                              twoBoxData.achievements.map((a: string, i: number) => (
                                <div
                                  key={i}
                                  className="p-3 rounded-xl border border-emerald-500/40 bg-[#0e3321] flex items-center justify-between gap-2.5 shadow-sm"
                                >
                                  <span className="text-slate-100 font-semibold text-xs leading-relaxed break-words flex-1 flex items-start gap-2">
                                    <span className="text-yellow-400 font-black text-sm">⭐</span> {a}
                                  </span>
                                  <button
                                    onClick={() => removeBox2Achievement(i)}
                                    className="text-emerald-300 hover:text-white p-1 tap-effect"
                                    title="Delete entry"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-emerald-500/30 text-[11px] text-emerald-200 font-bold flex items-center gap-1.5">
                          <span>✨ Stored for your monthly victory momentum!</span>
                        </div>
                      </div>
                    </div>

                    {/* Day Willpower & Satisfaction Rating */}
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between shadow-md">
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                        Day Discipline Rating:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setTwoBoxRating(starVal)}
                            className={`text-xl sm:text-2xl transition-transform hover:scale-125 tap-effect ${
                              twoBoxRating >= starVal ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-slate-600"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick CTA to Cleanup Tab */}
                    <button
                      onClick={() => setTwoBoxActiveTab("cleanup")}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg tap-effect flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} /> Open 9:00 PM – 12:00 AM Habit Cleanup Window
                    </button>
                  </div>
                );
              }

              if (twoBoxActiveTab === "cleanup") {
                return (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Live Indicator Banner */}
                    <div className={`p-4 sm:p-5 rounded-2xl border-2 ${isCleanupHourActive() ? 'border-emerald-400 bg-gradient-to-r from-[#06291a] to-[#083522] shadow-[0_0_30px_rgba(52,211,153,0.3)]' : 'border-amber-400/60 bg-gradient-to-r from-[#291e06] to-[#382a08]'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isCleanupHourActive() ? 'text-emerald-300' : 'text-amber-300'}`}>
                          <span>🧹</span> 9:00 PM – 12:00 AM Habit Cleanup Protocol
                        </span>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${isCleanupHourActive() ? 'bg-emerald-400 text-black shadow-md' : 'bg-amber-400/20 text-amber-200 border border-amber-400/50'}`}>
                          {isCleanupHourActive() ? "🟢 Window Live Now (9 PM - 12 AM)" : "⏳ Scheduled (9 PM - 12 AM)"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        Review your daily failures from Box 1. Cleanse bad patterns, transform mistakes into wisdom, and systematically eliminate bad habits over time.
                      </p>
                    </div>

                    {/* Bad Habits to Clean */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                          Active Bad Habits to Review ({twoBoxData.failures.length}):
                        </span>
                      </div>

                      {twoBoxData.failures.length === 0 ? (
                        <div className="p-7 text-center rounded-2xl border-2 border-dashed border-emerald-500/40 bg-emerald-950/20">
                          <span className="text-3xl block mb-2">🎉</span>
                          <p className="text-sm font-bold text-emerald-300">All bad habits cleaned or none logged today!</p>
                          <p className="text-xs mt-1 text-slate-300 font-medium">Box 1 is clean and Box 2 is primed with your victories.</p>
                        </div>
                      ) : (
                        twoBoxData.failures.map((failItem: string, idx: number) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl border-2 border-slate-700/80 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="text-rose-400 font-black text-base mt-0.5">•</span>
                              <span className="text-xs sm:text-sm font-bold text-white leading-relaxed">{failItem}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => cleanBadHabit(idx)}
                                className="px-3.5 py-2 rounded-xl bg-rose-500/30 hover:bg-rose-500 text-rose-100 hover:text-white border border-rose-400/80 text-xs font-black uppercase tap-effect flex items-center gap-1 shadow-sm"
                                title="Strike through & eliminate this habit"
                              >
                                <span>🧹 Clean (+10 XP)</span>
                              </button>
                              <button
                                onClick={() => convertBadHabitToWin(idx)}
                                className="px-3.5 py-2 rounded-xl bg-emerald-500/30 hover:bg-emerald-500 text-emerald-100 hover:text-black border border-emerald-400/80 text-xs font-black uppercase tap-effect flex items-center gap-1 shadow-sm"
                                title="Convert this slippage into a victory in Box 2"
                              >
                                <span>⚡ Convert to Win (+20 XP)</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Cleaned Habits History Today */}
                    {twoBoxData.cleanedFailures.length > 0 && (
                      <div className="p-4 rounded-2xl border-2 border-emerald-500/50 bg-[#082216] space-y-2.5 shadow-md">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 size={15} /> Conquered & Cleaned Today ({twoBoxData.cleanedFailures.length}):
                        </span>
                        <div className="space-y-1.5">
                          {twoBoxData.cleanedFailures.map((cItem: string, cIdx: number) => (
                            <div key={cIdx} className="text-xs text-emerald-100 font-semibold flex items-center gap-2 line-through opacity-85">
                              <span className="text-emerald-400 font-black">✓</span> {cItem}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Finalize Daily Cleanup Button */}
                    <button
                      onClick={completeDailyCleanup}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] tap-effect flex items-center justify-center gap-2"
                    >
                      <Sparkles size={18} /> Complete Daily Cleanup & Lock In (+30 XP)
                    </button>
                  </div>
                );
              }

              if (twoBoxActiveTab === "trophy") {
                const monthlyStats = getMonthlyTwoBoxStats();
                return (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Monthly Highlight Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl border-2 border-amber-400/40 bg-slate-900 text-center shadow-md">
                        <span className="text-2xl block mb-1">🏆</span>
                        <span className="text-2xl sm:text-3xl font-black block text-amber-300">
                          {monthlyStats.totalWins}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 mt-1 block">
                          Box 2 Wins
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl border-2 border-emerald-400/40 bg-slate-900 text-center shadow-md">
                        <span className="text-2xl block mb-1">🧹</span>
                        <span className="text-2xl sm:text-3xl font-black block text-emerald-400">
                          {monthlyStats.totalCleaned}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 mt-1 block">
                          Habits Cleaned
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl border-2 border-cyan-400/40 bg-slate-900 text-center shadow-md">
                        <span className="text-2xl block mb-1">⚡</span>
                        <span className="text-2xl sm:text-3xl font-black block text-cyan-300">
                          {monthlyStats.totalWins + monthlyStats.totalCleaned > 0
                            ? Math.round(
                                (monthlyStats.totalWins /
                                  (monthlyStats.totalWins + monthlyStats.totalFailures || 1)) *
                                  100
                              )
                            : 100}
                          %
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 mt-1 block">
                          Victory Ratio
                        </span>
                      </div>
                    </div>

                    {/* Monthly Motivation Stream */}
                    <div className="space-y-2.5">
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                        This Month's Victory Wall ({monthlyStats.allMonthlyAchievements.length} Achievements):
                      </span>
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {monthlyStats.allMonthlyAchievements.length === 0 ? (
                          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900">
                            <span className="text-3xl block mb-2 opacity-60">📜</span>
                            <p className="text-xs font-bold text-slate-200">No achievements recorded this month yet.</p>
                            <p className="text-[11px] mt-1 text-slate-400">Log your wins in Box 2 to build your monthly momentum!</p>
                          </div>
                        ) : (
                          monthlyStats.allMonthlyAchievements.map((item, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-3.5 rounded-xl border-2 border-emerald-500/40 bg-[#082216] flex items-center justify-between gap-2.5 shadow-sm"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-yellow-400 text-base">⭐</span>
                                <span className="text-xs sm:text-sm text-slate-100 font-bold">{item.text}</span>
                              </div>
                              <span className="text-xs font-mono text-emerald-300 font-black px-2 py-0.5 rounded bg-black/40 border border-emerald-500/30">
                                {item.date}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
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
      {/* 📅 CLASS & MEETING DISPATCHER MODAL */}
      {/* ========================================== */}
      {isScheduleModalOpen && renderScheduleModal()}
    </div>
  );
}
