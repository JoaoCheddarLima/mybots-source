import { readdirSync } from 'fs';

export const name = "interactionCreate"
export const execute = async (interaction, client) => {
  if (interaction.isCommand()) {
    if (!interaction.member.permissions.has("Administrator")) return
    return client.commands.get(interaction.commandName)?.run(interaction, client)
  }

  //customId buttons handler
  if (!interaction.customId) return

  const commandFiles = [];
  const findCommands = async (path = "commands_fixed") => {
    readdirSync(`./src/${path}`).filter(async (file) => {
      if (file === "aliases" || file.startsWith('_')) return;
      if (file.endsWith(".js")) return commandFiles.push(file);
      findCommands(path + `/${file}`);
    });
  }
  await findCommands()

  for (const file of commandFiles) {
    let commander;
    const getCommands = (name, path = "commands_fixed") => {
      const dirr = `./src/${path}`;

      readdirSync(dirr).filter((find) => {
        if (find === name) {
          commander = `../${path}/${find}`;
        } else {
          if (find.endsWith("js") === true) return;
          if (find === "aliases" || find.startsWith("_")) return;
          return getCommands(name, path + `/${find}`);
        }
      });
    };
    getCommands(file);

    if (file.startsWith(interaction.customId)) {

      const command = await import(commander)
      command.execute(interaction, client)
    }
  }
}