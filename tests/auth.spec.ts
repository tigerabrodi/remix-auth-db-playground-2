import { test } from "@playwright/test";
import { createRandomUser } from "./utils";

test("Register and Login", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("heading", { name: "Landing page" }).isVisible();
  await page.getByRole("link", { name: "Register" }).click();

  await page.waitForURL("/register");

  const user1 = createRandomUser();
  const user2 = createRandomUser();

  await page.getByLabel("Email").fill(user1.email);
  await page.getByLabel("Password", { exact: true }).fill(user1.password);
  await page.getByLabel("Confirm Password").fill(user1.password);

  await page.getByRole("button", { name: "Register" }).click();

  await page.waitForURL("/board");
  await page.getByRole("heading", { name: "Board" }).isVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await page.waitForURL("/");

  await page.getByRole("link", { name: "Register" }).click();

  await page.waitForURL("/register");

  await page.getByLabel("Email").fill(user1.email);
  await page.getByLabel("Password", { exact: true }).fill(user2.password);
  await page.getByLabel("Confirm Password").fill(user2.password);

  await page.getByText("Email already in use").isVisible();

  await page.getByLabel("Email").clear();
  await page.getByLabel("Email").fill(user2.email);

  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForURL("/board");

  await page.getByRole("button", { name: "Logout" }).click();
  await page.waitForURL("/");

  await page.getByRole("link", { name: "Login" }).click();
  await page.waitForURL("/login");

  await page.getByLabel("Email").fill(user1.email);
  await page.getByLabel("Password", { exact: true }).fill(user2.password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("Invalid email or password").isVisible();

  await page.getByLabel("Password", { exact: true }).clear();
  await page.getByLabel("Password", { exact: true }).fill(user1.password);

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("/board");
  await page.getByRole("heading", { name: "Board" }).isVisible();
});
