namespace Learnify_API.Data.ViewModels
{
    public class QuestionVM
    {
        public string Id { get; set; } = string.Empty;              // "1", "php-dev", ...
        public string Text { get; set; } = string.Empty;            // QuestionText
        public List<QuestionOptionVM> Options { get; set; } = new();
        public string Answer { get; set; } = string.Empty;          // "a", "b", ...
    }

}
