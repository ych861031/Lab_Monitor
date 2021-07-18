from django.shortcuts import render

from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .db import ConnectDB
import numpy as np
import json
import pytz
tw = pytz.timezone('Asia/Taipei')


class DatabaseViewSet(viewsets.ModelViewSet):

    @api_view(('GET',))
    def serverInfo(request, family=None):
        """
            利用 F,Z 區分不同家server
        """
        # print(request.method)
        # print(family)
        DB = ConnectDB()
        sql = "select * from server_info where `family`='{}';".format(family)
        result = DB.getJsonReponse(sql)

        return JsonResponse(result, status=status.HTTP_200_OK, safe=False)

    @api_view(('GET',))
    def gpuInfo(request, ip=None):
        """
            根據 ip 回傳不同server的gpu資訊
        """
        # print(request.method)
        # print(ip)

        DB = ConnectDB()
        sql = "SELECT * FROM `gpu_info` WHERE `ip`='{}' ORDER BY timestamp DESC LIMIT 4;".format(
            ip)
        df = DB.getDFReponse(sql)

        df = df[:len(np.unique(df["gpu_id"]))]
        df = df.sort_values(by=['gpu_id'], ascending=False)

        df["timestamp"] = df["timestamp"].apply(
            lambda x: int(x.timestamp() - 8 * 3600))

        result = json.loads(df.to_json(orient="records"))

        return JsonResponse(result, status=status.HTTP_200_OK, safe=False)

    @api_view(('GET',))
    def delete_oldInfo(request, ip=None):
        """
            根據 ip 回傳不同server的gpu資訊
        """
        # print(request.method)
        # print(ip)

        DB = ConnectDB()
        sql = "DELETE FROM `gpu_info` WHERE `ip`='{}'".format(ip)
        results = DB.sendRequest(sql)

        return JsonResponse({"status": results}, status=status.HTTP_200_OK, safe=False)
