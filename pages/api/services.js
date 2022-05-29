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
        link: '/'
    },{
        name: 'React app',
        image: ReactIcons,
        link: '/'
    },{
        name: 'Next Js với mã nguồn mở',
        image: NextJs,
        link: '/'
    },{
        name: 'API/ SDK',
        image: API,
        link: '/'
    },{
        name: 'Native Mobile app',
        image: NativeApp,
        link: '/'
    },{
        name: 'CRM doanh nghiệp',
        image: CRM,
        link: '/'
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