import { PayloadAction, configureStore, createSlice, combineReducers, createEntityAdapter, EntityState, EntityAdapter, SliceCaseReducers, Update } from "@reduxjs/toolkit";

type ModelPropertyDisplayNames<Id extends number | string, TModel extends Model<Id>> = {
  [Key in keyof TModel]: string
}

interface ModelMap<Id extends number | string, TModel extends Model<Id>> extends EntityState<TModel> {
  displayName: string
  displayNamePlural?: string
  propertyDisplayNames: Partial<ModelPropertyDisplayNames<Id, TModel>>
}

type ModelProperties<Id extends number | string, TModel extends Model<Id>> = {
 [Key in keyof TModel]: Key extends 'id' ? never : TModel[Key]
}

interface ModelPropertySetter<Id extends number | string, TModel extends Model<Id>, Key extends keyof ModelProperties<Id, TModel>> {
  modelId: Id
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

function modelSliceEnhancer<Id extends number | string, TModel extends Model<Id>>({
  name,
  displayName = name,
  displayNamePlural = name + 's',
  propertyDisplayNames = {},
  modelReducer
}: ModelSliceArgs<Id, TModel>) {
  const modelAdapter = createEntityAdapter<TModel>({});

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
      setModelProperty(state, action: PayloadAction<ModelPropertySetter<Id, TModel, keyof ModelProperties<Id, TModel>>>) {
        modelAdapter.updateOne(state as EntityState<TModel>, {
          id: action.payload.modelId,
          changes: { [action.payload.propertyKey]: action.payload.value } as Partial<TModel>
        })
      }
    }
  })
}
