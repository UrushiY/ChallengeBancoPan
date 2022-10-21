import oracledb
import sys

class Aws:
    def __init__(self):
        pass

    def connect():
        try:
            dsn = oracledb.makedsn(host='oracle.fiap.com.br', port=1521, sid='ORCL')
            connection = oracledb.connect(user='rm86700', password='150802', dsn=dsn)
        except oracledb.DatabaseError:
            print('Banco de dados não encontrado, favor verifique sua conexão.')
            sys.exit()
        else:
            print('Conectado ao BD da Aws.')
        return connection;
