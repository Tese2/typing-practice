import { Activity, Award, ChartNoAxesColumnIncreasing, Clock3, Crosshair, Gauge, Sparkles } from 'lucide-react'
import { ProgressChart } from '../components/ProgressChart'
import { StatCard } from '../components/StatCard'
import type { TestResult } from '../types/typing'
import { useState } from 'react'

interface StatisticsProps { history: TestResult[]; onPractice: () => void }

export function Statistics({ history, onPractice }: StatisticsProps) {
  const [range, setRange] = useState<'7' | '30' | 'all'>('all')
  const cutoff = range === 'all' ? 0 : Date.now() - Number(range) * 24 * 60 * 60 * 1000
  const filteredHistory = history.filter((result) => range === 'all' || Date.parse(result.date) >= cutoff)
  const count = filteredHistory.length
  const bestWpm = Math.max(0, ...filteredHistory.map((result) => result.wpm))
  const averageWpm = count ? Math.round(filteredHistory.reduce((sum, result) => sum + result.wpm, 0) / count) : 0
  const bestAccuracy = Math.max(0, ...filteredHistory.map((result) => result.accuracy))
  const averageAccuracy = count ? Math.round(filteredHistory.reduce((sum, result) => sum + result.accuracy, 0) / count) : 0
  const totalSeconds = filteredHistory.reduce((sum, result) => sum + result.durationSeconds, 0)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const practiceTime = totalMinutes ? `${totalMinutes}m ${totalSeconds % 60}s` : `${totalSeconds}s`
  const categoryCounts = new Map<string, number>()
  filteredHistory.forEach((result) => categoryCounts.set(result.category, (categoryCounts.get(result.category) ?? 0) + 1))
  const languageCounts = new Map<string, number>()
  filteredHistory.filter((result) => result.category === 'Programming').forEach((result) => languageCounts.set(result.language ?? 'Unknown', (languageCounts.get(result.language ?? 'Unknown') ?? 0) + 1))
  const mostCategory = [...categoryCounts].sort((left, right) => right[1] - left[1])[0]?.[0] ?? '—'
  const mostLanguage = [...languageCounts].sort((left, right) => right[1] - left[1])[0]?.[0] ?? '—'
  const recentAverage = filteredHistory.slice(0, 5).reduce((sum, result) => sum + result.wpm, 0) / Math.max(1, Math.min(5, count))
  const earlier = filteredHistory.slice(5, 10)
  const earlierAverage = earlier.length ? earlier.reduce((sum, result) => sum + result.wpm, 0) / earlier.length : 0
  const improvement = count > 1 && earlier.length ? Math.round(recentAverage - earlierAverage) : 0
  return <main className="page-main data-page stats-page"><div className="page-heading compact-heading"><span className="section-kicker">THE BIGGER PICTURE</span><h1>Look how far <em>you’ve come.</em></h1><p>Small, consistent moments make a real difference. Here’s yours.</p></div>
    <div className="stats-range" role="group" aria-label="Statistics time range">{([['7', '7 days'], ['30', '30 days'], ['all', 'All time']] as const).map(([value, label]) => <button key={value} className={range === value ? 'selected' : ''} aria-pressed={range === value} onClick={() => setRange(value)}>{label}</button>)}</div>
    <div className="stats-grid"><StatCard label="Best speed" value={bestWpm ? `${bestWpm} WPM` : '—'} note="your personal record" icon={<Award size={18}/>} accent="lime"/><StatCard label="Average speed" value={averageWpm ? `${averageWpm} WPM` : '—'} note="across selected sessions" icon={<Gauge size={18}/>} accent="blue"/><StatCard label="Best accuracy" value={bestAccuracy ? `${bestAccuracy}%` : '—'} note="your clearest run" icon={<Crosshair size={18}/>} accent="peach"/><StatCard label="Average accuracy" value={averageAccuracy ? `${averageAccuracy}%` : '—'} note="across selected sessions" icon={<Activity size={18}/>} accent="sage"/><StatCard label="Total tests" value={count} note="in this time range" icon={<Sparkles size={18}/>} accent="blue"/><StatCard label="Practice time" value={practiceTime} note="time well spent" icon={<Clock3 size={18}/>} accent="peach"/><StatCard label="Most practiced" value={mostCategory} note="category" icon={<Activity size={18}/>} accent="sage"/><StatCard label="Programming focus" value={mostLanguage} note="most practiced language" icon={<Gauge size={18}/>} accent="lime"/><StatCard label="Recent improvement" value={count > 1 && earlier.length ? `${improvement > 0 ? '+' : ''}${improvement} WPM` : 'Building baseline'} note="recent average vs. previous five" icon={<ChartNoAxesColumnIncreasing size={18}/>} accent="peach"/></div>
    <section className="chart-panel"><div className="chart-heading"><div><span className="section-kicker">A STEADY CLIMB</span><h2>Your speed over time</h2></div><span className="chart-legend"><i/> WPM</span></div><ProgressChart results={filteredHistory}/></section>
    {count === 0 && <button className="button button-green stats-cta" onClick={onPractice}>Make your first mark <span aria-hidden="true">↗</span></button>}
  </main>
}