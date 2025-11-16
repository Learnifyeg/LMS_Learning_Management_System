using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Student
    {
        [Key, ForeignKey("User")]
        public int StudentId { get; set; }

        [Required, MaxLength(50)]
        public string EnrollmentNo { get; set; } = string.Empty;

        public decimal? GPA { get; set; }

        [MaxLength(50)]
        public string? Department { get; set; }

        ////  Added Columns
        //[MaxLength(255)]
        //public string? Title { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }

        [MaxLength(100)]
        public string? University { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        [MaxLength(255)]
        public string? LinkedIn { get; set; }

        [MaxLength(255)]
        public string? GitHub { get; set; }

        [MaxLength(255)]
        public string? Facebook { get; set; }

        [MaxLength(255)]
        public string? Twitter { get; set; }

        [MaxLength(255)]
        public string? Image { get; set; }
        public string? EducationLevel { get; set; }
        public string? Major { get; set; }

        // Navigation
        public User User { get; set; } = null!;
        public ICollection<Enrollment>? Enrollments { get; set; }

        public ICollection<SavedCourse>? SavedCourses { get; set; }
        public ICollection<Certificate>? Certificates { get; set; }
        //public ICollection<FinalProject>? FinalProjects { get; set; }
        //public ICollection<Payment>? Payments { get; set; }
        //public ICollection<LessonProgress>? LessonProgresses { get; set; }
        //public ICollection<QuizResult>? QuizResults { get; set; }
        //public ICollection<StudentAnswer>? StudentAnswers { get; set; }
    }
}
