import React, { useState, useEffect } from "react";
import axios from "axios";

/*
  SettingPage.jsx
  - Student/Instructor account settings page resembling the provided design
  - Tailwind + your index.css theme variables are used for styling
  - Tabs: Account, Notification, Privacy, Billing and Payouts, API Clients, Close Account
  - Left sidebar navigation (static) + main form area
  - Example save handler uses axios.post to /api/user/settings (change to your endpoint)
  - Falls back to local state if network request fails so you can preview UI

  How to use:
  1. Put this file inside src/views/ or src/pages of your React project.
  2. Make sure your index.css (the CSS you provided) is imported globally (e.g. in index.js).
  3. Install axios if you want to use real network calls: npm i axios
  4. Add route: <Route path="/settings" element={<SettingPage/>} />
*/

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // form state with safe defaults
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    about: "",
    email: "",
    phone: "",
    newsletter: true,
  });

  useEffect(() => {
    // Try to fetch existing profile settings - fallback to defaults
    let mounted = true;
    axios
      .get("/api/user/settings")
      .then((res) => {
        if (!mounted) return;
        const data = res.data || res.data?.settings || {};
        setForm((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {
        // ignore - keep defaults so preview works
      });
    return () => (mounted = false);
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      // replace with your real endpoint
      await axios.post("/api/user/settings", form);
      setMessage({ type: "success", text: "Settings saved successfully." });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save settings (mocked)." });
      // for preview, we still succeed locally
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="custom-container py-8">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4v4M6 7v4m12-4v4M3 13h18" />
          </svg>
          <h2 className="text-xl font-semibold">Setting</h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar nav */}
          <aside className="col-span-12 md:col-span-3">
            <div className="card">
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`text-left px-3 py-2 rounded ${activeTab === "account" ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]" : "text-[var(--color-text-secondary)]"}`}>
                  Account
                </button>
                <button
                  onClick={() => setActiveTab("notification")}
                  className={`text-left px-3 py-2 rounded ${activeTab === "notification" ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]" : "text-[var(--color-text-secondary)]"}`}>
                  Notification
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`text-left px-3 py-2 rounded ${activeTab === "privacy" ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]" : "text-[var(--color-text-secondary)]"}`}>
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`text-left px-3 py-2 rounded ${activeTab === "billing" ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]" : "text-[var(--color-text-secondary)]"}`}>
                  Billing and Payouts
                </button>
                <button
                  onClick={() => setActiveTab("api")}
                  className={`text-left px-3 py-2 rounded ${activeTab === "api" ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]" : "text-[var(--color-text-secondary)]"}`}>
                  API Clients
                </button>
                <button
                  onClick={() => setActiveTab("close")}
                  className={`text-left px-3 py-2 rounded ${activeTab === "close" ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]" : "text-[var(--color-text-secondary)]"}`}>
                  Close Account
                </button>
              </nav>
            </div>

            <div className="mt-4 card hidden md:block">
              <div className="font-semibold mb-2">Your learnify Account</div>
              <p className="text-sm text-[var(--color-text-secondary)]">This is your public presence on learnify. You need an account to upload your paid courses, comment on courses, purchased by students, or earning.</p>
            </div>
          </aside>

          {/* Main content */}
          <main className="col-span-12 md:col-span-9">
            {/* Tabs top (mirrors screenshot) */}
            <div className="card">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                  <button className={`px-4 py-2 rounded ${activeTab === "account" ? "bg-[var(--primary)] text-white" : "bg-[var(--surface)] text-[var(--color-text-secondary)]"}`} onClick={() => setActiveTab("account")}>Account</button>
                  <button className={`px-4 py-2 rounded ${activeTab === "notification" ? "bg-[var(--primary)] text-white" : "bg-[var(--surface)] text-[var(--color-text-secondary)]"}`} onClick={() => setActiveTab("notification")}>Notification</button>
                  <button className={`px-4 py-2 rounded ${activeTab === "privacy" ? "bg-[var(--primary)] text-white" : "bg-[var(--surface)] text-[var(--color-text-secondary)]"}`} onClick={() => setActiveTab("privacy")}>Privacy</button>
                </div>

                <div className="ml-auto text-sm text-[var(--color-text-secondary)]">Manage your account settings and set e-mail preferences</div>
              </div>

              {/* Account tab content */}
              {activeTab === "account" && (
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Profile</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Add information about yourself</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="w-full border rounded px-3 py-2" />
                    <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="w-full border rounded px-3 py-2" />
                  </div>

                  <div>
                    <input name="headline" value={form.headline} onChange={handleChange} placeholder="I am a Web Designer" className="w-full border rounded px-3 py-2" />
                    <div className="text-xs text-[var(--color-text-secondary)] mt-2">Add a professional headline like, "Engineer at learnify" or "Architect."</div>
                  </div>

                  <div>
                    <textarea name="about" value={form.about} onChange={handleChange} rows={6} placeholder="Write a little description about you..." className="w-full border rounded px-3 py-2" />
                    <div className="text-xs text-[var(--color-text-secondary)] mt-2">Links and coupon codes are not permitted in this section.</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email address" className="w-full border rounded px-3 py-2" />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className="w-full border rounded px-3 py-2" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} />
                    <label className="text-sm text-[var(--color-text-secondary)]">Subscribe to newsletter</label>
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="submit" disabled={saving} className="btn btn-primary">{saving ? 'Saving…' : 'Save changes'}</button>
                    <button type="button" onClick={() => setForm({ firstName: "", lastName: "", headline: "", about: "", email: "", phone: "", newsletter: true })} className="btn btn-hover border">Reset</button>
                    {message && (
                      <div className={`ml-4 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</div>
                    )}
                  </div>
                </form>
              )}

              {/* Notification tab */}
              {activeTab === "notification" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notification settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked={form.newsletter} onChange={(e) => setForm((p) => ({ ...p, newsletter: e.target.checked }))} />
                      <div>
                        <div className="font-medium">Email newsletter</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Get the latest course recommendations</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked={false} onChange={() => {}} />
                      <div>
                        <div className="font-medium">Product updates</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Receive email updates about new features</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Privacy tab */}
              {activeTab === "privacy" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Privacy</h3>
                  <div className="text-sm text-[var(--color-text-secondary)]">Control who can see your public profile and activity.</div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card">
                      <div className="font-semibold">Profile visibility</div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-2">Public profiles appear in search results and on course pages.</div>
                      <div className="mt-3">
                        <label className="flex items-center gap-2"><input type="radio" name="visibility" defaultChecked /> <span className="text-sm">Public</span></label>
                        <label className="flex items-center gap-2"><input type="radio" name="visibility" className="mt-2" /> <span className="text-sm">Private</span></label>
                      </div>
                    </div>

                    <div className="card">
                      <div className="font-semibold">Search indexing</div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-2">Allow search engines to index your public profile.</div>
                      <div className="mt-3">
                        <label className="flex items-center gap-2"><input type="checkbox" /> <span className="text-sm">Allow indexing</span></label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* other tabs minimal placeholders to avoid empty states */}
              {activeTab === "billing" && (
                <div>
                  <h3 className="text-lg font-semibold">Billing and Payouts</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Manage your payment details and payout methods.</p>
                </div>
              )}

              {activeTab === "api" && (
                <div>
                  <h3 className="text-lg font-semibold">API Clients</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Create and manage API clients and keys.</p>
                </div>
              )}

              {activeTab === "close" && (
                <div>
                  <h3 className="text-lg font-semibold text-red-600">Close Account</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Closing your account is permanent. All your data will be removed.</p>
                  <div className="mt-4">
                    <button className="btn btn-hover border text-red-600">Request account closure</button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
