"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  Circle, 
  Download, 
  FileText, 
  MessageSquare,
  Sparkles
} from "lucide-react";

// interactive video classroom with chapters
export default function VideoPlayer({ course }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [tab, setTab] = useState("syllabus");
  const [qInput, setQInput] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, user: "Rishabh", time: "2 hrs ago", text: "Why do anti-Markovnikov additions require peroxides?" },
    { id: 2, user: "Dr. Shakshi", time: "1 hr ago", text: "Peroxides generate free radicals which alter the stability path of intermediate addition!", isTeacher: true },
  ]);

  const vidRef = useRef(null);
  const curLesson = course?.lessons?.[activeIdx] || {
    title: "Lesson 1: Introduction",
    dur: "20:00",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  };

  // toggle play
  const togglePlay = () => {
    if (!vidRef.current) return;
    if (playing) {
      vidRef.current.pause();
      setPlaying(false);
    } else {
      vidRef.current.play();
      setPlaying(true);
    }
  };

  // toggle mute
  const toggleMute = () => {
    if (!vidRef.current) return;
    vidRef.current.muted = !muted;
    setMuted(!muted);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    if (!qInput.trim()) return;
    setQuestions([...questions, { id: Date.now(), user: "You", time: "Just now", text: qInput }]);
    setQInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* main player column */}
      <div className="lg:col-span-2 space-y-4">
        {/* video frame */}
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-elevated border border-slate-800">
          <video
            ref={vidRef}
            src={curLesson.url}
            className="w-full h-full object-contain"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            controls={false}
          />

          {/* custom control bar overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-all shadow-md"
              >
                {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
              </button>

              <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                {muted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="text-xs font-semibold text-slate-300">
                {curLesson.dur || "18:40"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full text-white font-medium backdrop-blur-md">
                HD 1080p
              </span>
              <button
                onClick={() => vidRef.current?.requestFullscreen?.()}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* lecture details */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                {course.sub} • Lesson {activeIdx + 1} of {course.lessons?.length || 4}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {curLesson.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Taught by <span className="font-semibold text-slate-800">{course.instructor}</span>
              </p>
            </div>

            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 text-xs font-bold border border-slate-200 transition-all">
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Notes</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 mt-4 leading-relaxed">
            {course.desc}
          </p>
        </div>
      </div>

      {/* right sidebar: curriculum & doubts */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col h-[600px]">
        {/* tabs */}
        <div className="flex border-b border-slate-100 pb-3 gap-2">
          <button
            onClick={() => setTab("syllabus")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "syllabus"
                ? "bg-brand-500 text-white shadow-sm shadow-brand-500/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Curriculum ({course.lessons?.length || 4})
          </button>
          <button
            onClick={() => setTab("doubts")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "doubts"
                ? "bg-brand-500 text-white shadow-sm shadow-brand-500/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Doubt Q&A ({questions.length})
          </button>
        </div>

        {/* tab contents */}
        {tab === "syllabus" ? (
          <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-1">
            {course.lessons?.map((ls, idx) => {
              const isCur = idx === activeIdx;
              return (
                <div
                  key={ls.id || idx}
                  onClick={() => {
                    setActiveIdx(idx);
                    setPlaying(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCur
                      ? "bg-orange-50/70 border-brand-300 ring-1 ring-brand-400"
                      : "bg-white hover:bg-slate-50 border-slate-200/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ls.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    <div>
                      <p className={`text-xs font-bold ${isCur ? "text-brand-900" : "text-slate-800"}`}>
                        {ls.title}
                      </p>
                      <span className="text-[11px] text-slate-400 font-medium">{ls.dur}</span>
                    </div>
                  </div>
                  {isCur && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-brand-500 text-white rounded-md">
                      Playing
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between overflow-hidden mt-4">
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`p-3 rounded-2xl text-xs ${
                    q.isTeacher ? "bg-orange-50 border border-orange-200" : "bg-slate-50 border border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                    <span className={q.isTeacher ? "text-brand-600" : ""}>{q.user}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{q.time}</span>
                  </div>
                  <p className="text-slate-700 leading-snug">{q.text}</p>
                </div>
              ))}
            </div>

            {/* question input */}
            <form onSubmit={addQuestion} className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                placeholder="Ask teacher a question..."
                className="flex-1 text-xs bg-slate-100 px-3 py-2 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 border border-transparent focus:border-brand-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Ask
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
