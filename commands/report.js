const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();

    if(args[0] == "help"){
      message.reply(`Utilisation: !report <utilisateur> <motif>`);
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("*Opération  de la police de la pensée*")
    .setAuthor("L'écho d'Elvenar",
    message.guild.iconURL,
    'https://fr.forum.elvenar.com/index.php?threads/nouvelle-charte-du-journal-signature-obligatoire.13953/')
    .setDescription("Dénonciation")
    .setColor("#ff6a00")
    .addField("Utilisateur dénoncé", `${rUser} with ID: ${rUser.id}`)
    .addField("Dénoncé par", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel n: ", message.channel)
    .addField("Date : ", message.createdAt)
    .addField("Motif : ", rreason)
    .addField('Source', "__*LibrE'VenaR*__", true)
    .addField('Informations complémentaires :', "**Régime** : Dictature de *Big Eagle*", true)
    .setTimestamp()
    .setFooter('rapport à Big Eagle',  message.guild.owner.user.avatarURL);

    let reportschannel = message.guild.channels.find(`name`, "logs-des-bots");
    if(!reportschannel) return message.channel.send(reportEmbed);
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
