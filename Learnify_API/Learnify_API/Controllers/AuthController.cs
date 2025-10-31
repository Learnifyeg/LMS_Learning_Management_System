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
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;

        public AuthController(AuthService authService, UserManager<AppUser> userManager, IConfiguration config)
        {
            _authService = authService;
            _userManager = userManager;
            _config = config;
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
            if (result == null)
                return Unauthorized("Invalid credentials.");

            var refreshTokenExpiryMinutes = double.Parse(_config["Jwt:RefreshTokenValidityMins"]);

            //  Clear old cookie first
            Response.Cookies.Delete("refreshToken");

            //  Then add new one
            Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Path = "/",
                Expires = DateTime.UtcNow.AddMinutes(refreshTokenExpiryMinutes)
            });

            return Ok(new AuthResponse
            {
                Token = result.Token,
                ExpiresIn = result.ExpiresIn,
                RefreshToken = result.RefreshToken,
                User = result.User
            });
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


        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            // 1️⃣ Get refresh token from cookie
            if (!Request.Cookies.TryGetValue("refreshToken", out string refreshToken))
                return Unauthorized("No refresh token found");

            // 2️⃣ Use your service to refresh the token
            var result = await _authService.RefreshAccessTokenAsync(refreshToken);
            if (result == null)
                return Unauthorized("Invalid or expired refresh token");

            var refreshTokenExpiryMinutes = double.Parse(_config["Jwt:RefreshTokenValidityMins"]);
            // 3️⃣ Update cookie with new refresh token (rotating)
            Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // ❌ Only for localhost (set to true in production)
                //SameSite = SameSiteMode.Strict,
                SameSite = SameSiteMode.None, // ✅ required for cross-site cookies
                Expires = DateTime.UtcNow.AddMinutes(refreshTokenExpiryMinutes)
            });

            //4️⃣ Return new access token
            return Ok(new
            {
                Token = result.Token,
                ExpiresIn = result.ExpiresIn,
                //RefreshToken = result.RefreshToken
            });
        }



    }
}

