import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "الرجاء إدخال رابط الفيديو (URL)" });
  }

  try {
    // التحقق من صحة الرابط
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "رابط فيديو غير صالح" });
    }

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { 
      filter: 'audioonly', 
      quality: 'highestaudio' 
    });

    res.json({
      title: info.videoDetails.title,
      downloadUrl: format.url,
      author: info.videoDetails.author.name
    });

  } catch (err) {
    // هنا بنطبع الخطأ عشان نعرف السبب لو استمرت المشكلة
    res.status(500).json({ 
      error: "فشل السيرفر في معالجة الفيديو",
      details: err.message 
    });
  }
}
