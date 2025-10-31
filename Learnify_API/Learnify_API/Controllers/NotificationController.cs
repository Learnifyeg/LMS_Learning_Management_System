using Learnify_API.Data.DTO;
using Learnify_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // Send a notification from one user to another
        [HttpPost("user-send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationCreateDTO dto)
        {
            if (dto.SenderId == 0 || string.IsNullOrWhiteSpace(dto.ReceiverEmail))
                return BadRequest("SenderId and ReceiverId are required.");

            var result = await _notificationService.CreateNotificationAsync(dto);
            return Ok(new
            {
                message = "Notification sent successfully.",
                data = result
            });
        }

        // ✅ Get all notifications for a specific user
        [HttpGet("user-receive/{receiverEmail}")]
        public async Task<IActionResult> GetNotificationsByUser(string receiverEmail)
        {
            var notifications = await _notificationService.GetUserNotificationsAsync(receiverEmail);

            if (notifications == null || !notifications.Any())
                return NotFound("No notifications found for this user.");

            return Ok(notifications);
        }

        // ✅ Mark a notification as read
        [HttpPut("user-read/{id}")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var result = await _notificationService.MarkAsReadAsync(id);
            if (!result)
                return NotFound("Notification not found.");

            return Ok(new { message = "Notification marked as read." });
        }

        // DELETE /Notification/{id}
        [HttpDelete("user-delete/{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var result = await _notificationService.DeleteNotificationAsync(id);
            if (!result)
                return NotFound("Notification not found.");

            return Ok(new { message = "Notification deleted successfully." });
        }

    }
}
