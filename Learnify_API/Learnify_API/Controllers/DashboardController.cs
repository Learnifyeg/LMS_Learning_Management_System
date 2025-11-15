using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        // 1) Student Dashboard
        [Authorize(Roles = "student")]
        [HttpGet("student")]
        public async Task<IActionResult> GetStudentDashboard()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null) return Unauthorized("User ID missing in token");

            int studentId = int.Parse(userIdClaim);
            var result = await _dashboardService.GetStudentDashboard(studentId);

            if (result == null)
                return NotFound("Student not found");

            return Ok(result);
        }


        // 2) Instructor Dashboard
        [Authorize(Roles = "instructor")]
        [HttpGet("instructor")]
        public async Task<IActionResult> GetInstructorDashboard([FromServices] StudentService stu)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null) return Unauthorized("User ID missing in token");

            int instructorId = int.Parse(userIdClaim);

            var result = await _dashboardService.GetInstructorDashboard(instructorId, stu);

            if (result == null)
                return NotFound("Instructor not found");

            return Ok(result);
        }
        // 3) Admin Dashboard
        [Authorize(Roles = "admin")]
        [HttpGet("admin")]
        public async Task<IActionResult> GetAdminDashboard()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null) return Unauthorized("User ID missing in token");

            int adminId = int.Parse(userIdClaim);

            var result = await _dashboardService.GetAdminDashboard(adminId);

            return Ok(result);
        }

    }
}
