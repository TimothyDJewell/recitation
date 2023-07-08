import React from 'react';
import './App.css';

const verses = [
  'Have this mind among yourselves, which is yours in Christ Jesus,',
  'who, though he was in the form of God, did not count equality with God a thing to be grasped,',
  'but emptied himself, by taking the form of a servant, being born in the likeness of men.',
  'And being found in human form, he humbled himself by becoming obedient to the point of death, even death on a cross.',
  'Therefore God has highly exalted him and bestowed on him the name that is above every name,',
  'so that at the name of Jesus every knee should bow, in heaven and on earth and under the earth,',
  'and every tongue confess that Jesus Christ is Lord, to the glory of God the Father.',
];

const Display = ({ lines }: {lines: string[]}) => (
  <div>
    {lines.map(o => <p>{o}</p>)}
  </div>
);

const HiddenWords = ({ text }: { text: string }) => {
  const splitText = text.split(/\b/g);
  const wordIndices = splitText.map((s, i) => /^\w+$/.test(s) ? i : null).filter(o => o !== null) as number[];
  const indicesToHide = wordIndices.reduce((prev, curr, index) => index % 3 === 2 ? [...prev, curr] : prev, [] as number[]);
  const hiddenText = splitText.map((s, i) => indicesToHide.indexOf(i) !== -1 ? '_____' : s).join('');
  return <Display lines={[ hiddenText ]} />;
};

const App = () => (
  <div className="App">
    <header className="App-header">
      Recitation
    </header>
    <Display lines={verses} />
    <HiddenWords text={verses[0]}/>
  </div>
);

export default App;
