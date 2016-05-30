# FBP Solution to the Telegram Problem

This is a [flow-based programming](https://www.wikiwand.com/en/Flow-based_programming#) solution to the classic Telegram Problem.

## The Telegram Problem

This was originally described by [Peter Naur](https://www.wikiwand.com/en/Peter_Naur)

> Write a program that takes a number w, then accepts lines of text and outputs lines of text, where the output lines have as many words as possible but are never longer than w characters. Words may not be split, but you may assume that no single word is too long for a line.

Written in convential languages, it can get possible to get snarled up trying to drive
the program via the input or output logic. FBP offers a very straightforward solution.

## FBP Solution

Using `jsfbp`, we already have the `reader` and `writer` components that we need for file I/O.

We need to create a `decomposer` component that will take lines of text and break it up into words.
We also need a `recomposer` component that will take words and create lines of text up to (but not exceeding)
 a defined line length.
 
We end up with the following network

```
'input.txt' -> FILE READER(reader)
'output.txt' -> FILE WRITER(writer)
'80' -> SIZE RECOMPOSER(recomposer)
READER OUT -> IN DECOMPOSER(decomposer) OUT -> IN RECOMPOSER OUT -> IN WRITER
```

## Installation and usage
Just clone the repo and then:

```
npm install
node app.js
```

If you change the contents of `input.txt` you can run this on another set of text.

## JSFBP limitations
Currently, JSFBP does not support .fbp file parsing, so the network is created
programmatically. Once [jsfbp issue #48](https://github.com/jpaulm/jsfbp/issues/48) has been resolved
this will use an `.fbp` file.
