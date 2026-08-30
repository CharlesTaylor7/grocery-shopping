import { ErrorComponentProps } from "@tanstack/solid-router";

export default function ErrorComponent(props: ErrorComponentProps) {
  console.error(props.error.cause);
  console.error(props.error.stack);
  props.reset();
  return (<code>
    {props.error.message}
  </code>)
}
