const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUVHZm1xalI5S0RiV1RLeG8rNW8vZWhHOUM0UlJMMlBZVmhxUkpJcjNuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicThQSUIyWmdoZUNYeWQwMDlpaFVIbjQ3cW1GenVQMlg5NUttT0VNVWh5ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSFU3cS8wSTVNeUxLYWo0RXhoY1E0eE10T0FLaVV1SEZodVpGSDVhcldVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmQWFjSWxiUmZMK1dOem0wTnMycjdYdnZnSElWL1MwZjNZTlBuYmVrRGljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdIM2F3OE5wQ0FQMnVSRlZBN0Z0NVcyR0VqMWxJbHVKekw2a0xVMjVrR2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkN1ZkFSZFJqbS8xSVJWdHRHVDdEMFlVeDFXbGFUSG54YW4xeDRCQTJZUjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkV2ZVhiRW1hZzZWSnJLU29mL21MSDhPdTEwdDRsODBHR1cwKzAxNTFVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3JEVXFTSTNjR2s3Nmx5UEg0TUxna1lPWjhEdFphbEJIS0M0dzN1blNpQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpCTE9XeDgrVjhSbjRaNDZCNDJkMGg0Uk9sNkRVcU1ESEozTEY3cEt5Lzl2U2paZU1lc3NmcGZybkorNVpjNys2N3FEV3dkU0NSNUR3cUtZbFlodGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJZVHZYMElhejNXVU1zd0oxZzZITXl0ZzhlUHg5TElUY1dmeHFQSFhTVmdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MDc3OTMwMzc3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFMURBQjU4QUE5ODNBMTc1RjQyMUYyM0FCMjJBNDhFRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMTk2Mzk4fV0sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ1T0NGQncxc1JmV1FTVGFaMzlFcVFBIiwicGhvbmVJZCI6ImNjZDM4OTQ2LTRlZmYtNDkwYi1iMjRhLTExNDU1YzE3Nzg5ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJObzhNVFhveGpid1ZlYis4QTJSdGJKeHJ4ZGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUYvTVBraGhDdnIxM0xkbU01bno2OG51Z0RzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRXRFlUMjdLIiwibWUiOnsiaWQiOiIyNjA3NzkzMDM3NzY6NTlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09yZXpka0NFSnZEbXJVR0dDRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImVMcENGeHBCYnA5VzZKSTJWUnlVREVEODlKLzFxaDlweWtQQXhkWU1FWHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Iit1d3Y3VDl3NlVtZitOQmc2SU9nNlpwZHhCYkNMTGpHd04wd3lvdU1uVklMRVVvSTJoWmlOWmtOd1k5N2dSWVVmQ0hSaXhvdUc1T3R6WTVpWFlqT0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0bHlNRGVpZWVvRTJGRllSbG1Dd2ptWXJSRGZ2ME9ZTDI3R3prVEF2RXQ5emNYZ3hmNVVURWdzSWZFdlZHRW9GNnZodllFQlk1Q1JkblpHQW5CeWZqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDc3OTMwMzc3Njo1OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYaTZRaGNhUVc2ZlZ1aVNObFVjbEF4QS9QU2Y5YW9mYWNwRHdNWFdEQkY4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTk2MzkzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1pSSJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "WONDER ZM",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "260779303776", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
