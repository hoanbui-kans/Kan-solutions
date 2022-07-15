import Wordpress from '../../public/icons/wordpress.svg';
import ReactIcons from '../../public/icons/react.svg';
import NextJs from '../../public/icons/nextjs.svg';
import API from '../../public/icons/api.svg';
import NativeApp from '../../public/icons/nativeapp.svg';
import CRM from '../../public/icons/crm.svg';

// Services box
import Code from '../../public/icons/code.svg';
import Magic from '../../public/icons/magic.svg';
import Box from '../../public/icons/box.svg';

export const listServices = [
    {
        name: 'Wordpress',
        image: Wordpress,
        link: '/dich-vu/tao-website-lading-page-tu-dong'
    },{
        name: 'React app',
        image: ReactIcons,
        link: '/dich-vu/thiet-ke-react-app-ung-dung-web'
    },{
        name: 'Next Js với mã nguồn mở',
        image: NextJs,
        link: '/dich-vu/next-js-ung-dung-web-ho-tro-ssr-va-seo-hieu-qua'
    },{
        name: 'Native Mobile app',
        image: NativeApp,
        link: '/dich-vu/native-app-nen-tang-tao-lap-ung-dung-mobile-hieu-qua'
    },{
        name: 'CRM doanh nghiệp',
        image: CRM,
        link: '/dich-vu/dich-vu-trien-khai-crm-cho-doanh-nghiep'
    },
]

export const ServicesBox = [
    {
        title: 'Thiết kế chuyên nghiệp',
        content: 'Tập trung vào trải nghiệm khách hàng trên các sản phẩm số qua việc đảm bảo nguyên tắc thiết kế UX/UI',
        image: Code,
        link: '/',
    },{
        title: 'Công cụ truyền thông',
        content: 'Sử dụng sản phẩm số hóa tích hợp các công cụ để thúc đẩy tiện ích truyền thông mạnh mẽ, hiệu quả',
        image: Magic,
        link: '/',
    },{
        title: 'Cập nhật công nghệ',
        content: 'Thiết kế và công nghệ luôn được cập nhật đảm bảo đáp ứng các giải pháp mới nhất và phù hợp nhất với từng dự án',
        image: Box,
        link: '/',
    },
]

export const features = [
    {
        title: 'Nhanh chóng',
        content: 'Đảm bảo tiến độ với yêu cầu nhanh nhất với quy trình đã thống nhất với khách hàng',
        image: '/icons/time-01.svg'
    },{
        title: 'Chất lượng',
        content: 'Đảm bảo các tiêu chuẩn kỹ thuật về tốc độ, chuẩn SEO, thẩm mỹ trên cơ sở công nghệ cập nhật',
        image: '/icons/duotone_line.svg'
    },{
        title: 'Dễ sử dụng',
        content: 'Dễ sử dụng, quản trị với tài liệu hướng dẫn đầy đủ và hỗ trợ từ đội ngũ của chúng tôi',
        image: '/icons/Img_out-box-01.svg'
    },{
        title: 'Hợp lý',
        content: 'Hợp lý trong cách xây dựng sản phẩm, triển khai dịch vụ và ngân sách cho dự án',
        image: '/icons/Folder_alt_duotone_fill-01.svg'
    },{
        title: 'Hỗ trợ',
        content: 'Tùy biến, chỉnh sửa theo yêu cầu và hướng đến giải quyết vấn đề nhằm đảm bảo sự hài lòng',
        image: '/icons/Message_open_fill-01.svg'
    },{
        title: 'Ứng dụng và cập nhật',
        content: 'Khả năng ứng dụng giải quyết vấn đề và mở rộng, phát triển trong tương lai',
        image: '/icons/Folder_dublicate_duotone-01.svg'
    }
]

