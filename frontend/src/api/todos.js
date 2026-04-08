const BASE = 'http://localhost:8001/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const getTodos = (date) =>
  request(`/todos${date ? `?date=${date}` : ''}`)

export const createTodo = (data) =>
  request('/todos', { method: 'POST', body: JSON.stringify(data) })

export const updateTodo = (id, data) =>
  request(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(data) })

export const deleteTodo = (id) =>
  request(`/todos/${id}`, { method: 'DELETE' })
