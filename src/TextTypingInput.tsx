import { useState } from 'react';
import Style from './TextTypingInput.module.css';

/**
 * Compares two strings to find the index of the first difference.
 * Since whitespace of any form is considered equivalent, the indices
 * for each string are both returned.
 * @param a The first string to compare.
 * @param b The second string to compare.
 * @returns The indices in each string of the first difference.
 */
const findIndicesOfFirstDiff = (a: string, b: string) => {
  let indexA = 0, indexB = 0;
  while (indexA < a.length && indexB < b.length) {
    if (a[indexA] === b[indexB]) {
      indexA++;
      indexB++;
      continue;
    }
    const isAWhitespace = /\s/.test(a[indexA]);
    const isBWhitespace = /\s/.test(b[indexB]);
    if (isAWhitespace && isBWhitespace) {
      indexA++;
      indexB++;
      continue;
    } else if (isAWhitespace && /\s/.test(b[indexB - 1])) {
      indexA++;
      continue;
    } else if (isBWhitespace && /\s/.test(a[indexA - 1])) {
      indexB++;
      continue;
    }
    return [indexA, indexB];
  }

  return [indexA, indexB];
};

const TextTypingInput = ({ text }: { text: string }) => {
  const [typed, setTyped] = useState('');
  const [indexText, indexTyped] = findIndicesOfFirstDiff(text, typed);
  const matchedText = text.substring(0, indexText);
  const unmatchedText = typed.substring(indexTyped);
  const remainingText = text.substring(matchedText.length);
  return (
    <>
      <div>
        <div style={{whiteSpace: 'pre'}}>
          <span className={Style.matchedText}>{matchedText}</span>
          <span className={Style.unmatchedText}>{unmatchedText}</span>
          <span className={Style.remainingText}>{remainingText}</span>
        </div>
        <textarea value={typed} onChange={e => setTyped(e.target.value)}/>
      </div>
    </>
  );
};

export default TextTypingInput;
