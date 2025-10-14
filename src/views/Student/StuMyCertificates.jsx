function StuMyCertificates() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Certificates</h1>
          <p className="text-gray-600 mt-2">Manage and view your certificate achievements</p>
        </header>

        {/* Jump Into New Certificate Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Jump Into New Certificate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-indigo-700">Web Development</h3>
              <p className="text-sm text-gray-600 mt-1">Complete 5 courses</p>
              <button className="mt-3 text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">Start</button>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-700">Digital Marketing</h3>
              <p className="text-sm text-gray-600 mt-1">Complete 3 courses</p>
              <button className="mt-3 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Start</button>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-700">Data Science</h3>
              <p className="text-sm text-gray-600 mt-1">Complete 4 courses</p>
              <button className="mt-3 text-sm bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 transition">Start</button>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-700">UI/UX Design</h3>
              <p className="text-sm text-gray-600 mt-1">Complete 3 courses</p>
              <button className="mt-3 text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">Start</button>
            </div>
          </div>
        </section>

        {/* Certificates Table */}
        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item No.</th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out Of</th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Controls</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WordPress Certificate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2">15</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6 April 2019</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WordPress Pro Certificate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2">14</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4 April 2019</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HTML CSS Certificate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2">18</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 April 2019</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <div className="flex flex-wrap justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-gray-900">Copyright Policy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          </div>
          <p>© 2025 Certificate Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );

  return <>
 

export default StuMyCertificates;