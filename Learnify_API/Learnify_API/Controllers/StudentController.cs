using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    //=======sss
    [Route("api/[controller]")]

    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentService _studentService;

        public StudentController(StudentService studentService)
        {
            _studentService = studentService;
        }

        // -------- Add Student --------
        [Authorize(Roles = "admin")]
        [HttpPost("add-student")]
        public async Task<IActionResult> AddStudent([FromBody] StudentVM studentVM, [FromQuery] List<int>? courseIds)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdStudent = await _studentService.AddStudentAsync(studentVM, courseIds);
            return CreatedAtAction(nameof(GetAllStudents), new { id = createdStudent.Id }, createdStudent);
        }

        // -------- Get all students (admin + instructor) --------
        [Authorize(Roles = "admin, instructor")]
        [HttpGet("get-students")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentService.GetAllStudentsAsync();
            return Ok(students);
        }

        // -------- Get students for logged-in instructor only --------
        [Authorize(Roles = "instructor")]
        [HttpGet("get-my-students")]
        public async Task<IActionResult> GetMyStudents()
        {
            var instructorIdClaim = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (instructorIdClaim == null)
                return Unauthorized("Instructor ID not found in token.");

            int instructorId = int.Parse(instructorIdClaim);

            var students = await _studentService.GetStudentsByInstructorAsync(instructorId);
            return Ok(students);
        }
    }
}
