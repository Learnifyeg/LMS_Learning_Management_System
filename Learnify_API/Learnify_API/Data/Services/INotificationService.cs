using Learnify_API.Data.DTO;

namespace Learnify_API.Services
{
    public interface INotificationService
    {
        // Create a new notification
        Task<NotificationReadDTO> CreateNotificationAsync(NotificationCreateDTO dto);

        //  Changed parameter type from int to string
        Task<IEnumerable<NotificationReadDTO>> GetUserNotificationsAsync(string receiverEmail);

        // Mark notification as read
        Task<bool> MarkAsReadAsync(int notificationId);
        Task<bool> DeleteNotificationAsync(int id);
    }
}
