using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseService _courseService;

        public CourseController(CourseService courseService)
        {
            _courseService = courseService;
        }

        //  Instructor adds course
        //[Authorize(Roles = "Instructor")]
        [HttpPost("add")]
        public async Task<IActionResult> AddCourse([FromBody] CourseVM model)
        {
            var success = await _courseService.AddCourseAsync(model);
            if (!success) return BadRequest(new { message = "Instructor not found" });

            return Ok(new { message = "Course added successfully! Waiting for admin approval." });
        }

        //  Get all pending (unapproved) courses - for Admin
        //[Authorize(Roles = "Admin")]
        [HttpGet("pending-courses")]
        public async Task<IActionResult> GetPendingCourses()
        {
            var courses = await _courseService.GetAllPendingCoursesAsync();
            return Ok(courses);
        }


        //  Get all approved courses
        [HttpGet("approved")]
        public async Task<IActionResult> GetAllApprovedCourses()
        {
            var courses = await _courseService.GetAllApprovedCoursesAsync();
            return Ok(courses);
        }

        //  Get course by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            if (course == null) return NotFound(new { message = "Course not found" });

            return Ok(course);
        }

        //  Admin approves a course
        //[Authorize(Roles = "Admin")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveCourse(int id)
        {
            var success = await _courseService.ApproveCourseAsync(id);
            if (!success) return NotFound(new { message = "Course not found" });

            return Ok(new { message = "Course approved successfully!" });
        }

        //  DELETE course (Admin or Instructor)
        //[Authorize(Roles = "Admin,Instructor")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCourse(int id, [FromQuery] int instructorId, [FromQuery] bool isAdmin = false)
        {
            var success = await _courseService.DeleteCourseAsync(id, instructorId, isAdmin);

            if (!success)
                return NotFound(new { message = "Course not found or not authorized to delete" });

            return Ok(new { message = "Course deleted successfully!" });
        }


    }
}
