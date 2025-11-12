namespace Learnify_API.Data.DTO
{
    public class NotificationCreateDTO
    {
        public int SenderId { get; set; }

        // Use email instead of ReceiverId
        public string ReceiverEmail { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Message { get; set; }
        public string? Type { get; set; }

    }

    public class NotificationReadDTO
    {
        public int NotificationId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Message { get; set; }
        public string? Type { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }

        // Return ReceiverEmail instead of ID
        public string ReceiverEmail { get; set; } = string.Empty;

        // Added fields 👇
        public int SenderId { get; set; }
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
    }
}
