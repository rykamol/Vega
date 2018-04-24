using vega.Extensions;

namespace vega.Core.Models
{
    public class VehicleQuery:IQueryObj
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string  SortBy { get; set; } 
        public bool IsSortAssending { get; set; }       
    }
}