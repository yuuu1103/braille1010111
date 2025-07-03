const ENGLISH_TO_BRAILLE: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 
  'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 
  'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  
  '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
  
  '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒', '?': '⠦', '!': '⠖', 
  '(': '⠐⠣', ')': '⠐⠜', "'": '⠄', '-': '⠤', '/': '⠌',
  
  ' ': '⠀', // Braille space character
  'capital': '⠠', // Capital sign
  'number': '⠼', // Number sign
};

// Define braille characters that have multiple meanings
const AMBIGUOUS_BRAILLE: Record<string, { en?: string, num?: string, zhuyin?: string }> = {
  '⠁': { en: 'a', num: '1', zhuyin: 'ㄓ' },
  '⠃': { en: 'b', num: '2', zhuyin: 'ㄔ' },
  '⠉': { en: 'c', num: '3', zhuyin: 'ㄌ' },
  '⠙': { en: 'd', num: '4', zhuyin: 'ㄉ' },
  '⠑': { en: 'e', num: '5', zhuyin: 'ㄙ' },
  '⠋': { en: 'f', num: '6', zhuyin: 'ㄊ' },
  '⠛': { en: 'g', num: '7', zhuyin: 'ㄖ' },
  '⠓': { en: 'h', num: '8', zhuyin: 'ㄗ' },
  '⠊': { en: 'i', num: '9', zhuyin: 'ㄕ' },
  '⠚': { en: 'j', num: '0', zhuyin: 'ㄘ' },

  // Zhuyin specific
  '⠅': { en: 'k', zhuyin: 'ㄍ/ㄐ' }, // k and ㄍ/ㄐ
  '⠇': { en: 'l', zhuyin: 'ㄎ/ㄑ' }, // l and ㄎ/ㄑ
  '⠗': { en: 'r', zhuyin: 'ㄏ/ㄖ' }, // r and ㄏ/ㄖ
  '⠞': { en: 't', zhuyin: 'ㄧㄢ' }, // t and ㄧㄢ
  '⠎': { en: 's', zhuyin: 'ㄧㄡ' }, // s and ㄧㄡ
  '⠥': { en: 'u', zhuyin: 'ㄨ' }, // u and ㄨ
  '⠧': { en: 'v', zhuyin: 'ㄢ' }, // v and ㄢ
  '⠺': { en: 'w', zhuyin: 'ㄨㄟ' }, // w and ㄨㄟ
  '⠭': { en: 'x', zhuyin: 'ㄤ' }, // x and ㄤ
  '⠽': { en: 'y', zhuyin: 'ㄧㄥ' }, // y and ㄧㄥ
  '⠵': { en: 'z', zhuyin: 'ㄥ' }, // z and ㄥ

  // Punctuation / Zhuyin Finals
  '⠐': { zhuyin: 'ˋ' }, // Tone mark ˋ
  '⠲': { en: '.', zhuyin: 'ㄩㄣ' }, // period and ㄩㄣ
  '⠆': { en: ';', zhuyin: 'ㄨㄜ' }, // semicolon and ㄨㄜ
  '⠒': { en: ':', zhuyin: 'ㄨㄛ' }, // colon and ㄨㄛ
  '⠦': { en: '?', zhuyin: 'ㄩㄝ' }, // question mark and ㄩㄝ
  '⠖': { en: '!', zhuyin: 'ㄩㄥ' }, // exclamation mark and ㄩㄥ
  '⠶': { zhuyin: 'ㄨㄞ' }, // ㄨㄞ
  '⠴': { zhuyin: 'ㄟ' }, // ㄟ and ㄧㄛ
  '⠬': { zhuyin: 'ㄧㄝ' }, // ㄧㄝ
  '⠪': { zhuyin: 'ㄧㄠ' }, // ㄧㄠ
  '⠻': { zhuyin: 'ㄨㄢ' }, // ㄨㄢ
  '⠿': { zhuyin: 'ㄨㄣ' }, // ㄨㄣ
  '⠘': { zhuyin: 'ㄩㄢ' }, // ㄩㄢ
  '⠳': { zhuyin: 'ㄩ' }, // ㄩ
  '⠹': { zhuyin: 'ㄧㄣ' }, // ㄧㄣ and ㄥ
  '⠡': { zhuyin: 'ㄧ/ㄦ' }, // ㄧ and ㄦ
  '⠣': { zhuyin: 'ㄛ' }, // ㄛ
  '⠜': { zhuyin: 'ㄚ' }, // ㄚ
  '⠮': { zhuyin: 'ㄜ' }, // ㄜ
  '⠢': { zhuyin: 'ㄝ/ㄧㄞ' }, // ㄝ/ㄧㄞ
  '⠩': { zhuyin: 'ㄠ' }, // ㄠ
  '⠷': { zhuyin: 'ㄡ' }, // ㄡ
  '⠾': { zhuyin: 'ㄧㄚ' }, // ㄧㄚ
  '⠔': { zhuyin: 'ㄨㄚ' }, // ㄨㄚ
  '⠫': { zhuyin: 'ㄨㄟ' }, // ㄨㄟ
  '⠸': { zhuyin: 'ㄨㄤ' }, // ㄨㄤ
  '⠯': { zhuyin: 'ㄨㄥ' }, // ㄨㄥ
  '⠨': { zhuyin: 'ㄧㄤ' }, // ㄧㄤ
  '⠂': { en: ',', zhuyin: 'ˊ' }, // comma and ˊ
  '⠄': { en: "'", zhuyin: 'ˇ' }, // apostrophe and ˇ
  '⠠': { en: 'capital' }, // capital sign
  '⠼': { en: 'number', zhuyin: 'ㄝ' }, // number sign and ㄝ
  ' ': { en: ' ', zhuyin: ' ' }, // space character and space
  '⠹': { zhuyin: 'ㄧㄣ/ㄥ' }, // ㄧㄣ/ㄥ
  '⠡': { zhuyin: 'ㄧ/ㄦ' }, // ㄧ/ㄦ
  '⠁': { zhuyin: '˙/ㄓ' } // Tone mark ˙ and ㄓ
};


