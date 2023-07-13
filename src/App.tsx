import './App.css';
import HiddenWords from './HiddenWords';
import TextTypingInput from './TextTypingInput';
import { useLocalStorage } from './Utils';

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

const AppBody = () => {
  const [memorizationText, setMemorizationText] = useLocalStorage('recitation-memorization-text', initialInput);
  return (
    <div className="AppBody">
      <LargeInput text={memorizationText} setText={setMemorizationText} />
      <HiddenWords text={memorizationText} />
      <TextTypingInput text={memorizationText}/>
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
