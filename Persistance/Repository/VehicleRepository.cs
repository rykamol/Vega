using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Core;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Linq.Expressions;
using vega.Extensions;

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

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var query = context.Vehicles
            .Include(f => f.Features)
            .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
            .ThenInclude(m => m.Make).AsQueryable();

            if (queryObj.MakeId.HasValue && queryObj.ModelId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value && v.ModelId == queryObj.ModelId.Value);
            else if(queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            var columsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = m => m.Model.Name,
                ["contactName"] = c => c.ContactName,
                ["id"] = v => v.Id
            };

            query = query.ApplyOrdering(queryObj, columsMap);

            return await query.ToListAsync();
        }
    }
}
