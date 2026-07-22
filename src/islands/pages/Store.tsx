export default function StoreList() {
  // do something unconventional, just edit the dom from effect handlers instead of doing things the react way.
  // I think it will be easier to debug actually
  // this is a compromise between this and just using htmx / alpine
  return (
    <>
      <button type="button" class="btn btn-primary">+ New Store</button>
    </>
  );
}
