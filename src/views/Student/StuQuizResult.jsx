import LogoModes from "@/components/ui/LogoTheme/LogoModes";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

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
  const canvasRef = useRef(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = "/certificate-template.png"; // موجود في public

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      // 🎨 إعدادات الكتابة
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";

      // 📝 اسم الطالب (وسط السطر الفاضي الأول)
      ctx.font = "bold 60px Arial";
      ctx.fillText(studentName, canvas.width / 2, canvas.height / 1.5 - 90);

      // 📝 اسم الكورس (وسط السطر الفاضي التاني)
      ctx.font = "bold 50px Arial";
      ctx.fillText(courseName, canvas.width / 2, canvas.height / 1.5 + 100);

      // ✅ تحميل الصورة
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
      <canvas ref={canvasRef} style={{ display: "none" }} />
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
  const studentName = "Joginder"; // ممكن تخليه متغير أو من API

  return (
    <div className="w-full flex=grow bg-gray-100 dark:bg-stone-950 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-stone-900 flex items-center justify-between px-4 sm:px-6 shadow-sm z-50">
        <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-stone-900 text-gray-700 dark:text-gray-200 text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-stone-900 hover:text-white transition">
          Back To Courses
        </button>

        <a href="">
          <LogoModes />
        </a>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu_Bwn9_9Uvdpq3DYMfWGtIFiKg6jchz2MOw&s"
          alt="profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      </header>

      {/* Breadcrumbs + Title */}
      <div className="w-full bg-white dark:bg-stone-900 shadow-sm ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-2 gap-2 sm:gap-0">
          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <a href="" className="hover:underline">Home</a> / 
            <a href="" className="hover:underline"> Certification Center</a> / Test
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1 sm:mt-0">
            <a href="" className="hover:underline">« Back to Certification Center</a>
          </span>
        </div>

        <h1 className="px-4 sm:px-6 py-3 text-xl sm:text-2xl md:text-3xl font-semibold dark:text-white">
          Test view
        </h1>
      </div>

      {/* عرض النتائج */}
      <div className="mt-10 mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        <Count shape="✓" num="15" text="Right" />
        <Count shape="✗" num="5" text="Wrong" />
        <Count shape="15" num="20" text="Out of" />
      </div>

      <Certification name={studentName} />

      <h2 className="text-gray-600 mt-6 text-center dark:text-gray-300 text-base sm:text-lg">
        You are eligible for this certificate
      </h2>

      {/* ✅ نمرر الاسم للجزء بتاع تحميل الشهادة */}
      <CertificateSection studentName={studentName} courseName="React Basics" />
    </div>
  );
}

export default StuQuizResult;
