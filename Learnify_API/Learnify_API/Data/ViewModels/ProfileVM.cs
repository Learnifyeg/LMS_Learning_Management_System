﻿using Learnify_API.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnify_API.Data.ViewModels
{
    public class ProfileVM
    {
        public string Role { get; set; }
        public UserInformationVM User { get; set; }
        public SocialLinks SocialLinks { get; set; }
        public List<Stat> Stats { get; set; }
        public string About { get; set; }
        [NotMapped]
        public InstructorTabContent InstructorTabContent { get; set; } = new InstructorTabContent();

        [NotMapped]
        public AdminTabContent AdminTabContent { get; set; } = new AdminTabContent();
        [NotMapped]
        public StudentTabContent StudentTabContent { get; set; } = new StudentTabContent();
        public List<ActionButton> Actions { get; set; }
        public string? Department { get; set; }
    }
    public class UserInformationVM
    {
        public string Name { get; set; }
        public string? Avatar { get; set; }
        public string RoleTitle { get; set; }
    }

    public class EditStudentProfileVM
    {
        public string Name { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; }
        public string RoleTitle { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;

        // Student specific fields
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string? University { get; set; }
        public string? Country { get; set; }
        public string? LinkedIn { get; set; }
        public string? GitHub { get; set; }
        public string? Facebook { get; set; }
        public string? Twitter { get; set; }
        public string? Image { get; set; }
        public string? EducationLevel { get; set; }
        public string? Major { get; set; }
        public decimal? GPA { get; set; }

        public string? Department { get; set; }
    }
    public class EditInstructorProfileVM
    {
        public string Name { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; }
        public string RoleTitle { get; set; } = "Instructor";
        public string About { get; set; } = string.Empty;

        // Instructor-specific fields
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string? Country { get; set; }
        public string? Specialization { get; set; }

        // Social Links
        public string? LinkedIn { get; set; }
        public string? GitHub { get; set; }
        public string? Facebook { get; set; }
        public string? Twitter { get; set; }
    }

    public class EditAdminProfileVM
    {
        public string Name { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; }
        public string RoleTitle { get; set; } = "Admin";
        public string About { get; set; } = string.Empty;

        // Admin-specific fields
        public string? Department { get; set; }
        public string? RoleLevel { get; set; }

        // Social links
        public string? Facebook { get; set; }
        public string? Twitter { get; set; }
        public string? LinkedIn { get; set; }
        public string? YouTube { get; set; }
    }


}
