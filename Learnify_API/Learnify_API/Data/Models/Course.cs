using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; }

        public decimal Price { get; set; }

        public int InstructorId { get; set; }

        [ForeignKey("InstructorId")]
        public Instructor Instructor { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        //  New fields
        public string? Views { get; set; } = "0 views";
        public double Rating { get; set; } = 0;
        public string? Hours { get; set; } = "0 hours";
        public string? Tag { get; set; }
        public string? Image { get; set; } = "/images/default-course.webp";
        public int StudentsEnrolled { get; set; } = 0;
        public bool CertificateIncluded { get; set; } = false;
        public string? Duration { get; set; } = "0 hours";
        public string? Posted { get; set; }

        public bool IsApproved { get; set; } = false;

        // Navigation
        public ICollection<Lesson>? Lessons { get; set; }
        public ICollection<Enrollment>? Enrollments { get; set; }
        public ICollection<Quiz>? Quizzes { get; set; }
        public ICollection<Certificate>? Certificates { get; set; }
    }
}
