
import { Main } from './HomeScreen';
import FilterPage from './FilterPage';

export type RootStackParamList = {
  Home: undefined;
  Details: { main: Main; setMainData: React.Dispatch<React.SetStateAction<Main[]>> }; 
  FilterPage: { mainData: Main []; setMainData: React.Dispatch<React.SetStateAction<Main[]>> };
};