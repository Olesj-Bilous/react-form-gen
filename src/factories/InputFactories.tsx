

function defaultInputFactory<TValue extends SimpleInput>({ type, valueAttributeName, valueSelector }: {
  type: string
  valueAttributeName: 'value' | 'checked',
  valueSelector: (event: React.ChangeEvent<HTMLInputElement>) => TValue
}) {
  return function (setStateProvider: SetStateProvider) {
    return function <TRoot>({ selector, setter }: IDefaultInputArgs<TRoot, TValue>): DefaultReactComponent {
      let valueAttribute: { [key: string]: TValue } = {};

      return function Input() {
        const { selectorHook, setHook } = setStateProvider();
        valueAttribute[valueAttributeName] = selectorHook(selector);
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setHook(setter, valueSelector(event))

        return (
          <input type={type} {...valueAttribute} onChange={onChange} />
        )
      }
    }
  }
}

export const stringInputFactory = defaultInputFactory({
  type: 'text',
  valueAttributeName: 'value',
  valueSelector: event => event.target.value // see below*
})

export const booleanInputFactory = defaultInputFactory({
  type: 'checkbox',
  valueAttributeName: 'checked',
  valueSelector: event => event.target.checked // *this may appear verbose but is necessary for correct typing, unfortunately no mechanism exists for binding strings to types, e.g. 'checked' key to boolean type in ts
})
