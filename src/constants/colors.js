export const quakeShades = {
  0: '#00FFC9',
  1: '#FFF43C',
  2: '#FFF43C',
  3: '#FFC032',
  4: '#FFC032',
  5: '#FF8B28',
  6: '#FF8B28',
  7: '#FF5720',
  8: '#FF5720',
  9: '#FF001C',
  10: '#FF001C'
}

export function getMagColor(mag) {
  return quakeShades[mag > 0 ? Math.round(mag) : 0]
}

export function textColor(color) {
  if (color.length < 5) {
    color += color.slice(1);
  }
  return (color.replace('#', '0x')) > (0xffffff / 2) ? '#333' : '#fff';
};