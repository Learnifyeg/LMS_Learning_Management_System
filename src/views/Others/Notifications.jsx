function Notifications() {
  const notifications = [
    {
      user: "Rock William",
      action: "Like Your Comment On Video",
      target: "How to create sidebar menu.",
      time: "2 min ago"
    },
    {
      user: "Jassica Smith",
      action: "Added New Review In Video",
      target: "Full Stack PHP Developer.",
      time: "12 min ago"
    },
    {
      type: "system",
      title: "Your Membership Activated.",
      time: "20 min ago"
    },
    {
      type: "purchase",
      action: "You buy a new course.",
      target: "How to create sidebar menu.",
      time: "20 min ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Notification Setting Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Notification Setting</h2>
            <p className="text-gray-600">Manage your notification preferences</p>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index === notifications.length - 1 ? 'border-b-0' : ''
                }`}
              >
                {notification.type === "system" ? (
                  // System Notification
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{notification.title}</h3>
                      <p className="text-gray-500 text-sm">{notification.time}</p>
                    </div>
                  </div>
                ) : notification.type === "purchase" ? (
                  // Purchase Notification
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 mb-1">
                        <span className="font-medium">{notification.action}</span>{" "}
                        <span className="text-blue-600">{notification.target}</span>
                      </p>
                      <p className="text-gray-500 text-sm">{notification.time}</p>
                    </div>
                  </div>
                ) : (
                  // User Interaction Notification
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">
                        {notification.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 mb-1">
                        <span className="font-medium">{notification.user}</span>{" "}
                        <span>{notification.action}</span>{" "}
                        <span className="text-blue-600">{notification.target}</span>
                      </p>
                      <p className="text-gray-500 text-sm">{notification.time}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <div className="flex flex-wrap justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-gray-900">Copyright Policy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          </div>
          <p>© 2025 Learnify. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Notifications;
