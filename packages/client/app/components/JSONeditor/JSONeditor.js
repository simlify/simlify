import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

import initialJSON from './initialJSON';
import './JSONeditor.scss';

const JSONeditor = (props) => {
  const {
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
    initialValue = initialJSON,
  } = props;

  const [code, setCode] = useState(initialValue);

  const handleValueChange = (newCode) => {
    onChange(code);
    return highlight(code, languages.js);
  }

  return (
    <Editor
      placeholder="Type some JSON here"
      value={code}
      onValueChange={code => setCode(code)}
      highlight={(newCode) => handleValueChange(newCode)}
      padding={10}
      onBlur={() => onBlur()}
      onFocus={() => onFocus()}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
};

export default (JSONeditor);
