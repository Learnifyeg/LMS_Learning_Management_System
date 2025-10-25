using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public UserInfo User { get; set; }
        public SocialLinks SocialLinks { get; set; }

        [NotMapped]
        public List<Stat> Stats { get; set; }

        public string About { get; set; }

        [NotMapped]
        public TabContent TabContent { get; set; }

        [NotMapped]
        public List<ActionButton> Actions { get; set; }
    }


    public class UserInfo
    {
        public string Name { get; set; }
        public byte[]? Avatar { get; set; }
        public string RoleTitle { get; set; }
    }

    public class SocialLinks
    {
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Github { get; set; }
    }

    public class Stat
    {
        public string Label { get; set; }  
        public int Value { get; set; }     
    }

    public class ActionButton
    {
        public int Id { get; set; }
        public string Label { get; set; }  
        public string Url { get; set; }    
    }

    public class TabContent
    {
        public List<CourseTab> Courses { get; set; }
        public List<ProjectTab> Projects { get; set; }
        public string Certificates { get; set; }  
    }

    public class CourseTab
    {
        public string CourseName { get; set; }
        public string Progress { get; set; }
    }

    public class ProjectTab
    {
        public string ProjectName { get; set; }
        public string Status { get; set; }
    }
}
