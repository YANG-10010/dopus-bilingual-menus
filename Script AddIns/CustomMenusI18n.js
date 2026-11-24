// CustomMenusI18n.js (v1.2.0)
// Automatically switches the 3 custom menus (UI / Tabs / Select) on Directory Opus toolbars
// between Chinese and English following Directory Opus UI language or Windows display language.

var LABEL_PAIRS = [
  [
    "\u754c\u9762(&amp;U)",
    "&amp;UI"
  ],
  [
    "\u80cc\u666f[\u5de6\u952e\u7eff\u5e95/\u53f3\u952e\u7070\u5e95]",
    "&amp;Background [LMB: Green / RMB: Gray]"
  ],
  [
    "\u7eff\u5e95",
    "&amp;Green Tint"
  ],
  [
    "\u7070\u5e95",
    "G&amp;ray Tint"
  ],
  [
    "\u542f\u7528\u5927\u5c0f\u76f8\u5bf9\u56fe\u5f62",
    "R&amp;elative Size Graphs"
  ],
  [
    "\u542f\u7528\u65e5\u671f\u76f8\u5bf9\u56fe\u5f62",
    "&amp;Relative Date Graphs"
  ],
  [
    "\u663e\u793a\u53cb\u597d\u65e5\u671f",
    "&amp;Show Friendly Dates"
  ],
  [
    "\u542f\u7528\u6807\u8bb0\u5206\u914d",
    "E&amp;nable Label Assignments"
  ],
  [
    "\u542f\u7528\u7f51\u683c\u6362\u884c",
    "&amp;Horizontal Grid Lines"
  ],
  [
    "\u542f\u7528\u7eb5\u5217\u7f51\u683c\u7ebf",
    "&amp;Vertical Grid Lines"
  ],
  [
    "\u542f\u7528[\u521b\u5efa+\u4fee\u6539]\u8ddd\u4eca",
    "&amp;Toggle [Created + Modified] Age"
  ],
  [
    "\u542f\u7528[\u540d\u79f0\u957f\u5ea6]\u6392\u5e8f",
    "S&amp;ort by [Name Length]"
  ],
  [
    "\u5207\u6362[\u5e73\u9762\u663e\u793a+\u6309\u7c7b\u578b\u5206\u7ec4]",
    "To&amp;ggle [Flat View + Group by Type]"
  ],
  [
    "\u6298\u53e0/\u5c55\u5f00\u6240\u6709\u7ec4",
    "&amp;Collapse/Expand All Groups"
  ],
  [
    "\u5207\u6362[\u5e73\u9762\u663e\u793a+\u6309\u6ce8\u91ca\u5206\u7ec4]",
    "Togg&amp;le [Flat View + Group by Comment]"
  ],
  [
    "\u6807\u7b7e(&amp;B)",
    "Ta&amp;bs"
  ],
  [
    "\u6807\u7b7e\u4f4d\u7f6e",
    "Ta&amp;b Position"
  ],
  [
    "\u7eb5\u5217\u76f8\u8fd1",
    "&amp;Vertical Together"
  ],
  [
    "\u6a2a\u884c\u76f8\u8fd1",
    "&amp;Horizontal Together"
  ],
  [
    "\u5c45\u4e0a",
    "Tabs &amp;Above"
  ],
  [
    "\u5c45\u4e0b",
    "Tabs &amp;Below"
  ],
  [
    "\u5c45\u5de6",
    "Tabs &amp;Left"
  ],
  [
    "\u5c45\u53f3",
    "Tabs &amp;Right"
  ],
  [
    "\u76f8\u8fd1",
    "&amp;Together"
  ],
  [
    "\u76f8\u8fdc",
    "A&amp;part"
  ],
  [
    "\u8bbe\u7f6e\u6807\u7b7e\u5bbd\u5ea6\u4e3a120",
    "&amp;Set Tab Width to 120"
  ],
  [
    "\u9996\u9009\u9879\u6807\u7b7e\u8bbe\u7f6e",
    "Tab Ba&amp;r Preferences..."
  ],
  [
    "\u5728\u65b0\u6807\u7b7e\u4e2d\u6253\u5f00\u8def\u5f84",
    "&amp;Open Path in New Tab"
  ],
  [
    "\u6253\u5f00\u9009\u5b9a\u6587\u4ef6\u5939\u5230\u76ee\u6807\u680f",
    "Open Selected in Dest Tab"
  ],
  [
    "\u79fb\u52a8\u6807\u7b7e\u5230\u76ee\u6807\u680f(&amp;Y)",
    "Move Tab to Dest (&amp;Y)"
  ],
  [
    "\u4ece\u5f53\u524d\u6807\u7b7e\u62c6\u5206\u4e3a\u53cc\u680f(&amp;F)",
    "Split Tabs to Dual (&amp;F)"
  ],
  [
    "\u53cc\u680f\u65f6\u5408\u5e76\u6240\u6709\u6807\u7b7e\u5230\u5355\u680f",
    "&amp;Merge Dual Tabs into Single Pane"
  ],
  [
    "\u6253\u5f00\u9009\u5b9a\u9879\u7684\u4e0a\u7ea7\u76ee\u5f55\u5230\u76ee\u6807\u680f",
    "Open Container in Dest Tab"
  ],
  [
    "\u65b0\u5efa\u7a7a\u6807\u7b7e(&amp;K)",
    "New Blank Tab (&amp;K)"
  ],
  [
    "\u5173\u95ed\u6807\u7b7e(&amp;C)",
    "&amp;Close Tabs"
  ],
  [
    "\u5173\u95ed\u5de6\u4fa7\u6807\u7b7e",
    "Cl&amp;ose Tabs to the Left"
  ],
  [
    "\u5173\u95ed\u53f3\u4fa7\u6807\u7b7e\\t",
    "Clo&amp;se Tabs to the Right\\t"
  ],
  [
    "\u5173\u95ed\u5176\u4ed6\u6807\u7b7e",
    "&amp;Close Other Tabs"
  ],
  [
    "\u5173\u95ed\u91cd\u590d\u6807\u7b7e(&amp;D)",
    "Close &amp;Duplicate Tabs"
  ],
  [
    "\u5173\u95ed\u542b\u6709 C: \u6807\u7b7e",
    "C&amp;lose C: Drive Tabs"
  ],
  [
    "\u6062\u590d\u5173\u95ed\u7684\u6807\u7b7e\u9875",
    "Reopen Close&amp;d Tab"
  ],
  [
    "\u6700\u8fd1\u5173\u95ed\u7684\u6807\u7b7e\u9875(&amp;TabRescue)",
    "Recently Closed (&amp;TabRescue)"
  ],
  [
    "\u6e05\u9664\u5386\u53f2\u5173\u95ed\u6807\u7b7e",
    "&amp;Clear Closed Tab History"
  ],
  [
    "\u6807\u7b7e\u5207\u6362\u83dc\u5355(&amp;S)",
    "Tab &amp;Switcher Menu"
  ],
  [
    "\u6807\u7b7e\u5217\u8868",
    "Ta&amp;b List"
  ],
  [
    "\u6807\u7b7e\u5b9a\u4f4d(&amp;A)",
    "Go to T&amp;ab"
  ],
  [
    "\u6700\u53f3\u7684\u6807\u7b7e",
    "&amp;Last Tab"
  ],
  [
    "\u7b2c 1 \u4e2a\u6807\u7b7e",
    "Tab &amp;1"
  ],
  [
    "\u7b2c 2 \u4e2a\u6807\u7b7e",
    "Tab &amp;2"
  ],
  [
    "\u7b2c 3 \u4e2a\u6807\u7b7e",
    "Tab &amp;3"
  ],
  [
    "\u7b2c 4 \u4e2a\u6807\u7b7e",
    "Tab &amp;4"
  ],
  [
    "\u7b2c 5 \u4e2a\u6807\u7b7e",
    "Tab &amp;5"
  ],
  [
    "\u7b2c 6 \u4e2a\u6807\u7b7e",
    "Tab &amp;6"
  ],
  [
    "\u7b2c 7 \u4e2a\u6807\u7b7e",
    "Tab &amp;7"
  ],
  [
    "\u7b2c 8 \u4e2a\u6807\u7b7e",
    "Tab &amp;8"
  ],
  [
    "\u7b2c 9 \u4e2a\u6807\u7b7e",
    "Tab &amp;9"
  ],
  [
    "\u7b2c10\u4e2a\u6807\u7b7e",
    "Tab 1&amp;0"
  ],
  [
    "\u6700\u53f3\u7684\u6807\u7b7e(\u76ee\u6807)",
    "L&amp;ast Tab (Dest)"
  ],
  [
    "\u7b2c 1 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 1 (Dest)"
  ],
  [
    "\u7b2c 2 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 2 (Dest)"
  ],
  [
    "\u7b2c 3 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 3 (Dest)"
  ],
  [
    "\u7b2c 4 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 4 (Dest)"
  ],
  [
    "\u7b2c 5 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 5 (Dest)"
  ],
  [
    "\u7b2c 6 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 6 (Dest)"
  ],
  [
    "\u7b2c 7 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 7 (Dest)"
  ],
  [
    "\u7b2c 8 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 8 (Dest)"
  ],
  [
    "\u7b2c 9 \u4e2a\u6807\u7b7e(\u76ee\u6807)",
    "Tab 9 (Dest)"
  ],
  [
    "\u4e0a\u4e00\u4e2a\u6807\u7b7e",
    "&amp;Previous Tab"
  ],
  [
    "\u4e0b\u4e00\u4e2a\u6807\u7b7e",
    "&amp;Next Tab"
  ],
  [
    "\u6807\u7b7e\u5411\u5de6\u79fb",
    "&amp;Move Tab Left"
  ],
  [
    "\u6807\u7b7e\u5411\u53f3\u79fb",
    "Mo&amp;ve Tab Right"
  ],
  [
    "\u6700\u8fd1\u4e24\u4e2a\u6807\u7b7e\u4e4b\u95f4\u5207\u6362",
    "Switch Between Last Two Tabs"
  ],
  [
    "\u6807\u7b7e\u989c\u8272",
    "Tab C&amp;olor"
  ],
  [
    "\u7ea2\u8272",
    "&amp;Red"
  ],
  [
    "\u7eff\u8272",
    "&amp;Green"
  ],
  [
    "\u84dd\u8272",
    "&amp;Blue"
  ],
  [
    "\u9ec4\u8272",
    "&amp;Yellow"
  ],
  [
    "\u7d2b\u8272",
    "&amp;Magenta"
  ],
  [
    "\u5929\u84dd",
    "&amp;Cyan"
  ],
  [
    "\u9752\u9ec4",
    "&amp;Lime"
  ],
  [
    "\u6a59\u8272",
    "&amp;Orange"
  ],
  [
    "\u6697\u7d2b",
    "Dark &amp;Purple"
  ],
  [
    "\u6697\u7ea2",
    "&amp;Dark Red"
  ],
  [
    "\u6697\u7eff",
    "Dar&amp;k Green"
  ],
  [
    "\u6697\u84dd",
    "D&amp;ark Blue"
  ],
  [
    "\u767d\u8272",
    "&amp;White"
  ],
  [
    "\u9ed1\u8272",
    "Blac&amp;k"
  ],
  [
    "\u6e05\u9664\u6807\u7b7e\u989c\u8272",
    "Cl&amp;ear Tab Color"
  ],
  [
    "\u9501\u5b9a\u6807\u7b7e(&amp;L)",
    "&amp;Lock Tab"
  ],
  [
    "\u94fe\u63a5\u6807\u7b7e",
    "Lin&amp;k Tab"
  ],
  [
    "\u5207\u6362\u6765\u6e90/\u76ee\u6807\u680f",
    "Switch So&amp;urce/Dest Pane"
  ],
  [
    "\u4ea4\u6362\u53cc\u680f\u4e2d\u5f53\u524d\u6807\u7b7e",
    "Swap Active Tabs"
  ],
  [
    "\u4ea4\u6362\u53cc\u680f",
    "S&amp;wap Dual Panes"
  ],
  [
    "\u6807\u7b7e\u6392\u5e8f",
    "Sort Tabs"
  ],
  [
    "\u8f6c\u5230\u539f\u59cb\u8def\u5f84",
    "Go to &amp;Initial Folder"
  ],
  [
    "\u8f6c\u5230\u6807\u7b7e\u7684\u9501\u5b9a\u8def\u5f84",
    "&amp;Go to Locked Folder"
  ],
  [
    "\u590d\u5236\u6240\u6709\u6807\u7b7e\u7684\u8def\u5f84",
    "Copy All Tab Pat&amp;hs"
  ],
  [
    "\u4e3a\u6240\u6709\u6807\u7b7e\u521b\u5efa\u5feb\u6377\u65b9\u5f0f",
    "Create Shortcuts for All Tabs"
  ],
  [
    "\u9009\u62e9(&amp;X)",
    "Select (&amp;X)"
  ],
  [
    "\u6eda\u5c4f\u5230\u9009\u5b9a\u9879\\t\u7a7a\u683c,Caps / Ctrl+\\",
    "Scroll to Selection\\tSpace,Caps / Ctrl+\\"
  ],
  [
    "\u9ad8\u7ea7\u9009\u62e9",
    "Ad&amp;vanced Selection..."
  ],
  [
    "\u53d6\u6d88\u9009\u62e9",
    "Deselect All (Save to RAM)"
  ],
  [
    "\u53d6\u6d88\u9009\u62e9(\u53cc\u680f)",
    "Deselect All (Both &amp;Panes)"
  ],
  [
    "\u4fdd\u5b58\u9009\u62e9\u5230...",
    "Sa&amp;ve Selection To..."
  ],
  [
    "\u526a\u8d34\u677f\\t(UNC     +Ctrl)",
    "&amp;Clipboard\\t(UNC     +Ctrl)"
  ],
  [
    "\u6587\u4ef6...",
    "&amp;File..."
  ],
  [
    "\u5185\u5b58 | \u81ea\u5b9a\u540d..",
    "Memory | &amp;Custom ID.."
  ],
  [
    "\u5185\u5b58 | \u9ed8\u8ba4",
    "Memory | &amp;Default"
  ],
  [
    "\u5185\u5b58 | \u69fd\u4f4d #01",
    "Memory | Slot #0&amp;1"
  ],
  [
    "\u5185\u5b58 | \u69fd\u4f4d #02",
    "Memory | Slot #0&amp;2"
  ],
  [
    "\u5185\u5b58 | \u69fd\u4f4d #03",
    "Memory | Slot #0&amp;3"
  ],
  [
    "\u52a0\u8f7d\u9009\u62e9\u4ece...",
    "Load Selection Fro&amp;m..."
  ],
  [
    "\u526a\u8d34\u677f\\t(GO    +Ctrl)",
    "&amp;Clipboard\\t(GO    +Ctrl)"
  ],
  [
    "\u6587\u4ef6...\\t(GO    +Ctrl)",
    "&amp;File...\\t(GO    +Ctrl)"
  ],
  [
    "\u5185\u5b58 | \u4e0b\u62c9...\\t(GO  +Ctrl) ",
    "Memory | &amp;Dropdown...\\t(GO  +Ctrl) "
  ],
  [
    "\u5185\u5b58 | \u9ed8\u8ba4\\t(GO    +Ctrl)",
    "Memory | D&amp;efault\\t(GO    +Ctrl)"
  ],
  [
    "\u5185\u5b58 | \u69fd\u4f4d #01\\t(GO    +Ctrl)",
    "Memory | Slot #0&amp;1\\t(GO    +Ctrl)"
  ],
  [
    "\u5185\u5b58 | \u69fd\u4f4d #02\\t(GO    +Ctrl)",
    "Memory | Slot #0&amp;2\\t(GO    +Ctrl)"
  ],
  [
    "\u5185\u5b58 | \u69fd\u4f4d #03\\t(GO    +Ctrl)",
    "Memory | Slot #0&amp;3\\t(GO    +Ctrl)"
  ],
  [
    "\u6e05\u9664\u5df2\u4fdd\u5b58\u7684\u9009\u62e9",
    "Clear Saved Selections"
  ],
  [
    "\u9009\u62e9\u6700\u540e\u4e00\u9879",
    "Se&amp;lect Last Item"
  ],
  [
    "\u9009\u62e9\u7b2c\u4e00\u4e2a\u6587\u4ef6",
    "Select F&amp;irst File"
  ],
  [
    "\u9009\u62e9\u7b2c\u4e00\u4e2a\u6587\u4ef6\u5939",
    "Select First F&amp;older"
  ],
  [
    "\u95f4\u9694\u4e00\u884c\u9009\u62e9 (&amp;2)",
    "Select Every &amp;2nd Item"
  ],
  [
    "\u95f4\u9694\u9009\u62e9\u7b2cN\u4e2a",
    "Select Ever&amp;y N-th Item..."
  ],
  [
    "\u4ec5\u9009\u62e9\u6587\u4ef6",
    "&amp;Select Files Only"
  ],
  [
    "\u4ec5\u9009\u62e9\u6587\u4ef6\u5939",
    "S&amp;elect Folders Only"
  ],
  [
    "\u8fde\u7eed\u9009\u62e9\u4e0b\u4e00\u4e2a\\tInsert",
    "Se&amp;lect Next Row\\tInsert"
  ],
  [
    "\u8fde\u7eed\u9009\u62e9\u4e0a\u4e00\u4e2a\\tShift+Insert",
    "Sele&amp;ct Previous Row\\tShift+Insert"
  ],
  [
    "\u6240\u6709\u7a97\u53e3\u9009\u62e9\u4e0a\u4e00\u4e2a",
    "Selec&amp;t Previous in All Listers"
  ],
  [
    "\u6240\u6709\u7a97\u53e3\u9009\u62e9\u4e0b\u4e00\u4e2a",
    "Select &amp;Next in All Listers"
  ],
  [
    "\u9009\u62e9\u6700\u65b0\u4fee\u6539\u7684\u6587\u4ef6(&amp;X)",
    "Select Newest Modified File (&amp;X)"
  ],
  [
    "\u9009\u62e9\u6700\u65b0\u521b\u5efa\u7684\u6587\u4ef6(&amp;C)",
    "Select Newest &amp;Created File"
  ],
  [
    "\u9009\u62e9\u6700\u65b0\u7684\u6587\u4ef6++",
    "Select Next Ne&amp;west File++"
  ],
  [
    "\u9009\u62e9\u6700\u5927\u7684\u6587\u4ef6(&amp;D)",
    "Select Largest File (&amp;D)"
  ],
  [
    "\u9009\u62e9 &amp;0 \u5b57\u8282\u6587\u4ef6 (Shift = \u9690\u85cf)",
    "Select &amp;0-Byte Files (Shift = Hide)"
  ],
  [
    "\u9009\u62e9\u7a7a\u6587\u4ef6\u5939(&amp;K)",
    "Select Empty Folders (&amp;K)"
  ],
  [
    "\u9009\u62e9\u6307\u5b9a\u6269\u5c55\u540d",
    "Select &amp;by Extension..."
  ],
  [
    "\u6b63\u5219 | \u6587\u4ef6\u540d\u79f0\u672b\u5c3e\u662f (&amp;n) ",
    "Regex | Name Ends with (&amp;n) "
  ],
  [
    "\u9009\u62e9&amp;500kb\u81f35mb\u5927\u5c0f\u7684\u6587\u4ef6",
    "Select Files &amp;500 KB to 5 MB"
  ],
  [
    "\u9009\u62e9\u4fee\u6539\u65e5\u671f\u5728\u6307\u5b9a\u533a\u95f4\u5185\u7684\u6587\u4ef6",
    "&amp;Select Modified in Date Range..."
  ],
  [
    "\u9009\u62e9\u521b\u5efa\u65e5\u671f\u5728\u6307\u5b9a\u533a\u95f4\u5185\u7684\u6587\u4ef6",
    "Se&amp;lect Created in Date Range..."
  ],
  [
    "\u9009\u62e9\u4fee\u6539\u65f6\u95f4\u5728\u4e09\u5929\u5185\u7684\u6587\u4ef6",
    "Sele&amp;ct Modified Within 3 Days"
  ],
  [
    "\u9009\u62e9\u5305\u542b\u6307\u5b9a\u6587\u4ef6\u540d\u7684\u6587\u4ef6\u5939",
    "Selec&amp;t Folders Containing File..."
  ],
  [
    "\u6b63\u5219 | \u540d\u79f0\u5305\u542b\u6c49\u5b57\u7684\u6587\u4ef6",
    "&amp;Regex | Files with Chinese Name"
  ],
  [
    "\u7528\u8fc7\u6ee4\u5668(&amp;F)",
    "By &amp;Filter"
  ],
  [
    "\u5355\u4e2a | \u6309\u8fc7\u6ee4\u5668\u9009\u62e9",
    "&amp;Single | Select by Filter"
  ],
  [
    "\u5355\u4e2a | \u6309\u8fc7\u6ee4\u5668\u53d6\u6d88\u9009\u62e9",
    "S&amp;ingle | Deselect by Filter"
  ],
  [
    "\u591a\u4e2a | \u6309\u8fc7\u6ee4\u5668\u9009\u62e9",
    "&amp;Multiple | Select by Filter"
  ],
  [
    "\u591a\u4e2a | \u6309\u8fc7\u6ee4\u5668\u53d6\u6d88\u9009\u62e9",
    "M&amp;ultiple | Deselect by Filter"
  ],
  [
    "\u540d\u79f0\u5305\u542b\u6c49\u5b57",
    "Names with &amp;Chinese Chars"
  ],
  [
    "\u4eca\u5929",
    "&amp;Today"
  ],
  [
    "\u4eca\u5929\u521b\u5efa\u7684\u538b\u7f29\u5305",
    "&amp;Archives Created Today"
  ],
  [
    "\u4eca\u5929\u521b\u5efa\u7684\u6587\u4ef6",
    "&amp;Files Created Today"
  ],
  [
    "\u4eca\u5929\u521b\u5efa\u7684\u6587\u4ef6\u5939",
    "F&amp;olders Created Today"
  ],
  [
    "\u4eca\u5929\u521b\u5efa\u7684\u6587\u4ef6\u5939\u548c\u6587\u4ef6",
    "Folders &amp; Files &amp;Created Today"
  ],
  [
    "\u4eca\u5929\u4fee\u6539\u7684\u6587\u4ef6",
    "Files &amp;Modified Today"
  ],
  [
    "\u4eca\u5929\u4fee\u6539\u7684\u6587\u4ef6\u5939",
    "Fo&amp;lders Modified Today"
  ],
  [
    "\u4eca\u5929\u4fee\u6539\u7684\u6587\u4ef6\u5939\u548c\u6587\u4ef6",
    "Folders &amp; Files Mo&amp;dified Today"
  ],
  [
    "\u6587\u4ef6\u7c7b\u578b(&amp;T)",
    "By File &amp;Type"
  ],
  [
    "\u538b\u7f29\u5305",
    "&amp;Archives"
  ],
  [
    "\u56fe\u50cf\u6587\u4ef6",
    "&amp;Images"
  ],
  [
    "\u97f3\u9891\u6587\u4ef6",
    "A&amp;udio"
  ],
  [
    "\u89c6\u9891\u6587\u4ef6",
    "&amp;Video"
  ],
  [
    "\u6587\u6863\u6587\u4ef6",
    "&amp;Documents"
  ],
  [
    "\u7a0b\u5e8f\u6587\u4ef6",
    "&amp;Programs"
  ],
  [
    "\u9664\u89c6\u9891\u4e4b\u5916\u5168\u90e8",
    "A&amp;ll Except Video"
  ],
  [
    "\u53cc\u680f\u9009\u62e9(&amp;S)",
    "Dual-Pane &amp;Select"
  ],
  [
    "\u6765\u6e90 | \u53cc\u680f\u90fd\u6709",
    "&amp;Source | In Both Panes"
  ],
  [
    "\u76ee\u6807 | \u6765\u6e90\u65e0\u800c\u76ee\u6807\u6709",
    "&amp;Dest | Not in Source"
  ],
  [
    "\u540c\u6269\u5c55\u540d(&amp;E)",
    "Same &amp;Extension"
  ],
  [
    "\u9009\u62e9\u76f8\u540c\u6269\u5c55\u540d(\u7126\u70b9)\\tAlt+=",
    "Select Same Extension (Focus)\\tAlt+="
  ],
  [
    "\u9009\u62e9\u5168\u90e8\u76f8\u540c\u6269\u5c55\u540d",
    "Select Same Extensions (All Selected)"
  ],
  [
    "\u9009\u62e9\u76f8\u540c\u57fa\u672c\u540d(&amp;J)\\t\u7a7a\u683c, J",
    "Select Same Stem (&amp;J)\\tSpace, J"
  ],
  [
    "\u4e0d\u9009\u76f8\u540c\u6269\u5c55\u540d\\tAlt+-",
    "Deselect Same Extension\\tAlt+-"
  ],
  [
    "\u968f\u673a\u9009\u62e9",
    "&amp;Random Selection"
  ],
  [
    "\u968f\u673a\u9009\u62e9\u4e00\u4e2a\u6587\u4ef6",
    "&amp;Select 1 Random Item"
  ],
  [
    "\u968f\u673a\u9009\u62e9\u5e76\u64ad\u653e1\u4e2a\u89c6\u9891\u6587\u4ef6",
    "Select &amp; &amp;Play 1 Random Video"
  ],
  [
    "\u968f\u673a\u9009\u62e9\u6587\u4ef6\u5939\u7f29\u7565\u56fe",
    "Set Random Folder &amp;Thumbnail"
  ],
  [
    "\u968f\u673a\u9009\u62e9 8GB mp3\u4e13\u8f91(\u6587\u4ef6\u5939)",
    "Select &amp;8 GB of Random MP3 Folders"
  ],
  [
    "\u968f\u673a\u5c0610\u4e2a\u6447\u6eda\u4e50\u66f2\u653e\u5165\u6447\u6eda\u6587\u4ef6\u6536\u96c6\u4e2d(\u614e\u7528)",
    "&amp;Collect 10 Random Rock MP3s (Caution)"
  ],
  [
    "\u968f\u673a\u9009\u62e9\u5e76\u5e7b\u706f\u7247\u64ad\u653e20\u4e2a\u56fe\u7247",
    "S&amp;lideshow 20 Random Images"
  ],
  [
    "\u968f\u673a\u9009\u62e9100\u4e2amp3\u6587\u4ef6",
    "Select &amp;100 Random MP3s"
  ],
  [
    "\u968f\u673a\u9009\u62e950%\u9879",
    "Select Random &amp;50% Items"
  ],
  [
    "\u590d\u9009\u6846",
    "C&amp;heckboxes"
  ],
  [
    "\u66f4\u591a...",
    "More Select..."
  ],
  [
    "\u9009\u62e9\u524dx\u4e2a\u6587\u4ef6...",
    "Select First &amp;X Files..."
  ],
  [
    "\u9009\u62e9\u524d20\u4e2a\u6587\u4ef6\u5939",
    "Select First &amp;20 Folders"
  ],
  [
    "\u9009\u62e9\u524d25%\u9879",
    "Select First 2&amp;5% Items"
  ]
];

