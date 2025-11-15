import React, { useState } from "react";
import { useParams } from "react-router";
import useLesson from "@/hooks/useLesson";

export default function LessonDetailsPage() {
  const { id: lessonId } = useParams();
  const { getLessonById } = useLesson(lessonId);
  const { data: lesson, isLoading } = getLessonById(lessonId);
  const [currentTab, setCurrentTab] = useState("about");

  if (isLoading) return <div>Loading lesson...</div>;
  if (!lesson) return <div>No lesson found.</div>;

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b pb-2">
            <button
              className={`pb-2 font-semibold ${currentTab==="about" ? "border-b-2 border-secondary" : ""}`}
              onClick={()=>setCurrentTab("about")}
            >About</button>
            <button
              className={`pb-2 font-semibold ${currentTab==="content" ? "border-b-2 border-secondary" : ""}`}
              onClick={()=>setCurrentTab("content")}
            >Content</button>
          </div>

          <div className="mt-4">
            {currentTab === "about" && (
              <div>
                <p><strong>Description:</strong> {lesson.description || "No description"}</p>
                <p><strong>Duration:</strong> {lesson.duration}</p>
                <p><strong>Order:</strong> {lesson.order}</p>
                <p><strong>Video URL:</strong> <a href={lesson.videoUrl} target="_blank">{lesson.videoUrl}</a></p>
              </div>
            )}

            {currentTab === "content" && (
              <div>
                <p>{lesson.content || "No content provided"}</p>
                {lesson.resources && (
                  <div>
                    <h3>Resources:</h3>
                    <ul>
                      {lesson.resources.split(",").map((res, idx)=>(
                        <li key={idx}><a href={res.trim()} target="_blank">{res.trim()}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
