from ..connection import Aws, Pan

import oracledb

class TelefoneController:
    def __init__(self):
        pass
    
    def buscarTelefone(codCliente):
                try:
                    sql = 'SELECT JSON_OBJECT(*) FROM telefones WHERE codCliente=:1'
                    with Pan.Oracle.connect() as conn:

                        with conn.cursor() as cursor:
                            cursor.execute(sql, [codCliente])
                            
                            for row in cursor.fetchone():
                                tel = row
                except:
                    print("Erro")
                else:
                    return tel   
                
    def cadastrarAws(telCelular, telFixo, telComercial, codCliente):
        
        try:
            sql='INSERT INTO telefones (telCelular, telFixo, telComercial, codCliente) VALUES (:1, :2, :3, :4)'
            with Aws.Aws.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(sql,[telCelular, telFixo, telComercial, codCliente])
                conn.commit()
                
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao cadastrar o telefone ')
            print('Erro ao buscar codCliente Aws')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
        else:
            print('Telefone cadastrado com sucesso')           