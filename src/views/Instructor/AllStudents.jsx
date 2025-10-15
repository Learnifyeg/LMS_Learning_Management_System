import { useState } from "react";
import { Search, Linkedin, Github, Facebook, Twitter } from "lucide-react";

function AllStudents() {
  const students = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      name: "Ahmed Samir",
      title: "Full Stack Web Student",
      university: "Cairo University",
      country: "Egypt",
      email: "ahmed.samir@cu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
      name: "Omar Mostafa",
      title: "React & UI Designer",
      university: "Ain Shams University",
      country: "Egypt",
      email: "omar.mostafa@asu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4202/4202832.png",
      name: "Sara Khaled",
      title: "Backend Developer (Node.js)",
      university: "Helwan University",
      country: "Egypt",
      email: "sara.khaled@hu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
      name: "Mona Ali",
      title: "Frontend React Student",
      university: "Alexandria University",
      country: "Egypt",
      email: "mona.ali@alex.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
     {
      image: "https://cdn-icons-png.flaticon.com/512/4202/4202832.png",
      name: "Sara Khaled",
      title: "Backend Developer (Node.js)",
      university: "Helwan University",
      country: "Egypt",
      email: "sara.khaled@hu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
      name: "Mona Ali",
      title: "Frontend React Student",
      university: "Alexandria University",
      country: "Egypt",
      email: "mona.ali@alex.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
     {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      name: "Ahmed Samir",
      title: "Full Stack Web Student",
      university: "Cairo University",
      country: "Egypt",
      email: "ahmed.samir@cu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
      name: "Omar Mostafa",
      title: "React & UI Designer",
      university: "Ain Shams University",
      country: "Egypt",
      email: "omar.mostafa@asu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
     {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      name: "Ahmed Samir",
      title: "Full Stack Web Student",
      university: "Cairo University",
      country: "Egypt",
      email: "ahmed.samir@cu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
      name: "Omar Mostafa",
      title: "React & UI Designer",
      university: "Ain Shams University",
      country: "Egypt",
      email: "omar.mostafa@asu.edu.eg",
      linkedin: "https://linkedin.com/in",
      github: "https://github.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function ProfileCard({ image, name, title, university, country, email, linkedin, github, facebook, twitter }) {
    return (
      <div className="w-full max-w-2xs bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md flex flex-col items-center p-5 hover:shadow-xl transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />
        <h3 className="font-semibold text-lg mt-3 text-gray-800 dark:text-white text-center">{name}</h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm text-center">{title}</p>

        {university && <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 text-center">{university}</p>}
        {country && <p className="text-gray-400 dark:text-gray-500 text-xs text-center">{country}</p>}
        {email && <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 text-center break-words">{email}</p>}

        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              <Linkedin size={16} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-500 text-white rounded hover:bg-black transition">
              <Github size={16} />
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              <Facebook size={16} />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">
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
  {filteredStudents.length > 0 ? (
    filteredStudents.map((student, index) => (
      <ProfileCard key={index} {...student} />
    ))
  ) : (
    <p className="text-gray-500 text-center w-full">No students found</p>
  )}
</div>



    </div>
  );
}

export default AllStudents;
