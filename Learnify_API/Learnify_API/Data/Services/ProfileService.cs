using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Data.Services
{
    public class ProfileService
    {
        public ProfileService(AppDbContext context)
        {

            _context = context;
        }
        private readonly AppDbContext _context;


        public async Task<bool> EditStudentProfileAsync(int studentId, EditStudentProfileVM model)
        {
            var student = await _context.Students
                .Include(s => s.User)
                //.Include(s => s.Profile)
                .FirstOrDefaultAsync(s => s.StudentId == studentId);

            if (student == null) return false;

            // --- Update User ---
            var user = student.User;
            user.FullName = model.Name;
            //if (model.Avatar != null && model.Avatar.Length > 0)
            //{
            //    using var ms = new MemoryStream();
            //    await model.Avatar.CopyToAsync(ms);
            //    user.ProfileImage = Convert.ToBase64String(ms.ToArray()); // store as string or byte[]
            //}

            // --- Update Student ---
            student.Phone = model.Phone;
            student.Address = model.Address;
            student.Gender = model.Gender;
            student.University = model.University;
            student.Country = model.Country;
            student.LinkedIn = model.LinkedIn;
            student.GitHub = model.GitHub;
            student.Facebook = model.Facebook;
            student.Twitter = model.Twitter;
            student.Image = model.Image;
            student.EducationLevel = model.EducationLevel;
            student.Major = model.Major;
            student.GPA = model.GPA;
            student.Department = model.Department;
            //student.User.Role = model.RoleTitle;

            // --- Update Profile ---
            var profile = await _context.profiles.FirstOrDefaultAsync(p => p.UserId == studentId);
            if (profile != null)
            {
                profile.About = model.About;
                profile.User.Name = model.Name;
                profile.User.RoleTitle = model.RoleTitle;

                profile.SocialLinks.Facebook = model.Facebook ?? "";
                profile.SocialLinks.Twitter = model.Twitter ?? "";
                profile.SocialLinks.LinkedIn = model.LinkedIn ?? "";
                profile.SocialLinks.Github = model.GitHub ?? "";
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EditInstructorProfileAsync(int instructorId, EditInstructorProfileVM model)
        {
            var instructor = await _context.Instructors
                .Include(i => i.User)
                .FirstOrDefaultAsync(i => i.InstructorId == instructorId);

            if (instructor == null) return false;

            // Update User info
            var user = instructor.User;
            user.FullName = model.Name;
            if (model.Avatar != null && model.Avatar.Length > 0)
            {
                using var ms = new MemoryStream();
                await model.Avatar.CopyToAsync(ms);
                user.ProfileImage = Convert.ToBase64String(ms.ToArray());
            }

            // Update Instructor fields
            instructor.Phone = model.Phone;
            instructor.Address = model.Address;
            instructor.Gender = model.Gender;
            instructor.Country = model.Country;
            instructor.Specialization = model.Specialization;

            // Update Profile
            var profile = await _context.profiles.FirstOrDefaultAsync(p => p.UserId == instructorId);
            if (profile != null)
            {
                profile.About = model.About;
                profile.User.Name = model.Name;
                profile.User.RoleTitle = model.RoleTitle;

                profile.SocialLinks.Facebook = model.Facebook ?? "";
                profile.SocialLinks.Twitter = model.Twitter ?? "";
                profile.SocialLinks.LinkedIn = model.LinkedIn ?? "";
                profile.SocialLinks.Github = model.GitHub ?? "";
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ProfileVM?> GetInstructorProfileAsync(int instructorId)
        {
            var instructor = await _context.Instructors
                .Include(i => i.User)
                .Include(i => i.Courses)
                    .ThenInclude(c => c.Enrollments)
                        .ThenInclude(e => e.Student)
                            .ThenInclude(s => s.User)
                .FirstOrDefaultAsync(i => i.InstructorId == instructorId);

            if (instructor == null) return null;

            var profile = await _context.profiles.FirstOrDefaultAsync(p => p.UserId == instructorId);
            if (profile == null) return null;

            // User info
            var userInfo = new UserInformationVM
            {
                Name = instructor.User.FullName,
                RoleTitle = "Course Author & Trainer",
                Avatar = null // or convert instructor.User.ProfileImage
            };

            // Social links
            var socialLinks = new SocialLinks
            {
                Facebook = profile.SocialLinks.Facebook,
                Twitter = profile.SocialLinks.Twitter,
                LinkedIn = profile.SocialLinks.LinkedIn,
                Github = profile.SocialLinks.Github
            };

            // Stats
            var stats = new List<Stat>
            {
                new Stat { Label = "Courses", Value = instructor.Courses?.Count ?? 0 },
                new Stat { Label = "Students", Value = instructor.Courses?.Sum(c => c.Enrollments?.Count ?? 0) ?? 0 },
                //new Stat { Label = "Earnings", Value = instructor.Courses?.Sum(c => c.Price * (c.Enrollments?.Count ?? 0)) ?? 0 }
            };

            // TabContent
            var tabContent = new InstructorTabContent
            {
                Courses = instructor.Courses?.Select(c => new CourseTab
                {
                    CourseName = c.Title,
                    Progress = $"{c.Enrollments?.Count ?? 0}" // optional, adjust if needed
                }).ToList() ?? new List<CourseTab>(),

                Earnings = new List<EarningTab>
                {
                    new EarningTab
                    {
                        monthly = 2500, // replace with real calculation if you have monthly data
                        total = stats.FirstOrDefault(s => s.Label == "Earnings")?.Value ?? 0
                    }
                },

                Students = instructor.Courses?.SelectMany(c => c.Enrollments ?? new List<Enrollment>())
                .Select(e => new StudentTab
                {
                    name = e.Student.User.FullName,
                    progress = e.Progress
                }).ToList() ?? new List<StudentTab>()
            };

            return new ProfileVM
            {
                Role = "instructor",
                User = userInfo,
                SocialLinks = socialLinks,
                Stats = stats,
                About = profile.About,
                InstructorTabContent = tabContent,
                StudentTabContent = null,
                AdminTabContent = null,
                Actions = new List<ActionButton>
                    {
                        new ActionButton { Label = "Edit Profile", Url = "/UserLayout/EditProfile" },
                        new ActionButton { Label = "Settings", Url = "/UserLayout/SettingPage" }
                    }

            };
        }

        public async Task<ProfileVM?> GetStudentProfileAsync(int studentId)
        {
            var student = await _context.Students
                .Include(s => s.User)
                .Include(s => s.Enrollments)
                    .ThenInclude(e => e.Course)
                .Include(s => s.Certificates)
                    .ThenInclude(c => c.Course)
                .FirstOrDefaultAsync(s => s.StudentId == studentId);

            if (student == null) return null;

            // User info
            var userInfo = new UserInformationVM
            {
                Name = student.User.FullName,
                RoleTitle = student.User.Role,
                Avatar = null // or convert student.Image to byte[]
            };

            // Social links
            var socialLinks = new SocialLinks
            {
                Facebook = student.Facebook ?? "",
                Twitter = student.Twitter ?? "",
                LinkedIn = student.LinkedIn ?? "",
                Github = student.GitHub ?? ""
            };

            // Stats
            var stats = new List<Stat>
              {
                  new Stat { Label = "Purchased", Value = student.Enrollments?.Count ?? 0 },
                  //new Stat { Label = "My Reviews", Value = 0 }, // populate dynamically if you have Reviews
                  new Stat { Label = "Certificates", Value = student.Certificates?.Count ?? 0 }
              };

            // Tabs and tab content
            var tabContent = new StudentTabContent
            {
                Courses = student.Enrollments?.Select(e => new CourseTab
                {
                    CourseName = e.Course?.Title ?? "Unknown",
                    Progress = $"{e.Progress}%"
                }).ToList() ?? new List<CourseTab>(),

                Certificates = string.Join(", ", student.Certificates?.Select(c => c.Course?.Title ?? "Unknown") ?? new List<string>()),
                Projects = new List<ProjectTab>() // optional if you add project info
            };

            // Actions
            var actions = new List<ActionButton>
              {
                  new ActionButton { Id = 1, Label = "Edit Profile", Url = "/UserLayout/EditProfile" },
                  new ActionButton { Id = 2, Label = "Settings", Url = "/UserLayout/SettingPage" }
              };

            var profile = _context.profiles.FirstOrDefault(p => p.UserId == studentId);
            if (profile == null)
                return null!;
            return new ProfileVM
            {
                Role = "student",
                User = userInfo,
                SocialLinks = socialLinks,
                Stats = stats,
                About = profile.About,
                StudentTabContent = tabContent,
                Actions = actions,
                Department = student.Department,
                InstructorTabContent = null,
                AdminTabContent = null,

            };
        }


        public async Task<bool> EditAdminProfileAsync(int adminId, EditAdminProfileVM model)
        {
            var admin = await _context.Admins
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AdminId == adminId);

            if (admin == null) return false;

            // Update User
            var user = admin.User;
            user.FullName = model.Name;
            if (model.Avatar != null && model.Avatar.Length > 0)
            {
                using var ms = new MemoryStream();
                await model.Avatar.CopyToAsync(ms);
                user.ProfileImage = Convert.ToBase64String(ms.ToArray());
            }

            // Update Admin fields
            admin.Department = model.Department;
            admin.RoleLevel = model.RoleLevel ?? admin.RoleLevel;

            // Update Profile
            var profile = await _context.profiles.FirstOrDefaultAsync(p => p.UserId == adminId);
            if (profile != null)
            {
                profile.About = model.About;
                profile.User.Name = model.Name;
                profile.User.RoleTitle = model.RoleTitle;

                profile.SocialLinks.Facebook = model.Facebook ?? "";
                profile.SocialLinks.Twitter = model.Twitter ?? "";
                profile.SocialLinks.LinkedIn = model.LinkedIn ?? "";
                profile.SocialLinks.Github = model.YouTube ?? ""; // if you want YouTube mapped to Github
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ProfileVM?> GetAdminProfileAsync(int adminId)
        {
            var admin = await _context.Admins
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AdminId == adminId);

            if (admin == null) return null;

            var profile = await _context.profiles.FirstOrDefaultAsync(p => p.UserId == adminId);
            if (profile == null) return null;

            var userInfo = new UserInformationVM
            {
                Name = admin.User.FullName,
                RoleTitle = "Platform Administrator",
                Avatar = null // or convert admin.User.ProfileImage
            };

            var socialLinks = new SocialLinks
            {
                Facebook = profile.SocialLinks.Facebook,
                Twitter = profile.SocialLinks.Twitter,
                LinkedIn = profile.SocialLinks.LinkedIn,
                Github = profile.SocialLinks.Github // You can rename to YouTube if needed
            };

            var stats = new List<Stat>
            {
                new Stat { Label = "Users", Value = _context.Users.Count() },
                new Stat { Label = "Courses", Value = _context.Courses.Count() },
                //new Stat { Label = "Reports", Value = _context.Reports.Count() } // example
            };

            var admintabContent = new AdminTabContent
            {
                // For Admin, you can use Students, Courses, Reports, Logs etc. in TabContent
                UserManagement = new List<UserManagementTab>(),
                Reports = new List<ReportTab>(),
                SystemLogs = new List<SystemLogTab>(),

            };

            return new ProfileVM
            {
                Role = "admin",
                User = userInfo,
                SocialLinks = socialLinks,
                Stats = stats,
                About = profile.About,
                AdminTabContent = admintabContent,
                Actions = new List<ActionButton>
                        {
                            new ActionButton { Label = "Edit Profile", Url = "/UserLayout/EditProfile" },
                            new ActionButton { Label = "Settings", Url = "/UserLayout/SettingPage" }
                        },
                Department = null,
                InstructorTabContent = null,
                StudentTabContent = null
            };
        }


    }

}