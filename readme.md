# Gorokan

Part of one game a month, January.

```
pnpm run dev
```

## Gameplay

Use the arrow keys to move your character around the world.

This is a sokoban clone, but rather than crates and positions we use food and creatures called Goros. Feed each Goro to win the level.

## Technical features

- [React](https://reactjs.org/) owns the UI
- [Valtio](https://github.com/pmndrs/valtio) handles global state
- The bulk of rendering is handled in a canvas element, using [Pixi](https://pixijs.com/) to do the heavy lifting
- Entity-Component-System is implemented using [BitECS](https://github.com/NateTheGreatt/bitECS).
- Keyboard interactions are handled via [raid/streams](https://github.com/mattstyles/raid/tree/main/packages/streams).
- There is rudimentary event queue to handle mutations in the world.

## Thanks

Tile graphics are from [bountiful-bits](https://v3x3d.itch.io/bountiful-bits) and [bit-bonanza](https://v3x3d.itch.io/bit-bonanza). Thanks [\_V3X3D](https://twitter.com/_V3X3D).

## Notes

- The event queue is pretty rudimentary. As this is part of a one game a month challenge we won’t fix it here (as it works for this small scope) but it certainly needs work to generalise so it is scalable for applications with a larger scope.
- Need to investigate entry and exit queries within BitECS as there was a slight issue where new entities with the Renderable component were not registering in the entry query when other entities were also removed, meaning we could not assign them a Pixi sprite. -> pretty sure this was a problem in the rendering system, where we were using entity ids rather than their associated sprite ids. Not sure, would have to check.
- Had a problem with BitECS removing entities. When we exit a level and start another its like some references get confused, so we can’t accurately remove entities in the next level. Manually removing them in the cleanup function works, but it isn’t a good fix. -> That fix didnt work, the actual problem was with using entity ids rather than their associated sprite ids to manage sprites from the sprite pool. Fixed by correctly using sprite ids in enter and exit queries to manage the pool properly.
