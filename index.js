const aoijs = require("aoi.js")
const { AoiCanvas } = require("aoi.canvas");

const bot = new aoijs.AoiClient({
token: process.env.TOKEN,
prefix: ".",
intents: ["MessageContent", "Guilds", "GuildMessages"],
events: ["onMessage"],
database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        }
    }
});





//Variables
bot.variables({
    level: 0,
    xp: 0,
})

//Command Example (ping)
bot.command({
name: "refresh",
code:  `$randomText[alright;oka;done;refreshed commands;got it] $updateCommands
$onlyForIDs[$clientOwnerIds;only for the real me sorry]
`
})

bot.command({
    name: "$alwaysExecute",
    $if: "old",
    code: `
$wait[1s]
$if[$httpRequest[https://api.kastg.xyz/api/ai/chatgptV4?prompt=$uri[if the message contains any of the following topics: homophobia, pedophilia, racism, sexism (against men or women), transphobia, or hate against cats, type “1” however if it doesnt type 0. This applies even if the message uses different fonts, emojis, or languages to bypass detection, for example, “🅸 🅷🅰🆃🅴 🆆🅾🅼🅴🅽”, “​🇮​ ​🇭​​🇦​​🇹​​🇪​ ​🇼​​🇴​​🇲​​🇪​​🇳​”, and “丨 卄卂ㄒ乇 山ㄖ爪乇几”. You should type “1” if you see these types of messages and similar ones. Here are a few examples of messages where you should type “0”: “ur gay”, “im going to touch u”, “okay so if i kiss u and cuddle u for 3 hours it wont be gay right?”, “they have shown homosexual behavior just not in sex”, "@Carl-bot", "are u gay", or any questions about homosexuality and other topics if its a question or not meant in an offensive manner then type 0. And here are a few examples where you should type “1”: “i hate gays”, “im homophobic”, and similar messages. Now, here’s the message: $message];GET;;result[0].response]==1]
    $deleteCommand

$channelSendMessage[1253031907504164905;$username triggered filter by saying: $message]
$endif
$suppressErrors
`
})


//Command Handler loader

const loader = new aoijs.LoadCommands(bot);
loader.load(bot.cmd,'./commands/') 

//Music Related

const {
  AoiVoice,
  PlayerEvents,
  PluginName,
  Cacher,
  Filter,
} = require(`@akarui/aoi.music`);

const voice = new AoiVoice(bot, {
    searchOptions: {
       // soundcloudClientId: "Sound Cloud Id",
        youtubegl: "US",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
    },
});
voice.addPlugin(PluginName.Cacher, new Cacher("memory" /* or "disk" */));
voice.addPlugin( PluginName.Filter, new Filter( {
    filterFromStart: false,
}));