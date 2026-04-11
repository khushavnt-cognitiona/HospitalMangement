package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WardDTO {
    private Long id;
    private String name;
    private String type;
    private Integer capacity;
    private List<BedDTO> beds;
}
