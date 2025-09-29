import {
  Users,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Award,
  Video,
  GraduationCap,
  Shield,
  CreditCard,
} from "lucide-react";

import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
export const features = [
  {
    icon: Users,
    title: "Multi-Role Support",
    description:
      "Comprehensive platform supporting students, instructors, and administrators with role-specific dashboards and tools.",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description:
      "Create, organize, and deliver courses with lessons, quizzes, live sessions, and progress tracking capabilities.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description:
      "Track student performance at course and lesson levels with detailed analytics and reporting features.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Handle financial transactions securely with integrated payment processing and instructor payout management.",
  },
  {
    icon: Award,
    title: "Certification System",
    description:
      "Issue digital certificates upon course completion with verification capabilities and achievement tracking.",
  },
  {
    icon: Video,
    title: "Live Sessions",
    description:
      "Host interactive online sessions with recording capabilities and real-time student engagement tools.",
  },
];

export const stats = [
  { end: 10000, symbol: "+", subText: "Active Students" },
  { end: 500, symbol: "+", subText: "Expert Instructors" },
  { end: 1200, symbol: "+", subText: "Courses Available" },
  { end: 95, symbol: "%", subText: "Completion Rate" },
];

export const courses = [
  {
    level: "Intermediate",
    rating: 4.8,
    title: "SQL Server Programming",
    description:
      "Master SQL Server programming with advanced queries, stored procedures, and database optimization techniques.",
    instructor: "Dr. Sarah Johnson",
    duration: "8 weeks",
    price: "$299",
    students: 1250,
    cta: "Enroll Now",
  },
  {
    level: "Beginner to Advanced",
    rating: 4.9,
    title: "Programming in C#",
    description:
      "Comprehensive C# programming course covering fundamentals to advanced concepts including OOP and design patterns.",
    instructor: "Mark Thompson",
    duration: "10 weeks",
    price: "$399",
    students: 2100,
    cta: "Enroll Now",
  },
  {
    level: "Intermediate",
    rating: 4.7,
    title: ".NET Core Web API",
    description:
      "Build robust web APIs using .NET Core with authentication, middleware, and best practices.",
    instructor: "Emily Chen",
    duration: "6 weeks",
    price: "$349",
    students: 890,
    cta: "Enroll Now",
  },
  {
    level: "Intermediate",
    rating: 4.9,
    title: "React.js Development",
    description:
      "Master React.js with hooks, state management, routing, and modern development practices.",
    instructor: "Alex Rodriguez",
    duration: "12 weeks",
    price: "$429",
    students: 1890,
    cta: "Enroll Now",
  },
  {
    level: "Beginner",
    rating: 4.6,
    title: "HTML5 & CSS Essentials",
    description:
      "Foundation course covering modern HTML5 and CSS techniques for responsive web development.",
    instructor: "Lisa Wang",
    duration: "4 weeks",
    price: "$199",
    students: 3200,
    cta: "Enroll Now",
  },
  {
    level: "Intermediate",
    rating: 4.8,
    title: "Docker Containerization",
    description:
      "Learn containerization with Docker, including deployment strategies and orchestration basics.",
    instructor: "Michael Brown",
    duration: "5 weeks",
    price: "$279",
    students: 750,
    cta: "Enroll Now",
  },
];

export const stakeholders = [
  {
    title: "Students",
    description:
      "Register, enroll in courses, attend lessons, complete quizzes and projects, earn certificates",
    icon: GraduationCap,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-300",
  },
  {
    title: "Instructors",
    description:
      "Create and manage courses, upload lessons, host live sessions, evaluate student work",
    icon: Users,
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
  },
  {
    title: "Administrators",
    description:
      "Oversee platform activities, manage payments, monitor logs, generate reports",
    icon: Shield,
    bgColor: "bg-violet-100",
    textColor: "text-violet-600",
    borderColor: "border-violet-300",
  },
];

export const modules = [
  {
    title: "Core Module",
    description: "User management, authentication, and system logging",
    items: ["Users & Role Management", "Activity Logs", "Notifications"],
    color: "text-blue-700",
    bgColor: "bg-blue-200",
    Icon: Users,
  },
  {
    title: "Learning Module",
    description: "Educational content and progress tracking",
    items: [
      "Courses & Lessons",
      "Quizzes & Assessments",
      "Certificates & Projects",
    ],
    color: "text-green-700",
    bgColor: "bg-green-200",
    Icon: BookOpen,
  },
  {
    title: "Finance Module",
    description: "Payment processing and instructor payouts",
    items: ["Student Payments", "Instructor Payouts", "Platform Fees"],
    color: "text-purple-700",
    bgColor: "bg-purple-200",
    Icon: CreditCard,
  },
];

export const SocialButtons = [
  {
    Icon: FaFacebook,
    title: "Facebook",
    color: "bg-[#3b5998]",
  },
  {
    Icon: FaGoogle,
    title: "Google",
    color: "bg-[#db4437]",
  },
  {
    Icon: FaTwitter,
    title: "X",
    color: "bg-[#1da1f2]",
  },
];
