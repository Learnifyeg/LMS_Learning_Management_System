using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Data.Services
{
    public class AdminService
    {
        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        private readonly AppDbContext _context;

        // Get All Users
        public async Task<IEnumerable<UserVM>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();

            return users.Select(u => new UserVM
            {
                Id = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                Role = u.Role,
                ProfileImage = u.ProfileImage,
                CreatedAt = u.CreatedAt,
                IsEmailVerified = u.IsEmailVerified,
                IsApproved = u.IsApproved //  include this
            });
        }

        // Get User By Id
        public async Task<UserVM?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserVM
            {
                Id = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                ProfileImage = user.ProfileImage,
                CreatedAt = user.CreatedAt,
                IsEmailVerified = user.IsEmailVerified
            };
        }

        // Delete User
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        // Approve User
        public async Task<bool> ApproveUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.IsApproved = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
