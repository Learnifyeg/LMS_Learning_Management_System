function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen p-6">
          {/* User Profile Section */}
          <div className="pt-6">
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-lg">John Doe</h3>
                <p className="text-sm text-gray-600">Junior Graphic Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Purchased', value: '4' },
                { label: 'My Reviews', value: '4' },
                { label: 'Subscriptions', value: '15K' },
                { label: 'Certificates', value: '2' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex space-x-8 border-b border-gray-200 pb-4">
              {['Purchased', 'Discussion', 'Subscriptions'].map((item) => (
                <button
                  key={item}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors pb-2 border-b-2 border-transparent hover:border-blue-600"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* About Me Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque nibh sed ligula blandit, quis faucibus lorem pellentesque. Suspendisse pulvinar dictum pellentesque. Vestibulum at sagittis lectus, sit amet aliquam turpis. In quis elit tempus, semper justo vitae, lacinia massa. Etiam sagittis quam quis fermentum lacinia. Curabitur blandit sapien et risus congue viverra. Mauris auctor risus sit amet cursus sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat sodales massa, in viverra dolor condimentum ut. In imperdiet, justo nec volutpat blandit, tellus justo tempor quam, sed pretium nibh nunc nec mauris. Mauris vel malesuada magna. Quisque laculis molestie purus, non luctus mauris porta id. Maecemas imperdiet tincidunt mauris vestibulum vulputate. Aenean sollicitudin pretium nibh, et sagittis risus tincidunt ac. Phasellus scelerisque rhoncus massa, ac euismod massa pharetra non. Phasellus dignissim, urna in laculis varius, turpis libero mollis velit, sit amet euismod arcu mi ac nibh. Praesent tincidunt eros at ligula pellentesque elementum. Fusce condimentum enim a tellus egestas, sit amet rutrum elit gravida. Pellentesque in porta sapien. Fusce tristique maximus ipsum et mollis. Sed at massa ac est dapibus vulputate at eu nibh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;