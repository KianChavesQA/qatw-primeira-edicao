import { test, expect } from "@playwright/test";

const user = {
  cpf: "00000014141",
  password: "147258",
  invalid2faCode: "123456",
};

test("shouldn't login with invalid 2fa authenticator code", async ({
  page,
}) => {
  await page.goto("http://paybank-mf-auth:3000/");
  await page.getByRole("textbox", { name: "Digite seu CPF" }).fill(user.cpf);
  await page.getByRole("button", { name: "Continuar" }).click();
  for (const char of user.password) {
    await page.getByRole("button", { name: char }).click();
  }
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("textbox", { name: "000000" }).fill(user.invalid2faCode);
  await page.getByRole("button", { name: "Verificar" }).click();
  await expect(page.locator("span")).toContainText(
    "Código inválido. Por favor, tente novamente.",
  );
});
