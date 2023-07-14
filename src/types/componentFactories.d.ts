

interface IDefaultOptionArgs<TRoot, Id extends string | number> {
  selector: Selector<TRoot, Id>
  nameSelector: Selector<TRoot, string>
  setter: Setter<TRoot, Id>
}

type DefaultOptionFactory = <TRoot, Id extends string | number>(args: IDefaultOptionArgs<TRoot, Id>)
  => () => JSX.Element


interface IDefaultSelectArgs<TRoot, Id extends string | number, TModel extends Model<Id>>{
  optionsSelector: Selector<TRoot, Map<Id, TModel>>,
  nameSelectorFactory: (id: Id) => Selector<TRoot, string>,
  optionFactory: DefaultOptionFactory
}

type SimpleInput = boolean | string | number;

interface IDefaultInputArgs<TRoot, TValue> {
  selector: Selector<TRoot, TValue>,
  setter: Setter<TRoot, TValue>
}

type DefaultInputFactory<TRoot, TValue> = (args: IDefaultInputArgs<TRoot, TValue>) => DefaultReactComponent;

type InputFactories<TRoot, Id extends number | string, TModel extends Model<Id>> = {
  [Key in keyof TModel]: Key extends 'id' ? never : DefaultInputFactory<TRoot, TModel[Key]>
}
