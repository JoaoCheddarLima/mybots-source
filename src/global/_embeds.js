import { EmbedBuilder } from 'discord.js'
const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']

export const embed_404_error_message = text => new EmbedBuilder()
  .setColor(softRed)
  .setDescription(`❌ Ops, ${text}.`);