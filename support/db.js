import pgPromise from "pg-promise";
const pgp = pgPromise();

const db = pgp({
  host: "paybank-db",
  port: 5432,
  database: "UserDB",
  user: "dba",
  password: "dba",
});

export async function cleanDb() {
  try {
    // Tenta limpar, mas não trava se a tabela não existir
    await db.none('DROP TABLE IF EXISTS public."TwoFactorCode" CASCADE');
    await db.none('DROP TABLE IF EXISTS public."User" CASCADE');

    // Se você chegou aqui, o usuário dba tem permissão.
    // Mas o ideal é deixar o microserviço criar as tabelas primeiro.
    console.log("Banco limpo ou tabelas removidas para recreação.");
  } catch (error) {
    console.error("Erro ao tentar limpar o banco:", error.message);
  }
}
export async function get2FAcode() {
  const query = `SELECT code FROM public."TwoFactorCode" ORDER BY id DESC LIMIT 1;`;

  let tentativas = 5;
  while (tentativas > 0) {
    const result = await db.oneOrNone(query);
    if (result && result.code) return result.code;

    console.log(
      `Aguardando código 2FA... (${tentativas} tentativas restantes)`,
    );
    tentativas--;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Código 2FA não encontrado no banco de dados.");
}
