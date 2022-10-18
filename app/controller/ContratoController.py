
from ..connection import Aws

import oracledb


class ContratoController:
    def __init__(self):
        pass

    def cadastrarAws(codConta, codProduto, codEndereco):
        try:
            with Aws.Aws.connect() as conn:
                sql = "INSERT INTO contratos (codConta, codProduto, codEndereco) VALUES (:1, :2, :3)"
                with conn.cursor() as cursor:
                    cursor.execute(sql, [codConta, codProduto, codEndereco])
                conn.commit()
        except oracledb.IntegrityError as e:
                error_obj, = e.args
                print('Erro ao cadastrar o contrato')
                print("Error Code:", error_obj.code)
                print("Error Full Code:", error_obj.full_code)
                print("Error Message:", error_obj.message)
        else:
                print('Contrato feito com sucesso')