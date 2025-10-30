namespace Learnify_API.Data.DTO
{
    public class NotificationCreateDTO
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
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
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
    }
}
