namespace Learnify_API.Data.Services
{
    public class AdminService
    {
        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        private readonly AppDbContext _context;
    }
}
