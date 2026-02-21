# 神諭塔羅 · 多平台建置說明 (Tauri v2)

本專案已使用你提供的 icon 產生各平台圖示，並可建置為：

- **Windows**: `.exe` 執行檔 + NSIS/MSI 安裝檔
- **macOS**: `.app` 應用程式（需在 Mac 上建置）
- **Android**: `.apk`（需先初始化 Android 並安裝 Android SDK/NDK）
- **iOS**: `.ipa`（需在 Mac 上建置並安裝 Xcode）

---

## 圖示

- 來源圖已用 `scripts/prepare-icon.mjs` 轉成標準 PNG，並以 `tauri icon` 產生好各平台圖示，位於 `src-tauri/icons/`。
- 之後若要換圖示：把新圖放到專案根目錄為 `app-icon.png`（或任意路徑），然後執行：
  ```bash
  npm run icon -- "路徑/到/你的圖.png"
  npx tauri icon app-icon.png
  ```

---

## 1. Windows 建置（.exe + 安裝檔）

在專案目錄 `tarot-app` 下執行：

```bash
cd tarot-app
npx tauri build
```

完成後：

- **執行檔**: `src-tauri/target/release/tarot-oracle.exe`（或 `app.exe`，依 productName）
- **NSIS 安裝檔**: `src-tauri/target/release/bundle/nsis/tarot-oracle_2.0.0_x64-setup.exe`
- **MSI 安裝檔**: `src-tauri/target/release/bundle/msi/tarot-oracle_2.0.0_x64_en-US.msi`

---

## 2. macOS 建置（.app）

**必須在 Mac 上** 且已安裝 Xcode Command Line Tools（或完整 Xcode）。

```bash
cd tarot-app
npx tauri build
```

產出的 `.app` 在：

- `src-tauri/target/release/bundle/macos/tarot-oracle.app`

若要 **通用二進位（Intel + Apple Silicon）**：

```bash
npx tauri build --target universal-apple-darwin
```

（需已安裝 `aarch64-apple-darwin` 與 `x86_64-apple-darwin` 的 Rust target。）

---

## 3. Android 建置（.apk）

### 3.1 環境

- 安裝 [Android Studio](https://developer.android.com/studio) 或至少 **Android SDK**、**NDK**、**JDK 17+**。
- 設定環境變數，例如：
  - `ANDROID_HOME` = Android SDK 路徑
  - `JAVA_HOME` = JDK 17+ 路徑

### 3.2 初始化 Android（僅第一次）

在專案目錄執行：

```bash
cd tarot-app
npx tauri android init
```

會產生 `src-tauri/gen/android/` 等，並已使用 `src-tauri/icons/android/` 的圖示。

### 3.3 建置 APK

```bash
npx tauri android build -- --apk
```

APK 輸出在：

- `src-tauri/gen/android/app/build/outputs/apk/` 底下（依 variant 有 debug/release 等）。

上架 Google Play 可改用 AAB：

```bash
npx tauri android build -- --aab
```

---

## 4. iOS 建置（.ipa）

**必須在 Mac 上**，且已安裝 **Xcode** 與 **CocoaPods**。

### 4.1 初始化 iOS（僅第一次）

```bash
cd tarot-app
npx tauri ios init
```

會產生 `src-tauri/gen/apple/`，並使用 `src-tauri/icons/ios/` 的圖示。

### 4.2 建置 IPA

```bash
npx tauri ios build
```

產出的 IPA 在：

- `src-tauri/gen/apple/build/` 底下（依 scheme 與 archive 路徑可能不同，Xcode 會提示）。

上架前需在 Xcode 中設定簽名與 App ID，並依 Apple 規定做歸檔與上傳。

---

## 快速指令整理

| 平台     | 指令 |
|----------|------|
| Windows  | `npx tauri build` |
| macOS    | 在 Mac 上執行 `npx tauri build` |
| Android  | 先 `npx tauri android init`，再 `npx tauri android build -- --apk` |
| iOS      | 先 `npx tauri ios init`，再 `npx tauri ios build` |

圖示已全部用你提供的塔羅 icon 產生，無需再改即可用於上述各平台建置。
