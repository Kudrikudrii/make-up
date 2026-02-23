export default function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Евгения Гаранкина",
    "description": "Профессиональный визажист и стилист по волосам в Москве. Создаю естественные образы, подчеркивающие вашу индивидуальность.",
    "url": "https://evgenia-garankina.ru",
    "image": "https://evgenia-garankina.ru/images/og-image.jpg",
    "sameAs": [
      "https://t.me/GalochkaJohnny",
      "https://vk.com/id18787195",
      "https://wa.me/79641374224"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "priceRange": "₽₽"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}