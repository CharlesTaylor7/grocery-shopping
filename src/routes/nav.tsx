import { Link } from "react-router";

export default function Nav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">

        <li>
          <Link to="/dnd">Dnd Example</Link>
        </li>
        <li>
          <Link to="/store">Stores</Link>
        </li>
        <li>
          <Link to="/trip">Trips</Link>
        </li>

      </ul>
    </nav>
  );
}
