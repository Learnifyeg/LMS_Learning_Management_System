import React, { useEffect, useState } from "react";
import api from "@/API/Config";
import toast, { Toaster } from "react-hot-toast";
import SendNotificationModal from "./SendNotificationModal";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import ConfirmToast from "@/utils/ConfirmToast";

const ReceiveNotificationsEndpoint = "Notification/user-receive";
const MarkAsReadEndpoint = "Notification/user-read"; // example endpoint for marking read
const DeleteNotificationEndpoint = "Notification/user-delete"; // example endpoint for marking read

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null); // for reply
  const [selectedNotificationDetail, setSelectedNotificationDetail] =
    useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const userEmail =
          localStorage.getItem("useremail") || "user1@example.com";
        const response = await api.get(
          `${ReceiveNotificationsEndpoint}/${userEmail}`
        );
        console.log(response.data);
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    // first fetch immediately
    fetchNotifications();

    // repeat every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);

    // cleanup when unmounting
    return () => clearInterval(interval);
  }, []);

  // Mark notification as read (both visually + backend)
  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`${MarkAsReadEndpoint}/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n))
      );
      toast.success("Notification marked as read");
    } catch (err) {
      console.error("Error marking as read:", err);
      toast.error("Failed to mark as read");
    }
  };

  // View notification details
  const handleViewDetails = (notification) => {
    setSelectedNotificationDetail(notification);
  };

  // Handle reply
  const handleReply = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  // Handle delete with confirmation
  const handleDelete = (notification) => {
    toast.custom((t) => (
      <ConfirmToast
        message={`Are you sure you want to delete the notification "${notification.title}"?`}
        onConfirm={async () => {
          try {
            await api.delete(
              `${DeleteNotificationEndpoint}/${notification.notificationId}`
            );
            setNotifications((prev) =>
              prev.filter(
                (n) => n.notificationId !== notification.notificationId
              )
            );
            toast.success("Notification deleted successfully");
          } catch (err) {
            console.error("Error deleting notification:", err);
            toast.error("Failed to delete notification");
          }
        }}
        onCancel={() => {
          toast.dismiss(t.id); // optional, already handled in ConfirmToast
        }}
      />
    ));
  };

  // Format date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <LandingHeading
            header="Notifications"
            subHeader={
              <p className="text-text-secondary mt-1">
                {loading
                  ? "Loading notifications..."
                  : `You have ${notifications.length} notifications`}
              </p>
            }
          />
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Notification Settings */}
          <div className="bg-card rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Notification Settings
              </h2>
              <p className="text-text-secondary">
                Manage your notification preferences
              </p>
            </div>
            <button
              className="bg-secondary text-white p-2 rounded hover:opacity-90"
              onClick={() => {
                setSelectedNotification(null);
                setIsModalOpen(true);
              }}
            >
              Send Notification
            </button>
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
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className={`p-6 transition-colors hover:bg-muted/40 ${
                    notification.isRead ? "opacity-80" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    {/* Content */}
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleViewDetails(notification)}
                    >
                      <h3 className="font-semibold text-text-primary mb-1">
                        {notification.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-2">
                        {notification.message}
                      </p>

                      {/* Sender info */}
                      <p className="text-sm text-gray-500 mb-1">
                        From:{" "}
                        <span className="font-medium text-gray-700">
                          {notification.senderName || "Unknown"}
                        </span>{" "}
                        (
                        <span className="text-blue-600">
                          {notification.senderEmail}
                        </span>
                        )
                      </p>

                      <p className="text-xs text-gray-400">
                        Received: {formatDate(notification.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex max-sm:flex-col items-end gap-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            handleMarkAsRead(notification.notificationId)
                          }
                          className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Mark as Read
                        </button>
                      )}

                      <button
                        onClick={() => handleReply(notification)}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Reply
                      </button>
                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(notification)}
                        className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
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

      {/* Modal for sending or replying */}
      <SendNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        receiverEmail={selectedNotification?.senderEmail} // ✅ reply goes to sender
        originalTitle={selectedNotification?.title}
      />

      {/* SendNotificationModal */}
      {selectedNotificationDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-md rounded-2xl bg-[var(--surface)] text-[var(--text-primary)] shadow-2xl border border-[var(--border)] p-6 transition-all duration-300 ease-in-out">
            {/* ✖ Close Button */}
            <button
              onClick={() => setSelectedNotificationDetail(null)}
              className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--primary)] text-xl transition-all"
            >
              ✕
            </button>

            {/*  Title */}
            <h2 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
              {selectedNotificationDetail.title}
            </h2>

            {/*  Sender Info */}
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              From:{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                {selectedNotificationDetail.senderName}
              </span>{" "}
              (
              <span className="text-[var(--primary)]">
                {selectedNotificationDetail.senderEmail}
              </span>
              )
            </p>

            {/*  Message */}
            <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-lg mb-4">
              <p className="text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
                {selectedNotificationDetail.message}
              </p>
            </div>

            {/*  Type & Dates */}
            <div className="text-xs text-[var(--text-secondary)] space-y-1 mb-4">
              <p>
                Type:{" "}
                <span className="capitalize">
                  {selectedNotificationDetail.type}
                </span>
              </p>
              <p>
                Received: {formatDate(selectedNotificationDetail.createdAt)}
              </p>
              {selectedNotificationDetail.isRead && (
                <p>Read At: {formatDate(selectedNotificationDetail.readAt)}</p>
              )}
            </div>

            {/*  Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              {!selectedNotificationDetail.isRead && (
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedNotificationDetail.notificationId);
                    setSelectedNotificationDetail({
                      ...selectedNotificationDetail,
                      isRead: true,
                    });
                  }}
                  className="btn btn-hover bg-green-600 hover:bg-green-700"
                >
                  Mark as Read
                </button>
              )}

              <button
                onClick={() => {
                  handleReply(selectedNotificationDetail);
                  setSelectedNotificationDetail(null);
                }}
                className="btn btn-primary btn-hover"
              >
                Reply
              </button>
              <button
                onClick={() => handleDelete(selectedNotificationDetail)}
                className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
