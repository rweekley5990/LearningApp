using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ErrorController(DataContext context) : BaseApiController
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string>Getauth()
    {
        return "Error - Auth";
    }


  
    [HttpGet("not-found")]
    public ActionResult<AppUser>GetNotFound()
    {
        var user = context.Users.Find(-1);
        if (user == null) return NotFound();

        return user;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUser>GetServerError()
    {
        try
        {
               var user = context.Users.Find(-1) ?? throw new Exception("Error Occured - server error");

               return user;
        }

        catch //(Exception ex)
        { 
            throw new Exception("The Server Did Not Handle This Request As Expected");
            //return StatusCode(500, "The Server Did Not Handle This Request As Expected");
        }
     
    }

    [HttpGet("bad-request")]
    public ActionResult<string>GetBadRequest()
    {
        return BadRequest("Error - Bad Request");
    }
}
