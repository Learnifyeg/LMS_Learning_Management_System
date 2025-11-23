using Learnify_API.Data;
using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

public class DashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    // -------------------------
    // STUDENT DASHBOARD
    // -------------------------
    public async Task<StudentDashboardVM> GetStudentDashboard(int studentId)
    {
        // جلب User مع الـ Student المرتبط
        var student = await _context.Users
            .Include(u => u.Student) // Include لتجنب null
            .FirstOrDefaultAsync(x => x.UserId == studentId);

        if (student == null) return null;

        var vm = new StudentDashboardVM
        {
            FullName = student.FullName,
            Email = student.Email,
            Department = student.Student != null ? student.Student.Department : null, // تحقق من null

            //TotalCourses = await _context.Courses.Where(x => x.Enrollments ).CountAsync(),
            //   CompletedCourses = await _context.Courses.Where(x => x.StudentId == studentId && x.IsCompleted).CountAsync(),
            //  CertificatesEarned = await _context.Certificates.Where(x => x.StudentId == studentId).CountAsync(),

            // مثال للـ quizzes
            //    QuizzesPassed = await _context.Quizzes.Where(x => x.StudentId == studentId && x.).CountAsync(),
            //  QuizzesTotal = await _context.Quizzes.Where(x => x. == studentId).CountAsync(),

            //// روابط من جداول موجودة بالفعل
            //LiveSessions = await _context.LiveSessions.ToListAsync(),
            //FinalProjects = await _context.FinalProjects.Where(x => x.StudentId == studentId).ToListAsync(),
            //Notifications = await _context.Notifications.Where(x => x.UserId == studentId).ToListAsync()
        };

        // لو مفيش quizzes avoid division by zero
        vm.SuccessRate = vm.QuizzesTotal == 0 ? 0 : (vm.QuizzesPassed * 100 / vm.QuizzesTotal);

        return vm;
    }

    // -------------------------
    // INSTRUCTOR DASHBOARD
    // -------------------------
    public async Task<InstructorDashboardVM> GetInstructorDashboard(int instructorId, StudentService stu)
    {
        var instructor = await _context.Users
            .Include(u => u.Instructor) // Include لتجنب null
            .FirstOrDefaultAsync(x => x.UserId == instructorId);

        if (instructor == null) return null;

        // -------------------------
        // CoursesCreated
        // -------------------------
        int coursesCreated = 0;
        try
        {
            // حاول استخدم العمود الموجود في DB (مثال: UserId أو InstructorId)
            coursesCreated = await _context.Courses
                .Where(x => EF.Property<int>(x, "InstructorId") == instructorId)
                .CountAsync();
        }
        catch
        {
            // لو العمود مش موجود، نخلي القيمة صفر بدون Exception
            coursesCreated = 0;
        }

        // -------------------------
        // CertificatesIssued
        // -------------------------
        int certificatesIssued = 0;
        try
        {
            certificatesIssued = await _context.Certificates
                .Where(x => EF.Property<int>(x, "InstructorId") == instructorId)
                .CountAsync();
        }
        catch
        {
            certificatesIssued = 0;
        }

        return new InstructorDashboardVM
        {
            FullName = instructor.FullName,
            Email = instructor.Email,
            Department = instructor.Instructor != null ? instructor.Instructor.Specialization : null, // تحقق من null
            TotalStudents = (await stu.GetStudentsByInstructorAsync(instructorId)).Count(),

            CoursesCreated = coursesCreated,
            // ProjectsSupervised = await _context..Where(x => x.InstructorId == instructorId).CountAsync(),
            CertificatesIssued = certificatesIssued,

            //LiveSessions = await _context.LiveSessions.Where(x => x.InstructorId == instructorId).ToListAsync(),
            //Notifications = await _context.Notifications.Where(x => x.UserId == instructorId).ToListAsync()
        };
    }

    // -------------------------
    // ADMIN DASHBOARD
    // -------------------------
    public async Task<AdminDashboardVM> GetAdminDashboard(int adminId)
    {
        var admin = await _context.Users
            .Include(u => u.Admin) // Include لتجنب null لو عندك Admin entity
            .FirstOrDefaultAsync(x => x.UserId == adminId);

        if (admin == null) return null;

        return new AdminDashboardVM
        {
            FullName = admin.FullName,
            Email = admin.Email,

            TotalStudents = await _context.Students.CountAsync(),
            TotalInstructors = await _context.Instructors.CountAsync(),
            TotalCourses = await _context.Courses.CountAsync(),
            CertificatesIssued = await _context.Certificates.CountAsync(),

            //        Notifications = await _context.Notifications.Where(x => x.UserId == adminId).ToListAsync()
        };
    }
}
