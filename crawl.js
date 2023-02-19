const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !==  currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    console.log(normalizedCurrentURL)
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1;

    console.log(`Actively crawling ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        console.log(resp.status)
        if(resp.status > 399){
            console.log(`Error in fetch with status code ${resp.status} in url ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get(`content-type`)
        if(!contentType.includes('text/html')){
            console.log(`Error in content type of ${currentURL} with type ${contentType}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLs =  getURLfromHTML(htmlBody, baseURL)
        // console.log(nextURLs)

        for(const nextURL in nextURLs){
            if(nextURL.includes('about:blank#')){
                continue
            }
            pages = await crawlPage(baseURLObj, nextURL, pages)
        }

    }catch(err){
        console.log(`Error in crawling ${currentURL} : ${err}`)
    }
    return pages
}

function getURLfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const item of linkElements){
        if(item.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObj = new URL(`${baseURL}${item.href}`)
                urls.push(`${baseURL}${item.href}`)
            }catch(err){
                console.log(`Error with URL : ${err}`)
            }   
        }else{
            //absolute
            try{
                const urlObj = new URL(`${item.href}`)
                urls.push(item.href)
            }catch(err){
                console.log(`Error with URL : ${err}`)
            }   
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/')
        return hostPath.slice(0, -1)
    else
        return hostPath
}

module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
} 