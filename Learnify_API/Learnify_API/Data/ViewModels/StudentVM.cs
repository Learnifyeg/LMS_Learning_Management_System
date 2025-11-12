namespace Learnify_API.Data.ViewModels
{
    public class StudentVM
    {
        public string Image { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = "Full Stack Web Student";
        public string University { get; set; } = "Cairo University";
        public string Country { get; set; } = "Egypt";
        public string Email { get; set; } = string.Empty;
        public string LinkedIn { get; set; } = "https://linkedin.com/in";
        public string GitHub { get; set; } = "https://github.com";
        public string Facebook { get; set; } = "https://facebook.com";
        public string Twitter { get; set; } = "https://twitter.com";
        public string Id { get; set; } = string.Empty;
        public List<string> Courses { get; set; } = new List<string>();
    }

}
