using System.Threading.Tasks;

namespace vega.Persistance.UnitOfWork
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}