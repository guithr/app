const {select, input, checkbox} = require("@inquirer/prompts")


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
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmarcar e o ENTER para finalizar a etapa",
        choices: [...metas],
        instructions: false
    })

    if (respostas.length == 0){
        console.log('Nenhuma meta selecionada!')
        return;
    }


    metas.forEach((f)=>{
    f.checked = false;
    })


    respostas.forEach((resposta)=>{
        const meta = metas.find((m)=>{
            return m.value == resposta
        })
        meta.checked = true;
    })

    console.log('Meta(s) concluída(s)')

    start()
 
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
                await listarMetas()
                break;
            case "sair":
                console.log("Saindo...")
                return
        }
    }
}

start()