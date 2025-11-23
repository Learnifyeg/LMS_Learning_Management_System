namespace Learnify_API.Data.ViewModels
{
    public class QuizVM
    {
        public int Id { get; set; }           // QuizId
        public int CourseId { get; set; }     // CourseId
<<<<<<< HEAD
        public int LessonId { get; set; }     // LessonId
=======
>>>>>>> bb96b48a14984e482e8fddc936582014c3a89d05
        public string Title { get; set; } = string.Empty;
        public int Duration { get; set; }     // seconds
        public int PassingScore { get; set; }
        public int TotalMarks { get; set; }
        public int TotalQuestions { get; set; }
        public string QuestionsEndpoint { get; set; } = string.Empty;
        public string Posted { get; set; } = string.Empty; // e.g., "5 days ago"
    }
}
