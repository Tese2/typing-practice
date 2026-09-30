import type { TestResult } from '../types/typing'

interface ProgressChartProps { results: TestResult[] }

export function ProgressChart({ results }: ProgressChartProps) {
  const points = [...results].reverse().slice(-12)
  if (points.length === 0) return <div className="chart-empty">Complete a test to see your progress take shape.</div>
  const max = Math.max(20, ...points.map((item) => item.wpm))
  const min = Math.min(0, ...points.map((item) => item.wpm))
  const coords = points.map((item, index) => ({ x: points.length === 1 ? 50 : 8 + (index / (points.length - 1)) * 84, y: 86 - (item.wpm / max) * 72, item }))
  const polyline = coords.map(({ x, y }) => `${x},${y}`).join(' ')
  return <div className="chart-wrap">
    <div className="chart-summary"><strong>{points.at(-1)?.wpm} <small>WPM</small></strong><span>Last {points.length} sessions</span></div>
    <svg className="progress-chart" viewBox="0 0 100 100" role="img" aria-label={`Typing speed trend over ${points.length} recent tests`} preserveAspectRatio="none">
      <title>Typing speed across recent tests</title>
      {[20, 42, 64, 86].map((y) => <line key={y} x1="4" x2="96" y1={y} y2={y} className="chart-gridline" />)}
      <polygon points={`8,86 ${polyline} ${coords.at(-1)?.x},86`} className="chart-area" />
      <polyline points={polyline} className="chart-line" />
      {coords.map(({ x, y, item }) => <circle key={item.id} cx={x} cy={y} r="1.5" className="chart-dot"><title>{item.wpm} WPM</title></circle>)}
    </svg>
    <div className="chart-axis"><span>{min} WPM</span><span>{max} WPM</span></div>
  </div>
}