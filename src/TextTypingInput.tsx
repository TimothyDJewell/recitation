import { useRef, useState } from 'react';
import Style from './TextTypingInput.module.css';
import { LargeInput } from './LargeInput';

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

const TextTypingInput = ({ text, hideRemainingText = false }: { text: string, hideRemainingText?: boolean }) => {
  const [typed, setTyped] = useState('');
  const [maxTypedIndex, setMaxTypedIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [indexText, indexTyped] = findIndicesOfFirstDiff(text, typed);
  const matchedText = text.substring(0, indexText);
  const unmatchedText = typed.substring(indexTyped);
  const remainingText = text.substring(matchedText.length, hideRemainingText ? Math.max(maxTypedIndex, matchedText.length) : undefined);
  const onInputChange = (s: string) => {
    setTyped(s);
    if (hideRemainingText) {
      const [indexText] = findIndicesOfFirstDiff(text, s);
      if (indexText > maxTypedIndex) {
        setMaxTypedIndex(indexText);
      }
    }
  };
  const clearInput = () => {
    setTyped('');
    setMaxTypedIndex(0);
  }
  const showHint = () => {
    const followingText = text.substring(matchedText.length);
    const hintText = followingText.substring(0, followingText.length - followingText.replace(/^\s*\S+/m, '').length);
    const hintEndIndex = matchedText.length + hintText.length;
    if (hintEndIndex > maxTypedIndex) {
      setMaxTypedIndex(hintEndIndex);
    }
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
  };
  return (
    <>
      <div>
        <div className={Style.TextViewArea}>
          <span className={Style.matchedText}>{matchedText}</span>
          <span className={Style.unmatchedText}>{unmatchedText}</span>
          <span className={Style.remainingText}>{remainingText}</span>
        </div>
        <div>
          <LargeInput text={typed} setText={onInputChange} ref={inputRef} />
        </div>
        <div>
          <button onClick={clearInput}>Clear</button>
          {!!hideRemainingText && <button onClick={showHint} disabled={maxTypedIndex > matchedText.length || maxTypedIndex === text.length}>Hint</button>}
        </div>
      </div>
    </>
  );
};

export default TextTypingInput;
