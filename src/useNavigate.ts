import { useLocation } from "wouter"

export default function useNavigate() {
  const [_, navigate] = useLocation();
  return navigate;
}
