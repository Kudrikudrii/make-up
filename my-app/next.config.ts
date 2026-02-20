import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // отключаем оптимизацию
  },
  // Остальные настройки можно пока закомментировать
  // env: {
  //   nextImageExportOptimizer_quality: '80',
  //   nextImageExportOptimizer_storePicturesInWebP: 'true',
  //   nextImageExportOptimizer_exportFolderPath: 'out',
  //   nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  // },
};

export default nextConfig;