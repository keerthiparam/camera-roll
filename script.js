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

// Preload images
const cachedImages = images.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

// Find default image index
const defaultImageName = "IMG_20250517_141813290_MP~2.jpg";
let currentIndex = images.findIndex(img => img.includes(defaultImageName));
if (currentIndex === -1) currentIndex = 0;

// Create and show default centered image
const defaultImg = document.createElement('img');
defaultImg.src = cachedImages[currentIndex].src;
defaultImg.className = 'default-center-image';
defaultImg.style.position = 'fixed';
defaultImg.style.left = '50%';
defaultImg.style.top = '50%';
defaultImg.style.transform = 'translate(-50%, -50%)';
defaultImg.style.width = '200px';
defaultImg.style.height = 'auto';
defaultImg.style.pointerEvents = 'none';
defaultImg.style.userSelect = 'none';
defaultImg.style.zIndex = 9998;
document.body.appendChild(defaultImg);

// Trail configuration
const maxTrails = 5;
const trails = [];
let currentTrailIndex = 0;

for (let i = 0; i < maxTrails; i++) {
  const img = document.createElement('img');
  img.className = 'trail-image';
  img.style.position = 'fixed';
  img.style.width = '150px';
  img.style.height = 'auto';
  img.style.pointerEvents = 'none';
  img.style.userSelect = 'none';
  img.style.zIndex = 9999;
  img.style.opacity = 1;
  img.style.transition = 'opacity 1.5s ease';
  document.body.appendChild(img);
  trails.push({
    element: img,
    timeoutId: null
  });
}

let lastX = 0;
let lastY = 0;
const minDistance = 50;

window.addEventListener('mousemove', (e) => {
  // Distance check to space images
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < minDistance) return;

  lastX = e.clientX;
  lastY = e.clientY;

  // Get current trail object
  const trailObj = trails[currentTrailIndex];
  const trail = trailObj.element;

  // Clear any previous fade timeout for this trail
  if (trailObj.timeoutId) clearTimeout(trailObj.timeoutId);

  // Set image and position
  trail.src = cachedImages[currentIndex].src;
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
  trail.style.opacity = '1';

  // Start fade-out after 2 seconds, then keep hidden
  trailObj.timeoutId = setTimeout(() => {
    trail.style.opacity = '0';
  }, 2000);

  // Move to next trail slot and next image
  currentTrailIndex = (currentTrailIndex + 1) % maxTrails;
  currentIndex = (currentIndex + 1) % cachedImages.length;
});

function removeDefaultImage() {
  if (defaultImg.parentNode) {
    defaultImg.parentNode.removeChild(defaultImg);
  }
  window.removeEventListener('mousemove', removeDefaultImage);
}

// Attach event listener once after DOM content is loaded or script runs
window.addEventListener('mousemove', removeDefaultImage, { once: true });

trail.onload = () => {
  const minSize = 100;
  if (trail.naturalWidth < minSize) {
    const scale = minSize / trail.naturalWidth;
    trail.style.width = `${trail.naturalWidth * scale}px`;
    trail.style.height = `${trail.naturalHeight * scale}px`;
  }
};