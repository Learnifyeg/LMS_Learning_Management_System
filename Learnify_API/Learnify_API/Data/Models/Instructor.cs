using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Instructor
    {
        [Key, ForeignKey("User")]
        public int InstructorId { get; set; }

        [MaxLength(100)]
        public string? Specialization { get; set; }
        public string? Phone { get; set; } = null;
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? Gender { get; set; }

        public int? Experience { get; set; } = 0;

        public string? Bio { get; set; }

        // Navigation
        public User User { get; set; } = null!;
        public ICollection<Course>? Courses { get; set; }
        //public ICollection<LiveSession>? LiveSessions { get; set; }
        public ICollection<InstructorPayout>? InstructorPayouts { get; set; }
    }
}
