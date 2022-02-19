export function tasksParser(data) {
  const total = data.hits.total.value
  const { hits } = data.hits
  return {
    total,
    data: hits.map(d => ({ ...d._source, id: d._id }))
  }
}