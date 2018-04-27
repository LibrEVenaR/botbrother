const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Utilisation: !ban <utilisateur> <motif>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message); 
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

    let banEmbed = new Discord.RichEmbed()
    .setTitle("*Opération  de la police de la pensée*")
    .setColor("#b70000")
    .setAuthor("L'écho d'Elvenar",
        message.guild.iconURL,
        'https://fr.forum.elvenar.com/index.php?threads/nouvelle-charte-du-journal-signature-obligatoire.13953/')
    .setDescription("~Expulsion~")
    .setThumbnail("http://www.zupimages.net/up/17/15/a1yf.png")
    .addField("Utilisateur banni : ", `${bUser} with ID ${bUser.id}`)
    .addField("Bannisement par", `<@${message.author.id}> with ID ${message.author.id}`)
    .addBlankField()
    .addField("Date : ", message.createdAt)
    .addField("Motif : ", bReason)
    .addField("Arrestation sur ", message.channel)
    .addField('Source', "__*LibrE'VenaR*__", true)
    .addField('Informations complémentaires :', "**Régime** : Dictature de *Big Eagle*", true)
    .setTimestamp()
    .setFooter('signé par Big Eagle', message.guild.owner.user.avatarURL);

    const incidentchannel = message.guild.channels.find(`name`, "logs-des-bots");
    if(!incidentchannel) return message.reply("**Bot Brother** is watching **YOU**. \n Je n'ai pas trouvé où afficher les logs.", { banEmbed }); 

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
