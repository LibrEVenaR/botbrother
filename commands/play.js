const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const botconfig = require("../botconfig.json");


module.exports.run = async(bot, message, args) => {
            message.delete().catch(O_o=>{});

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!args[0] || args[0 == "help"])
    return message.reply(`Usage: ${prefix}play <lien audio>`);

            if (message.channel.type !== 'text') return;
    
            const { voiceChannel } = message.member;
    
            if (!voiceChannel) {
                return message.reply('rejoignez un canal audio !');
            }
            const filename = args.join(" ");
            if (!filename)
                return message.reply("donnez un nom de fichier audio.");
                
            voiceChannel.join()
            .catch((err) => { // Join the user's voice channel
                     message.reply("connexion impossible !"); // Notify the user if there is an error
                     console.log(err); // Log the error
                    })
            .then(connection => {
                const stream = ytdl(filename , { filter: 'audioonly' });
                
                const dispatcher = connection.playStream(stream);
                message.reply(`En train de jouer **${filename}**`);
                connection.once("end", () => {
                    message.reply(`Fin de lecture de **${filename}**`)
                })
                dispatcher.on('end', () => voiceChannel.leave());
            })
        }
        
module.exports.help = {
  name: "play"
}
