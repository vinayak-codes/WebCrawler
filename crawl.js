const { JSDOM } = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Actively crawling ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`Error in fetch with status code ${resp.status} in url ${currentURL}`)
            return
        }

        const contentType = resp.headers.get(`content-type`)
        if(!contentType.includes('text/html')){
            console.log(`Error in content type of ${currentURL} with type ${contentType}`)
            return
        }

        console.log( await resp.text())
    }catch(err){
        console.log(`Error in crawling ${currentURL} : ${err}`)
    }
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