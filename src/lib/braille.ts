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
  'ㄅ': '⠕', 'ㄆ': '⠏', 'ㄇ': '⠍', 'ㄈ': '⠟', 'ㄉ': '⠙', 'ㄊ': '⠋', 'ㄋ': '⠝', 'ㄌ': '⠉',
  'ㄍ': '⠅', 'ㄎ': '⠇', 'ㄏ': '⠗', 'ㄐ': '⠅', 'ㄑ': '⠚', 'ㄒ': '⠑', 'ㄓ': '⠁', 'ㄔ': '⠃', 'ㄕ': '⠊',
  'ㄖ': '⠛', 'ㄗ': '⠓', 'ㄘ': '⠚', 'ㄙ': '⠑',
  // Medials
 'ㄧ': '⠡', 'ㄨ': '⠥', 'ㄩ': '⠳',//介母 i u yu
  // Finals
  'ㄚ': '⠜', 'ㄛ': '⠣', 'ㄜ': '⠮', 'ㄝ': '⠢', 'ㄞ': '⠺', 'ㄟ': '⠴', 'ㄠ': '⠩', 'ㄡ': '⠷',
  'ㄢ': '⠧', 'ㄣ': '⠥', 'ㄤ': '⠭', 'ㄥ': '⠵', 'ㄦ': '⠱',
  'ㄧㄚ': '⠾', 'ㄧㄝ': '⠬', 'ㄧㄠ': '⠪', 'ㄧㄡ': '⠎', 'ㄧㄢ': '⠞', 'ㄧㄣ': '⠹', 'ㄧㄤ': '⠨', 'ㄧㄥ': '⠽', 'ㄧㄛ': '⠴','ㄧㄞ': '⠢',
 'ㄨㄚ': '⠔', 'ㄨㄛ': '⠒', 'ㄨㄞ': '⠶', 'ㄨㄟ': '⠫', 'ㄨㄢ': '⠻', 'ㄨㄣ': '⠿', 'ㄨㄤ': '⠸', 'ㄨㄥ': '⠯', 'ㄨㄜ': '⠆',
 'ㄩㄝ': '⠦', 'ㄩㄢ': '⠘', 'ㄩㄣ': '⠲','ㄩㄥ': '⠖','ㄩㄣˊ': '⠶', 'ㄩㄣˇ':'⠴' , 'ㄩㄣˋ': '⠂' , // Adding tone for ㄩㄣ based on the provided link

  // Tones and space
  'ˊ': '⠂', 'ˇ': '⠈', 'ˋ': '⠆', '˙': '⠐',
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
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let matched = false;
    // Try to match longest possible combination (up to 3 characters for Zhuyin)
    for (let len = 3; len >= 1; len--) {
      if (i + len <= text.length) {
        const substring = text.substring(i, i + len);
        if (ZHUYIN_TO_BRAILLE[substring]) {
 result += ZHUYIN_TO_BRAILLE[substring];
 i += len - 1; // Move index by the length of the matched substring
          matched = true;
 break;
        }
      }
    }
    if (!matched) {
      // If no Zhuyin combination is matched, just append the original character
      result += text[i];
    }
  }
  return result;
};

export const brailleToZhuyin = (braille: string): string => {
  let result = '';
  let i = 0;
  while (i < braille.length) {
    let matched = false;
    // Try to match longest possible braille combination (if any longer combinations exist)
    // Currently, all Zhuyin braille are single characters, but this structure is more robust
    for (let len = 2; len >= 1; len--) { // Check for up to 2 characters, adjust if needed
        if (i + len <= braille.length) {
            const substring = braille.substring(i, i + len);
            if (BRAILLE_TO_ZHUYIN[substring]) {
                const mapping = BRAILLE_TO_ZHUYIN[substring];
                result += mapping.split('/')[0]; // Use the first mapping
                i += len;
                matched = true;
                break;
            }
        }
    }
    if (!matched) {
 result += braille[i]; // If no mapping found, append the original braille character
 i++;
    }
  }
  return result;
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

export const braillePatternToChar = (dots: boolean[]): string => {
  const pattern = dots.reduce((acc, dot, i) => acc | (dot ? (1 << i) : 0), 0);
  return String.fromCharCode(0x2800 + pattern);
};
