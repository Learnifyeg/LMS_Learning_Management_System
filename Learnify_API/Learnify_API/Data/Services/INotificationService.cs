using Learnify_API.Data.DTO;

namespace Learnify_API.Services
{
    public interface INotificationService
    {
        Task<NotificationReadDTO> CreateNotificationAsync(NotificationCreateDTO dto);
        Task<IEnumerable<NotificationReadDTO>> GetUserNotificationsAsync(int receiverId);
        Task<bool> MarkAsReadAsync(int notificationId);
    }
}
