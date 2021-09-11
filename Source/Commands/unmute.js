const { MessageEmbed } = require('discord.js');
const UserData = require('../Schema/UserData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');

module.exports = {
  name: "unmute",
  aliases: [""],
  run: async(client, message, args) => {

    let bruh = client.guilds.cache.get(settings.guildId).channels.cache.find(c => c.name === "jail-log");
    
    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
    bruh.send(embed)
    } 
    
    function embed2(msg) {
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
      message.channel.send(embed)
      } 


    if(![settings.MuteStaff].some(x => message.member.roles.cache.get(x)) &&!message.member.hasPermission(8)) return embed("Hata: Bu komudu kullanamazsın.");


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user || user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position) return embed("Bu kullanıcıyı kayıtsıza atamam veya bir kullanıcı belirtmedin.")

    if(user){
        user.roles.remove(settings.MuteRole)
        embed(`${user} Adlı Kişinin Mutesi ${message.author} tarafından Açıldı!`)
        embed2(`${user} adlı kişinin mutesi açıldı!`)
    }
  }
}
