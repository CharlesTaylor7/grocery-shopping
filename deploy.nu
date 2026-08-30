let status = jj log -r '@' -T 'empty' --no-graph
if ($status | str contains 'false') {
  jj status
  exit
}
let build_time = date now | format date "%Y-%m-%d at %l:%M%P"
let commit = jj log -r @- -T 'commit_id.short()' --no-graph 

with-env { 
  VITE_BUILD_TIME: $build_time
  VITE_COMMIT_SHA: $commit 
} { 
  pnpm run build
}

jj ci -m $"Build: ($build_time)"
jj bookmark move --allow-backwards -t @- v2 

## builds with deployment of docs folder
jj git push --remote v2 --bookmark v2

sleep 1sec

## watch it
gh run watch

print "Live at https://charlestaylor7.github.io/grocery-v2"
