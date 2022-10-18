

from ..connection import Aws, Pan
import oracledb

class EnderecoController:
    def __init__(self):
        pass
    

    def pesquisarEndPan(codCliente):
        try:
            sql='SELECT JSON_OBJECT(*) FROM enderecos WHERE codCliente=:1'
            with Pan.Oracle.connect() as conn:
            
                with conn.cursor() as cursor:
                    cursor.execute(sql, [codCliente])

                    for row in cursor.fetchone():
                        end = row
        except:
            print('Erro no buscar')
        else:
            return end
            print('Recuperado com sucesso')
        
    def pesquisarEndAws(codCliente):
        try:
            sql='SELECT * FROM enderecos WHERE codCliente=:1'
            with Aws.Aws.connect() as conn:
                
                list = []
                with conn.cursor() as cursor:
                    cursor.execute(sql, [codCliente])

                    for row in cursor.fetchall():
                        list.append(row)
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao buscar o endereço Aws')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
        else:
            return list
            print('Recuperado com sucesso')

    def cadastrarAws( cep,  uf,  cidade,  bairro, logradouro, numResidencia, apelido, complemento, codCliente):
        try:
            sql='INSERT INTO enderecos (cep,  uf,  cidade,  bairro, logradouro, nmr, apelido, complemento, codCliente) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)'
            with Aws.Aws.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(sql,[cep,  uf,  cidade,  bairro, logradouro, numResidencia, apelido, complemento, codCliente])
                conn.commit()
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao cadastrar o endereço ')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
            
        else:
            print('Endereço cadastrado com sucesso')