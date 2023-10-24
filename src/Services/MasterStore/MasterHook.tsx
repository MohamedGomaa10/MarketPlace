// React Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Repository
import type { RootState, AppDispatch } from './MasterStore';

// Export useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;