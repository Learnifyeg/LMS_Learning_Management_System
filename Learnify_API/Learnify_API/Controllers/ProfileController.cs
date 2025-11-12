using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        public ProfileController(ProfileService service)
        {

            _service = service;
        }
        private readonly ProfileService _service;


        [Authorize(Roles = "student")]
        [HttpPut("edit-student")]
        public async Task<IActionResult> EditStudentProfile([FromForm] EditStudentProfileVM model)
        {
            var userId = User.FindFirst("userId")?.Value;

            if (userId == null)
                return Unauthorized("Invalid token");

            var result = await _service.EditStudentProfileAsync(int.Parse(userId), model);

            if (!result)
                return NotFound("Student or profile not found.");

            return Ok(new { message = "Profile updated successfully!" });
        }



        [Authorize(Roles = "instructor")]
        [HttpPut("edit-instructor")]
        public async Task<IActionResult> EditInstructorProfile([FromForm] EditInstructorProfileVM model)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null) return Unauthorized();

            var result = await _service.EditInstructorProfileAsync(int.Parse(userId), model);

            if (!result) return NotFound("Instructor or profile not found.");

            return Ok(new { message = "Profile updated successfully!" });
        }


        [Authorize(Roles = "admin")]
        [HttpPut("edit-admin")]
        public async Task<IActionResult> EditAdminProfile([FromForm] EditAdminProfileVM model)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null) return Unauthorized();

            var result = await _service.EditAdminProfileAsync(int.Parse(userId), model);

            if (!result) return NotFound("Admin or profile not found.");

            return Ok(new { message = "Profile updated successfully!" });
        }

        [Authorize(Roles = "instructor")]
        [HttpGet("instructor")]
        public async Task<IActionResult> GetInstructorProfile()
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null)
                return Unauthorized(new { message = "Invalid token" });

            var profile = await _service.GetInstructorProfileAsync(int.Parse(userId));

            if (profile == null)
                return NotFound(new { message = "Instructor not found" });

            return Ok(profile);
        }

        [Authorize(Roles = "student")]
        [HttpGet("student")]
        public async Task<IActionResult> GetStudentProfile()
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null) return Unauthorized();

            var profile = await _service.GetStudentProfileAsync(int.Parse(userId));

            if (profile == null)
                return NotFound(new { message = "Student not found" });

            return Ok(profile);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin")]
        public async Task<IActionResult> GetAdminProfile()
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null)
                return Unauthorized(new { message = "Invalid token" });

            var profile = await _service.GetAdminProfileAsync(int.Parse(userId));

            if (profile == null)
                return NotFound(new { message = "Admin not found" });

            return Ok(profile);
        }


    }
}
