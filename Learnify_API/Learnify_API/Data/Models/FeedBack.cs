namespace Learnify_API.Data.Models
{
    public class FeedBack
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Massage { get; set; }
        public byte[]? image { get; set; }
         
    }
}
