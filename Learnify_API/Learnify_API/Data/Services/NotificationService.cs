using Learnify_API.Data;
using Learnify_API.Data.DTO;
using Learnify_API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _context;

        public NotificationService(AppDbContext context)
        {
            _context = context;
        }

        //  Create notification
        public async Task<NotificationReadDTO> CreateNotificationAsync(NotificationCreateDTO dto)
        {
            //  Check if Receiver exists
            var receiverExists = await _context.Users.AnyAsync(u => u.UserId == dto.ReceiverId);
            if (!receiverExists)
                throw new Exception($"Receiver with ID {dto.ReceiverId} does not exist.");

            // (Optional) Check if Sender exists
            if (dto.SenderId != 0)
            {
                var senderExists = await _context.Users.AnyAsync(u => u.UserId == dto.SenderId);
                if (!senderExists)
                    throw new Exception($"Sender with ID {dto.SenderId} does not exist.");
            }

            var notification = new Notification
            {
                SenderId = dto.SenderId,
                ReceiverId = dto.ReceiverId,
                Title = dto.Title,
                Message = dto.Message,
                Type = dto.Type,
                CreatedAt = DateTime.Now
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return new NotificationReadDTO
            {
                NotificationId = notification.NotificationId,
                Title = notification.Title,
                Message = notification.Message,
                Type = notification.Type,
                IsRead = notification.IsRead,
                CreatedAt = notification.CreatedAt,
                SenderId = notification.SenderId ?? 0,
                ReceiverId = notification.ReceiverId
            };
        }

        //  Get notifications for one user
        public async Task<IEnumerable<NotificationReadDTO>> GetUserNotificationsAsync(int receiverId)
        {
            return await _context.Notifications
                .Where(n => n.ReceiverId == receiverId)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationReadDTO
                {
                    NotificationId = n.NotificationId,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt,
                    ReadAt = n.ReadAt,
                    SenderId = n.SenderId ?? 0,
                    ReceiverId = n.ReceiverId
                })
                .ToListAsync();
        }

        // ✅ Mark notification as read
        public async Task<bool> MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return false;

            notification.IsRead = true;
            notification.ReadAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
