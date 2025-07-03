const ENGLISH_TO_BRAILLE: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
  ' ': '⠀',
  '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒', '/': '⠌', '?': '⠦', '!': '⠖', '(': '⠐⠣', ')': '⠐⠜', "'": '⠄', '-': '⠤',
  'capital': '⠠',
  'number': '⠼',
};
// Define braille characters that have multiple meanings
const AMBIGUOUS_BRAILLE: Record<string, { en?: string, num?: string, zhuyin?: string }> = {
  '⠁': { en: 'a', num: '1', zhuyin: 'ㄓ/˙' }, // Example: '⠁' is 'a', '1', 'ㄓ', '˙'
  '⠃': { en: 'b', num: '2', zhuyin: 'ㄔ' },
  '⠉': { en: 'c', num: '3', zhuyin: 'ㄌ' },
  '⠙': { en: 'd', num: '4', zhuyin: 'ㄉ' },
  '⠑': { en: 'e', num: '5', zhuyin: 'ㄒ/ㄙ' },
  '⠋': { en: 'f', num: '6', zhuyin: 'ㄊ' },
  '⠛': { en: 'g', num: '7', zhuyin: 'ㄖ' },
  '⠓': { en: 'h', num: '8', zhuyin: 'ㄗ' },
  '⠊': { en: 'i', num: '9', zhuyin: 'ㄕ' },
  '⠚': { en: 'j', num: '0', zhuyin: 'ㄑ/ㄘ' },
  '⠥': { en: 'u', zhuyin: 'ㄨ/ㄣ' }, // Add other ambiguous mappings
  '⠧': { en: 'v', zhuyin: 'ㄢ' },
  '⠺': { en: 'w', zhuyin: 'ㄞ' },
  '⠭': { en: 'x', zhuyin: 'ㄤ' },
  '⠽': { en: 'y', zhuyin: 'ㄧㄥ' },
  '⠵': { en: 'z', zhuyin: 'ㄥ' },
  '⠂': { en: ',', zhuyin: 'ˊ' },
  '⠄': { en: "'", zhuyin: 'ˇ' },
  '⠐': { en: '', zhuyin: 'ˋ' }, // Assuming this is only a tone mark
  '⠲': { en: '.', zhuyin: 'ㄩㄣ' },
  '⠆': { en: ';', zhuyin: 'ㄨㄜ' },
  '⠒': { en: ':', zhuyin: 'ㄨㄛ' },
  '⠦': { en: '?', zhuyin: 'ㄩㄝ' },
  '⠖': { en: '!', zhuyin: 'ㄩㄥ' },
  '⠶': { en: '', zhuyin: 'ㄨㄞ/ㄩㄣˊ' },
  '⠴': { en: 'ㄟ', zhuyin: 'ㄧㄛ/ㄩㄣˇ' },
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
 '⠀': ' ',
  'ˊ': '⠂', 'ˇ': '⠄', 'ˋ': '⠐', '˙': '⠁',
  ' ': '⠀'
};

const BRAILLE_TO_ZHUYIN = Object.entries(ZHUYIN_TO_BRAILLE).reduce((acc, [key, value]) => {
    if (!acc[value]) acc[value] = key;
    else if (key !== ' ' && value !== '⠀') { // Handle multiple characters mapping to same braille
        acc[value] = `${acc[value]}/${key}`;
    }
    return acc;
}, {} as Record<string, string>);

