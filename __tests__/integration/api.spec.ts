import { addTodo, completeTodo, deleteTodo, editTodo, getAllTodos, uncompleteTodo } from '@/api';
import { expect, test} from '@jest/globals';

test('GET all TODOs', async () => {
  const actual = await getAllTodos();
  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1",
      done: false
    },
    {
      id: "2",
      text: "Test 2",
      done: false
    },
    {
      id: "3",
      text: "Test 3",
      done: false
    }
  ]);
});

test('add a TODO', async () => {
  await addTodo({
    id: "4",
    text: "Test 4"
  });
  const actual = await getAllTodos();

  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1",
      done: false
    },
    {
      id: "2",
      text: "Test 2",
      done: false
    },
    {
      id: "3",
      text: "Test 3",
      done: false
    },
    {
      id: "4",
      text: "Test 4",
      done: false
    }
  ]);
});

test('edit a TODO', async () => {
  await editTodo({
    id: "2",
    text: "Test 2 edited"
  });
  const actual = await getAllTodos();

  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1",
      done: false
    },
    {
      id: "2",
      text: "Test 2 edited",
      done: false
    },
    {
      id: "3",
      text: "Test 3",
      done: false
    },
    {
      id: "4",
      text: "Test 4",
      done: false
    }
  ]);
});

test('delete a TODO', async () => {

  await deleteTodo('2');
  const actual = await getAllTodos();

  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1",
      done: false
    },
    {
      id: "3",
      text: "Test 3",
      done: false
    },
    {
      id: "4",
      text: "Test 4",
      done: false
    }
  ]);
});

test('complete a TODO', async () => {
  await completeTodo("3");
  const actual = await getAllTodos();

  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1",
      done: false
    },
    {
      id: "3",
      text: "Test 3",
      done: true
    },
    {
      id: "4",
      text: "Test 4",
      done: false
    }
  ]);
});

test('uncomplete a TODO', async () => {
  await uncompleteTodo("3");
  const actual = await getAllTodos();

  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1",
      done: false
    },
    {
      id: "3",
      text: "Test 3",
      done: false
    },
    {
      id: "4",
      text: "Test 4",
      done: false
    }
  ]);
});