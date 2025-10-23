using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Admin
    {
        [Key, ForeignKey("User")]
        public int AdminId { get; set; }

        [MaxLength(50)]
        public string? Department { get; set; }

        [MaxLength(50)]
        public string RoleLevel { get; set; } = "Moderator"; // or SuperAdmin

        public User User { get; set; } = null!;
    }
}
