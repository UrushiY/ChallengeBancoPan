async function cadastroEndereco(cep, uf, cidade, bairro, logradouro, numero, apelido, complemento, codCliente) {
    return new Promise((resolve, reject) => {
        $.post("/novo-endereco", {
            cep, uf, cidade, bairro, logradouro, numero, apelido, complemento, codCliente
        }, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject({
                    mensagem: 'conexao falhou'
                })
            }
        }, "json");
    })
}

async function buscarCpf(codCliente) {
    return new Promise((resolve, reject) => {
        $.post("/consulta-cpf", {
            codCliente
        }, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject({
                    mensagem: 'conexao falhou'
                })
            }
        }, "json");
    })
}

$('.cep').mask('00000-000');

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        Swal.fire({
            icon: 'warning',
            title: 'CEP não encontrado',
            confirmButtonColor: '#07b2fd',
            text: 'Verifique seu CEP e tente novamente',
        })
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            Swal.fire({
                icon: 'error',
                title: 'CEP Inválido',
                confirmButtonColor: '#07b2fd',
                text: 'Verifique seu CEP e tente novamente',
            })
        }

    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }

};

$('#btn-voltar').click(() => {
    window.history.back();
});

$('#btn-confirmar').click(async () => {
    let apelido = $('#apelido').val();
    let cep = $('#cep').cleanVal();
    let bairro = $('#bairro').val();
    let logradouro = $('#rua').val();
    let cidade = $('#cidade').val();
    let uf = $('#uf').val();
    let numero = $('#numero').val();
    let complemento = $('#complemento').val();
    let codCliente = $('#codCliente').val();

    if (apelido == '' || cep == '' || numero == '') {
        Swal.fire({
            icon: 'error',
            title: 'Erro de cadastro',
            confirmButtonColor: '#07b2fd',
            text: 'Por favor, preencha todos os campos obrigatórios para completar o cadastro',
        });
        return false;
    }

    $('#modal-confirmacao').modal('show');
    button.prop('disabled', false);
    $('#confirmar').click(async () => {
        res = await cadastroEndereco(cep, uf, cidade, bairro, logradouro, numero, apelido, complemento, codCliente);

        if (res.mensagem == 'endereco cadastrado') {
            Swal.fire({
                icon: 'success',
                title: 'Endereco Cadastrado!',
                text: 'Redirecionando para confirmação de produtos',
                confirmButtonColor: '#07b2fd'
            }).then(async () => {
                cpf = await buscarCpf(codCliente);
                window.location.assign(`/confirma-prod?cpf=${cpf}`);
            })
        }
    });

});