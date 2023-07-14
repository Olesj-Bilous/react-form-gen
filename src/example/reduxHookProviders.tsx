import { useDispatch, useSelector } from "react-redux";

export const reduxHookProvider: StateProvider = () => ({
  selectorHook: useSelector
})

export const reduxSetHookProvider: SetStateProvider = () => {
  const dispatch = useDispatch();
  return {
    selectorHook: useSelector,
    setHook: <TRoot, TLeaf>(setter: Setter<TRoot, TLeaf>, value: TLeaf) => dispatch({
      type: 'example/setValue',
      payload: {
        setter,
        value
      }
    })
  }
}
