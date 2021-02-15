const BinarySearchTree = require('./BinarySearchTree');
const Queue = require('./queue');

// 1. How many searches?
//
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// and using the recursive binary search algorithm,
// identify the sequence of numbers that each recursive call will
// search to try and find 8.
//
//  It would first find 11 as the halfway point which doesn't match 8 but is greater.
//  It would then find 6 as the halfway point which doesn't match 8 but is less.
//  It would finally find 8 as the halfway point and return found item.
//
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// and using the recursive binary search algorithm,
// identify the sequence of numbers that each recursive call will
// search to try and find 16.
//
//  It would first find 12 as the halfway point which doesn't match 16 but is less.
//  It would then find 15 as the halfway point which doesn't match 8 but is less.
//  It would then find 17 as the halfway point and return error not found.

// 3. Find a book
function bookSearch(deweyDec, title, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? deweyDec.length : end;
  if (start > end) {
    return -1;
  }
  const index = (start + end) / 2;
  const middle = deweyDec[index];
  for (let i = 0; i < deweyDec.length; i++) {
    if (deweyDec[i] === title) {
      return `Book found: ${title}`;
    }
    if (middle < deweyDec) {
      return bookSearch(deweyDec, title, index + 1, end);
    } else if (middle > deweyDec) {
      return bookSearch(deweyDec, title, index - 1);
    }
  }
  return `Book Not found`;
}

console.log(bookSearch(['Book 1', 'Book 2', 'Book 3', 'Book 4'], 'Book 1'));

// 4. Searching in a BST
//
// 1) Given a binary search tree whose in-order and pre-order traversals are
// respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90.
// What would be its postorder traversal?
//
//  14, 15, 19, 27, 25, 79, 90, 89, 35.
//
// 2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8.
// What is its pre-order traversal?
//
//  8, 6, 5, 7, 10, 9, 11.
//

// 5. Implement different tree traversals
const BST = new BinarySearchTree();
const treeDataSet = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];

function dataFill(arr, bst) {
  let tree = bst;
  for (let i = 0; i < arr.length; i++) {
    tree.insert(arr[i], arr[i]);
  }
  return tree;
}

dataFill(treeDataSet, BST);

function preOrder(bst) {
  let node = bst;
  console.log(node.key);
  if (node.left) {
    preOrder(node.left);
  }
  if (node.right) {
    preOrder(node.right);
  }
}

preOrder(BST);

function inOrder(bst) {
  let node = bst;
  if (node.left) {
    inOrder(node.left);
  }
  console.log(node.key);
  if (node.right) {
    postOrder(node.right);
  }
}

inOrder(BST);

function postOrder(bst) {
  let node = bst;
  if (node.left) {
    postOrder(node.left);
  }
  if (node.right) {
    postOrder(node.right);
  }
  console.log(node.key);
}

postOrder(BST);

// 6. Find the next commanding officer
const StarCommandTree = new BinarySearchTree();

StarCommandTree.insert(5, 'Captain Picard');
StarCommandTree.insert(3, 'Commander Riker');
StarCommandTree.insert(6, 'Commander Data');
StarCommandTree.insert(2, 'Lt. Cmdr. Worf');
StarCommandTree.insert(4, 'Lt. Cmdr. LaForge');
StarCommandTree.insert(8, 'Lt. Cmdr. Crusher');
StarCommandTree.insert(1, 'Lt. Security-Officer');
StarCommandTree.insert(7, 'Lieutenant Selar');

function nextInCommand(tree, result = []) {
  const CommanderQueue = new Queue();
  CommanderQueue.enqueue(tree);
  while (CommanderQueue.first !== null) {
    const node = CommanderQueue.dequeue();
    result.push(node.value);
    if (node.left) {
      CommanderQueue.enqueue(node.left);
    }
    if (node.right) {
      CommanderQueue.enqueue(node.right);
    }
  }
  result.forEach((officers) => console.log(officers));
}

nextInCommand(StarCommandTree);

// 7. Max profit
function maxProfit(array) {
  let maxProfit = array[0] - array[1];
  let buyInDay = 0;
  for (let i = 0; i < array.length; i++) {
    let dayProfit = array[i - 1] - array[i];
    if (dayProfit > maxProfit) {
      maxProfit = dayProfit;
      buyInDay = i - 1;
    }
  }
  return `If you buy on Day ${buyInDay}, you will make a profit of ${maxProfit}`;
}

console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]));
