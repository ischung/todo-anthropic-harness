import { useState } from 'react'
import Calendar from './components/Calendar'
import TodoPanel from './components/TodoPanel'

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(todayStr())

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <h1 className="text-xl font-bold text-indigo-700 tracking-tight">DateTodo</h1>
          <span className="text-sm text-slate-400 ml-2">날짜별 할일 관리</span>
        </div>
      </header>

      {/* 메인 레이아웃 */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <TodoPanel selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  )
}
