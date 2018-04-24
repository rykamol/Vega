using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using vega.Core.Models;

namespace vega.Extensions
{
    public static class IQueryableExtension
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObj queryObj, Dictionary<string, Expression<Func<T, object>>> columsMap)
        {

            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columsMap.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.IsSortAssending)
                return query.OrderBy(columsMap[queryObj.SortBy]);
            else
                return query.OrderByDescending(columsMap[queryObj.SortBy]);




            // if (queryObj.SortBy == "make")
            //     query = (queryObj.IsSortAssending) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);
            // if (queryObj.SortBy == "model")
            //     query = (queryObj.IsSortAssending) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);
            // if (queryObj.SortBy == "contactName")
            //     query = (queryObj.IsSortAssending) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);
            // if (queryObj.SortBy == "id")
            //     query = (queryObj.IsSortAssending) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObj queryObj)
        {
            if(queryObj.Page <= 0)
              queryObj.Page=1;

            if(queryObj.PageSize <=0)
              queryObj.PageSize=10;
              
            return query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }
    }
}
