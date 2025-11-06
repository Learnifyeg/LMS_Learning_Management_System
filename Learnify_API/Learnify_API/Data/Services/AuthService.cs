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
        public async Task<ServiceResponse<string>> InstructorRegisterAsync(InstructorRegisterRequest req)
        {
            var response = new ServiceResponse<string>();

            try
            {
                //  Check if email exists
                if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                {
                    response.Success = false;
                    response.ErrorMessage = "Email already registered.";
                    return response;
                }

                // Generate verification code
                var verificationCode = new Random().Next(100000, 999999).ToString();

                // Create user
                var instructor_user = new User
                {
                    FullName = req.FullName,
                    Email = req.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                    Role = "instructor",
                    ProfileImage = req.ProfileImage,
                    VerificationCode = verificationCode,
                    VerificationExpiresAt = DateTime.Now.AddMinutes(10),
                    IsApproved = false // ⛔ must wait for admin approval
                };

                _context.Users.Add(instructor_user);
                await _context.SaveChangesAsync();

                // 🧩 Create Instructor record
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
                });

                //  Create Instructor Tab Content
                var instructorTabContent = new InstructorTabContent
                {
                    AboutMe = req.BIO ?? "Passionate about sharing knowledge and empowering learners.",
                    Courses = new List<CourseTab>
                        {
                            new CourseTab { CourseName = "None yet", Progress = "0%" }
                        },
                    Earnings = new List<EarningTab>
                        {
                            new EarningTab { monthly = 0, total = 0 }
                        },
                    Students = new List<StudentTab>
                        {
                            new StudentTab { name = "None yet", progress = 0 }
                        },
                    Certificates = ""
                };

                //  Create Profile
                var profile = new Profile
                {
                    UserId = instructor_user.UserId,
                    Role = "instructor",
                    User = new UserInfo
                    {
                        Name = instructor_user.FullName,
                        RoleTitle = "Instructor",
                        Avatar = req.ProfileImage ?? null
                    },
                    SocialLinks = new SocialLinks
                    {
                        Facebook = "",
                        Twitter = "",
                        LinkedIn = "",
                        Github = ""
                    },
                    About = req.BIO ?? "Welcome to Learnify! Start teaching and inspiring students.",
                    InstructorTabContent = instructorTabContent // attach instructor tabs
                };

                _context.profiles.Add(profile);
                await _context.SaveChangesAsync();

                // ✅ You can later send an email with the verification code
                // await _emailService.SendEmailAsync(req.Email, "Learnify Verification Code", $"<h3>Your code is:</h3><h2>{verificationCode}</h2>");

                response.Data = "Instructor registered successfully. Please wait for admin approval before logging in.";
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return response;
            }
        }


        // 2 Student Register
        public async Task<ServiceResponse<string>> StudentRegisterAsync(StudentRegisterRequest req)
        {
            var response = new ServiceResponse<string>();

            try
            {
                //  Check if email exists
                if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                {
                    response.Success = false;
                    response.ErrorMessage = "Email already registered.";
                    return response;
                }

                //  Generate verification code
                var verificationCode = new Random().Next(100000, 999999).ToString();

                //  Create user
                var student_user = new User
                {
                    FullName = req.FullName,
                    Email = req.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                    Role = "student",
                    ProfileImage = req.ProfileImage,
                    VerificationCode = verificationCode,
                    VerificationExpiresAt = DateTime.Now.AddMinutes(10),
                    IsApproved = true //  students are auto-approved
                };

                _context.Users.Add(student_user);
                await _context.SaveChangesAsync();

                //  Create Student record
                _context.Students.Add(new Student
                {
                    StudentId = student_user.UserId,
                    EnrollmentNo = "ENR" + new Random().Next(1000, 9999),
                    Phone = req.Phone,
                    Address = req.Address,
                    Country = req.Country,
                    Gender = req.Gender,
                    University = req.University,
                    Major = req.Major,
                    EducationLevel = req.EducationLevel
                });

                //  Create Student Tab Content
                var studentTabContent = new StudentTabContent
                {
                    AboutMe = req.About ?? "Passionate student eager to learn and explore new technologies.",
                    Enrollments = new List<EnrollmentTab>
            {
                new EnrollmentTab { CourseCount = 0, LastCourseJoined = "None" }
            },
                    Progress = new List<ProgressTab>
            {
                new ProgressTab { CompletedCourses = 0, OngoingCourses = 0 }
            },
                    Achievements = new List<AchievementTab>
            {
                new AchievementTab { Title = "Account Created", Date = DateTime.Now.ToString("yyyy-MM-dd") }
            }
                };

                //  Create Profile
                var profile = new Profile
                {
                    UserId = student_user.UserId,
                    Role = "student",
                    User = new UserInfo
                    {
                        Name = student_user.FullName,
                        RoleTitle = "Student",
                        Avatar = req.ProfileImage ?? null
                    },
                    SocialLinks = new SocialLinks
                    {
                        Facebook = "",
                        Twitter = "",
                        LinkedIn = "",
                        Github = ""
                    },
                    About = req.About ?? "Welcome to Learnify! Start exploring new courses today.",
                    StudentTabContent = studentTabContent //  link student tab content
                };

                _context.profiles.Add(profile);
                await _context.SaveChangesAsync();

                //  Optional: send verification code via email here

                response.Data = "Student registered successfully. Verification code sent to email.";
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return response;
            }
        }
        // 3 Admi Register
        public async Task<ServiceResponse<string>> AdminRegisterAsync(AdminRegisterRequest req)
        {
            var response = new ServiceResponse<string>();

            try
            {
                // 1️⃣ Check if email already exists
                if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                {
                    response.Success = false;
                    response.ErrorMessage = "Email already exists.";
                    return response;
                }

                // 2️⃣ Create User
                var user = new User
                {
                    FullName = req.FullName,
                    Email = req.Email,
                    Role = "admin", // keep lowercase for consistency
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                    CreatedAt = DateTime.Now,
                    IsApproved = true //  students are auto-approved
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync(); // Save to get UserId

                // 3️⃣ Create Admin record
                var admin = new Admin
                {
                    AdminId = user.UserId, // FK = UserId
                    Department = req.Department,
                    RoleLevel = req.RoleLevel ?? "Moderator",
                    User = user
                };

                await _context.Admins.AddAsync(admin);
                await _context.SaveChangesAsync(); //  Save before creating profile

                // 4️⃣ Create Admin Profile with initial tab data
                var tabContent = new AdminTabContent
                {
                    AboutMe = req.About ?? "Ensuring the platform runs smoothly and securely...",
                    UserManagement = new List<UserManagementTab>
                    {
                        new UserManagementTab { TotalStudents = 0, TotalInstructors = 0 }
                    },
                    Reports = new List<ReportTab>
                    {
                        new ReportTab { Type = "Monthly Analytics", Generated = DateTime.Now.ToString("yyyy-MM-dd") }
                    },
                    SystemLogs = new List<SystemLogTab>
                    {
                        new SystemLogTab { Event = "Account Created", Time = "Just now" }
                    }
                };

                var profile = new Profile
                {
                    UserId = user.UserId,
                    Role = "admin",
                    User = new UserInfo
                    {
                        Name = user.FullName,
                        RoleTitle = "Platform Administrator",
                        //Avatar = req.ProfileImage ?? null
                    },
                    SocialLinks = new SocialLinks
                    {
                        Facebook = req.Facebook ?? "",
                        Twitter = req.Twitter ?? "",
                        LinkedIn = req.LinkedIn ?? "",
                        Github = req.GitHub ?? ""
                    },
                    About = req.About ?? "Admin account created successfully.",
                    AdminTabContent = tabContent // ✅ link admin tab content
                };

                await _context.profiles.AddAsync(profile);
                await _context.SaveChangesAsync();

                // 5️⃣ Success response
                response.Success = true;
                response.Data = "Admin registered successfully!";
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return response;
            }
        }


        // 2️⃣ VERIFY EMAIL
        public async Task<ServiceResponse<string>> VerifyEmailAsync(VerifyEmailRequest req)
        {
            var response = new ServiceResponse<string>();

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
                if (user == null)
                {
                    response.Success = false;
                    response.ErrorMessage = "User not found.";
                    return response;
                }

                if (user.VerificationCode != req.Code || user.VerificationExpiresAt < DateTime.Now)
                {
                    response.Success = false;
                    response.ErrorMessage = "Invalid or expired code.";
                    return response;
                }

                user.IsEmailVerified = true;
                user.VerificationCode = null;
                user.VerificationExpiresAt = null;
                await _context.SaveChangesAsync();

                response.Data = "Email verified successfully!";
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return response;
            }
        }


        // 3️⃣ LOGIN
        public async Task<ServiceResponse<AuthResponse>> LoginAsync(LoginRequest req)
        {
            var response = new ServiceResponse<AuthResponse>();
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
                if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                {
                    response.Success = false;
                    response.ErrorMessage = "Invalid email or password.";
                    return response;
                }
                if (!user.IsApproved)
                {
                    response.Success = false;
                    response.ErrorMessage = "Your account is awaiting admin approval.";
                    return response;
                }

                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiresAt = DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:RefreshTokenValidityMins"]));
                await _context.SaveChangesAsync();

                var unreadNotificationCount = await _context.Notifications
                    .CountAsync(n => n.ReceiverEmail == user.Email && !n.IsRead);

                var expiresInMinutes = double.Parse(_config["Jwt:TokenValidityMins"]);

                response.Data = new AuthResponse
                {
                    Token = token,
                    ExpiresIn = (int)(expiresInMinutes * 60),
                    RefreshToken = refreshToken,
                    User = new
                    {
                        user.UserId,
                        user.FullName,
                        user.Email,
                        user.Role,
                        NotificationCount = unreadNotificationCount
                    }
                };

                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = ex.Message;
                return response;
            }
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

        // Get current logged-in user info from JWT
        public async Task<AuthUserInfoDTO?> GetUserProfileAsync(ClaimsPrincipal userClaims)
        {
            var userId = userClaims.FindFirst("userId")?.Value;
            if (userId == null) return null;

            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.UserId.ToString() == userId);

            if (user == null) return null;

            var dto = new AuthUserInfoDTO
            {
                Id = user.UserId.ToString(),
                FullName = user.FullName ?? "",
                Email = user.Email,
                Role = user.Role,
                Image = user.ProfileImage ?? ""
            };

            return dto;
        }



    }
}
