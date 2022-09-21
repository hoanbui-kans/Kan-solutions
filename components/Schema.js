import Head from "next/head";
import { site, siteTitle } from "../next.config";

function strip(html) {
  var one = html.replace(/<\/?[^>]+(>|$)/gm, "");
  var two = one.replace(/[\r\n]\s*[\r\n]/gm, "");
  return two;
}

const LocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Công Ty TNHH Giải Pháp Kan",
  "image": "https://kanbox.vn/wp-content/themes/kanbox/img/logo/logo.svg",
  "@id": "",
  "url": "https://kansite.com.vn/",
  "telephone": "039 219 3639",
  "priceRange": "1500000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tầng 4 Block A Centana Thủ Thiêm, P. An Phú",
    "addressLocality": "Hồ Chí Minh",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.7906183,
    "longitude": 106.7521082
  } ,
  "sameAs": [
    "https://www.youtube.com/channel/UCiBP5UCeRahpOCjZ1fxRKKQ",
    "https://kansite.com.vn/",
    "https://www.facebook.com/KanS-100553286127651"
  ] 
};

const Organization  = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CÔNG TY TNHH GIẢI PHÁP KAN",
  "alternateName": "Kan Solution",
  "url": "https://kansite.com.vn/",
  "logo": "https://kanbox.vn/wp-content/themes/kanbox/img/logo/logo.svg",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "0903 888 781",
    "contactType": "technical support",
    "contactOption": "HearingImpairedSupported",
    "areaServed": "VN",
    "availableLanguage": "Vietnamese"
  },{
    "@type": "ContactPoint",
    "telephone": "039 219 3639",
    "contactType": "customer service",
    "contactOption": "HearingImpairedSupported",
    "areaServed": "VN",
    "availableLanguage": "Vietnamese"
  }],
  "sameAs": [
    "https://www.facebook.com/KanS-100553286127651",
    "https://www.youtube.com/channel/UCiBP5UCeRahpOCjZ1fxRKKQ",
    "https://kansite.com.vn/"
  ]
};

const SchemaSite = () => {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusiness)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(Organization)}} />
    </Head> 
  );
};

export default SchemaSite;