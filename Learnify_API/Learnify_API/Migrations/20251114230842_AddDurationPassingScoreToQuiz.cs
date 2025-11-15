using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learnify_API.Migrations
{
    public partial class AddDurationPassingScoreToQuiz : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // إضافة العمود Duration
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // إضافة العمود PassingScore
            migrationBuilder.AddColumn<int>(
                name: "PassingScore",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // إزالة العمود Duration
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Quizzes");

            // إزالة العمود PassingScore
            migrationBuilder.DropColumn(
                name: "PassingScore",
                table: "Quizzes");
        }
    }
}
