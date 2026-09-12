"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ScreenShare, 
  PhoneOff, 
  Users, 
  MessageSquare, 
  Hand, 
  Settings, 
  Sparkles,
  Maximize2
} from "lucide-react";

// WebRTC interactive classroom
export default function LiveRoom({ user, role = "teacher" }) {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [hand, setHand] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [streamErr, setStreamErr] = useState(null);
  const [msgs, setMsgs] = useState([
    { user: "Dr. Shakshi", text: "Welcome everyone! Turn on your webcams for attendance." },
    { user: "Rishabh", text: "Good evening ma'am, audio and screen are clear!" },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const localVidRef = useRef(null);
  const streamRef = useRef(null);

  // setup camera stream
  useEffect(() => {
    let active = true;

    async function initMedia() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setStreamErr("Webcam API not supported in this environment.");
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (active) {
          streamRef.current = stream;
          if (localVidRef.current) {
            localVidRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn("Camera or mic permission denied or unavailable:", err.message);
        setStreamErr("Camera/Mic inactive (using virtual avatar feed).");
      }
    }

    if (callActive) {
      initMedia();
    }

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [callActive]);

  // toggle mic track
  const toggleMic = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((t) => (t.enabled = !mic));
    }
    setMic(!mic);
  };

  // toggle cam track
  const toggleCam = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((t) => (t.enabled = !cam));
    }
    setCam(!cam);
  };

  // toggle screen sharing
  const toggleShare = async () => {
    if (!sharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVidRef.current) {
          localVidRef.current.srcObject = screenStream;
        }
        setSharing(true);
        screenStream.getVideoTracks()[0].onended = () => {
          setSharing(false);
          if (localVidRef.current && streamRef.current) {
            localVidRef.current.srcObject = streamRef.current;
          }
        };
      } catch (e) {
        console.warn("Screen share cancelled", e);
      }
    } else {
      setSharing(false);
      if (localVidRef.current && streamRef.current) {
        localVidRef.current.srcObject = streamRef.current;
      }
    }
  };

  const sendCallMsg = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMsgs([...msgs, { user: user?.name || "You", text: inputMsg }]);
    setInputMsg("");
  };

  if (!callActive) {
    return (
      <div className="bg-slate-900 rounded-3xl p-12 text-center text-white border border-slate-800 my-8">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <PhoneOff className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold">Classroom Session Ended</h3>
        <p className="text-slate-400 text-sm mt-2">Class notes and recordings will be available in the syllabus shortly.</p>
        <button
          onClick={() => setCallActive(true)}
          className="mt-6 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-sm transition-all"
        >
          Re-enter Classroom
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[740px]">
      {/* top bar */}
      <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <div>
            <h3 className="text-sm font-bold">Live Room: Advanced Chemistry & Reaction Kinetics</h3>
            <p className="text-[11px] text-slate-400">Class 12th Board Special • 18 Participants</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full text-slate-300">
            01:14:22
          </span>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
              chatOpen ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Live Chat</span>
          </button>
        </div>
      </div>

      {/* main grid area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {/* local user feed */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center group">
            {cam && !streamErr ? (
              <video
                ref={localVidRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-800 shadow-xl"
                />
                <span className="text-xs text-slate-400 mt-2">
                  {streamErr ? streamErr : "Camera Off"}
                </span>
              </div>
            )}

            {/* user label tag */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-white text-xs font-bold">
              <span>{user?.name} (You - {role})</span>
              {!mic && <MicOff className="w-3.5 h-3.5 text-rose-400" />}
            </div>
            {hand && (
              <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded-xl flex items-center gap-1 text-xs font-bold shadow-lg animate-bounce">
                <Hand className="w-3.5 h-3.5" /> Hand Raised
              </div>
            )}
          </div>

          {/* peer student 1 */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
              alt="Rishabh"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-white text-xs font-bold">
              <span>Rishabh (Student)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          {/* peer student 2 */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500"
              alt="Suryansh"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-white text-xs font-bold">
              <span>Suryansh Verma (Student)</span>
              <MicOff className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* peer student 3 */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500"
              alt="Palak"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-white text-xs font-bold">
              <span>Palak Patel (Student)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>
        </div>

        {/* live chat drawer */}
        {chatOpen && (
          <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col justify-between p-4">
            <div className="border-b border-slate-800 pb-2 mb-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Class Discussion</h4>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {msgs.map((m, i) => (
                <div key={i} className="bg-slate-800/80 p-2.5 rounded-xl text-slate-200">
                  <span className="font-bold text-brand-400 block mb-0.5">{m.user}</span>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={sendCallMsg} className="mt-3 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type in live room..."
                className="flex-1 bg-slate-800 text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* bottom control bar */}
      <div className="px-6 py-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-center gap-3">
        {/* mic toggle */}
        <button
          onClick={toggleMic}
          className={`p-3.5 rounded-2xl font-bold transition-all ${
            mic ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
          }`}
          title={mic ? "Mute Microphone" : "Unmute Microphone"}
        >
          {mic ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* cam toggle */}
        <button
          onClick={toggleCam}
          className={`p-3.5 rounded-2xl font-bold transition-all ${
            cam ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
          }`}
          title={cam ? "Turn Off Camera" : "Turn On Camera"}
        >
          {cam ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* screen share */}
        <button
          onClick={toggleShare}
          className={`p-3.5 rounded-2xl font-bold transition-all ${
            sharing ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
          title="Share Screen"
        >
          <ScreenShare className="w-5 h-5" />
        </button>

        {/* raise hand */}
        <button
          onClick={() => setHand(!hand)}
          className={`p-3.5 rounded-2xl font-bold transition-all ${
            hand ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30" : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
          title="Raise Hand"
        >
          <Hand className="w-5 h-5" />
        </button>

        {/* end call */}
        <button
          onClick={() => setCallActive(false)}
          className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-rose-600/30 ml-4"
        >
          <PhoneOff className="w-5 h-5" />
          <span>Leave Session</span>
        </button>
      </div>
    </div>
  );
}
