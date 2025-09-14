**RenalFlow** *- From daily metrics to better kidney care*



# 前期准备

## 功能列表

### 用户账号管理

-   **注册 / 登录**：邮箱 + 密码注册，JWT 登录认证
-   **密码安全**：密码加密（bcrypt），可选密码重置
-   **用户资料管理**：基本信息（姓名、年龄、性别等）；可选慢性肾病信息（阶段、医生联系方式）



### 健康指标记录

-   **基础指标（每日可记录）**：体重、睡眠、饮水量
-   **关键医学指标（周期性录入）**：血压、尿常规、肾功能、血常规等（周期 3-6 个月）
-   **数据验证**：输入值合法性检查
-   **历史记录管理**：增删改查



### 数据可视化

-   历史数据折线图、平均值和变化率
-   AI根据现有的指标作基础的建议 （例如血压高 → 建议少盐）



### 日期管理

-   复查日期提醒
-   家庭医生面诊日期提醒



### 数据导出

下载 Excel / CSV



### 最新研究分享

-   自动抓取或后台管理上传最新肾病相关新闻 （也可以人工上传或通过开放API/RSS）
-   分享科研成果、临床指南、治疗进展
-   支持按主题或时间筛选



### 社区论坛

-   用户可发帖、评论、点赞
-   分类讨论：经验分享、饮食、运动、用药管理
-   可匿名或实名
-   热门/最新帖子排序



## 技术栈



### 前端（手机 App）

-   **框架**：React Native + TypeScript
-   **开发工具**：Expo（快速构建、热重载、打包、发布）
-   **页面导航**：React Navigation
-   **图表可视化**：Victory Native 或 React Native Charts Wrapper
-   **状态管理**：Zustand / Redux（全局状态管理）
-   **样式布局**：Flexbox + Tailwind RN / Styled Components



### 后端（业务逻辑）

-   **框架**：Node.js + Express + TypeScript
-   **认证与安全**：
    -   JWT（用户认证与授权）
    -   bcrypt（密码加密）
-   **定时任务**：node-cron / node-schedule（研究资讯定时更新）
-   **API 请求**：Axios / fetch（App 调用后端接口）



### 数据存储

-   **数据库**：MongoDB / AWS DocumentDB
    -   存储健康指标、论坛帖子、资讯内容
    -   文档型数据库，适合 JSON 格式数据
-   **本地缓存**（可选）：AsyncStorage 或 SQLite，用于离线数据



### 测试

-   **前端组件**：Jest + React Native Testing Library
-   **后端 API**：Jest + Supertest 或 Mocha + Chai
-   **覆盖范围**：前后端核心功能，保证数据正确性



### 部署（AWS + Expo）

-   **前端**：
    -   用 **Expo 打包 App**
    -   发布到 iOS / Android 测试用户
-   **后端**：
    -   AWS Elastic Beanstalk / EC2 部署 Node.js + Express
    -   API 提供给 App 调用
-   **数据库**：
    -   AWS DocumentDB / MongoDB Atlas 托管
-   **安全**：
    -   HTTPS（Elastic Beanstalk / API Gateway + ACM 证书）
-   **CI/CD 可选**：
    -   GitHub + AWS CodePipeline / Expo OTA 更新



### 其他功能技术

-   **RSS / 公共 API**：获取最新肾病新闻和研究
-   **论坛功能**：帖子、评论、点赞（嵌套文档 + MongoDB 集合引用）
-   **数据导出**：生成 CSV / Excel（`json2csv` 或 `xlsx` 库）



## 项目流程



### **阶段 0：明确目标**

-   **项目定位**：简化版健康管理系统，以慢性肾病用户为核心，包含社区和资讯模块
-   **项目目的**：
    -   练习全栈开发（TypeScript + Node.js + React Native）
    -   展示技术能力和产品思维
    -   可作为简历亮点或作品展示

------

### **阶段 1：基础全栈框架搭建**

-   **初始化项目**
    -   React Native + Expo + TypeScript 初始化前端 App
    -   Node.js + Express + TypeScript 初始化后端
    -   MongoDB 本地或云端数据库连接
