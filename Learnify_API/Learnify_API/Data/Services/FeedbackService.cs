using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;

namespace Learnify_API.Data.Services
{
    public class FeedbackService
    {
        public FeedbackService(AppDbContext context)
        {

            _context = context;
        }
        private readonly AppDbContext _context;


        public void AddFeedBack(FeedBackVM vM)
        {
            if (vM.imagefile != null)
            {
                var stream = new MemoryStream();
                vM.imagefile.CopyTo(stream);
                var base64 = Convert.ToBase64String(stream.ToArray());
                base64 = "data:" + vM.imagefile.ContentType + ";base64," + base64;

                var newfeed = new FeedBack()
                {
                    Email = vM.Email,
                    Massage = vM.Massage,
                    image = base64,
                };
                _context.feedBacks.Add(newfeed);
                _context.SaveChanges();
            }
            else
            {
                var newfeed = new FeedBack()
                {
                    Email = vM.Email,
                    Massage = vM.Massage,
                };
                _context.feedBacks.Add(newfeed);
                _context.SaveChanges();


            }

        }

        public List<FeedBack> GetAllFeedBacks()
        {
            var feed = _context.feedBacks.ToList();
            return feed;
        }
    }
}
