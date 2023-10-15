import { readdirSync } from 'fs';

export const name = "interactionCreate"
export const execute = async (interaction, client) => {
  if (interaction.isCommand()) return

  //non commands handler (buttons, modals etc.)
  if (!interaction.customId) return

  const asyncLoader = async (path, search) => {

    const folder = readdirSync(`./src/${path}`)

    for (const file of folder) {
      if (file.startsWith("_")) continue;

      if (file.endsWith(search + ".js")) {
        const command = await import(`../${path}/${file}`).then(file => file).catch(err => { return })
        return command.execute(interaction, client)
      };
      if (file.endsWith('.js')) continue

      asyncLoader(`${path}/${file}`, search)
    }

  }
  await asyncLoader("commands_fixed", interaction.customId)
}