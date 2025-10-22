using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Learnify.Data.Models
{
    public class Lesson
    {
        [Key]
        public int LessonId { get; set; }

        public int CourseId { get; set; }

        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? VideoUrl { get; set; }

        public int Order { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        //public ICollection<LessonProgress>? LessonProgresses { get; set; }
    }
}
