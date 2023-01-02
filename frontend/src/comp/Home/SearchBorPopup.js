import { useState } from 'react';
import { offset, autoUpdate, useFloating, shift, useInteractions, useHover, safePolygon } from '@floating-ui/react-dom-interactions';
import { ReactComponent as Search } from '../../assets/svg/common/seach.svg';

function SearchBorPopup({ value = "", onChange = () => { } }) {
  const [hover, setHover] = useState(false)

  const { x, y, reference, floating, strategy, context } = useFloating({
    open: hover,
    onOpenChange: setHover,
    placement: 'top',
    strategy: "fixed",
    middleware: [
      offset({ mainAxis: 10 }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({ restMs: 25 }),
      delay: { open: 50 }
    }),
  ])

  return (
    <>
      <button
        className={`p-0 ${value || hover ? "" : "opacity-0 group-hover:opacity-100"}`}
        {...getReferenceProps({ ref: reference })}
      >
        <Search className="fill-white w-3 h-3" />
      </button>

      {
        hover &&
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? "",
              left: x ?? "",
            }
          })}
          className="animate-enter"
        >
          <input
            className='bg-slate-700 text-white shadow-sm shadow-slate-100 border-none'
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
      }
    </>
  )
}

export default SearchBorPopup