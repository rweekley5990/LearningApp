using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [Required]
    [MaxLength(100)]
    public required string UserName {get; set;} = string.Empty;

    [Required]
    [MaxLength(100)]
    public required string Password {get; set;} = string.Empty;
}
