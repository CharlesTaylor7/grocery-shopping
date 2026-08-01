export default function Version() {
  return (
    <ul>
      <li>Version: {__RELEASE_VERSION__}</li>
      <li>Git Commit: {__COMMIT_SHA__}</li>
    </ul>
  );
}
