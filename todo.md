# TODO
- [x] migrate off fresh 
  - [x] replace deno package management files with pnpm
  - [x] replace signals and preact only stuff
  - [x] replace server routes with react-router
  - [x] use github pages for hosting

- [x] service worker cache for assets is broken
- [x] login links are broken
- [x] separate state per store page
- [x] save items to db
- [x] sort got items by when last got
- [ ] handle rebalancing dnd order keys 
- [ ] timestamps for when an "item was last bought"
- [ ] debounce checked off
- [ ] Login doesn't work from PWA

# UI
- [x] bigger checkbox click area
- [ ] '{n}d ago'
  
# MVP 
- [x] create a store list
- [x] update a store list 

# Later

- [ ] start a trip from a store
- [ ] update a trip list
- [ ] indexed db to use a queue to store pending sync events
- [ ] web worker to sync device -> server
- [ ] realtime from server to device
- [ ] Import existing lists from markdown
- [ ] select multiple stores for a trip
- [ ] Collapsible regions for multi store trips 
- [ ] fork neon client and trim it down. 400kb is insane
- [ ] sync worker is broken

## UX
- [ ] nav hamburger, smart actions in page header(s)
- [ ] breadcrumbs


## Defects
- a "loading" state is consider the same as not being logged in.
- when offline I cannot navigate to a store's list of items, if it is "pending".
  
