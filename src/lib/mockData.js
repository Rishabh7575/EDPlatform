// default mock seed for instant turnkey usability

export const mockTeacher = {
  id: "t1",
  name: "Dr. Shakshi Ganotra",
  email: "teacher@edplatform.com",
  role: "teacher",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  title: "Head of Chemistry & STEM",
  bio: "12+ yrs coaching top rankers in National Entrance & Olympiads.",
  studentsCount: 1482,
  rating: 4.9,
};

export const mockStudent = {
  id: "s1",
  name: "Rishabh",
  email: "student@edplatform.com",
  role: "student",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  grade: "Class 12th STEM",
  streak: 14,
  points: 2850,
};

export const mockMetrics = {
  teacher: {
    students: { val: 1482, diff: "+14.2%", up: true, label: "Total Students" },
    watchHrs: { val: "3,840h", diff: "+8.5%", up: true, label: "Total Watch Time" },
    completion: { val: "86.4%", diff: "+4.1%", up: true, label: "Completion Rate" },
    revenue: { val: "$18,450", diff: "+12.8%", up: true, label: "Monthly Revenue" },
    rating: { val: "4.92", diff: "98% satisfaction", up: true, label: "Student Rating" },
    liveAttendance: { val: "94%", diff: "+6.0%", up: true, label: "Avg Live Attendance" },
    weeklyActivity: [
      { day: "Mon", hrs: 42, live: 18 },
      { day: "Tue", hrs: 58, live: 25 },
      { day: "Wed", hrs: 65, live: 30 },
      { day: "Thu", hrs: 48, live: 20 },
      { day: "Fri", hrs: 72, live: 35 },
      { day: "Sat", hrs: 88, live: 42 },
      { day: "Sun", hrs: 60, live: 28 },
    ],
  },
  student: {
    hoursLearned: { val: "42.5h", diff: "+5.2h this wk", up: true, label: "Study Hours" },
    activeCourses: { val: "4", diff: "2 near completion", up: true, label: "Active Courses" },
    streak: { val: "14 Days", diff: "Personal best! 🔥", up: true, label: "Learning Streak" },
    quizAvg: { val: "92.8%", diff: "+3.4%", up: true, label: "Avg Quiz Score" },
    certProgress: { val: "3 / 4", diff: "75% completed", up: true, label: "Certifications" },
    weeklyActivity: [
      { day: "Mon", hrs: 3.5 },
      { day: "Tue", hrs: 4.2 },
      { day: "Wed", hrs: 2.8 },
      { day: "Thu", hrs: 5.0 },
      { day: "Fri", hrs: 4.0 },
      { day: "Sat", hrs: 6.5 },
      { day: "Sun", hrs: 4.8 },
    ],
  },
};

