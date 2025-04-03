import { test, expect } from '@playwright/test';

test('create + edit + delete todo', async ({ page }) => {
  // create
  await page.goto('http://localhost:3000/');
  await page.getByTestId('add-todo').click();
  await expect(page.getByTestId('todo-text-add')).toBeVisible();
  await page.getByTestId('todo-text-add').fill('TODO TEST 1');
  await page.getByTestId('save-add-todo').click();
  await expect(page.getByTestId('todo-name-label')).toBeVisible();
  // edit
  await page.getByTestId('edit-todo').first().click();
  await expect(page.getByTestId('todo-text-edit')).toBeVisible();
  await page.getByTestId('todo-text-edit').fill('TODO TEST 2');
  await page.getByTestId('save-edit-todo').click();
  await expect(page.getByTestId('todo-name-label')).toBeVisible();
  // complete
  await page.getByTestId('complete-todo').first().click();
  await expect(page.getByTestId('complete-todo-confirm')).toBeVisible();
  await page.getByTestId('complete-todo-confirm').click();
  await expect(page.getByTestId('todo-name-label')).toBeVisible();
  // uncomplete
  await page.getByTestId('uncomplete-todo').first().click();
  await expect(page.getByTestId('uncomplete-todo-confirm')).toBeVisible();
  await page.getByTestId('uncomplete-todo-confirm').click();
  await expect(page.getByTestId('todo-name-label')).toBeVisible();
  // delete
  await page.getByTestId('delete-todo').first().click();
  await expect(page.getByTestId('delete-todo-confirm')).toBeVisible();
  await page.getByTestId('delete-todo-confirm').click();
  await expect(page.getByTestId('todo-name-label')).toHaveCount(0);
});

