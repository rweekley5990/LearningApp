using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;


namespace API.Data;

//clase with primary constructor
public class DataContext(DbContextOptions options) : DbContext(options)
{
    //Create a DBSet of type AppUser - this will make a "users" table
    public DbSet<AppUser> Users {get; set;}
}
