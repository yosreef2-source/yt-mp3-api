
const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  // الحصول على رابط اليوتيوب من الطلب
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('الرجاء إرسال رابط يوتيوب في المتغير "url"');
  }

  try {
    // التأكد من صحة الرابط
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send('رابط غير صالح');
    }

    // الحصول على معلومات الفيديو
    const info = await ytdl.getInfo(videoUrl);
    
    // استخراج رابط التحميل المباشر للصوت
    const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
    
    // إرسال الرابط للبوت
    res.status(200).json({
      title: info.videoDetails.title,
      url: audioFormat.url
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('خطأ في الخادم: ' + error.message);
  }
};
