using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Learnify.Data.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
        [MaxLength(50)]
        public string? Category { get; set; }

        public decimal Price { get; set; }

        public int InstructorId { get; set; }

        [ForeignKey("InstructorId")]
        public Instructor Instructor { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public ICollection<Lesson>? Lessons { get; set; }
        public ICollection<Enrollment>? Enrollments { get; set; }
        public ICollection<Quiz>? Quizzes { get; set; }
        //public ICollection<LiveSession>? LiveSessions { get; set; }
        //public ICollection<Payment>? Payments { get; set; }
        public ICollection<Certificate>? Certificates { get; set; }
    }
}
