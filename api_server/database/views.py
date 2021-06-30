from django.shortcuts import render

from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .db import ConnectDB
import numpy as np
import json


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
        sql = "SELECT * FROM `gpu_info` WHERE `ip`='{}' ORDER BY timestamp DESC LIMIT 10;".format(
            ip)
        df = DB.getDFReponse(sql)

        df = df[:len(np.unique(df["gpu_id"]))]
        result = json.loads(df.to_json(orient="records"))

        return JsonResponse(result, status=status.HTTP_200_OK, safe=False)
