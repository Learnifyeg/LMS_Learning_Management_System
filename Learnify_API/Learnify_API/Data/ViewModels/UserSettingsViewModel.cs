namespace Learnify_API.Data.ViewModels
{
    public class UserSettingsViewModel
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Headline { get; set; } = "";
        public string About { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public bool Newsletter { get; set; } = true;
    }
}
