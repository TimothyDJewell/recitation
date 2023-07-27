import { forwardRef } from 'react';
import Style from './LargeInput.module.css';

export const LargeInput = forwardRef<
  HTMLTextAreaElement,
  { text: string; setText: (t: string) => void; }>(({ text, setText }, ref) => (
  <textarea ref={ref} className={Style.LargeInput} onChange={e => setText(e.target.value)} value={text} />
));
