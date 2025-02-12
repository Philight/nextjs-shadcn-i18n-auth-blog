// import { atom, selector,useRecoilValue, useSetRecoilState } from 'recoil'; // React 18+ -> error

// const useStore = create<IStoreState>((set) => ({
//   ...initialState,
//   ...setters(set),
//   // setUser: (user: UserType | null) => set({ user }),
// }));
// const setUser = (set, user: UserType | null) => null;

// // State
// const globalState = atom({
//   key: 'globalState',
//   default: initialState,
// });

// // Selector
// const userState = selector({
//   key: 'user',
//   get: ({ get }) => {
//     const state: any = get(globalState);
//     return state.user;
//   },
// });

// // Selector
// const tokensState = selector({
//   key: 'token',
//   get: ({ get }) => {
//     const state: any = get(globalState);
//     return state.token;
//   },
// });

// const filtersState = selector({
//   key: 'filters',
//   get: ({ get }) => {
//     const state: any = get(globalState);
//     return state.filters;
//   },
// });

// export function useStore() {
// 	const user: UserType = useRecoilValue(userState);
// 	const tokens: Tokens = useRecoilValue(tokensState);
// 	const filters: any = useRecoilValue(filtersState);

// 	const setUser: (u: UserType) => void = useSetRecoilState(userState);
// 	const setTokens = useSetRecoilState(tokensState);
// 	const setFilters = useSetRecoilState(filtersState);

// 	return {
// 		user,
// 		setUser,
// 		tokens,
// 		setTokens,
// 		filters,
// 		setFilters,
// 	};
// }

// export { globalState, userState, tokensState, filtersState };
