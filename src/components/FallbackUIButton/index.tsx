import React, { useState } from 'react';
import { Button } from '../../styles';

export default function FallbackUIButton() {
  const [isError, setIsError] = useState<boolean>(false);

  let content: JSX.Element;

  switch (true) {
    case isError:
      throw new Error('Test error throwing');

    default:
      content = <Button onClick={() => setIsError(true)}>Get an error</Button>;
      break;
  }

  return content;
}
