package com.hust.Ecommerce.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hust.Ecommerce.entities.enumeration.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "shipping_infors")
public class ShippingInfor extends BaseEntity {
    @Column(name = "received_name")
    private String receivedName;

    @Column(name = "gender")
    private Gender gender;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "province_code")
    private String province;

    @Column(name = "district_code")
    private String district;

    @Column(name = "ward_code")
    private String ward;

    @Column(name = "note")
    private String note;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
