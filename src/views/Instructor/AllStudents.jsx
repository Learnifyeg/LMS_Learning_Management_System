import { useEffect, useState } from "react";
import { Search, Linkedin, Github, Facebook, Twitter } from "lucide-react";
import api from "@/API/Config";
import Pagination from "../Others/Pagination";

const STUDENT_PER_PAGE = 8;

function AllStudents({ role }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // ✅ لو الـ role لسه undefined ما نعملش call
    if (!role) return;

    setLoading(true);

    const endpoint =
      role?.toLowerCase() === "instructor" ? "get-my-students" : "get-students";

    const token = localStorage.getItem("token"); // خدي التوكن من التخزين

    api
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err))
      .finally(() => setLoading(false));
  }, [role]);

  // 🔍 فلترة حسب الاسم
  const filteredStudents = students.filter((student) =>
    student.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / STUDENT_PER_PAGE)
  );
  const pageStartIndex = (currentPage - 1) * STUDENT_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(
    pageStartIndex,
    pageStartIndex + STUDENT_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading students...
      </div>
    );
  }

  function ProfileCard({
    fullName,
    title,
    university,
    country,
    email,
    linkedin,
    github,
    facebook,
    twitter,
    image,
  }) {
    return (
      <div className="w-full max-w-2xs bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md flex flex-col items-center p-5 hover:shadow-xl transition-all duration-300">
        <img
          src={image || "/default-profile.png"}
          alt={fullName}
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />
        <h3 className="font-semibold text-lg mt-3 text-gray-800 dark:text-white text-center">
          {fullName}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm text-center">
          {title}
        </p>
        {university && (
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 text-center">
            {university}
          </p>
        )}
        {country && (
          <p className="text-gray-400 dark:text-gray-500 text-xs text-center">
            {country}
          </p>
        )}
        {email && (
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 text-center break-words">
            {email}
          </p>
        )}
        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <Linkedin size={16} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-500 text-white rounded hover:bg-black transition"
            >
              <Github size={16} />
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <Facebook size={16} />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
            >
              <Twitter size={16} />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 ">
      {/* 🔍 Search bar */}
      <div className="flex items-center gap-2 border rounded-full px-4 py-2 w-full max-w-md mb-8 mx-auto bg-gray-100 dark:bg-gray-600">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search for student..."
          className="flex-1 outline-none bg-transparent text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 👇 Filtered Students */}
      <div className="flex flex-wrap justify-center gap-6">
        {paginatedStudents.length > 0 ? (
          paginatedStudents.map((student, index) => (
            <ProfileCard key={index} {...student} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No students found</p>
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

export default AllStudents;
