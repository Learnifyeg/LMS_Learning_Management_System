using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Quiz
    {
        [Key]
        public int QuizId { get; set; }

        public int CourseId { get; set; }
        public int LessonId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public int TotalMarks { get; set; }

        // ===== إضافات جديدة =====
        public int Duration { get; set; }      // بالثواني
        public int PassingScore { get; set; }  // نسبة النجاح

        public DateTime CreatedAt { get; set; } = DateTime.Now;


        public ICollection<Question>? Questions { get; set; }
        public int TotalQuestions { get; set; }
    }

}
