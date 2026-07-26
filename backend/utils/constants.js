const DISCLAIMER_BN =
  'এই তথ্য শুধুমাত্র বোঝার জন্য। সঠিক পরামর্শের জন্য ডাক্তার বা ফার্মাসিস্টের সাথে কথা বলুন।';

const DISCLAIMER_EN =
  'This information is for understanding only. Please talk to your doctor or pharmacist for proper advice.';

function getDisclaimer(language) {
  return language === 'en' ? DISCLAIMER_EN : DISCLAIMER_BN;
}

const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

module.exports = {
  DISCLAIMER_BN,
  DISCLAIMER_EN,
  getDisclaimer,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
};
