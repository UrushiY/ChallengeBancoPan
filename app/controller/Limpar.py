from ..connection import Aws
import json
import oracledb

class Limpar:
    def __init__(self):
        pass

    def limparAws():
        try:
            with Aws.Aws.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute('DELETE FROM contratos')    
                    cursor.execute('DELETE FROM contas')
                    cursor.execute('DELETE FROM enderecos')
                    cursor.execute('DELETE FROM telefones')
                    cursor.execute('DELETE FROM clientes')
                    
                conn.commit()
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
            return False
        else:
            return True
