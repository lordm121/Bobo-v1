const guilds = require(`${process.cwd()}/data/guild`);
const consoleUtil = require(`${process.cwd()}/util/console`);
const text = require(`${process.cwd()}/util/string`);

module.exports = class{
  async run(bot, message,guild){
    let doc = await guilds.findOne({guildID: guild.id})
    

  /*===============WELCOME TO THE GUILD_CREATE EVENT=============
    This function runs everytime the bot receives any guild payload
    from discord after the ready event is fired.
  =============================================================*/
if (err){
    bot.channels.cache.get(log)?.send(`\`❌ [DATABASE_ERR]:\` The database responded with error: ${err.name}`);
  } else {
    if (!doc){
      doc = await new guilds({guildID: guild.id }).save();
    };
    
  };
 
  /*=====================================================
     Declare variables
  =====================================================*/
  const owner = await bot.users.fetch(guild.ownerId)
  .then(owner => owner.tag)
  .catch(() => '<Unfetched Data>');

  const logo = '<:Enter:794918219835637760>';
  const members = text.commatize(guild.memberCount);
  const message = `${logo} : **${members}** members, owned by **${owner}**`;
  //====================================================//


  /*======================================================
     Check the validity of database connection and save
     new guild profile.
  ======================================================*/

  //====================================================//



  /*======================================================
     Sends a notification to a log channel (if available)
     that the bot has joined a server
  ======================================================*/
  await bot.channels.cache.get(client.config.channels?.logs)?.createWebhook(guild.name, {
    avatar: guild.iconURL({ format: 'png', dynamic: true, size: 128 })
  })
  .then(webhook => Promise.all([webhook.send(message), webhook]))
  .then(([_, webhook]) => webhook.delete())
  .catch(() => {});
  //=====================================================//

  // add more functions on message guildCreate callback function...

  return;
}}