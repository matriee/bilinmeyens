const { MessageEmbed } = require('discord.js');
const CezaData = require('../Schema/CezaData');
const settings = require('../Settings/settings.json');
const {lucyDatabase} = require('../Functions/lucyDatabase');

module.exports = {
  name: "sicil",
  aliases: [""],
  run: async(client, message, args) => {

    
    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setDescription(msg)
    message.channel.send(embed).sil(10)
    } 




    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    if(user){
        await CezaData.find({ UserID: user.id }, async(err, data) => {
            if(err)return;
            if(!data) return embed(`Kişinin sicili tertemiz!`)
            let sicils = data.map(x => `${user} (${user.roles.highest}) kullanıcısının ;\n\`•\` Toplam Jail Sayısı:  ${x.Jail ? x.Jail : "0"}\n\`•\` Toplam Mute Sayısı: ${x.Mute ? x.Mute : "0"}\n\`•\` Toplam Ban Sayısı: ${ x.Ban ? x.Ban : "0"}\n\`•\` Toplam Ceza Puanı: ${x.Puan ? x.Puan : "0"} `) 
            embed(sicils)
        }) 
    }else if(!user){
        await CezaData.find({ UserID: message.author.id }, async(err, data) => {
            if(err) return;
            if(!data) return embed(`Sicilin tertemiz!`)
            let sicils = data.map(x => `${message.author} (${message.member.roles.highest}) kullanıcısının ;\n\`•\` Toplam Jail Sayısı:  ${x.Jail ? x.Jail : "0"}\n\`•\` Toplam Mute Sayısı: ${x.Mute ? x.Mute : "0"}\n\`•\` Toplam Ban Sayısı: ${ x.Ban ? x.Ban : "0"}\n\`•\` Toplam Ceza Puanı: ${x.Puan ? x.Puan : "0"} `) 
            embed(sicils)
        })
    }
  }
}
