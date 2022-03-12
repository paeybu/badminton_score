import {
  Container,
  Box,
  Grid,
  SimpleGrid,
  Input,
  Center,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Button,
  VStack,
  Heading,
} from '@chakra-ui/react';
import React, { useReducer } from 'react';

type State = {
  player1Name: string;
  player2Name: string;
  player3Name: string;
  player4Name: string;
  initialServingSide: string;
  isPlaying: boolean;
  topScore: number;
  bottomScore: number;
  servingSide: string;
};

const initialValues = {
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  player3Name: 'Player 3',
  player4Name: 'Player 4',
  initialServingSide: 'top',
  isPlaying: false,
  topScore: 0,
  bottomScore: 0,
  servingSide: 'top',
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'UPDATE_PLAYER1_NAME':
      return {
        ...state,
        player1Name: action.value,
      };
    case 'UPDATE_PLAYER2_NAME':
      return {
        ...state,
        player2Name: action.value,
      };
    case 'UPDATE_PLAYER3_NAME':
      return {
        ...state,
        player3Name: action.value,
      };
    case 'UPDATE_PLAYER4_NAME':
      return {
        ...state,
        player4Name: action.value,
      };
    case 'UPDATE_INITIAL_SERVING_SIDE':
      return {
        ...state,
        initialServingSide: action.value,
        servingSide: action.value,
      };
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
      };
    case 'TOP_INCREMENT': {
      return {
        ...state,
        topScore: state.topScore + 1,
        servingSide: 'top',
        player1Name:
          state.servingSide === 'top' ? state.player2Name : state.player1Name,
        player2Name:
          state.servingSide === 'top' ? state.player1Name : state.player2Name,
      };
    }
    case 'BOTTOM_INCREMENT': {
      return {
        ...state,
        bottomScore: state.bottomScore + 1,
        servingSide: 'bottom',
        // Swap side
        player3Name:
          state.servingSide === 'bottom'
            ? state.player4Name
            : state.player3Name,
        player4Name:
          state.servingSide === 'bottom'
            ? state.player3Name
            : state.player4Name,
      };
    }
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  // Actions
  const handlePlayer1Name = (value: string) => {
    dispatch({ type: 'UPDATE_PLAYER1_NAME', value });
  };

  const handlePlayer2Name = (value: string) => {
    dispatch({ type: 'UPDATE_PLAYER2_NAME', value });
  };

  const handlePlayer3Name = (value: string) => {
    dispatch({ type: 'UPDATE_PLAYER3_NAME', value });
  };

  const handlePlayer4Name = (value: string) => {
    dispatch({ type: 'UPDATE_PLAYER4_NAME', value });
  };

  const handleinitialServingSide = (value: string) => {
    dispatch({ type: 'UPDATE_INITIAL_SERVING_SIDE', value });
  };

  const handlePlay = () => {
    dispatch({ type: 'PLAY' });
  };

  const handleTopIncrement = () => {
    dispatch({ type: 'TOP_INCREMENT' });
  };

  const handleBottomIncrement = () => {
    dispatch({ type: 'BOTTOM_INCREMENT' });
  };

  const isTopLeftServe =
    state.servingSide === 'top' && state.topScore % 2 === 0;

  const isTopRightServe =
    state.servingSide === 'top' && state.topScore % 2 !== 0;

  const isBottomLeftServe =
    state.servingSide === 'bottom' && state.bottomScore % 2 !== 0;

  const isBottomRightServe =
    state.servingSide === 'bottom' && state.bottomScore % 2 === 0;

  const renderServer = () => {
    if (isTopLeftServe) return state.player1Name;
    if (isTopRightServe) return state.player2Name;

    if (isBottomLeftServe) return state.player3Name;
    if (isBottomRightServe) return state.player4Name;
  };

  return (
    <Container bg='black' minH='100vh' color='whiteAlpha.700'>
      {state.isPlaying && (
        <>
          <Center>
            <VStack>
              <Heading>{`${renderServer()} เซิฟ`}</Heading>
              <Heading>{`Score: ${state.topScore} - ${state.bottomScore}`}</Heading>
            </VStack>
          </Center>
          <Button w='100%' colorScheme='green' onClick={handleTopIncrement}>
            +1
          </Button>
        </>
      )}
      <SimpleGrid columns={2}>
        {/* TOP */}
        <Center height={150} border='solid 1px white'>
          <Input
            bg={isTopLeftServe ? 'yellow' : 'transparent'}
            color={isTopLeftServe ? 'black' : 'whiteAlpha.700'}
            disabled={state.isPlaying}
            value={state.player1Name}
            onChange={(e) => handlePlayer1Name(e.target.value)}
          />
        </Center>
        <Center height={150} border='solid 1px white'>
          <Input
            bg={isTopRightServe ? 'yellow' : 'transparent'}
            color={isTopRightServe ? 'black' : 'whiteAlpha.700'}
            disabled={state.isPlaying}
            value={state.player2Name}
            onChange={(e) => handlePlayer2Name(e.target.value)}
          />
        </Center>
        {/* BOTTOM */}
        <Center height={150} border='solid 1px white'>
          <Input
            disabled={state.isPlaying}
            value={state.player3Name}
            bg={isBottomLeftServe ? 'yellow' : 'transparent'}
            color={isBottomLeftServe ? 'black' : 'whiteAlpha.700'}
            onChange={(e) => handlePlayer3Name(e.target.value)}
          />
        </Center>
        <Center height={150} border='solid 1px white'>
          <Input
            disabled={state.isPlaying}
            value={state.player4Name}
            bg={isBottomRightServe ? 'yellow' : 'transparent'}
            color={isBottomRightServe ? 'black' : 'whiteAlpha.700'}
            onChange={(e) => handlePlayer4Name(e.target.value)}
          />
        </Center>
      </SimpleGrid>
      {state.isPlaying && (
        <Button w='100%' colorScheme='orange' onClick={handleBottomIncrement}>
          +1
        </Button>
      )}

      {!state.isPlaying && (
        <>
          <VStack align='start' mt='4'>
            <Text color='yellow.400'>Serving side</Text>
            <RadioGroup
              value={state.initialServingSide}
              onChange={handleinitialServingSide}
            >
              <HStack>
                <Radio value='top'>Top</Radio>
                <Radio value='bottom'>Bottom</Radio>
              </HStack>
            </RadioGroup>
            <Button
              colorScheme={'green'}
              onClick={(e) => {
                e.preventDefault();
                handlePlay();
              }}
            >
              Start Match !!
            </Button>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default Home;
