import json

from flask import Flask, render_template, request

from app.controller.ClienteController import *
from app.controller.EnderecoController import *
from app.controller.TelefoneController import *
from app.controller.ContaController import *
from app.controller.ContratoController import *

application = Flask(__name__)

@application.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@application.route("/", methods=["POST"])
def entrada():
    cpf = request.form.get("cpf")
    senha = request.form.get("senha")

    
    cliente = ClienteController()

    """
        Verifica se o registro do cliente existe dentro do banco de dados (AWS)
        Parâmetros: String CPF/CNPJ, String Senha
        Retorna: Booleano Resultado
    """

    resultado = cliente.autenticarAws(cpf, senha)

    if resultado == 0:
        """
            Verifica se o registro do cliente existe dentro do banco de dados (Banco PAN)
            Parâmetros: String CPF/CNPJ, String Senha
            Retorna: Booleano Resultado
        """
        resultado = cliente.autenticarPan(cpf, senha)

        if not resultado:
            return json.dumps({'mensagem': 'usuario nao encontrado'})

        return json.dumps({'mensagem': 'usuario com dados duplicados', 'cpf': cpf})

    if resultado == 1:
        return json.dumps({'mensagem': 'usuario nao encontrado'})

    return json.dumps({'mensagem': 'usuario autenticado'})


@application.route("/cadastro", methods=["GET", "POST"])
def cadastro():

    if request.method == "GET":
        return render_template('cadastro.html')

    if request.method == "POST":
        # CLIENTE
        nome = request.form.get("nome")
        sobrenome = request.form.get("sobrenome")
        cpf = request.form.get("cpf")
        rg = request.form.get("rg")
        dataNasc = request.form.get("data_nasc")
        email = request.form.get("email")
        senha = request.form.get("senha")
        estadoCiv = request.form.get("ec")
        genero = request.form.get("genero")
        etnia = request.form.get("raca")
        profissao = request.form.get("profissao")
        renda = request.form.get("renda")

        ClienteController.cadastrarAws(
            cpf, nome, sobrenome, rg, dataNasc, genero, profissao, renda, estadoCiv, etnia, email, senha)

        codCliente = ClienteController.pesquisarCodClienteAws(cpf)

        ContaController.cadastrarAws(codCliente)

        # TELEFONE
        celular = request.form.get("celular")
        fixo = request.form.get("tel")
        comercial = request.form.get("tel_com")

        TelefoneController.cadastrarAws(celular, fixo, comercial, codCliente)

        # ENDERECO
        apelido = request.form.get("apelido")
        cep = request.form.get("cep")
        bairro = request.form.get("bairro")
        logradouro = request.form.get("logradouro")
        numero = request.form.get("numero")
        complemento = request.form.get("complemento")
        cidade = request.form.get("cidade")
        uf = request.form.get("uf")

        EnderecoController.cadastrarAws(
            cep,  uf,  cidade,  bairro, logradouro, numero, apelido, complemento, codCliente)

        return codCliente


@application.route("/continuar-cadastro", methods=["POST"])
def continuar():
    email = request.form.get('email')
    senha = request.form.get('senha')
    return render_template('continuar-cadastro.html', email=email, senha=senha)


@application.route("/loading")
def loading():
    return render_template('loading.html')


@application.route("/confirma-dados", methods=["GET"])
def confirma():
    if request.method == "GET":
        cpf = request.args.get("cpf")
        senha = request.args.get("senha")
        return render_template('confirma-dados.html', cpf=cpf, senha=senha)


@application.route("/consulta", methods=["POST"])
def consulta():
    cpf = request.form.get("cpf")

    str_dados = ClienteController.pesquisarDadosPan(cpf)
    dados = json.loads(str_dados)

    str_end = EnderecoController.pesquisarEndPan(dados['CODCLIENTE'])
    endereco = json.loads(str_end)

    str_tel = TelefoneController.buscarTelefone(dados['CODCLIENTE'])
    telefone = json.loads(str_tel)
   

    nsi = {'dados': dados, 'endereco': endereco, 'telefone': telefone}
   

    return json.dumps(nsi)


@application.route("/consulta-end", methods=["POST"])
def consulta_end():
    codCliente = request.form.get("codCliente")

    endereco = EnderecoController.pesquisarEndAws(codCliente)

    return json.dumps(endereco)


@application.route("/consulta-cpf", methods=["POST"])
def consulta_cpf():
    codCliente = request.form.get("codCliente")

    cpf = ClienteController.buscarCpf(codCliente)

    return json.dumps(cpf)


@application.route("/confirma-prod", methods=["GET", "POST"])
def confirma_prod():
    if request.method == "GET":
        cpf = request.args.get("cpf")
        codCliente = ClienteController.pesquisarCodClienteAws(cpf)

        return render_template('produtos.html', cpf=cpf, codCliente=codCliente)

    if request.method == "POST":
        cpf = request.form.get("cpf")
        produtos = ClienteController.buscarProdutos(cpf)
        return json.dumps(produtos)


@application.route("/cadastro-contrato", methods=["POST"])
def cadastro_contrato():
    if request.method == "POST":
        codCliente = request.form.get("codCliente")
        codProduto = request.form.get("codProduto")
        codEndereco = request.form.get("codEndereco")

        codConta = ContaController.buscarCodContaAws(codCliente)

        ContratoController.cadastrarAws(codConta, codProduto, codEndereco)

        return json.dumps({'mensagem': 'produtos contratados'})


@application.route("/novo-endereco", methods=["GET", "POST"])
def novo_endereco():
    if request.method == "GET":
        codCliente = request.args.get('codCliente')
        return render_template('novo-endereco.html', codCliente=codCliente)

    if request.method == "POST":
        codCliente = request.form.get("codCliente")
        apelido = request.form.get("apelido")
        cep = request.form.get("cep")
        bairro = request.form.get("bairro")
        logradouro = request.form.get("logradouro")
        numero = request.form.get("numero")
        complemento = request.form.get("complemento")
        cidade = request.form.get("cidade")
        uf = request.form.get("uf")

        codConta = EnderecoController.cadastrarAws(
            cep,  uf,  cidade,  bairro, logradouro, numero, apelido, complemento, codCliente)

        return json.dumps({'mensagem': 'endereco cadastrado'})


# colocar o site no ar
if __name__ == "__main__":
    application.run(debug=True)
