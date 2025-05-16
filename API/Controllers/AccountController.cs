using System;
using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] //account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.UserName)) return BadRequest("Username already exists");
        return Ok();
        // using var hmac = new HMACSHA512();

        // var user = new AppUser
        // {
        //     UserName = registerDto.UserName.ToLower(),
        //     PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };

        // context.Users.Add(user);
        // await context.SaveChangesAsync();

        // return new UserDto{
        //     UserName = user.UserName,
        //     Token = tokenService.CreateToken(user)

        // };
    }

    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());//can use string comp, but EF does not work well with this
    }


    [HttpPost("login")] //account/login
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users
        //SingleOrDefaultAsync is used to get a single user or null if not found .SingleOrDefaultAsync(x => x.UserName == loginDto.username.ToLower())
        //FirstOrDefaultAsync is used to get the first user or null if not found .FirstOrDefaultAsync(x => x.UserName == loginDto.username.ToLower()); 
            .FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower()); 
        if (user == null) return Unauthorized("Invalid username");

        //compares uses the key (salt) when computing the hash, giving the same hash vaule as the one stored in the database when account was created
        //This is used to compare the passwords accurately
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }
}
