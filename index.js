const {select} = require("@inquirer/prompts")
const start = async () => {

    while (true) {

        const opcao =  await select({
            message: "Menu >",
            choices: [
            {
                name:"Cadastrar meta",
                value: "cadastar"
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name:"Sair",
                value: "sair" 
            }
            ]
        })

        switch (opcao) {
            case "cadastar":
                console.log("Opção: Cadastrar")
                break;
            case "listar":
                console.log("Opção: Listar")
                break;
            case "sair":
                console.log("Saindo...")
                return
        }
    }
}

start()