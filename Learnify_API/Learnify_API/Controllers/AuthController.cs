using Learnify_API.Data.DTO;
using Learnify_API.Data.Models;
using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserManager<AppUser> _userManager;

        public AuthController(AuthService authService, UserManager<AppUser> userManager)
        {
            _authService = authService;
            _userManager = userManager;
        }

        [HttpPost("instructor-register")]
        public async Task<IActionResult> InstructorRegister(InstructorRegisterRequest req)
        {
            var new_instructor = await _authService.InstructorRegisterAsync(req);
            return Ok(new { new_instructor });
        }

        [HttpPost("student-register")]
        public async Task<IActionResult> StudentRegister(StudentRegisterRequest req)
        {
            var new_student = await _authService.StudentRegisterAsync(req);
            return Ok(new { new_student });
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

