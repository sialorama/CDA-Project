package com.forme.app.model;

import com.forme.app.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.security.Timestamp;

/**
 * The type Notification.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String message;
    private Timestamp date_notification;
    private boolean is_read;
}
