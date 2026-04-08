import { useEffect, useState, useCallback } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'

function formatDateKR(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dow = new Date(dateStr).getDay()
  return `${y}년 ${Number(m)}월 ${Number(d)}일 (${days[dow]})`
}

export default function TodoPanel({ selectedDate }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchTodos = useCallback(async () => {
    if (!selectedDate) return
    setLoading(true)
    try {
      const data = await getTodos(selectedDate)
      setTodos(data)
    } catch {
      showToast('할일 목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => { fetchTodos() }, [fetchTodos])

  async function handleAdd(payload) {
    const todo = await createTodo(payload)
    setTodos(prev => [...prev, todo])
  }

  async function handleToggle(todo) {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed })
      setTodos(prev => prev.map(t => t.id === updated.id ? updated : t))
    } catch {
      showToast('상태 변경에 실패했습니다.')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id)
      setTodos(prev => prev.filter(t => t.id !== id))
    } catch {
      showToast('삭제에 실패했습니다.')
    }
  }

  const done = todos.filter(t => t.completed).length

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col min-h-[480px]">
      {/* 패널 헤더 */}
      <div className="border-b border-slate-100 pb-4 mb-1">
        {selectedDate ? (
          <>
            <h2 className="text-base font-semibold text-slate-800">
              {formatDateKR(selectedDate)}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {todos.length > 0
                ? `${todos.length}개 중 ${done}개 완료`
                : '할일 없음'}
            </p>
          </>
        ) : (
          <h2 className="text-base font-semibold text-slate-400">날짜를 선택하세요</h2>
        )}
      </div>

      {/* 할일 목록 */}
      <div className="flex-1 overflow-y-auto">
        {!selectedDate ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-300">
            <span className="text-4xl mb-2">📅</span>
            <p className="text-sm">왼쪽 달력에서 날짜를 선택해보세요</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-32 text-slate-300 text-sm">
            불러오는 중...
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-300">
            <span className="text-4xl mb-2">✨</span>
            <p className="text-sm">이 날의 할일이 없습니다</p>
            <p className="text-xs mt-1">아래에서 추가해보세요!</p>
          </div>
        ) : (
          <ul className="space-y-0.5 mt-1">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>

      {/* 할일 추가 폼 */}
      {selectedDate && (
        <div className="border-t border-slate-100 pt-3 mt-3">
          <TodoForm selectedDate={selectedDate} onAdd={handleAdd} />
        </div>
      )}

      {/* 토스트 알림 */}
      {toast && (
        <div className={[
          'fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm text-white shadow-lg z-50 transition',
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500',
        ].join(' ')}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
