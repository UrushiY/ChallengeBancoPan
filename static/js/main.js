const addressForm = document.querySelector("#form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#lograd");
const cityInput = document.querySelector("#cidade");
const neighborhoodInput = document.querySelector("#bairro");
const regionInput = document.querySelector("#uf");
const formInputs = document.querySelectorAll("[data-input]");


const inputCPF = document.querySelector(".cpf");

inputCPF.addEventListener('keypress', () => {
  let inputlenght = input.value.length

  if (inputlenght === 3 || inputlenght === 7) {
    input.value += '.'
  } else if (inputlenght === 11) {
    input.value += '-'
  }
  console.log(inputlenght)
})

function validarCPF(cpf) {
  if (!_cpf(cpf.value)) {
      Swal.fire({
      icon: 'error',
      title: 'CPF Inválido',
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
    alert("CEP não encontrado.");
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
      alert("Formato de CEP inválido.");
    }
    
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
  
};






// Add or remove disable attribute
// const toggleDisabled = () => {
//   if (regionInput.hasAttribute("disabled")) {
//     formInputs.forEach((input) => {
//       input.removeAttribute("disabled");
//     });
//   } else {
//     formInputs.forEach((input) => {
//       input.setAttribute("disabled", "disabled");
//     });
//   }
// };




// Show or hide message
// const toggleMessage = (msg) => {
//   const fadeElement = document.querySelector("#fade");
//   const messageElement = document.querySelector("#message");

//   const messageTextElement = document.querySelector("#message p");

//   messageTextElement.innerText = msg;

//   fadeElement.classList.toggle("hide");
//   messageElement.classList.toggle("hide");
// };

// Close message modal
// closeButton.addEventListener("click", () => toggleMessage());