// Explicitly handle ambiguous braille characters in Zhuyin mapping, prioritizing Zhuyin
Object.entries(AMBIGUOUS_BRAILLE).forEach(([brailleChar, mappings]) => {
    if (mappings.zhuyin) {
        BRAILLE_TO_ZHUYIN[brailleChar] = mappings.zhuyin;
    } else if (!BRAILLE_TO_ZHUYIN[brailleChar] && mappings.en) {
        BRAILLE_TO_ZHUYIN[brailleChar] = mappings.en;
    } else if (!BRAILLE_TO_ZHUYIN[brailleChar] && mappings.num) {
         BRAILLE_TO_ZHUYIN[brailleChar] = mappings.num;
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
  // Regex for Zhuyin characters (initials, medials, finals) and tone marks and spaces
  const zhuyinCharAndToneRegex = /[\u3105-\u3129\u02CA\u02CB\u02C7\u02C9\u00B7]/;
  const toneRegex = /[\u02CA\u02CB\u02C7\u02C9\u00B7]/; // Tone marks
  const initialRegex = /[\u3105-\u3119]/; // Initials ㄅ - ㄙ
  const medialRegex = /[\u3127-\u3129]/; // Medials ㄧ, ㄨ, ㄩ
  const finalRegex = /[\u311A-\u3126]/; // Finals ㄚ - ㄦ

  const isZhuyinCharacter = (char: string): boolean => zhuyinCharAndToneRegex.test(char);

  for (let i = 0; i < text.length; i++) {
    let matched = false;
    const currentChar = text[i];

    // Handle spaces
    if (currentChar === ' ') {
      result += '⠀';
      i++;
      matched = true;
      continue;
    }

    // Check if the current character is a Zhuyin character or a tone mark
    if (isZhuyinCharacter(currentChar)) {
      // Handle single Zhuyin characters (initials, medials, finals, tones)
      if (ZHUYIN_TO_BRAILLE[currentChar]) {
        result += ZHUYIN_TO_BRAILLE[currentChar];
 result += '⠀'.repeat(2); // Add two spaces to fulfill the 3-cell requirement per Zhuyin char/part
        i++;
          matched = true;
      }
      // Try to match common combinations like "ㄨㄛ", "ㄉㄨㄛ", etc. explicitly
      // This is a simplified approach and might not cover all valid Zhuyin syllables.
      // A proper Zhuyin parsing would be more robust.
      else if (i + 1 < text.length) {
        const nextChar = text[i + 1];
        const twoCharCombination = currentChar + nextChar;
        if (ZHUYIN_TO_BRAILLE[twoCharCombination]) {
          result += ZHUYIN_TO_BRAILLE[twoCharCombination];
 result += '⠀'; // Add one space to fulfill the 3-cell requirement
          i++;
          i++;
          matched = true;
        }
      }
      if (!matched) {
 // If no specific mapping is found for the character or combination,
        // append the character as is or handle as an error.
 result += currentChar; // Append the character as is
        i++;
        matched = true;
      }
    }


    if (!matched) {
      // If no match was found for any case, append the original character and move on
      // Handle non-Zhuyin characters - treat them as words and convert using English conversion
      let word = '';
      while (i < text.length && !isZhuyinCharacter(text[i]) && text[i] !== ' ') {
        word += text[i];
        i++;
      }
      if (word.length > 0) {
          // Add space separator if not the beginning and not a space
        if (result.length > 0 && result.slice(-1) !== '⠀') {
          result += '⠀';
        }
        result += englishToBraille(word); // Convert non-Zhuyin word to English braille
      } else {
        result += text[i]; // Should ideally not happen if all characters are covered
        i++;
      }
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
    for (let len = 2; len >= 1; len--) { // Check for up to 2 characters, adjust if needed
        if (i + len <= braille.length) {
            const substring = braille.substring(i, i + len);
            if (BRAILLE_TO_ZHUYIN[substring]) {
                let mapping = BRAILLE_TO_ZHUYIN[substring];

                // Handle ambiguous braille characters in Zhuyin context
                if (AMBIGUOUS_BRAILLE[substring] && AMBIGUOUS_BRAILLE[substring].zhuyin) {
                    mapping = AMBIGUOUS_BRAILLE[substring].zhuyin;
                }

                result += mapping.split('/')[0]; // Always use the first mapping in the Zhuyin context
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

export const getFontSizeStyle = (size: number) => {
  return { fontSize: `${size}px` };
};

export const getPageColorStyle = (backgroundColor: string, textColor: string) => {
  return { backgroundColor, color: textColor };
};
