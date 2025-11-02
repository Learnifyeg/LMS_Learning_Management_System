using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Data.Services
{
    public class LessonService
    {
        private readonly AppDbContext _context;

        public LessonService(AppDbContext context)
        {
            _context = context;
        }

        //  Add Lesson
        public async Task<bool> AddLessonAsync(CreateLessonRequest model)
        {
            var course = await _context.Courses.FindAsync(model.CourseId);
            if (course == null) return false;

            int nextOrder = model.Order ?? await _context.Lessons
                .Where(l => l.CourseId == model.CourseId)
                .CountAsync() + 1;

            var lesson = new Lesson
            {
                CourseId = model.CourseId,
                Title = model.Title,
                VideoUrl = model.VideoUrl,
                Order = nextOrder,
                CreatedAt = DateTime.Now
            };

            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();
            return true;
        }

        //  Update Lesson
        public async Task<bool> UpdateLessonAsync(int lessonId, UpdateLessonRequest model)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId);
            if (lesson == null) return false;

            lesson.Title = model.Title ?? lesson.Title;
            lesson.VideoUrl = model.VideoUrl ?? lesson.VideoUrl;
            lesson.Order = model.Order ?? lesson.Order;

            await _context.SaveChangesAsync();
            return true;
        }

        //  Delete Lesson
        public async Task<bool> DeleteLessonAsync(int lessonId)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId);
            if (lesson == null) return false;

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();
            return true;
        }

        //  Get Lesson by Id
        public async Task<LessonVM?> GetLessonByIdAsync(int lessonId)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId);
            if (lesson == null) return null;

            return new LessonVM
            {
                LessonId = lesson.LessonId,
                CourseId = lesson.CourseId,
                Title = lesson.Title,
                VideoUrl = lesson.VideoUrl,
                Order = lesson.Order,
                CreatedAt = lesson.CreatedAt
            };
        }

        // Get Lessons by Course
        public async Task<IEnumerable<LessonVM>> GetLessonsByCourseAsync(int courseId)
        {
            return await _context.Lessons
                .Where(l => l.CourseId == courseId)
                .OrderBy(l => l.Order)
                .Select(l => new LessonVM
                {
                    LessonId = l.LessonId,
                    CourseId = l.CourseId,
                    Title = l.Title,
                    VideoUrl = l.VideoUrl,
                    Order = l.Order,
                    CreatedAt = l.CreatedAt
                })
                .ToListAsync();
        }

        // Mark Lesson as Completed
        public async Task<bool> MarkLessonCompletedAsync(int lessonId, int studentId)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId);
            if (lesson == null) return false;

            var progress = _context.LessonProgresses
                .Where(p => p.LessonId == lessonId && p.StudentId == studentId)
                .FirstOrDefault(); // using sync version, avoids async error

            if (progress == null)
            {
                progress = new LessonProgress
                {
                    LessonId = lessonId,
                    StudentId = studentId,
                    IsCompleted = true,
                    CompletedAt = DateTime.Now
                };
                _context.LessonProgresses.Add(progress);
            }
            else
            {
                progress.IsCompleted = true;
                progress.CompletedAt = DateTime.Now;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        // Get Progress for a Student in a Course
        public async Task<IEnumerable<LessonProgressVM>> GetProgressByCourseAsync(int courseId, int studentId)
        {
            return await _context.Lessons
                .Where(l => l.CourseId == courseId)
                .Select(l => new LessonProgressVM
                {
                    LessonId = l.LessonId,
                    StudentId = studentId,
                    IsCompleted = _context.LessonProgresses
                        .Any(p => p.LessonId == l.LessonId && p.StudentId == studentId && p.IsCompleted),
                    CompletedAt = _context.LessonProgresses
                        .Where(p => p.LessonId == l.LessonId && p.StudentId == studentId)
                        .Select(p => p.CompletedAt)
                        .FirstOrDefault()
                })
                .ToListAsync();
        }
    }
}
