// React
import { useEffect, useMemo, useState } from "react";

// Components
import api from "@/API/Config";
import Pagination from "../Others/Pagination";

// Endpoints and constants
const USERS_PER_PAGE = 10;
const UsersEndPoint = "Users";
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // all | student | instructor | admin
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${UsersEndPoint}`)
      .then((res) => {
        // assume res.data is an array of user objects
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Reset to page 1 when search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  // Filtered users according to search and role filter (instant)
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      // role filter
      if (roleFilter !== "all" && (u.role || "").toLowerCase() !== roleFilter) {
        return false;
      }

      // search across name, email, role, phone
      if (!q) return true;
      const name = (u.name || u.fullName || "").toString().toLowerCase();
      const email = (u.email || "").toString().toLowerCase();
      const role = (u.role || "").toString().toLowerCase();
      const phone = (u.phone || "").toString().toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        role.includes(q) ||
        phone.includes(q)
      );
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  );
  const pageStartIndex = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = filteredUsers.slice(
    pageStartIndex,
    pageStartIndex + USERS_PER_PAGE
  );

  // Placeholder action handlers
  const handleView = (user) => {
    console.log("View user", user);
    // placeholder - implement modal / route later
  };

  const handleEdit = (user) => {
    console.log("Edit user", user);
    // placeholder - implement navigation later
  };

  const handleDelete = (user) => {
    console.log("Delete user", user);
    // placeholder - implement confirmation & delete later
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 w-full md:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, role or phone..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Filter by role:
          </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Enrollment Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              pageUsers.map((user, idx) => (
                <tr
                  key={user.id ?? idx}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <img
                      src={
                        user.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "User"
                        )}`
                      }
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{user.name || "-"}</td>
                  <td className="px-4 py-3">{user.email || "-"}</td>
                  <td className="px-4 py-3 capitalize">{user.role || "-"}</td>
                  <td className="px-4 py-3">{user.phone || "-"}</td>
                  <td className="px-4 py-3">{user.EnrollDate || "-"}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs bg-primary text-white rounded-md hover:bg-blue-600 cursor-pointer "
                      onClick={() => handleView(user)}
                    >
                      View
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600 cursor-pointer"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-secondary text-white rounded-md hover:bg-red-600 cursor-pointer"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {pageUsers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No users found.
          </p>
        ) : (
          pageUsers.map((user, idx) => (
            <div
              key={user.id ?? idx}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}`
                  }
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name || "-"}</p>
                  <p className="text-xs text-gray-500">{user.email || "-"}</p>
                  <p className="text-xs capitalize">{user.role || "-"}</p>
                  <p className="text-xs text-gray-500">
                    {user.EnrollDate || "-"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  className="px-2 py-1 text-xs bg-primary text-white rounded-md cursor-pointer"
                  onClick={() => handleView(user)}
                >
                  View
                </button>
                <button
                  className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md cursor-pointer"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-xs bg-secondary text-white rounded-md cursor-pointer"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default UserManagement;
