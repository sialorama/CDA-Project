package com.forme.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathDto {
    private Long id;
    private String center_id;
    private String former_id;

    private Timestamp date_start;
    private Timestamp date_end;

}
