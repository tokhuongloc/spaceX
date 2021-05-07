import spaceX from '../../../apis/spacex';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTime } from './spaceXHelper';
import { RootState } from '../../store';

export interface SpaceCard {
  flight_number: number;
  mission_name: string;
  links: { mission_patch_small: string };
  details: string;
  rocket: { rocket_name: string };
  launch_success: boolean;
}

export interface SpaceFilter {
  rocketName?: string;
  time?: string | undefined;
  launchStatus?: string | undefined;
}

export interface SpaceXParams {
  rocket_name?: string;
  start?: string;
  end?: string;
  launch_success?: boolean | '';
}

interface SpaceX {
  lists: SpaceCard[];
  params: SpaceXParams;
  status: 'fail' | 'pending' | 'success' | null;
  error: string | null;
}

const initialState: SpaceX = {
  lists: [],
  params: {
    rocket_name: '',
    start: '',
    end: '',
    launch_success: '',
  },
  status: null,
  error: null,
};

export const fetchSpaceXList = createAsyncThunk<
  SpaceCard[],
  void,
  {
    state: RootState;
  }
>('spaceX/fetchSpaceXList', async (_, thunkApi) => {
  const params = thunkApi.getState().spaceX.params;
  const respone = await spaceX.get('', { params });
  return respone.data as SpaceCard[];
});

export const counterSlice = createSlice({
  name: 'spaceX',
  initialState,
  reducers: {
    updateSearchParam(state, action) {
      state.params.rocket_name = action.payload;
    },
    updateTimeParam(state, action) {
      const time = action.payload;
      if (time === 'lastWeek') {
        state.params.start = getTime.getLastWeek().start;
        state.params.end = getTime.getLastWeek().end;
      } else if (time === 'lastMonth') {
        state.params.start = getTime.getLastMonth().start;
        state.params.end = getTime.getLastMonth().end;
      } else if (time === 'all') {
        state.params.start = '';
        state.params.end = '';
        return;
      } else {
        state.params.start = getTime.getLastYear().start;
        state.params.end = getTime.getLastYear().end;
      }
    },
    updateLaunchStatusParam(state, action) {
      if (action.payload === 'fail') {
        state.params.launch_success = false;
      }
      if (action.payload === 'success') {
        state.params.launch_success = true;
      }
      if (action.payload === 'all') {
        state.params.launch_success = '';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpaceXList.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.lists = payload;
    });
    builder.addCase(fetchSpaceXList.pending, (state) => {
      state.status = 'pending';
    });
  },
});

export const {
  updateSearchParam,
  updateTimeParam,
  updateLaunchStatusParam,
} = counterSlice.actions;

export default counterSlice.reducer;
