using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Core;
using System.Collections.Generic;
using System.Linq;

namespace vega.Persistance.Repository
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            var vehicle = await context.Vehicles
            .Include(f => f.Features)
            .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
            .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == id);
            return vehicle;
        }

        public void CreateVehicle(Vehicle vehicle)
        {
            context.Add(vehicle);
        }

        public void DeleteVehicle(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(Filters filter)
        {
            var query = context.Vehicles
            .Include(f => f.Features)
            .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
            .ThenInclude(m => m.Make).AsQueryable();



            if (filter.MakeId.HasValue && filter.ModelId.HasValue)
                query = query.Where(v => v.Model.MakeId == filter.MakeId.Value && v.ModelId == filter.ModelId.Value);
           else 
                query = query.Where(v => v.Model.MakeId == filter.MakeId.Value);

            return await query.ToListAsync();
        }
    }
}
