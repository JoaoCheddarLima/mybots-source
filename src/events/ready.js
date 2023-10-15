import pkg from '../../package.json' assert {type: 'json'}

const bottom = `\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n\n\x1b[34m┏╋◆ ${pkg.name.toUpperCase()} ◆╋┓\n\n`

export const name = "ready"
export const once = true
export const execute = async (x, client) => {
  console.log(`\x1b[33m[!] ${x.user.tag} logged into discord!`);

  const commands = [...client.commands].map(x => x[1].data)
  await client.application.commands.set(commands)

  console.log(`\x1b[33m[!] [${commands.length}] Commands set for all guilds.`);

  console.log(bottom)
}
