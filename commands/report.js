const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
///set prefix
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

    if(args[0] == "help"){
      message.reply(`Utilisation: ${prefix}report <utilisateur> <motif>`);
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("*Opération  de la police de la pensée*")
    .setAuthor("L'écho d'Elvenar",
        'https://image.noelshack.com/fichiers/2018/04/7/1517180176-logo-journal.png',
        'https://fr.forum.elvenar.com/index.php?threads/nouvelle-charte-du-journal-signature-obligatoire.13953/')
    .setDescription("Dénonciation")
    .setColor(orange)
    .addField("Utilisateur dénoncé", `${rUser} with ID: ${rUser.id}`)
    .addField("Déoncé par", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel : ", message.channel)
    .addField("Date : ", message.createdAt)
    .addField("Motif : ", rreason)
    .addField('Source', "__*LibrE'VenaR*__", true)
    .addField('Informations complémentaires :', "**Régime** : Dictature de *Big Eagle*", true)
    .setTimestamp()
    .setFooter('rapport à Big Eagle', "http://image.noelshack.com/fichiers/2015/46/1447197021-thorondhor.png");

    let reportschannel = message.guild.channels.find(`name`, "logs-des-bot","reports");
    if(!reportschannel) return message.channel.send("La boîte aux lettres de Big Eagle est introuvable..."(reportEmbed));
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
