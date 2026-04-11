package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "wards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // ICU, General, etc.
    private Integer capacity;

    @OneToMany(mappedBy = "ward", cascade = CascadeType.ALL)
    private List<Bed> beds;
}
