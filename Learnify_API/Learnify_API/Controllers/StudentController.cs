using API_Learnify.Data.Services;
using API_Learnify.Data.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace API_Learnify.Controllers
{
    [Route("")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        // Dependecy Injection
        public StudentController(StudentService studentService)
        {
            _studentService = studentService;
        }
        public readonly StudentService _studentService;


        // -------- Add New Student --------
        [HttpPost("add-student")]
        public async Task<IActionResult> AddStudent([FromBody] StudentVM studentVM)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdStudent = await _studentService.AddStudentAsync(studentVM);
            return CreatedAtAction(nameof(GetAllStudents), new { id = createdStudent.Id }, createdStudent);
        }

        // ----------- Get All Students -----------
        [HttpGet("get-students")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentService.GetAllStudentsAsync();
            return Ok(students);
        }
    }
}
