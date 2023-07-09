import React, { useState } from 'react';
import './App.css';
import MemoryBox from './MemoryBox';

const initialInput = [
  'Have this mind among yourselves, which is yours in Christ Jesus,',
  'who, though he was in the form of God, did not count equality with God a thing to be grasped,',
  'but emptied himself, by taking the form of a servant, being born in the likeness of men.',
  'And being found in human form, he humbled himself by becoming obedient to the point of death, even death on a cross.',
  'Therefore God has highly exalted him and bestowed on him the name that is above every name,',
  'so that at the name of Jesus every knee should bow, in heaven and on earth and under the earth,',
  'and every tongue confess that Jesus Christ is Lord, to the glory of God the Father.',
  'Phillipians 2:5-11',
].join('\n');

const LargeInput = ({ text, setText }: { text: string, setText: (t: string) => void}) => (
  <textarea className="LargeInput" onChange={e => setText(e.target.value)} value={text} />
);

const hideWords = (text: string, wordPredicate: (value: string, index: number) => boolean): (string | JSX.Element)[] => {
  const splitText = text.split(/\b/);
  const wordIndices = splitText.reduce<{ arr: (number | undefined)[], nextIndex: number }>((prev, curr) => /^\w+$/.test(curr)
      ? ({ arr: [...prev.arr, prev.nextIndex], nextIndex: prev.nextIndex + 1 })
      : ({ arr: [...prev.arr, undefined], nextIndex: prev.nextIndex }),
    { arr: [], nextIndex: 0 }).arr;
  return splitText.map((value, index) => wordIndices[index] === undefined || wordPredicate(value, wordIndices[index]!) ? value : <MemoryBox hiddenText={value} />);
}

const AppBody = () => {
  const [memorizationText, setMemorizationText] = useState(initialInput);
  const [hideMode, setHideMode] = useState({ mod: 3, n: 2 });
  const increaseN = () => setHideMode({...hideMode, n: (hideMode.n + 1) % hideMode.mod});
  const increaseMod = () => setHideMode({...hideMode, mod: hideMode.mod + 1});
  const decreaseMod = () => {
    const mod = (hideMode.mod - 1) || 1;
    setHideMode({ mod, n: hideMode.n % mod });
  }

  return (
    <div className="AppBody">
      <pre>{JSON.stringify(hideMode)}</pre>
      <LargeInput text={memorizationText} setText={setMemorizationText} />
      <div>
        <button onClick={increaseN}>Bump hidden words</button>
        <button onClick={increaseMod}>Show more words</button>
        <button onClick={decreaseMod}>Show fewer words</button>
      </div>
      <p style={{whiteSpace: 'pre'}}>{hideWords(memorizationText, (_, i) => i % hideMode.mod !== hideMode.n)}</p>
    </div>
  );
};

const App = () => (
  <div className="App">
    <header className="App-header">
      Recitation
    </header>
    <div className="App-body-wrapper">
      <AppBody />
    </div>
  </div>
);

export default App;
