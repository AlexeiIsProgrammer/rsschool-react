import React, { useState } from 'react';
import { Button } from '../../styles';

export default function FallbackUIButton() {
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) {
    throw new Error('Test error throwing');
  }

  return <Button onClick={() => setIsError(true)}>Get an error</Button>;
}
