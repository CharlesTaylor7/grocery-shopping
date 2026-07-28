let status = git status --porcelain
if ($status | is-not-empty) {
    print $status
    exit
}

pnpm run build
git rev-parse HEAD
| $"https://github.com/charlestaylor7/grocery-shopping/commit/($in)"
| save -f docs/version

jj ci -m "Build & version"
jj bookmark set -r @- main

## builds with deployment of docs folder
jj git push

## watch it
gh run watch
