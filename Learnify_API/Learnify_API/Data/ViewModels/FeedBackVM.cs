namespace Learnify_API.Data.ViewModels
{
    public class FeedBackVM
    {
        public string Email { get; set; }
        public string Massage { get; set; }
        public IFormFile? image { get; set; }
    }
}
