import { Container, Row, Col, Button, Divider, Modal, Panel  } from 'rsuite'
import { ServiceWordpress } from '../api/HeaderSeo'
import { WebsiteDesignTable } from '../api/services'
import { IoCheckmarkOutline } from "react-icons/io5";
import { useState } from 'react'
import { SingleProject } from '../du-an'
import ServicesSubmitForm from '../../components/handleSubmitServices'
import styles from '../../styles/services/webdesign.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import axios from 'axios'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const DesignWebsite = ({bai_viet}) => {
 
 const [open, setOpen] = useState(false);  
 const [service, setService] = useState(''); 

 const handleOpen = (service) => {
    setService(service);
    setOpen(true)
 };

 const QuyTrinh = [
    {
        title: 'Thảo luận về dự án',
        content: 'Chúng tôi thảo luận với khách hàng về mục tiêu, yêu cầu về giao diện và tính năng, nghiên cứu về ngành nghề, tìm hiểu các đặc điểm mấu chốt về cạnh tranh và tiếp cận thị trường để đảm bảo dự án của khách hàng được xây dựng và phát triển đúng hướng'
    }, {
        title: 'Thống nhất về kế hoạch dự án',
        content: 'Sau khi đạt sự đồng thuận về ý tưởng xây dựng, chúng tôi thống nhất kế hoạch dự án với khách hàng qua hệ thống các mục tiêu cần đạt được để đảm bảo khách hàng có đủ cơ sở kiểm tra website một cách đầy đủ và nhanh chóng về chất lượng và tiến độ'
    }, {
        title: 'Thống nhất hợp đồng xây dựng',
        content: 'Hợp đồng cần được thống nhất bao gồm đầy đủ các nội dung mà chúng tôi cam kết trong quá trình cung cấp dịch vụ của mình từ lúc trước, trong và sau khi sản phẩm website được hoàn thành.'
    }, {
        title: 'Triển khai thiết kế và lập trình',
        content: 'Đội ngũ KanS thực hiện triển khai website dựa theo hệ thống chỉ tiêu đã thống nhất. Đảm bảo thiết kế giao diện và tính năng phù hợp với mong muốn của khách hàng'
    }, {
        title: 'Cập nhật nội dung, hình ảnh',
        content: ' Dịch vụ bao gồm hỗ trợ khách hàng cập nhật nội dung từ khách hàng yêu cầu, chúng tôi có thể chủ động tham khảo trên internet để đảm bảo website có đủ chuẩn nội dung để tiến hành xuất bản'
    }, {
        title: 'Nghiệm thu, bàn giao và xuất bản website',
        content: 'Căn cứ hợp đồng và kế hoạch, khách hàng thực hiện nghiệm thu website, chúng tôi tiến hành bàn giao website với thông tin quản trị, thông tin hosting, tên miền (nếu có), và tiến hành xuất bản website. Quá trình nghiệm thu sẽ bao gồm cam kết của chúng tôi về dịch vụ hỗ trợ, hướng dẫn và đảm bảo website vận hành ổn định trong tương lai'
    },
 ];

 const Team = [
    {
        title: 'Đầy đủ đội ngũ chức năng',
        content: 'Có đầy đủ đội ngũ design, lập trình website và quản trị website, viết nội dung linh hoạt, hiệu quả'
    },{
        title: 'Kinh nghiệm ngành nghề',
        content: 'Không chỉ kinh nghiệm trong thiết kế và lập trình web, chúng tôi còn có 10 năm kinh nghiệm trong việc tư vấn các hoạt động quảng cáo, kinh doanh trực tuyến'
    },{
        title: 'Quy trình xây dựng hoàn chỉnh',
        content: 'Quy trình hoàn chỉnh cho một dự án website là điều quan trọng giúp doanh nghiệp kiểm tra giám sát từng phần từ giao diện, tính năng đến nội dung của website.'
    },{
        title: 'Hỗ trợ tối đa',
        content: 'Đơn vị uy tín hỗ trợ bạn từ khâu tư vấn để lựa chọn phương án website hiệu quả, hỗ trợ hướng dẫn sử dụng, tư vấn hướng quản trị và phát triển website trong tương lai cho phù hợp với ngành nghề kinh doanh của bạn'
    },{
        title: 'Uy tín và Đáng tin cậy',
        content: 'Bạn nên tham khảo hợp đồng và các vấn đề được cam kết trên website. Một đơn vị uy tín sẽ đảm bảo thực hiện đầy đủ cam kết về dịch vụ, đảm bảo hỗ trợ trong tương lai.'
    },{
        title: 'Chi phí hợp lý',
        content: 'Chúng tôi xây dựng website và giá trị được tính trên thời gian làm việc và những gì chúng tôi đảm bảo cho khách hàng của mình. Chi phí đầu tư cho một website đi đôi với những dịch vụ bạn nhận được từ đơn vi xây dựng website.'
    }
 ]
 const Needed = [
    {
        title: 'Giao diện chuyên nghiệp',
        content: 'Chuyên nghiệp bao gồm sự đẹp mắt, dễ nhìn, dễ sử dụng, thông tin cập nhật đầy đủ, kịp thời, không lỗi. Bạn có thể tham khảo nhiều giao diện đẹp nhưng cũng cần sự sắp xếp phù hợp với thông tin của mình để đảm bảo website có đủ thông tin mà không rối mắt. Đặc biệt là nội dung hình ảnh cần được cập nhật và hợp xu hướng.'
    },{
        title: 'Tính năng phù hợp',
        content: 'Các tính năng của website cần được xây dựng vừa đủ và phù hợp với nhu cầu sử dụng. Việc này giúp giao diện quản trị được tối ưu và việc phát triển website cũng được tập trung. Website ngày nay cần đơn giản, ngắn gọn và đúng trọng tâm. Và website sẽ trở thành công cụ hỗ trợ đắc lực cho hoạt động của doanh nghiệp'
    },{
        title: 'Dễ dàng quản trị',
        content: 'Để duy trì sự cập nhật của thông tin đăng trên website, bạn cần một giao diện quản trị web dễ sử dụng. Việc này giúp tối ưu thời gian làm quen và sử dụng website một cách ngắn nhất. Để không bị lỡ thời cơ trong thời buổi cần đến tốc độ như hiện nay'
    },{
        title: 'Tốc độ nhanh',
        content: 'Với sự hỗ trợ về công nghệ phần cứng và đường truyền hiện nay, khách hàng không muốn truy cập một website có thời gian tải lâu. Vì vậy, việc xây dựng và tối ưu website, đảm bảo tốc độ tải nhanh chóng là rất quan trọng, bạn cần chọn website tối ưu code, cập nhật hình ảnh tối ưu dung lượng và một hosting server đạt yêu cầu để có tốc độ web tối ưu'
    },{
        title: 'An toàn và bảo mật',
        content: 'An toàn và bảo mật là đặc điểm cần thiết cho website hiện nay, giúp doanh nghiệp bảo vệ thông tin của chính mình và người sử dụng. Việc đầu tư một website là một việc mang tính chất chiến lược dài hạn, bạn cần đảm bảo website an toàn để tránh trường hợp đổ sông đổ bể những công sức đã làm qua năm tháng'
    },{
        title: 'Tương thích với nhiều thiết bị',
        content: 'Người dùng phần nhiều duyệt web qua màn hình điện thoại, tuy nhiên, để xem thông tin đầy đủ và dễ dàng họ cũng đôi khi xem trên laptop hoặc tablet. Một website hiển thị chuyên nghiệp trên mọi màn hình, thiết bị sẽ cho thấy sự đầu tư của bạn trong việc chăm sóc khách hàng trên internet.'
    },{
        title: 'Khả năng mở rộng và tuỳ chỉnh',
        content: 'Việc mở rộng, tuỳ chỉnh những thông tin cần thiết trong tương lai là không tránh khỏi, một website linh hoạt giúp bạn dễ dàng mở rộng tính năng, bổ sung giao diện, tuỳ chỉnh thông tin mà không tốn nhiều công sức xây dựng lại, đặc biệt là bộ cơ sở dữ liệu đã xây dựng trước đó.'
    },{
        title: 'Hỗ trợ và kết nối với bên thứ 3',
        content: 'Trông thời buổi thế giới công nghệ, internet of thing. Mọi thứ trên internet và cả công việc kinh doanh hay quản trị đều có thể được đồng bộ. Việc dễ dàng kết nối với bên thứ 3 giúp bạn kết nối những dữ liệu từ những ứng dụng, phần mềm khác để khai thác tối đa thông tin đang có, đặc biệt là phục vụ cho marketing và chăm sóc khách hàng.'
    },{
        title: 'Website Chuẩn SEO',
        content: 'Website cần được xây dựng với cấu trúc code chuẩn SEO, bao gồm cấu trúc thẻ bài viết, cấu trúc thẻ trang, các khai báo với công cụ tìm kiếm như Google, Bing..., tối ưu các liên kết. Đặc biệt, website cần một số công cụ hỗ trợ bạn SEO top Google. Điều này không chỉ giúp bạn tiếp cận nhiều khách hàng mà còn giúp website thể hiện nội dung chuyên nghiệp, dễ hiệu, tăng khả năng chốt deal hợp đồng hoặc đơn hàng cho doanh nghiệp.'
    }
 ]
 const why_choose = [
    {
        title: 'Tiếp cận một thị trường rộng lớn toàn cầu',
        content: 'Thị trường trực tuyến là rất lớn cho tất cả các ngành nghề và mục đích kinh doanh. Dù khách hàng của bạn là ai, họ đều lên mạng để tìm kiếm thông tin về sản phẩm, dịch vụ liên quan đến công việc. Website giúp bạn hiển thị những thông tin quan trọng và gửi chúng đến với khách hàng, đối tác và mọi người một cách nhanh chóng nhất'
    },{
        title: 'Hỗ trợ quảng cáo hiệu quả',
        content: 'Thị trường trực tuyến là rất lớn cho tất cả các ngành nghề và mục đích kinh doanh. Dù khách hàng của bạn là ai, họ đều lên mạng để tìm kiếm thông tin về sản phẩm, dịch vụ liên quan đến công việc. Website giúp bạn hiển thị những thông tin quan trọng và gửi chúng đến với khách hàng, đối tác và mọi người một cách nhanh chóng nhất'
    },{
        title: 'Định vị và khẳng định thương hiệu',
        content: 'Website giúp định vị hình ảnh và thương hiệu của doanh nghiệp trong tâm trí của khách hàng. Sự chuyên nghiệp, sinh động và khả năng tương tác của website sẽ giúp khách hàng định vị thương hiệu của bạn trong tâm trí của họ.'
    },{
        title: 'Kênh bán hàng và chăm sóc khách hàng hiệu quả',
        content: 'Website còn là một công cụ giúp doanh nghiệp số hoá doanh nghiệp một cách nhanh chóng và hiệu quả nhất. Doanh nghiệp có thể kiểm soát thông tin, kho hàng sản phẩm, quy trình dịch vụ, thông tin khách hàng và cả công việc của nhân sự với một website'
    },
 ];

 const handleClose = () => setOpen(false);

 const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
    <Head>
        { HTMLReactParser(ServiceWordpress) }
    </Head>
    <div className={styles.x_thiet_ke_website_section}>
        <section className={styles.x_banner_thiet_ke}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_content}>
                            <h3 className={styles.x_section_secondary_title}>Xây dựng website doanh nghiệp</h3>
                            <h2 className={styles.x_primary_title}>Thiết kế webiste trọn gói cho doanh nghiệp</h2>
                            <Button 
                                className={styles.x_call_to_action_thiet_ke}
                                onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website trọn gói cho doanh nghiệp') }}>
                            Tư vấn miễn phí
                        </Button>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_image}>
                            <Image alt="Thiết kế webiste trọn gói cho doanh nghiệp" src={'/layout/thiet-ke-website/decoration_1.svg'} width={500} height={500}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className={styles.x_why_choose}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_why_choose_content}>
                            <h2 className={styles.x_primary_title}>Tại sao doanh nghiệp nên có website?</h2>
                            <Row>
                                {
                                    why_choose.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} key={index}>
                                                <Panel className={styles.x_panel_thietke} header={val.title} collapsible bordered>
                                                    <p>{val.content}</p>
                                                </Panel>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        <section className={styles.x_why_choose}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={24}>
                        <div className={styles.x_supporter}>
                            <div className={styles.x_thiet_ke_banner_title_1}>
                                <Row className={styles.x_centered}>
                                    <Col xs={24} md={12}>
                                        <h2 className={styles.x_primary_title}>Doanh nghiệp cần website như thế nào để nâng cao khả năng cạnh tranh trên thị trường</h2>
                                        <p>Với thị trường và lợi ích website mang lại, không khó hiểu khi hiện nay hầu như doanh nghiệp, tổ chức hay cá nhân nào cũng trang bị một website. Việc có một website gần như là việc không những cần thiết mà còn là cấp bách trong thời đại kinh doanh số hiện nay. Vấn đề là làm sao website có thể hỗ trợ bạn cạnh tranh với vô vàn đối thủ cũng có website ngoài thị trường. Bạn cần chú ý những đặc điểm của website như sau:</p>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div className={styles.x_banner_image}>
                                            <Image alt="Doanh nghiệp cần website như thế nào để nâng cao khả năng cạnh tranh" src={'/layout/thiet-ke-website/decoration_2.svg'} width={500} height={300}/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                {
                                    Needed.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} key={index}>
                                                 <Panel className={styles.x_panel_thietke} header={val.title} collapsible bordered>
                                                    <p>{val.content}</p>
                                                </Panel>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        <section className={styles.x_why_choose}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={24}>
                        <div className={styles.x_supporter}>
                            <div className={styles.x_thiet_ke_banner_title_2}>
                                <Row className={styles.x_centered}>
                                    <Col xs={24} md={12}>
                                        <h2 className={styles.x_primary_title}>Đơn vị xây dựng và phát triển website chuyên nghiệp và uy tín</h2>
                                        <p>Với những đặc điểm nêu trên cho một website hiệu quả, một đơn vị xây dựng và phát triển website chuyên nghiệp và uy tín sẽ giúp bạn thực hiện những điều trên. Tại đây, chúng tôi có đầy đủ năng lực, kinh nghiệm, đội ngũ và công nghệ để đảm bảo xây dựng và vận hành website tối ưu cho doanh nghiệp:</p>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div className={styles.x_banner_image}>
                                            <Image alt="Đơn vị xây dựng và phát triển website chuyên nghiệp và uy tín" src={'/layout/thiet-ke-website/decoration_3.svg'} width={500} height={300}/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                {
                                    Team.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} key={index}>
                                                <Panel className={styles.x_panel_thietke} header={val.title} collapsible bordered>
                                                    <p>{val.content}</p>
                                                </Panel>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        {
            bai_viet ? <>
            <section className={styles.x_project_section}>
                <Container>
                    <Row className={styles.x_centered}>
                        <Col xs={24}>
                            <div className={styles.x_hosting_title}>
                                <h2 className={styles.x_primary_title}>Các dự án đã hoàn thiện</h2>
                            </div>
                            <div className={styles.x_hosting_table_container}>
                                <Carousel responsive={responsive}>
                                    {
                                        bai_viet.map((val) => {
                                            return (
                                                <div style={{padding: '10px'}} key={val.id}>
                                                    <SingleProject data={val} />
                                                </div>
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        </Col>
                        <Col xs={24}>
                            <Link href="/du-an/">
                                <a>
                                    <Button className={styles.x_to_du_an}>
                                        Xem tất cả dự án »
                                </Button>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </> : ''
        }
        <Divider/>
        <section className={styles.x_why_choose}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={24}>
                        <div className={styles.x_supporter}>
                            <div className={styles.x_thiet_ke_banner_title_3}>
                                <Row className={styles.x_centered}>
                                    <Col xs={24} md={12}>
                                        <h2 className={styles.x_primary_title}>Quy trình thực hiện một dự án website hiệu quả</h2>
                                        <p>Quy trình từ lên kế hoạch đến triển khai và vận hành dự án, một dự án website tốt cần đạt được những yêu cầu về mặt thiết kế, nội dung và những tính năng để phục vụ cho trải nghiệm của khách hàng:</p>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div className={styles.x_banner_image}>
                                            <Image alt={'Quy trình thực hiện một dự án website hiệu quả'} src={'/layout/thiet-ke-website/decoration_4.svg'} width={500} height={300}/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                {
                                    QuyTrinh.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} key={index}>
                                                <Panel className={styles.x_panel_thietke} header={val.title} collapsible bordered>
                                                    <p>{val.content}</p>
                                                </Panel>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        <section className={styles.x_hosting_section}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_hosting_title}>
                            <h3 className={styles.x_section_secondary_title}>Xây dựng nhanh chóng</h3>
                            <h2 className={styles.x_primary_title}>Bảng giá thiết kế website</h2>
                        </div>
                        <div className={styles.x_hosting_table_container}>
                            <Row>
                                 {
                                    WebsiteDesignTable.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} lg={8} key={index}>
                                                <div className={styles.x_hosting}>
                                                    <div className={styles.x_hosting_header}>
                                                        <h3>{val.name}</h3>
                                                        <p>{val.price}</p>
                                                        <Button className={styles.x_hosting_button} onClick={() => { handleOpen('Dịch vụ hosting ' + val.name) }}>Đăng ký</Button>
                                                    </div>
                                                    <div className={styles.x_hosting_features}>
                                                        <ul>
                                                            {
                                                                val.checklist.map((val, index) => {
                                                                    return(
                                                                        <li key={index}>
                                                                            <span className={styles.x_hosting_check}>
                                                                                <IoCheckmarkOutline color='white'/>
                                                                            </span>
                                                                            {val}
                                                                        </li>
                                                                    )
                                                                })    
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })
                                 }       
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        <section className={styles.x_services_container}>
            <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_supporter}>
                            <h3 className={styles.x_section_secondary_title}>Lựa chọn dịch vụ</h3>
                            <h2 className={styles.x_primary_title}>Xây dựng thương hiệu riêng cho bạn</h2>
                            <div className={styles.services}>
                                <Row>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image alt="Website Landing Page" src={'/icons/landing-page.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Landing Page</h3>
                                            <h2 className={styles.x_services_content_main_title}>Xây dựng kênh quảng bá sản phẩm nhanh</h2>
                                            <Button 
                                            className={styles.x_services_button}
                                            onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website Landing Page') }}>
                                                Đăng ký tư vấn
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image alt="xây dựng thương hiệu doanh nghiệp" src={'/icons/content.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Doanh Nghiệp</h3>
                                            <h2 className={styles.x_services_content_main_title}>Xây dựng thương hiệu doanh nghiệp</h2>
                                            <Button 
                                                className={styles.x_services_button}
                                                onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website Doanh nghiệp') }}>
                                                Đăng ký tư vấn
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image alt="Website Thương Mại" src={'/icons/laptop.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Thương Mại</h3>
                                            <h2 className={styles.x_services_content_main_title}>Mở rộng quy mô phân phối sản phẩm</h2>
                                            <Button 
                                                className={styles.x_services_button}
                                                onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website Thương Mại') }}>
                                                Đăng ký tư vấn
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </div>
    <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký dịch vụ thiết kế Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DesignWebsite

export async function getServerSideProps({req, res}) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const response = await axios.get(rootURL + 'du-an/bai-viet?per_page=9').then((resonse) => resonse.data);
  
    // Pass data to the page via props
    return { props: { 
      bai_viet: response.posts,
      max_num_pages: response.max_pages
   }}
  }