export const MarketingHead = [
    {
        name: 'Kan New',
        price: '3.900.000/ Tháng',
    },
    {
        name: 'Kan AddPlus',
        price: '5.900.000/ Tháng',
    },
    {
        name: 'Kan Master',
        price: '7.900.000/ Tháng',
    }
]
export const MarketingTable = [
    {
        name: 'Tối ưu onpage',
        data: [
            {
                name: 'Viết nội dung chuẩn SEO theo từ khoá',
                data: [
                    '10 bài/tháng',
                    '20 bài/tháng',
                    '30 bài/tháng'
                ],
                description: 'Chuẩn SEO trên 1000 từ'
            }, {
                name: 'Thiết kế hình ảnh nội dung và banner',
                data: [
                    '2 hình/tháng',
                    '3 hình/tháng',
                    '5 hình/tháng'
                ],
                description: 'Design ảnh đại diện, banner web'
            }, {
                name: 'Cập nhật nội dung theo yêu cầu',
                data: [
                    '5 bài/tháng',
                    '8 bài/tháng',
                    '10 bài/tháng'
                ],
                description: 'Nội dung khách hàng gửi'
            }, {
                name: 'Tối ưu cấu trúc HTML',
                data: [
                    'Kansite',
                    'Kansite',
                    'Kansite'
                ],
                description: 'Với các website thuộc Kan thực hiện'
            }, {
                name: 'Tối ưu hình ảnh và liên kết',
                data: [
                    '15',
                    '30',
                    '50'
                ],
                description: 'Cập nhật mỗi tháng'
            }
        ]
    },{
        name: 'Tối ưu Offpage',
        data: [
            {
                name: 'Tối ưu hoá hệ thống Social',
                data: [
                    'x',
                    'Khởi tạo',
                    'Chăm sóc'
                ],
                description: 'Mạng xã hội chính của doanh nghiệp'
            }, {
                name: 'Backlink',
                data: [
                    '5',
                    '10',
                    '20'
                ],
                description: 'Design ảnh đại diện, banner web'
            }, {
                name: 'Cập nhật nội dung theo yêu cầu',
                data: [
                    '5 bài/tháng',
                    '8 bài/tháng',
                    '10 bài/tháng'
                ],
                description: 'Xây dựng backlink'
            }, {
                name: 'Seeding Diễn đàn / Blog Comment',
                data: [
                    'x',
                    '10',
                    '20'
                ],
                description: 'Đi link qua blog comment và diễn đàn'
            }, {
                name: 'Social Profile',
                data: [
                    '5',
                    '10',
                    '10'
                ],
                description: 'Tạo profile backlink qua social'
            }, {
                name: 'Blog Content vệ tinh',
                data: [
                    '5',
                    '10',
                    '15'
                ],
                description: 'Số Blog và Nội dung/blog'
            }, {
                name: 'Guest Post',
                data: [
                    'x',
                    '1 bài',
                    '2 bài'
                ],
                description: 'Bài viết PR trên hệ thống của Kan'
            }, {
                name: 'Lead Magnet',
                data: [
                    'x',
                    '1',
                    '2'
                ],
                description: 'File build lead tiềm năng'
            }
        ]
    },{
        name: 'Báo cáo & Tư vấn Marketing',
        data: [
            {
                name: 'Báo cáo công việc',
                data: [
                    'Hàng tháng',
                    'Hàng tháng',
                    'Hàng tháng'
                ],
                description: 'Công việc Kan Solution thực hiện'
            }, {
                name: 'Báo cáo traffic từ Analytics',
                data: [
                    'Hàng quý',
                    'Hàng quý',
                    'Hàng tháng'
                ],
                description: 'Tương tác của người dùng trên website'
            }, {
                name: 'Báo cáo hiệu quả từ khoá từ Console',
                data: [
                    'Hàng quý',
                    'Hàng tháng',
                    'Hàng tháng'
                ],
                description: 'Kết quả tương tác từ khoá tự nhiên'
            }, {
                name: 'Báo cáo cập nhật tình trạng website',
                data: [
                    'Có',
                    'Có',
                    'Có'
                ],
                description: 'Hỗ trợ SEO'
            }, {
                name: 'Tư vấn, gợi ý từ khoá phù hợp',
                data: [
                    'Cơ bản',
                    'Nâng cao',
                    'Chuyên sâu'
                ],
                description: 'Lượng tìm kiếm, Cạnh tranh....'
            }, {
                name: 'Tư vấn marketing Google',
                data: [
                    'x',
                    'Có',
                    'Có'
                ],
                description: 'Từ mô tả đến triển khai'
            }
        ]
    } ,{
        name: 'Hệ thống website',
        data: [
            {
                name: 'Backup sao lưu dữ liệu',
                data: [
                    'Hàng tháng',
                    'Hàng tuần',
                    'Hàng tuần'
                ],
                description: 'Sao lưu toàn bộ website'
            }, {
                name: 'Cấu hình Google Web Console',
                data: [
                    'Có',
                    'Có',
                    'Có'
                ],
                description: 'Xem tương tác từ khoá tìm kiếm tự nhiên'
            }, {
                name: 'Cấu hình Google Analytics',
                data: [
                    'Có',
                    'Có',
                    'Có'
                ],
                description: 'Báo cáo cập nhật tình trạng website'
            }, {
                name: 'Thiết lập Robot, Sitemap',
                data: [
                    '1 lần',
                    '2 lần',
                    '3 lần'
                ],
                description: 'Audit website'
            }, {
                name: 'Cấu hình email tên miền',
                data: [
                    'x',
                    'Có',
                    'Có'
                ],
                description: ''
            }
        ]
    }
]

