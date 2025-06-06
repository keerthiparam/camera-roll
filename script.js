const images = [
  "roll/AGC_20240303_152716091.jpg",
  "roll/AGC_20240303_163440033.jpg",
  "roll/AGC_20240409_125632719~2.jpg",
  "roll/AGC_20240422_171347732.jpg",
  "roll/AGC_20240613_173546071.jpg",
  "roll/IMG_20240406_123859978_HDR~2.jpg",
  "roll/IMG_20240420_184904782.jpg",
  "roll/IMG_20240503_093710917.jpg",
  "roll/IMG_20240617_111153645.jpg",
  "roll/IMG_20240617_182357557.jpg",
  "roll/IMG_20240627_162333119.jpg",
  "roll/IMG_20240627_163831142.jpg",
  "roll/IMG_20240712_211616819.jpg",
  "roll/IMG_20240713_115231238.jpg",
  "roll/IMG_20240811_184254631.jpg",
  "roll/IMG_20240907_192750181.jpg",
  "roll/IMG_20240911_120714276_MP.jpg",
  "roll/IMG_20240913_092717882.jpg",
  "roll/IMG_20240914_174841496~2.jpg",
  "roll/IMG_20240916_162115397_HDR.jpg",
  "roll/IMG_20241012_121920918_MP.jpg",
  "roll/IMG_20241117_224642383_MP.jpg",
  "roll/IMG_20250107_160158926_MP.jpg",
  "roll/IMG_20250111_130019272_MP.jpg",
  "roll/IMG_20250121_111021121.jpg",
  "roll/IMG_20250121_134800939_MP.jpg",
  "roll/IMG_20250206_190731.jpg",
  "roll/IMG_20250207_121039572_MP.jpg",
  "roll/IMG_20250207_121322099_MP.jpg",
  "roll/IMG_20250210_133917493_MP_exported_1121.jpg",
  "roll/IMG_20250210_140159714_MP.jpg",
  "roll/IMG_20250214_185925795_MP.jpg",
  "roll/IMG_20250215_070105668.jpg",
  "roll/IMG_20250223_074145218.jpg",
  "roll/IMG_20250223_074428793.jpg",
  "roll/IMG_20250223_133343597.jpg",
  "roll/IMG_20250228_163502306_MP.jpg",
  "roll/IMG_20250419_091704763.jpg",
  "roll/IMG_20250510_171343098.jpg",
  "roll/IMG_20250517_081315660.jpg",
  "roll/IMG_20250517_091039490_MP.jpg",
  "roll/IMG_20250517_141813290_MP~2.jpg",
  "roll/IMG_20250518_134047687_MP.jpg",
  "roll/IMG_20250519_115739313_MP.jpg",
  "roll/IMG_20250524_141940131_MP.jpg",
  "roll/IMG_20250524_163921364.jpg",
  "roll/IMG_20250525_113051141__exported_0_1748185840239.jpg",
  "roll/IMG_20250525_114519154_HDR.jpg",
  "roll/IMG_20250527_113529134_MP.jpg",
  "roll/IMG_20250527_140959040_MP.jpg",
  "roll/IMG_20250527_141148702_MP.jpg",
  "roll/IMG_20250527_141154102_HDR.jpg",
  "roll/IMG_20250527_160404245_MP.jpg",
  "roll/IMG_20250527_165719067_MP.jpg",
  "roll/VID_20241031_184704030_exported_1665.jpg"
];

// Find the index of the default image
const defaultImageName = "IMG_20250517_141813290_MP~2.jpg";
let currentIndex = images.findIndex(img => img.includes(defaultImageName));

// If not found, fallback to 0
if (currentIndex === -1) currentIndex = 0;

const defaultImg = document.createElement('img');
defaultImg.src = images[currentIndex];
defaultImg.className = 'default-center-image';
document.body.appendChild(defaultImg);

const maxTrails = 10; // max images on screen
const trails = [];

let lastX = 0;
let lastY = 0;
const minDistance = 50; // minimum pixels mouse must move to add new image

window.addEventListener('mousemove', (e) => {
  // Calculate distance moved since last image
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dist = Math.sqrt(dx*dx + dy*dy);

  if (dist < minDistance) {
    return; // do nothing if mouse hasn’t moved far enough
  }

  lastX = e.clientX;
  lastY = e.clientY;

  // Create new image
  const trail = document.createElement('img');
  trail.src = images[currentIndex];
  trail.className = 'trail-image';

  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  document.body.appendChild(trail);
  trails.push(trail);

  if (trails.length > maxTrails) {
    const oldTrail = trails.shift();
    oldTrail.remove();
  }

  currentIndex = (currentIndex + 1) % images.length;
});

function removeDefaultImage() {
  if (defaultImg.parentNode) {
    defaultImg.parentNode.removeChild(defaultImg);
  }
  window.removeEventListener('mousemove', removeDefaultImage);
}

window.addEventListener('mousemove', removeDefaultImage);
