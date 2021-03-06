namespace vega.Extensions
{
    public interface IQueryObj
    {
        string SortBy { get; set; }
        bool IsSortAssending { get; set; }
        int Page { get; set; }
        byte PageSize { get; set; }
    }
}