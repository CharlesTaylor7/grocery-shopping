let status = git status --porcelain
if ($status | is-not-empty) {
    print $status
    exit
}
let prev = try { open release.txt } catch { '' }
let today = date now | format date $"%Y-%m-%d"

let i = if ($prev | str starts-with $today) {
    $prev | split row "_" | get 1 | into int | $in + 1
} else {
    0
}

let release = $"($today)_($i)"
$release | save -f release.txt
print $"Building release: ($release)"

pnpm run build

jj ci -m $"Build: ($release)"
jj bookmark set -r @- main

## builds with deployment of docs folder
jj git push

sleep 1sec

## watch it
gh run watch

print "Live at https://charlestaylor7.github.io/grocery-shopping"
