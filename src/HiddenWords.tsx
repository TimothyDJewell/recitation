import { useState } from 'react';
import MemoryBox from './MemoryBox';

const hideWords = (text: string, wordPredicate: (value: string, index: number) => boolean): (string | JSX.Element)[] => {
  const splitText = text.split(/\b/);
  const wordIndices = splitText.reduce<{ arr: (number | undefined)[], nextIndex: number }>((prev, curr) => /^\w+$/.test(curr)
      ? ({ arr: [...prev.arr, prev.nextIndex], nextIndex: prev.nextIndex + 1 })
      : ({ arr: [...prev.arr, undefined], nextIndex: prev.nextIndex }),
    { arr: [], nextIndex: 0 }).arr;
  return splitText.map((value, index) => wordIndices[index] === undefined || wordPredicate(value, wordIndices[index]!) ? value : <MemoryBox key={index} hiddenText={value} />);
};

const HiddenWords = ({ text }: { text: string }) =>  {
  const [hideMode, setHideMode] = useState({ mod: 3, n: 2 });
  const increaseN = () => setHideMode({...hideMode, n: (hideMode.n + 1) % hideMode.mod});
  const increaseMod = () => setHideMode({...hideMode, mod: hideMode.mod + 1});
  const decreaseMod = () => {
    const mod = (hideMode.mod - 1) || 1;
    setHideMode({ mod, n: hideMode.n % mod });
  }
  return (
    <div>
      <div>
        <button onClick={increaseN}>Bump hidden words</button>
        <button onClick={increaseMod}>Show more words</button>
        <button onClick={decreaseMod}>Show fewer words</button>
      </div>
      <p style={{ textAlign: 'left', whiteSpace: 'pre' }}>{hideWords(text, (_, i) => i % hideMode.mod !== hideMode.n)}</p>
    </div>
  );
};
export default HiddenWords;
