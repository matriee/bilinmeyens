const { MessageEmbed } = require('discord.js');
const UserData = require('../Schema/UserData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');
const ms = require('ms');
const moment = require('moment');
require("moment-duration-format");


module.exports = {
  name: "jail",
  aliases: [""],
  run: async(client, message, args) => {

    let vectra = client.guilds.cache.get(settings.guildId).channels.cache.find(c => c.name === "jail-log");
    
    
    function embed(msg) {
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
      message.channel.send(embed).sil(10)
      } 
      
    function solve(msg) {
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
      vectra.send(embed)
      } 
  

    if(![settings.JailStaff].some(x => message.member.roles.cache.get(x)) &&!message.member.hasPermission(8)) return embed("Hata: Bu komudu kullanamazsın.");


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1]
    let jailzaman = ms(`${time}`)
    let reason = args.slice(2).join(' ');    
    const tarih = moment(Date.now()).format("** HH.mm - DD.MM.YY **")

    if(!user || user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position) return embed("Bu kullanıcıya jaile atamam veya bir kullanıcı belirtmedin.")
    if (!reason || reason.split('.').join('').length < 5) return embed(`Lütfen sebebinizi doğru düzgün belirtin.`)
    if(!time) return embed(`Lütfen bir zaman belirtiniz.`)

    if(user){
        lucyDatabase.jail(user, message.author, reason, tarih)
        lucyDatabase.yjail(user, message.author)
        embed(`${user} başarıyla jaile gönderildi! \n **Cezalandıran Yetkili:** ${message.author} \n **Cezalandırılma Sebebi:** ${reason} `)
        solve(`**Bir Kişi Cezalandırıldı!** \n\n **Cezalandırılan Kişi:** ${user} \n **Cezalandıran Yetkili:** ${message.author} \n **Cezalandırılma Sebebi:** ${reason} \n **Tarih:** ${tarih} `)
        if (time) setTimeout(() => {
            user.roles.remove(settings.JailRole)
            solve(`${user} Adlı Kullanıcının cezası bitti!`)
        }, jailzaman)
    }
  }
}
