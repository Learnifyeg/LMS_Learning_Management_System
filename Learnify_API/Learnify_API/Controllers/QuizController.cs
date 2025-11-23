using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Learnify_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quizService;

    public QuizController(QuizService quizService)
        {
            _quizService = quizService;
        }
        // ================== get-all ==================

        [HttpGet("get-all")]
        public async Task<ActionResult<List<QuizVM>>> GetAll()
        {
        // جلب userId من الـ token
        var userIdClaim =
        User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) ??
        User.FindFirst("userId") ??
        User.FindFirst("id") ??
        User.FindFirst("sub");
        
        if (userIdClaim == null) return Unauthorized("User not found.");
        int userId = int.Parse(userIdClaim.Value);
        
        // جلب instructorId
        var instructorId = await _quizService.GetInstructorIdByUserId(userId);
        if (instructorId == null) return Unauthorized("Instructor profile not found.");
        
        // جلب الكويزات الخاصة بالانستركتور
        var quizzes = await _quizService.GetQuizzesByInstructorAsync(instructorId.Value);
        if (!quizzes.Any()) return NotFound("No quizzes found for this instructor.");
        
        return Ok(quizzes);
        }

        // ================== get-by-id ==================
        [Authorize(Roles = "instructor")]
        [HttpGet("get-by-id/{id}")]
<<<<<<< HEAD
        //[Authorize] // أي مستخدم مسجل يقدر يشوف كويز واحد
=======
>>>>>>> bb96b48a14984e482e8fddc936582014c3a89d05
        public async Task<ActionResult<QuizVM>> GetById(int id)
        {
        var userIdClaim =
        User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) ??
        User.FindFirst("userId") ??
        User.FindFirst("id") ??
        User.FindFirst("sub");
        
        if (userIdClaim == null) return Unauthorized("User not found.");
        int userId = int.Parse(userIdClaim.Value);
        
        var instructorId = await _quizService.GetInstructorIdByUserId(userId);
        if (instructorId == null) return Unauthorized("Instructor profile not found.");
        
        // جلب الكويز
        var quiz = await _quizService.GetQuizByIdAsync(id);
        if (quiz == null) return NotFound();
        
        // تأكد إن الكويز يخص الانستركتور
        var course = await _quizService.GetCourseByIdAsync(quiz.CourseId);
        if (course == null || course.InstructorId != instructorId.Value)
            return Unauthorized("This quiz does not belong to the instructor.");
        
        return Ok(quiz);
        }
        

        // ================== POST ==================

        [HttpPost("add")]
        [Authorize(Roles = "instructor")] // بس الإنستركتور يقدر يضيف كويز

        public async Task<ActionResult<QuizVM>> Create([FromBody] QuizVM quizVM)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier) ??
                User.FindFirst("userId") ??
                User.FindFirst("id") ??
                User.FindFirst("sub");

            if (userIdClaim == null) return Unauthorized("User not found.");
            int userId = int.Parse(userIdClaim.Value);

            var instructorId = await _quizService.GetInstructorIdByUserId(userId);
            if (instructorId == null) return Unauthorized("Instructor profile not found.");

            try
            {
                var createdQuiz = await _quizService.CreateQuizAsync(quizVM, instructorId.Value);
                return CreatedAtAction(nameof(GetById), new { id = createdQuiz.Id }, createdQuiz);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ================== UPDATE ==================

        [HttpPut("update/{id}")]
        //[Authorize(Roles = "instructor")] // بس الإنستركتور يقدر يحدث الكويز
        public async Task<ActionResult<QuizVM>> Update(int id, [FromBody] QuizVM quizVM)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier) ??
                User.FindFirst("userId") ??
                User.FindFirst("id") ??
                User.FindFirst("sub");

            if (userIdClaim == null) return Unauthorized("User not found.");
            int userId = int.Parse(userIdClaim.Value);

            var instructorId = await _quizService.GetInstructorIdByUserId(userId);
            if (instructorId == null) return Unauthorized("Instructor profile not found.");

            // تحقق من ملكية الكورس قبل التحديث
            var course = await _quizService.GetCourseByIdAsync(quizVM.CourseId);
            if (course == null || course.InstructorId != instructorId.Value)
                return BadRequest("This course does not belong to the instructor.");

            var updatedQuiz = await _quizService.UpdateQuizAsync(id, quizVM);
            if (updatedQuiz == null) return NotFound();
            return Ok(updatedQuiz);
        }

        // ================== DELETE ==================

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "instructor")] // بس الإنستركتور يقدر يحذف الكويز
        public async Task<ActionResult> Delete(int id)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier) ??
                User.FindFirst("userId") ??
                User.FindFirst("id") ??
                User.FindFirst("sub");

            if (userIdClaim == null) return Unauthorized("User not found.");
            int userId = int.Parse(userIdClaim.Value);

            var instructorId = await _quizService.GetInstructorIdByUserId(userId);
            if (instructorId == null) return Unauthorized("Instructor profile not found.");

            // تحقق من ملكية الكويز قبل الحذف
            var quiz = await _quizService.GetQuizByIdAsync(id);
            if (quiz == null) return NotFound();
            var course = await _quizService.GetCourseByIdAsync(quiz.CourseId);
            if (course == null || course.InstructorId != instructorId.Value)
                return BadRequest("This quiz does not belong to the instructor.");

            var deleted = await _quizService.DeleteQuizAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        // ================== GET BY INSTRUCTOR ==================
        [Authorize(Roles = "instructor")]
        [HttpGet("by-instructor")]
        public async Task<ActionResult<IEnumerable<QuizVM>>> GetByInstructor()
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier) ??
                User.FindFirst("userId") ??
                User.FindFirst("id") ??
                User.FindFirst("sub");

            if (userIdClaim == null)
                return Unauthorized("User not found.");

            int userId = int.Parse(userIdClaim.Value);

            var instructorId = await _quizService.GetInstructorIdByUserId(userId);
            if (instructorId == null)
                return Unauthorized("Instructor profile not found.");

            var quizzes = await _quizService.GetQuizzesByInstructorAsync(instructorId.Value);
            if (!quizzes.Any()) return NotFound("No quizzes found for this instructor.");

            return Ok(quizzes);
        }
    }
}