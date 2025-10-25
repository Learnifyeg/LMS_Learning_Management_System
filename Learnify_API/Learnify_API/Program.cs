using Learnify_API.Data;
using Learnify_API.Data.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


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
            builder.Services.AddTransient<FeedbackService>();
            //  Add CORS Policy
           builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

            // Add services for Swagger
            builder.Services.AddScoped<StudentService>();
            builder.Services.AddScoped<InstructorService>();
            builder.Services.AddScoped<AdminService>();
            builder.Services.AddScoped<AuthService>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            // --------------------------------- JWT Configuration --------------------------------------------

            var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

            builder.Services.AddAuthorization();
            builder.Services.AddScoped<EmailService>();

            // --------------------------------- JWT Configuration --------------------------------------------


            // --------------------------------- Swagger Security Setup --------------------------------------------

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.",
                    Name = "Authorization",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[]{}
                    }
                      });
            });



            // --------------------------------- Swagger Security Setup --------------------------------------------

            var app = builder.Build();
            app.UseCors("AllowAll");


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            // Use CORS before authorization
            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
