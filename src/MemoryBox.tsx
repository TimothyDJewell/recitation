import { useState } from "react";
import Style from './MemoryBox.module.css';

const MemoryBox = (props: { hiddenText: string }) => {
    const [isExposed, updateIsExposed] = useState(false);
    return (
        <span className={`${Style.MemoryBox} ${(isExposed ? Style.Reveal : Style.Secret)}`} onClick={() => updateIsExposed(!isExposed)}>
            {isExposed ? props.hiddenText : '?'}
        </span>
    );
};
export default MemoryBox;
