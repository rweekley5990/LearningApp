using System;
using System.ComponentModel;

namespace API.DTOs;

public class UserDto
{
  public required string UserName {get; set;}
  public required string Token {get; set;}
}