var LEGACY_EN_LABEL_ALIASES = {
  "above": "\u5c45\u4e0a",
  "below": "\u5c45\u4e0b",
  "left": "\u5c45\u5de6",
  "right": "\u5c45\u53f3",
  "more...": "\u66f4\u591a..."
};

var TIP_PAIRS = [
  [
    "\u7eff\u5e95",
    "Apply green background tint"
  ],
  [
    "\u7070\u5e95",
    "Apply gray background tint"
  ],
  [
    "\u4ec5\u6539\u53d8\u5f53\u524d\u663e\u793a\u7a97\u53e3\uff0c\u4e0d\u4fee\u6539\u9996\u9009\u9879\u914d\u7f6e",
    "Changes current file display only without modifying Preferences"
  ],
  [
    "\u4ec5\u5bf9\u8be6\u60c5\u548c\u589e\u5f3a\u6a21\u5f0f\u6709\u6548\\n\u4ec5\u6539\u53d8\u5f53\u524d\u663e\u793a\u7a97\u53e3\uff0c\u4e0d\u4fee\u6539\u9996\u9009\u9879\u914d\u7f6e",
    "Details and Power modes only\\nChanges current file display only without modifying Preferences"
  ],
  [
    "\u5207\u6362\u5f00\u5173",
    "Toggle on/off"
  ],
  [
    "\u91cd\u7f6e\u4e3a\u9009\u9879\u4e2d\u8bbe\u7f6e\u7684\u6807\u7b7e\u4f4d\u7f6e",
    "Reset tab bar position to Preferences default"
  ],
  [
    "\u53cc\u680f\u65f6\uff0c\u4e24\u8fb9\u7684\u6807\u7b7e\u680f\u9760\u8fd1\u5728\u4e00\u8d77",
    "Place dual-display tab bars next to each other"
  ],
  [
    "\u53cc\u680f\u65f6\uff0c\u4e24\u8fb9\u7684\u6807\u7b7e\u680f\u8fdc\u79bb\u5230\u4e24\u7aef",
    "Place dual-display tab bars on opposite sides"
  ],
  [
    "\u4ec5\u5f53\u6807\u7b7e\u680f\u4f4d\u4e8e\u5de6/\u53f3\u65b9\u624d\u6709\u6548\uff0c\u4f4d\u4e8e\u4e0a/\u4e0b\u65b9\u65e0\u6548",
    "Effective only when the tab bar is on the left or right"
  ],
  [
    "\u82e5\u672a\u9009\u62e9\uff0c\u5219\u5728\u65b0\u6807\u7b7e\u4e2d\u6253\u5f00\u5f53\u524d\u8def\u5f84\\n\u82e5\u9009\u4e2d\u8f6f\u94fe\u63a5\uff0c\u5219\u5728\u65b0\u6807\u7b7e\u4e2d\u6253\u5f00\u5176\u76ee\u6807\\n\u82e5\u6709\u9009\u4e2d\u6587\u4ef6\u5939\uff0c\u5219\u5728\u65b0\u6807\u7b7e\u4e2d\u6253\u5f00\u4e4b\\n\u82e5\u53ea\u9009\u4e2d\u6587\u4ef6\u4e14\u542b\u6709\u5feb\u6377\u65b9\u5f0f(.lnk)\uff0c\u5219\u6253\u5f00\u5176\u76ee\u6807\\n\u672a\u9009\u4e2d.lnk\uff0c\u5219\u5728\u65b0\u6807\u7b7e\u4e2d\u6253\u5f00\u5f53\u524d\u8def\u5f84",
    "Open current folder, selected folders, or symlink/.lnk target in a new tab"
  ],
  [
    "\u82e5\u672a\u9009\u62e9\uff0c\u5219\u5728\u76ee\u6807\u680f\u4e2d\u6253\u5f00\u5f53\u524d\u8def\u5f84\\n\u82e5\u6709\u9009\u4e2d\u6587\u4ef6\u5939\uff0c\u5219\u5728\u76ee\u6807\u5170\u4e2d\u6253\u5f00\u4e4b\\n\u82e5\u53ea\u9009\u4e2d\u6587\u4ef6\u4e14\u9009\u4e2d\u9879\u6709\u5feb\u6377\u65b9\u5f0f(.lnk)\uff0c\u5219\u6253\u5f00\u5176\u6307\u5411\u7684\u76ee\u6807\\n",
    "Open current folder, selected folders, or .lnk target in the destination pane\\n"
  ],
  [
    "\u4ec5\u6709\u4e00\u4e2a\u6807\u7b7e\u65f6\uff0c\u590d\u5236\u5f53\u524d\u6807\u7b7e\u5230\u76ee\u6807\u680f\uff1b\u5426\u5219\u79fb\u52a8\u6807\u7b7e\u5230\u76ee\u6807\u680f",
    "Duplicate tab to destination if only one tab exists; otherwise move tab to destination"
  ],
  [
    "\u4ec5\u5f53\u5355\u680f\u65f6\uff0c\u5c06\u5f53\u524d\u6807\u7b7e\u53ca\u5176\u540e\u6807\u7b7e\u5168\u90e8\u62c6\u5206\u5230\u53cc\u680f\u53e6\u4e00\u8fb9",
    "When in single-display mode, split current and following tabs to the second pane"
  ],
  [
    "\u5728\u865a\u62df\u8def\u5f84\u3001\u67e5\u627e\u7ed3\u679c\u6216\u6587\u4ef6\u6536\u96c6\u4e2d\u6bd4\u8f83\u6709\u7528\\nShift+\u53cc\u51fb\u6587\u4ef6\u540d\u79f0(\u5728\u6587\u4ef6\u7c7b\u578b\u4e2d\u5b9a\u4e49\u7684\u52a8\u4f5c)",
    "Open parent folder of selected items in destination pane (useful in Find Results / Collections)"
  ],
  [
    "\u65b0\u5efa\u7a7a\u6807\u7b7e\u5e76\u805a\u7126\u4e8e\u5730\u5740\u680f",
    "Open a new blank tab and focus the location bar"
  ],
  [
    "\u4ec5\u4fdd\u7559\u5f53\u524d\u6807\u7b7e",
    "Close all tabs except the active tab"
  ],
  [
    "\u5173\u95ed\u6240\u6709\u6253\u5f00C: \u8def\u5f84\u7684\u6807\u7b7e",
    "Close all tabs showing a path on C: drive"
  ],
  [
    "\u91cd\u65b0\u6253\u5f00\u4e0a\u4e00\u4e2a\u6216\u591a\u4e2a\u5df2\u5173\u95ed\u7684\u6807\u7b7e\u9875",
    "Reopen the last closed tab(s)"
  ],
  [
    "\u811a\u672c: TabRescue\uff0c\u7ba1\u7406\u6700\u8fd1\u5173\u95ed\u7684\u6807\u7b7e",
    "Script: TabRescue - manage recently closed tabs"
  ],
  [
    "\u5f39\u51fa\u6807\u7b7e\u5217\u8868\u83dc\u5355\uff0cTab / Shift+Tab \u53ef\u4e0a\u4e0b\u5207\u6362\uff0c\u7a7a\u683c\u6fc0\u6d3b\u4e0d\u6d88\u5931/\u56de\u8f66\u6fc0\u6d3b\u540e\u6d88\u5931",
    "Popup tab switcher menu (Tab/Shift+Tab to navigate, Space to preview, Enter to activate)"
  ],
  [
    "\u5728\u5f53\u524d\u680f\u4e2d\u9009\u62e9\u4e0a\u4e00\u4e2a\u6807\u7b7e",
    "Switch to the previous tab in the active pane"
  ],
  [
    "\u5728\u5f53\u524d\u680f\u4e2d\u9009\u62e9\u4e0b\u4e00\u4e2a\u6807\u7b7e",
    "Switch to the next tab in the active pane"
  ],
  [
    "\u4ea4\u6362\u53cc\u680f",
    "Swap left/right (or top/bottom) dual file displays"
  ],
  [
    "\u8f6c\u5230\u5f53\u524d\u6807\u7b7e\u6253\u5f00\u7684\u539f\u59cb\u8def\u5f84",
    "Navigate back to the initial folder where this tab was opened"
  ],
  [
    "\u6807\u7b7e\u9501\u5b9a\u65f6\u7684\u8def\u5f84",
    "Navigate to the locked home path of this tab"
  ],
  [
    "\u4e3a\u6765\u6e90\u680f\u6240\u6709\u6807\u7b7e\u7684\u8def\u5f84\u521b\u5efa\u5feb\u6377\u65b9\u5f0f\u5230\u76ee\u6807\u680f",
    "Create shortcuts in destination for all folder tabs in the source pane"
  ],
  [
    "\u5728\u6d3b\u52a8\u7a97\u53e3\u4e2d\u7528\u901a\u914d\u7b26\u6a21\u5f0f\u9009\u62e9\u6587\u4ef6\u548c\u6587\u4ef6\u5939",
    "Select files and folders in the active Lister using advanced filter criteria"
  ],
  [
    "\u4fdd\u5b58\u5f53\u524d\u9009\u62e9\u5230\u5185\u5b58\u9ed8\u8ba4\u533a\u540e\uff0c\u53d6\u6d88\u9009\u62e9\\n",
    "Save current selection to default memory slot, then deselect all\\n"
  ],
  [
    "\u4e24\u680f\u540c\u65f6\u53d6\u6d88\u9009\u62e9",
    "Deselect all items in both source and destination panes"
  ],
  [
    "Ctrl+\u70b9\u51fb  \u6253\u5f00\u526a\u8d34\u677f\u4e2d\u7b2c\u4e00\u9879\u6240\u5728\u6587\u4ef6\u5939\uff0c\u5e76\u9009\u62e9\u5b83",
    "Ctrl+Click: Go to the folder of the first clipboard item and select it"
  ],
  [
    "\u4ece\u4e0b\u62c9\u83dc\u5355\u5bfc\u5165\u5185\u5b58\u533a\u4e2d\u7684\u9009\u62e9\u9879\\n\u83dc\u5355\u4e2d\u53ef\u7528\u9996\u5b57\u7b26\u9009\u5219\uff0c\u5982\uff1ad 1 2 3\\nLoad a memorized selection from a dropdown menu",
    "Load a memorized selection from a dropdown menu\\nPress first character (e.g. d, 1, 2, 3) for quick access"
  ],
  [
    "\u6e05\u9664\u5185\u5b58\u533a\u4e2d\u5df2\u4fdd\u5b58\u7684\u9009\u62e9",
    "Clear all selections stored in memory"
  ],
  [
    "\u9009\u62e9\u6700\u540e\u4e00\u9879\uff0c\u5e76\u6eda\u5c4f\u4f7f\u4e4b\u53ef\u89c1",
    "Select the last item and scroll it into view"
  ],
  [
    "\u9009\u62e9\u7b2c\u4e00\u4e2a\u6587\u4ef6\uff0c\u5e76\u6eda\u5c4f\u4f7f\u4e4b\u53ef\u89c1",
    "Select the first file and scroll it into view"
  ],
  [
    "\u9009\u62e9\u7b2c\u4e00\u4e2a\u6587\u4ef6\u5939\uff0c\u5e76\u6eda\u5c4f\u4f7f\u4e4b\u53ef\u89c1",
    "Select the first folder and scroll it into view"
  ],
  [
    "\u5728\u590d\u9009\u6846\u6a21\u5f0f\u4e0b\uff0c\u5219\u662f\u5207\u6362\u52fe\u9009",
    "Select next row (or toggle checkbox in Check-Box Mode)"
  ],
  [
    "\u5f00\u591a\u4e2a\u7a97\u53e3\u9884\u89c8\u56fe\u7247\u65f6\uff0c\u6240\u6709\u7a97\u53e3\u540c\u6b65\u9009\u62e9\u4e0a\u4e00\u4e2a\uff0c\u4fbf\u4e8e\u9884\u89c8\u5bf9\u6bd4",
    "Select the previous item across all open Listers simultaneously"
  ],
  [
    "\u5f00\u591a\u4e2a\u7a97\u53e3\u9884\u89c8\u56fe\u7247\u65f6\uff0c\u6240\u6709\u7a97\u53e3\u540c\u6b65\u9009\u62e9\u4e0b\u4e00\u4e2a\uff0c\u4fbf\u4e8e\u9884\u89c8\u5bf9\u6bd4",
    "Select the next item across all open Listers simultaneously"
  ],
  [
    "\uff08Shift = \u6700\u65e7\uff09",
    "(Shift = Oldest)"
  ],
  [
    "\u8fde\u7eed\u6309\u952e\u5219\u4ece\u65b0\u5411\u65e7\u4f9d\u6b21\u589e\u52a0\u9009\u62e9",
    "Press repeatedly to progressively add newer-to-older files to selection"
  ],
  [
    "\uff08Shift = \u6700\u5c0f\uff09Select largest File (SC = smallest)",
    "Select largest file (Shift = Smallest)"
  ],
  [
    "\u9009\u62e9\u65e0\u4efb\u4f55\u5b50\u6587\u4ef6\u7684\u7a7a\u6587\u4ef6\u5939",
    "Select empty folders that contain no child items"
  ],
  [
    "\u540d\u79f0\u672b\u5c3e\u662f(1) (2)\u7b49",
    "Match names ending with (1), (2), etc."
  ],
  [
    "\u6309\u4fee\u6539\u65f6\u95f4",
    "Filter by modified date range"
  ],
  [
    "\u6309\u521b\u5efa\u65f6\u95f4",
    "Filter by created date range"
  ],
  [
    "\u4ec5\u663e\u793a\u540d\u79f0\u5305\u542b\u6c49\u5b57\u7684",
    "Select items whose names contain Chinese characters"
  ],
  [
    "\u5728\u6765\u6e90\u680f\u4e2d\u9009\u62e9\u53cc\u680f\u90fd\u6709\u7684\u6587\u4ef6",
    "Select items in source that also exist in destination"
  ],
  [
    "\u9009\u62e9\u6765\u6e90\u6587\u4ef6\u5939\u4e2d\u65e0\u800c\u76ee\u6807\u6587\u4ef6\u5939\u4e2d\u6709\u7684\u6587\u4ef6",
    "Select items in destination that do not exist in source"
  ],
  [
    "\u9009\u62e9\u4e0e\u7126\u70b9\u5904\u6587\u4ef6\u5177\u6709\u76f8\u540c\u6269\u5c55\u540d\u7684\u6240\u6709\u6587\u4ef6",
    "Select all files sharing the focused item&apos;s extension"
  ],
  [
    "\u9009\u62e9\u4e0e\u9009\u5b9a\u7684\u6240\u6709\u6587\u4ef6\u5177\u6709\u76f8\u540c\u6269\u5c55\u540d\u7684\u6587\u4ef6",
    "Select all files matching any selected file&apos;s extension"
  ],
  [
    "\u9009\u62e9\u5177\u6709\u76f8\u540c\u57fa\u672c\u540d\u7684\u6587\u4ef6\uff0c\u5ffd\u7565\u6269\u5c55\u540d",
    "Select files with the same filename stem (ignoring extension)"
  ],
  [
    "\u53d6\u6d88\u9009\u62e9\u4e0e\u7126\u70b9\u5904\u6587\u4ef6\u6269\u5c55\u540d\u76f8\u540c\u7684\u6240\u6709\u6587\u4ef6",
    "Deselect all files sharing the focused item&apos;s extension"
  ],
  [
    "\u6709\u4eea\u5f0f\u611f\u7684\u9009\u62e9\u6587\u4ef6",
    "Pick one random item in the current folder"
  ]
];

