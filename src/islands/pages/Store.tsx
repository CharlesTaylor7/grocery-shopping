interface Props {
  id: string;
}

export default function Store(props: Props) {
  // do something unconventional, just edit the dom from effect handlers instead of doing things the react way.
  // I think it will be easier to debug actually
  // this is a compromise between this and just using htmx / alpine
  return (
    <>
      <div>Store: {props.id}</div>

      <button type="button" class="btn btn-primary">+ New Item</button>
    </>
  );
}
