import { Link } from "react-router";

export default function Nav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="underline" to="/store">Stores</Link>
        </li>
        <li>
          <Link className="underline" to="/trip">Trips</Link>
        </li>
      </ul>
    </nav>
  );
}