-   **项目结构规划**
    -   前端文件夹：组件、页面、导航、状态管理
    -   后端文件夹：路由、控制器、模型、服务层
-   **基础运行环境**
    -   前端能在模拟器或真机启动
    -   后端能启动并连接数据库
    -   API 测试工具（Postman / Insomnia）准备好



------

### **阶段 2：核心功能实现**

-   **用户管理**
    -   注册 / 登录 / JWT 验证
    -   用户资料管理（姓名、性别、慢性肾病阶段）
-   **健康指标记录**
    -   基础指标（每日可记录）：体重、睡眠、饮水量
    -   关键医学指标（周期性录入）：血压、尿常规、肾功能等
    -   CRUD + 数据验证
-   **数据可视化**
    -   折线图展示历史数据
    -   趋势计算（平均值、变化率）
    -   基础规则引擎 AI 提示（例如血压偏高 → 建议少盐）



------

### **阶段 3：附加功能**

-   **日期提醒**
    -   复查日期提醒
    -   家庭医生面诊日期提醒
    -   手机推送通知（React Native Push Notifications）
-   **社区论坛**
    -   用户可发帖、评论、点赞
    -   分类讨论：经验分享、饮食、运动、用药管理
    -   热门 / 最新帖子排序
-   **最新研究与资讯**
    -   初期：人工上传或通过公开 RSS / API
    -   后期：可扩展定时抓取或后台管理上传
    -   支持按主题或时间筛选
-   **数据导出**
    -   生成 CSV / Excel（`json2csv` 或 `xlsx` 库）

------

### **阶段 4：测试**

-   **前端组件测试**：Jest + React Native Testing Library
-   **后端 API 测试**：Jest + Supertest / Mocha + Chai
-   目标：覆盖主要功能，保证数据正确性

------

### **阶段 5：部署**

-   **前端**：
    -   用 Expo 打包 App
    -   发布到 iOS / Android 测试用户
-   **后端**：
    -   AWS Elastic Beanstalk / EC2 部署 Node.js + Express
    -   API 提供给 App 调用
-   **数据库**：
    -   AWS DocumentDB / MongoDB Atlas 托管
-   **安全**：
    -   HTTPS（Elastic Beanstalk / API Gateway + ACM 证书）
-   **CI/CD 可选**：
    -   GitHub + AWS CodePipeline / Expo OTA 更新

------

### **阶段 6：简历 / 展示优化**

-   项目名称 + tagline

-   功能列表和截图 / GIF 展示界面

-   技术栈与亮点说明

-   量化可展示功能：

    -   “支持每日指标追踪，折线图可视化趋势”

    -   “论坛帖子互动，资讯模块按主题筛选”



### **阶段 7：升级阶段 / 长期优化**

-   **目标**：提供更自然的手机体验
-   **做法**：
    -   推送通知提醒复查和面诊
    -   相机或传感器（可选上传测量结果）
    -   离线缓存健康指标（AsyncStorage / SQLite）
-   **优势**：
    -   更贴合用户日常使用场景
    -   发布到 iOS 和 Android

## Github

克隆项目

```
git clone git@github.com:hl3012/renal_flow.git
```

进入到克隆的文件夹

创建分支 （按照功能）

```
git checkout -b feature/init-project
```



#  项目初始化





## 创建标准化的项目结构

在你的本地`RenalFlow`文件夹中，运行以下命令来创建项目结构：

```
# 进入你的项目根目录
cd RenalFlow

# 创建主要目录结构
mkdir mobile server docs

# 创建重要的配置文件
touch README.md .gitignore
```



现在你的项目结构应该是这样的：

```
RenalFlow/
├── mobile/          # 前端React Native项目
├── server/          # 后端Node.js项目
├── docs/            # 项目文档
├── README.md        # 项目说明文档
└── .gitignore       # Git忽略文件
```



## 初始化前端项目 (React Native + Expo)

```
# 进入mobile目录
cd mobile

# 使用Expo和TypeScript模板初始化项目
npx create-expo-app@latest . --template

# 选择模板时，使用方向键选择 "Blank (TypeScript)"，然后按回车
```



等待初始化完成后，安装一些必要的依赖：

