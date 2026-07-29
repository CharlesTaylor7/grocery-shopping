import { useParams } from "wouter";

export default function Trip() {
  const params = useParams();
  return <div>Trip: {params.id}</div>;
}
