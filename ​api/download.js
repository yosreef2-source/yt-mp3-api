const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: 'الرجاء إرسال رابط اليوتيوب في المتغير "url"' });
  }

  try {
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'رابط يوتيوب غير صالح' });
    }

    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

    res.status(200).json({
      title: info.videoDetails.title,
      url: audioFormat.url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'خطأ أثناء المعالجة: ' + error.message });
  }
};
