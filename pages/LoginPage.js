export class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async acessPage() {
    await this.page.goto("http://paybank-mf-auth:3000/");
  }
  async fillCPF(cpf) {
    await this.page.getByRole("textbox", { name: "Digite seu CPF" }).fill(cpf);
    await this.page.getByRole("button", { name: "Continuar" }).click();
  }
  async fillPassword(password) {
    for (const char of password) {
      await this.page.getByRole("button", { name: char }).click();
    }
    await this.page.getByRole("button", { name: "Continuar" }).click();
  }
  async fill2FACode(code) {
    await this.page.getByRole("textbox", { name: "000000" }).fill(code);
    await this.page.getByRole("button", { name: "Verificar" }).click();
  }

}
