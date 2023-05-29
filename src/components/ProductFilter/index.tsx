'use client';
import useQueryParams from '@/hooks/useQueryParams';
import React, { useMemo, useState } from 'react';

type ProductFilterProps = {
  availableColors: string[];
};

export default function ProductFilter(props: ProductFilterProps) {
  const { availableColors } = props;
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({
    priceMin: 0,
    priceMax: 0,
  })
  const [selectedColor, setSelectedColor] = useState('');
  const { setQueryParams, deleteQueryParams } = useQueryParams<{ priceMin: string; priceMax: string; color: string }>();

  const buttonDisabled = useMemo(() => {
    const areFilteringByPrice = !!priceRange.priceMin || !!priceRange.priceMax;

    return areFilteringByPrice && priceRange.priceMax <= priceRange.priceMin;
  }, [priceRange])

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(prev => ({
      ...prev,
      [event.target.name]: Number(event.target.value),
    }))
  };

  const handleSubmit = () => {
    const areFilteringByPrice = priceRange.priceMin || priceRange.priceMax;
    const priceRangeParams = areFilteringByPrice ? ({
      priceMin: String(priceRange.priceMin),
      priceMax: String(priceRange.priceMax),

    }) : {}

    console.log(JSON.stringify({ priceRange, priceRangeParams }));

    setQueryParams({
      ...priceRangeParams,
      color: selectedColor
    })
  }

  const resetFilters = () => {
    deleteQueryParams(['color', 'priceMin', 'priceMax']);
    setPriceRange({
      priceMin: 0,
      priceMax: 0,
    });
    setSelectedColor('');
  }

  return (
    <div className="ml-4">
      <button className="p-2 bg-black text-white" onClick={toggleOpen}>Filters</button>
      <div className={`absolute z-10 p-3 bg-white shadow rounded-lg right-6 ${open ? '' : 'hidden'}`}>
        <form >
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-md font-medium text-gray-900">Price</h6>
            <button type="button">
              <p className="underline decoration-solid" onClick={resetFilters}>Reset Filters</p>
            </button>
          </div>
          <div className="flex w-full">
            <div className="flex flex-1">
              <label htmlFor="price_min">Min:</label>
              <input
                id="price_min"
                name="priceMin"
                className="w-20 ml-4 border"
                type="number"
                onChange={handleChange}
                min={0}
                value={priceRange.priceMin}
              />
            </div>
            <div className="flex flex-1 ml-4">
              <label htmlFor="price_max">Max: </label>
              <input
                id='price_max'
                name="priceMax"
                className="w-20 ml-4 border"
                type="number"
                onChange={handleChange}
                min={priceRange.priceMin}
                value={priceRange.priceMax}
              />
            </div>
          </div>
          <div className="flex mt-6">
            <h6 className="text-md font-medium text-gray-900">Color</h6>
            {availableColors.map(color => (
              <div
                key={color}
                className={`bg-[${color}] w-8 h-8 rounded-full ml-4 ${selectedColor === color ? 'border border-2 border-gray-900' : ''}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <button className="bg-black w-full text-white mt-8" type="button" onClick={handleSubmit} disabled={buttonDisabled}>Filter</button>
        </form>
      </div>
    </div>
  )
}