var TARGET_ROOTS_NORM = {
  "\u754c\u9762(u)": true,
  "ui": true,
  "\u6807\u7b7e(b)": true,
  "tabs": true,
  "\u9009\u62e9(x)": true,
  "select (x)": true
};

var g_lastStateKey = "";

function normKey(s) {
  return String(s)
    .replace(/&apos;/g, "'")
    .replace(/&amp;(?=\S)/g, "")
    .toLowerCase();
}

function safeStr(id, fallback) {
  try {
    var v = DOpus.strings.Get(id);
    if (v && String(v).length > 0) return String(v);
  } catch (e) {}
  return fallback;
}

function OnInit(initData) {
  initData.name = "CustomMenusI18n";
  initData.version = "1.2.0";
  initData.copyright = "(c) 2026";
  initData.desc = safeStr("ScriptDesc", "Automatically switches custom menus (UI / Tabs / Select) between Chinese and English with UI language.");
  initData.default_enable = true;
  initData.min_version = "13.0";

  initData.config.LanguageMode = DOpus.Create.Vector(
    0,
    safeStr("ModeOpus", "Follow Directory Opus UI Language (Auto)"),
    safeStr("ModeWin", "Follow Windows System Display Language"),
    safeStr("ModeEn", "Always English"),
    safeStr("ModeZh", "Always Chinese")
  );
  initData.config.TargetToolbars = "Operations.dop,CustomMenus.dop";

  var descMap = DOpus.Create.Map();
  descMap("LanguageMode") = safeStr("ModeDesc", "Choose how the UI (U), Tabs (B), and Select (X) menus switch between English and Chinese.");
  descMap("TargetToolbars") = safeStr("ToolbarsDesc", "Comma-separated toolbar filenames (.dop) in /dopusdata/Buttons to scan and reload.");
  initData.config_desc = descMap;

  var cmd = initData.AddCommand();
  cmd.name = "CustomMenusLang";
  cmd.method = "OnCustomMenusLang";
  cmd.desc = safeStr("CmdDesc", "Switch or sync language of UI / Tabs / Select menus (LANG=auto|en|zh|toggle)");
  cmd.label = safeStr("CmdLabel", "Sync Custom Menus Language");
  cmd.template = "LANG/K[auto,en,zh,toggle],QUIET/S";
}

