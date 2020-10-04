const tmpl = module.exports = {
// page layout ... possibly used by other templates
page(data) {
  return `<!doctype html>
<html lang="${data.lang||'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1,user-scalable=no">
<meta name="description" content="${data.description || (data.title + ' - microjam page')}">
${data.authors ? `<meta name="authoraa" content="${data.authors.join()}">` : ''}
${data.date ? `<meta name="date" content="${new Date(data.date).toString()}">` : ''}
${data.tags ? `<meta name="keywords" content="${data.tags.join()}">` : ''}
<base href="${'./'+data.reldir}">
<title>${data.title}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@9.18.1/styles/github-gist.min.css">
${data.math ? `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.css">` : ''}
<link rel="stylesheet" href="./theme/styles.css">
</head>
<body>
<header>
  <a href="./index.html" class="left">Studienarbeit</a>
</header>
<main>
<h1>${data.title}</h1>
  ${data.subtitle ? `<h3>${data.subtitle}</h3>` : ''}
  ${data.authors ? `<h4>${data.authors.join(', ')}</h4>` : ''}
  ${data.adresses ? `<h4>${data.adresses.join('<br>')}</h4>` : ''}
  ${data.date ? `<h4>${data.date}</h4>` : ''}
  ${data.tags ? `<h4><b>Keywords:</b> ${data.tags.join(', ')}</h4>` : ''}
${data.content}
</main>
<footer>
  <span class="left">&copy; My Site</span>
  <span class="center">powered by &mu;JAM &amp; VSCode &mdash; hosted by GitHub</span>
  <span class="right" onclick="document.documentElement.className = document.documentElement.className === 'theme-dark' ? 'theme-light' : 'theme-dark';">&#9788;</span>
</footer>
</body>
</html>` 
},
// article layout ...  // test necessary
article(data) {
  const articleContent = `<article>
  ${data.content}
</article>`;
  return tmpl.page(data);
},
// index layout ...
index(data) {
  data.content = `<article>
${data.content}
${data.articles.sort((a,b)=> a.date < b.date ? 1 : -1)  // sort decending ..
               .map(tmpl.articleEntry).join('')}
</article>`;
  return tmpl.base(data);
},

// article entry layout ... used for article list in index template
articleEntry(article) {
    return `<hr>
${tmpl.dateElement(article.date)}
<h3><a href="${article.reluri+'.html'}">${article.title}</a></h3>
${article.abstract || article.description}`;
},
// date element layout ... 
dateElement(date) {
  const d = new Date(date);
  return `<time datetime="${d}">${d.toString().substr(4,3)} ${d.getDate()}, ${d.getFullYear()}</time>`;
}

}
