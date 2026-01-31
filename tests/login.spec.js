import { test, expect } from "@playwright/test";
import { get2FAcode } from "../support/db.js";
import { LoginPage } from "../pages/LoginPage.js";
import { DashPage } from "../pages/DashPage.js";
// Massa de teste fica fora (pode até ser um JSON separado)
const user = {
  cpf: "00000014141",
  password: "147258",
  invalid2faCode: "123456",
};

let loginPage; // Variável global do arquivo

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

test("Shouldn't login with invalid 2fa authenticator code", async ({
  page,
}) => {
  await loginPage.acessPage();
  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  await loginPage.fill2FACode(user.invalid2faCode);
  await expect(page.locator("span")).toContainText(
    "Código inválido. Por favor, tente novamente.",
  );
});

test("Should login with valid 2fa code", async ({ page }) => {
  await loginPage.acessPage();
  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  await page.waitForTimeout(2000); // w8ting for code generation
  const code = await get2FAcode();
  await loginPage.fill2FACode(code);
  await page.waitForTimeout(2000); // waiting for balance load
  const dashPage = new DashPage(page);
  expect(await dashPage.getBalance()).toHaveText("R$ 5.000,00");
});
