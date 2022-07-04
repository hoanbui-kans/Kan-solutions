/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL || 'https://kansite.com.vn',
    generateRobotsTxt: true, // (optional)
    additionalPaths: async (config) => {
        const additionalSlug = [
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
            "https://kansite.com.vn/bai-viet/top-10-nuoc-hoa-nam-duoc-ua-chuong-nhat-tren-the-gioi-ban-nen-biet"
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