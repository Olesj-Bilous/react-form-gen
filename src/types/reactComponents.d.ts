
type DefaultReactProps = React.Attributes

type ReactComponent<TProps extends DefaultReactProps> = (props: TProps) => JSX.Element

type DefaultReactComponent = ReactComponent<DefaultReactProps>
