let status = git status --porcelain
if ($status | is-not-empty) {
    print $status
    exit
}
print "Building"

pnpm run build

print "Record Version"
git rev-parse HEAD
| $"https://github.com/charlestaylor7/grocery-shopping/commit/($in)"
| save -f docs/version

print "Committing"
jj ci -m "Build & version"
jj bookmark set -r @- main
print "Pushing"
jj git push
