export function dateToString(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function dateTimeToString(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  });
}

export function getImageUrl(imageId: String) {
  return `https://imagedelivery.net/elsegPDGIcDKwFnUAcL-SA/${imageId}/public`;
}

export const colorList = [
  { color: 'Red', hex: '#FF0000' },
  { color: 'Cyan', hex: '#00FFFF' },
  { color: 'Blue', hex: '#0000FF' },
  { color: 'DarkBlue', hex: '#00008B' },
  { color: 'LightBlue', hex: '#ADD8E6' },
  { color: 'Purple', hex: '#800080' },
  { color: 'Yellow', hex: '#FFFF00' },
  { color: 'Lime', hex: '#00FF00' },
  { color: 'Magenta', hex: '#FF00FF' },
  { color: 'Pink', hex: '#FFC0CB' },
  { color: 'White', hex: '#FFFFFF' },
  { color: 'Silver', hex: '#C0C0C0' },
  { color: 'Gray or Grey', hex: '#808080' },
  { color: 'Black', hex: '#000000' },
  { color: 'Orange', hex: '#FFA500' },
  { color: 'Brown', hex: '#A52A2A' },
  { color: 'Maroon', hex: '#800000' },
  { color: 'Green', hex: '#008000' },
  { color: 'Olive', hex: '#808000' },
  { color: 'Aquamarine', hex: '#7FFFD4' },
];

// export function getColors() {
//   return colorList;
// }

export function getColorNameByHex(hex: string) {
  return colorList.filter((color) => color.hex === hex)[0].color || 'None';
}

export function getConditions() {
  return ['New', 'Like New', 'Good', 'Acceptable', 'For Parts Only'];
}
