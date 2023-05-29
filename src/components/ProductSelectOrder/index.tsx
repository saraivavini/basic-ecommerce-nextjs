'use client';

import useQueryParams from "@/hooks/useQueryParams";

type FilterOption = {
  value: number;
  description: string;
};

const FILTER_OPTIONS = [{
  value: 0,
  description: 'Price: Highest to lowest',
},
{
  value: 1,
  description: 'Price: Lowest to highest'
}]

type ProductSelectOrderProps = {
  sort?: {
    sortBy: string;
    order: 'ASC' | 'DESC';
  }
}

export default function ProductSelectOrder({ sort }: ProductSelectOrderProps) {
  const { setQueryParams } = useQueryParams();

  const selectedFilter = (() => {
    if (!sort) return '';

    return sort.order === 'DESC' ? 0 : 1;
  })();

  const handleSelectFilter = (filter: FilterOption) => {
    setQueryParams({
      sortBy: 'price',
      order: filter.value === 0 ? 'DESC' : 'ASC'
    });
  }

  const className = "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

  return (
    <div className="w-52">
      <label htmlFor="sort_by">
        Sort by
      </label>
      <select id="sort_by" className={className} value={selectedFilter}>
        {FILTER_OPTIONS.map(filter => (
          <option key={filter.value} value={filter.value} onClick={() => handleSelectFilter(filter)}>{filter.description}</option>
        ))}
      </select>
    </div>
  )
}
