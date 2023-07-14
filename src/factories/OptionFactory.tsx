

export default function optionFactory(setStateProvider: SetStateProvider): DefaultOptionFactory {
  return function <TRoot, Id extends string | number>(args: IDefaultOptionArgs<TRoot, Id>) {
    return function OptionComponent() {
      const { selectorHook, setHook } = setStateProvider();
      const model = selectorHook(args.selector);
      const displayName = selectorHook(args.nameSelector);
      return (
        <option value={model} onChange={event => setHook(args.setter, model)}>
          {displayName}
        </option>
      )
    }
  }
}
