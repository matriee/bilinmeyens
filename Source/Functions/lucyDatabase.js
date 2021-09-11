const { Client } = require('discord.js');
const client = new Client();
const settings = require('../Settings/settings.json');
const moment = require('moment');
const UserData = require('../Schema/UserData');
const NameData = require('../Schema/NameData');
const RegisterData = require('../Schema/RegisterData');
const CezaData = require('../Schema/CezaData');
const YetkiliCezaData = require('../Schema/YetkiliCezaData');



Promise.prototype.sil = function(time) {
  if (this) this.then(message => {
    if (message.deletable) message.delete({ timeout: time * 1000 });
  });
};

class lucyDatabase {

  static async man(user, admin) {
    await user.roles.cache.has(settings.BoosterRole) ? user.roles.set([settings.ManRole, settings.BoosterRole]) : user.roles.set([settings.ManRole])
    let regData = await RegisterData.findOne({ AdminID: admin.id })
    if (regData) { await regData.Man++; regData.Total++; regData.save(); }
    else { let d = await new RegisterData({ AdminID: admin.id, Man: 1, Woman: 0, Total: 1 }); d.save() };
  };

  static async woman(user, admin) {
    await user.roles.cache.has(settings.BoosterRole) ? user.roles.set([settings.WomanRole, settings.BoosterRole]) : user.roles.set([settings.WomanRole])
    let regData = await RegisterData.findOne({ AdminID: admin.id })
    if (regData) { await regData.Woman++; regData.Total++; regData.save(); }
    else { let f = await new RegisterData({ AdminID: admin.id, Man: 0, Woman: 1, Total: 1 }); f.save() };
  };

  static async setusername(user, name, process) {
    let x = await new UserData({ UserID: user.id, Name: name, Process: process }); x.save()
    let nameData = await NameData.findOne({ UserID: user.id });
    if (!nameData) { let y = await new NameData({ UserID: user.id, LastName: name }); y.save() }
    else { await NameData.findOneAndUpdate({ UserID: user.id }, { UserID: user.id, LastName: name }) }
  };


  static async jail(user, admin, reason, tarih) {
    await user.roles.add(settings.JailRole);

    let jailData = await CezaData.findOne({ UserID: user.id })
    if (jailData) { await jailData.Jail++; jailData.save(); }
    else { let f = await new CezaData({ UserID: user.id, Ban: 0, Jail: 1, Mute: 0, Puan: 50, Sicil: [`**Cezalandıran Yekili:** ${admin.id}, **Tarih:** ${tarih}, **Cezalandırılan:** ${user.id}, **Sebep:** ${reason} `] }); f.save() };
  };

  static async ban(user, admin, reason, tarih) {
    await user.ban(user.id, { reason: `Yetkili: ${admin.id} || Sebep ${reason}`} );

    let banData = await CezaData.findOne({ UserID: user.id })
    if (banData) { await banData.Ban++; banData.Sicil.push(`**Banlayan Yetkili:** ${admin.id}, **Tarih:** ${tarih}, **Sebep**: ${reason}`); banData.save(); }
    else { let f = await new CezaData({ UserID: user.id, Ban: 1, Jail: 0, Mute: 0, Puan: 100, Sicil: [`**Banlayan Yetkili:** ${admin.id}, **Tarih:** ${tarih}, **Sebep**: ${reason}`] }); f.save() };
  };

  static async mute(user, admin, reason, tarih) {
    await user.roles.add(settings.MuteRole);

    let muteData = await CezaData.findOne({ UserID: user.id })
    if (muteData) { await muteData.Mute++; muteData.save(); }
    else { let f = await new CezaData({ UserID: user.id, Ban: 0, Jail: 0, Mute: 1, Puan: 25, Sicil: [`**Muteleyen Yekili:** ${admin.id}, **Tarih:** ${tarih}, **Mutelenen:** ${user.id}, **Sebep:** ${reason} `] }); f.save() };
  };


  static async ymute(user, admin) {
    let ymuteData = await YetkiliCezaData.findOne({ AdminID: admin.id })
    if (ymuteData) { await ymuteData.Mute++; ymuteData.Total++; ymuteData.Puan.push(50); ymuteData.save(); }
    else { let d = await new YetkiliCezaData({ AdminID: admin.id, Mute: 1, Jail: 0, Ban: 0, Puan: 50, Total: 1 }); d.save() };
  };


  static async yjail(user, admin) {
    let yjailData = await YetkiliCezaData.findOne({ AdminID: admin.id })
    if (yjailData) { await yjailData.Jail++; yjailData.Total++; yjailData.Puan.push(100); yjailData.save(); }
    else { let d = await new YetkiliCezaData({ AdminID: admin.id, Mute: 0, Jail: 1, Ban: 0, Puan: 100, Total: 1 }); d.save() };
  };






};

module.exports = { lucyDatabase }

//moment(Date.now()).format("** HH.mm - DD.MM.YY **")