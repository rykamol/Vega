using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistance.RepositoryInterfaces
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id,bool includeRelated=true);
        void CreateVehicle(Vehicle vehicle);
        void DeleteVehicle(Vehicle vehicle);
    }
}