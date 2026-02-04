import { test, expect } from "@playwright/test";
import { get2FAcode } from "../support/db.js";
import { LoginPage } from "../pages/LoginPage.js";
import { DashPage } from "../pages/DashPage.js";
import { LoginActions } from "../actions/LoginActions.js";
import { cleanJobs, getJob } from "../support/redis.js";
test.describe.configure({ mode: "serial" });

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
  await cleanJobs();
  await loginPage.acessPage();
  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  await page
    .getByRole("heading", { name: "Verificação em duas etapas" })
    .waitFor({ timeout: 5000 });
  const code = await getJob();
  //const code = await get2FAcode(user.cpf);
  await loginPage.fill2FACode(code);
  const dashPage = new DashPage(page);
  await expect(await dashPage.getBalance()).toHaveText("R$ 5.000,00", {
    timeout: 10000,
  });
});

test("Should login with valid 2fa code **Actions**", async ({ page }) => {
  await cleanJobs();
  const loginActions = new LoginActions(page);
  await loginActions.acessPage();
  await loginActions.fillCPF(user.cpf);
  await loginActions.fillPassword(user.password);
  await page
    .getByRole("heading", { name: "Verificação em duas etapas" })
    .waitFor({ timeout: 5000 });
  const code = await getJob();
  await loginActions.fill2FACode(code);
  await expect(await loginActions.getBalance()).toHaveText("R$ 5.000,00", {
    timeout: 10000,
  });
});
