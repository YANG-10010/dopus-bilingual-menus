# Directory Opus Bilingual Power Menus (`UI` / `Tabs` / `Select`)

一套面向 **Directory Opus 13** 的增强型中英双语菜单组（**`界面(U) / UI`**、**`标签(B) / Tabs`**、**`选择(X) / Select (X)`**），内含 210+ 项高频视图控制、多标签页管理与高级文件选择功能，并配套编写了 **`CustomMenusI18n.js`** 自动语言同步插件，支持随 Directory Opus 界面语言（或 Windows 系统显示语言）在中英文之间**自动无损切换**。

A power-user menu suite (**`UI`**, **`Tabs`**, **`Select (X)`**) for **Directory Opus 13**, featuring 210+ view toggles, tab management scripts, and advanced selection utilities, paired with **`CustomMenusI18n.js`** to automatically switch all menu labels and tooltips between **English** and **Simplified Chinese** whenever your UI language changes.

---

## 目录 / Contents

- [功能概览 / Features](#功能概览--features)
- [环境要求与三方依赖清单 / Requirements & Dependencies](#环境要求与三方依赖清单--requirements--dependencies)
- [快速安装 / Installation](#快速安装--installation)
- [语言自动切换与配置 / Language Sync & Configuration](#语言自动切换与配置--language-sync--configuration)
- [仓库目录结构 / Repository Structure](#仓库目录结构--repository-structure)
- [致谢与开源说明 / Credits & License](#致谢与开源说明--credits--license)

---

## 功能概览 / Features

| 中文菜单 | English Menu | 快捷键 / Hotkey | 核心功能概览 / Key Capabilities |
| :--- | :--- | :---: | :--- |
| **`界面(&U)`** | **`UI`** (`&UI`) | `Alt + U` | 绿底/灰底护眼背景切换、大小/日期相对图形条、网格横纵线、**创建/修改距今列**、**按文件名长度排序**、平面视图+按扩展名/注释分组一键切换与折叠 |
| **`标签(&B)`** | **`Tabs`** (`Ta&bs`) | `Alt + B` | 标签栏位置快捷调整（上下左右/双栏相近或远离）、智能在新标签/目标栏打开文件夹或 `.lnk`/软链接目标、单双栏拆分与合并、关闭左/右/其他/重复标签、标签着色/锁定/链接/字母排序、批量复制所有标签路径或生成快捷方式 |
| **`选择(&X)`** | **`Select (X)`** (`Select (&X)`) | `Alt + X` | 滚屏到选中项、取消选择时自动存入内存槽位、保存/加载选择集（剪贴板/文件/内存槽位 `#01`~`#03`）、间隔选择第 $N$ 项、跨所有窗口同步上下选图对比、按最新/最旧/最大/最小/`0`字节/空目录/正则选择、按预设过滤器或文件类型选择、双栏差异选择、随机抽选 |

### 为什么需要 `CustomMenusI18n.js` 插件？
Directory Opus 自带的语言切换器只能翻译官方默认命令（如 `Re&name`、`&Copy Files`），而纯菜单容器（`type="menu"`）既没有函数体（无法使用 `@label:=` 表达式），`@label` 也无法动态修改 `<tip>` 悬停提示。

`CustomMenusI18n.js` 利用 DOpus 13.13+ 新增的 `Toolbar RELOAD` 机制与归一化双向词典（自动兼容 DOpus 语言切换时重排 `&` 助记符、单引号转义等行为），实现 **189 项菜单标题 + 53 项中文悬停提示**的中英 100% 无损互转。

---

## 环境要求与三方依赖清单 / Requirements & Dependencies

这组菜单源自社区增强配置整理与二次改造，部分高级按钮依赖第三方脚本插件与 Directory Opus 配置项。本仓库已将可随包分发的脚本与配置整理在 [`Dependencies/`](./Dependencies) 目录中。

### 1. 基础运行环境 / Core Environment
- **操作系统**：Windows 10 / 11（依赖系统内置 ActiveScripting `JScript`、`ADODB.Stream`、`WScript.Shell`）
- **Directory Opus 版本**：**13.13 及以上**（已在 **13.22** 验证；热重载依赖 13.13 新增的 `Toolbar ... RELOAD` 参数及 v13 评估器语法）
- **语言包**：如需切换简体中文界面，需确保 DOpus 安装目录 `Language\` 下包含 `zh.opusml`

### 2. 已随包附带的第三方插件（位于 `Dependencies/Script AddIns/`）

| 插件文件 | 作者 / 来源 | 用途说明 | 是否必装 |
| :--- | :--- | :--- | :---: |
| **`Command.Generic_SelectEx.js`** (`v0.5.8`) | **tbone** ([DOpus Forum](https://resource.dopus.com/t/command-generic-selectex-extended-select-command/20577)) | 提供 `SelectEx` 命令，`Select (X)` 菜单中有 **40 处**功能依赖它（内存槽位保存/加载选择、间隔选择第 $N$ 项、滚屏定位、过滤器下拉选择、随机抽选等） | **强烈推荐（核心依赖）** |
| **`Column.FileAge.js`** (`v1.0.0`) | **bytim** | 提供 `scp:FileAge/Modify` 与 `scp:FileAge/Create` 双语脚本列，供 `UI -> 启用[创建+修改]距今` 按钮调用 | 推荐 |

### 3. 已随包附带的 Opus 配置文件（位于 `Dependencies/`）

| 配置文件 | 目标位置 (`/dopusdata` 下) | 对应菜单功能 | 说明 |
| :--- | :--- | :--- | :--- |
| **`Filters/*.ofi`**（共 15 个） | `Filters\` | `Select -> By Filter (用过滤器)` 与 `By File Type (文件类型)` | 包含 `名称包含汉字.ofi`、`今天创建的压缩包.ofi`、`类型 压缩包.ofi` 等 15 个过滤器规则（已采用跨语言通配符/正则编写，中英文界面通用） |
| **`ConfigFiles/evalcols.oxc`** | `ConfigFiles\evalcols.oxc` | `UI -> Sort by [Name Length] (启用[名称长度]排序)` | 定义关键字为 `namelength`（表达式 `Len(name)`）的评估器列（`eval:namelength`）。若你已有自定义评估器列，可在 `Preferences -> File Display Columns -> Evaluator Columns` 手动新建 `namelength` = `Len(name)` |
| **`ConfigFiles/colorgroups.oxc`** + **`foldercolors.oxc`** | `ConfigFiles\` | `UI -> Enable Label Assignments (启用标记分配)` | 定义 `三天内修改`、`空文件夹`、`程序文件`、`图片`、`音视频`、`压缩文件`、`文档` 7 条颜色标记过滤规则（注：部分规则匹配中文文件类型组名） |
| **`Icons/DOpus9.dis`** | `Icons\DOpus9.dis` | `Select -> Random Selection -> Slideshow 20 Random Images` | 提供 `#DOpus9:thumbnails` 图标显示 |

### 4. 可选外部扩展（未内置，仅个别按钮使用）
以下扩展仅在 2～3 个细分按钮中用到，不安装完全不影响其余 200+ 项功能：
- **[TabRescue](https://resource.dopus.com/t/tabrescue-quickly-restore-your-closed-tabs/55768)**（作者 `errante`）：仅 `Tabs -> Recently Closed (TabRescue)` 按钮调用；其上方的 `Reopen Closed Tab` 使用 DOpus 原生 `Go TABUNDOCLOSE`，无需插件即可恢复关闭的标签页。
- **`ClipboardEx`**（作者 `tbone`）：仅在按住 `Ctrl` 点击 `Save Selection To -> Clipboard` 时调用（普通点击使用原生 `Clipboard COPYNAMES`）。
- **`SendKeys`**：仅在开启复选框模式（Check-Box Mode）且使用 `Select Next Row (Insert)` 时调用。
- **可选第三方图标包** `Program_Icos.dis` / `Windows_icos_plus.dis`：有 4 个菜单项引用了其中的图标名称，未安装时仅该项图标留空，不影响点击功能。

---

## 快速安装 / Installation

### 方式一：PowerShell 一键安装（推荐）

支持标准安装版（`%APPDATA%\GPSoftware\Directory Opus`）及绿色便携版（通过 `-OpusDataPath` 指定 `_Data\Directory Opus` 路径）：

```powershell
# 1. 标准安装版（安装双语菜单栏 + 自动同步插件 + SelectEx / FileAge / 15个过滤器 / DOpus9图标）
powershell -ExecutionPolicy Bypass -File .\install.ps1

# 2. 绿色便携版（指定你的 _Data\Directory Opus 路径）
powershell -ExecutionPolicy Bypass -File .\install.ps1 -OpusDataPath "D:\Directory Opus\_Data\Directory Opus"

# 3. 同时覆盖安装评估器列 (evalcols.oxc) 与颜色标记规则 (colorgroups/foldercolors.oxc，会自动备份原文件)
powershell -ExecutionPolicy Bypass -File .\install.ps1 -InstallLabelAndEvalConfigs
```

启用菜单栏（二选一）：
1. **作为独立工具栏启用**：在 DOpus 工具栏空白处右键 -> `Toolbars` -> 勾选 **`CustomMenus`**。
2. **合并进你现有的 `Operations` 工具栏**：右键工具栏选择 `Customize (自定义)`，将 [`Buttons/SingleMenus/EN/`](./Buttons/SingleMenus/EN)（或 `ZH/`）下的三个 `.dcf` 文件直接拖入你的 `Operations` 工具栏最前面即可！`CustomMenusI18n.js` 默认同时监控 `Operations.dop` 与 `CustomMenus.dop`。

### 方式二：手动复制安装
在 Directory Opus 地址栏输入 `/dopusdata` 回车打开配置目录：
1. 将 `Script AddIns/CustomMenusI18n.js` 与 `Dependencies/Script AddIns/*.js` 复制到 `/dopusdata\Script AddIns\`
2. 将 `Buttons/CustomMenus.dop` 复制到 `/dopusdata\Buttons\`（或自定义模式下拖入 `Buttons/SingleMenus/` 下的 `.dcf`）
3. 将 `Dependencies/Filters/*.ofi` 复制到 `/dopusdata\Filters\`
4. 如需使用 `启用[名称长度]排序`，在 **首选项 -> 文件显示列 -> 评估器列 (Evaluator Columns)** 中新建一列：
   - **标题 (Title)**：`名称长度`（或 `Name Length`）
   - **关键字 (Keyword)**：`namelength`
   - **代码**：`Len(name)`

---

## 语言自动切换与配置 / Language Sync & Configuration

### 1. 自动跟随模式
安装 `CustomMenusI18n.js` 后，打开 **`Preferences -> Toolbars -> Scripts`**，选中 **`CustomMenusI18n`** 点击 **Configure**：

- **`LanguageMode`（语言跟随策略）**：
  - `Follow Directory Opus UI Language (Auto)` *(默认)*：跟随 DOpus 自身界面语言（`Preferences -> User Interface -> Language` 切换中英文并重启后自动同步）。
  - `Follow Windows System Display Language`：跟随 Windows 操作系统显示语言。
  - `Always English`：始终保持英文。
  - `Always Chinese`：始终保持简体中文。
- **`TargetToolbars`（监控工具栏列表）**：
  - 默认值：`Operations.dop,CustomMenus.dop`。如果你将这三个菜单拖到了其他自定义工具栏（例如 `MyBar.dop`），把文件名加进去即可自动同步并热重载。

### 2. 免重启实时切换命令
在 Directory Opus 文件列表中按 `>` 调出命令行，随时可执行内部命令 **`CustomMenusLang`**：

```text
CustomMenusLang LANG=toggle   // 一键在中英文之间实时来回切换（免重启）
CustomMenusLang LANG=en       // 立即切换为英文
CustomMenusLang LANG=zh       // 立即切换为简体中文
CustomMenusLang LANG=auto     // 按当前配置的跟随策略重新同步
```

---

## 仓库目录结构 / Repository Structure

```text
├── README.md                              # 中英双语说明文档与依赖配置指南
├── install.ps1                            # PowerShell 一键安装与备份脚本
├── LICENSE                                # MIT 许可证及第三方组件声明
├── Buttons/
│   ├── CustomMenus.dop                    # 独立工具栏（含 UI / Tabs / Select 三大菜单）
│   ├── Variants/
│   │   ├── CustomMenus.en.dop             # 英文版工具栏参考副本
│   │   └── CustomMenus.zh.dop             # 中文版工具栏参考副本
│   └── SingleMenus/
│       ├── EN/ (01_UI.dcf, 02_Tabs.dcf, 03_Select.dcf)
│       └── ZH/ (01_界面(U).dcf, 02_标签(B).dcf, 03_选择(X).dcf)
├── Script AddIns/
│   └── CustomMenusI18n.js                 # 中英文自动同步与热重载插件 (v1.2.0)
└── Dependencies/
    ├── Script AddIns/
    │   ├── Command.Generic_SelectEx.js    # tbone: SelectEx 高级选择命令扩展
    │   └── Column.FileAge.js              # bytim: FileAge 创建/修改距今列
    ├── ConfigFiles/
    │   ├── evalcols.oxc                   # namelength 评估器列配置
    │   ├── colorgroups.oxc                # 颜色分组定义
    │   ├── foldercolors.oxc               # 7 项标记分配过滤规则
    │   └── groups.oxr                     # 标准文件类型组参考配置
    ├── Filters/                           # 15 个 .ofi 选择过滤器配置
    └── Icons/
        └── DOpus9.dis                     # DOpus9 经典图标包
```

---

## 致谢与开源说明 / Credits & License

- 本项目中的 `CustomMenusI18n.js` 同步引擎、过滤规则生成与安装工具采用 [MIT License](./LICENSE) 开源。
- 菜单中的第三方脚本插件版权归各自原作者所有：
  - `Command.Generic_SelectEx.js` © **tbone** ([Directory Opus Resource Centre](https://resource.dopus.com/))
  - `Column.FileAge.js` © 2024 **bytim**
  - 部分中文菜单结构与内联脚本整理自 Directory Opus 中文社区分享方案。
