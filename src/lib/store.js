"use client";
import { useState, useEffect } from "react";
import { mockTeacher, mockStudent, mockCourses, mockMessages, mockSchedule, mockMetrics, mockStudents } from "./mockData";

// store hook with localStorage persistence
export function useStore() {
  const [role, setRole] = useState("teacher");
  const [user, setUser] = useState(mockTeacher);
  const [crsList, setCrsList] = useState(mockCourses);
  const [msgs, setMsgs] = useState(mockMessages);
  const [sched, setSched] = useState(mockSchedule);
  const [students, setStudents] = useState(mockStudents);
  const [ready, setReady] = useState(false);

  // hydrate from storage
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("lms_role") || "teacher";
      setRole(savedRole);
      setUser(savedRole === "teacher" ? mockTeacher : mockStudent);
      
      const savedCrs = localStorage.getItem("lms_courses");
      if (savedCrs) setCrsList(JSON.parse(savedCrs));

      const savedMsgs = localStorage.getItem("lms_msgs");
      if (savedMsgs) setMsgs(JSON.parse(savedMsgs));

      const savedSched = localStorage.getItem("lms_sched");
      if (savedSched) setSched(JSON.parse(savedSched));
    } catch (e) {
      // fallback to mock defaults
    }
    setReady(true);
  }, []);

  // switch role
  const switchRole = (newRole) => {
    setRole(newRole);
    setUser(newRole === "teacher" ? mockTeacher : mockStudent);
    try {
      localStorage.setItem("lms_role", newRole);
    } catch (e) {}
  };

  // add new course video
  const addCourse = (newCrs) => {
    const updated = [newCrs, ...crsList];
    setCrsList(updated);
    try {
      localStorage.setItem("lms_courses", JSON.stringify(updated));
    } catch (e) {}
  };

  // append message to student thread
  const sendMsg = (stuId, text, sender = null) => {
    const activeSender = sender || (role === "teacher" ? mockTeacher : mockStudent);
    const newMsg = {
      id: "m_" + Date.now(),
      senderId: activeSender.id,
      senderName: activeSender.name,
      text,
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const thread = msgs[stuId] || [];
    const updated = { ...msgs, [stuId]: [...thread, newMsg] };
    setMsgs(updated);
    try {
      localStorage.setItem("lms_msgs", JSON.stringify(updated));
    } catch (e) {}
    return newMsg;
  };

  // add live schedule
  const addSchedule = (slot) => {
    const updated = [slot, ...sched];
    setSched(updated);
    try {
      localStorage.setItem("lms_sched", JSON.stringify(updated));
    } catch (e) {}
  };

  return {
    ready,
    role,
    user,
    switchRole,
    crsList,
    addCourse,
    msgs,
    sendMsg,
    sched,
    addSchedule,
    students,
    metrics: role === "teacher" ? mockMetrics.teacher : mockMetrics.student,
  };
}
