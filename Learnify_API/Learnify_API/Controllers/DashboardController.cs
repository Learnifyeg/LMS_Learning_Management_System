using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        // ===========================
        // 1) Student Dashboard
        // ===========================
        [Authorize(Roles = "student")]
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetStudentDashboard(int studentId)
        {
            var result = await _dashboardService.GetStudentDashboard(studentId);

            if (result == null)
                return NotFound("Student not found");

            return Ok(result);
        }

        // ===========================
        // 2) Instructor Dashboard
        // ===========================
        [Authorize(Roles = "instructor")]
        [HttpGet("instructor/{instructorId}")]
        public async Task<IActionResult> GetInstructorDashboard(int instructorId , StudentService stu)
        {
            var result = await _dashboardService.GetInstructorDashboard(instructorId,stu);

            if (result == null)
                return NotFound("Instructor not found");

            return Ok(result);
        }

        // ===========================
        // 3) Admin Dashboard
        // ===========================
        [Authorize(Roles = "admin")]
        [HttpGet("admin")]
        public async Task<IActionResult> GetAdminDashboard(int adminId)
        {
            var result = await _dashboardService.GetAdminDashboard(adminId);

            return Ok(result);
        }

    }
}
