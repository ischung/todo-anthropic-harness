const PRIORITY_STYLES = {
  HIGH:   { dot: 'bg-red-500',    badge: 'text-red-600 bg-red-50 border-red-200',    label: '높음' },
  MEDIUM: { dot: 'bg-yellow-400', badge: 'text-yellow-600 bg-yellow-50 border-yellow-200', label: '보통' },
  LOW:    { dot: 'bg-green-500',  badge: 'text-green-600 bg-green-50 border-green-200',   label: '낮음' },
}

export default function TodoItem({ todo, onToggle, onDelete }) {
  const style = PRIORITY_STYLES[todo.priority]

  return (
    <li className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition group">
      {/* 체크박스 */}
      <button
        onClick={() => onToggle(todo)}
        className={[
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-300 hover:border-indigo-400',
        ].join(' ')}
      >
        {todo.completed && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* 우선순위 점 */}
      <span className={`flex-shrink-0 w-2 h-2 rounded-full ${style.dot}`} />

      {/* 제목 */}
      <span className={[
        'flex-1 text-sm',
        todo.completed ? 'line-through text-slate-400' : 'text-slate-700',
      ].join(' ')}>
        {todo.title}
      </span>

      {/* 우선순위 뱃지 */}
      <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${style.badge}`}>
        {style.label}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition"
      >
        ×
      </button>
    </li>
  )
}