const BRAILLE_TO_ENGLISH = Object.entries(ENGLISH_TO_BRAILLE).reduce((acc, [key, value]) => {
  if (value.length === 1) { // simple 1-to-1 mapping
      if (!acc[value]) acc[value] = key;
  } else if (value === '⠀') {
      acc[value] = ' ';
  }
  return acc;
}, {} as Record<string, string>);

const ZHUYIN_TO_BRAILLE: Record<string, string> = {
  // Initials
  'ㄅ': '⠕', 'ㄆ': '⠏', 'ㄇ': '⠍', 'ㄈ': '⠟',
  'ㄉ': '⠙', 'ㄊ': '⠋', 'ㄋ': '⠝', 'ㄌ': '⠉',
  'ㄍ': '⠅', 'ㄎ': '⠇', 'ㄏ': '⠗',
  'ㄐ': '⠅', 'ㄑ': '⠇', 'ㄒ': '⠊',
  'ㄓ': '⠁', 'ㄔ': '⠃', 'ㄕ': '⠓',
  'ㄖ': '⠛', 'ㄗ': '⠓', 'ㄘ': '⠚', 'ㄙ': '⠑',

  // Medials
  'ㄧ': '⠡', 'ㄨ': '⠥', 'ㄩ': '⠳', // Medials i, u, yu

  // Finals
  'ㄚ': '⠜', 'ㄛ': '⠣', 'ㄜ': '⠮', 'ㄝ': '⠢',
  'ㄞ': '⠺', 'ㄟ': '⠴', 'ㄠ': '⠩', 'ㄡ': '⠷',
  'ㄢ': '⠧', 'ㄣ': '⠥', 'ㄤ': '⠭', 'ㄥ': '⠵', 'ㄦ': '⠱',
  'ㄧㄚ': '⠾', 'ㄧㄝ': '⠬', 'ㄧㄠ': '⠪', 'ㄧㄡ': '⠎', 'ㄧㄢ': '⠞', 'ㄧㄣ': '⠹', 'ㄧㄤ': '⠨', 'ㄧㄥ': '⠽', 'ㄧㄛ': '⠴', 'ㄧㄞ': '⠢', // Fix: ㄧㄛ and ㄧㄞ
 'ㄨㄚ': '⠔', 'ㄨㄛ': '⠒', 'ㄨㄞ': '⠶', 'ㄨㄟ': '⠫', 'ㄨㄢ': '⠻', 'ㄨㄣ': '⠿', 'ㄨㄤ': '⠸', 'ㄨㄥ': '⠯', 'ㄨㄜ': '⠆',
  'ㄩㄝ': '⠦', 'ㄩㄢ': '⠘', 'ㄩㄣ': '⠲', 'ㄩㄥ': '⠖', // Add missing finals

  // Tones and space
  'ˊ': '⠂', 'ˇ': '⠄', 'ˋ': '⠐', '˙': '⠁',
  ' ': '⠀', // Space character
};

const BRAILLE_TO_ZHUYIN = Object.entries(ZHUYIN_TO_BRAILLE).reduce((acc, [key, value]) => {
    if (!acc[value]) acc[value] = key;
    else if (key !== ' ' && value !== '⠀') { // Handle multiple characters mapping to same braille
        // Only add the key if it's not already in the mapping to avoid duplicates
 if (!acc[value].split('/').includes(key)) {
        acc[value] = `${acc[value]}/${key}`;
 }
    }
    return acc;
}, {} as Record<string, string>);

