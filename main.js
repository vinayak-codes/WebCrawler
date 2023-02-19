const {crawlPage} = require('./crawl.js')

function main(){
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
    crawlPage(baseURL)
}

main()