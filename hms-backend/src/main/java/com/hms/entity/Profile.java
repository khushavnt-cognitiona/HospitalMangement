package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate dob;
    private String gender;
    private String profilePicture;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
