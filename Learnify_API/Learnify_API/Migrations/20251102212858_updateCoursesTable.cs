using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learnify_API.Migrations
{
    /// <inheritdoc />
    public partial class updateCoursesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Courses",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CertificateIncluded",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hours",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Posted",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Courses",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "StudentsEnrolled",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Views",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CertificateIncluded",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Hours",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Posted",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StudentsEnrolled",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Views",
                table: "Courses");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Courses",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);
        }
    }
}
