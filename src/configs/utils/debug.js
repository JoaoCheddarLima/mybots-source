module.exports = {
    check: (info) => {
        const top = "\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓"
        const bottom = "\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n"
        console.log(`\n\n${top}\n\n\x1b[33m${info}\n\n${bottom}\n\n`)
    }
}
