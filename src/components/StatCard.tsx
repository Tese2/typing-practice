import type { ReactNode } from 'react'

interface StatCardProps { label: string; value: string | number; note: string; icon: ReactNode; accent?: string }

export function StatCard({ label, value, note, icon, accent = 'sage' }: StatCardProps) {
  return <article className={`stat-card accent-${accent}`}><div className="stat-card-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><strong>{value}</strong><small>{note}</small></article>
}