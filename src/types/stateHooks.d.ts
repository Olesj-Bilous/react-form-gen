

type Selector<TRoot, TLeaf> = (root: TRoot) => TLeaf

type Setter<TRoot, TLeaf> = (root: TRoot, value: TLeaf) => void


type SelectorHook = <TRoot, TLeaf>(selector: Selector<TRoot, TLeaf>) => TLeaf

type SetterHook = <TRoot, TLeaf>(setter: Setter<TRoot, TLeaf>, value: TLeaf) => void


interface IStateHooks {
  selectorHook: SelectorHook,
}

interface ISetStateHooks extends IStateHooks {
  setHook: SetterHook
}


type StateProvider = () => IStateHooks

type SetStateProvider = () => ISetStateHooks
