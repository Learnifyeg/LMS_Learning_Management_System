using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        public InstructorController(InstructorService instructorService)
        {
            _instructorService = instructorService;
        }
        public readonly InstructorService _instructorService;
    }
}
