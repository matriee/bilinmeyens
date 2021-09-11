const { MessageEmbed } = require('discord.js');
const UserData = require('../Schema/UserData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');
const moment = require('moment');


module.exports = {
  name: "ban",
  aliases: [""],
  run: async(client, message, args) => {

    let vectra = client.guilds.cache.get(settings.guildId).channels.cache.find(c => c.name === "ban-log");
    
    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
    message.channel.send(embed).sil(10)
    }

    
    function gonder(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(` Developed By ${settings.footer}`).setTimestamp().setDescription(msg)
    vectra.send(embed)
    }

    if(![settings.BanStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return embed("Hata: bu komudu kullanamzsın.");

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(' ');    
    const time = moment(Date.now()).format("** HH.mm - DD.MM.YY **")
    if(!user || user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position) return embed("Bu kullanıcıyı banlayamam veya bir kullanıcı belirtmedin.")
    if (!reason || reason.split('.').join('').length < 5) return embed(`Lütfen sebebinizi doğru düzgün belirtin.`)


    if(user){
      lucyDatabase.ban(user, message.author, reason, time)
      embed(`${user} başarıyla banlandı! \n **Banlayan Yetkili:** ${message.author} \n **Banlanma Sebebi:** ${reason} `)
      gonder(`**Bir Üye Banlandı** \n\n **Banlanan Üye:** ${user} \n **Banlayan Yetkili:** ${message.author} \n **Banlanma Sebebi:** ${reason} \n **Tarih:** ${time} `)
    }else return;


  }
}
