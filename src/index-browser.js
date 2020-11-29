import 'github-css'

import mdc from './index-node'
import Chart from 'chart.js'
import Cookies from 'js-cookie'

import 'markdown-it-latex/dist/index.css'
import 'markdown-it-icons/dist/index.css'
import 'markdown-it-highlight/dist/index.css'
import './index.css'

mdc.mermaid.loadPreferences(Cookies) // load mermaid preferences from Cookie

// below is code sample to load mermaid preference from memory
/*
mdc.mermaid.loadPreferences({
  get: key => {
    if (key === 'mermaid-theme') {
      return 'forest'
    } else if (key === 'gantt-axis-format') {
      return '%Y/%m/%d'
    } else {
      return undefined
    }
  }
})
*/

mdc.inited = () => {
  // this is a hook method
}
mdc.init = (markdown) => {
  let result = mdc.render(markdown)
  document.getElementById('preview').innerHTML = result

  // mermaid
  mdc.mermaid.init(undefined, document.querySelectorAll('#preview .mermaid'))

  // charts
  document.querySelectorAll('#preview .chartjs').forEach(element => {
    try {
      new Chart(element, JSON.parse(element.textContent)) // eslint-disable-line no-new
    } catch (e) {
      element.outerHTML = `<pre>Chart.js complains: "${e}"</pre>`
    }
  })

  // markmap
  const { Markmap, loadCSS, loadJS, loadPlugins } = window.markmap;
  const mindmaps = document.querySelectorAll('#preview .markmap-svg');
  for(const mindmap of mindmaps) {
      data = JSON.parse(mindmap.innerHTML)
      // 1. load assets
      if (data.styles) loadCSS(data.styles);
      if (data.scripts) loadJS(data.scripts, { getMarkmap: () => window.markmap });
      // 2. create markmap
      Markmap.create(mindmap, null, data.root);
  }

  mdc.inited()
}

export default mdc
