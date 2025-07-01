const ENGLISH_TO_BRAILLE: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
  ' ': '⠀',
  '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒', '/': '⠌', '?': '⠦', '!': '⠖', '(': '⠐⠣', ')': '⠐⠜', "'": '⠄', '-': '⠤',
  'capital': '⠠',
  'number': '⠼',
};

const BRAILLE_TO_ENGLISH = Object.entries(ENGLISH_TO_BRAILLE).reduce((acc, [key, value]) => {
  if (value.length === 1) { // simple 1-to-1 mapping
      if (!acc[value]) acc[value] = key;
  }
  return acc;
}, {} as Record<string, string>);

const ZHUYIN_TO_BRAILLE: Record<string, string> = {
  // Initials
  'ㄅ': '⠕', 'ㄆ': '⠏', 'ㄇ': '⠍', 'ㄈ': '⠟', 'ㄉ': '⠙', 'ㄊ': '⠞', 'ㄋ': '⠝', 'ㄌ': '⠇',
  'ㄍ': '⠛', 'ㄎ': '⠅', 'ㄏ': '⠓', 'ㄐ': '⠚', 'ㄑ': '⠚', 'ㄒ': '⠚', 'ㄓ': '⠁', 'ㄔ': '⠃', 'ㄕ': '⠉',
  'ㄖ': '⠗', 'ㄗ': '⠓', 'ㄘ': '⠓', 'ㄙ': '⠓',
  // Medials
  'ㄧ': '⠊', 'ㄨ': '⠥', 'ㄩ': '⠧',
  // Finals
  'ㄚ': '⠜', 'ㄛ': '⠣', 'ㄜ': '⠮', 'ㄝ': '⠢', 'ㄞ': '⠺', 'ㄟ': '⠴', 'ㄠ': '⠖', 'ㄡ': '⠦',
  'ㄢ': '⠧', 'ㄣ': '⠥', 'ㄤ': '⠭', 'ㄥ': '⠵', 'ㄦ': '⠱',
  // Tones
  'ˊ': '⠂', 'ˇ': '⠄', 'ˋ': '⠆', '˙': '⠁',
  ' ': '⠀'
};

const BRAILLE_TO_ZHUYIN = Object.entries(ZHUYIN_TO_BRAILLE).reduce((acc, [key, value]) => {
    if (!acc[value]) acc[value] = key;
    else if (key !== ' ' && value !== '⠀') { // Handle multiple characters mapping to same braille
        acc[value] = `${acc[value]}/${key}`;
    }
    return acc;
}, {} as Record<string, string>);

export const englishToBraille = (text: string): string => {
  let result = '';
  let inNumberSequence = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Z]/.test(char)) {
      result += ENGLISH_TO_BRAILLE['capital'] + (ENGLISH_TO_BRAILLE[char.toLowerCase()] || '');
      inNumberSequence = false;
    } else if (/[0-9]/.test(char)) {
      if (!inNumberSequence) {
        result += ENGLISH_TO_BRAILLE['number'];
        inNumberSequence = true;
      }
      result += ENGLISH_TO_BRAILLE[char] || '';
    } else {
      inNumberSequence = false;
      result += ENGLISH_TO_BRAILLE[char] || '';
    }
  }
  return result;
};

export const brailleToEnglish = (braille: string): string => {
  let result = '';
  let isCapitalized = false;
  let isNumber = false;
  for (const char of braille) {
    if (char === ENGLISH_TO_BRAILLE['capital']) {
      isCapitalized = true;
      continue;
    }
    if (char === ENGLISH_TO_BRAILLE['number']) {
      isNumber = true;
      continue;
    }
    if (char === '⠀') {
      isNumber = false;
      isCapitalized = false;
      result += ' ';
      continue;
    }
    let mapping = BRAILLE_TO_ENGLISH[char];
    if (mapping) {
      if (isNumber) {
        if (!/[0-9]/.test(mapping)) {
           isNumber = false;
        }
      }
      if (isCapitalized) {
        mapping = mapping.toUpperCase();
        isCapitalized = false;
      }
      result += mapping;
    }
  }
  return result;
};

export const zhuyinToBraille = (text: string): string => {
  return text.split('').map(char => ZHUYIN_TO_BRAILLE[char] || '').join('');
};

export const brailleToZhuyin = (braille: string): string => {
  return braille.split('').map(char => {
      const mapping = BRAILLE_TO_ZHUYIN[char];
      // If multiple options, show first one. A better UI might let user choose.
      return mapping ? mapping.split('/')[0] : '';
  }).join('');
};

export const getBrailleUnicodePattern = (char: string): boolean[] => {
    const code = char.charCodeAt(0);
    if (code < 0x2800 || code > 0x28FF) return [false, false, false, false, false, false];
    
    const pattern = code - 0x2800;
    return [
        (pattern & 1) !== 0, // dot 1
        (pattern & 2) !== 0, // dot 2
        (pattern & 4) !== 0, // dot 3
        (pattern & 8) !== 0, // dot 4
        (pattern & 16) !== 0, // dot 5
        (pattern & 32) !== 0, // dot 6
    ];
};
