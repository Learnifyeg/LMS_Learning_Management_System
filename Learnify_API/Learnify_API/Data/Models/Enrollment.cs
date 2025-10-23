using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Enrollment
    {
        [Key]
        public int EnrollmentId { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; } = null!;

        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        public DateTime EnrollmentDate { get; set; } = DateTime.Now;
        public decimal Progress { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
