using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OthersController : ControllerBase
    {
        public OthersController(FeedbackService service)
        {

            _service = service;
        }
        private readonly FeedbackService _service;

        [HttpPost("Add-Feedback")]
        public IActionResult AddFeedBack([FromForm] FeedBackVM vM)
        {
            _service.AddFeedBack(vM);
            return Ok(vM);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("get-all-feedbacks")]
        public IActionResult getallFeedBacks()
        {
            var feeds = _service.GetAllFeedBacks();
            return Ok(feeds);
        }
    }
}
