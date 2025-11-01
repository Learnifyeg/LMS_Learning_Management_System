using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
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


        [HttpPut("edit-student/{Id}")]
        public async Task<IActionResult> EditStudentProfile(int Id, [FromForm] EditStudentProfileVM model)
        {
            var result = await _service.EditStudentProfileAsync(Id, model);

            if (!result)
                return NotFound("Student or profile not found.");

            return Ok(new { message = "Profile updated successfully!" });
        }


        [HttpPut("edit-instructor/{Id}")]
        public async Task<IActionResult> EditInstructorProfile(int Id, [FromForm] EditInstructorProfileVM model)
        {
            var result = await _service.EditInstructorProfileAsync(Id, model);
            if (!result)
                return NotFound("Instructor or profile not found.");

            return Ok(new { message = "Profile updated successfully!" });
        }

        [HttpPut("edit-admin/{id}")]
        public async Task<IActionResult> EditAdminProfile(int id, [FromForm] EditAdminProfileVM model)
        {
            var result = await _service.EditAdminProfileAsync(id, model);
            if (!result) return NotFound("Admin or profile not found.");
            return Ok(new { message = "Profile updated successfully!" });
        }

        [HttpGet("instructor/{Id}")]
        public async Task<IActionResult> GetInstructorProfile(int Id)
        {
            var profile = await _service.GetInstructorProfileAsync(Id);
            if (profile == null)
                return NotFound(new { message = "Instructor not found" });

            return Ok(profile);
        }


        [HttpGet("student/{Id}")]
        public async Task<IActionResult> GetStudentProfile(int Id)
        {
            var profile = await _service.GetStudentProfileAsync(Id);
            if (profile == null)
                return NotFound(new { message = "Student not found" });

            return Ok(profile);
        }

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetAdminProfile(int id)
        {
            var profile = await _service.GetAdminProfileAsync(id);
            if (profile == null) return NotFound(new { message = "Admin not found" });
            return Ok(profile);
        }


    }
}
