import mdc from '../src/index-browser'

const request = new window.XMLHttpRequest()
request.onload = function () {
  mdc.init(this.response)
  if (window.location.hash.length > 0) {
    const element = document.getElementById(window.location.hash.substr(1))
    if (element) {
      document.body.scrollTop = element.getBoundingClientRect().top
    }
  }
}
var params = new window.URLSearchParams(window.location.search);
document.title = params.get('name')
request.open('GET', params.get('name'))
request.send()
