using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Certificate
    {
        [Key]
        public int CertificateId { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; } = null!;

        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        [MaxLength(255)]
        public string CertificateUrl { get; set; } = string.Empty;

        public DateTime IssuedAt { get; set; } = DateTime.Now;
    }
}
