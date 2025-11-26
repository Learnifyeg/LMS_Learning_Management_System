using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learnify_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }
        public readonly AdminService _adminService;

        // GET: api/user
        //[Authorize(Roles = "admin")]
        [HttpGet("get-all-user")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(new { Users = users });
        }

        //  GET: api/user/5
        [Authorize(Roles = "admin")]
        [HttpGet("get-user-by/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _adminService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            return Ok(user);
        }


        // DELETE: api/user/5
        [Authorize(Roles = "admin")]
        [HttpDelete("delete-user-by/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _adminService.DeleteUserAsync(id);
            if (!success)
                return NotFound(new { Message = "User not found" });

            return Ok(new { Message = "User deleted successfully" });
        }

        //[Authorize(Roles = "admin")]
        [HttpPut("approve-user-by/{id}")]
        public async Task<IActionResult> ApproveUserById(int id)
        {
            var success = await _adminService.ApproveUserAsync(id);
            if (!success)
                return NotFound(new { message = "User not found" });

            return Ok(new { message = "User approved successfully" });
        }
    }
}
