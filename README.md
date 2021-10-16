# Lab_Monitor  

設計此系統讓使用者方便及時查看server資訊(GPU使用率、內存使用率、溫度)，系統分為三大架構:  
* 安裝docker container將server資訊傳送至NAS中Database
* Django實作RESTful api接口至Database抓取所需資料
* 前端頁面以React.js撰寫，使用者發送請求查看訊息  

### 架構圖
![image](https://github.com/ych861031/Lab_Monitor/blob/main/架構圖.jpg)  

### Demo video
![image](https://github.com/ych861031/Lab_Monitor/blob/main/Lab_Monitor.gif)  

以顏色區分使用率  
* 綠色: <40%  
* 黃色: 41%~80%  
* 紅色: >80%  

![image](https://github.com/ych861031/Lab_Monitor/blob/main/demoIMG.jpg)