function OnStartup(startupData) {
  syncMenus("auto", true);
}

function OnOpenLister(openListerData) {
  if (!openListerData.after) {
    return true;
  }
  syncMenus("auto", true);
  return false;
}

function OnActivateLister(activateData) {
  if (!activateData.active) return;
  var key = getCurrentStateKey();
  if (key === g_lastStateKey) return;
  syncMenus("auto", true);
}

function OnScriptConfigChange(configChangeData) {
  g_lastStateKey = "";
  syncMenus("auto", true);
}

function OnCustomMenusLang(scriptCmdData) {
  var args = scriptCmdData.func.args;
  var langArg = args.got_arg.LANG ? String(args.LANG).toLowerCase() : "auto";
  var quiet = args.got_arg.QUIET;
  g_lastStateKey = "";
  var applied = syncMenus(langArg, quiet);
  if (!quiet) {
    DOpus.Output("[CustomMenusLang] Active menu language: " + applied);
  }
}

function getCurrentStateKey() {
  var cfgMode = 0;
  var tbs = "Operations.dop,CustomMenus.dop";
  try {
    if (typeof Script !== "undefined" && Script && Script.config) {
      cfgMode = Number(Script.config.LanguageMode);
      if (Script.config.TargetToolbars) tbs = String(Script.config.TargetToolbars);
    }
  } catch (e) {}
  var opusLang = "";
  try { opusLang = String(DOpus.language || ""); } catch (e2) {}
  return String(cfgMode) + "|" + opusLang.toLowerCase() + "|" + tbs;
}

