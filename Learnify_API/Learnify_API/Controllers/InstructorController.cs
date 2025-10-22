using API_Learnify.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_Learnify.Controllers
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
