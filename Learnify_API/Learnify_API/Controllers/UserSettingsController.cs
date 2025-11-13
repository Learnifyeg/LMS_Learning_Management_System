using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Mvc;

[ApiController]
<<<<<<< HEAD
[Route("userSetting")]
=======
[Route("api/user")]
>>>>>>> f7f5d4ca271a096adc4b4b1d8cfce39ee6c3617a
public class UserSettingsController : ControllerBase
{
    private readonly UserSettingsService _service;

    public UserSettingsController(UserSettingsService service)
    {
        _service = service;
    }

    // GET /api/user/settings/{userId}
    [HttpGet("settings/{userId}")]
    public async Task<IActionResult> GetSettings(int userId)  // <-- int بدل string
    {
        var settings = await _service.GetSettingsAsync(userId);
        if (settings == null) return NotFound();
        return Ok(settings);
    }

    // POST /api/user/settings/{userId}
    [HttpPost("settings/{userId}")]
    public async Task<IActionResult> UpdateSettings(int userId, [FromBody] UserSettingsViewModel model)
    {
        var success = await _service.UpdateSettingsAsync(userId, model);
        if (!success) return NotFound();
        return Ok();
    }
}
