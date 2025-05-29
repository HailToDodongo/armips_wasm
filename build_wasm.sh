set -e

rm -rf build
mkdir build
cd build

emcmake cmake -DARMIPS_USE_STD_FILESYSTEM=ON -DCMAKE_BUILD_TYPE=Release ..
cmake --build . -j10
