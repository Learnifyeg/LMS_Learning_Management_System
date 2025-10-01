import React, { useState, useEffect } from "react";
import LogoModes from "@/components/ui/LogoTheme/LogoModes";

// Simple countdown timer (receives initialSeconds as prop)
function Timer({ initialSeconds = 3600 }) {
  const [secs, setSecs] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = Math.floor(secs / 60).toString().padStart(2, "0");
  const ss = (secs % 60).toString().padStart(2, "0");

  return (
    <div className="bg-white dark:bg-stone-900 shadow-md rounded-lg p-6 text-center">
      <h3 className="font-semibold text-lg mb-2 dark:text-white">Time Remaining</h3>
      <p className="text-2xl font-bold text-red-600">{mm}:{ss}</p>
    </div>
  );
}

// Single question card component. Receives question object, selected value and onSelect callback via props
function QuestionCard({ question, index, selected, onSelect }) {
  return (
    <div className="bg-white dark:bg-stone-900 shadow-md rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-2 dark:text-white">Question {index + 1}</h3>
      <p className="mb-4 dark:text-gray-200">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-2 dark:text-gray-200 cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-stone-800"
          >
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={selected === opt.id}
              onChange={() => onSelect(question.id, opt.id)}
              className="w-4 h-4"
            />
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Questions list: maps questions -> QuestionCard and passes props
function QuestionsList({ questions, answers, onAnswerChange }) {
  return (
    <>
      {questions.map((q, idx) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={idx}
          selected={answers[q.id]}
          onSelect={onAnswerChange}
        />
      ))}
    </>
  );
}

export default function StuQuizPage() {
  // sample data (move this to props or fetch from API)
  // مثال لمصفوفة أسئلة
const questions = [
  {
    id: 1,
    text: "Which of the following is a PHP framework?",
    options: [
      { id: "a", text: "Laravel" },
      { id: "b", text: "React" },
      { id: "c", text: "Angular" },
      { id: "d", text: "Django" },
    ],
    answer: "a", // optional
  },
  {
    id: 2,
    text: "Which superglobal variable is used to collect form data in PHP?",
    options: [
      { id: "a", text: "$_POST" },
      { id: "b", text: "$_GET" },
      { id: "c", text: "$_REQUEST" },
      { id: "d", text: "$_FORM" },
    ],
    answer: "a",
  },
  {
    id: 3,
    text: "Which of the following is used to start a PHP session?",
    options: [
      { id: "a", text: "start_session()" },
      { id: "b", text: "session_start()" },
      { id: "c", text: "begin_session()" },
      { id: "d", text: "init_session()" },
    ],
    answer: "b",
  },
  {
    id: 4,
    text: "What does PHP stand for?",
    options: [
      { id: "a", text: "Personal Hypertext Processor" },
      { id: "b", text: "PHP: Hypertext Preprocessor" },
      { id: "c", text: "Private Home Page" },
      { id: "d", text: "Programming Hypertext Processor" },
    ],
    answer: "b",
  },
  {
    id: 5,
    text: "Which of the following is the correct way to connect to MySQL in PHP (mysqli)?",
    options: [
      { id: "a", text: "mysqli_connect(host, user, pass, db)" },
      { id: "b", text: "mysql_connect(host, user, pass, db)" },
      { id: "c", text: "pdo_connect(host, user, pass, db)" },
      { id: "d", text: "connect_mysql(host, user, pass, db)" },
    ],
    answer: "a",
  },
  {
    id: 6,
    text: "Which symbol is used to prepend variables in PHP?",
    options: [
      { id: "a", text: "%" },
      { id: "b", text: "$" },
      { id: "c", text: "#" },
      { id: "d", text: "&" },
    ],
    answer: "b",
  },
  {
    id: 7,
    text: "Which PHP function is used to include another file?",
    options: [
      { id: "a", text: "require()" },
      { id: "b", text: "import()" },
      { id: "c", text: "include()" },
      { id: "d", text: "Both A and C" },
    ],
    answer: "d",
  },
  {
    id: 8,
    text: "Which of these is NOT a PHP data type?",
    options: [
      { id: "a", text: "Integer" },
      { id: "b", text: "Float" },
      { id: "c", text: "Character" },
      { id: "d", text: "Array" },
    ],
    answer: "c",
  },
  {
    id: 9,
    text: "How do you write a single-line comment in PHP?",
    options: [
      { id: "a", text: "// comment" },
      { id: "b", text: "# comment" },
      { id: "c", text: "/* comment */" },
      { id: "d", text: "Both A and B" },
    ],
    answer: "d",
  },
  {
    id: 10,
    text: "Which of the following functions is used to get the length of a string in PHP?",
    options: [
      { id: "a", text: "count()" },
      { id: "b", text: "strlen()" },
      { id: "c", text: "strcount()" },
      { id: "d", text: "length()" },
    ],
    answer: "b",
  },
];

  // answers state: { questionId: optionId }
  const [answers, setAnswers] = useState({});
  const [initialSeconds] = useState(60 * 60); // 60 minutes example

  // called from QuestionCard via props
  function handleAnswerChange(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  function handleSubmit() {
    // here you can validate answers, send to API, etc.
    console.log("User answers:", answers);
   
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-stone-950 flex flex-col pt-16">
      {/* Header */}
     <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-stone-900 flex items-center justify-between px-6 shadow-sm z-50">
  <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-stone-900 text-gray-700 dark:text-gray-200 text-sm px-4 py-2 rounded-full hover:bg-stone-900 hover:text-white transition">
    Back To Courses
  </button>

  <a href="">
    <LogoModes />
  </a>
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu_Bwn9_9Uvdpq3DYMfWGtIFiKg6jchz2MOw&s"
    alt="profile"
    className="w-10 h-10 rounded-full object-cover"
  />
</header>


      {/* Breadcrumbs + Title */}
      <div className="w-full bg-white dark:bg-stone-900 shadow-sm">
        <div className="flex justify-between items-center px-10 py-3">
          <span className="text-gray-600 dark:text-gray-300 text-sm ml-5">
            <a href="" className="hover:underline">Home</a> / 
            <a href="" className="hover:underline"> Certification Center</a> / Test
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm mr-5">
            <a href="" className="hover:underline">« Back to Certification Center</a>
          </span>
        </div>

        <h1 className="px-10 py-4 text-[28px] font-semibold dark:text-white ml-5">Test view</h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6 px-10 py-6 w-full">
        {/* Left Column (Test Info + Timer) */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-stone-900 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">PHP Developer Test</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">{questions.length} Questions</p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">60 Minutes</p>
              <p className="text-gray-600 dark:text-gray-300">Passing Score: 70%</p>
            </div>

            <Timer initialSeconds={initialSeconds} />
          </div>
        </div>

        {/* Right Column (Questions + Submit) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <QuestionsList questions={questions} answers={answers} onAnswerChange={handleAnswerChange} />

          <div className="flex justify-center">
            <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition">
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
