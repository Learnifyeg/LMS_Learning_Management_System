using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }
        public readonly AdminService _adminService;
    }
}
