import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as Search } from '../../assets/svg/common/seach.svg';

function FilterByDate({ setDateFilter }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const search = () => setDateFilter({ startDate, endDate })

  return (
    <>
      <div className="range-picker animate-enter bg-slate-100 z-10 rounded-lg origin-top-left">
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          startDate={startDate}
          isClearable
          dateFormat="dd-MM-yyyy"
          className='py-1 px-2 w-28'
          placeholderText='From'
        />
      </div>

      <div className="range-picker animate-enter bg-slate-100 z-10 rounded-lg origin-top-left">
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          endDate={endDate}
          isClearable
          dateFormat="dd-MM-yyyy"
          className='py-1 px-2 w-28'
          placeholderText='To'
        />
      </div>

      <Search
        className="w-4 h-4"
        onClick={search}
      />

      {/* {
        searched &&
        <button
          className='text-[11px] px-1.5 py-0.5 bg-slate-700 rounded hover:bg-slate-800'
          onClick={clear}
        >
          Clear Date Filter
        </button>
      } */}
    </>
  )
}

export default FilterByDate