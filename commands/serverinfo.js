const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    		message.delete().catch(O_o=>{}); 
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setTitle('**Informations du serveur actuel.**')
    .setColor("#092709")
    .setDescription(`${message.guild.name} - Informations et Détails`)
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Rejoint le", message.member.joinedAt)
    .addField("Membres au total", message.guild.memberCount)
    .addField('Membres', `${message.guild.members.filter(member => member.user.bot).size} bots et ${message.guild.memberCount} membres.`)
    .addField('Rôles', message.guild.roles.map(role => role.name).join(', '))
    .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} vocaux / ${message.guild.channels.filter(chan => chan.type === 'text').size} textuels`)
    .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
