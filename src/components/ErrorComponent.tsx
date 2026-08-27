import { ErrorComponentProps } from "@tanstack/react-router";

export default function ErrorComponent(props: ErrorComponentProps) {
  console.error(props.error.cause);
  console.error(props.error.stack);
  return (<code>
    {props.error.message}
  </code>)
}
