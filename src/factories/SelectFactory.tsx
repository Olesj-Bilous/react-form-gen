

export default function selectFactory(stateProvider: StateProvider) {
  return function <TRoot, Id extends string | number, TModel extends Model<Id>>(
    {
      optionsSelector,
      nameSelectorFactory,
      optionFactory
    }: IDefaultSelectArgs<TRoot, Id, TModel>
  ) {
    return function (
      {
        selector,
        setter
      }: IDefaultInputArgs<TRoot, Id>
    ) {
      return function SelectComponent() {
        const { selectorHook } = stateProvider();
        const selected = selectorHook(selector);
        const options = selectorHook(optionsSelector);

        const content: JSX.Element[] = []
        for (const [key] of options.entries()) {
          const nameSelector = nameSelectorFactory(key);
          const Option = optionFactory({
            selector: root => key,
            nameSelector,
            setter
          })
          content.push(<Option key={key} />)
        }

        return (
          <select value={selected}>
            {content}
          </select>
        )
      }
    }
  }
}
