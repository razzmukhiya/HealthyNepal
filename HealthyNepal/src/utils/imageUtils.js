// Base64 encoded SVG placeholder image
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjE0Ij4KICAgIFByb2R1Y3QgSW1hZ2UKICA8L3RleHQ+Cjwvc3ZnPg==";

export const getImageUrl = (imageData, selectedIndex = 0) => {
  if (!imageData || !Array.isArray(imageData) || imageData.length === 0) {
    return placeholderImage;
  }

  const firstImage = imageData[selectedIndex] || imageData[0];
  if (!firstImage.url) {
    return placeholderImage;
  }

  // If it's already a full URL, return it
  if (firstImage.url.startsWith('http')) {
    return firstImage.url;
  }

  // If it's a relative path starting with /uploads, use it directly
  if (firstImage.url.startsWith('/uploads')) {
    return firstImage.url;
  }

  // If it's just a filename, add /uploads prefix
  return `/uploads/${firstImage.url}`;
};

export const handleImageError = (e) => {
  console.log('Image load error:', e.target.src);
  e.target.onerror = null;
  e.target.src = placeholderImage;
};
