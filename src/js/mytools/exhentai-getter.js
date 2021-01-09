// heads = {}
// session = requests_html.HTMLSession()

// def __init__(self,cookie):
//     user_agent = requests_html.user_agent()    
//     self.heads['User-Agent'] = user_agent
//     self.heads['Cookie'] = cookie

// def _get_paper_url(self,url):
//     r = self.session.get(url, headers=self.heads)
//     es = r.html.find('.gdtm a')
//     return [e.attrs['href'] for e in es]

// def _parse_paper(self,url):
//     r = self.session.get(url, headers=self.heads)
//     e = r.html.find('#img')
//     return e[0].attrs['src']

// def getAllImg(self,url):
//     urls = self._get_paper_url(url)
//     return [self._parse_paper(u) for u in urls]

// def print_result(self,url):
//     srcs = self.getAllImg(url)
//     result = ''
//     for src in srcs:
//         print(src)
//         result = result + src + '\n'
//     copystr(result)