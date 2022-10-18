from datetime import datetime
from ..connection.Aws import *
import oracledb

class ContaController:
    def __init__(self):
        pass

    def cadastrarAws(codCliente):   
        try:
            with Aws.connect() as conn:
                sql="INSERT INTO contas (codCliente, dataCriacao) VALUES (:1, TO_DATE(:2, 'YYYY-MM-DD'))"
                with conn.cursor() as cursor:
                    cursor.execute(sql, [codCliente, datetime.now().strftime("%Y-%m-%d")])
                conn.commit()
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao cadastrar a conta')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
        else:
            print('Conta cadastrada com sucesso')
    
    def buscarCodContaAws(codCliente):
        try:
            with Aws.connect() as conn:
                sql='SELECT codConta FROM contas WHERE codCliente = :1'
                with conn.cursor() as cursor:
                    cursor.execute(sql, [codCliente])
                    for row in cursor.fetchone():
                        codConta= str(row)
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao no buscaCod conta')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
        else:
            return codConta
