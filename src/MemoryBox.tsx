import { useState } from "react";
import Style from './MemoryBox.module.css';

const widthClassNames = [
    Style.w12, // default for length zero
    Style.w1,
    Style.w2,
    Style.w3,
    Style.w4,
    Style.w5,
    Style.w6,
    Style.w7,
    Style.w8,
    Style.w9,
    Style.w10,
    Style.w11,
    Style.w12,
];

const MemoryBox = (props: { hiddenText: string }) => {
    const [isExposed, updateIsExposed] = useState(false);
    const className = [
        Style.MemoryBox,
        isExposed ? Style.Reveal : Style.Secret,
        widthClassNames[props.hiddenText.length] || widthClassNames[widthClassNames.length - 1],
    ].join(' ');
    return (
        <span className={className} onClick={() => updateIsExposed(!isExposed)}>
            {isExposed ? props.hiddenText : '?'}
        </span>
    );
};
export default MemoryBox;
