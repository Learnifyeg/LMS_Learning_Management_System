using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learnify_API.Migrations
{
    /// <inheritdoc />
    public partial class EditFeedBack1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "image",
                table: "feedBacks",
                newName: "feedbackimage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "feedbackimage",
                table: "feedBacks",
                newName: "image");
        }
    }
}
