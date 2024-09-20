# BabylonNativeTypeScript
Sample project for how to use Babylon Native with Typescript

Initial setup

```
git submodule update --init --recursive
cd typescript
npm install
npm run build
cd ..
mkdir build
cd build
cmake .. -G <PLATFORM>
```

For Windows, the platform will be `"Visual Studio 17 2022"`