const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('ready');
});

client.on('message', message => {
  // kick everyone out of the weekly-seed-spoilers channel
  if (message.content === '.new-week' && message.channel.name === 'developer-chat') {
    handleNewWeek(message);
  }
  
  // handle ".done" messages - should include the time.
  if (/^\.(done|forfeit)/.test(message.content) && message.channel.name === 'weekly-seed') {
    handleDone(message);
  }
  // what else to handle?
  // may need to create the spoiler channel...?
});

const handleNewWeek = (message) => {
  const guild = message.guild;
  const role = guild.roles.find(role => role.name === 'Weekly Seed Done');
  let count = 0;
  for (const member of role.members.values()) {
    member.removeRole(role);
    console.log(`Removed ${member.user.username} from ${role.name}`);
    ++count;
  }
  message.replay(`Removed ${count} users from ${role.name}`);
};

const handleDone = (message) => {
  const guild = message.guild;
  const role = guild.roles.find(role => role.name === 'Weekly Seed Done');
  message.member.addRole(role);
  console.log(`Added ${message.member.user.username} to ${role.name}`);
};

client.login(process.env.BOT_TOKEN);
