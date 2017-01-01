import markdownIt from 'markdown-it'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownitContainer from 'markdown-it-container'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItGithubToc from 'markdown-it-github-toc'
import markdownitIcon from 'markdown-it-icon'

class Engine {
  constructor (options = {}, extensions = []) {
    this.mdc = markdownIt(options)
    if (options.linkify === true) {
      this.mdc.linkify.set({ fuzzyLink: false })
    }
    extensions.forEach((extension) => {
      switch (extension) {
        case 'mark':
          this.mdc = this.mdc.use(markdownItMark)
          break
        case 'ins':
          this.mdc = this.mdc.use(markdownItIns)
          break
        case 'sub':
          this.mdc = this.mdc.use(markdownItSub)
          break
        case 'sup':
          this.mdc = this.mdc.use(markdownItSup)
          break
        case 'deflist':
          this.mdc = this.mdc.use(markdownItDeflist)
          break
        case 'abbr':
          this.mdc = this.mdc.use(markdownItAbbr)
          break
        case 'footnote':
          this.mdc = this.mdc.use(markdownItFootnote)
          break
        case 'container':
          this.mdc = this.mdc.use(markdownitContainer, 'success')
          this.mdc = this.mdc.use(markdownitContainer, 'info')
          this.mdc = this.mdc.use(markdownitContainer, 'warning')
          this.mdc = this.mdc.use(markdownitContainer, 'danger')
          break
        case 'github-toc':
          this.mdc = this.mdc.use(markdownItGithubToc, {
            tocFirstLevel: 2,
            tocLastLevel: 3,
            tocClassName: 'toc',
            anchorLinkSymbol: '',
            anchorLinkSpace: false,
            anchorClassName: 'anchor',
            anchorLinkSymbolClassName: 'octicon octicon-link'
          })
          break
        default:
          switch (extension.name) {
            case 'icon':
              const options = extension.options || {}
              this.mdc = this.mdc.use(markdownitIcon)
              this.mdc.renderer.rules.emoji = function (tokens, idx) {
                let shortname = tokens[idx].markup
                if (shortname.startsWith('fa-')) { // fontawesome
                  return options.fontawesome ? `<i class="fa ${shortname}"></i>` : `:${shortname}:`
                }
                if (shortname.startsWith('ion-')) { // ionicons
                  return options.ionicons ? `<i class="${shortname}"></i>` : `:${shortname}:`
                }
                return `<i class="e1a-${shortname}"></i>`
              }
              break
            default:
              break
          }
          break
      }
    })
  }
}

export default Engine
