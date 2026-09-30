import { ArrowLeft, ChartNoAxesColumnIncreasing } from 'lucide-react'
import { ResultCard } from '../components/ResultCard'
import type { TestResult } from '../types/typing'

interface ResultsProps { result?: TestResult; onRetry: () => void; onPractice: () => void; onNextPractice: () => void; onHistory: () => void }

export function Results({ result, onRetry, onPractice, onNextPractice, onHistory }: ResultsProps) {
  if (!result) return <main className="page-main empty-page"><div className="empty-icon"><ChartNoAxesColumnIncreasing size={24}/></div><span className="section-kicker">NO SESSION YET</span><h1>Your next best<br /><em>starts here.</em></h1><p>Finish a practice round and your detailed results will show up here.</p><button className="button button-dark" onClick={onPractice}>Start a test <ArrowLeft size={15}/></button></main>
  return <main className="page-main results-page"><button className="back-link" onClick={onHistory}><ArrowLeft size={15}/> All sessions</button><ResultCard result={result} onRetry={onRetry} onPractice={onPractice} onNextPractice={onNextPractice} onHistory={onHistory}/></main>
}