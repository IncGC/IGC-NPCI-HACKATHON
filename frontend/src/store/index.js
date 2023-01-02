import create from 'zustand';
import { devtools } from 'zustand/middleware';
import authSlice from './authSlice';

const useStore = create(devtools((set, get) => ({
  ...authSlice(set, get),
})))

export default useStore