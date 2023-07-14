import { reduxHookProvider, reduxSetHookProvider } from "./reduxHookProviders";
import { stringInputFactory, booleanInputFactory } from "../factories/InputFactories";
import selectFactory from "../factories/SelectFactory";
import optionFactory from "../factories/OptionFactory";

const inputFactories = {
  boolean: booleanInputFactory(reduxSetHookProvider),
  string: stringInputFactory(reduxSetHookProvider),
  select: selectFactory(reduxHookProvider),
  option: optionFactory(reduxSetHookProvider)
}

export default inputFactories;
