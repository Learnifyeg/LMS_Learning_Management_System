using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learnify_API.Migrations
{
    /// <inheritdoc />
    public partial class addprofiletable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "profiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_Avatar = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    User_RoleTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SocialLinks_Facebook = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SocialLinks_Twitter = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SocialLinks_LinkedIn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SocialLinks_Github = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    About = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profiles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "profiles");
        }
    }
}
