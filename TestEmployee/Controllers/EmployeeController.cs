using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestEmployee.Controllers
{
    [ApiController]
    [Route("employees")]
    public class EmployeeController : Controller
    {
        public Context _db;
        public EmployeeController(Context db)
        {
            _db = db;
            if (!_db.Employees.Any())
            {
                _db.Employees.Add(new Employee() { Firstname = "Nazar", Lastname = "Onyshchenko", Gender = "Male", City = "Kyiv" });
                _db.Employees.Add(new Employee() { Firstname = "Yana", Lastname = "Denysenko", Gender = "Female", City = "Kyiv" });
                _db.SaveChanges();
            }
        }
        
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _db.Employees.ToList();
        }
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return _db.Employees.FirstOrDefault(x => x.Id == id);
        }
        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            if (ModelState.IsValid)
            {
                _db.Employees.Add(employee);
                _db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }
        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            if (ModelState.IsValid)
            {
                _db.Update(employee);
                _db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee employee = _db.Employees.FirstOrDefault(x => x.Id == id);
            if (employee != null)
            {
                _db.Employees.Remove(employee);
                _db.SaveChanges();
            }
            return Ok(employee);
        }
    }
}
