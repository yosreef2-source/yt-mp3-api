import ytdl from '@distube/ytdl-core';

export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
        res.status(200).json({ downloadUrl: format.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
