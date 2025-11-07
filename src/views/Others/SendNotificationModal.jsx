import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/API/Config";
import useTokenStore from "@/store/user";
import Urls from "@/API/URL";

const SendNotificationEndpoint = Urls.SendNotification; // "Notification/user-send"

const SendNotificationModal = ({
  isOpen,
  onClose,
  receiverEmail,
  originalTitle,
}) => {
  const [formData, setFormData] = useState({
    receiverEmail: "",
    title: "",
    message: "",
    type: "system",
  });

  // ✅ When modal opens, prefill receiver + title if replying
  useEffect(() => {
    if (isOpen) {
      setFormData({
        receiverEmail: receiverEmail || "",
        title: originalTitle ? `Re: ${originalTitle}` : "",
        message: "",
        type: "user",
      });
    }
  }, [isOpen, receiverEmail, originalTitle]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { user } = useTokenStore.getState();

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const senderId = user?.userId ?? 1; // integer
      const response = await api.post(SendNotificationEndpoint, {
        SenderId: senderId, // replace with actual logged-in user id if available
        ReceiverEmail: formData.receiverEmail,
        Title: formData.title,
        Message: formData.message,
        Type: formData.type,
      });

      toast.success("Notification sent successfully!");
      console.log("Notification sent:", response.data);
      onClose();
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(" Failed to send notification.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[var(--card)] text-[var(--text-primary)] rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up border border-[var(--border)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[var(--primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--text-primary)]">
          Send Notification
        </h2>

        <form onSubmit={handleSend} className="space-y-4">
          {/* Receiver Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Receiver Email
            </label>
            <input
              type="email"
              name="receiverEmail"
              value={formData.receiverEmail}
              onChange={handleChange}
              required
              disabled={!!receiverEmail} // disable when replying
              className={`w-full border border-[var(--input)] bg-[var(--surface)] rounded-lg p-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none ${
                receiverEmail ? "opacity-70 cursor-not-allowed" : ""
              }`}
              placeholder="Enter receiver email"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-[var(--input)] bg-[var(--surface)] rounded-lg p-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
              placeholder="Notification title"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full border border-[var(--input)] bg-[var(--surface)] rounded-lg p-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none resize-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-[var(--input)] bg-[var(--surface)] rounded-lg p-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            >
              <option value="system">System</option>
              <option value="purchase">Purchase</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-hover border border-[var(--border)] bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--accent)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-hover bg-[var(--primary)] text-white hover:bg-[var(--secondary)]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationModal;
