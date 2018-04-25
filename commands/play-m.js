const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async(message, bot, args)=>{
        message.delete().catch(O_o=>{});
            if (message.channel.type !== 'text') return;
    
            const { voiceChannel } = message.member;
    
            if (!voiceChannel) {
                return message.reply('si vous vous connectiez à un canal audio ? ça marcherait sûrement mieux !');
            }
    
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=WYeDsa4Tw0c', { filter: 'audioonly' });
                const dispatcher = connection.playStream(stream);
    
                dispatcher.on('end', () => voiceChannel.leave());
            });
        
},
module.exports.help = {
  name: "addrole"
};
