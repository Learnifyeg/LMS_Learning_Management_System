using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Data.Services
{
    public class StudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        // -------- Add Student with optional course --------
        public async Task<StudentVM> AddStudentAsync(StudentVM model, List<int>? courseIds = null)
        {
            // 1. Add User
            var user = new User
            {
                FullName = model.Name,
                Email = model.Email,
                Role = "Student",
                ProfileImage = model.Image
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // 2. Add Student
            var student = new Student
            {
                StudentId = user.UserId,
                EnrollmentNo = $"ENR-{Guid.NewGuid().ToString().Substring(0, 6)}",
                Department = model.University,
                User = user
            };
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            // 3. Add Enrollments
            if (courseIds != null)
            {
                foreach (var courseId in courseIds)
                {
                    var enrollment = new Enrollment
                    {
                        StudentId = student.StudentId,
                        CourseId = courseId,
                        EnrollmentDate = DateTime.Now
                    };
                    _context.Enrollments.Add(enrollment);
                }
                await _context.SaveChangesAsync();
            }

            // 4. Return StudentVM
            var enrolledCourses = courseIds != null
                ? await _context.Courses.Where(c => courseIds.Contains(c.CourseId)).Select(c => c.Title).ToListAsync()
                : new List<string>();

            model.Id = student.StudentId.ToString();
            model.Courses = enrolledCourses;
            return model;
        }

        // -------- Get all students (admin) --------
        public async Task<IEnumerable<StudentVM>> GetAllStudentsAsync()
        {
            var students = await _context.Students
                .Include(s => s.User)
                .ToListAsync();

            return students.Select(s => new StudentVM
            {
                Id = s.StudentId.ToString(),
                Name = s.User.FullName,
                Email = s.User.Email,
                Image = s.User.ProfileImage ?? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
                University = s.University ?? "Unknown",
                Country = s.Country ?? "Unknown",
                Title = "Full Stack Web Student",
                Courses = s.Enrollments != null
                    ? s.Enrollments.Select(e => e.Course.Title).ToList()
                    : new List<string>()
            });
        }

        // -------- Get students by instructor --------
        public async Task<IEnumerable<StudentVM>> GetStudentsByInstructorAsync(int instructorId)
        {
            var enrollments = await _context.Enrollments
                .Include(e => e.Student).ThenInclude(s => s.User)
                .Include(e => e.Course)
                .Where(e => e.Course.InstructorId == instructorId)
                .ToListAsync();

            var students = enrollments
                .GroupBy(e => e.Student)
                .Select(g => new StudentVM
                {
                    Id = g.Key.StudentId.ToString(),
                    Name = g.Key.User.FullName,
                    Email = g.Key.User.Email,
                    Image = g.Key.Image ?? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
                    University = g.Key.University ?? "Unknown",
                    Country = g.Key.Country ?? "Unknown",
                    Title = "Full Stack Web Student",
                    Courses = g.Select(e => e.Course.Title).Distinct().ToList()
                })
                .ToList();

            return students;
        }
    }
}
