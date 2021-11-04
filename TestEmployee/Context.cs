using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TestEmployee
{
    public class Context:DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public Context(DbContextOptions<Context> options) : base(options) {
            Database.EnsureCreated();
        }
        
    }
}
