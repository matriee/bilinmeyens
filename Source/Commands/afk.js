const { MessageEmbed } = require('discord.js');
const UserData = require('../Schema/UserData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');
const db = require('quick.db');


module.exports = {
  name: "afk",
  aliases: [""],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
    message.channel.send(embed).sil(10)
    } 

    let sebeb = args.slice(0).join(' ')
    let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
    if (link.test(sebeb)) {
        embed(`Seni gidi senii.. Neyin peşindesin?`)
    }
    if (!sebeb) return embed("AFK moduna girmek için sebep belirtmen gerekiyor.")

    embed("Başarılı Bir Şekilde AFK Moduna Girdin. Herhangi bir kanala birşey yazana kadar afk sayılıcaksın!")
    db.set(`${message.author.id}_sebeb`, sebeb);
    db.set(`${message.author.id}_afktime`, Date.now())
  }
}
