using System.ComponentModel.DataAnnotations;

namespace Learnify_API.Data.DTO
{
    public class InstructorRegisterRequest
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;

        //public string Role { get; set; } = "Instructor";

        // ✅ New fields for Instructor
        public string? ProfileImage { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? Gender { get; set; }
        public string? Specialization { get; set; }
        public int? Years_Of_Experience { get; set; } = 0;
        public string? BIO { get; set; }

    }

    public class StudentRegisterRequest
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;

        //public string Role { get; set; } = "Student";

        // New fields for Student
        public string? ProfileImage { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? Gender { get; set; }
        public string? EducationLevel { get; set; }
        public string? University { get; set; }
        public string? Major { get; set; }

    }


    public class VerifyEmailRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }

    // For refresh access token
    public class AuthResponse
    {
        public object? User { get; set; }
        public string Token { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
        public string? RefreshToken { get; set; }
    }

    public class RefreshTokenRequest
    {
        public string Token { get; set; } = string.Empty;
    }
}
