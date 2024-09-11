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

    metas.forEach((f)=>{
        f.checked = false;
        })

    if (respostas.length == 0){
        console.log('Nenhuma meta selecionada!')
        return;
    }

    respostas.forEach((resposta)=>{
        const meta = metas.find((m)=>{
            return m.value == resposta
        })
        meta.checked = true;
    })

    console.log('Meta(s) concluída(s)')

    start()
 
}
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })
    if(realizadas.length == 0){
        console.log('Nenhuma meta realizada!')
        return;
    }

    await select({
        message: `Nenhuma meta realizada! ${realizadas.length}`,
        choices: [...realizadas], //Nome disso é spread operators
    })

}
const metasAbertas = async () => {
    const abertas = metas.filter((meta)=>{
        return meta.checked != true
    })
    if(abertas.length == 0){
        console.log('Não existem metas abertas!')
        return;
    }

    await select({
        message: `Metas abertas ${abertas.length}`,
        choices: [...abertas], //Nome disso é spread operators
    })

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
                name: "Metas realizadas",
                value: "realizadas"
            },
            {
                name: "Metas abertas",
                value: "abertas"
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
                console.log("Meta cadastrada!")
                break;
            case "listar":
                await listarMetas()
                break;
            case "realizadas":
                await metasRealizadas()
                break;
                case "abertas":
                    await metasAbertas()
                    break;
            case "sair":
                console.log("Saindo...")
                return
        }
    }
}

start()