function detectWindowsLang() {
  try {
    var sh = new ActiveXObject("WScript.Shell");
    try {
      var pref = sh.RegRead("HKCU\\Control Panel\\Desktop\\PreferredUILanguages");
      if (pref !== null && typeof pref !== "undefined") {
        var s = "";
        if (typeof pref.toArray === "function") {
          var arr = pref.toArray();
          if (arr.length > 0) s = String(arr[0]);
        } else {
          s = String(pref);
        }
        if (s.length > 0) {
          return s.toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
        }
      }
    } catch (e1) {}
    try {
      var loc = String(sh.RegRead("HKCU\\Control Panel\\International\\LocaleName")).toLowerCase();
      if (loc.indexOf("zh") === 0) return "zh";
    } catch (e2) {}
  } catch (e) {}
  return "en";
}

function detectOpusLang() {
  try {
    var lang = String(DOpus.language || "").toLowerCase();
    if (lang.indexOf("zh") === 0 || lang.indexOf("ch") === 0) {
      return "zh";
    }
  } catch (e) {}
  return "en";
}

function isCurrentlyEnglish(xmlText) {
  var spans = findTargetMenuSpans(xmlText);
  if (spans.length === 0) return false;
  var block = xmlText.substring(spans[0][0], spans[0][1]);
  var m = /<label>([\s\S]*?)<\/label>/.exec(block);
  if (!m) return false;
  return normKey(m[1]) === "ui";
}

