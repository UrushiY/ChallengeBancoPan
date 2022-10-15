async function consultaProduto(cpf) {
  return new Promise((resolve, reject) => {
    $.post("/confirma-prod", {
      cpf
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

async function consultaEnderecos(codCliente) {
  return new Promise((resolve, reject) => {
    $.post("/consulta-end", {
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

async function cadastroContrato(codCliente, codProduto, codEndereco) {
  return new Promise((resolve, reject) => {
    $.post("/cadastro-contrato", {
      codCliente, codProduto, codEndereco
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

function exibeProdutos(produtos, enderecos) {
  $('#div-produtos').html('');
  $('#div-produtos').append(` <div class="row mb-3 text-center">
                                    <div class="col"><h5>Produtos</h5></div>
                                    <div class="col"><h5>Endereços</h5></div>
                                </div>`);

  for (let i = 0; i < produtos.length; i++) {
    let row = document.createElement('div');
    row.classList.add('row', 'my-2');
    row.innerHTML = `<div class="col">
                            <div class="form-group">
                            <input type="text" class="form-control" name="produto" id="produto" disabled value="${produtos[i][1]}">
                            <input type="hidden" id="produto${i}" value="${produtos[i][0]}">
                            </div>
                         </div>

                       <div class="col">
                           <select class="form-control endereco" id="endereco${i}">
                             
                           </select>
                       </div>`;
    $('#div-produtos').append(row)
  }

  endereco = $('.endereco');
  endereco.html('');
  // endereco.append(`<option selected disabled value="">Escolha um endereço</option>`)
  for (let i = 0; i < enderecos.length; i++) {
    if(i == 0) {
      endereco.append(`<option selected value="${enderecos[i][0]}">${enderecos[i][8]}</option>`);
      continue;
    }
    endereco.append(`<option value="${enderecos[i][0]}">${enderecos[i][8]}</option>`);
  }
}

$(document).ready(async () => {
  $('#loader').hide();
  jQuery.ajaxSetup({
    beforeSend: function () {
      $('#loader').show();
    },
    complete: function () {
      $('#loader').hide();
    },
    success: function () {
      $('#loader').show();
    }
  });

  let cpf = $('#cpf').val();
  let codCliente = $('#codCliente').val();

  globalThis.produtos = await consultaProduto(cpf);
  globalThis.enderecos = await consultaEnderecos(codCliente);

  exibeProdutos(produtos, enderecos)
})

$('#confirmar').click(async () => {
  for (let i = 0; i < produtos.length; i++) {
    let endereco = $(`#endereco${i}`).val()
    let produto = $(`#produto${i}`).val()

    res = await cadastroContrato($('#codCliente').val(), produto, endereco)

    if (res) {
      console.log(res)
    }
  }

  window.location.assign('/loading');
});

$("#novo-endereco").click(() => {
  let codCliente = $('#codCliente').val();
  window.location.assign(`/novo-endereco?codCliente=${codCliente}`);
});