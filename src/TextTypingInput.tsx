import React, { useState } from 'react';

const findIndexOfFirstNonMatch = (a: string, b: string) => {
  let i = 0;
  for (; i < a.length && i < b.length; ++i) {
    if (a[i] !== b[i]) {
      return i;
    }
  }
  if (a.length !== b.length) {
    return i;
  }

  return -1;
};

const TextTypingInput = ({ text }: { text: string }) => {
  const [typed, setTyped] = useState('');
  const indexOfNonMatch = findIndexOfFirstNonMatch(text, typed);
  const matchedText = indexOfNonMatch > 0 ? text.substring(0, indexOfNonMatch) : '';
  const unmatchedText = indexOfNonMatch !== -1 ? typed.substring(indexOfNonMatch) : '';
  const remainingText = text.substring(matchedText.length);
  return (
    <>
      <div>
        <div style={{whiteSpace: 'pre'}}>
          <span style={{ color: 'black' }}>{matchedText}</span>
          <span style={{ color: 'red' }}>{unmatchedText}</span>
          <span style={{ color: 'gray' }}>{remainingText}</span>
        </div>
        <textarea value={typed} onChange={e => setTyped(e.target.value)}/>
      </div>
    </>
  );
};

export default TextTypingInput;
