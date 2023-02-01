import { loadAssets } from '../configs/utils/botLoad.js'
import config from '../../config.json' assert {type: 'json'}
import pkg from '../../package.json' assert {type: 'json'}
import { connect, set } from 'mongoose'

const bottom = `\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n\n\x1b[34m┏╋◆ ${pkg.name.toUpperCase()} ◆╋┓\n\n`

export const name = "ready"
export const once = true
export const execute = async (x, client) => {
  console.log(`\x1b[33m[!] ${x.user.tag} logged into discord!`);

  //register app commands

  const commands = [...client.commands].map(x => x[1].data)
  await client.application.commands.set(commands)

  //registerTextCommands() only if message commands is required 
  loadAssets()
  console.log(`\x1b[33m[!] [${commands.length}] Commands set for all guilds.`);
	
  set("strictQuery", true)
  await connect(config.MONGO_URI || "", { keepAlive: true, autoIndex: false, writeConcern: { w: "majority" } })
    .then(res => console.log("\x1b[32m[!] DataBase status: ONLINE\n\n" + bottom))
    .catch(err => console.log("\x1b[31mDataBase login err: " + err))

		    const activities = [
      { name: `Mybots app`, type: 1 },
    ];

    let i = 0;

    setInterval(() => {
      if (i >= activities.length) i = 0
      client.user.setActivity(activities[i])
      i++;
    }, 15 * 1000); // 30 Segundos

}
