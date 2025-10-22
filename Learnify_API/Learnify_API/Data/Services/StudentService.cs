using API_Learnify.Data.Models;
using API_Learnify.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace API_Learnify.Data.Services
{
    public class StudentService
    {
        // Database context injection
        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        private readonly AppDbContext _context;


        // ---------- Add New Student ----------
        public async Task<StudentVM> AddStudentAsync(StudentVM model)
        {
            // Create new User entity
            var user = new User
            {
                FullName = model.Name,
                Email = model.Email,
                //PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"), // default password
                Role = "Student",
                ProfileImage = model.Image,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create corresponding Student entity
            var student = new Student
            {
                StudentId = user.UserId, // Foreign Key (UserId)
                EnrollmentNo = $"ENR-{Guid.NewGuid().ToString().Substring(0, 6)}",
                Department = model.University,
                GPA = null,
                User = user
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            // Return the created student in the same view model
            return new StudentVM
            {
                Id = student.StudentId.ToString(),
                Name = user.FullName,
                Email = user.Email,
                Image = user.ProfileImage ?? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
                University = model.University,
                Country = model.Country,
                Title = model.Title,
                LinkedIn = model.LinkedIn,
                GitHub = model.GitHub,
                Facebook = model.Facebook,
                Twitter = model.Twitter
            };
        }

        // ----------- Get All Students -----------
        public async Task<IEnumerable<StudentVM>> GetAllStudentsAsync()
        {
            var students = await _context.Students
                .Include(s => s.User)
                .ToListAsync();

            return students.Select(s => new StudentVM
            {
                Image = s.User.ProfileImage ?? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
                Name = s.User.FullName,
                Title = "Full Stack Web Student", // static for now
                University = "Cairo University",  // can be dynamic later
                Country = "Egypt",                // can be dynamic later
                Email = s.User.Email,
                LinkedIn = "https://linkedin.com/in",
                GitHub = "https://github.com",
                Facebook = "https://facebook.com",
                Twitter = "https://twitter.com",
                //Id = s.StudentId.ToString()
            });
        }


    }
}
