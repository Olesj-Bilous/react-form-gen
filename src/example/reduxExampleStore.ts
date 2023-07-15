import { PayloadAction, configureStore, createSlice, combineReducers, createEntityAdapter, EntityState, EntityAdapter, SliceCaseReducers, Update } from "@reduxjs/toolkit";

type ModelPropertyDisplayNames<Id extends number | string, TModel extends Model<Id>> = {
  [Key in keyof TModel]: string
}

interface ModelMap<Id extends number | string, TModel extends Model<Id>> extends EntityState<TModel> {
  displayName: string
  displayNamePlural?: string
  propertyDisplayNames: Partial<ModelPropertyDisplayNames<Id, TModel>>
}

type SettableProperties<Id extends number | string, TModel extends Model<Id>> = {
 [Key in keyof TModel]: Key extends 'id' ? never : TModel[Key]
}

interface InstancePropertySetter<Id extends number | string, TModel extends Model<Id>, Key extends keyof SettableProperties<Id, TModel>> {
  instanceId: Id
  propertyKey: Key
  value: TModel[Key]
}

interface ModelSliceArgs<Id extends number | string, TModel extends Model < Id >> {
  name: string,
  displayName?: string
  displayNamePlural?: string
  propertyDisplayNames?: Partial<ModelPropertyDisplayNames<Id, TModel>>
  modelReducer: SliceCaseReducers<TModel>
}

function modelSliceEnhancer<Id extends number | string, TModel extends Model<Id>, ReadonlyMask extends Partial<SettableProperties<Id, TModel>>>({
  name,
  displayName = name,
  displayNamePlural = name + 's',
  propertyDisplayNames = {},
  modelReducer
}: ModelSliceArgs<Id, TModel>) {
  const modelAdapter = createEntityAdapter<TModel>();

  const initialState : ModelMap<Id, TModel> = {
    displayName,
    displayNamePlural,
    propertyDisplayNames,
    ...modelAdapter.getInitialState()
  }

  return createSlice({
    name,
    initialState,
    reducers: {
      oneAdded(state, action: PayloadAction<TModel>) {
        modelAdapter.addOne(state as EntityState<TModel>, // https://github.com/reduxjs/redux-toolkit/issues/3596
          action.payload)
      },
      instancePropertySet(state, action: PayloadAction<InstancePropertySetter<Id, TModel, keyof Omit<SettableProperties<Id, TModel>, keyof ReadonlyMask>>>) {
        let changes: Partial<TModel> = {};
        changes[action.payload.propertyKey] = action.payload.value;
        modelAdapter.updateOne(state as EntityState<TModel>, {
          id: action.payload.instanceId,
          changes
        })
      },
      ...modelReducer
    }
  })
}
