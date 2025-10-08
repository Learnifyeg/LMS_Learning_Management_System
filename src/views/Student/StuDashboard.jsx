// React
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBook,
  FaCheckCircle,
  FaClipboardList,
  FaCertificate,
  FaCalendarAlt,
  FaProjectDiagram,
  FaBell,
  FaChevronRight,
} from "react-icons/fa";

const URL = "http://localhost:3001";
const studentDashboardEndPoint = "studentDashboard";

function StuDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${URL}/${studentDashboardEndPoint}`);
        // Assuming first student for now
        setDashboard(res.data[0]);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        Loading dashboard...
      </div>
    );
  }

  // Destructure dashboard and nested stats
  const {
    fullName,
    stats: {
      totalCourses,
      completedCourses,
      quizzesPassed,
      certificatesEarned,
    },
    liveSessions,
    finalProjects,
    notifications,
  } = dashboard;

  const handleViewAll = (section) => {
    console.log("Navigate or open page for:", section);
  };
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary">
          Student Dashboard
        </h1>
        <p className="text-text-secondary mt-2">
          Welcome back, {fullName}! Here's your learning progress
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* Stats Cards Row */}
        <div className="lg:col-span-6 grid  grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {/* Total Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">
                  Total Courses{" "}
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {totalCourses}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <FaBook className="text-2xl text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500 cursor-pointer ">
              <span onClick={() => handleViewAll("courses")}> View All</span>
            </div>
          </div>

          {/* Completed Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">
                  Completed
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {completedCourses}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <FaCheckCircle className="text-2xl text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(completedCourses / totalCourses) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {((completedCourses / totalCourses) * 100).toFixed(0)}%
                completion rate
              </p>
            </div>
          </div>

          {/* Quizzes Passed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">
                  Quizzes Passed
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {quizzesPassed.passed}/{quizzesPassed.total}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                <FaClipboardList className="text-2xl text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
              <span>{quizzesPassed.successRate}% success rate</span>
            </div>
          </div>

          {/* Certificates Earned */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">
                  Certificates
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {certificatesEarned}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <FaCertificate className="text-2xl text-purple-500" />
              </div>
            </div>
            <div className="mt-4 text-sm text-purple-600 dark:text-purple-400 cursor-pointer">
              <span onClick={() => handleViewAll("certificates")}>
                View certificates <FaChevronRight className="inline ml-1" />
              </span>
            </div>
          </div>
        </div>

        {/* Middle Content Row */}
        <div className="lg:col-span-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Live Sessions */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center">
                <FaCalendarAlt className="text-red-500 mr-3" />
                Live Sessions
              </h2>
              <span
                className="text-sm text-blue-500 cursor-pointer"
                onClick={() => handleViewAll("liveSessions")}
              >
                View all
              </span>
            </div>
            <div className="space-y-4">
              {liveSessions.map((session) => (
                <div
                  key={session.sessionId}
                  className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-${session.color}-100 dark:bg-${session.color}-900 mr-3`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-bold text-text-secondary">
                      {session.title}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {new Date(session.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Projects */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center">
                <FaProjectDiagram className="text-indigo-500 mr-3" />
                Final Projects
              </h2>
              <span
                className="text-sm text-blue-500 cursor-pointer"
                onClick={() => handleViewAll("finalProjects")}
              >
                View all
              </span>
            </div>
            <div className="space-y-4">
              {finalProjects.map((project) => (
                <div
                  key={project.projectId}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-bold text-text-secondary">
                      {project.title}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Status: {project.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{project.grade}</p>
                    <p className="text-xs text-text-secondary">Grade</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary flex items-center">
              <FaBell className="text-pink-500 mr-3" />
              Notifications
            </h2>
            <span
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => handleViewAll("notifications")}
            >
              Mark all as read
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notifications.map((note) => (
              <div
                key={note.notificationId}
                className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              >
                <p className="text-text-secondary font-bold">{note.message}</p>
                <p className="text-sm text-text-secondary mt-1">{note.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StuDashboard;
