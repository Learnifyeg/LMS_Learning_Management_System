namespace Learnify_API.Data.ViewModels
{
    public class QuizQuestionsVM
    {
        public int QuizId { get; set; }
        public List<QuestionVM> Questions { get; set; } = new();
    }

}
