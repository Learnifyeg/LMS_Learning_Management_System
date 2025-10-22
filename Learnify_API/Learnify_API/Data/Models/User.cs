using System.ComponentModel.DataAnnotations;

namespace API_Learnify.Data.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Role { get; set; } = "Student"; // Student, Instructor, Admin

        [MaxLength(255)]
        public string? ProfileImage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public Student? Student { get; set; }
        public Instructor? Instructor { get; set; }
        public Admin? Admin { get; set; }
        public ICollection<Notification>? Notifications { get; set; }
        public ICollection<Log>? Logs { get; set; }
    }
}
