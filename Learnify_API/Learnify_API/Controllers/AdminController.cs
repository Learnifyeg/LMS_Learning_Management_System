using API_Learnify.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_Learnify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
       ///
        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }
        public readonly AdminService _adminService;
    }
}
