package com.forme.app.dto;

import com.forme.app.model.Center;
import com.forme.app.user.model.Former;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathListDto {
    private Long id;
    private Center center;  
    private Former former;

    private Date date_start;

    private Date date_end;

    public String getCenter() {
        return center.getName();
    }

    public String getFormer() {
        return former.getLastname();
    }

}
