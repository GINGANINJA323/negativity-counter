import * as React from 'react';

const App = (): JSX.Element => {
  const [events, setEvents] = React.useState<number>(0);

  const incrementEvent = (e: KeyboardEvent): void => {
    if (e.code === 'Enter') {
      setEvents(events+1);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', incrementEvent);

    return () => document.removeEventListener('keydown', incrementEvent);
  });

  return (
    <div>
      <h1>{'React Negativity Counter'}</h1>
      <p>{'Everytime something negative is said, press enter.'}</p>
      <h2>{`Number of negative events: ${events}`}</h2>
    </div>
  );
}

export default App;