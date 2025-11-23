using Learnify_API.Data.Models;
using Learnify_API.Data.Static;
using Microsoft.AspNetCore.Identity;

namespace Learnify_API.Data
{
    public class AppDbInitializer
    {
        public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                //If Roles are not created, then create them
                if (!await roleManager.RoleExistsAsync("Admin"))
                {
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                }
                if (!await roleManager.RoleExistsAsync("User"))
                {
                    await roleManager.CreateAsync(new IdentityRole("User"));
                }
                // Create a default Admin User
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                string adminUserEmail = "admin@admin.com";
                var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
                if (adminUser == null)
                {
                    var newAdminUser = new AppUser()
                    {
                        UserName = "admin-user",
                        Email = adminUserEmail,
                        FullName = "Admin User",
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(newAdminUser, "Admin@123");
                    await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
                }

                // Create a default Application Instructor User
                string appInstructorEmail = "Inst@Inst.com";
                var appUserInst = await userManager.FindByEmailAsync(appInstructorEmail);
                if (appUserInst == null)
                {
                    var newAppUser = new AppUser()
                    {
                        UserName = "app-inst",
                        Email = appInstructorEmail,
                        FullName = "Application Instructor",
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(newAppUser, "Inst@123");
                    await userManager.AddToRoleAsync(newAppUser, UserRoles.User);

                }

                // Create a default Application Instructor User
                string appStudentEmail = "Inst@Inst.com";
                var appUserStud = await userManager.FindByEmailAsync(appStudentEmail);
                if (appUserStud == null)
                {
                    var newAppUser = new AppUser()
                    {
                        UserName = "app-inst",
                        Email = appStudentEmail,
                        FullName = "Application Instructor",
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(newAppUser, "Stud@123");
                    await userManager.AddToRoleAsync(newAppUser, UserRoles.User);

                }



            }
        }

    }
}
