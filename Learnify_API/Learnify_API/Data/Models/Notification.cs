//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace Learnify_API.Data.Models
//{
//    public class Notification
//    {
//        [Key]
//        public int NotificationId { get; set; }

//        [Required, EmailAddress, MaxLength(100)]
//        public string ReceiverEmail { get; set; } = string.Empty;

//        public int? SenderId { get; set; }

//        [ForeignKey(nameof(SenderId))]
//        public User? Sender { get; set; }

//        [Required, MaxLength(200)]
//        public string Title { get; set; } = string.Empty;

//        public string? Message { get; set; }

//        [MaxLength(50)]
//        public string? Type { get; set; }

//        public bool IsRead { get; set; } = false;
//        public DateTime CreatedAt { get; set; } = DateTime.Now;
//        public DateTime? ReadAt { get; set; }
//    }
//}
