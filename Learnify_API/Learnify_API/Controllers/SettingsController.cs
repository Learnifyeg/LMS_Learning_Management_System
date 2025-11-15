using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly UserSettingsService _settingsService;

        public SettingsController(UserSettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        // ==================== GET USER SETTINGS ====================
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserSettingsVM?>> GetUserSettings(int userId)
        {
            var settings = await _settingsService.GetUserSettingsAsync(userId);
            if (settings == null) return NotFound(new { Message = "User not found" });
            return Ok(settings);
        }

        // ==================== UPDATE USER SETTINGS ====================
        [HttpPut("{userId}")]
        public async Task<ActionResult<UserSettingsVM?>> UpdateUserSettings(int userId, [FromBody] UserSettingsVM vm)
        {
            var updated = await _settingsService.UpdateUserSettingsAsync(userId, vm);
            if (updated == null) return NotFound(new { Message = "User not found" });
            return Ok(updated);
        }
    }
}
