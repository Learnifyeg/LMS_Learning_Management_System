using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        // ================== GET ALL ==================
        [HttpGet]
        // [Authorize] // أي مستخدم مسجل يقدر يشوف الكويزات
        public async Task<ActionResult<List<QuizVM>>> GetAll()
        {
            var quizzes = await _quizService.GetAllQuizzesAsync();
            return Ok(quizzes);
        }

        // ================== GET BY ID ==================
        [HttpGet("{id}")]
        [Authorize] // أي مستخدم مسجل يقدر يشوف كويز واحد
        public async Task<ActionResult<QuizVM>> GetById(int id)
        {
            var quiz = await _quizService.GetQuizByIdAsync(id);
            if (quiz == null) return NotFound();
            return Ok(quiz);
        }

        // ================== POST ==================
        [HttpPost]
        [Authorize(Roles = "Instructor")] // بس الإنستركتور يقدر يضيف كويز
        public async Task<ActionResult<QuizVM>> Create([FromBody] QuizVM quizVM)
        {
            var createdQuiz = await _quizService.CreateQuizAsync(quizVM);
            return CreatedAtAction(nameof(GetById), new { id = createdQuiz.Id }, createdQuiz);
        }

        // ================== UPDATE ==================
        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor")] // بس الإنستركتور يقدر يحدث الكويز
        public async Task<ActionResult<QuizVM>> Update(int id, [FromBody] QuizVM quizVM)
        {
            var updatedQuiz = await _quizService.UpdateQuizAsync(id, quizVM);
            if (updatedQuiz == null) return NotFound();
            return Ok(updatedQuiz);
        }

        // ================== DELETE ==================
        [HttpDelete("{id}")]
        [Authorize(Roles = "Instructor")] // بس الإنستركتور يقدر يحذف الكويز
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _quizService.DeleteQuizAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
