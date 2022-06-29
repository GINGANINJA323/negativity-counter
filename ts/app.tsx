import * as React from 'react';
import ReactHelmet from 'react-helmet';
import styled from 'styled-components';

interface TabButtonProps {
  selected: boolean;
}

const Button = styled.button`
  background-color: ${(props) => props.theme === 'dark' ? '#444' : '#EEE'};
  color: ${(props) => props.theme === 'dark' ? '#FFF' : '#000'};
  border: none;
  border-radius: 15px;
  padding: 2%;
  font-family: 'Abel', sans-serif;
  cursor: pointer;
  width: 40%;
  :hover {
    background-color: ${(props) => props.theme === 'dark' ? '#222' : '#FFF'};
  }
`;

const Heading = styled.h1`
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ParentDiv = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Abel', sans-serif;
  background-color: ${(props) => props.theme === 'dark' ? '#222' : '#FFF'};
  height: 100%;
`;

const Number = styled.p`
  font-size: 32px;
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

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TabButton = styled(Button)<TabButtonProps>`
  margin-top: 10px;
  background-color: ${(props) => props.selected ? '#222' : ''};
  :first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  :last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const App = (): JSX.Element => {
  const initialEvents = localStorage.getItem('events') || '0';
  const initialPosEvents = localStorage.getItem('posEvents') || '0';
  const initialTheme = localStorage.getItem('theme') || 'light'
  const [events, setEvents] = React.useState<number>(parseInt(initialEvents));
  const [posEvents, setPosEvents] = React.useState(parseInt(initialPosEvents));
  const [theme, setTheme] = React.useState<string>(initialTheme);
  const [tab, setTab] = React.useState<string>('counts');

  const incrementEvent = (e: KeyboardEvent): void => {
    if (e.code === 'Enter') {
      setPosEvents(posEvents+1);
      localStorage.setItem('posEvents', `${posEvents+1}`);
    } else if (e.code === 'Backspace') {
      setEvents(events+1);
      localStorage.setItem('events', `${events+1}`);
    }
  };

  const saveTheme = (theme: string): void => {
    localStorage.setItem('theme', theme);
  }

  const clearEvents = () => {
    setPosEvents(0);
    setEvents(0);
    localStorage.setItem('posEvents', '0');
    localStorage.setItem('events', '0');
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

  return (
    <ParentDiv theme={theme}>
      <ContainerDiv theme={theme}>
        <ReactHelmet>
          <title>{`${events} negative events today - React Negativity Counter`}</title>
        </ReactHelmet>
        <Heading>{'React Negativity Counter'}</Heading>
        <TabContainer>
          <TabButton selected={tab === 'counts'} theme={theme} onClick={() => setTab('counts')}>{'Counter'}</TabButton>
          <TabButton selected={tab === 'ratio'} theme={theme} onClick={() => setTab('ratio')}>{'Ratio'}</TabButton>
        </TabContainer>
        {
          tab === 'ratio' ?
          <>
            <h2>{'Current P/N ratio:'}</h2>
            <Number>{`${posEvents / events}`}</Number>
          </> : 
          <>
            <p>{'Everytime something negative is said, press Enter.'}</p>
            <p>{'Eveytime something positive is said, press Backspace.'}</p>
            <RowDiv>
              <NumberContainer>
                <Number>{`${events}`}</Number>
                <p>{`...negative events.`}</p>
              </NumberContainer>
              <NumberContainer>
                <Number>{`${posEvents}`}</Number>
                <p>{`...positive events.`}</p>
              </NumberContainer>
            </RowDiv>
            <ButtonContainer>
              <Button theme={theme} onClick={clearEvents}>{'Reset'}</Button>
              <Button theme={theme} onClick={toggleTheme}>{'Change theme'}</Button>
            </ButtonContainer>
          </>
        }
      </ContainerDiv>
    </ParentDiv>
  );
}

export default App;