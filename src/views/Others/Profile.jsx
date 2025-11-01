// React
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { useNavigate } from "react-router";

// components
import api from "@/API/Config";

function Profile({ role = "student" }) {
  const navigate = useNavigate();
  let ProfileEndpoint;
  if (role === "student") {
    ProfileEndpoint = "Profile/student"; // Replace with dynamic ID if needed
  } else if (role === "instructor") {
    ProfileEndpoint = "Profile/instructor"; // Replace with dynamic ID if needed
  } else if (role === "admin") {
    ProfileEndpoint = "Profile/admin"; // Replace with dynamic ID if needed
  }
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const res = await api.get(`${ProfileEndpoint}/${userId}`);
        const data = res.data;

        // Optional: provide default values if some fields are null
        if (!data.user.avatar) data.user.avatar = "/default-avatar.png";
        if (!data.tabContent) data.tabContent = { about: "No content" };

        setProfile(data);
        setActiveTab(Object.keys(data.tabContent)[0] || ""); // First tab default
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [role]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-[var(--text-secondary)]">
        Loading profile...
      </div>
    );
  }

  const { user, stats, tabContent, socialLinks, actions } = profile;
  const tabs = Object.keys(tabContent);

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      {/* Profile Header */}
      <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 p-6 md:p-10">
        {/* Left: Avatar + Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-24 h-24 mx-auto sm:mx-0 rounded-full overflow-hidden border border-[var(--border)]">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              {user.name}
            </h2>
            <p className="text-[var(--text-secondary)]">{user.roleTitle}</p>
            <p className="text-[var(--secondary)] capitalize font-bold">
              {role}
            </p>

            {/* Social Links */}
            {socialLinks && (
              <div className="flex space-x-3 mt-2 text-sm justify-center sm:justify-start">
                {Object.entries(socialLinks).map(([platform, link]) => {
                  if (!link) return null;

                  const icons = {
                    facebook: <FaFacebookF />,
                    twitter: <FaTwitter />,
                    linkedin: <FaLinkedinIn />,
                    youtube: <FaYoutube />,
                    instagram: <FaInstagram />,
                    github: <FaGithub />,
                  };

                  const colors = {
                    facebook: "bg-blue-600 hover:bg-blue-700",
                    twitter: "bg-sky-500 hover:bg-sky-600",
                    linkedin: "bg-blue-700 hover:bg-blue-800",
                    youtube: "bg-red-600 hover:bg-red-700",
                    instagram: "bg-pink-500 hover:bg-pink-600",
                    github: "bg-gray-800 hover:bg-gray-900",
                  };

                  return (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition ${
                        colors[platform.toLowerCase()] ||
                        "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {icons[platform.toLowerCase()] || platform}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex space-x-3 text-center justify-center md:justify-start">
          {actions?.map((action) => (
            <button
              key={action.id}
              className="btn btn-primary btn-hover"
              onClick={() => navigate(action.url)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card card-hover text-center">
            <div className="text-3xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="text-sm text-[var(--text-secondary)] font-bold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      {profile.about && (
        <div className="card mb-8 p-4 border-[var(--border-color)] shadow-sm">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            About
          </h3>
          <p className="text-[var(--text-secondary)]">{profile.about}</p>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="card mb-8">
        <div className="flex border-b border-[var(--border)] pb-3 overflow-x-auto scrollbar-hide snap-x">
          <div className="flex flex-col sm:flex-row border-b border-[var(--border)]">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-4 py-2 text-left font-bold transition-colors border-l-4 sm:border-l-0 sm:border-b-2 ${
                  activeTab === item
                    ? "text-[var(--secondary)] border-[var(--secondary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--secondary)] border-transparent hover:border-[var(--secondary)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Content */}
        <div className="mt-4 sm:mt-6 lg:mt-8 w-full">
          <TabContent data={tabContent[activeTab]} />
        </div>
      </div>
    </div>
  );
}

export default Profile;

// Smart Tab Content Renderer
function TabContent({ data }) {
  if (!data)
    return (
      <p className="text-[var(--text-secondary)] italic py-2">
        No data available.
      </p>
    );

  if (typeof data === "string") {
    return (
      <p className="text-[var(--text-primary)] bg-[var(--card-bg)] p-4 border-[var(--border-color)] shadow-sm">
        {data}
      </p>
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <p className="text-[var(--text-secondary)] italic py-2">
          No data available.
        </p>
      );
    }

    return data.map((item, index) => (
      <div
        key={index}
        className="bg-[var(--card-bg)] p-4 border-[var(--border-color)] shadow-md hover:shadow-lg transition rounded-md"
      >
        {Object.entries(item).map(([key, value]) => (
          <p key={key} className="text-[var(--text-primary)] mb-1">
            <span className="font-semibold capitalize text-[var(--primary)]">
              {key}:{" "}
            </span>
            {value}
          </p>
        ))}
      </div>
    ));
  }

  return (
    <div className="bg-[var(--card-bg)] p-4 border-[var(--border-color)] shadow-md rounded-md">
      {Object.entries(data).map(([key, value]) => (
        <p key={key} className="text-[var(--text-primary)] mb-1">
          <span className="font-semibold capitalize text-[var(--primary)]">
            {key}:{" "}
          </span>
          {value}
        </p>
      ))}
    </div>
  );
}
