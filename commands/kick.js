const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
      if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if(args[0] == "help"){
      message.reply(`Utilisation : !kick <membre> <raison>`);
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(!kReason) return errors.noReason(message.channel);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setColor("#ff6a00")
    .setTitle("*Opération  de la police de la pensée*")
    .setAuthor("L'écho d'Elvenar",
    message.guild.iconURL,
    'https://fr.forum.elvenar.com/index.php?threads/nouvelle-charte-du-journal-signature-obligatoire.13953/')
    .setDescription("~Expulsion~")
    .setThumbnail("http://www.zupimages.net/up/17/15/a1yf.png")
    .addField("Utilisateur expulsé : ", `${kUser} with ID ${kUser.id}`)
    .addField("Expulsion par", `<@${message.author.id}> with ID ${message.author.id}`)
    .addBlankField()
    .addField("Date : ", message.createdAt)
    .addField("Motif : ", kReason)
    .addField("Arrestation sur ", message.channel)
    .addField('Source', "__*LibrE'VenaR*__", true)
    .addField('Informations complémentaires :', "**Régime** : Dictature de *Big Eagle*", true)
    .setTimestamp()
    .setFooter('signé par Big Eagle', message.guild.owner.user.avatarURL);

    let kickChannel = message.guild.channels.find(`name`, "logs-des-bots");
    if(!kickChannel) return message.channel("** Bot Brother *is watching* YOU**. \n Je n'ai pas trouvé où afficher les logs.", { kickEmbed }); 

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
