//using Learnify_API.Data;
//using Learnify_API.Data.DTO;
//using Learnify_API.Data.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Learnify_API.Services
//{
//    public class NotificationService : INotificationService
//    {
//        private readonly AppDbContext _context;

//        public NotificationService(AppDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<NotificationReadDTO> CreateNotificationAsync(NotificationCreateDTO dto)
//        {
//            //  Check if receiver exists
//            var receiver = await _context.Users
//                .FirstOrDefaultAsync(u => u.Email == dto.ReceiverEmail);

//            if (receiver == null)
//                throw new Exception($"Receiver with email {dto.ReceiverEmail} does not exist.");

//            //  Get sender
//            var sender = await _context.Users
//                .FirstOrDefaultAsync(u => u.UserId == dto.SenderId);

//            if (sender == null)
//                throw new Exception($"Sender with ID {dto.SenderId} does not exist.");

//            //  Create notification
//            //var notification = new Notification
//            //{
//            //    SenderId = dto.SenderId,
//            //    ReceiverEmail = dto.ReceiverEmail,
//            //    Title = dto.Title,
//            //    Message = dto.Message,
//            //    Type = dto.Type,
//            //    CreatedAt = DateTime.UtcNow
//            //};

//            //_context.Notifications.Add(notification);
//            //await _context.SaveChangesAsync();

//            ////  Return response DTO
//            //return new NotificationReadDTO
//            //{
//            //    NotificationId = notification.NotificationId,
//            //    Title = notification.Title,
//            //    Message = notification.Message,
//            //    Type = notification.Type,
//            //    IsRead = notification.IsRead,
//            //    CreatedAt = notification.CreatedAt,
//            //    ReadAt = notification.ReadAt,
//            //    ReceiverEmail = notification.ReceiverEmail,
//            //    SenderId = notification.SenderId ?? 0,
//            //    SenderName = sender.FullName,
//            //    SenderEmail = sender.Email
//            //};
//        }

//        // Get notifications for one user
//        public async Task<(IEnumerable<NotificationReadDTO> Notifications, int UnreadCount)> GetUserNotificationsAsync(string receiverEmail)
//        {
//            //  Count unread notifications
//            //var unreadNotificationCount = await _context.Notifications
//            //    .CountAsync(n => n.ReceiverEmail == receiverEmail && n.IsRead == false);

//            ////  Get all notifications for the user
//            //var notifications = await _context.Notifications
//            //    .Where(n => n.ReceiverEmail == receiverEmail)
//            //    .OrderByDescending(n => n.CreatedAt)
//            //    .Select(n => new NotificationReadDTO
//            //    {
//            //        NotificationId = n.NotificationId,
//            //        Title = n.Title,
//            //        Message = n.Message,
//            //        Type = n.Type,
//            //        IsRead = n.IsRead,
//            //        CreatedAt = n.CreatedAt,
//            //        ReadAt = n.ReadAt,
//            //        ReceiverEmail = n.ReceiverEmail,

//            //        // Sender info
//            //        SenderId = n.SenderId ?? 0,
//            //        SenderName = n.Sender != null ? n.Sender.FullName : "System",
//            //        SenderEmail = n.Sender != null ? n.Sender.Email : "system@learnify.com"
//            //    })
//            //    .ToListAsync();

//            // Return both notifications and unread count

//            // If no notifications → return empty
//        //    if (!notifications.Any())
//        //    {
//        //        return (Enumerable.Empty<NotificationReadDTO>(), 0);
//        //    }

//        //    return (notifications, unreadNotificationCount);
//        //}

//        //// Mark notification as read
//        //public async Task<bool> MarkAsReadAsync(int notificationId)
//        //{
//        //    var notification = await _context.Notifications.FindAsync(notificationId);
//        //    if (notification == null)
//        //        return false;

//        //    notification.IsRead = true;
//        //    notification.ReadAt = DateTime.Now;
//        //    await _context.SaveChangesAsync();

//        //    return true;
//        //}

//        //// Delete notification
//        //public async Task<bool> DeleteNotificationAsync(int id)
//        //{
//        //    var notification = await _context.Notifications.FindAsync(id);
//        //    if (notification == null)
//        //        return false;

//        //    _context.Notifications.Remove(notification);
//        //    await _context.SaveChangesAsync();
//        //    return true;
//        //}

//    }
//}
