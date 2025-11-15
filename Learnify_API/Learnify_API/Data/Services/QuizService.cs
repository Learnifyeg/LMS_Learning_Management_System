using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Data.Services
{
    public class QuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        // ================== GET ALL ==================
        public async Task<List<QuizVM>> GetAllQuizzesAsync()
        {
            var quizzes = await _context.Quizzes
                .Include(q => q.Questions)
                .ToListAsync();

            return quizzes.Select(q => new QuizVM
            {
                Id = q.QuizId,
                LessonId = q.CourseId,
                Title = q.Title,
                Duration = q.Duration,           // دلوقتي بيجي من DB
                PassingScore = q.PassingScore,   // دلوقتي بيجي من DB
                TotalQuestions = q.Questions?.Count ?? 0,
                QuestionsEndpoint = "questions",
                Posted = $"{(DateTime.Now - q.CreatedAt).Days} days ago"
            }).ToList();
        }

        // ================== GET BY ID ==================
        public async Task<QuizVM?> GetQuizByIdAsync(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .FirstOrDefaultAsync(q => q.QuizId == id);

            if (quiz == null) return null;

            return new QuizVM
            {
                Id = quiz.QuizId,
                LessonId = quiz.CourseId,
                Title = quiz.Title,
                Duration = quiz.Duration,
                PassingScore = quiz.PassingScore,
                TotalQuestions = quiz.Questions?.Count ?? 0,
                QuestionsEndpoint = "questions",
                Posted = $"{(DateTime.Now - quiz.CreatedAt).Days} days ago"
            };
        }

        // ================== CREATE ==================
        public async Task<QuizVM> CreateQuizAsync(QuizVM quizVM)
        {
            var quiz = new Quiz
            {
                CourseId = quizVM.LessonId,
                Title = quizVM.Title,
                Duration = quizVM.Duration,
                PassingScore = quizVM.PassingScore,
                CreatedAt = DateTime.Now
            };

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            // تحديث الـ VM بعد الإنشاء
            quizVM.Id = quiz.QuizId;
            quizVM.TotalQuestions = 0;
            quizVM.Posted = "0 days ago";
            quizVM.QuestionsEndpoint = "questions";

            return quizVM;
        }

        // ================== UPDATE ==================
        public async Task<QuizVM?> UpdateQuizAsync(int id, QuizVM quizVM)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null) return null;

            quiz.Title = quizVM.Title;
            quiz.CourseId = quizVM.LessonId;
            quiz.Duration = quizVM.Duration;
            quiz.PassingScore = quizVM.PassingScore;

            await _context.SaveChangesAsync();

            quizVM.Id = quiz.QuizId;
            return quizVM;
        }

        // ================== DELETE ==================
        public async Task<bool> DeleteQuizAsync(int id)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null) return false;

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
