import { type AppState } from './rootReduser'
import type { SeachState } from '../appTypes/stateTypes'

export const selectSearchData = (state: AppState): SeachState => state.search
