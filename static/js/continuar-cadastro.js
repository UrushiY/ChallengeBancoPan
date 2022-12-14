async function consultaCliente(cpf) {
  return new Promise((resolve, reject) => {
    $.post("/consulta", { cpf }, function (data) {
      if (data) {
        resolve(data)
      } else {
        reject({ mensagem: 'conexao falhou' })
      }
    }, "json");
  })
}

async function cadastroAws(
  nome, sobrenome, data_nasc, cpf, rg, genero, raca, email, senha, ec, profissao, renda,
  celular, tel, tel_com,
  apelido, cep, bairro, logradouro, cidade, uf, numero, complemento
) {
  return new Promise((resolve, reject) => {
    $.post("/cadastro", {
      nome, sobrenome, data_nasc, cpf, rg, genero, raca, email, senha, ec, profissao, renda,
      celular, tel, tel_com,
      apelido, cep, bairro, logradouro, cidade, uf, numero, complemento
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

const addressForm = document.querySelector("#form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#lograd");
const cityInput = document.querySelector("#cidade");
const neighborhoodInput = document.querySelector("#bairro");
const regionInput = document.querySelector("#uf");
const formInputs = document.querySelectorAll("[data-input]");

const inputCPF = document.querySelector(".cpf");
function validarCPF(cpf) {
  if (!_cpf(cpf.value)) {
    Swal.fire({
      icon: 'error',
      title: 'CPF inválido',
      confirmButtonColor: '#07b2fd',
      text: 'Verifique seu CPF e tente novamente',
    })

    // apaga o valor
    cpf.value = "";
  }
}

function _cpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;
  add = 0;
  for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
    return false;
  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
    return false;
  return true;
}


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

$('.rg').mask('00.000.000-0');
$('.cep').mask('00000-000');
$('.celular').mask('(00) 00000-0000');
$('.telefone').mask('(00) 0000-0000');
$('.telefone_com').mask('(00) 0000-0000');
$('.cpf').mask('000.000.000-00', { reverse: true });
// $('.renda').mask('000.000.000.000.000,00', { reverse: true });

$('.botaoConf').on('click', async function (e) {
  var button = $('.botaoConf');
  button.prop('disabled', true);

  let nome = $('#nome').val();
  let sobrenome = $('#sobrenome').val();
  let data_nasc = $('#data-nasc').val();
  let cpf = $('#cpf').cleanVal();
  let rg = $('#rg').cleanVal();

  let genero = $('#op-masc').prop('checked') == true ? 'masc' : 'fem';

  let raca = '';

  if ($('#op-branca').prop('checked') == true) {
    raca = 'branca';
  } else if ($('#op-preta').prop('checked') == true) {
    raca = 'preta';
  } else if ($('#op-parda').prop('checked') == true) {
    raca = 'parda';
  } else if ($('#op-amarela').prop('checked') == true) {
    raca = 'amarela';
  } else if ($('#op-indigena').prop('checked') == true) {
    raca = 'indigena';
  }

  let email = $('#email').val();
  let senha = $('#senha').val();
  let ec = $('#estado-civil').val();
  let profissao = $('#profissao').val();
  let renda = $('#renda').val();

  let celular = $('#celular').cleanVal();
  let tel = $('#telefone').cleanVal();
  let tel_com = $('#telefone_com').cleanVal();

  let apelido = $('#apelido').val();
  let cep = $('#cep').cleanVal();
  let bairro = $('#bairro').val();
  let logradouro = $('#rua').val();
  let cidade = $('#cidade').val();
  let uf = $('#uf').val();
  let numero = $('#numero').val();
  let complemento = $('#complemento').val();

  if (nome == '' || sobrenome == '' || data_nasc == null || cpf == '' || rg == '' || raca == '' || email == '' || senha == ''
    || ec == '' || profissao == '' || renda == '' || celular == ''
    || apelido == '' || cep == '' || bairro == '' || logradouro == '' || cidade == '' || uf == '' || numero == '') {
    Swal.fire({
      icon: 'error',
      title: 'Erro de cadastro',
      confirmButtonColor: '#07b2fd',
      text: 'Por favor, preencha todos os campos obrigatórios para completar o cadastro',
    })
    button.prop('disabled', false);
    return false
  } else {
    $('#modal-confirmacao').modal('show');
    button.prop('disabled', false);
    $('#confirmar').click(async() => {

      res = await cadastroAws(nome, sobrenome, data_nasc, cpf, rg, genero, raca, email, senha, ec, profissao, renda,
        celular, tel, tel_com,
        apelido, cep, bairro, logradouro, cidade, uf, numero, complemento);

      if (res.mensagem == 'erro no cadastro') {

      }
      Swal.fire({
        icon: 'success',
        title: 'Cadastro Confirmado!',
        text: 'Redirecionando para área de login',
        confirmButtonColor: '#07b2fd'
      }).then(() => {
        window.location.assign('/');
      })
    });
    return true;
  }

});


