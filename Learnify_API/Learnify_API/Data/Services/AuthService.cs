using Learnify_API.Data.DTO;
using Learnify_API.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Learnify_API.Data.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly EmailService _emailService;
        private readonly UserManager<AppUser> _userManager;

        public AuthService(AppDbContext context, IConfiguration config, EmailService emailService, UserManager<AppUser> userManager)
        {
            _context = context;
            _config = config;
            _emailService = emailService;
            _userManager = userManager;
        }

        // 1️ Instructor Register
        public async Task<string> InstructorRegisterAsync(InstructorRegisterRequest req)
        {
            if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                return "Email already registered.";

            var verificationCode = new Random().Next(100000, 999999).ToString();
            var App_User = new AppUser
            {
                UserName = req.FullName,
                Email = req.Email,
                Role = "instructor"
            };
            //IdentityResult result = await _userManager.CreateAsync(App_User, req.Password);
            //if (!result.Succeeded)
            //{
            //    return "User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description));
            //}
            //else
            //{

            var instructor_user = new User
            {
                FullName = req.FullName,
                Email = req.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                Role = "instructor",
                ProfileImage = req.ProfileImage,
                VerificationCode = verificationCode,
                VerificationExpiresAt = DateTime.Now.AddMinutes(10)
            };

            _context.Users.Add(instructor_user);
            await _context.SaveChangesAsync();
            _context.Instructors.Add(new Instructor
            {
                InstructorId = instructor_user.UserId,
                Specialization = req.Specialization,
                Phone = req.Phone,
                Address = req.Address,
                Country = req.Country,
                Gender = req.Gender,
                Experience = req.Years_Of_Experience,
                Bio = req.BIO
            }
                );
            await _context.SaveChangesAsync();
            //await _emailService.SendEmailAsync(req.Email, "Learnify Verification Code",
            //    $"<h3>Your Learnify verification code is:</h3><h2>{verificationCode}</h2>");

            return "Verification code sent to email.";
            //}
        }


        // 2 Student Register
        public async Task<string> StudentRegisterAsync(StudentRegisterRequest req)
        {
            if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                return "Email already registered.";

            var verificationCode = new Random().Next(100000, 999999).ToString();
            var App_User = new AppUser
            {
                UserName = req.FullName,
                Email = req.Email,
                Role = "admin"
            };
            //IdentityResult result = await _userManager.CreateAsync(App_User, req.Password);
            //if (!result.Succeeded)
            //{
            //    return "User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description));
            //}
            //else
            //{

            var student_user = new User
            {
                FullName = req.FullName,
                Email = req.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                Role = "admin",
                ProfileImage = req.ProfileImage,
                VerificationCode = verificationCode,
                VerificationExpiresAt = DateTime.Now.AddMinutes(10)
            };

            _context.Users.Add(student_user);
            await _context.SaveChangesAsync();

            _context.Students.Add(new Student
            {
                StudentId = student_user.UserId,
                EnrollmentNo = "ENR" + new Random().Next(1000, 9999).ToString(),
                Phone = req.Phone,
                Address = req.Address,
                Country = req.Country,
                Gender = req.Gender,
                University = req.University,
                Major = req.Major,
                EducationLevel = req.EducationLevel,

            }
            );
            await _context.SaveChangesAsync();
            //await _emailService.SendEmailAsync(req.Email, "Learnify Verification Code",
            //        $"<h3>Your Learnify verification code is:</h3><h2>{verificationCode}</h2>");

            return "Verification code sent to email.";
            //}
        }

        // 2️⃣ VERIFY EMAIL
        public async Task<string> VerifyEmailAsync(VerifyEmailRequest req)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
            if (user == null) return "User not found.";

            if (user.VerificationCode != req.Code || user.VerificationExpiresAt < DateTime.Now)
                return "Invalid or expired code.";

            user.IsEmailVerified = true;
            user.VerificationCode = null;
            user.VerificationExpiresAt = null;
            await _context.SaveChangesAsync();

            return "Email verified successfully!";
        }

        // 3️⃣ LOGIN
        public async Task<AuthResponse?> LoginAsync(LoginRequest req)
        {
            // Step 1: Find user and verify password
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                return null;

            // Step 2: Generate new JWT
            var token = GenerateJwtToken(user);

            // Step 3: Always generate and update refresh token
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiresAt = DateTime.UtcNow.AddMinutes(
                double.Parse(_config["Jwt:RefreshTokenValidityMins"])
            );

            await _context.SaveChangesAsync(); // no need for .Update()

            // Step 4: Return result
            var expiresInMinutes = double.Parse(_config["Jwt:TokenValidityMins"]);
            return new AuthResponse
            {
                Token = token,
                ExpiresIn = (int)(expiresInMinutes * 60),
                RefreshToken = refreshToken
            };
        }



        // 4️⃣ FORGOT PASSWORD
        public async Task<string> ForgotPasswordAsync(ForgotPasswordRequest req)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
            if (user == null)
                return "If that email exists, a reset code has been sent.";

            var resetCode = new Random().Next(100000, 999999).ToString();
            user.PasswordResetCode = resetCode;
            user.PasswordResetExpiresAt = DateTime.Now.AddMinutes(15);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(req.Email, "Password Reset Code",
                $"Your Learnify reset code is: <h2>{resetCode}</h2>");

            return "Password reset code sent.";
        }

        // 5️⃣ RESET PASSWORD
        public async Task<string> ResetPasswordAsync(ResetPasswordRequest req)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
            if (user == null) return "Invalid email.";

            if (user.PasswordResetCode != req.Code || user.PasswordResetExpiresAt < DateTime.Now)
                return "Invalid or expired reset code.";

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
            user.PasswordResetCode = null;
            user.PasswordResetExpiresAt = null;
            await _context.SaveChangesAsync();

            return "Password updated successfully.";
        }


        //  GenerateJwtToken
        private string GenerateJwtToken(User user)
        {
            // 1️⃣ Create the secret key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));

            // 2️⃣ Define the signing algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 3️⃣ Add claims — user data inside token
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("userId", user.UserId.ToString()),
                new Claim("role", user.Role)
            };

            // 4️⃣ Create the token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:TokenValidityMins"])), // ✅ use UTC
                signingCredentials: creds
            );

            // 5️⃣ Serialize token to string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //GenerateRefreshToken
        private string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }


        // RefreshAccessTokenAsync  
        public async Task<AuthResponse?> RefreshAccessTokenAsync(string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiresAt < DateTime.UtcNow)
                return null;

            // Generate new access token
            var newToken = GenerateJwtToken(user);

            // Generate new refresh token (rotating)
            var newRefreshToken = GenerateRefreshToken();
            //user.RefreshToken = newRefreshToken;
            //user.RefreshTokenExpiresAt = DateTime.UtcNow.AddMinutes(
            //        double.Parse(_config["Jwt:RefreshTokenValidityMins"])
            //    );
            await _context.SaveChangesAsync();

            var expiresInMinutes = double.Parse(_config["Jwt:TokenValidityMins"]);

            return new AuthResponse
            {
                Token = newToken,
                ExpiresIn = (int)(expiresInMinutes * 60),
                RefreshToken = newRefreshToken
            };
        }




    }
}
