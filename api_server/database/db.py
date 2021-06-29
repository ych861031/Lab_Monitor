import pandas as pd
import pymysql
import json


class ConnectDB():
    def conn(self):
        db_settings = {
            "host": "140.115.51.128",
            "port": 3306,
            "user": "python",
            "password": "python35328",
            "db": "server",
            "charset": "utf8"
        }
        try:
            connect = pymysql.connect(**db_settings)
        except Exception as e:
            print(e)
        return connect

    def getJsonReponse(self, sql):
        conn = self.conn()
        with conn.cursor() as cursor:
            df = pd.read_sql(sql, con=conn)
        return json.loads(df.to_json(orient='records'))

    def getDFReponse(self, sql):
        conn = self.conn()
        with conn.cursor() as cursor:
            df = pd.read_sql(sql, con=conn)
        return df
