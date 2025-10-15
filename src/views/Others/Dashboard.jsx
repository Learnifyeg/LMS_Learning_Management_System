// React
import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaCheckCircle,
  FaClipboardList,
  FaCertificate,
  FaCalendarAlt,
  FaProjectDiagram,
  FaBell,
  FaChevronRight,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";

// Components
import api from "@/API/Config";

// Endpoints and constants
const dashboardEndPoint = "dashboards";

function Dashboard({ role }) {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get(`${dashboardEndPoint}`);
        const data = res.data.find((d) => d.role === role);
        setDashboard(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchDashboard();
  }, [role]);

  if (!dashboard) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        Loading dashboard...
      </div>
    );
  }

  const handleViewAll = (section) => {
    console.log("Navigate to:", section);
  };

  const { fullName, stats, liveSessions, finalProjects, notifications } =
    dashboard;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-text-primary capitalize">
            {role} Dashboard
          </h1>
          <p className="text-text-secondary mt-2">
            Welcome back, {fullName}! Here’s your overview.
          </p>
        </div>

        {/* Simple Role Switcher (for testing) */}
        {/* <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {role === "student" && (
          <>
            <StatCard
              title="Total Courses"
              value={stats.totalCourses}
              color="blue"
              icon={<FaBook className="text-2xl text-blue-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Completed Courses"
              value={stats.completedCourses}
              color="green"
              icon={<FaCheckCircle className="text-2xl text-green-500" />}
              progress={(stats.completedCourses / stats.totalCourses) * 100}
            />
            <StatCard
              title="Quizzes Passed"
              value={`${stats.quizzesPassed.passed}/${stats.quizzesPassed.total}`}
              color="yellow"
              icon={<FaClipboardList className="text-2xl text-yellow-500" />}
              extra={`${stats.quizzesPassed.successRate}% success rate`}
            />
            <StatCard
              title="Certificates"
              value={stats.certificatesEarned}
              color="purple"
              icon={<FaCertificate className="text-2xl text-purple-500" />}
              onClick={() => handleViewAll("certificates")}
            />
          </>
        )}

        {role === "instructor" && (
          <>
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              color="blue"
              icon={<FaUsers className="text-2xl text-blue-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Courses Created"
              value={stats.coursesCreated}
              color="green"
              icon={<FaBook className="text-2xl text-green-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Projects Supervised"
              value={stats.projectsSupervised}
              color="yellow"
              icon={<FaProjectDiagram className="text-2xl text-yellow-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Certificates Issued"
              value={stats.certificatesIssued}
              color="purple"
              icon={<FaCertificate className="text-2xl text-purple-500" />}
              onClick={() => handleViewAll("courses")}
            />
          </>
        )}

        {role === "admin" && (
          <>
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              color="blue"
              icon={<FaUsers className="text-2xl text-blue-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Total Instructors"
              value={stats.totalInstructors}
              color="green"
              icon={<FaChalkboardTeacher className="text-2xl text-green-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Total Courses"
              value={stats.totalCourses}
              color="yellow"
              icon={<FaBook className="text-2xl text-yellow-500" />}
              onClick={() => handleViewAll("courses")}
            />
            <StatCard
              title="Certificates Issued"
              value={stats.certificatesIssued}
              color="purple"
              icon={<FaCertificate className="text-2xl text-purple-500" />}
              onClick={() => handleViewAll("courses")}
            />
          </>
        )}
      </div>

      {/* Shared Sections */}
      {role === "student" && (
        <>
          <Section title="Live Sessions" icon={<FaCalendarAlt />} color="red">
            {liveSessions?.map((session) => (
              <SessionCard key={session.sessionId} session={session} />
            ))}
          </Section>

          <Section
            title="Final Projects"
            icon={<FaProjectDiagram />}
            color="indigo"
          >
            {finalProjects?.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </Section>
        </>
      )}

      <Section title="Notifications" icon={<FaBell />} color="pink">
        {notifications?.map((note) => (
          <div
            key={note.notificationId}
            className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 mb-3"
          >
            <p className="font-bold text-text-secondary">{note.message}</p>
            <p className="text-sm text-text-secondary">{note.time}</p>
          </div>
        ))}
      </Section>
    </div>
  );
}

/* ---------- Sub Components ---------- */

const StatCard = ({ title, value, color, icon, progress, extra, onClick }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
          {value}
        </p>
      </div>
      <div className={`p-3 bg-${color}-100 dark:bg-${color}-900 rounded-xl`}>
        {icon}
      </div>
    </div>

    {progress && (
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`bg-${color}-500 h-2 rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {progress.toFixed(0)}% completion rate
        </p>
      </div>
    )}

    {extra && (
      <div className={`mt-4 text-sm text-${color}-600 dark:text-${color}-400`}>
        {extra}
      </div>
    )}

    {onClick && (
      <div
        onClick={onClick}
        className={`mt-4 text-sm text-${color}-600 dark:text-${color}-400 cursor-pointer`}
      >
        <span>
          View All <FaChevronRight className="inline ml-1" />
        </span>
      </div>
    )}
  </div>
);

const Section = ({ title, icon, color, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-text-primary flex items-center">
        <span className={`text-${color}-500 mr-3`}>{icon}</span> {title}
      </h2>
      <span className="text-sm text-blue-500 cursor-pointer">View all</span>
    </div>
    <div>{children}</div>
  </div>
);

const SessionCard = ({ session }) => (
  <div className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-3">
    <div className={`w-3 h-3 rounded-full bg-${session.color}-500 mr-3`}></div>
    <div>
      <p className="font-bold text-text-secondary">{session.title}</p>
      <p className="text-sm text-text-secondary">
        {new Date(session.date).toLocaleString()}
      </p>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 mb-3">
    <div>
      <p className="font-bold text-text-secondary">{project.title}</p>
      <p className="text-sm text-text-secondary">Status: {project.status}</p>
    </div>
    <div className="text-right">
      <p className="font-bold">{project.grade}</p>
      <p className="text-xs text-text-secondary">Grade</p>
    </div>
  </div>
);

export default Dashboard;
