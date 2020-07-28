"use strict";

/* File comment */

const express = require("express");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.static("public"));

app.get("/links", async function(req, res) {
    let db = await getDBConnection();
    let query = "SELECT link FROM links ORDER BY RANDOM() LIMIT 3";
    let results = await db.all(query);
    let links = "";
    for(let i = 0; i < 3; i++) {
        let curr = results[i]["link"];
        links += curr + "\n";
    }
    res.type("text").send(links);
})

app.get("/download", async function(req, res) {
    let url = req.query["link"];
    let downloadName = url.substring(29, 40);
    res.header('Content-Disposition', 'attachment; filename=' + downloadName + '.mp3');
    ytdl(url, {format: "mp3"})
        .pipe(res);
})

/**
 * connects to and returns database
 * @returns {Database} the parsed database
 */
async function getDBConnection() {
    const db = await sqlite.open({
      filename: "database.db",
      driver: sqlite3.Database
    });
    return db;
  }

const PORT = process.env.PORT || 8000;
app.listen(PORT);
