using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class LessonProgress
    {
        [Key]
        public int ProgressId { get; set; }

        public int LessonId { get; set; }

        public int StudentId { get; set; }

        public bool IsCompleted { get; set; } = false;

        public DateTime? CompletedAt { get; set; }

        [ForeignKey("LessonId")]
        public Lesson Lesson { get; set; } = null!;
    }
}
