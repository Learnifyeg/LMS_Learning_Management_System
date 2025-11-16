using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentService _studentService;

        public StudentController(StudentService studentService)
        {
            _studentService = studentService;
        }

        //// -------- Add Student --------
        //[Authorize(Roles = "admin")]
        //[HttpPost("add-student")]
        //public async Task<IActionResult> AddStudent([FromBody] StudentVM studentVM, [FromQuery] List<int>? courseIds)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    var createdStudent = await _studentService.AddStudentAsync(studentVM, courseIds);
        //    return CreatedAtAction(nameof(GetAllStudents), new { id = createdStudent.Id }, createdStudent);
        //}

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

        // Save course
        [Authorize(Roles = "student")]
        [HttpPost("save-course")]
        public async Task<IActionResult> SaveCourse([FromQuery] int courseId)
        {
            var studentId = int.Parse(User.Claims.First(c => c.Type == "userId").Value);

            var result = await _studentService.SaveCourseAsync(studentId, courseId);

            return result ? Ok("Course saved successfully") : BadRequest("Course already saved");
        }

        // Get saved courses
        [Authorize(Roles = "student")]
        [HttpGet("saved-courses")]
        public async Task<IActionResult> GetSavedCourses()
        {
            var studentId = int.Parse(User.Claims.First(c => c.Type == "userId").Value);
            var courses = await _studentService.GetSavedCoursesAsync(studentId);

            return Ok(courses);
        }


        [Authorize(Roles = "student")]
        [HttpDelete("remove-saved-course")]
        public async Task<IActionResult> RemoveSavedCourse([FromQuery] int courseId)
        {
            var studentId = int.Parse(User.Claims.First(c => c.Type == "userId").Value);

            var result = await _studentService.RemoveSavedCourseAsync(studentId, courseId);

            return result ? Ok("Course removed from saved list") : NotFound("Course not found in saved list");
        }


        // -------- Get logged-in student's enrollments --------
        [Authorize(Roles = "student")]
        [HttpGet("my-enrollments")]
        public async Task<IActionResult> GetMyEnrollments()
        {
            var studentId = int.Parse(User.Claims.First(c => c.Type == "userId").Value);
            var courses = await _studentService.GetEnrollmentsAsync(studentId);
            return Ok(courses);
        }

        // -------- Enroll in a course --------
        [Authorize(Roles = "student")]
        [HttpPost("enroll")]
        public async Task<IActionResult> Enroll([FromQuery] int courseId)
        {
            var studentId = int.Parse(User.Claims.First(c => c.Type == "userId").Value);
            var success = await _studentService.EnrollCourseAsync(studentId, courseId);

            if (!success) return BadRequest("Already enrolled in this course");

            return Ok("Enrolled successfully");
        }

        // Optional: Remove enrollment
        [Authorize(Roles = "student")]
        [HttpDelete("remove-enrollment")]
        public async Task<IActionResult> RemoveEnrollment([FromQuery] int courseId)
        {
            var studentId = int.Parse(User.Claims.First(c => c.Type == "userId").Value);
            var success = await _studentService.RemoveEnrollmentAsync(studentId, courseId);

            if (!success) return NotFound("Enrollment not found");

            return Ok("Enrollment removed successfully");
        }



    }
}
