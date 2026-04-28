# Word Placement

This folder contains the algorithm for placing/fitting a word onto the periodic table grid. In general, the placement goes top to bottom, left to right, but this is subject to change.

The individual letters/characters are defined in `letter-definitions.ts`. When a word is placed, the letters are looked up in this file one-by-one.

The `index.test.ts` file contains test cases to ensure that the placement of certain words are as expected.

The placement algorithm is in `index.ts` and is subject to the following constraints:

- A letter must be fully inside the periodic table grid.
- Parts of a letter cannot overlap with parts of another letter.
- Every part of a letter must be fully contained within the elements of the periodic table, and cannot overflow outside the periodic table or into the spaces where no elements are.
- The largest x-coordinate of one letter must be 2 or more spaces away from the smallest x-coordinate of another letter (in other words, there must be a one-column gap between letters).
- All letters will be converted to uppercase in order to be placed.

The algorithm is outlined as follows:

1. Get the letter definition for the word and begin searching for a place to put it the periodic table from the top left.
2. For each letter in the word...
   - If the top left piece of the letter (as defined in letter definitions) can be placed, try placing the rest of the letter based around the top left piece.
   - If the full letter can be placed, place it and move two columns over and to see if the next letter can be placed.
   - If there is an error try the next row, or next column, until the letter cannot be placed. In this case, the return value is "false", since the word cannot be placed.
3. Actually place the word based on word definitions into the game board. The letters are placed in the same way that was found from the previous step, and at this point no errors should occur because the previous step weeds out words that do not fit.
4. The final result that the algorithm outputs is a 2D array (a table) of spaces, which are identified as either _Occupied_ (this periodic table element spells out a letter), _Unoccupied_ (this periodic table element does not spell out a letter), or _Invalid_ (indicates the "empty" items in the first three rows of elements).
