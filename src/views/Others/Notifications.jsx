// React
import React, { useEffect, useState } from "react";

// Components
import api from "@/API/Config"; // your axios instance

// Endpoints and constants
const NotificationsEndpoint = "Notifications"; // GET /profiles

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // Get role from localStorage
        const role = localStorage.getItem("role") || "student"; // default to student
        const response = await api.get(NotificationsEndpoint); // GET /notifications
        const data = response.data?.[0]?.student || [];
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            Notifications
          </h1>
          <p className="text-text-secondary mt-1">
            {loading
              ? "Loading notifications..."
              : `You have ${notifications.length} notifications`}
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Notification Settings */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Notification Settings
            </h2>
            <p className="text-text-secondary">
              Manage your notification preferences
            </p>
          </div>

          {/* Notifications List */}
          <div className="bg-card rounded-lg shadow-sm overflow-hidden divide-y divide-gray-100">
            {loading ? (
              <p className="p-6 text-center text-text-secondary">Loading...</p>
            ) : notifications.length === 0 ? (
              <p className="p-6 text-center text-text-secondary">
                No notifications found.
              </p>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-6 transition-colors ${
                    index === notifications.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {notification.type === "system" ? (
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ) : notification.type === "purchase" ? (
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-text-primary mb-1">
                          <span className="font-medium">
                            {notification.action}
                          </span>{" "}
                          <span className="text-blue-600">
                            {notification.target}
                          </span>
                        </p>
                        <p className="text-gray-500 text-sm">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-semibold text-sm">
                          {notification.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-text-primary mb-1">
                          <span className="font-medium">
                            {notification.user}
                          </span>{" "}
                          <span>{notification.action}</span>{" "}
                          <span className="text-blue-600">
                            {notification.target}
                          </span>
                        </p>
                        <p className="text-gray-500 text-sm">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-text-secondary text-sm">
          <p>© 2025 Learnify. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Notifications;
