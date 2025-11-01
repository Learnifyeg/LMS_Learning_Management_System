using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learnify_API.Migrations
{
    /// <inheritdoc />
    public partial class updateprofile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "profiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_profiles_UserId",
                table: "profiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_profiles_Users_UserId",
                table: "profiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_profiles_Users_UserId",
                table: "profiles");

            migrationBuilder.DropIndex(
                name: "IX_profiles_UserId",
                table: "profiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "profiles");
        }
    }
}
