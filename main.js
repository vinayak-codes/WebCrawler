const {crawlPage} = require('./crawl.js')

async function main(){
    if(process.argv.length < 3){
        console.log("No valid website provided")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("Too many command line args")
        process.exit(1)
    }
    
    const baseURL = process.argv[2];

    console.log(`Starting crawler for ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    console.log(pages)
}

main()