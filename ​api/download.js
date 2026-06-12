import ytdl from '@distube/ytdl-core';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
    return res.status(200).json({
      title: info.videoDetails.title,
      downloadUrl: format.url
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
