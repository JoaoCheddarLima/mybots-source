import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Define uma nova configuraçao escolhida para seu bot')
    .addSubcommand(sub =>
        sub
            .setName("avatar")
            .setDescription("Change bot user avatar")
            .addAttachmentOption(option =>
                option
                    .setName("picture")
                    .setRequired(true)
                    .setDescription("new avatar")
            )
    )
    .addSubcommand(sub =>
        sub
            .setName("username")
            .setDescription("Change bot username")
            .addStringOption(option =>
                option
                    .setName("nick")
                    .setRequired(true)
                    .setDescription("bot username")
            )
    )

export const run = async (interaction) => {
    const config = await import("../../../config.json", { assert: { type: "json" } })
    const list = config.default.superAdmin
    if (!list.includes(interaction.user.id)) return

    if (interaction.options.getSubcommand() === 'username') {
        const nome = interaction.options.getString("nick")
        return interaction.client.user.setUsername(nome)
            .then(r => {
                return interaction.reply({ content: `Nome alterado para: \`${nome}\` com sucesso :)`, ephemeral: true })
            })
            .catch(err => {
                return interaction.reply({ content: "Não foi possivél colocar este nome, ou ele é muito grande, ou tem usuários demais com este nome.", ephemeral: true })
            })
    }
    return interaction.client.user.setAvatar(interaction.options.getAttachment("picture").url)
        .then(r => {
            return interaction.reply({ content: `avatar alterado com sucesso :)`, ephemeral: true })
        })
        .catch(err => {
            interaction.reply({ content: "Não foi possivél colocar esta imagem, erro desconhecido", ephemeral: true })
        })

}