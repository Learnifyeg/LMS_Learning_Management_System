function StudentLessonPage() {
  const handleFormatText = (command, value = '') => {
    document.execCommand(command, false, value);
    document.getElementById('notesEditor').focus();
  };

  const handleFontChange = (fontFamily) => {
    document.execCommand('fontName', false, fontFamily);
    document.getElementById('notesEditor').focus();
  };

  const handleFontSize = (size) => {
    document.execCommand('fontSize', false, size);
    document.getElementById('notesEditor').focus();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Learnify</h1>
              <div className="hidden md:flex space-x-4 sm:space-x-6">
                {['Dashboard', 'My Courses', 'Calendar', 'Resources'].map((item) => (
                  <a key={item} href="#" className="text-black hover:text-blue-600 font-medium text-sm sm:text-base">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search lessons..."
                  className="w-32 sm:w-48 pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Course Navigation */}
        <div className="w-full lg:w-80 bg-white lg:min-h-screen shadow-sm p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-black mb-4">React Masterclass</h2>
            <div className="space-y-1">
              {[
                { title: 'Introduction to React', completed: true },
                { title: 'JSX Fundamentals', completed: true },
                { title: 'Components & Props', completed: true },
                { title: 'State & Lifecycle', active: true },
                { title: 'Event Handling', completed: false },
                { title: 'Conditional Rendering', completed: false },
              ].map((lesson, index) => (
                <div
                  key={index}
                  className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-colors ${
                    lesson.active
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : lesson.completed
                      ? 'text-black hover:bg-gray-100'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs ${
                      lesson.active
                        ? 'bg-blue-600 text-white'
                        : lesson.completed
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {lesson.completed ? '✓' : index + 1}
                    </div>
                    <span className="text-xs sm:text-sm truncate">{lesson.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Sections in Sidebar */}
          <div>
            <h3 className="font-semibold text-black mb-3 text-sm sm:text-base">Lesson Content</h3>
            <div className="space-y-2">
              <div className="p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-medium text-blue-700 text-sm sm:text-base">Lifecycle</span>
                <p className="text-xs sm:text-sm text-blue-600 mt-1">Click to start learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Video Player & Content */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-sm sm:text-lg font-semibold">React State & Lifecycle</p>
                    <p className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm">Video player - Click play to start learning</p>
                  </div>
                </div>
                <div className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button className="text-white hover:text-blue-400">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                      <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button className="text-white hover:text-blue-400">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4 text-white">
                    <span className="text-xs sm:text-sm">24:30 / 45:00</span>
                    <button className="hover:text-blue-400">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">Understanding State & Lifecycle</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-black leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    In this lesson, we'll explore how React components manage internal state and 
                    leverage lifecycle methods to create dynamic, interactive user interfaces.
                  </p>
                  <ul className="text-black space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    <li>• Understanding component state with useState hook</li>
                    <li>• Managing side effects with useEffect hook</li>
                    <li>• Component lifecycle in functional components</li>
                    <li>• Best practices for state management</li>
                  </ul>
                </div>
              </div>

              {/* Downloadable Resources */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Downloadable Resources</h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'State Management Guide.pdf', type: 'PDF', size: '2.1 MB', icon: '📄' },
                    { name: 'Lifecycle Examples.zip', type: 'ZIP', size: '3.4 MB', icon: '📦' },
                    { name: 'Practice Exercises.docx', type: 'DOC', size: '1.2 MB', icon: '📝' },
                  ].map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-base sm:text-lg">{resource.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-black text-sm sm:text-base truncate">{resource.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm whitespace-nowrap ml-2">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Notes & Discussion */}
            <div className="space-y-4 sm:space-y-6">
              {/* Notes Section */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-black">My Notes</h3>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    {/* Font Controls */}
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button 
                        onClick={() => handleFontChange('Arial')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 border-r border-gray-300"
                      >
                        Arial
                      </button>
                      <button 
                        onClick={() => handleFontChange('Times New Roman')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 border-r border-gray-300"
                      >
                        Times
                      </button>
                      <button 
                        onClick={() => handleFontChange('Courier New')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50"
                      >
                        Courier
                      </button>
                    </div>

                    {/* Font Size Controls */}
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button 
                        onClick={() => handleFontSize('3')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 border-r border-gray-300"
                      >
                        12
                      </button>
                      <button 
                        onClick={() => handleFontSize('4')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 border-r border-gray-300"
                      >
                        14
                      </button>
                      <button 
                        onClick={() => handleFontSize('5')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50"
                      >
                        16
                      </button>
                    </div>

                    {/* Formatting Buttons */}
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button 
                        onClick={() => handleFormatText('bold')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 border-r border-gray-300 font-bold"
                      >
                        B
                      </button>
                      <button 
                        onClick={() => handleFormatText('italic')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 border-r border-gray-300 italic"
                      >
                        I
                      </button>
                      <button 
                        onClick={() => handleFormatText('underline')}
                        className="px-2 py-1 text-xs text-black hover:bg-gray-50 underline"
                      >
                        U
                      </button>
                    </div>

                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-white border border-blue-300 rounded px-2 py-1 whitespace-nowrap">
                      Save
                    </button>
                  </div>
                </div>
                
                {/* Editable Notes Content */}
                <div 
                  id="notesEditor"
                  contentEditable
                  suppressContentEditableWarning
                  className="border border-gray-300 rounded-lg p-3 sm:p-4 min-h-[150px] sm:min-h-[200px] bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  <div><strong>Key Points:</strong></div>
                  <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                    <li>• useState hook is used for managing component state</li>
                    <li>• useEffect handles side effects and lifecycle</li>
                    <li>• Always use functional components with hooks</li>
                    <li>• Remember to cleanup effects to prevent memory leaks</li>
                  </ul>
                  <div style={{ marginTop: '12px' }}>
                    <em>Note: State updates are asynchronous in React</em>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                  <span>Auto-saved 2 min ago</span>
                  <span>Characters: 245/5000</span>
                </div>
              </div>

              {/* Discussion Section */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Discussion</h3>
                
                {/* Messages */}
                <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-h-60 sm:max-h-80 overflow-y-auto">
                  {/* Instructor Message */}
                  <div className="flex space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold">
                      SI
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1 flex-wrap">
                        <span className="font-medium text-black text-sm">Sarah Instructor</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Instructor</span>
                        <span className="text-xs text-gray-600">10:30 AM</span>
                      </div>
                      <p className="text-black text-xs sm:text-sm bg-blue-50 p-2 sm:p-3 rounded-lg">
                        Welcome everyone! Feel free to ask questions about state management.
                      </p>
                    </div>
                  </div>

                  {/* Student Message */}
                  <div className="flex space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold">
                      JS
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1 flex-wrap">
                        <span className="font-medium text-black text-sm">John Student</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Student</span>
                        <span className="text-xs text-gray-600">10:35 AM</span>
                      </div>
                      <p className="text-black text-xs sm:text-sm bg-gray-50 p-2 sm:p-3 rounded-lg">
                        When should we use useReducer instead of useState?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <textarea 
                    placeholder="Ask a question or share your thoughts..."
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-1 sm:gap-0">
                    <span className="text-xs text-gray-600 order-2 sm:order-1">
                      Press Enter to send
                    </span>
                    <button className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors order-1 sm:order-2 w-full sm:w-auto">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLessonPage;