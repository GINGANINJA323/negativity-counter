import * as React from 'react';
import ReactHelmet from 'react-helmet';
import styled from 'styled-components';

const ParentDiv = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Abel', sans-serif;
  background-color: ${(props) => props.theme === 'dark' ? '#222' : '#FFF'};
  height: 100%;
`;

const Number = styled.p`
  font-size: 3em;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  align-self: center;
  background-color: ${(props) => props.theme === 'dark' ? '#333' : '#DDD'};
  padding: 2% 6%;
  border-radius: 15px;
  text-align: center;
  color: ${(props) => props.theme === 'dark' ? '#FFF' : '#000'};
`;

const App = (): JSX.Element => {
  const [events, setEvents] = React.useState<number>(0);
  const [theme, setTheme] = React.useState<string>('light');

  const incrementEvent = (e: KeyboardEvent): void => {
    if (e.code === 'Enter') {
      setEvents(events+1);
    } else if (e.code === 'Backspace') {
      if (events === 0) {
        return;
      }
      setEvents(events-1);
    }
  };

  const saveTheme = (theme: string): void => {
    localStorage.setItem('theme', theme);
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    saveTheme(newTheme);
    setTheme(newTheme);
  }

  React.useEffect(() => {
    document.addEventListener('keydown', incrementEvent);

    return () => document.removeEventListener('keydown', incrementEvent);
  });

  React.useEffect(() => {
    if (localStorage.getItem('theme') && localStorage.getItem('theme') !== null) {
      setTheme(localStorage.getItem('theme') || 'light');
    } else {
      saveTheme('light')
    }
  })

  return (
    <ParentDiv theme={theme}>
      <ContainerDiv theme={theme}>
        <ReactHelmet>
          <title>{`${events} negative events today - React Negativity Counter`}</title>
        </ReactHelmet>
        <h1>{'React Negativity Counter'}</h1>
        <p>{'Everytime something negative is said, press Enter.'}</p>
        <p>{'Eveytime something positive is said, press Backspace.'}</p>
        <Number>{`${events}`}</Number>
        <p>{`...negative events.`}</p>
        <button onClick={toggleTheme}>{'Change theme'}</button>
      </ContainerDiv>
    </ParentDiv>
  );
}

export default App;