export const HostingTable = [
    {
        name: 'Cơ bản',
        price: '75.000đ',
        checklist: [
            'Server đặt tại: Việt Nam',
            'Dung lượng: 300 mb',
            'Băng thông: Không giới hạn',
            'Email tự động: Có',
            'Quản lý CRM: Không',
            'Quản lý MobileApp: Không',
            'Tùy chỉnh giao diện: Không',
            'Backup dữ liệu: Hàng tuần',
            'Giấy phép theme, plugin: Có',
            'Park domain: 1',
        ]
    },{
        name: 'Kinh doanh',
        price: '250.000đ',
        checklist: [
            'Server đặt tại: Việt Nam',
            'Dung lượng: 2 mb',
            'Băng thông: Không giới hạn',
            'Email tự động: Có',
            'Quản lý CRM: Có',
            'Quản lý MobileApp: Cập nhật',
            'Tùy chỉnh giao diện: 1 yêu cầu',
            'Hỗ trợ cài đặt tính năng: 1 yêu cầu',
            'Backup dữ liệu: Hàng tuần',
            'Giấy phép theme, plugin: Có',
            'Park domain: Không giới hạn',
        ]
    },{
        name: 'Nâng cao',
        price: '350.000đ',
        checklist: [
            'Server đặt tại: Việt Nam',
            'Dung lượng: 3 GB',
            'Băng thông: Không giới hạn',
            'Email tự động: Có',
            'Quản lý CRM: Có',
            'Quản lý MobileApp: Cập nhật',
            'Tùy chỉnh giao diện: 3 yêu cầu',
            'Hỗ trợ cài đặt tính năng: 3 yêu cầu',
            'Backup dữ liệu: Hàng tuần',
            'Giấy phép theme, plugin: Có',
            'Park domain: Không giới hạn',
        ]
    }
]

export const WebsiteDesignTable = [
    {
        name: 'Cơ bản',
        price: '5.000.000đ /năm',
        checklist: [
            '2GB Hosting',
            'Xây dựng Website đầy đủ tính năng',
            'quản lý vận chuyển tính giá tự động',
            'Kết nối thanh toán trực tuyến',
            'Kết nối bán hàng mạng xã hội',
            'Đồng bộ sản phẩm Google shopping',
            'Email đơn hàng tự động',
            'Bàn giao source code'
        ]
    },{
        name: 'Kinh doanh',
        price: '7.000.000đ /năm',
        checklist: [
            '3GB Hosting',
            'Xây dựng Website đầy đủ tính năng',
            'Tùy chọn mudule phù hợp',
            'Chuyển đổi UI Kit Framework',
            'Tùy biến dữ liệu phù hợp với doanh nghiệp',
            'Tùy chọn mẫu layout chuyên nghiệp',      
            'Quản lý vận chuyển tính giá tự động',
            'Giao diện khách hàng, đối tác chuyên sâu',
            'Kết nối thanh toán trực tuyến',
            'Kết nối bán hàng mạng xã hội',
            'Đồng bộ sản phẩm Google shopping',
            'Email đơn hàng tự động',
            'Bàn giao source code'
        ]
    },{
        name: 'Thiết kế độc quyền',
        price: 'Liên hệ tư vấn',
        checklist: [
            '5GB Hosting',
            'Mẫu giao diện được thiết kế độc quyền',
            'Xây dựng Website đầy đủ tính năng',
            'Tùy chọn mudule phù hợp',
            'Chuyển đổi UI Kit Framework',
            'Tùy biến dữ liệu phù hợp với doanh nghiệp',
            'Tùy chọn mẫu layout chuyên nghiệp',      
            'Quản lý vận chuyển tính giá tự động',
            'Đồng bộ dữ liệu vận chuyển, thanh toán',
            'Giao diện khách hàng, đối tác chuyên sâu',
            'Kết nối thanh toán trực tuyến',
            'Kết nối bán hàng mạng xã hội',
            'Đồng bộ sản phẩm Google shopping',
            'Email đơn hàng tự động',
            'Bàn giao source code'
        ]
    }
]

export const RateUser = [
    {
        lever: 1,
        name: 'Cá nhân',
        price: 75000
    },
    {
        lever: 2,
        name: 'Nâng cao',
        price: 250000
    },
    {
        lever: 3,
        name: 'Kinh doanh',
        price: 350000
    }
]