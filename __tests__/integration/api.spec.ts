import { addTodo, deleteTodo, editTodo, getAllTodos } from '@/api';
import {afterAll, beforeAll, beforeEach, expect, test} from '@jest/globals';
import { execSync, spawn } from 'node:child_process';
import fs from "node:fs/promises";
import path from "node:path";
import { afterEach } from 'node:test';

test('GET all TODOs', async () => {
  const actual = await getAllTodos();
  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1"
    },
    {
      id: "2",
      text: "Test 2"
    },
    {
      id: "3",
      text: "Test 3"
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
      text: "Test 1"
    },
    {
      id: "2",
      text: "Test 2"
    },
    {
      id: "3",
      text: "Test 3"
    },
    {
      id: "4",
      text: "Test 4"
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
      text: "Test 1"
    },
    {
      id: "2",
      text: "Test 2 edited"
    },
    {
      id: "3",
      text: "Test 3"
    },
    {
      id: "4",
      text: "Test 4"
    }
  ]);
});

test('delete a TODO', async () => {

  await deleteTodo('2');
  const actual = await getAllTodos();

  expect(actual).toEqual([
    {
      id: "1",
      text: "Test 1"
    },
    {
      id: "3",
      text: "Test 3"
    },
    {
      id: "4",
      text: "Test 4"
    }
  ]);
});