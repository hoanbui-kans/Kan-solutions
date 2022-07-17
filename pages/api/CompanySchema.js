const Name = ["Trần Ðình Hợp","Nguyễn Bách Du","Nguyễn Chí Anh","Đỗ Phú Hưng","Thạch Chấn Hưng","Đoàn Hồng Việt","Phạm Triều Thành","Nguyễn Huy Phong","Chung Nhật Thịnh","Tạ Mạnh Hà","Đỗ Hồng Hà","Úc Diễm Phúc","Giang Hồng Nhung","La Ngọc Yến","Hà Thanh Giang","Dương Trúc Ly","Hoàng Minh Hà","Tống Hải Uyên","Tạ Ðông Tuyền","Hồ Thanh Thảo","Hồ Khắc Minh","Bành Ðông Nguyên","Phan Ðức Tài","Tạ Khắc Trọng","Tôn Tạ Hiền","Vưu Khải Hòa","Vương Gia Minh","Bùi Thanh Phong","Ngô Quốc Thịnh","Nguyễn Duy Hoàng","Chung Yến Phượng","Văn Mộng Nguyệt","Nguyễn An Bình","Đặng Hồng Linh","Nguyễn Quỳnh Lâm","Nguyễn Lưu Ly","Hồ Cẩm Yến","Nguyễn Ngân Trúc","Đàm Thanh Nhàn","Bạch Tuệ Nhi","Vũ Khánh Minh","Phan Quang Thạch","Lê Thuận Toàn","Doãn An Cơ","Tô Minh Trung","Thi Anh Tài","Chung Thế Minh","Mai Hoàng Khôi","Ngư Phi Hùng","Lâm Ðình Ðôn","Quách Kiều Dung","Trần Xuân Thảo","Vũ Thu Ngọc","Dương Quỳnh Lam","Lý Thiên Di","Kim Tuyết Hương","Diệp Thùy Oanh","Vưu Thanh An","Vương Thiên Tuyền","Chu Tâm Như"];

let review = '';
Name.map((val, index) => {
    let score = 5;
    if(index % 2 == 0){
        score = 4;
    }
    if(index != 0 ){
        review += `,{
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "${score}",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "${val}"
            }
        }`;
    } else {
        review += `{
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "${score}",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "${val}"
            }
        }`;
    }
})

export const CompanySchema = `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "image": [
    "https://kanbox.vn/wp-content/uploads/2022/07/Anh-dai-dien-giao-dien-plant-moe.jpg",
    "https://kanbox.vn/wp-content/uploads/2022/07/webproject-kanbox.vn-2022.07.13-15_14_59.jpg",
    "https://kanbox.vn/wp-content/uploads/2022/07/webproject-kanbox.vn-2022.07.07-14_29_36.jpg"
   ],
  "name": "Công ty TNHH Giải Pháp Kan",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tầng 4 Block A Centana Thủ Thiêm",
    "addressLocality": "Hồ Chí Minh",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "60"
   },
  "review": [${review}],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.790619,
    "longitude": 106.752068
  },
  "url": "https://kansite.com.vn/",
  "telephone": "+84 39 219 3639",
  "priceRange": "1200000",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "17:30"
  },
  "sameAs": "https://kansite.com.vn/",
  "department": {
    "@type": "ProfessionalService",
    "name": "Bộ phận kỹ thuật",
    "image": "https://kanbox.vn/wp-content/uploads/2022/06/desktop-website-presentation-mockup_68185-281.webp",
    "telephone": "+84903888781",
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "17:30"
    }, 
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tầng 4 Block A Centana Thủ Thiêm",
        "addressLocality": "Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      },
     "priceRange": "3000000"
  }
}`
