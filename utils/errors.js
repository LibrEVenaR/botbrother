const Discord = require("discord.js");
const fs = require("fs");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Il vous manque une autorisation de Big Eagle...")
        .setColor("#b70000")
        .addField("Permission requise : ", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, username, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#b70000")
        .setTitle("Problème embarassant")
        .addField(`${user} bénéficie d'une permission spéciale`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Erreur fatale")
        .setDescription("Un bot ne peut pas être banni.")
        .setColor("#b70000");

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Petit problème")
        .setDescription("Utilisateur non recensé.")
        .setColor("#b70000");

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Attention aux abus de pouvoir")
        .setDescription("Même si nous sommes en dictature, une raison explicative est nécessaire. Ajoutez-en une à la suite.")
        .setColor("#b70000");

    channel.send(embed).then(m => m.delete(5000));
}
