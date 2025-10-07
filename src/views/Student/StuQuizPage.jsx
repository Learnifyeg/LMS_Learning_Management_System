// React
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Timer Component
function Timer({ initialSeconds = 3600 }) {
  const [secs, setSecs] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const ss = (secs % 60).toString().padStart(2, "0");

  return (
    <div className="card shadow-md rounded-lg p-6 text-center">
      <h3 className="font-semibold text-lg mb-2">Time Remaining</h3>
      <p className="text-2xl font-bold text-red-600">
        {mm}:{ss}
      </p>
    </div>
  );
}

// Question Card
function QuestionCard({ question, index, selected, onSelect }) {
  return (
    <div className="card shadow-md rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-2">Question {index + 1}</h3>
      <p className="mb-4">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-stone-700"
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

// Questions List
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

// ✅ Main Component
export default function StuQuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathParts = location.pathname.split("/"); // ["", "StudentLayout", "StuQuizPage"]
  const userId = pathParts[1]; // "StudentLayout"

  // ✅ Track start time
  const [startTime] = useState(new Date());

  const URL = "http://localhost:3001";
  const QuestionsEndPoint = "questions";
  const AnswersEndPoint = "studentanswers";

  // Fetch Questions
  useEffect(() => {
    axios
      .get(`${URL}/${QuestionsEndPoint}`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  // Handle answer selection
  function handleAnswerChange(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  // ✅ Submit answers and calculate duration
  async function handleSubmit() {
    const endTime = new Date();
    const durationMs = endTime - startTime;
    const durationMinutes = Math.floor(durationMs / 1000 / 60);
    const durationSeconds = Math.floor((durationMs / 1000) % 60);

    const durationString = `${durationMinutes}m ${durationSeconds}s`;

    try {
      const response = await axios.post(`${URL}/${AnswersEndPoint}`, {
        userId,
        answers,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: durationString, // ✅ add total time spent
        submittedAt: endTime.toISOString(),
      });

      console.log("Answers submitted successfully:", response.data);
      alert(`Submitted successfully! Total time: ${durationString}`);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  }

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading questions...
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-stone-950 flex flex-col pt-16">
      <div className="w-full card shadow-sm">
        <div className="flex justify-between items-center px-10 py-3">
          <span className="text-gray-600 text-sm ml-5">
            Home / Certification / Test
          </span>
          <span className="text-gray-600 text-sm mr-5 cursor-pointer hover:underline">
            « Back to Certification Center
          </span>
        </div>
        <h1 className="px-10 py-4 text-[28px] font-semibold dark:text-white ml-5">
          Test View
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6 px-10 py-6 w-full">
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="card shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                PHP Developer Test
              </h2>
              <p className="text-gray-600 mb-1">{questions.length} Questions</p>
              <p className="text-gray-600 mb-1">60 Minutes</p>
              <p className="text-gray-600">Passing Score: 70%</p>
            </div>
            <Timer initialSeconds={3600} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <QuestionsList
            questions={questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
