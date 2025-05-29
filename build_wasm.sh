set -e

rm -rf build
mkdir build
cd build

rm -f armips.js
emcmake cmake -DARMIPS_USE_STD_FILESYSTEM=ON -DCMAKE_BUILD_TYPE=Release ..
cmake --build . -j10

# remove call to "run();"
truncate -s -7 armips.js

cat armips.js ../WASM/armips.js > armips_api.js
