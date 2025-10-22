using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Learnify.Data.Models
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }

        public int QuizId { get; set; }
        [ForeignKey("QuizId")]
        public Quiz Quiz { get; set; } = null!;

        [Required]
        public string QuestionText { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? OptionA { get; set; }
        [MaxLength(255)]
        public string? OptionB { get; set; }
        [MaxLength(255)]
        public string? OptionC { get; set; }
        [MaxLength(255)]
        public string? OptionD { get; set; }

        [Required]
        public char CorrectOption { get; set; } // A, B, C, D
    }
}
