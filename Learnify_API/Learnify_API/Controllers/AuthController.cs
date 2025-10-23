using Learnify_API.Data.DTO;
using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest req)
        {
            var message = await _authService.RegisterAsync(req);
            return Ok(new { message });
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail(VerifyEmailRequest req)
        {
            var message = await _authService.VerifyEmailAsync(req);
            return Ok(new { message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest req)
        {
            var result = await _authService.LoginAsync(req);
            if (result == null) return Unauthorized("Invalid credentials.");
            return Ok(result);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest req)
        {
            var message = await _authService.ForgotPasswordAsync(req);
            return Ok(new { message });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest req)
        {
            var message = await _authService.ResetPasswordAsync(req);
            return Ok(new { message });
        }
    }
}

