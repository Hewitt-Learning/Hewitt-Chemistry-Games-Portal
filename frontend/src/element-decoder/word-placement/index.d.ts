/** enum to make it more clear in our code what the status of the game board is */
export declare enum SpaceDef {
  /** Part of a letter occupies this space, and an element is here */
  Occupied = "oc",
  /** An element is here, but no letter occupies this space */
  NotOccupied = "el",
  /** No element or letter occupies this space */
  Invalid = "  ",
}
/**
 * placeWord is the function that takes a word and places it onto a 2d array representing the periodic table, if the word fits
 * @param word A word in the form of a string, generally around 4-5 characters long (to fit on the table)
 * @returns outputs - returns a grid of the word placed on the periodic table, or returns false if the word cannot be placed
 */
export declare const placeWord: (word: string) => SpaceDef[][] | false;
