import React from 'react'
import ReactDOM from 'react-dom/client'
import { MathJaxContext } from 'better-react-mathjax'
import App from './App'
import './styles/global.css'
import './styles/app.css'

const mathjaxConfig = {
  loader: { load: ['[tex]/ams'] },
  tex: {
    packages: { '[+]': ['ams'] },
    inlineMath:  [['$', '$'],   ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
  },
  startup: {
    typeset: false,   // ← KEY CHANGE: disable global auto-typeset
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MathJaxContext config={mathjaxConfig} version={3}>
      <App />
    </MathJaxContext>
  </React.StrictMode>
)