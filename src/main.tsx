import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import YahrzeitWidget from './YahrzeitWidget'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <YahrzeitWidget />
  </StrictMode>,
)
