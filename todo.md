## Offline design
CRDTs?
I think I need event sourcing.
e.g. we push events to the server,
we receive events from postgres when someone else makes a change.

# Phase 1
Everything must work offline.
- [ ] Import existing lists from markdown
- [ ] One way event syncs from device to server
- [ ] create a store list
- [ ] update a store list 
- [ ] start a trip from a store
- [ ] update a trip list

# Phase 2
UX, easier nav
- [ ] 2 way event syncs from server to device
- [ ] select multiple stores for a trip
- [ ] Collapsible regions for multi store trips 
- [ ] Dnd list for trips and stores
