using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(100)]
    public string UserName {get; set;} = string.Empty;

    [Required]
    [MaxLength(100)]
    [StringLength(90, MinimumLength = 6)]
    public string Password {get; set;} = string.Empty;
}
