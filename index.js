const {select, input} = require("@inquirer/prompts")


let meta = {
    value: 'Tomar 3 litros de agua por dia',
    checked: false,
}

let metas = [
    meta
]

const cadastrarMeta = async () => {
    const meta = await input({
        message: "Digite a meta:"
    })


    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return      //Caso você queira que o usuario volte para cadastrar a meta utilize cadastrarMeta()
    }

    metas.push(
        {value:meta, checked:false}
    )
}
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
                await cadastrarMeta()
                console.log(metas)
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