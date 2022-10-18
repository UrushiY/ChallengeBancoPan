function validacaoEmail(email) {
  usuario = email.substring(0, email.indexOf("@"));
  dominio = email.substring(email.indexOf("@") + 1, email.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true

  }
  else {

    return false
  }
}



function validarSenha(senha, senhaC) {
  if(senha =='' || senhaC ==''){
    return false
  }
  if (senha != senhaC) {
    return false;
  } else {
    return true;
  }
}


function validarChk(check) {
  if (!check.prop("checked")) {
    return false;
  } else {
    return true;
  }
}


$('.botao').on('click', function (e) {
  var button = $('.botao');
  button.prop('disabled', true);

  let email = $('.email').val();
  if (!validacaoEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'E-mail Inválido',
      confirmButtonColor: '#07b2fd',
      text: 'Verifique seu e-mail e tente novamente',
    })
    button.prop('disabled', false);
    return false
  }

  let senha = $(".senha").val();
  let senhaC = $(".confirma_senha").val();

  if (!validarSenha(senha, senhaC)) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida',
      confirmButtonColor: '#07b2fd',
      text: 'Verifique se inseriu a senha corretamente e tente novamente',
    })
    button.prop('disabled', false);
    return false
  }

  let check = $(".termos");

  if (!validarChk(check)) {
    Swal.fire({
      icon: 'warning',
      title: 'Confirme os termos',
      confirmButtonColor: '#07b2fd',
      text: 'Por favor, leia e aceite os termos para prosseguir com cadastro',
    })
    button.prop('disabled', false);
    return false
  }

  $('#formCadastro').submit();
  return true
});
