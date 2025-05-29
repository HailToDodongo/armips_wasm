set -e

rm -rf build
mkdir build
cd build

rm -f armips.js
emcmake cmake -DARMIPS_USE_STD_FILESYSTEM=ON -DCMAKE_BUILD_TYPE=Release ..
cmake --build . -j10

# emscripten being stupid :/
# First patch in proper support to set arguments (usually process.argv) from the outside
sed -i -e 's/process.argv/Module.argv/g' armips.js
# Then pass in the instance before running main(), used to setup files in FS
sed -i -e 's/preRun();/preRun(Module);/g' armips.js

cat armips.js ../WASM/armips.js > index.js
