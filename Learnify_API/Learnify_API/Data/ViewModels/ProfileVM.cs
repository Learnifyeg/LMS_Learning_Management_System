using Learnify_API.Data.Models;

namespace Learnify_API.Data.ViewModels
{
    public class ProfileVM
    {
        public string Role { get; set; }
        public UserInfo User { get; set; }
        public SocialLinks SocialLinks { get; set; }
        public List<Stat> Stats { get; set; }
        public string About { get; set; }
        public TabContent TabContent { get; set; }
        public List<ActionButton> Actions { get; set; }
    }
    public class UserInfo
    {
        public string Name { get; set; }
        public IFormFile? Avatar { get; set; }
        public string RoleTitle { get; set; }
    }
}
