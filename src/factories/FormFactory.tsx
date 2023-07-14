

export default class FormFactory<TRoot, Id extends number | string, TModel extends Model<Id>> {
  constructor(factories: InputFactories<TRoot, Id, TModel>) {
    this.factories = factories
  } 
  protected factories: InputFactories<TRoot, Id, TModel>

  createForm(selector: Selector<TRoot, TModel>) {
    const properties: JSX.Element[] = [];
    for (const key in this.factories) {
      const Property = this.factories[key]({
        selector: (root: TRoot) => selector(root)[key],
        setter: (root, value) => selector(root)[key] = value as TModel[Extract<keyof TModel, string>] // :'( "as" casting required once we exclude 'id' from keyof TModel in definition of InputFactories
      });
      properties.push(<Property key={key} />)
    }

    return function Form() {
      return <>{properties}</>
    }
  }
}
