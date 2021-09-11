const { MessageEmbed } = require('discord.js');
const UserData = require('../Schema/UserData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');

module.exports = {
  name: "sablon",
  aliases: [""],
  run: async(client, message, args) => {

    
    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
    message.channel.send(embed).sil(10)
    } 


    if(![settings.JailStaff].some(x => message.member.roles.cache.get(x)) &&!message.member.hasPermission(8)) return embed("Hata: Bu komudu kullanamazsın.");


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user || user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position) return embed("Bu kullanıcıyı kayıtsıza atamam veya bir kullanıcı belirtmedin.")



  }
}
