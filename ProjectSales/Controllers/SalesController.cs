using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectSales.Models;

namespace ProjectSales.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ProjectSalesContext _context;

        public SalesController(ProjectSalesContext context)
        {
            _context = context;
        }

        // GET: Sales/GetSales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            

            var sales = await _context.Sales.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store).ToListAsync();

            return sales;
        }

        // GET: Sales/GetSales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {

            var sales = await _context.Sales.FindAsync(id);

           

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: Sales/PutSales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            //sales.Id = id;

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Sales/PostSales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: Sales/DeleteSales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
