using Learnify_API.Data.Services;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProStudentController : ControllerBase
    {
        public ProStudentController(ProfileService service) {
        
            _service = service;
        }
        private readonly ProfileService _service;

        [HttpPost]
        public async Task<IActionResult> AddProfile([FromForm] ProfileVM vm)
        {
            var profile = await _service.AddProfileAsync(vm);
            return Ok(profile);
        }


    }
}
