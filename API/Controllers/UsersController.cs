using System;
using System.ComponentModel;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(IUserRepository userRepository) : BaseApiController
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();


        return Ok(users);
    }

    [Authorize]
    [HttpGet("{id:int}")] // /api/users/username
    public async Task<ActionResult<MemberDto>> GetUserById(int id)
    {
        var user = await userRepository.GetMemberAsyncId(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }


    
    [Authorize]
    [HttpGet("{username}")] // /api/users/username
    public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
    {
        var user = await userRepository.GetMemberAsync(username);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
    
    
}
