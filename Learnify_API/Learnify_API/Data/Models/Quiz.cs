using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Learnify.Data.Models
{
    public class Quiz
    {
        [Key]
        public int QuizId { get; set; }

        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public int TotalMarks { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Question>? Questions { get; set; }
        //public ICollection<QuizResult>? QuizResults { get; set; }
    }
}
