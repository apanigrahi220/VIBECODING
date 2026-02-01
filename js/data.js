/* Mock Data Store - Ultimate Master Edition */

window.StudentData = {
    profile: {
        name: "Aditya Kumar",
        id: "2024CS001",
        course: "B.Tech Computer Science",
        currentSemester: 5,
        avatar: "AK",
        cgpa: 8.65,
        careerReadiness: 78 // Score out of 100
    },
    attendance: [
        { subject: "Data Structures", attended: 28, total: 30, code: "CS101" },
        { subject: "Algorithms", attended: 20, total: 30, code: "CS102" },
        { subject: "Database Systems", attended: 12, total: 25, code: "CS103" }, // Warning
        { subject: "Web Development", attended: 8, total: 20, code: "CS104" }, // Critical
        { subject: "Mathematics IV", attended: 25, total: 25, code: "MA104" },
        { subject: "OS Interiors", attended: 35, total: 35, code: "CS105" }
    ],
    // Expanded for academic journey visualization (Sem 1-8)
    results: [
        { semester: 1, sgpa: 8.2 },
        { semester: 2, sgpa: 8.5 },
        { semester: 3, sgpa: 8.8 },
        { semester: 4, sgpa: 8.4 }, // Dip
        { semester: 5, sgpa: 9.1 }  // Improvement
    ],
    detailedResults: [
        {
            semester: 5,
            subjects: [
                { name: "Advanced Algorithms", marks: 92, grade: "O" },
                { name: "Compiler Design", marks: 85, grade: "A+" },
                { name: "Computer Networks", marks: 78, grade: "A" }
            ]
        }
    ],
    skills: [
        { name: "Problem Solving", score: 85 },
        { name: "Full Stack Dev", score: 70 },
        { name: "Communication", score: 65 },
        { name: "Data Analysis", score: 50 }
    ],
    goals: [
        { title: "Achieve 9.0+ SGPA", target: 9.0, current: 8.6, type: "Academic" },
        { title: "Complete 100 LeetCode Problems", target: 100, current: 45, type: "Skill" }
    ],
    events: [
        { title: "Mid-Semester Exams", date: "Feb 15", type: "Critical", desc: "Block A • Mandatory" },
        { title: "Tech Fest '26", date: "Feb 28", type: "Event", desc: "Main Auditorium" },
        { title: "Project Submission", date: "Mar 10", type: "Deadline", desc: "Online Portal" }
    ],
    // NEW: Academic Schedule Data (Merged with Holidays & Sports)
    academicSchedule: [
        { date: "2026-02-10", event: "Course Registration end", type: "Deadline" },
        { date: "2026-02-14", event: "Inter-College Cricket Match", type: "Sports" },
        { date: "2026-02-15", event: "Mid-Sem Exams Start", type: "Exam" },
        { date: "2026-02-22", event: "Mid-Sem Exams End", type: "Exam" },
        { date: "2026-03-05", event: "Guest Lecture: AI Futures", type: "Lecture" },
        { date: "2026-03-08", event: "Holi Festival", type: "Holiday" },
        { date: "2026-03-20", event: "Hackathon Prelims", type: "Activity" },
        { date: "2026-04-10", event: "Final Project Definition", type: "Deadline" },
        { date: "2026-04-14", event: "Ambedkar Jayanti", type: "Holiday" },
        { date: "2026-05-01", event: "End-Sem Exams Start", type: "Exam" }
    ],
    // NEW: Co-Curricular Data
    coCurricular: {
        clubs: [
            { name: "Coding Club", role: "Secretary", since: "2024" },
            { name: "Robotics Society", role: "Member", since: "2025" },
            { name: "Photography Club", role: "Member", since: "2024" }
        ],
        sports: [
            { name: "Badminton Team", role: "Captain", achievements: "Regional Silver Medal" },
            { name: "College Marathon", role: "Participant", achievements: "Top 50 Finish" }
        ],
        achievements: [
            { title: "Hackathon Winner", date: "Nov 2025", desc: "1st Place in Smart City Hackathon" },
            { title: "Best Volunteer", date: "Aug 2025", desc: "Freshers Orientation Program" }
        ]
    }
};