function resolveTargetLang(modeOverride, currentXml) {
  if (modeOverride === "en" || modeOverride === "zh") {
    return modeOverride;
  }
  if (modeOverride === "toggle") {
    return isCurrentlyEnglish(currentXml) ? "zh" : "en";
  }
  var cfgMode = 0;
  try {
    cfgMode = Number(Script.config.LanguageMode);
  } catch (e) {
    cfgMode = 0;
  }
  if (cfgMode === 1) return detectWindowsLang();
  if (cfgMode === 2) return "en";
  if (cfgMode === 3) return "zh";
  return detectOpusLang();
}

function readUtf8WithBom(filePath) {
  var stream = new ActiveXObject("ADODB.Stream");
  stream.Type = 2;
  stream.Charset = "utf-8";
  stream.Open();
  stream.LoadFromFile(filePath);
  var text = stream.ReadText(-1);
  stream.Close();
  if (text.length > 0 && text.charCodeAt(0) === 0xFEFF) {
    text = text.substring(1);
  }
  return text;
}

function writeUtf8WithBom(filePath, text) {
  var stream = new ActiveXObject("ADODB.Stream");
  stream.Type = 2;
  stream.Charset = "utf-8";
  stream.Open();
  stream.WriteText(text);
  stream.SaveToFile(filePath, 2);
  stream.Close();
}