// Explicitly handle ambiguous braille characters in Zhuyin mapping, prioritizing Zhuyin
Object.entries(AMBIGUOUS_BRAILLE).forEach(([brailleChar, mappings]) => {
    if (mappings.zhuyin) {
        BRAILLE_TO_ZHUYIN[brailleChar] = mappings.zhuyin;
    }
});

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
  let prevCharWasNumber = false; // Track if the previous char was a number to handle number sign context
  for (const char of braille) {
    if (char === ENGLISH_TO_BRAILLE['capital']) {
      isCapitalized = true;
      continue;
    }
    if (char === ENGLISH_TO_BRAILLE['number']) {
      isNumber = true;
      continue;
    } else if (char === '⠀') {
      isNumber = false;
      isCapitalized = false;
      prevCharWasNumber = false;
      result += ' ';
      continue;
    }

    let mapping = BRAILLE_TO_ENGLISH[char];

    // Handle ambiguous characters based on context (number sign)
    if (AMBIGUOUS_BRAILLE[char]) {
        const ambiguousMapping = AMBIGUOUS_BRAILLE[char];
        if (isNumber && ambiguousMapping.num) {
            mapping = ambiguousMapping.num;
            prevCharWasNumber = true;
        } else if (!isNumber && ambiguousMapping.en) {
            mapping = ambiguousMapping.en;
            prevCharWasNumber = false;
        } else {
            // Default to the first mapping in BRAILLE_TO_ENGLISH if no specific context matches
            mapping = BRAILLE_TO_ENGLISH[char] || char; // Use the original char if no mapping
            prevCharWasNumber = false;
        }
    } else {
        // For non-ambiguous characters, use the direct mapping
        mapping = BRAILLE_TO_ENGLISH[char] || char; // Use the original char if no mapping
        prevCharWasNumber = false; // Non-number braille breaks number sequence
    }

    if (isCapitalized && mapping) {
      result += mapping.toUpperCase();
        isCapitalized = false;
    } else if (mapping) {
      result += mapping;
    }
    // If a number was just processed, keep isNumber true for the next character unless it's not a number
    if (!prevCharWasNumber && isNumber) {
        isNumber = false;
    }

  }
  return result;
};

export const zhuyinToBraille = (text: string): string => {
  let result = '';
  const zhuyinCharAndToneRegex = /[\u3105-\u3129\u02CA\u02CB\u02C7\u02C9\u00B7]/;
  const isZhuyinCharacter = (char: string): boolean => zhuyinCharAndToneRegex.test(char);
  
  let i = 0;
  while (i < text.length) {
    const currentChar = text[i];
    
    // Handle spaces
    if (currentChar === ' ') {
      result += '⠀';
      i++;
      continue;
    }
    
    // Check for multi-character combinations first
    let longestMatch = '';
    if (i + 2 < text.length) {
      const threeChars = text.substring(i, i + 3);
      if (ZHUYIN_TO_BRAILLE[threeChars]) {
        longestMatch = threeChars;
      }
    }
    if (!longestMatch && i + 1 < text.length) {
      const twoChars = text.substring(i, i + 2);
      if (ZHUYIN_TO_BRAILLE[twoChars]) {
        longestMatch = twoChars;
      }
    }
    if (!longestMatch && ZHUYIN_TO_BRAILLE[currentChar]) {
      longestMatch = currentChar;
    }
    
    if (longestMatch) {
      result += ZHUYIN_TO_BRAILLE[longestMatch];
      i += longestMatch.length;
    } else if (!isZhuyinCharacter(currentChar)) {
      // Handle non-Zhuyin characters
      let word = '';
      while (i < text.length && !isZhuyinCharacter(text[i])) {
        word += text[i];
        i++;
      }
      if (result.length > 0 && !result.endsWith('⠀')) {
        result += '⠀';
      }
      result += englishToBraille(word);
    }
    else {
      // Character not found, append as is
      result += currentChar;
      i++;
    }
  }
  return result;
};

export const brailleToZhuyin = (braille: string): string => {
  let result = '';
  let i = 0;
  while (i < braille.length) {
    let matched = false;
    // Check for longest match first
    for (let len = 2; len >= 1; len--) {
        if (i + len <= braille.length) {
            const substring = braille.substring(i, i + len);
            if (BRAILLE_TO_ZHUYIN[substring]) {
                let mapping = BRAILLE_TO_ZHUYIN[substring];

                // Handle ambiguous cases. Prioritize Zhuyin.
                if (AMBIGUOUS_BRAILLE[substring] && AMBIGUOUS_BRAILLE[substring].zhuyin) {
                    mapping = AMBIGUOUS_BRAILLE[substring].zhuyin;
                }
                
                result += mapping.split('/')[0];
                i += len;
                matched = true;
                break;
            }
        }
    }

    if (!matched) {
        // If no Zhuyin match, check for English/number, but only for single characters
        const char = braille[i];
        if (BRAILLE_TO_ENGLISH[char] && !AMBIGUOUS_BRAILLE[char]) {
             result += BRAILLE_TO_ENGLISH[char];
        } else {
             // Fallback for unmatched or ambiguous single characters
             result += char;
        }
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

export const getPageColorStyle = (backgroundColor: string, textColor: string) => {
  return { backgroundColor, color: textColor };
};
