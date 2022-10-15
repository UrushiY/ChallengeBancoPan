from ..connection import Aws, Pan
import json
from datetime import datetime
import oracledb

class ClienteController:
    def __init__(self):
        pass

    def autenticarAws(self, cpf, senha):
        try:
            print(type(cpf))
            with Aws.Aws.connect() as conn:
                sql = 'SELECT * FROM clientes WHERE cpf=:1 AND senha=:2'
                with conn.cursor() as cursor:
                    cursor.execute(sql,[cpf,senha])
                    for row in cursor.fetchone():
                        print(row)

                    # print(lista)
        except:
            print("Login não encontrado na AWS")
            return False
        else:
          return True


    def autenticarPan(self, cpf, senha):
        try:
            with Pan.Oracle.connect() as conn:
                sql = 'SELECT codCliente FROM clientes WHERE cpf=:1 AND senha=:2'
                
                with conn.cursor() as cursor:
                    cursor.execute(sql,[cpf,senha])
                    for row in cursor.fetchone():
                        pass
   
        except:
            print("Login não encontrado no Banco Pan")
            return False
        else:
            return True

    def pesquisarDadosPan(cpf):
        try:
            sql = 'SELECT JSON_OBJECT(*) FROM clientes WHERE cpf=:1'
            with Pan.Oracle.connect() as conn:

                with conn.cursor() as cursor:
                    cursor.execute(sql,[cpf])
                    
                    for row in cursor.fetchone():
                         dados = row
                    
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            # print("Customer ID already exists")
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
            print('Erro')
        else:
            print('Recuperado com sucesso')
            return dados
            
    #estamos usando esse método?
    def pesquisarCodClientePan(cpf):
        try:
            sql='SELECT codCliente FROM clientes WHERE cpf=:1'
            with Pan.Oracle.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(sql,[cpf])
                    for row in cursor.fetchone():
                        cod=row[0]
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            # print("Customer ID already exists")
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
            print('Erro')
        else:
            return cod 
             
          

    def cadastrarAws(cpf, nome, sobrenome , rg, dataNasc,genero,profissao, renda, estadoCiv , etnia , email, senha):
        try:
       
            sql = "INSERT INTO CLIENTES (cpf, nome, sobrenome , rg, dataNasc,genero,profissao, renda, estadoCiv , etnia, email, senha) VALUES(:1, :2, :3, :4, TO_DATE(:5 ,'YYYY-MM-DD'), :6, :7, :8, :9, :10, :11, :12)"   
           
            with Aws.Aws.connect() as conn:

                with conn.cursor() as cursor:
                    cursor.execute(sql, [cpf, nome, sobrenome , rg ,dataNasc,genero,profissao,renda, estadoCiv , etnia , email, senha])
                    # id = cursor.lastrowid
                    # print("Ultimo id adicionado do cliente: ", id)

                conn.commit()  

        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
            return False
        else:
            print('Cliente cadastrado com sucesso')
            return True

    def pesquisarCodClienteAws(cpf):
        try:
            sql='SELECT codCliente FROM clientes WHERE cpf=:1'
            with Aws.Aws.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(sql,[cpf])
                    for row in cursor.fetchone():
                        cod=str(row)
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao buscar codCliente Aws')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
        else:
            print("Cod do cliente Aws buscado")
            return cod
        
    def buscarProdutos(cpf):
            try:
                sql = 'SELECT p.codProd, p.nome FROM clientes c INNER JOIN produtos p ON c.codprod=p.codprod WHERE cpf=:1 ORDER BY p.codProd'
                with Pan.Oracle.connect() as conn:

                    with conn.cursor() as cursor:
                        cursor.execute(sql, [cpf])
                        
                        dict=[]
                        
                        for row in cursor.fetchall():
                            cod = str(row[0])
                            nome = str(row[1])
                            dict.append([cod, nome])
                            
            except oracledb.IntegrityError as e:
                error_obj, = e.args
                print('Erro no buscar produtos')
                print('Erro ao buscar codCliente Aws')
                print("Error Code:", error_obj.code)
                print("Error Full Code:", error_obj.full_code)
                print("Error Message:", error_obj.message)
            else:
                print('Produtos buscados')
                return dict

    def buscarCpf(codCliente):
        try:
            sql='SELECT cpf FROM clientes WHERE codCliente=:1'
            with Aws.Aws.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(sql,[codCliente])
                    for row in cursor.fetchone():
                        cod=str(row)
        except oracledb.IntegrityError as e:
            error_obj, = e.args
            print('Erro ao buscar cpf Aws')
            print("Error Code:", error_obj.code)
            print("Error Full Code:", error_obj.full_code)
            print("Error Message:", error_obj.message)
        else:
            print("cpf Aws buscado")
            return cod