function findTargetMenuSpans(xmlText) {
  var rootMatch = /<buttons\b[^>]*>/.exec(xmlText);
  if (!rootMatch) return [];
  var tagRe = /<(\/?)button\b([^>]*)>/g;
  tagRe.lastIndex = rootMatch.index + rootMatch[0].length;

  var depth = 0;
  var topStart = -1;
  var spans = [];
  var m;
  while ((m = tagRe.exec(xmlText)) !== null) {
    var isClose = m[1] === "/";
    var attrs = m[2];
    var isSelfClose = !isClose && /\/\s*$/.test(attrs);
    if (isSelfClose) continue;

    if (!isClose) {
      if (depth === 0) topStart = m.index;
      depth++;
    } else {
      depth--;
      if (depth === 0 && topStart >= 0) {
        var endPos = m.index + m[0].length;
        var block = xmlText.substring(topStart, endPos);
        var lblMatch = /<label>([\s\S]*?)<\/label>/.exec(block);
        if (lblMatch && TARGET_ROOTS_NORM[normKey(lblMatch[1])] === true) {
          spans.push([topStart, endPos]);
        }
        topStart = -1;
      } else if (depth < 0) {
        break;
      }
    }
  }
  return spans;
}

function buildLookups(targetLang) {
  var lblExact = {};
  var lblNorm = {};
  var tipExact = {};
  var tipNorm = {};
  var i, zh, en;
  if (targetLang === "en") {
    for (i = 0; i < LABEL_PAIRS.length; i++) {
      zh = LABEL_PAIRS[i][0];
      en = LABEL_PAIRS[i][1];
      lblExact[zh] = en;
      lblNorm[normKey(zh)] = en;
    }
    for (i = 0; i < TIP_PAIRS.length; i++) {
      zh = TIP_PAIRS[i][0];
      en = TIP_PAIRS[i][1];
      tipExact[zh] = en;
      tipNorm[normKey(zh)] = en;
    }
  } else {
    for (i = 0; i < LABEL_PAIRS.length; i++) {
      zh = LABEL_PAIRS[i][0];
      en = LABEL_PAIRS[i][1];
      lblExact[en] = zh;
      lblNorm[normKey(en)] = zh;
    }
    for (var k in LEGACY_EN_LABEL_ALIASES) {
      if (Object.prototype.hasOwnProperty.call(LEGACY_EN_LABEL_ALIASES, k)) {
        lblNorm[k] = LEGACY_EN_LABEL_ALIASES[k];
      }
    }
    for (i = 0; i < TIP_PAIRS.length; i++) {
      zh = TIP_PAIRS[i][0];
      en = TIP_PAIRS[i][1];
      tipExact[en] = zh;
      tipNorm[normKey(en)] = zh;
    }
  }
  return { lblExact: lblExact, lblNorm: lblNorm, tipExact: tipExact, tipNorm: tipNorm };
}

