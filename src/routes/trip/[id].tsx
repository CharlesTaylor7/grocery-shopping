import { useParams } from "react-router";

export default function Trip() {
  const params = useParams();
  return <div>Trip: {params.id}</div>;
}
