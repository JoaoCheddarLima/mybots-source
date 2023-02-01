import { readdirSync, writeFileSync, readFileSync } from "fs";

export const registerTextCommands = () => {
    //if client needs this
    let ignore = ["aliases", "_"]

    let register = (url) => {
        let path = readdirSync(url)
        for (const key of path) {
            if (key.startsWith(ignore[0]) || key.startsWith(ignore[1])) continue
            if (!key.endsWith('.js')) {
                register(url + `/${key}`)
            } else {
                let data = JSON.parse(readFileSync(`./src/commands/aliases/cmds.json`))

                let name = key.slice(0, key.length - 3)
                if (data[name] === undefined) {
                    data[name] = [name]
                    writeFileSync(`./src/commands/aliases/cmds.json`, JSON.stringify(data, null, 2))
                }
            }
        }
    }
    register("./src/commands")
}

export const loadAssets = () => {
    var count = 0
    let find = ["_"]
    let register = (url) => {
        let path = readdirSync(url)
        for (const key of path) {
            if (!key.endsWith('.js')) {
                if (!key.endsWith('.json')) register(url + `/${key}`)
            } else {
                if (key.startsWith(find[0])) {
                    count++
                }
            }
        }
    }
    register("./src")
    console.log(`\x1b[34m[!] [${count}] Assets files found!`)
}
