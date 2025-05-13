# NestedScrollIssue

This is my React Native Reproducer project.
---

## 🐛 Description  
When you nest a horizontal `ScrollView` with touchable tabs inside a vertical `ScrollView` (or `SectionList`) that uses `stickyHeaderIndices`, the horizontal scroll still works, but the individual tab `TouchableOpacity` buttons no longer fire their `onPress` once the header becomes pinned. As soon as you scroll back up even one pixel and the header unsticks, the buttons work again.

---

# Reproducer TODO list

- [x] 1. Create a new reproducer project.
- [x] 2. Git clone your repository locally.
- [x] 3. Edit the project to reproduce the failure you're seeing.
- [x] 4. Push your changes, so that Github Actions can run the CI.
- [x] 5. Make sure the repository is public and share the link with the issue you reported.

# How to use this Reproducer

This project has been created with `npx @react-native-community/cli init` and is a vanilla React Native app.

> [!IMPORTANT]  
> Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) so that you have a working environment locally.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start  Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start _Android_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```



## ✅ Expected Behavior  
Tab buttons inside the horizontal `ScrollView` should always fire their `onPress` handlers, whether the header is pinned or not.

---

## ❌ Actual Behavior  
While the header is stuck at the top, the `TouchableOpacity` tabs do not receive touch events, even though horizontal scrolling still works.

---

## 📋 Environment  
- **React Native version:** 0.79.2 
- **Platform:**  Android  
- **Reproducible in:** Clean new project and existing codebase  
- **Device/Simulator:**  Pixel 4 (Android 12)

---

## 🔧 Workarounds Tried  
- `pointerEvents="box-none"` on wrapping `<View>` + `pointerEvents="auto"` on inner `<ScrollView>`  
- `onStartShouldSetResponder={() => true}` on horizontal `<ScrollView>`  
- `removeClippedSubviews={false}` on outer `<ScrollView>`  
*(All restore horizontal scrolling but do not restore tab presses when sticky.)*

---

## 📎 Additional Context  
This also affects nested scrolls outside of `stickyHeaderIndices`—touchables inside any “pinned” overlay lose their responder. Seems like a touch-responder regression in RN 0.79’s sticky/nested scrolling logic.

---

**Please let me know if you need any more details or logs!**

