Try it out:

https://gmiv.github.io/Frogger/

---

## app.js

### Code Overview
1. **Entity Class**: A base class for all game objects. It includes common properties like `sprite`, `speed`, `position`, `size`, and `state`. It also has a `render` method to display the entity on the canvas.
2. **Win Class**: Inherits from `Entity`. Represents a win condition with a specific position and sprite.
3. **Gameover Class**: Similar to `Win`, but represents a game-over state.
4. **Enemy Class**: Inherits from `Entity`. Represents enemies in the game with unique positions, speed, and update logic.
5. **Player Class**: Inherits from `Entity`. Represents the player with methods for handling input, updating state, celebrating a win, handling game over, and resetting.
6. **Gem Class**: Inherits from `Entity`. Represents collectible gems with different positions and sprites.
7. **SoundController Class**: Manages sound effects in the game, with methods for updating and playing sounds.
8. **Utility Functions**: Includes `checkCollisions` for collision detection, `Rand` for generating random numbers, `loadData` for loading character data, and `timer` for managing game time.
9. **Key Listeners**: Listens for key events to handle player input and toggle sound.
10. **Main Function**: Initializes the game, creating player, enemies, gems, and managing game states.

### Gameplay Mechanics
- The player can move in four directions and interacts with enemies and gems.
- Collisions with enemies trigger a reset, decrease lives, or trigger a game over.
- Collecting gems increases the player's gem count.
- Reaching a certain position can trigger a win state.
- Sound can be toggled on and off.

### How to Use
1. **Initialization**: Call the `Main` function to start the game. This sets up the player, enemies, gems, and other necessary elements.
2. **Game Loop**: The game seems to lack a central game loop for continuous updates. Normally, you would expect a `requestAnimationFrame` or similar loop to continuously update the game state.
3. **Player Interaction**: Use the arrow keys to move the player and interact with the game environment.

### Potential Improvements
- **Game Loop**: Implement a proper game loop for continuous updates.
- **More Features**: Add more features like scoring, levels, or enhanced player abilities.
- **Code Refactoring**: Some methods are commented out or incomplete, indicating potential areas for refactoring or further development.
- **Sound Control**: The sound control functionality appears incomplete and could be further developed for better user experience. 
