# 馬拉松回憶錄 (Marathon Memories)

這是一個基於 React + Vite + Tailwind CSS 的極簡馬拉松紀錄網站。

## 目錄結構
- `src/types.ts`: 定義紀錄的資料結構。
- `src/memories/`: 存放每篇紀錄的個別檔案 (如 `memory1.ts`)。
- `src/data.ts`: 將所有紀錄整合並導出的地方。
- `public/`: 存放靜態資源，如個人照片。

## 如何新增紀錄
1. 在 `src/memories/` 下複製一份 `.ts` 檔案並修改內容。
2. 在 `src/data.ts` 中 `import` 該檔案並加入 `INITIAL_MEMORIES` 列表。

## 部署到 GitHub Pages
1. 在 GitHub 上建立一個 Repository。
2. 將程式碼推送到 GitHub。
3. 在 Repository 的 **Settings > Pages** 中，將 Source 改為 **GitHub Actions**。
4. 選擇 Vite 專用範本進行部署。

## 本地開發
```bash
npm install
npm run dev
```
