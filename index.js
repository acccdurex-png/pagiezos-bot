require("dotenv").config();
const fs = require("fs");

const { 
Client, 
GatewayIntentBits, 
EmbedBuilder 
} = require("discord.js");

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const repFile = "./rep.json";

// jei failo nėra – sukuriam su 0 rep
if (!fs.existsSync(repFile)) {
fs.writeFileSync(repFile, JSON.stringify({ rep: 0 }, null, 2));
}

client.once("ready", () => {
console.log(`Botas paleistas kaip ${client.user.tag}`);
});

client.on("messageCreate", async message => {

if(message.author.bot) return;

if(message.content === "+rep"){

let data = JSON.parse(fs.readFileSync(repFile));

data.rep += 1;

fs.writeFileSync(repFile, JSON.stringify(data, null, 2));

const embed = new EmbedBuilder()
.setTitle("🛒 Pagiežos Krautuvė")
.setDescription(`Šiuo metu turime **${data.rep} +rep atsiliepimų!**`)
.setColor("Yellow")
.setTimestamp();

message.channel.send({embeds:[embed]});

}

});

client.login(process.env.BOT_TOKEN);