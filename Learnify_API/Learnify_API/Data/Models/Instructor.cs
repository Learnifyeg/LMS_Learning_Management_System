using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Learnify.Data.Models
{
    public class Instructor
    {
        [Key, ForeignKey("User")]
        public int InstructorId { get; set; }

        [MaxLength(100)]
        public string? Specialization { get; set; }

        public int Experience { get; set; }

        public string? Bio { get; set; }

        // Navigation
        public User User { get; set; } = null!;
        public ICollection<Course>? Courses { get; set; }
        //public ICollection<LiveSession>? LiveSessions { get; set; }
        public ICollection<InstructorPayout>? InstructorPayouts { get; set; }
    }
}
