/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL || 'https://kansite.com.vn',
    generateRobotsTxt: true, // (optional)
    additionalPaths: async (config) => {
        const additionalSlug = [
            // Danh mục bài viết
            "https://kansite.com.vn/danh-muc/goc-tu-van",
            "https://kansite.com.vn/danh-muc/huong-dan-quan-tri-website",
            "https://kansite.com.vn/danh-muc/kien-thuc",
            "https://kansite.com.vn/danh-muc/kinh-doanh-khoi-nghiep",
            "https://kansite.com.vn/danh-muc/quang-cao-online",
            // Bài viết
            "https://kansite.com.vn/bai-viet/crm-doanh-nghiep",
            "https://kansite.com.vn/bai-viet/1840-2",
            "https://kansite.com.vn/bai-viet/next-js",
            "https://kansite.com.vn/bai-viet/tong-quan-ve-react-native",
            "https://kansite.com.vn/bai-viet/cach-toi-uu-ty-le-chuyen-doi-kenh-ban-hang-online-hieu-qua",
            "https://kansite.com.vn/bai-viet/ke-hoach-content-marketing-va-cong-cu-viet-content-marketing-hieu-qua",
            "https://kansite.com.vn/bai-viet/thiet-ke-header-website-trong-nam-2021-mau-header-website",
            "https://kansite.com.vn/bai-viet/dich-vu-quang-cao-google-ads-tu-goc-nhin-marketing-chuyen-nghiep",
            "https://kansite.com.vn/bai-viet/21-y-tuong-viet-content-thu-hut-tren-social-xay-dung-content-cho-fanpage",
            "https://kansite.com.vn/bai-viet/8-buoc-lap-ke-hoach-truyen-thong-xa-hoi-cho-doanh-nghiep-nho-cua-ban",
            "https://kansite.com.vn/bai-viet/cach-xac-dinh-doi-tuong-muc-tieu-cho-doanh-nghiep-cua-ban",
            "https://kansite.com.vn/bai-viet/cong-thuc-viet-content-website-va-quang-cao-hieu-qua-de-tang-doanh-so",
            "https://kansite.com.vn/bai-viet/thiet-ke-website-dich-vu-lam-dep-tham-my-spa-hieu-qua",
            "https://kansite.com.vn/bai-viet/10-ceo-vi-dai-nhat-moi-thoi-dai-nhung-bai-hoc-quan-tri-dinh-cao",
            "https://kansite.com.vn/bai-viet/banh-xe-tuyen-bo-gia-tri-doc-nhat-tu-noi-dau-va-mon-hoi-cua-khach-hang",
            "https://kansite.com.vn/bai-viet/vai-tro-cua-mang-xa-hoi-social-media-va-cac-mang-xa-hoi-quan-trong",
            "https://kansite.com.vn/bai-viet/huong-dan-cach-tao-sua-va-quan-ly-menu-dieu-tren-website-wordpress",
            "https://kansite.com.vn/bai-viet/huong-dan-cap-nhat-noi-dung-footer-hoac-sidebar-cua-website-qua-widget",
            "https://kansite.com.vn/bai-viet/mo-hinh-viet-noi-dung-theo-cum-chu-de-topic-cluster-pillar-page-toi-uu-seo",
            "https://kansite.com.vn/bai-viet/chan-dung-khach-hang-muc-tieu-du-lieu-tiem-nang-cua-doanh-nghiep",
            "https://kansite.com.vn/bai-viet/cach-viet-blog-chuan-voi-9-buoc-tao-ra-chuyen-doi-trong-kinh-doanh-online",
            "https://kansite.com.vn/bai-viet/lap-ke-hoach-noi-dung-dai-han-trong-chien-luoc-inbound-marketing",
            "https://kansite.com.vn/bai-viet/nguyen-tac-lap-ke-hoach-trien-khai-inbound-marketing-hieu-qua-ben-vung",
            "https://kansite.com.vn/bai-viet/chien-luoc-tiep-can-khach-hang-online-hieu-qua-bang-inbound-marketing",
            "https://kansite.com.vn/bai-viet/cach-viet-noi-dung-hieu-qua-cho-trang-web-trong-9-buoc",
            "https://kansite.com.vn/bai-viet/huong-dan-dang-bai-viet-chuan-seo-len-website-wordpress-nhanh-nhat",
            "https://kansite.com.vn/bai-viet/huong-dan-tao-email-ten-mien-moi-sau-khi-cai-dat-yandex-email",
            "https://kansite.com.vn/bai-viet/xay-dung-noi-dung-hieu-qua-tai-lieu-ho-tro-nguoi-dung-chat-luong",
            "https://kansite.com.vn/bai-viet/cach-chon-theme-wordpress-tot-nhat-cho-seo",
            "https://kansite.com.vn/bai-viet/thiet-ke-banner-quang-cao-google-gdn-facebook-lam-tang-ti-le-nhap-chuot",
            "https://kansite.com.vn/bai-viet/tieu-chuan-mot-website-chuyen-nghiep-can-co-trong-xu-huong-kinh-doanh-cung-internet-2022",
            "https://kansite.com.vn/bai-viet/tim-kiem-y-noi-dung-cho-website-vao-tung-thoi-diem-lich-xu-huong-quang-cao",
            "https://kansite.com.vn/bai-viet/nhung-cau-hoi-tai-sao-cho-nguoi-tre-thuc-trang-va-ung-dung-social-media",
            "https://kansite.com.vn/bai-viet/cham-soc-toc-cho-nam-gioi-nhung-dieu-can-biet",
            "https://kansite.com.vn/bai-viet/sap-vuot-toc-nam-cach-chon-san-pham-phu-hop",
            "https://kansite.com.vn/bai-viet/top-5-nuoc-hoa-nam-chinh-hang-duoc-ua-chuong-nhat-hien-nay",
            "https://kansite.com.vn/bai-viet/top-10-nuoc-hoa-nam-duoc-ua-chuong-nhat-tren-the-gioi-ban-nen-biet",
            // Dự án
            "https://kansite.com.vn/du-an/website-kien-truc-xay-dung-skyline",
            "https://kansite.com.vn/du-an/website-ban-hang-my-nghe-viet",
            "https://kansite.com.vn/du-an/website-kinh-doanh-rem-cua-vuong-gia-phat",
            "https://kansite.com.vn/du-an/website-ton-thep-toan-thang",
            "https://kansite.com.vn/du-an/website-cong-ty-sat-thep-thanh-chung",
            "https://kansite.com.vn/du-an/website-xuat-nhap-khau-binh-minh",
            "https://kansite.com.vn/du-an/website-ban-hang-thuc-pham-qt",
            "https://kansite.com.vn/du-an/website-noi-that-cao-cap-plaza",
            "https://kansite.com.vn/du-an/website-ban-giay-minsu",
            "https://kansite.com.vn/du-an/website-nuoc-hoa-the-men-square",
            "https://kansite.com.vn/du-an/website-thu-mua-phe-lieu-uy-vu",
            "https://kansite.com.vn/du-an/website-phong-kham-thu-y-sai-gon-pet",
            "https://kansite.com.vn/du-an/website-kinh-doanh-hoa-chat-phu-gia-dai-hoan-cau",
            "https://kansite.com.vn/du-an/landing-page-gioi-thieu-my-nghe-viet",
            "https://kansite.com.vn/du-an/website-qua-tang-doanh-nghiep-my-nghe-viet",
            // Giao diện mẫu 
            "https://kansite.com.vn/giao-dien/website-ban-cay-canh-plantmore-giao-dien-mau",
            "https://kansite.com.vn/giao-dien/website-me-va-be-kidz-giao-dien-mau",
            "https://kansite.com.vn/giao-dien/website-nen-xa-phong-thu-cong-giao-dien-mau",
            "https://kansite.com.vn/giao-dien/website-ban-xa-phong-savon-giao-dien-mau",
            "https://kansite.com.vn/giao-dien/website-ban-trang-suc-goldish-giao-dien-mau",
            "https://kansite.com.vn/giao-dien/website-ban-sua-mitho-giao-dien-mau",
            "https://kansite.com.vn/giao-dien/website-noi-that-nha-o-giao-dien-k1427",
            "https://kansite.com.vn/giao-dien/website-ban-hang-my-pham-giao-dien-mau-k2037",
            "https://kansite.com.vn/giao-dien/website-landing-page-giao-dien-mau-k2025",
            "https://kansite.com.vn/giao-dien/website-ban-hang-thuc-pham-giao-dien-mau-k1044",
            "https://kansite.com.vn/giao-dien/mau-website-ban-hang-noi-that-kafu01",
            "https://kansite.com.vn/giao-dien/mau-website-ban-hang-cao-cap-ks868",
            "https://kansite.com.vn/giao-dien/landing-website-noi-that-kan",
            // Danh mục giao diện mẫu
            "https://kansite.com.vn/danh-muc-giao-dien/dich-vu",
            "https://kansite.com.vn/danh-muc-giao-dien/khac",
            "https://kansite.com.vn/danh-muc-giao-dien/landing-page",
            "https://kansite.com.vn/danh-muc-giao-dien/web-ban-hang",
            "https://kansite.com.vn/danh-muc-giao-dien/web-cong-ty"
        ];
        const result = [];
        additionalSlug.map((val) => {
        // all possible values
        result.push({
            loc: val,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
          })
        })
        return result
      },
}

module.exports = config