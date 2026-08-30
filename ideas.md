Make my own solid-like mini framework.
Make my own tanstack router adapter.

Basically:
- I like solid a lot more than react.
- I think TSX is a really good abstraction actually. html first approaches really have rough typesafety.
- I think solid is less bloated than react but still bloated.
Every framework is burdened by its feature set.
And maybe I switch back when I need SSR.
But for now, I want:
- client rendering only
- simple signals
- simple effects
- simple memos
- callback refs only. (the let trick is confusing)
- no async handling
- no proxies, complicated store abstractions.

I want to emphasize indexedb for source of truth, and html nodes itself as the optimistic cache. 

Managing the layer in between is obnoxious.
I think solid messed up by combining createResource with createMemo. It causes problems. accesing a memo from a event handler is perfectly normal, but it leads to exceptions when using async memos.
