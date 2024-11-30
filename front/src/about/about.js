// src/about/About.js
import React from 'react';
import Link from 'next/link';

const teamMembers = [
    {
        name: "Nguyễn Văn A",
        role: "Trưởng nhóm",
        description: "Quản lý và điều phối dự án.",
        image: "/assets/images/nguyen-van-a.jpg" // Replace with actual image path
    },
    {
        name: "Trần Thị B",
        role: "Nhà phát triển Frontend",
        description: "Thiết kế giao diện và trải nghiệm người dùng.",
        image: "/assets/img/plinh.jpg" // Replace with actual image path
    },
    {
        name: "Lê Văn C",
        role: "Kỹ sư Backend",
        description: "Phát triển API và quản lý cơ sở dữ liệu.",
        image: "/assets/images/le-van-c.jpg" // Replace with actual image path
    },
    {
        name: "Phạm Thị D",
        role: "Chuyên viên QA",
        description: "Đảm bảo chất lượng và thử nghiệm.",
        image: "/assets/images/pham-thi-d.jpg" // Replace with actual image path
    },
];

export function About() {
    return (
        <div>
            <Link href='/'>
                <button className='back-to-home'>
                    Quay về trang chủ
                </button>
            </Link>
    
            <h1 style={{ textAlign: 'center' }}>Giới thiệu Dự án</h1>
            <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                Dự án của chúng tôi phát triển một ứng dụng web sử dụng Next.js, với mục tiêu tạo ra trải nghiệm người dùng tốt và dễ quản lý nội dung.
            </p>

            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Các thành viên nhóm</h2>
            <div className="about-team-list">
                {teamMembers.map((member, index) => (
                    <div key={index} className="about-member-card">
                        <img src={member.image} alt={`${member.name}'s photo`} className="about-member-photo" />
                        <div className="member-info">
                            <h3 className="about-member-name">{member.name}</h3>
                            <p className="about-member-role"><strong>Vai trò:</strong> {member.role}</p>
                            <p className="about-member-description">{member.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