export const mockCourses = [
  {
    id: "c1",
    title: "Hydrocarbons & Organic Reaction Mechanisms",
    sub: "Chemistry",
    lang: "English / Hindi",
    instructor: "Dr. Shakshi Ganotra",
    rating: 4.9,
    enrolled: 420,
    progress: 78,
    thumb: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80",
    desc: "Complete mastering of aliphatic and aromatic hydrocarbons, electrophilic additions, resonance, and exam problem solving.",
    lessons: [
      { id: "l1", title: "1. Introduction to Alkanes & Hybridization", dur: "18:40", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "l2", title: "2. Isomerism & Conformational Analysis", dur: "24:15", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "l3", title: "3. Markovnikov vs Anti-Markovnikov Rule", dur: "32:10", done: false, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { id: "l4", title: "4. Aromaticity & Huckel's Rule", dur: "29:50", done: false, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    ],
  },
  {
    id: "c2",
    title: "Electromagnetism & Faraday's Laws of Induction",
    sub: "Physics",
    lang: "English",
    instructor: "Prof. Rajesh Verma",
    rating: 4.8,
    enrolled: 380,
    progress: 45,
    thumb: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80",
    desc: "From Maxwell equations to induced EMF and alternating currents. Intuitive visual demos with high-yield derivations.",
    lessons: [
      { id: "l5", title: "1. Magnetic Flux & Gauss Law for Magnetism", dur: "22:05", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "l6", title: "2. Lenz's Law & Direction of Induced Current", dur: "28:40", done: false, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "l7", title: "3. Self and Mutual Inductance in Circuits", dur: "35:10", done: false, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    ],
  },
  {
    id: "c3",
    title: "Advanced Integral Calculus & Differential Equations",
    sub: "Mathematics",
    lang: "English",
    instructor: "Dr. Ananya Ray",
    rating: 4.95,
    enrolled: 512,
    progress: 92,
    thumb: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    desc: "Definite integrals, reduction formulas, Fourier transforms, and real-world differential modeling for engineering.",
    lessons: [
      { id: "l8", title: "1. Riemann Sums to Definite Integration", dur: "19:20", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "l9", title: "2. Leibniz Rule of Differentiation Under Integral", dur: "31:45", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "l10", title: "3. First Order Non-linear Equations", dur: "27:10", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    ],
  },
  {
    id: "c4",
    title: "Data Structures, Algorithms & System Design",
    sub: "Computer Science",
    lang: "English",
    instructor: "Vikram Malhotra",
    rating: 4.9,
    enrolled: 640,
    progress: 30,
    thumb: "https://images.unsplash.com/photo-1516116211227-bbc1552a8b3e?w=600&auto=format&fit=crop&q=80",
    desc: "Graph traversals, Dynamic Programming patterns, distributed caching, and scalable web architecture principles.",
    lessons: [
      { id: "l11", title: "1. Graph Representations & BFS/DFS Traversal", dur: "25:30", done: true, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "l12", title: "2. Dijkstra's Algorithm & Priority Queues", dur: "33:15", done: false, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "l13", title: "3. Dynamic Programming: 0/1 Knapsack & Variants", dur: "41:00", done: false, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    ],
  },
];

export const mockStudents = [
  { id: "s1", name: "Rishabh", role: "Student", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", status: "online", email: "rishabh@student.com", grade: "Class 12th" },
  { id: "s2", name: "Suryansh Verma", role: "Student", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80", status: "online", email: "suryansh@student.com", grade: "Class 12th" },
  { id: "s3", name: "Palak Patel", role: "Student", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", status: "offline", email: "palak@student.com", grade: "Class 11th" },
  { id: "s4", name: "Devesh Sharma", role: "Student", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", status: "online", email: "devesh@student.com", grade: "Class 12th" },
  { id: "s5", name: "Jatin Rao", role: "Student", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", status: "offline", email: "jatin@student.com", grade: "Class 12th" },
];

export const mockMessages = {
  s1: [
    { id: "m1", senderId: "s1", senderName: "Rishabh", text: "Ma'am, will we cover stereochemistry for cyclic hydrocarbons in tomorrow's live class?", ts: "10:14 AM" },
    { id: "m2", senderId: "t1", senderName: "Dr. Shakshi Ganotra", text: "Yes Rishabh! We'll do boat & chair conformations along with previous year numericals.", ts: "10:16 AM" },
    { id: "m3", senderId: "s1", senderName: "Rishabh", text: "Awesome, thank you! I've prepared the notes from lecture 2 already.", ts: "10:20 AM" },
  ],
  s2: [
    { id: "m4", senderId: "s2", senderName: "Suryansh Verma", text: "Hello ma'am, can you re-check question 4 in the organic practice quiz?", ts: "09:30 AM" },
    { id: "m5", senderId: "t1", senderName: "Dr. Shakshi Ganotra", text: "I reviewed it Suryansh, the peroxide effect in HBr was key there. Check the revised hint!", ts: "09:45 AM" },
  ],
  s3: [
    { id: "m6", senderId: "s3", senderName: "Palak Patel", text: "Good evening ma'am, will the class recording be uploaded by tonight?", ts: "Yesterday" },
    { id: "m7", senderId: "t1", senderName: "Dr. Shakshi Ganotra", text: "Yes Palak, it is processing and will be live in 15 mins!", ts: "Yesterday" },
  ],
};

export const mockSchedule = [
  { id: "sc1", topic: "Live Doubt Clearing: Hydrocarbon Reactions", sub: "Chemistry", time: "Today, 5:00 PM - 6:30 PM", attendees: 48, status: "live-soon" },
  { id: "sc2", topic: "Faraday Induction & Lenz Law Problem Workshop", sub: "Physics", time: "Tomorrow, 4:00 PM - 5:30 PM", attendees: 35, status: "scheduled" },
  { id: "sc3", topic: "Definite Integrals & Area Under Curve Shortcuts", sub: "Mathematics", time: "Friday, 6:00 PM - 7:30 PM", attendees: 62, status: "scheduled" },
];
