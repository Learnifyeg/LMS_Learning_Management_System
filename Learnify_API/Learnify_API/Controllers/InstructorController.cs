//using Learnify_API.Data.Services;
//using Microsoft.AspNetCore.Mvc;

//namespace Learnify_API.Controllers
//{
//    [Route("[controller]")]
//    [ApiController]
//    public class InstructorController : ControllerBase
//    {
//        private readonly InstructorService _instructorService;

//        public InstructorController(InstructorService instructorService)
//        {
//            _instructorService = instructorService;
//        }

//        [HttpGet("instructor-dashboard/{userId}")]
//        public async Task<IActionResult> GetDashboard(int userId)
//        {
//            var dashboard = await _instructorService.GetDashboardAsync(userId);

//            if (dashboard == null)
//                return NotFound(new { message = "Instructor not found" });

//            return Ok(dashboard);
//        }
//    }
//}
