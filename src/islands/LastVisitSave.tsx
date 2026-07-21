import { useEffect } from "preact/hooks";

interface Props {
  url: string;
}
export default function LastVisitSave(props: Props) {
  useEffect(() => {
    if (props.url.endsWith("/") || props.url.endsWith("/login")) return;

    localStorage.setItem("last_visited_url", props.url);
  }, []);
  return null;
}
