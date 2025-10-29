using System.ComponentModel.DataAnnotations;

namespace Learnify_API.Data.ViewModels
{
    public class UserVM
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        public string? Phone { get; set; }
        public string? ProfileImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsEmailVerified { get; set; }

        public string? Facebook { get; set; }
        public string? LinkedIn { get; set; }
        public string? GitHub { get; set; }
        public string? Twitter { get; set; }
    }
}
