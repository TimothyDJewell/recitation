import { useState } from 'react';
import Style from './App.module.css';
import HiddenWords from './HiddenWords';
import { LargeInput } from './LargeInput';
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

const gameModeOptionMapping: { [name: string]: (props: { text: string }) => JSX.Element } = {
  'Hidden Words': ({ text }) => <HiddenWords text={text} />,
  'Type Text': ({ text }) => <TextTypingInput text={text} />,
  'Type Text from scratch': ({ text }) => <TextTypingInput text={text} hideRemainingText />,
}

const AppBody = () => {
  const [memorizationText, setMemorizationText] = useLocalStorage('recitation-memorization-text', initialInput);
  const [showMemorizationInput, setShowMemorizationInput] = useState(!memorizationText.length || memorizationText === initialInput);
  const [gameModeOption, setGameModeOption] = useState<undefined | string>();
  const GameMode = gameModeOption !== undefined ? gameModeOptionMapping[gameModeOption] : undefined;
  return (
    <div className={Style.AppBody}>
      <div>
        Text to memorize:
        <button onClick={() => setShowMemorizationInput(!showMemorizationInput)}>{showMemorizationInput ? 'Hide' : 'Show'}</button>
      </div>
      {showMemorizationInput && <LargeInput text={memorizationText} setText={setMemorizationText} />}
      <div>
        {!gameModeOption && 'Choose a memorization game:'}
        {!gameModeOption && Object.keys(gameModeOptionMapping).map(name => <button key={name} onClick={() => setGameModeOption(name)}>{name}</button>)}
        {!!gameModeOption && <button onClick={() => setGameModeOption(undefined)}>Back</button>}
      </div>
      {!!GameMode && <GameMode text={memorizationText} />}
    </div>
  );
};

const App = () => (
  <div className={Style.App}>
    <header className={Style.AppHeader}>
      Recitation
    </header>
    <div className={Style.AppBodyWrapper}>
      <AppBody />
    </div>
  </div>
);

export default App;
