const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const botconfig = require("./botconfig.json");


module.exports.run = async (bot, message, args) => {
  ///prefix
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if(args[0] == "help"){
      message.reply(`Utilisation : ${prefix}kick <membre> <raison>`);
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setColor('16098851')
    .setTitle("*Opération  de la police de la pensée*")
    .setAuthor("L'écho d'Elvenar",
        'https://image.noelshack.com/fichiers/2018/04/7/1517180176-logo-journal.png',
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
    .setFooter('signé par Big Eagle', "http://image.noelshack.com/fichiers/2015/46/1447197021-thorondhor.png");

    let kickChannel = message.guild.channels.find(`name`, "général","logs-des-bots","incidents");
    if(!kickChannel) return message.channel("** Bot Brother *is watching* YOU**. \n Je n'ai pas trouvé où afficher les logs.", { kickEmbed }); 

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
