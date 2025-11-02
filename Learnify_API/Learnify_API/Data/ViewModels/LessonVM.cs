namespace Learnify_API.Data.ViewModels
{
    public class CreateLessonRequest
    {
        public int CourseId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? VideoUrl { get; set; }
        public int? Order { get; set; }
    }

    public class UpdateLessonRequest
    {
        public string Title { get; set; } = string.Empty;
        public string? VideoUrl { get; set; }
        public int? Order { get; set; }
    }

    public class LessonVM
    {
        public int LessonId { get; set; }
        public int CourseId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? VideoUrl { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    // Progress tracking view model
    public class LessonProgressVM
    {
        public int LessonId { get; set; }
        public int StudentId { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
