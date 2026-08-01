import { useEffect, useRef } from "react";

interface Props extends InputProps {
  focus: boolean;
}

export default function Input({ focus, ...props }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (focus && ref.current) ref.current.focus();
  }, [focus]);
  return <input ref={ref} {...props} />;
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