```
# 导航相关
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# 状态管理 (Zustand)
npm install zustand

# 图表库
npm install victory-native
# 或者如果上面安装有问题，可以尝试
npx expo install react-native-svg
npm install victory-native
```



## 初始化后端项目 (Node.js + Express + TypeScript)

```
# 回到项目根目录，然后进入server目录
cd ../server

# 初始化Node.js项目
npm init -y

# 安装生产依赖
npm install express cors helmet morgan bcryptjs jsonwebtoken mongoose dotenv

# 安装TypeScript开发依赖
npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken ts-node-dev

# 初始化TypeScript配置
npx tsc --init
```



现在配置TypeScript，编辑`server/tsconfig.json`：

```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```



创建后端源代码结构：

```
# 在server目录下创建src文件夹和子文件夹
mkdir -p src/controllers src/models src/routes src/middleware src/services src/utils

# 创建主要的服务器文件
touch src/index.ts src/app.ts

# 创建环境变量示例文件
touch .env.example
```







## 配置Git忽略文件和README

编辑根目录的`.gitignore`文件：

```.gitignore
# Dependencies
node_modules/
*/node_modules/

# Production builds
dist/
*/dist/
*.tgz
*.tar.gz

# Environment variables
.env
*.env.local
*.env.development.local
*.env.test.local
*.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Expo
.expo/
.expo-shared/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```



编辑`README.md`文件：



## 配置Package.json脚本

编辑`server/package.json`，添加这些scripts：

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "clean": "rm -rf dist",
  "test": "echo \"Error: no test specified\" && exit 1"
}

```



## 最终项目结构

```
RenalFlow/
├── 📁 mobile/                          # 前端 React Native Expo 项目
│   ├── 📁 assets/                      # 静态资源（图片、字体等）
│   ├── 📁 components/                  # 可复用组件
│   ├── 📁 screens/                     # 页面组件
│   ├── 📁 navigation/                  # 路由导航配置
│   ├── 📁 store/                       # Zustand 状态管理
│   ├── 📁 utils/                       # 工具函数
│   ├── App.tsx                         # 应用入口文件
│   ├── app.json                        # Expo 配置文件
│   ├── package.json                    # 前端依赖
│   └── tsconfig.json                   # 前端 TypeScript 配置
│
├── 📁 server/                          # 后端 Node.js Express API
│   ├── 📁 src/                         # 源代码目录
│   │   ├── 📁 controllers/             # 控制器（处理业务逻辑）
│   │   ├── 📁 models/                  # 数据模型（Mongoose Schemas）
│   │   ├── 📁 routes/                  # 路由定义
│   │   ├── 📁 middleware/              # 中间件（认证、验证等）
│   │   ├── 📁 services/                # 服务层（业务逻辑）
│   │   ├── 📁 utils/                   # 工具函数
│   │   ├── 📁 types/                   # TypeScript 类型定义
│   │   ├── app.ts                      # Express 应用配置
│   │   └── index.ts                    # 服务器入口文件
│   ├── .env.example                    # 环境变量示例
│   ├── package.json                    # 后端依赖
│   └── tsconfig.json                   # 后端 TypeScript 配置
│
├── 📁 docs/                            # 项目文档
│   ├── API.md                          # API 接口文档
│   ├── SETUP.md                        # 设置指南
│   └── ARCHITECTURE.md                 # 架构说明
│
├── .gitignore                         # Git 忽略文件配置
├── README.md                          # 项目总说明文档
└── 📁 .git/                           # Git 版本控制目录（自动生成）
```



## 测试项目初始化

### 测试后端

创建`server/src/index.ts`：

```typescript
console.log('Server initialized');
```

在server文件夹下

```
npm run dev
```

### 测试前端

`mobile/App.tsx`

```tsx
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Test!</Text>
    </View>
  );
}
```

在mobile文件夹下

```
npx expo start
```

在手机上下载Expo Go 扫描二维码



## Git

```
# 查看本地所有分支 *开头的是当前所在分支
git branch
# 创建并切换到新分支
git checkout -b feature/login       # 新功能分支
# 只是切换到新分支
git checkout feature/login 
# 之后你修改文件、提交
git add .
git commit -m "feat: add login page"
git push -u origin feature/login    # 推送到远程
```





