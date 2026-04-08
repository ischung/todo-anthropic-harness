import { useState } from 'react'

const PRIORITIES = [
  { value: 'HIGH', label: '높음', color: 'text-red-600 bg-red-50 border-red-200' },
  { value: 'MEDIUM', label: '보통', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  { value: 'LOW', label: '낮음', color: 'text-green-600 bg-green-50 border-green-200' },
]

export default function TodoForm({ selectedDate, onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('할일 제목을 입력해주세요.'); return }
    setError('')
    setLoading(true)
    try {
      await onAdd({ title: title.trim(), date: selectedDate, priority })
      setTitle('')
      setPriority('MEDIUM')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setError('') }}
          placeholder="새 할일을 입력하세요..."
          maxLength={200}
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-medium"
        >
          {loading ? '...' : '추가'}
        </button>
      </div>

      {/* 우선순위 선택 */}
      <div className="flex gap-2">
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={[
              'flex-1 py-1 text-xs rounded-md border transition font-medium',
              priority === p.value ? p.color + ' border-current' : 'text-slate-400 bg-white border-slate-200 hover:border-slate-300',
            ].join(' ')}
          >
            {p.label}
          </button>
        ))}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  )
}
