import React, { useEffect, useState } from "react";
import api from "@/API/Config";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const profileEndpoint = "profiles"; // GET /profiles

function Profile({ role = "student" }) {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(profileEndpoint);
        const data = res.data.find((p) => p.role === role);
        setProfile(data);
        setActiveTab(Object.keys(data.tabContent)[0]); // Set first tab by default
      } catch (err) {
        console.error("Error fetching profile:", err);
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

  const { user, stats, about, tabContent } = profile;
  const tabs = Object.keys(tabContent);

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      {/* Profile Header */}
      <div className="card flex items-center justify-between mb-8 p-10">
        {/* Left: Avatar + Info */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-[var(--border)]">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              {user.name}
            </h2>
            <p className="text-[var(--text-secondary)]">{user.roleTitle}</p>
            <p className="text-[var(--secondary)] capitalize font-bold">
              {role}
            </p>

            {/* Social Links */}
            {profile.socialLinks && (
              <div className="flex space-x-3 mt-2">
                {Object.entries(profile.socialLinks).map(([platform, link]) => {
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
        <div className="flex space-x-3">
          {profile.actions?.map((action) => (
            <button key={action} className="btn btn-primary btn-hover" onClick={()=>navigate(`${action.url}`)}>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8 ">
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

      {/* Tabs Navigation */}
      <div className="card mb-8">
        <div className="flex space-x-6 border-b border-[var(--border)] pb-3 overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`pb-2 font-bold transition-colors border-b-2  ${
                activeTab === item
                  ? "text-[var(--secondary)] border-[var(--secondary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--secondary)] border-transparent hover:border-[var(--secondary)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        <div className="mt-6">
          <TabContent data={tabContent[activeTab]} />
        </div>
      </div>
    </div>
  );
}

export default Profile;

/* Smart Tab Content Renderer */
function TabContent({ data }) {
  if (!data)
    return (
      <p className="text-[var(--text-secondary)] italic py-2">
        No data available.
      </p>
    );

  // If content is plain text
  if (typeof data === "string") {
    return (
      <p className="text-[var(--text-primary)] bg-[var(--card-bg)] p-4  border-[var(--border-color)] shadow-sm">
        {data}
      </p>
    );
  }

  // If content is an array → list items
  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--card-bg)] p-4 -[var(--border-color)] shadow-md hover:shadow-lg transition"
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
        ))}
      </div>
    );
  }

  // If content is an object → key/value block
  return (
    <div className="bg-[var(--card-bg)] p-4 border-[var(--border-color)] shadow-md">
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
