using API_Learnify.Data;
using API_Learnify.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace Learnify_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddDbContext<AppDbContext>(option =>
                option.UseSqlServer(builder.Configuration.GetConnectionString("conString")));

            //  Add CORS Policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .WithOrigins("http://localhost:5173") // Your React app URL
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });

            // Add services for Swagger
            builder.Services.AddScoped<StudentService>();
            builder.Services.AddScoped<InstructorService>();
            builder.Services.AddScoped<AdminService>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Use CORS before authorization
            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