function transformMenusXml(xmlText, targetLang) {
  var spans = findTargetMenuSpans(xmlText);
  if (spans.length === 0) return xmlText;

  var lk = buildLookups(targetLang);
  var elemRe = /<(label|tip)>([\s\S]*?)<\/\1>/g;

  var parts = [];
  var last = 0;
  for (var i = 0; i < spans.length; i++) {
    var s = spans[i][0];
    var e = spans[i][1];
    parts.push(xmlText.substring(last, s));
    var block = xmlText.substring(s, e).replace(elemRe, function(full, tag, inner) {
      var exactMap = (tag === "label") ? lk.lblExact : lk.tipExact;
      var normMap = (tag === "label") ? lk.lblNorm : lk.tipNorm;
      if (Object.prototype.hasOwnProperty.call(exactMap, inner)) {
        return "<" + tag + ">" + exactMap[inner] + "</" + tag + ">";
      }
      var nk = normKey(inner);
      if (Object.prototype.hasOwnProperty.call(normMap, nk)) {
        if (targetLang === "en" && !/[\u4e00-\u9fff]/.test(inner)) {
          return full;
        }
        return "<" + tag + ">" + normMap[nk] + "</" + tag + ">";
      }
      if (tag === "tip" && inner === "Displays the Undo Log, which allows you to selectively undo your previous actions") {
        return "<tip>More..</tip>";
      }
      return full;
    });
    parts.push(block);
    last = e;
  }
  parts.push(xmlText.substring(last));
  return parts.join("");
}

function resolveDataDir() {
  try {
    var p = String(DOpus.FSUtil.Resolve("/dopusdata"));
    if (p && p.length > 0) return p.replace(/[\\\/]+$/, "");
  } catch (e) {}
  var sh = new ActiveXObject("WScript.Shell");
  return sh.ExpandEnvironmentStrings("%APPDATA%") + "\\GPSoftware\\Directory Opus";
}

function getTargetToolbarList() {
  var raw = "Operations.dop,CustomMenus.dop";
  try {
    if (typeof Script !== "undefined" && Script && Script.config && Script.config.TargetToolbars) {
      raw = String(Script.config.TargetToolbars);
    }
  } catch (e) {}
  var parts = raw.split(",");
  var out = [];
  for (var i = 0; i < parts.length; i++) {
    var item = parts[i].replace(/^\s+|\s+$/g, "");
    if (item.length > 0) {
      if (!/\.dop$/i.test(item)) item += ".dop";
      out.push(item);
    }
  }
  return out;
}

function syncMenus(modeOverride, quiet) {
  var dataDir = resolveDataDir();
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var toolbars = getTargetToolbarList();
  var resolvedLang = "en";

  try {
    for (var i = 0; i < toolbars.length; i++) {
      var fileName = toolbars[i];
      var dopPath = dataDir + "\\Buttons\\" + fileName;
      if (!fso.FileExists(dopPath)) continue;

      var currentXml = readUtf8WithBom(dopPath);
      if (findTargetMenuSpans(currentXml).length === 0) continue;

      var targetLang = resolveTargetLang(modeOverride || "auto", currentXml);
      resolvedLang = targetLang;
      var updatedXml = transformMenusXml(currentXml, targetLang);

      if (updatedXml !== currentXml) {
        writeUtf8WithBom(dopPath, updatedXml);
        var tbName = fileName.replace(/\.dop$/i, "");
        try {
          var cmd = DOpus.Create.Command();
          cmd.RunCommand('Toolbar NAME="' + tbName + '" RELOAD');
        } catch (reloadErr) {}
      }
    }
    g_lastStateKey = getCurrentStateKey();
    return resolvedLang;
  } catch (err) {
    if (!quiet) {
      DOpus.Output("[CustomMenusI18n] Error: " + err.message);
    }
    return "error";
  }
}

==SCRIPT RESOURCES
<resources>
	<resource type="strings">
		<strings lang="english">
			<string id="ScriptName">Custom Menus Language Sync (UI / Tabs / Select)</string>
			<string id="ScriptDesc">Automatically switches the UI (U), Tabs (B), and Select (X) menus between English and Chinese when UI language changes.</string>
			<string id="ModeOpus">Follow Directory Opus UI Language (Auto)</string>
			<string id="ModeWin">Follow Windows System Display Language</string>
			<string id="ModeEn">Always English</string>
			<string id="ModeZh">Always Chinese</string>
			<string id="ModeDesc">Choose how the UI (U), Tabs (B), and Select (X) menus switch language.</string>
			<string id="ToolbarsDesc">Comma-separated toolbar filenames (.dop) in /dopusdata/Buttons to scan and reload.</string>
			<string id="CmdLabel">Sync Custom Menus Language</string>
			<string id="CmdDesc">Switch or sync language of UI / Tabs / Select menus (LANG=auto|en|zh|toggle)</string>
		</strings>
		<strings lang="chs">
			<string id="ScriptName">自定义菜单中英文自动同步 (界面 / 标签 / 选择)</string>
			<string id="ScriptDesc">随界面语言自动切换工具栏上「界面(U)」「标签(B)」「选择(X)」三个菜单的中英文名称与提示。</string>
			<string id="ModeOpus">跟随 Directory Opus 界面语言 (自动)</string>
			<string id="ModeWin">跟随 Windows 系统显示语言</string>
			<string id="ModeEn">始终显示英文 (English)</string>
			<string id="ModeZh">始终显示中文 (简体中文)</string>
			<string id="ModeDesc">选择「界面(U) / 标签(B) / 选择(X)」菜单语言跟随方式。</string>
			<string id="ToolbarsDesc">需要扫描并自动重载的工具栏文件名（位于 /dopusdata/Buttons，多个用英文逗号分隔）。</string>
			<string id="CmdLabel">同步自定义菜单语言</string>
			<string id="CmdDesc">切换或同步界面/标签/选择菜单语言 (LANG=auto|en|zh|toggle)</string>
		</strings>
		<strings lang="zh">
			<string id="ScriptName">自定义菜单中英文自动同步 (界面 / 标签 / 选择)</string>
			<string id="ScriptDesc">随界面语言自动切换工具栏上「界面(U)」「标签(B)」「选择(X)」三个菜单的中英文名称与提示。</string>
			<string id="ModeOpus">跟随 Directory Opus 界面语言 (自动)</string>
			<string id="ModeWin">跟随 Windows 系统显示语言</string>
			<string id="ModeEn">始终显示英文 (English)</string>
			<string id="ModeZh">始终显示中文 (简体中文)</string>
			<string id="ModeDesc">选择「界面(U) / 标签(B) / 选择(X)」菜单语言跟随方式。</string>
			<string id="ToolbarsDesc">需要扫描并自动重载的工具栏文件名（位于 /dopusdata/Buttons，多个用英文逗号分隔）。</string>
			<string id="CmdLabel">同步自定义菜单语言</string>
			<string id="CmdDesc">切换或同步界面/标签/选择菜单语言 (LANG=auto|en|zh|toggle)</string>
		</strings>
	</resource>
</resources>
