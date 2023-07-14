import { PayloadAction, configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { SliceCaseReducers } from "@reduxjs/toolkit/dist/createSlice";

type ModelProperties<Id extends number | string, TModel extends Model<Id>> = {
 [Key in keyof TModel]: Key extends 'id' ? never : TModel[Key]
}

type ModelPropertyDisplayNames<Id extends number | string, TModel extends Model<Id>> = {
  [Key in keyof TModel]: string
}

interface ModelMap<Id extends number | string, TModel extends Model<Id>> {
  displayName: string
  displayNamePlural?: string
  propertyDisplayNames: Partial<ModelPropertyDisplayNames<Id, TModel>>
  map: Map<Id, TModel>
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
  const initialState: ModelMap<Id, TModel> = {
    displayName,
    displayNamePlural,
    propertyDisplayNames,
    map: new Map()
  }

  return createSlice({
    name,
    initialState,
    reducers: {
      model(state, payload) {

      }
    }
  })
}
