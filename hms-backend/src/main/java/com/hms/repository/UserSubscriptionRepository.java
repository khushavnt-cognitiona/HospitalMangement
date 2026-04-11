package com.hms.repository;

import com.hms.entity.User;
import com.hms.entity.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
    Optional<UserSubscription> findByUser(User user);
}
