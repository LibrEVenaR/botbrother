const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle('**Informations du bot.**')
    .setColor('4886754')
    .setDescription(`${bot.user.username}- Informations et Détails`)
    .setThumbnail(bicon)
    .addField("Nom du bot", bot.user.username)
    .addField("Date de création", bot.user.createdAt)
    .addField("Serveurs sous surveillance", bot.guilds.size)
    .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL())
    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}
