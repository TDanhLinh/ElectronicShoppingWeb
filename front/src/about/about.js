import React from 'react';
import Link from 'next/link';

const teamMembers = [
    {
        name: "Trần Danh Linh",
        role: "Trưởng nhóm - Kỹ sư backend",
        description: "Quản lý và điều phối dự án. Phát triển API.",
        image: "/assets/img/dlinh.jpg" 
    },
    {
        name: "Nguyễn Phương Linh",
        role: "Nhà phát triển Frontend",
        description: "Thiết kế giao diện và trải nghiệm người dùng.",
        image: "/assets/img/plinh.jpg" 
    },
    {
        name: "Ngô Văn Linh",
        role: "Kỹ sư Backend",
        description: "Phát triển API và quản lý cơ sở dữ liệu.",
        image: "/assets/img/vlinh.jpg" 
    },
    {
        name: "Nguyễn Tuấn Linh",
        role: "Nhà phát triển Frontend",
        description: "Thiết kế giao diện và trải nghiệm người dùng.",
        image: "/assets/img/tlinh.jpg" 
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

            <div className='About-review'> 
                <h1>Giới thiệu Dự án</h1>
                <p>
                    Đây là 1 dự án web do nhóm 30 sản xuất có sử dụng công nghệ SPA và Spring Boot.
                </p>
            </div>
            

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
