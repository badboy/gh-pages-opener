var prefix = 'https://github.com/';

browser.contextMenus.create({
  id: 'pages-redirect',
  title: 'Open GitHub repository',
  contexts: ['all'],
  documentUrlPatterns: ["*://*.github.io/*"]
});

function parseUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a;
}

function extractUser(host) {
  return host.replace(".github.io", '');
}

function extractRepository(url) {
  var url = parseUrl(url)
  var user = extractUser(url.host);
  var repo = "";

  if (url.pathname == "/") {
    repo = url.host;
  } else {
    repo = url.pathname.split("/")[1]
  }

  return `${user}/${repo}`;
}

function openGithubRepository(tab) {
  chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
    var curUrl = tab[0].url;
    var newTabUrl = prefix + extractRepository(curUrl);
    chrome.tabs.create({ 'url': newTabUrl})
  })
}

browser.contextMenus.onClicked.addListener(openGithubRepository);
