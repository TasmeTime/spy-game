import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { GetRandomWord, minToMs } from "../../utils";

export enum GameStatus {
  HOME,
  TIMER,
  TIMER_END,
  GAME_END,
  START,
  REVEAL,
}

export interface IGameSlice {
  status: GameStatus;
  revealUserIndex: number;
  playerCount: number;
  spyCount: number;
  time: number;
  word: string;
  players: { id: number; isSpy: boolean }[];
  winner?: "SPY" | "PLAYER";
}

const initialState = {
  status: GameStatus.HOME,
  revealUserIndex: 0,
  playerCount: 5,
  spyCount: 2,
  players: [],

  time: minToMs(1),
  word: "",
} as IGameSlice;

const genPlayers = (playerCount: number, spyCount: number) => {
  let players: { id: number; isSpy: boolean }[] = [];
  let selectedSpies = 0;

  for (let i = 0; i < playerCount; i++) {
    let isSpy = Math.random() * 100 >= 50;
    if (selectedSpies < spyCount) {
      if (i + (spyCount - selectedSpies) === playerCount) {
        players.push({ id: i, isSpy: true });
        selectedSpies++;
      } else {
        players.push({ id: i, isSpy });
        if (isSpy) selectedSpies++;
      }
    } else players.push({ id: i, isSpy: false });
  }

  return players;
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerCount: (state: IGameSlice, action: PayloadAction<number>) => {
      state.playerCount = action.payload;
    },
    setSpyCount: (state: IGameSlice, action: PayloadAction<number>) => {
      state.spyCount = action.payload;
    },
    setTime: (state: IGameSlice, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setStatus: (state: IGameSlice, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    setWord: (state: IGameSlice, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setRevealUserIndex: (state: IGameSlice, action: PayloadAction<number>) => {
      state.revealUserIndex = action.payload;
    },
    initGame: (state: IGameSlice) => {
      state.word = GetRandomWord();
      state.revealUserIndex = initialState.revealUserIndex;
      state.players = genPlayers(state.playerCount, state.spyCount);
      state.status = GameStatus.START;
    },
    startGame: (state: IGameSlice) => {
      state.word = GetRandomWord();
      state.revealUserIndex = initialState.revealUserIndex;
      state.players = genPlayers(state.playerCount, state.spyCount);
      state.status = GameStatus.REVEAL;
    },
    resetGame: (state: IGameSlice) => {
      state.revealUserIndex = initialState.revealUserIndex;
      state.playerCount = initialState.playerCount;
      state.spyCount = initialState.spyCount;
      state.status = initialState.status;
      state.time = initialState.time;
      state.players = initialState.players;
      state.word = initialState.word;
    },
    repeatGame: (state: IGameSlice) => {
      state.revealUserIndex = initialState.revealUserIndex;
      state.word = GetRandomWord();
      state.players = genPlayers(state.playerCount, state.spyCount);
      state.status = GameStatus.REVEAL;
    },
    timerEnded: (state: IGameSlice) => {
      // state.word = GetRandomWord();
      state.winner = "SPY";
      state.revealUserIndex = initialState.revealUserIndex;
      state.players = initialState.players;
      state.status = GameStatus.TIMER_END;
    },
    spiesRevealed: (state: IGameSlice) => {
      // state.word = GetRandomWord();
      state.winner = "PLAYER";
      state.revealUserIndex = initialState.revealUserIndex;
      state.players = initialState.players;
      state.status = GameStatus.GAME_END;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPlayerCount,
  setSpyCount,
  setTime,
  setStatus,
  setWord,
  setRevealUserIndex,
  resetGame,
  startGame,
  initGame,
  repeatGame,
  timerEnded,
  spiesRevealed,
} = gameSlice.actions;

export default gameSlice.reducer;
