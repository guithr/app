function start() {



    while (true) {
        let opcao = "sair"
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