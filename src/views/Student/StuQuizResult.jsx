// React
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { Button } from "@/components/ui/button";

// API URLs
const URL = "http://localhost:3001";
const UserResultsEndPoint = "studentResults"; // 👈 endpoint we’ll use

function Count({ shape, num, text }) {
  const bgColor =
    text === "Right"
      ? "bg-green-500"
      : text === "Wrong"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div className="flex flex-col items-center mx-2 sm:mx-4 mb-4">
      <div
        className={`w-25 h-25 sm:w-24 sm:h-24 ${bgColor} rounded-full flex justify-center items-center text-white text-xl sm:text-2xl font-semibold`}
      >
        {shape}
      </div>
      <p className="mt-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base text-center">
        {text} <span className="text-gray-500 dark:text-gray-400">({num})</span>
      </p>
    </div>
  );
}

function CertificateSection({ studentName, courseName }) {
  const generateCertificate = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = "/certificate-template.png";

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.fillStyle = "#333";
      ctx.textAlign = "center";

      ctx.font = "bold 60px Arial";
      ctx.fillText(studentName, canvas.width / 2, canvas.height / 1.5 - 90);

      ctx.font = "bold 50px Arial";
      ctx.fillText(courseName, canvas.width / 2, canvas.height / 1.5 + 100);

      const link = document.createElement("a");
      link.download = `${studentName}-certificate.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  return (
    <div className="flex justify-center mt-10 mb-6">
      <Button variant="default" size="lg" onClick={generateCertificate}>
        Download Certificate
      </Button>
    </div>
  );
}

function Certification({ name }) {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-10 text-center dark:text-white">
      <h1>Congratulations! {name}</h1>
    </div>
  );
}

function StuQuizResult() {
  const [result, setResult] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserResult = async () => {
      try {
        // ✅ Get all results
        const res = await axios.get(`${URL}/${UserResultsEndPoint}`);
        const allResults = res.data;

        if (allResults.length > 0) {
          // ✅ Take the last one as latest result
          const latestResult = allResults[allResults.length - 1];
          setResult(latestResult);
          setUserId(latestResult.userId); // 👈 Automatically set userId
        }
      } catch (error) {
        console.error("Error fetching user results:", error);
      }
    };

    fetchUserResult();
  }, []);

  if (!result || !userId) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        Loading result...
      </div>
    );
  }

  return (
    <div className="w-full flex-grow bg-gray-100 dark:bg-stone-950 flex flex-col pt-16">
      {/* Header */}
      <div className="w-full bg-white dark:bg-stone-900 shadow-sm px-24 max-lg:px-6 max-md:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-2 gap-2 sm:gap-0">
          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <a href="#" className="hover:underline">
              Home
            </a>{" "}
            /{" "}
            <a href="#" className="hover:underline">
              Certification Center
            </a>{" "}
            / Test
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1 sm:mt-0">
            <a href="#" className="hover:underline">
              « Back to Certification Center
            </a>
          </span>
        </div>

        <h1 className="px-4 sm:px-6 py-3 text-xl sm:text-2xl md:text-3xl font-semibold dark:text-white">
          Test Result
        </h1>
      </div>

      {/* Counts */}
      <div className="mt-10 mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        <Count shape="✓" num={result.correctAnswers} text="Right" />
        <Count shape="✗" num={result.wrongAnswers} text="Wrong" />
        <Count shape={result.correctAnswers} num={result.totalQuestions} text="Out of" />
      </div>

      {/* Certificate Section */}
      <Certification name={`User ID: ${userId}`} />

      <h2 className="text-gray-600 mt-6 text-center dark:text-gray-300 text-base sm:text-lg">
        {result.passed
          ? "You are eligible for this certificate"
          : "You did not pass this time. Try again!"}
      </h2>

      {result.passed && (
        <CertificateSection studentName={`User ${userId}`} courseName="React Basics" />
      )}
    </div>
  );
}

export default StuQuizResult;
