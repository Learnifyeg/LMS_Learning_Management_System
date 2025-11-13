using Learnify_API.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API.Data.Services
{
    public class UserSettingsService
    {
        private readonly AppDbContext _context;

        public UserSettingsService(AppDbContext context)
        {
            _context = context;
        }

        // لو هتيجي من frontend كـ int
        public async Task<UserSettingsViewModel?> GetSettingsAsync(int userId)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null) return null;

            return new UserSettingsViewModel
            {
                FirstName = user.FullName.Split(' ')[0],
                LastName = user.FullName.Split(' ').Length > 1 ? user.FullName.Split(' ')[1] : "",
                Email = user.Email,
                Phone = user.Phone ?? "",
                Headline = user.Headline ?? "",
                About = user.About ?? "",
                Newsletter = user.Newsletter
            };
        }


        public async Task<bool> UpdateSettingsAsync(int userId, UserSettingsViewModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId); // <-- اتغير هنا
            if (user == null) return false;

            user.FullName = model.FirstName + " " + model.LastName; // لو عايزة تفصلي الاسم ممكن تغيري
            user.Email = model.Email;
            // ممكن تضيفي أي خصائص تانية حسب الـ model

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
