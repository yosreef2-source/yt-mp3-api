import express from "express";
import ytdl from "ytdl-core";

const app = express();

app.get("/download", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) return res.json({ error: "no url" });

        const stream = ytdl(url, { filter: "audioonly" });

        let chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);

        res.json({
            url: `data:audio/mpeg;base64,${buffer.toString("base64")}`
        });

    } catch (err) {
        res.json({ error: "failed" });
    }
});

app.listen(3000, () => console.log("running"));
