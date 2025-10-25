using Learnify_API.Data.Models;
using Learnify_API.Data.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using System.IO;

namespace Learnify_API.Data.Services
{
    public class FeedbackService
    {
       public FeedbackService(AppDbContext context) {
        
            _context=context;
        }
        private readonly AppDbContext _context;


        public void AddFeedBack(FeedBackVM vM)
        {
            if (vM.image != null)
            {
                var stream = new MemoryStream();
                vM.image.CopyTo(stream);
                var newfeed = new FeedBack()
                {
                    Email = vM.Email,
                    Massage = vM.Massage,
                    image = stream.ToArray()
                };
                _context.feedBacks.Add(newfeed);
                _context.SaveChanges();
            }
            else {
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
