using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly LessonService _lessonService;

        public LessonController(LessonService lessonService)
        {
            _lessonService = lessonService;
        }

        // Add Lesson
        [HttpPost("add")]
        public async Task<IActionResult> AddLesson([FromBody] CreateLessonRequest model)
        {
            var success = await _lessonService.AddLessonAsync(model);
            if (!success) return BadRequest(new { message = "Invalid course ID or data" });
            return Ok(new { message = "Lesson added successfully!" });
        }

        //  Update Lesson
        [HttpPut("update/{lessonId}")]
        public async Task<IActionResult> UpdateLesson(int lessonId, [FromBody] UpdateLessonRequest model)
        {
            var success = await _lessonService.UpdateLessonAsync(lessonId, model);
            if (!success) return NotFound(new { message = "Lesson not found" });
            return Ok(new { message = "Lesson updated successfully!" });
        }

        //  Delete Lesson
        [HttpDelete("delete/{lessonId}")]
        public async Task<IActionResult> DeleteLesson(int lessonId)
        {
            var success = await _lessonService.DeleteLessonAsync(lessonId);
            if (!success) return NotFound(new { message = "Lesson not found" });
            return Ok(new { message = "Lesson deleted successfully!" });
        }

        //  Get Lesson by Id
        [HttpGet("{lessonId}")]
        public async Task<IActionResult> GetLessonById(int lessonId)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(lessonId);
            if (lesson == null) return NotFound(new { message = "Lesson not found" });
            return Ok(lesson);
        }

        //  Get Lessons by Course
        [HttpGet("by-course/{courseId}")]
        public async Task<IActionResult> GetLessonsByCourse(int courseId)
        {
            var lessons = await _lessonService.GetLessonsByCourseAsync(courseId);
            return Ok(lessons);
        }

        //  Mark Lesson Completed
        [HttpPost("complete/{lessonId}")]
        public async Task<IActionResult> MarkLessonCompleted(int lessonId)
        {
            //  Get userId from token
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) return Unauthorized("Invalid token");

            int studentId = int.Parse(userIdClaim.Value);

            var success = await _lessonService.MarkLessonCompletedAsync(lessonId, studentId);

            if (!success)
                return NotFound(new { message = "Lesson not found" });

            return Ok(new { message = "Lesson marked as completed!" });
        }


        //  Get student progress in course
        [HttpGet("progress/{courseId}")]
        public async Task<IActionResult> GetProgressByCourse(int courseId)
        {
            //  Get userId from token
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) return Unauthorized("Invalid token");

            int studentId = int.Parse(userIdClaim.Value);

            var progress = await _lessonService.GetProgressByCourseAsync(courseId, studentId);

            return Ok(progress);
        }

    }
}
