using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Learnify.Data.Models
{
    public class InstructorPayout
    {
        [Key]
        public int PayoutId { get; set; }

        public int InstructorId { get; set; }
        [ForeignKey("InstructorId")]
        public Instructor Instructor { get; set; } = null!;

        public int PaymentId { get; set; }
        //[ForeignKey("PaymentId")]
        //public Payment Payment { get; set; } = null!;

        public decimal Amount { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending";

        public DateTime? PaidAt { get; set; }
    }
}
