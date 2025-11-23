using Microsoft.AspNetCore.Identity;

namespace Learnify_API.Data.Models
{
    public class AppUser : IdentityUser
    {
        public string Role { get; set; } = "Student";
        public string FullName { get; set; } = string.Empty;

    }
}
