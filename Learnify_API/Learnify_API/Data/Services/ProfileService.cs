using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;

namespace Learnify_API.Data.Services
{
    public class ProfileService
    {
        public ProfileService(AppDbContext context)
        {

            _context = context;
        }
        private readonly AppDbContext _context;

        public async Task<Profile> AddProfileAsync(ProfileVM vM)
        {

            var profile = new Profile
            {
                Role = vM.Role,
                //User = vM.User,
                SocialLinks = vM.SocialLinks,
                About = vM.About,

            };

            _context.profiles.Add(profile);
            await _context.SaveChangesAsync();

            return profile;
        }
    }
}
