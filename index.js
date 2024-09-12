const { select, input, checkbox } = require("@inquirer/prompts");
const fs = require("fs").promises;

let mensagem = "Bem vindo ao Gerenciado de Metas!";

let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf8");
    metas = JSON.parse(dados);
  } catch (e) {
    metas = [];
  }
};
const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
};
const cadastrarMeta = async () => {
  const meta = await input({
    message: "Digite a meta:",
  });

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia.";
    return; //Caso você queira que o usuario volte para cadastrar a meta utilize cadastrarMeta()
  }

  metas.push({ value: meta, checked: false });

  mensagem = "Meta cadastrada com sucesso!";
};
const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas!";
    return;
  }
  const respostas = await checkbox({
    message:
      "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmarcar e o ENTER para finalizar a etapa",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada!";
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true;
  });

  mensagem = "Meta(s) marcada(s) como concluída(s)";

  start();
};
const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });
  if (realizadas.length == 0) {
    mensagem = "Nenhuma meta realizada!";
    return;
  }

  await select({
    message: `Metas realizada: ${realizadas.length}`,
    choices: [...realizadas], //Nome disso é spread operators
  });
};
const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });
  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas!";
    return;
  }

  await select({
    message: `Metas abertas: ${abertas.length}`,
    choices: [...abertas], //Nome disso é spread operators
  });
};
const removerMetas = async () => {
  if (metasAbertas.length == 0) {
    mensagem = "Não existem metas abertas para serem removidas!";
    return;
  }
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checkbox: false };
  });

  const itemsARemover = await checkbox({
    message:
      "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmarcar e o ENTER para finalizar a etapa",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itemsARemover.length == 0) {
    mensagem = "Nenhuma meta foi removida!";
    return;
  }

  itemsARemover.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });
  mensagem = "Meta(s) removida(s) com sucesso!";
};
const mostrarMensagem = () => {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const start = async () => {
  await carregarMetas();

  while (true) {
    mostrarMensagem();
    await salvarMetas();
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Remover metas",
          value: "remover",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "abertas":
        await metasAbertas();
        break;
      case "remover":
        await removerMetas();
        break;
      case "sair":
        console.log("Saindo...");
        return;
    }
  }
};

start();
