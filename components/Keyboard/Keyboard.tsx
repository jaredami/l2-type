import { useEffect } from "react";

export default function Keyboard({
  checkIfCorrectKey,
}: {
  checkIfCorrectKey(key: string): void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // if (this.letterIndex === 0) {
      //   this.handleStartOfSample();
      // }

      checkIfCorrectKey(event.key);

      // if (this.letterIndex === this.sample.length) {
      //   this.handleEndOfSample();
      // }

      if (!event) return;
      toggleActiveKeyClass(getKeyElement(event));
    }

    function handleKeyUp(event: KeyboardEvent) {
      toggleActiveKeyClass(getKeyElement(event));
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [checkIfCorrectKey]);

  function toggleActiveKeyClass(element: Element | null) {
    if (!element) return;
    element.classList.toggle("active-key");
  }

  function getKeyElement(event: KeyboardEvent) {
    const charSelector = `[data-char="${event.key.toUpperCase()}"]`;
    const charElement = document.body.querySelector(charSelector);

    const keySelector = `[data-key="${event.code}"]`;
    const keyElement = document.body.querySelector(keySelector);

    return charElement || keyElement;
  }

  return (
    <div className="keyboard">
      <div className="keyboard__row keyboard__row--h1">
        <div data-key="Escape" className="key--word">
          <span>esc</span>
        </div>
        <div data-key="F1" className="key--fn">
          <span>F1</span>
        </div>
        <div data-key="F2" className="key--fn">
          <span>F2</span>
        </div>
        <div data-key="F3" className="key--fn">
          <span>F3</span>
        </div>
        <div data-key="F4" className="key--fn">
          <span>F4</span>
        </div>
        <div data-key="F5" className="key--fn">
          <span>F5</span>
        </div>
        <div data-key="F6" className="key--fn">
          <span>F6</span>
        </div>
        <div data-key="F7" className="key--fn">
          <span>F7</span>
        </div>
        <div data-key="F8" className="key--fn">
          <span>F8</span>
        </div>
        <div data-key="F9" className="key--fn">
          <span>F9</span>
        </div>
        <div data-key="F10" className="key--fn">
          <span>F10</span>
        </div>
        <div data-key="F11" className="key--fn">
          <span>F11</span>
        </div>
        <div data-key="F12" className="key--fn">
          <span>F12</span>
        </div>
        <div data-key="n/a" className="key--word">
          <span>pwr</span>
        </div>
      </div>
      <div className="keyboard__row">
        <div className="key--double" data-key="Backquote">
          <div>~</div>
          <div>`</div>
        </div>
        <div className="key--double" data-key="Digit1">
          <div>!</div>
          <div>1</div>
        </div>
        <div className="key--double" data-key="Digit2">
          <div>@</div>
          <div>2</div>
        </div>
        <div className="key--double" data-key="Digit3">
          <div>#</div>
          <div>3</div>
        </div>
        <div className="key--double" data-key="Digit4">
          <div>$</div>
          <div>4</div>
        </div>
        <div className="key--double" data-key="Digit5">
          <div>%</div>
          <div>5</div>
        </div>
        <div className="key--double" data-key="Digit6">
          <div>^</div>
          <div>6</div>
        </div>
        <div className="key--double" data-key="Digit7">
          <div>&</div>
          <div>7</div>
        </div>
        <div className="key--double" data-key="Digit8">
          <div>*</div>
          <div>8</div>
        </div>
        <div className="key--double" data-key="Digit9">
          <div>(</div>
          <div>9</div>
        </div>
        <div className="key--double" data-key="Digit0">
          <div>)</div>
          <div>0</div>
        </div>
        <div className="key--double" data-key="Minus">
          <div>_</div>
          <div>-</div>
        </div>
        <div className="key--double" data-key="Equal">
          <div>+</div>
          <div>=</div>
        </div>
        <div
          className="key--bottom-right key--word key--w4"
          data-key="Backspace"
        >
          <span>delete</span>
        </div>
      </div>
      <div className="keyboard__row">
        <div className="key--bottom-left key--word key--w4" data-key="Tab">
          <span>tab</span>
        </div>
        <div className="key--letter" data-char="Q">
          Q
        </div>
        <div className="key--letter" data-char="W">
          W
        </div>
        <div className="key--letter" data-char="E">
          E
        </div>
        <div className="key--letter" data-char="R">
          R
        </div>
        <div className="key--letter" data-char="T">
          T
        </div>
        <div className="key--letter" data-char="Y">
          Y
        </div>
        <div className="key--letter" data-char="U">
          U
        </div>
        <div className="key--letter" data-char="I">
          I
        </div>
        <div className="key--letter" data-char="O">
          O
        </div>
        <div className="key--letter" data-char="P">
          P
        </div>
        <div className="key--double" data-key="BracketLeft" data-char="{[">
          <div>&#123;</div>
          <div>[</div>
        </div>
        <div className="key--double" data-key="BracketRight" data-char="}]">
          <div>&#125;</div>
          <div>]</div>
        </div>
        <div className="key--double" data-key="Backslash" data-char="|">
          <div>|</div>
          <div>\</div>
        </div>
      </div>
      <div className="keyboard__row">
        <div className="key--bottom-left key--word key--w5" data-key="CapsLock">
          <span>caps lock</span>
        </div>
        <div className="key--letter" data-char="A">
          A
        </div>
        <div className="key--letter" data-char="S">
          S
        </div>
        <div className="key--letter" data-char="D">
          D
        </div>
        <div className="key--letter" data-char="F">
          F
        </div>
        <div className="key--letter" data-char="G">
          G
        </div>
        <div className="key--letter" data-char="H">
          H
        </div>
        <div className="key--letter" data-char="J">
          J
        </div>
        <div className="key--letter" data-char="K">
          K
        </div>
        <div className="key--letter" data-char="L">
          L
        </div>
        <div className="key--double" data-key="186">
          <div>:</div>
          <div>;</div>
        </div>
        <div className="key--double" data-key="222">
          <div>"</div>
          <div>'</div>
        </div>
        <div className="key--bottom-right key--word key--w5" data-key="Enter">
          <span>return</span>
        </div>
      </div>
      <div className="keyboard__row">
        <div
          className="key--bottom-left key--word key--w6"
          data-key="ShiftLeft"
        >
          <span>shift</span>
        </div>
        <div className="key--letter" data-char="Z">
          Z
        </div>
        <div className="key--letter" data-char="X">
          X
        </div>
        <div className="key--letter" data-char="C">
          C
        </div>
        <div className="key--letter" data-char="V">
          V
        </div>
        <div className="key--letter" data-char="B">
          B
        </div>
        <div className="key--letter" data-char="N">
          N
        </div>
        <div className="key--letter" data-char="M">
          M
        </div>
        <div className="key--double" data-key="Comma">
          <div>&lt;</div>
          <div>,</div>
        </div>
        <div className="key--double" data-key="Period">
          <div>&gt;</div>
          <div>.</div>
        </div>
        <div className="key--double" data-key="Slash">
          <div>?</div>
          <div>/</div>
        </div>
        <div
          className="key--bottom-right key--word key--w6"
          data-key="ShiftRight"
        >
          <span>shift</span>
        </div>
      </div>
      <div className="keyboard__row keyboard__row--h3">
        <div className="key--bottom-left key--word">
          <span>fn</span>
        </div>
        <div
          className="key--bottom-left key--word key--w1"
          data-key="ControlLeft"
        >
          <span>control</span>
        </div>
        <div className="key--bottom-left key--word key--w1" data-key="AltLeft">
          <span>option</span>
        </div>
        <div
          className="key--bottom-right key--word key--w3"
          data-key="MetaLeft"
        >
          <span>command</span>
        </div>
        <div
          className="key--double key--right key--space"
          data-key="Space"
          data-char=" "
        >
          &nbsp;
        </div>
        <div
          className="key--bottom-left key--word key--w3"
          data-key="MetaRight"
        >
          <span>command</span>
        </div>
        <div className="key--bottom-left key--word key--w1" data-key="AltRight">
          <span>option</span>
        </div>
        <div data-key="ArrowLeft" className="key--arrow">
          <span>&#9664;</span>
        </div>
        <div className="key--double key--arrow--tall" data-key="ArrowUp">
          <div>&#9650;</div>
          <div>&#9660;</div>
        </div>
        <div data-key="ArrowRight" className="key--arrow">
          <span>&#9654;</span>
        </div>
      </div>
    </div>
  );
}
