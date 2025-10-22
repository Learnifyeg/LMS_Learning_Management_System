namespace API_Learnify.Data.Services
{
    public class InstructorService
    {
        public InstructorService(AppDbContext context)
        {
            _context = context;
        }
        private readonly AppDbContext _context;
    }
}
