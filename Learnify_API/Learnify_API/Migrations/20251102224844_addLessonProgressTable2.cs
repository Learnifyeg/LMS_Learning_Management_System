using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learnify_API.Migrations
{
    /// <inheritdoc />
    public partial class addLessonProgressTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonProgress_Lessons_LessonId",
                table: "LessonProgress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonProgress",
                table: "LessonProgress");

            migrationBuilder.RenameTable(
                name: "LessonProgress",
                newName: "LessonProgresses");

            migrationBuilder.RenameIndex(
                name: "IX_LessonProgress_LessonId",
                table: "LessonProgresses",
                newName: "IX_LessonProgresses_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonProgresses",
                table: "LessonProgresses",
                column: "ProgressId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonProgresses_Lessons_LessonId",
                table: "LessonProgresses",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonProgresses_Lessons_LessonId",
                table: "LessonProgresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonProgresses",
                table: "LessonProgresses");

            migrationBuilder.RenameTable(
                name: "LessonProgresses",
                newName: "LessonProgress");

            migrationBuilder.RenameIndex(
                name: "IX_LessonProgresses_LessonId",
                table: "LessonProgress",
                newName: "IX_LessonProgress_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonProgress",
                table: "LessonProgress",
                column: "ProgressId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonProgress_Lessons_LessonId",
                table: "LessonProgress",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
