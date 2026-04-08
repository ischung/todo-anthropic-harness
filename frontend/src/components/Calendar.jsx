import { useState } from 'react'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

function toYMD(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const todayStr = toYMD(today.getFullYear(), today.getMonth(), today.getDate())

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 select-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition"
        >
          ‹
        </button>
        <span className="font-semibold text-slate-800">
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition"
        >
          ›
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-medium py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />
          const dateStr = toYMD(viewYear, viewMonth, day)
          const isSelected = dateStr === selectedDate
          const isToday = dateStr === todayStr
          const dow = (firstDay + day - 1) % 7

          return (
            <button
              key={day}
              onClick={() => onSelectDate(dateStr)}
              className={[
                'relative mx-auto w-9 h-9 flex items-center justify-center rounded-full text-sm transition',
                isSelected
                  ? 'bg-indigo-600 text-white font-semibold shadow'
                  : isToday
                  ? 'border-2 border-indigo-400 text-indigo-600 font-semibold'
                  : dow === 0
                  ? 'text-red-400 hover:bg-red-50'
                  : dow === 6
                  ? 'text-blue-400 hover:bg-blue-50'
                  : 'text-slate-700 hover:bg-slate-100',
              ].join(' ')}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
