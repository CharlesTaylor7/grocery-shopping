let status = git status --porcelain
if ($status | is-not-empty) {
    print $status
    exit
}
let build_time = date now | format date "%Y-%m-%d at %l:%M%P"
let commit = "git rev-parse --short HEAD"

with-env { 
  VITE_BUILD_TIME: $build_time
  VITE_COMMIT_SHA: $commit 
} { 
  pnpm run build
}

jj ci -m $"Build: ($build_time)"
jj bookmark set -r @- main

## builds with deployment of docs folder
jj git push

sleep 1sec

## watch it
gh run watch

print "Live at https://charlestaylor7.github.io/grocery-shopping"
