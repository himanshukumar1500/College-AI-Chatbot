// ============================================================================
// DEMO / SAMPLE DATA - NOT REAL INFORMATION ABOUT ANY COLLEGE.
// Every name, timing, fee, phone number and policy below is invented so the
// chatbot has something to answer with. Replace it with your own college's
// information, either:
//   1. by editing this file and running `npm run seed` (resets the database), or
//   2. through the Admin panel in the web app (no code changes needed).
// Fields: category (must match the list in models/CollegeInfo.js),
//         question, answer, keywords (words students are likely to use).
// ============================================================================

module.exports = [
  // ---------------- Admissions ----------------
  {
    category: "Admissions",
    question: "How can I apply for admission?",
    answer:
      "[Sample] Apply online through the admission portal on the college website. Steps: 1) Register with your email and mobile number, 2) Fill in the application form, 3) Upload the required documents, 4) Pay the application fee, 5) Submit and download the acknowledgement. Admission is based on entrance exam rank followed by counselling.",
    keywords: ["apply", "admission", "application", "register", "enroll", "join", "portal", "counselling"],
  },
  {
    category: "Admissions",
    question: "What documents are required for admission?",
    answer:
      "[Sample] Bring originals and two photocopies of: 10th and 12th mark sheets, entrance exam scorecard, transfer certificate, character certificate, category/caste certificate (if applicable), Aadhaar card, and 6 passport-size photographs.",
    keywords: ["documents", "certificate", "marksheet", "required", "papers", "aadhaar", "photograph", "transfer"],
  },
  {
    category: "Admissions",
    question: "What are the eligibility criteria for B.Tech admission?",
    answer:
      "[Sample] Candidates must have passed 12th with Physics, Mathematics and one of Chemistry/Computer Science/Biology with at least 50% marks (45% for reserved categories) and hold a valid score in the entrance exam accepted by the college.",
    keywords: ["eligibility", "criteria", "btech", "b.tech", "marks", "percentage", "qualification", "12th"],
  },
  {
    category: "Admissions",
    question: "What are the important admission dates?",
    answer:
      "[Sample] Applications open in May, the last date is usually the end of June, counselling happens in July, and classes begin in the first week of August. Exact dates are announced on the admission notice board and website each year.",
    keywords: ["dates", "deadline", "last date", "schedule", "counselling", "july", "begin", "start"],
  },

  // ---------------- Academics ----------------
  {
    category: "Academics",
    question: "Which departments and programmes does the college offer?",
    answer:
      "[Sample] Departments: Computer Science & Engineering (CSE), Electronics & Communication (ECE), Mechanical Engineering (ME), Civil Engineering (CE), and Management Studies. Programmes: B.Tech in the four engineering branches, MBA, and M.Tech in CSE.",
    keywords: ["departments", "programmes", "programs", "courses", "branches", "btech", "mba", "mtech", "offered"],
  },
  {
    category: "Academics",
    question: "What is the academic calendar structure?",
    answer:
      "[Sample] The year has two semesters. Odd semester: August to December. Even semester: January to May. Each semester has about 90 teaching days, two internal tests, and an end-semester examination.",
    keywords: ["calendar", "semester", "session", "academic year", "term", "schedule", "holidays"],
  },
  {
    category: "Academics",
    question: "What is the attendance requirement?",
    answer:
      "[Sample] Students must maintain at least 75% attendance in each course to be eligible for the end-semester exam. Students between 65% and 75% may apply for condonation with a valid reason (medical certificate etc.) and a fee.",
    keywords: ["attendance", "75%", "percent", "shortage", "condonation", "detained", "eligible"],
  },
  {
    category: "Academics",
    question: "How do I get my class timetable?",
    answer:
      "[Sample] Class timetables are published on the department notice boards and the student portal at the start of each semester. Classes run Monday to Friday from 9:00 AM to 4:30 PM with a lunch break from 12:30 PM to 1:15 PM. Contact your class coordinator for changes.",
    keywords: ["timetable", "schedule", "class timing", "periods", "lecture", "routine", "coordinator"],
  },
  {
    category: "Academics",
    question: "How is grading done?",
    answer:
      "[Sample] The college follows a 10-point CGPA system. Each course is graded O (10), A+ (9), A (8), B+ (7), B (6), C (5), P (4) and F (fail). SGPA is calculated every semester and CGPA across all semesters. 6.0 CGPA is needed for the degree.",
    keywords: ["grading", "grade", "cgpa", "sgpa", "marks", "points", "result", "percentage"],
  },

  // ---------------- CSE Department ----------------
  {
    category: "CSE Department",
    question: "Tell me about the CSE department.",
    answer:
      "[Sample] The Computer Science & Engineering department offers a 4-year B.Tech (intake 120) and a 2-year M.Tech. Specialisations include Artificial Intelligence, Data Science and Cyber Security. The department has 6 labs, a project incubation room and an active coding club. Located on the 2nd and 3rd floors of Block A.",
    keywords: ["cse", "computer science", "department", "btech", "labs", "specialisation", "ai", "data science", "block a"],
  },
  {
    category: "CSE Department",
    question: "Who are the CSE faculty members?",
    answer:
      "[Sample] Head of Department: Dr. A. Sharma (Algorithms, AI). Faculty: Prof. R. Verma (Databases), Dr. S. Khan (Machine Learning), Prof. P. Nair (Networks & Security), Ms. T. Gupta (Web Technologies). Office hours are 2:00-4:00 PM on weekdays. These names are fictional examples.",
    keywords: ["faculty", "teachers", "professor", "hod", "head of department", "staff", "cse", "sharma", "office hours"],
  },
  {
    category: "CSE Department",
    question: "Which core courses are taught in the CSE B.Tech?",
    answer:
      "[Sample] Year 1: Programming in C, Mathematics I-II, Physics, Engineering Graphics. Year 2: Data Structures, Digital Logic, Discrete Mathematics, DBMS, Object-Oriented Programming. Year 3: Operating Systems, Computer Networks, Algorithms, Software Engineering, Machine Learning. Year 4: electives, major project and internship.",
    keywords: ["courses", "subjects", "syllabus", "curriculum", "cse", "year", "data structures", "dbms", "os", "electives"],
  },
  {
    category: "CSE Department",
    question: "What placements and internships are available for CSE students?",
    answer:
      "[Sample] The training and placement cell runs aptitude and coding preparation from 5th semester. Recruiting companies visit in the 7th semester, and a 6-week summer internship is encouraged after the 6th semester. Final placement statistics are published by the placement cell each year.",
    keywords: ["placement", "internship", "jobs", "companies", "recruit", "training", "package", "career"],
  },

  // ---------------- Examination ----------------
  {
    category: "Examination",
    question: "What are the examination rules?",
    answer:
      "[Sample] Carry your college ID card and admit card to every exam. Reach the hall 15 minutes early. Mobile phones, smart watches and notes are not allowed inside. Entry is not permitted after 30 minutes from the start. Use of unfair means leads to cancellation of the paper and disciplinary action.",
    keywords: ["exam", "rules", "regulations", "id card", "admit card", "hall", "mobile", "unfair means", "cheating"],
  },
  {
    category: "Examination",
    question: "How is the internal assessment calculated?",
    answer:
      "[Sample] Each theory course has 40 marks of internal assessment (two internal tests of 15 marks each, 5 marks assignments, 5 marks attendance) and 60 marks for the end-semester exam. Labs are 50 internal and 50 practical exam marks.",
    keywords: ["internal", "assessment", "marks", "tests", "assignment", "sessional", "theory", "practical", "weightage"],
  },
  {
    category: "Examination",
    question: "How do I apply for exam revaluation or re-exam?",
    answer:
      "[Sample] Results are published on the student portal. Revaluation can be requested within 7 days of the result by submitting the form to the examination office with the fee. Students who failed a course can appear in the supplementary exam held about one month after the regular results.",
    keywords: ["revaluation", "recheck", "re-exam", "supplementary", "backlog", "fail", "result", "reappear"],
  },
  {
    category: "Examination",
    question: "When are the exams held?",
    answer:
      "[Sample] Internal tests are held around week 6 and week 11 of each semester. End-semester exams run for about two weeks in December (odd semester) and May (even semester). The exact date sheet is published on the notice board about 3 weeks before the exams.",
    keywords: ["exam date", "date sheet", "when", "schedule", "december", "may", "end semester", "internal test"],
  },

  // ---------------- Library ----------------
  {
    category: "Library",
    question: "What are the library timings?",
    answer:
      "[Sample] The central library is open Monday to Saturday, 8:30 AM to 8:00 PM. On Sundays and public holidays it is closed. During exam weeks the reading hall stays open until 10:00 PM.",
    keywords: ["library", "timing", "timings", "hours", "open", "close", "reading hall", "sunday", "weekend"],
  },
  {
    category: "Library",
    question: "How many books can I borrow and for how long?",
    answer:
      "[Sample] Undergraduate students can borrow 3 books for 14 days, postgraduate students 5 books for 21 days. Books can be renewed once if no one has reserved them. The late fee is Rs. 2 per book per day.",
    keywords: ["borrow", "issue", "books", "return", "renew", "fine", "late fee", "membership", "limit"],
  },
  {
    category: "Library",
    question: "Does the library have digital resources?",
    answer:
      "[Sample] Yes. Students can use the e-library with access to journals, e-books and past question papers from computers in the library or remotely using their student portal login. A photocopy and printing counter is available on the ground floor.",
    keywords: ["digital", "e-library", "ebooks", "journals", "online", "question papers", "internet", "print", "photocopy"],
  },

  // ---------------- Hostel ----------------
  {
    category: "Hostel",
    question: "What are the hostel timings?",
    answer:
      "[Sample] Hostel gates close at 9:00 PM on weekdays and 10:00 PM on weekends (Friday and Saturday nights). Morning gate opening is 5:30 AM. Late entry requires prior written permission from the warden. Visitors are allowed in the visitors' room from 4:00 PM to 6:00 PM on Sundays.",
    keywords: ["hostel", "timing", "timings", "gate", "curfew", "weekend", "weekday", "warden", "visitors", "late entry"],
  },
  {
    category: "Hostel",
    question: "Where is the hostel and what rooms are available?",
    answer:
      "[Sample] The boys' hostel is behind the sports ground (about 5 minutes' walk from Block A) and the girls' hostel is next to the main gate. Rooms are double or triple sharing with a bed, study table, cupboard and fan. Wi-Fi, a common room, laundry and a 24x7 water supply are provided.",
    keywords: ["hostel", "where", "location", "room", "rooms", "sharing", "wifi", "facilities", "boys", "girls", "accommodation"],
  },
  {
    category: "Hostel",
    question: "What are the hostel fees and mess details?",
    answer:
      "[Sample] Hostel fee is Rs. 60,000 per year including room rent and mess charges, plus a refundable caution deposit of Rs. 10,000. The mess serves breakfast (7:30-9:00 AM), lunch (12:30-2:00 PM), snacks (5:00 PM) and dinner (7:30-9:00 PM), with vegetarian and non-vegetarian options.",
    keywords: ["hostel fee", "mess", "food", "meals", "breakfast", "lunch", "dinner", "deposit", "rent", "vegetarian"],
  },
  {
    category: "Hostel",
    question: "How do I apply for a hostel room?",
    answer:
      "[Sample] Fill in the hostel application form on the student portal after your admission is confirmed, attach a copy of your fee receipt, and submit it to the hostel office. Rooms are allotted on a first-come basis, with priority for students living far from the college.",
    keywords: ["hostel", "apply", "allotment", "allot", "application", "room", "form", "office", "priority"],
  },

  // ---------------- Fees ----------------
  {
    category: "Fees",
    question: "What is the B.Tech tuition fee?",
    answer:
      "[Sample] The B.Tech tuition fee is Rs. 95,000 per year, plus Rs. 8,000 per year for development and lab fees. A one-time admission fee of Rs. 10,000 is charged in the first year. All amounts here are fictional examples.",
    keywords: ["fee", "fees", "tuition", "btech", "cost", "charges", "annual", "amount", "development"],
  },
  {
    category: "Fees",
    question: "How can I pay the fees and what are the deadlines?",
    answer:
      "[Sample] Fees can be paid online on the student portal (UPI, net banking, card) or by demand draft at the accounts office (10:00 AM to 3:00 PM, Monday to Friday). Fees are due within the first 15 days of each semester; a late fee of Rs. 100 per day applies afterwards.",
    keywords: ["pay", "payment", "fees", "deadline", "due date", "online", "upi", "accounts", "late fee", "installment"],
  },
  {
    category: "Fees",
    question: "Are scholarships available?",
    answer:
      "[Sample] Yes. Merit scholarships (up to 50% tuition waiver) are available for top rankers in the entrance exam and for students with 9.0+ CGPA. Government scholarships for eligible categories are processed through the scholarship cell. Apply with income and category certificates within 30 days of admission.",
    keywords: ["scholarship", "waiver", "financial aid", "merit", "government", "income", "concession", "discount", "loan"],
  },

  // ---------------- Campus ----------------
  {
    category: "Campus",
    question: "What facilities are available on campus?",
    answer:
      "[Sample] The campus has a central library, computer centre with high-speed internet, sports ground, indoor games room, gym, auditorium (500 seats), cafeteria, medical room, bank ATM and a stationery/photocopy shop. The campus is Wi-Fi enabled in academic blocks.",
    keywords: ["facilities", "campus", "gym", "sports", "auditorium", "cafeteria", "canteen", "wifi", "medical", "atm", "ground"],
  },
  {
    category: "Campus",
    question: "Is there a transport facility?",
    answer:
      "[Sample] College buses run on 8 routes covering the main city areas. The transport fee is Rs. 18,000 per year, depending on distance. Route maps and timings are available at the transport office near the main gate.",
    keywords: ["transport", "bus", "buses", "route", "routes", "pick up", "drop", "commute", "van"],
  },
  {
    category: "Campus",
    question: "What clubs and events are there?",
    answer:
      "[Sample] Student clubs include Coding Club, Robotics Club, Cultural Society, Literary Club and NSS. The annual tech fest is held in February and the cultural fest in March. Club recruitments happen in the first month of the odd semester.",
    keywords: ["clubs", "events", "fest", "cultural", "tech fest", "nss", "activities", "societies", "extracurricular"],
  },

  // ---------------- Student Services ----------------
  {
    category: "Student Services",
    question: "How do I get my ID card, bonafide or other certificates?",
    answer:
      "[Sample] Submit an application at the student services desk (Block B, ground floor) with a fee receipt. ID cards take 3 working days, bonafide certificates 2 working days, and transcripts or migration certificates 7 working days. Counter timings: 10:00 AM to 3:30 PM, Monday to Friday.",
    keywords: ["id card", "bonafide", "certificate", "transcript", "migration", "duplicate", "student services", "apply", "desk"],
  },
  {
    category: "Student Services",
    question: "Is there a counselling or health service for students?",
    answer:
      "[Sample] A medical room staffed by a nurse is open from 9:00 AM to 5:00 PM on working days, with a doctor visiting on Tuesday and Thursday. A student counsellor is available by appointment at the Student Welfare Office for academic stress and personal concerns. All sessions are confidential.",
    keywords: ["counselling", "counselor", "health", "medical", "doctor", "stress", "mental", "welfare", "nurse", "clinic"],
  },
  {
    category: "Student Services",
    question: "How can I raise a complaint or grievance?",
    answer:
      "[Sample] Submit a written complaint to the Grievance Redressal Cell (Block B, room 12) or email the cell. Complaints are acknowledged within 2 working days and resolved within 15 days. An anti-ragging helpline and committee operate 24x7.",
    keywords: ["complaint", "grievance", "problem", "ragging", "harassment", "issue", "redressal", "committee"],
  },

  // ---------------- Contact ----------------
  {
    category: "Contact",
    question: "What are the main contact details of the college?",
    answer:
      "[Sample] Main office phone: +91-00000-00001 (10:00 AM to 4:00 PM, Monday to Friday). Email: info@sample-college.example. Address: Sample Institute of Technology, 123 Demo Road, Sample City - 000000. These are fictional placeholders.",
    keywords: ["contact", "phone", "email", "address", "office", "number", "reach", "location", "call"],
  },
  {
    category: "Contact",
    question: "Who should I contact for admissions, exams, hostel or fees queries?",
    answer:
      "[Sample] Admission office: admissions@sample-college.example, ext. 101. Examination cell: exams@sample-college.example, ext. 202. Hostel warden: warden@sample-college.example, ext. 303. Accounts office: accounts@sample-college.example, ext. 404. These are fictional placeholders.",
    keywords: ["contact", "who", "admission office", "exam cell", "warden", "accounts", "email", "extension", "department"],
  },
];
