import oracledb
import sys

class Oracle:
    def __init__(self):
        pass

    def connect():
        try:
            dsn = oracledb.makedsn(host='oracle.fiap.com.br', port=1521, sid='ORCL')
            connection = oracledb.connect(user='rm89205', password='170899', dsn=dsn)
        except oracledb.DatabaseError:
            print('Banco de dados não encontrado, favor verifique sua conexão.')
            sys.exit()
        else:
            print('Conectado ao BD do Pan.')
        return connection;